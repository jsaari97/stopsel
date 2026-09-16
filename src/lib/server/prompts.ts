import { asc, desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { dailyPrompt, prompt, promptVersion } from '$lib/server/db/schema';

export function getHelsinkiCalendarDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Helsinki',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;

  return `${value('year')}-${value('month')}-${value('day')}`;
}

async function findDailyPrompt(scheduledDate: string) {
  const [result] = await db
    .select({
      scheduledDate: dailyPrompt.scheduledDate,
      promptId: promptVersion.promptId,
      promptVersionId: promptVersion.id,
      text: promptVersion.text
    })
    .from(dailyPrompt)
    .innerJoin(promptVersion, eq(dailyPrompt.promptVersionId, promptVersion.id))
    .where(eq(dailyPrompt.scheduledDate, scheduledDate))
    .limit(1);

  return result ?? null;
}

export async function getDailyPrompt(date = new Date()) {
  const scheduledDate = getHelsinkiCalendarDate(date);
  const scheduledPrompt = await findDailyPrompt(scheduledDate);

  if (scheduledPrompt) return scheduledPrompt;

  const versions = await db
    .select({
      id: promptVersion.id,
      promptId: promptVersion.promptId,
      text: promptVersion.text
    })
    .from(promptVersion)
    .innerJoin(prompt, eq(promptVersion.promptId, prompt.id))
    .where(eq(prompt.isActive, true))
    .orderBy(asc(prompt.id), desc(promptVersion.version));

  const latestVersions = [
    ...new Map(versions.map((version) => [version.promptId, version])).values()
  ];

  if (latestVersions.length === 0) return null;

  const pastDailyPrompts = await db
    .select({
      promptVersionId: dailyPrompt.promptVersionId,
      scheduledDate: dailyPrompt.scheduledDate
    })
    .from(dailyPrompt)
    .orderBy(desc(dailyPrompt.scheduledDate));
  const lastUsedDate = new Map<number, string>();

  for (const item of pastDailyPrompts) {
    if (!lastUsedDate.has(item.promptVersionId)) {
      lastUsedDate.set(item.promptVersionId, item.scheduledDate);
    }
  }

  latestVersions.sort((left, right) => {
    const leftDate = lastUsedDate.get(left.id);
    const rightDate = lastUsedDate.get(right.id);

    if (!leftDate && !rightDate) return left.promptId - right.promptId;
    if (!leftDate) return -1;
    if (!rightDate) return 1;
    return leftDate.localeCompare(rightDate) || left.promptId - right.promptId;
  });

  await db
    .insert(dailyPrompt)
    .values({
      scheduledDate,
      promptVersionId: latestVersions[0].id,
      source: 'fallback'
    })
    .onConflictDoNothing();

  return findDailyPrompt(scheduledDate);
}

export async function isCurrentDailyPrompt(promptVersionId: number, date = new Date()) {
  const currentPrompt = await getDailyPrompt(date);

  return currentPrompt?.promptVersionId === promptVersionId;
}

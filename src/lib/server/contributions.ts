import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { randomUUID } from 'node:crypto';
import { and, count, eq, gte } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { contribution, dialectArea, guestIdentity, promptVersion } from '$lib/server/db/schema';
import { getHelsinkiCalendarDate } from '$lib/server/prompts';

export const maximumResponseLength = 300;
export const privacyNoticeVersion = 'development-1';
export const submissionTermsVersion = 'development-1';

export function contributionsAreEnabled() {
  return dev || env.CONTRIBUTIONS_ENABLED === 'true';
}

export function validateResponseText(value: string, promptText: string) {
  const responseText = value.trim().replace(/\r\n?/g, '\n');

  if (!responseText) return { message: 'Skriv ett svar innan du fortsätter.' };
  if (responseText.length > maximumResponseLength) {
    return { message: `Svaret får innehålla högst ${maximumResponseLength} tecken.` };
  }
  const hasUnsupportedControlCharacter = [...responseText].some((character) => {
    const code = character.charCodeAt(0);

    return code <= 8 || code === 11 || code === 12 || (code >= 14 && code <= 31) || code === 127;
  });

  if (hasUnsupportedControlCharacter) {
    return { message: 'Svaret innehåller tecken som inte kan sparas.' };
  }
  if (/<\/?script\b|https?:\/\/|www\./iu.test(responseText)) {
    return { message: 'Ta bort länkar och kod från svaret.' };
  }
  if (responseText.toLocaleLowerCase('sv') === promptText.trim().toLocaleLowerCase('sv')) {
    return { message: 'Skriv meningen så som du själv skulle säga den.' };
  }

  return { responseText };
}

export async function hasReachedContributionLimit(guestIdentityId: string, now = new Date()) {
  const tenMinutesAgo = now.getTime() - 10 * 60 * 1000;
  const [result] = await db
    .select({ total: count() })
    .from(contribution)
    .where(
      and(
        eq(contribution.guestIdentityId, guestIdentityId),
        gte(contribution.submittedAt, tenMinutesAgo)
      )
    );

  return (result?.total ?? 0) >= 5;
}

export async function createContribution(input: {
  promptVersionId: number;
  dialectAreaId: number;
  guestIdentityId: string;
  responseText: string;
}) {
  const id = randomUUID();

  await db.insert(contribution).values({
    id,
    ...input,
    privacyNoticeVersion,
    submissionTermsVersion
  });

  return id;
}

export async function getOwnedContribution(contributionId: string, tokenHash: string) {
  const [ownedContribution] = await db
    .select({
      id: contribution.id,
      promptId: promptVersion.promptId,
      promptText: promptVersion.text,
      responseText: contribution.responseText,
      dialectAreaName: dialectArea.name,
      submittedAt: contribution.submittedAt,
      guestIdentityId: contribution.guestIdentityId
    })
    .from(contribution)
    .innerJoin(promptVersion, eq(contribution.promptVersionId, promptVersion.id))
    .innerJoin(dialectArea, eq(contribution.dialectAreaId, dialectArea.id))
    .innerJoin(guestIdentity, eq(contribution.guestIdentityId, guestIdentity.id))
    .where(and(eq(contribution.id, contributionId), eq(guestIdentity.tokenHash, tokenHash)))
    .limit(1);

  if (!ownedContribution) return null;

  const submissionDates = await db
    .select({ submittedAt: contribution.submittedAt })
    .from(contribution)
    .where(eq(contribution.guestIdentityId, ownedContribution.guestIdentityId));

  return {
    ...ownedContribution,
    contributionDays: new Set(
      submissionDates.map(({ submittedAt }) => getHelsinkiCalendarDate(new Date(submittedAt)))
    ).size
  };
}

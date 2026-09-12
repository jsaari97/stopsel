import { and, asc, eq, inArray } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { dialectArea, dialectRegion } from '$lib/server/db/schema';

const publicDialectRegions = [
  {
    code: 'osterbotten',
    name: 'Österbotten',
    sourceRegionCodes: ['norra-osterbotten', 'mellersta-osterbotten', 'sodra-osterbotten']
  },
  {
    code: 'satakunta',
    name: 'Satakunta',
    sourceRegionCodes: ['satakunta']
  },
  {
    code: 'aland',
    name: 'Åland',
    sourceRegionCodes: ['vastra-aland', 'ostra-aland']
  },
  {
    code: 'aboland',
    name: 'Åboland',
    sourceRegionCodes: ['vastra-aboland', 'ostra-aboland']
  },
  {
    code: 'nyland',
    name: 'Nyland',
    sourceRegionCodes: ['vastra-nyland', 'mellersta-nyland', 'ostra-nyland']
  }
] as const;

export async function listPublicDialectRegions() {
  const activeSourceRegions = await db
    .select({ code: dialectRegion.code })
    .from(dialectRegion)
    .where(eq(dialectRegion.isActive, true));

  const activeCodes = new Set(activeSourceRegions.map(({ code }) => code));

  return publicDialectRegions
    .filter((region) => region.sourceRegionCodes.some((code) => activeCodes.has(code)))
    .map(({ code, name }) => ({ code, name }))
    .sort((left, right) => left.name.localeCompare(right.name, 'sv'));
}

export async function getPublicDialectRegion(code: string) {
  const region = publicDialectRegions.find((candidate) => candidate.code === code);

  if (!region) return null;

  const sourceRegions = await db
    .select({
      id: dialectRegion.id,
      sortOrder: dialectRegion.sortOrder
    })
    .from(dialectRegion)
    .where(
      and(
        inArray(dialectRegion.code, [...region.sourceRegionCodes]),
        eq(dialectRegion.isActive, true)
      )
    )
    .orderBy(asc(dialectRegion.sortOrder));

  if (sourceRegions.length === 0) return null;

  const sourceRegionOrder = new Map(sourceRegions.map(({ id }, index) => [id, index]));
  const sourceAreas = await db
    .select({
      id: dialectArea.id,
      code: dialectArea.sourceCode,
      name: dialectArea.name,
      sortOrder: dialectArea.sortOrder,
      sourceRegionId: dialectArea.dialectRegionId
    })
    .from(dialectArea)
    .where(
      and(
        inArray(
          dialectArea.dialectRegionId,
          sourceRegions.map(({ id }) => id)
        ),
        eq(dialectArea.isActive, true)
      )
    );

  sourceAreas.sort(
    (left, right) =>
      (sourceRegionOrder.get(left.sourceRegionId) ?? 0) -
        (sourceRegionOrder.get(right.sourceRegionId) ?? 0) ||
      left.sortOrder - right.sortOrder ||
      left.name.localeCompare(right.name, 'sv')
  );

  const seenAreas = new Set<string>();
  const areas = sourceAreas.flatMap(({ id, code: areaCode, name }) => {
    const key = `${areaCode}\u0000${name}`;

    if (seenAreas.has(key)) return [];

    seenAreas.add(key);
    return [{ id, code: areaCode, name }];
  });

  areas.sort((left, right) => left.name.localeCompare(right.name, 'sv'));

  return { code: region.code, name: region.name, areas };
}

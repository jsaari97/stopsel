import { listPublicDialectRegions } from '$lib/server/dialects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
  regions: await listPublicDialectRegions()
});

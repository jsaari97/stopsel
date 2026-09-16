import { redirect } from '@sveltejs/kit';
import { getSelectedDialectArea } from '$lib/server/dialects';
import { getOrCreateGuestToken } from '$lib/server/guests';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const dialectAreaId = Number(cookies.get('stopsel_dialect_area'));
  const dialect = Number.isInteger(dialectAreaId)
    ? await getSelectedDialectArea(dialectAreaId)
    : null;

  if (!dialect) redirect(303, '/valj-dialekt');

  getOrCreateGuestToken(cookies);

  return { dialect };
};

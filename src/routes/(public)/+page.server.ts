import { redirect } from '@sveltejs/kit';
import { getSelectedDialectArea } from '$lib/server/dialects';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const dialectAreaId = Number(cookies.get('stopsel_dialect_area'));
  const dialect = Number.isInteger(dialectAreaId)
    ? await getSelectedDialectArea(dialectAreaId)
    : null;

  if (dialect) redirect(303, '/dagens-mening');
};

import { dev } from '$app/environment';
import { error, fail, redirect } from '@sveltejs/kit';
import { getPublicDialectRegion } from '$lib/server/dialects';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const region = await getPublicDialectRegion(params.regionCode);

  if (!region) error(404, 'Dialektområdet hittades inte.');

  return { region };
};

export const actions: Actions = {
  default: async ({ cookies, params, request }) => {
    const region = await getPublicDialectRegion(params.regionCode);

    if (!region) error(404, 'Dialektområdet hittades inte.');

    const formData = await request.formData();
    const selectedAreaId = formData.get('areaId')?.toString() ?? '';
    const area = region.areas.find(({ id }) => String(id) === selectedAreaId);

    if (!area) {
      return fail(400, {
        message: 'Välj en ort innan du fortsätter.',
        selectedAreaId
      });
    }

    cookies.set('stopsel_dialect_area', String(area.id), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 365
    });

    redirect(303, '/dagens-mening');
  }
};

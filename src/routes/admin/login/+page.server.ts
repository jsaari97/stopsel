import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { auth } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
  if (event.locals.user?.role === 'admin') {
    redirect(303, '/admin');
  }

  return {};
};

export const actions: Actions = {
  signIn: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email')?.toString().trim() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    if (!email || !password) {
      return fail(400, { message: 'Fyll i e-postadress och lösenord.' });
    }

    try {
      const result = await auth.api.signInEmail({
        body: { email, password },
        headers: event.request.headers
      });

      if (result.user.role !== 'admin') {
        await auth.api.signOut({ headers: event.request.headers });
        return fail(403, { message: 'Du har inte administratörsbehörighet.' });
      }
    } catch (cause) {
      if (cause instanceof APIError) {
        return fail(cause.statusCode === 429 ? 429 : 400, {
          message:
            cause.statusCode === 429
              ? 'För många inloggningsförsök. Försök igen senare.'
              : 'E-postadressen eller lösenordet är fel.'
        });
      }

      return fail(500, { message: 'Ett oväntat fel inträffade.' });
    }

    redirect(303, '/admin');
  }
};

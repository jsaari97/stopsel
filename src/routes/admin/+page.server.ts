import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/auth';
import { requireAdmin } from '$lib/server/admin';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = (event) => {
  const user = requireAdmin(event);

  return {
    user: {
      name: user.name,
      email: user.email
    }
  };
};

export const actions: Actions = {
  signOut: async (event) => {
    requireAdmin(event);
    await auth.api.signOut({ headers: event.request.headers });
    redirect(303, '/admin/login');
  }
};

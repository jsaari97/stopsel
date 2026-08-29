import { error, redirect, type RequestEvent } from '@sveltejs/kit';

export function requireAdmin(event: RequestEvent) {
  if (!event.locals.user) {
    redirect(303, '/admin/login');
  }

  if (event.locals.user.role !== 'admin') {
    error(403, 'Du har inte behörighet till den här sidan.');
  }

  return event.locals.user;
}

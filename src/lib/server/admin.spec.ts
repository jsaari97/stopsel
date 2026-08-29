import { describe, expect, it } from 'vitest';
import type { RequestEvent } from '@sveltejs/kit';
import { requireAdmin } from './admin';

function eventWithUser(user?: App.Locals['user']) {
  return { locals: { user } } as RequestEvent;
}

describe('requireAdmin', () => {
  it('redirects a signed-out visitor', () => {
    expect(() => requireAdmin(eventWithUser())).toThrowError(
      expect.objectContaining({ status: 303, location: '/admin/login' })
    );
  });

  it('rejects a user without the administrator role', () => {
    const user = { role: 'user' } as App.Locals['user'];

    expect(() => requireAdmin(eventWithUser(user))).toThrowError(
      expect.objectContaining({ status: 403 })
    );
  });

  it('returns an administrator', () => {
    const user = { id: 'admin-id', role: 'admin' } as App.Locals['user'];

    expect(requireAdmin(eventWithUser(user))).toBe(user);
  });
});

import { dev } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { guestIdentity } from '$lib/server/db/schema';

const guestCookieName = 'stopsel_guest';
const guestTokenPattern = /^[A-Za-z0-9_-]{43}$/;

export function hashGuestToken(token: string) {
  return createHash('sha256').update(token).digest('base64url');
}

export function getGuestToken(cookies: Cookies) {
  const token = cookies.get(guestCookieName);

  return token && guestTokenPattern.test(token) ? token : null;
}

export function getOrCreateGuestToken(cookies: Cookies) {
  const currentToken = getGuestToken(cookies);

  if (currentToken) return currentToken;

  const token = randomBytes(32).toString('base64url');

  cookies.set(guestCookieName, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: !dev,
    maxAge: 60 * 60 * 24 * 365 * 2
  });

  return token;
}

export async function getOrCreateGuestIdentity(token: string) {
  const tokenHash = hashGuestToken(token);
  const [existingGuest] = await db
    .select({ id: guestIdentity.id })
    .from(guestIdentity)
    .where(eq(guestIdentity.tokenHash, tokenHash))
    .limit(1);

  if (existingGuest) return existingGuest;

  const id = randomUUID();

  await db.insert(guestIdentity).values({ id, tokenHash }).onConflictDoNothing();

  const [guest] = await db
    .select({ id: guestIdentity.id })
    .from(guestIdentity)
    .where(eq(guestIdentity.tokenHash, tokenHash))
    .limit(1);

  if (!guest) throw new Error('Could not create the guest identity.');

  return guest;
}

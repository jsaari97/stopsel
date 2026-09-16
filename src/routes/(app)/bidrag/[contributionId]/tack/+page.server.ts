import { error } from '@sveltejs/kit';
import { getOwnedContribution } from '$lib/server/contributions';
import { getGuestToken, hashGuestToken } from '$lib/server/guests';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
  const guestToken = getGuestToken(cookies);

  if (!guestToken) error(404, 'Bidraget hittades inte.');

  const contribution = await getOwnedContribution(
    params.contributionId,
    hashGuestToken(guestToken)
  );

  if (!contribution) error(404, 'Bidraget hittades inte.');

  return { contribution };
};

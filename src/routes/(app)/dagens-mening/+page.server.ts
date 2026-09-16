import { error, fail, redirect } from '@sveltejs/kit';
import {
  contributionsAreEnabled,
  createContribution,
  hasReachedContributionLimit,
  maximumResponseLength,
  validateResponseText
} from '$lib/server/contributions';
import { getSelectedDialectArea } from '$lib/server/dialects';
import { getOrCreateGuestIdentity, getOrCreateGuestToken } from '$lib/server/guests';
import { getDailyPrompt } from '$lib/server/prompts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const prompt = await getDailyPrompt();

  if (!prompt) error(503, 'Det finns ingen mening att svara på just nu.');

  return {
    prompt,
    maximumResponseLength,
    contributionsEnabled: contributionsAreEnabled()
  };
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const formData = await request.formData();
    const responseValue = formData.get('responseText')?.toString() ?? '';
    const promptVersionId = Number(formData.get('promptVersionId'));
    const ownText = formData.get('ownText') === 'yes';
    const noPrivateInformation = formData.get('noPrivateInformation') === 'yes';
    const currentPrompt = await getDailyPrompt();
    const sharedFields = {
      responseText: responseValue,
      promptVersionId,
      ownText,
      noPrivateInformation
    };

    if (!contributionsAreEnabled()) {
      return fail(503, {
        ...sharedFields,
        message: 'Stöpsel tar inte emot bidrag ännu.'
      });
    }

    if (!currentPrompt || currentPrompt.promptVersionId !== promptVersionId) {
      return fail(409, {
        ...sharedFields,
        message: 'Dagens mening har ändrats. Ladda om sidan och försök igen.'
      });
    }

    const validation = validateResponseText(responseValue, currentPrompt.text);

    if ('message' in validation) {
      return fail(400, { ...sharedFields, message: validation.message });
    }

    if (!ownText || !noPrivateInformation) {
      return fail(400, {
        ...sharedFields,
        responseText: validation.responseText,
        message: 'Bekräfta båda punkterna innan du skickar svaret.'
      });
    }

    const dialectAreaId = Number(cookies.get('stopsel_dialect_area'));
    const dialect = Number.isInteger(dialectAreaId)
      ? await getSelectedDialectArea(dialectAreaId)
      : null;

    if (!dialect) redirect(303, '/valj-dialekt');

    const guestToken = getOrCreateGuestToken(cookies);
    const guest = await getOrCreateGuestIdentity(guestToken);

    if (await hasReachedContributionLimit(guest.id)) {
      return fail(429, {
        ...sharedFields,
        responseText: validation.responseText,
        message: 'Du har skickat flera svar på kort tid. Vänta en stund och försök igen.'
      });
    }

    const contributionId = await createContribution({
      promptVersionId,
      dialectAreaId: dialect.id,
      guestIdentityId: guest.id,
      responseText: validation.responseText
    });

    redirect(303, `/bidrag/${contributionId}/tack`);
  }
};

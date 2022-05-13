import authenticator from '~/services/auth.server';
import type { ActionFunction } from '@remix-run/node';

export const loader: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: '/' });
};

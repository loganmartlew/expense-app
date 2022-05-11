import authenticator from '~/services/auth.server';
import type { LoaderFunction } from '@remix-run/node';
import type { FC } from 'react';

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/signin',
  });
};

interface Props {}

const dashboard: FC<Props> = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default dashboard;

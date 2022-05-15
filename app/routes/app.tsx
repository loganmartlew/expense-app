import { Outlet } from '@remix-run/react';
import Shell from '~/features/Layout/Shell';
import authenticator from '~/services/auth.server';
import type { FC } from 'react';
import type { LoaderFunction } from '@remix-run/node';

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
};

interface Props {}

const App: FC<Props> = () => {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
};

export default App;

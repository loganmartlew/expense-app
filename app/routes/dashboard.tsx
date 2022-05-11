import { Form } from '@remix-run/react';
import authenticator from '~/services/auth.server';
import type { LoaderFunction } from '@remix-run/node';
import type { FC } from 'react';

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
};

interface Props {}

const dashboard: FC<Props> = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Form method='post' action='/logout'>
        <button type='submit'>Logout</button>
      </Form>
    </div>
  );
};

export default dashboard;

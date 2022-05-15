import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import authenticator from '~/services/auth.server';
import { sessionStorage } from '~/services/session.server';
import { Container } from '@mantine/core';
import LoginForm from '~/features/Auth/LoginForm';
import type { FC } from 'react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type FormError from '~/types/FormError';

export const action: ActionFunction = async ({ request, context }) => {
  const res = await authenticator.authenticate('form', request, {
    successRedirect: '/app',
    failureRedirect: '/login',
    throwOnError: true,
    context,
  });
  return res;
};

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  });

  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const error = session.get('sessionErrorKey');
  return json<any>({ error });
};

interface Props {}

const LoginPage: FC<Props> = () => {
  const loaderData = useLoaderData<FormError>();

  return (
    <Container>
      <LoginForm loaderData={loaderData} />
    </Container>
  );
};

export default LoginPage;

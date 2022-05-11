import { json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import authenticator from '~/services/auth.server';
import { sessionStorage } from '~/services/session.server';
import {
  Container,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
} from '@mantine/core';
import { At, Lock, Login } from 'tabler-icons-react';
import type { FC } from 'react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';

export const action: ActionFunction = async ({ request, context }) => {
  const res = await authenticator.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/signin',
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

const SignUpPage: FC<Props> = () => {
  const loaderData = useLoaderData<{ error?: { message: string } }>();

  return (
    <Container>
      <Form method='post' autoComplete='off'>
        <Stack>
          <TextInput
            name='email'
            label='Email'
            placeholder='Your Email'
            icon={<At size={16} />}
            required
          />
          <PasswordInput
            name='password'
            label='Password'
            placeholder='Your Password'
            icon={<Lock size={16} />}
            required
          />
          <PasswordInput
            name='password'
            label='Password'
            placeholder='Your Password'
            icon={<Lock size={16} />}
            required
          />
          {loaderData?.error ? (
            <Text size='sm' color='red'>
              {loaderData?.error?.message}
            </Text>
          ) : null}
          <Button type='submit' rightIcon={<Login size={18} />}>
            Sign In
          </Button>
          <Text align='center'>
            Don't have an account?{' '}
            <Anchor component={Link} to='/signup'>
              Sign Up.
            </Anchor>
          </Text>
        </Stack>
      </Form>
    </Container>
  );
};

export default SignUpPage;

import { json } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import authenticator from '~/services/auth.server';
import { sessionStorage } from '~/services/session.server';
import { Container } from '@mantine/core';
import { validateUserDto } from '~/validation/user';
import UserService from '~/services/UserService.server';
import SignUpForm from '~/features/Auth/SignUpForm';
import type { FC } from 'react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type UserDTO from '~/types/UserDTO';
import type FormError from '~/types/FormError';

export const action: ActionFunction = async ({ request, context }) => {
  const copiedRequest = request.clone();

  const body = await request.formData();

  const userDto = {
    fname: body.get('fname'),
    lname: body.get('lname'),
    email: body.get('email'),
    rawPassword: body.get('password'),
  };

  try {
    if (userDto.rawPassword !== body.get('passwordConfirm')) {
      return json({ error: { message: 'Passwords do not match' } });
    }

    const validUserDto = await validateUserDto(userDto as UserDTO);
    await UserService.addUser(validUserDto);
  } catch (err: any) {
    if (err.code === 'P2002') {
      return json({
        error: { message: 'Email is already linked to an account' },
      });
    }

    if (err.errors) {
      return json({ error: { message: err.errors[0] } });
    }

    return json({ error: { message: 'An error occurred' } });
  }

  const res = await authenticator.authenticate('form', copiedRequest, {
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

const SignUpPage: FC<Props> = () => {
  const loaderData = useLoaderData<FormError>();
  const actionData = useActionData<FormError>() as FormError;

  return (
    <Container>
      <SignUpForm loaderData={loaderData} actionData={actionData} />
    </Container>
  );
};

export default SignUpPage;

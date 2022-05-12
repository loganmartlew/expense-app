import { json } from '@remix-run/node';
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react';
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
import { Id, At, Lock, Login } from 'tabler-icons-react';
import { userDtoSchema } from '~/validation/user';
import UserService from '~/services/UserService.server';
import type { FC } from 'react';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import type UserDTO from '~/types/UserDTO';

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

    const validUserDto: UserDTO = await userDtoSchema.validate(userDto);
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
    successRedirect: '/dashboard',
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
  const loaderData = useLoaderData<{ error?: { message: string } }>();
  const actionData = useActionData<{ error?: { message: string } }>();

  return (
    <Container>
      <Form method='post' autoComplete='off'>
        <Stack>
          <TextInput
            name='fname'
            label='First Name'
            placeholder='Your First Name'
            icon={<Id size={16} />}
            required
          />
          <TextInput
            name='lname'
            label='Last Name'
            placeholder='Your Last Name'
            icon={<Id size={16} />}
            required
          />
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
            name='passwordConfirm'
            label='Password'
            placeholder='Your Password'
            icon={<Lock size={16} />}
            required
          />
          {loaderData?.error || actionData?.error ? (
            <Text size='sm' color='red'>
              {actionData?.error?.message || loaderData?.error?.message}
            </Text>
          ) : null}
          <Button type='submit' rightIcon={<Login size={18} />}>
            Sign Up
          </Button>
          <Text align='center'>
            Already have an account?{' '}
            <Anchor component={Link} to='/login'>
              Log In.
            </Anchor>
          </Text>
        </Stack>
      </Form>
    </Container>
  );
};

export default SignUpPage;

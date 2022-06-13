import { Form, Link } from '@remix-run/react';
import {
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
} from '@mantine/core';
import { Id, At, Lock, Login } from 'tabler-icons-react';
import type { FC } from 'react';
import type FormError from '~/types/FormError';

interface Props {
  loaderData: FormError;
  actionData: FormError;
}

const SignUpForm: FC<Props> = ({ loaderData, actionData }) => {
  return (
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
          <Anchor<typeof Link> component={Link} to='/login'>
            Log In.
          </Anchor>
        </Text>
      </Stack>
    </Form>
  );
};

export default SignUpForm;

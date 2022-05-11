import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';
import { At, Lock, UserPlus } from 'tabler-icons-react';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface Props {}

const SignInForm: FC<Props> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch('password', '');

  const submit: SubmitHandler<FormData> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack>
        <TextInput
          label='Email'
          placeholder='Your Email'
          icon={<At size={16} />}
          required
          {...register('email', {
            required: { value: true, message: 'Email is required' },
          })}
          error={errors.email?.message}
        />
        <PasswordInput
          label='Password'
          placeholder='Your Password'
          icon={<Lock size={16} />}
          required
          {...register('password', {
            required: { value: true, message: 'Password is required' },
          })}
          error={errors.password?.message}
        />
        <PasswordInput
          label='Confirm Password'
          placeholder='Your Password'
          icon={<Lock size={16} />}
          {...register('passwordConfirm', {
            validate: value =>
              value === password.current || 'Passwords do not match',
          })}
          error={errors.passwordConfirm?.message}
        />
        <Button type='submit' rightIcon={<UserPlus size={18} />} mt='1em'>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default SignInForm;

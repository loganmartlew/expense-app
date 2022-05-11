import { useForm } from 'react-hook-form';
import { Stack, TextInput, PasswordInput, Button } from '@mantine/core';
import { At, Lock, Login } from 'tabler-icons-react';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

interface Props {}

const SignInForm: FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

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
        <Button type='submit' rightIcon={<Login size={18} />} mt='1em'>
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

export default SignInForm;

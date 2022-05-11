import { Container } from '@mantine/core';
import SignUpForm from '~/components/SignUpForm';
import type { FC } from 'react';

interface Props {}

const SignUpPage: FC<Props> = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
};

export default SignUpPage;

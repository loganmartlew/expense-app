import { Container } from '@mantine/core';
import SignInForm from '~/components/SignInForm';
import type { FC } from 'react';

interface Props {}

const signin: FC<Props> = () => {
  return (
    <Container>
      <SignInForm />
    </Container>
  );
};

export default signin;

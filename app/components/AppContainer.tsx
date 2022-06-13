import { Container } from '@mantine/core';
import type { FC } from 'react';

interface Props {}

const AppContainer: FC<Props> = ({ children }) => {
  return (
    <Container sx={{ width: '100%', marginInline: 0, maxWidth: 'unset' }}>
      {children}
    </Container>
  );
};

export default AppContainer;

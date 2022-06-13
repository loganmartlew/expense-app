import { MantineProvider } from '@mantine/core';
import theme from '~/features/Style/theme';
import type { FC } from 'react';

interface Props {}

const Providers: FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
      {children}
    </MantineProvider>
  );
};

export default Providers;

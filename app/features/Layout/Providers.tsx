import { Global, MantineProvider } from '@mantine/core';
import theme from '~/features/Style/theme';
import globals from '~/features/Style/globals';
import type { FC } from 'react';

interface Props {}

const Providers: FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
      <Global styles={globals} />
      {children}
    </MantineProvider>
  );
};

export default Providers;

import { MantineProvider } from '@mantine/core';
import type { FC } from 'react';

interface Props {}

const Providers: FC<Props> = ({ children }) => {
  return <MantineProvider withNormalizeCSS>{children}</MantineProvider>;
};

export default Providers;

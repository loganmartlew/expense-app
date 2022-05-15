import { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import Header from './Header';
import type { FC } from 'react';
import Sidenav from './Sidenav';

interface Props {}

const Shell: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      navbarOffsetBreakpoint='sm'
      fixed
      sx={{
        main: {
          paddingRight: 0,
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[2],
        },
      }}
      header={<Header open={open} toggleOpen={() => setOpen(o => !o)} />}
      navbar={<Sidenav open={open} />}
    >
      {children}
    </AppShell>
  );
};

export default Shell;

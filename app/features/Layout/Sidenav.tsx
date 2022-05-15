import { Navbar, Text } from '@mantine/core';
import type { FC } from 'react';

interface Props {
  open: boolean;
}

const Sidenav: FC<Props> = ({ open }) => {
  return (
    <Navbar
      p='md'
      hiddenBreakpoint='sm'
      hidden={!open}
      width={{ sm: 200, lg: 300 }}
    >
      <Text>Application navbar</Text>
    </Navbar>
  );
};

export default Sidenav;

import {
  Burger,
  Header,
  MediaQuery,
  Title,
  useMantineTheme,
} from '@mantine/core';
import type { FC } from 'react';

interface Props {
  open: boolean;
  toggleOpen: () => void;
}

const AppHeader: FC<Props> = ({ open, toggleOpen }) => {
  const theme = useMantineTheme();

  return (
    <Header height={70} p='md'>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Burger
            opened={open}
            onClick={() => toggleOpen()}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xl'
          />
        </MediaQuery>
        <Title>Expense Tracker</Title>
      </div>
    </Header>
  );
};

export default AppHeader;

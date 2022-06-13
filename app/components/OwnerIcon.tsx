import { Crown } from 'tabler-icons-react';
import { Tooltip, useMantineTheme } from '@mantine/core';
import type { FC } from 'react';

interface Props {}

const OwnerIcon: FC<Props> = () => {
  const theme = useMantineTheme();
  console.log(theme);

  return (
    <Tooltip label='Household Owner' openDelay={1000}>
      <Crown color={theme.colors.yellow[5]} />
    </Tooltip>
  );
};

export default OwnerIcon;

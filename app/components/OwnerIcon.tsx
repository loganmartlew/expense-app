import { Crown } from 'tabler-icons-react';
import { useMantineTheme } from '@mantine/core';
import type { FC } from 'react';

interface Props {}

const OwnerIcon: FC<Props> = () => {
  const theme = useMantineTheme();
  console.log(theme);

  return <Crown color={theme.colors.yellow[5]} />;
};

export default OwnerIcon;

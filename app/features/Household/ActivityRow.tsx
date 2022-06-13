import { useCallback } from 'react';
import { Group, Text, Box, Badge, Tooltip } from '@mantine/core';
import { ActivityType } from '~/types/Activity';
import type { FC } from 'react';
import type { MantineTheme, CSSObject } from '@mantine/core';
import type { Activity } from '~/types/Activity';

interface Props {
  activity: Activity;
}

const ActivityRow: FC<Props> = ({ activity }) => {
  const getColor = useCallback((type: ActivityType) => {
    switch (type) {
      case ActivityType.IN:
        return 'green';
      case ActivityType.OUT:
        return 'red';
      default:
        return 'blue';
    }
  }, []);

  return (
    <Group align='center' noWrap>
      <Box
        sx={(theme: MantineTheme): CSSObject => ({
          height: 10,
          aspectRatio: '1/1',
          borderRadius: '100vh',
          backgroundColor: theme.colors[getColor(activity.type)],
        })}
      />
      <Group spacing='xs' sx={{ flexGrow: 1 }} noWrap>
        <Badge>{activity.name}</Badge>
        <Text lineClamp={1}>{activity.message}</Text>
      </Group>
      <Tooltip label={activity.timestamp.toDateString()} withArrow>
        <Text sx={{ width: 'max-content' }}>2 days ago</Text>
      </Tooltip>
    </Group>
  );
};

export default ActivityRow;

import {
  Card,
  Title,
  Group,
  Text,
  Stack,
  RingProgress,
  Tooltip,
  Box,
} from '@mantine/core';
import { User } from 'tabler-icons-react';
import type { FC } from 'react';
import type { HouseholdCardData } from '~/types/Household';

interface Props {
  household: HouseholdCardData;
}

const HouseholdCard: FC<Props> = ({ household }) => {
  const ringValue =
    household.totalBudget.amount > 0
      ? household.totalBudget.used / household.totalBudget.amount
      : 0;

  return (
    <Card sx={{ minWidth: 'max-content', flex: '1 1 0px' }}>
      <Stack>
        <Title order={3}>{household.name}</Title>
        <Group>
          <Stack>
            <Text>{household.owner.fname + ' ' + household.owner.lname}</Text>
            <Group>
              <User />
              <Text>{household.userCount}</Text>
            </Group>
          </Stack>
          <Box>
            <Text>Total Budget Used:</Text>
            <RingProgress
              label={<Text align='center'>{`${ringValue}%`}</Text>}
              sections={[
                {
                  value: ringValue,
                  color: 'cyan',
                },
              ]}
            />
          </Box>
        </Group>
      </Stack>
    </Card>
  );
};

export default HouseholdCard;

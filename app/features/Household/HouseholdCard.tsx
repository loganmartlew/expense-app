import { Link } from '@remix-run/react';
import {
  Card,
  Title,
  Group,
  Text,
  Stack,
  RingProgress,
  Center,
  Button,
} from '@mantine/core';
import { User } from 'tabler-icons-react';
import OwnerIcon from '~/components/OwnerIcon';
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
    <Card sx={{ flex: '1 1 0px', width: 'max-content', minWidth: '28ch' }}>
      <Stack>
        <Link to={`/households/${household.id}`}>
          <Title order={3}>{household.name}</Title>
        </Link>
        <Group align='center' spacing={0}>
          <User size={18} />
          <Text sx={{ lineHeight: '1rem' }}>
            {household.userCount === 1
              ? `${household.userCount} user`
              : `${household.userCount} users`}
          </Text>
        </Group>
        <Group spacing={5}>
          <OwnerIcon />
          <Text>{household.owner.fname + ' ' + household.owner.lname}</Text>
        </Group>
        <Center>
          <RingProgress
            label={<Text align='center'>{`${ringValue}%`}</Text>}
            sections={[
              {
                value: ringValue,
                color: 'cyan',
              },
            ]}
          />
        </Center>
        <Button
          component={Link}
          to={`/households/${household.id}`}
          variant='light'
        >
          View Household
        </Button>
      </Stack>
    </Card>
  );
};

export default HouseholdCard;

import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Group, Title, Text, Stack, Card } from '@mantine/core';
import { User, Activity as ActivityIcon } from 'tabler-icons-react';
import authenticator from '~/services/auth.server';
import HouseholdService from '~/features/Household/HouseholdService.server';
import ActivityRow from '~/features/Household/ActivityRow';
import { ActivityType } from '~/types/Activity';
import type { LoaderFunction } from '@remix-run/node';
import type { FC } from 'react';
import type { HouseholdFull } from '~/types/Household';
import type { Activity } from '~/types/Activity';

interface LoaderData {
  household: HouseholdFull;
}

export let loader: LoaderFunction = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) return user;
  if (user instanceof Error) return user;

  const household = await HouseholdService.getHousehold(params.householdId!);

  if (!household) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const data: LoaderData = { household };
  return json(data);
};

const activities: Activity[] = [
  {
    id: '1',
    type: ActivityType.IN,
    name: 'Logan Martlew',
    message: 'added income of $342.65 to the household.',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: ActivityType.OUT,
    name: 'Logan Martlew',
    message: 'added expense of $6 to the household.',
    timestamp: new Date(),
  },
  {
    id: '3',
    type: ActivityType.NEUTRAL,
    name: 'Logan Martlew',
    message: 'invited Alicia Allan to the household.',
    timestamp: new Date(),
  },
];

interface Props {}

const HouseholdPage: FC<Props> = () => {
  const { household } = useLoaderData<LoaderData>();
  return (
    <Stack>
      <Group>
        <Title order={2} sx={{ fontSize: '3rem' }}>
          {household.name}
        </Title>
        {/* <Group align='center' spacing={0}>
          <User size={18} />
          <Text sx={{ lineHeight: '1rem' }}>
            {household.users.length === 1
              ? `${household.users.length} user`
              : `${household.users.length} users`}
          </Text>
        </Group> */}
      </Group>
      <Card>
        <Group mb='1em'>
          <ActivityIcon />
          <Title order={3}>Recent Activity</Title>
        </Group>
        {activities.map(activity => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
      </Card>
    </Stack>
  );
};

export default HouseholdPage;

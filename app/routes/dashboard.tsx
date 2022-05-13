import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import authenticator from '~/services/auth.server';
import { Container, Group, Title, Button } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import HouseholdService from '~/services/HouseholdService.server';
import type { Household } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import type { FC } from 'react';

interface LoaderData {
  households: Household[];
}

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) return user;
  if (user instanceof Error) return user;

  const households = await HouseholdService.getHouseholdsOfUser(user.id);
  const data: LoaderData = { households };
  return json(data);
};

interface Props {}

const DashboardPage: FC<Props> = () => {
  const { households } = useLoaderData<LoaderData>();

  return (
    <Container>
      <Group>
        <Title>Households</Title>
        <Link to='/new-household'>
          <Button leftIcon={<Plus size={18} />}>New Household</Button>
        </Link>
        <Link to='/logout'>
          <Button leftIcon={<Plus size={18} />}>logout</Button>
        </Link>
      </Group>
      {households.length < 1 ? (
        <p>No Households</p>
      ) : (
        households.map(household => <p key={household.id}>{household.name}</p>)
      )}
    </Container>
  );
};

export default DashboardPage;

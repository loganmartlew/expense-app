import { useState } from 'react';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import authenticator from '~/services/auth.server';
import { Container, Group, Title, Button } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import HouseholdService from '~/features/Household/HouseholdService.server';
import type { Household } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import type { FC } from 'react';
import NewHouseholdModal from '~/features/Household/NewHouseholdModal';

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
  console.log(households);
  const data: LoaderData = { households };
  return json(data);
};

interface Props {}

const DashboardPage: FC<Props> = () => {
  const { households } = useLoaderData<LoaderData>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <Container>
      <Group>
        <Title>Households</Title>
        <Button
          size='xs'
          leftIcon={<Plus size={18} />}
          onClick={() => setModalOpen(true)}
        >
          New Household
        </Button>
        <NewHouseholdModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
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

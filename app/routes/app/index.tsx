import { useState } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import authenticator from '~/services/auth.server';
import { Container, Group, Title, Button } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import HouseholdService from '~/features/Household/HouseholdService.server';
import HouseholdHorizontalList from '~/features/Household/HouseholdHorizontalList';
import NewHouseholdModal from '~/features/Household/NewHouseholdModal';
import type { LoaderFunction } from '@remix-run/node';
import type { FC } from 'react';
import type { HouseholdCardData } from '~/types/Household';

interface LoaderData {
  households: HouseholdCardData[];
}

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);

  if (!user) return user;
  if (user instanceof Error) return user;

  const households = await HouseholdService.getHouseholdCardData(user.id);
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
      </Group>
      {households.length < 1 ? (
        <p>No Households</p>
      ) : (
        <HouseholdHorizontalList households={households} />
      )}
    </Container>
  );
};

export default DashboardPage;

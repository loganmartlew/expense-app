import { Link } from '@remix-run/react';
import authenticator from '~/services/auth.server';
import { Container, Group, Title, Button } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import type { LoaderFunction } from '@remix-run/node';
import type { FC } from 'react';

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
};

interface Props {}

const dashboard: FC<Props> = () => {
  return (
    <Container>
      <Group>
        <Title>Households</Title>
        <Link to='/new-household'>
          <Button leftIcon={<Plus size={18} />}>New Household</Button>
        </Link>
      </Group>
    </Container>
  );
};

export default dashboard;

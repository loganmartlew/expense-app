import authenticator from '~/services/auth.server';
import HouseholdService from '~/features/Household/HouseholdService.server';
import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import type { FC } from 'react';
import type { HouseholdFull } from '~/types/Household';

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

interface Props {}

const HouseholdPage: FC<Props> = () => {
  return <div></div>;
};

export default HouseholdPage;

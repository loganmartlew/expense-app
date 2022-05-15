import { json, redirect } from '@remix-run/node';
import authenticator from '~/services/auth.server';
import HouseholdService from '~/features/Household/HouseholdService.server';
import { validateHouseholdDto } from '~/validation/household';
import type { ActionFunction } from '@remix-run/node';
import type HouseholdDTO from '~/types/HouseholdDTO';

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) return user;
  if (user instanceof Error) return user;

  const householdDto: HouseholdDTO = {
    name: body.get('name') as string,
    ownerId: user.id,
  };

  try {
    const validHouseholdDto = await validateHouseholdDto(householdDto);
    await HouseholdService.addHousehold(validHouseholdDto);
    return redirect('/dashboard');
  } catch (err: any) {
    if (err.errors) {
      return json({ error: { message: err.errors[0] } });
    }

    return json({ error: { message: 'An error occurred' } });
  }
};

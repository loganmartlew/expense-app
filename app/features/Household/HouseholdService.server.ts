import { validateHouseholdDto } from '~/validation/household';
import type HouseholdDTO from '~/types/HouseholdDTO';
import type { Household } from '@prisma/client';
import { db } from '~/utils/db.server';

export default class HouseholdService {
  static async addHousehold(householdData: HouseholdDTO): Promise<Household> {
    const validHouseholdData = await validateHouseholdDto(householdData);

    const household = await db.household.create({
      data: {
        ...validHouseholdData,
        users: {
          connect: {
            id: validHouseholdData.ownerId,
          },
        },
      },
    });

    return household;
  }

  static async getHousehold(householdId: string): Promise<Household | null> {
    const household = await db.household.findUnique({
      where: { id: householdId },
    });

    return household;
  }

  static async getHouseholdsOfUser(userId: string): Promise<Household[]> {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { households: true },
    });
    console.log(user);
    if (!user) return [];

    return user.households;
  }
}

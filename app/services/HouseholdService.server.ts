import type HouseholdDTO from '~/types/HouseholdDTO';
import type { Household } from '@prisma/client';

export default class HouseholdService {
  static async addHousehold(householdData: HouseholdDTO): Promise<Household> {}

  static async getHousehold(id: string): Promise<Household> {}

  static async getHouseholdsOfUser(id: string): Promise<Household[]> {}
}

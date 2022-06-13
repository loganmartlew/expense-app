import { db } from '~/utils/db.server';
import { validateHouseholdDto } from '~/validation/household';
import type HouseholdDTO from '~/types/HouseholdDTO';
import type { Household } from '@prisma/client';
import type {
  HouseholdWithUsersAndOwner,
  HouseholdFull,
} from '~/types/Household';

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

  static async getHousehold(
    householdId: string
  ): Promise<HouseholdFull | null> {
    const household = await db.household.findUnique({
      where: { id: householdId },
      include: {
        users: true,
        owner: true,
        budgets: {
          include: {
            expenses: true,
          },
        },
        recurringExpenses: true,
        incomes: true,
      },
    });

    return household;
  }

  static async getHouseholdsOfUser(
    userId: string
  ): Promise<HouseholdWithUsersAndOwner[]> {
    const households = (await db.household.findMany({
      include: {
        users: {
          select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
            password: false,
          },
        },
        owner: {
          select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
            password: false,
          },
        },
      },
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    })) as HouseholdWithUsersAndOwner[];

    return households;
  }

  static async getHouseholdCardData(userId: string) {
    const households = await db.household.findMany({
      include: {
        users: {
          select: {
            _count: true,
          },
        },
        owner: {
          select: {
            fname: true,
            lname: true,
            password: false,
          },
        },
        budgets: {
          include: {
            expenses: {
              select: {
                id: true,
                amount: true,
              },
            },
          },
        },
      },
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    const budgetedHouseholds = households.map(household => ({
      id: household.id,
      name: household.name,
      owner: household.owner,
      userCount: household.users.length,
      totalBudget: {
        amount: household.budgets.reduce(
          (amount, curr) => amount + curr.amount,
          0
        ),
        used: household.budgets.reduce(
          (amount, curr) =>
            amount +
            curr.expenses.reduce(
              (expenseAmount, currExpense) =>
                expenseAmount + currExpense.amount,
              0
            ),
          0
        ),
      },
    }));

    return budgetedHouseholds;
  }
}

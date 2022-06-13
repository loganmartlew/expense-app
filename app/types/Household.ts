import { Prisma } from '@prisma/client';

const householdWithUsers = Prisma.validator<Prisma.HouseholdArgs>()({
  include: {
    users: true,
  },
});
export type HouseholdWithUsers = Prisma.HouseholdGetPayload<
  typeof householdWithUsers
>;

const householdWithOwner = Prisma.validator<Prisma.HouseholdArgs>()({
  include: {
    owner: true,
  },
});
export type HouseholdWithOwner = Prisma.HouseholdGetPayload<
  typeof householdWithOwner
>;

export type HouseholdWithUsersAndOwner = HouseholdWithUsers &
  HouseholdWithOwner;

const householdFull = Prisma.validator<Prisma.HouseholdArgs>()({
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
export type HouseholdFull = Prisma.HouseholdGetPayload<typeof householdFull>;

export interface HouseholdCardData {
  id: string;
  name: string;
  owner: {
    fname: string;
    lname: string;
  };
  userCount: number;
  totalBudget: {
    amount: number;
    used: number;
  };
}

import type { Household } from '@prisma/client';
import type UserPublic from './UserPublic';

export type HouseholdUsersOwner = Household & {
  users: UserPublic[];
  owner: UserPublic;
};

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

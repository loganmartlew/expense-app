import { db } from '~/utils/db.server';
import { comparePassword, hashPassword } from '~/utils/hash.server';
import type UserDTO from '~/types/UserDTO';
import type { User } from '@prisma/client';
import type UserPublic from '~/types/UserPublic';

export default class UserService {
  static sanitizeUser(user: User): UserPublic {
    const safeUser: UserPublic = {
      id: user.id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    };

    return safeUser;
  }

  static async addUser(userData: UserDTO): Promise<UserPublic> {
    // validate user

    const password = await hashPassword(userData.rawPassword);

    const newUserData = {
      fname: userData.fname,
      lname: userData.lname,
      email: userData.email,
      password,
    };

    const user = await db.user.create({
      data: newUserData,
    });

    return this.sanitizeUser(user);
  }

  static async matchCredentials(
    email: string,
    password: string
  ): Promise<UserPublic | false> {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return false;

    const match = await comparePassword(password, user.password);
    if (!match) return false;

    return this.sanitizeUser(user);
  }
}

import { db } from '~/utils/db.server';
import type UserDTO from '~/types/UserDTO';
import type { User } from '@prisma/client';

export default class UserService {
  static async addUser(userData: UserDTO): Promise<User> {
    // validate user

    // hash password
    const password = userData.rawPassword;

    const newUserData = {
      fname: userData.fname,
      lname: userData.lname,
      email: userData.email,
      password,
    };

    const user = await db.user.create({
      data: newUserData,
    });

    return user;
  }

  static async matchCredentials(
    email: string,
    password: string
  ): Promise<User | false> {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return false;

    // hash password
    const hashedPassword = password;
    if (hashedPassword !== password) return false;

    return user;
  }
}

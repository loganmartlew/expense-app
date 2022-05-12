import { compare, hash } from 'bcrypt';
import { getConfig } from '~/config/config.server';

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, getConfig().saltRounds);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const match = await compare(password, hashedPassword);
  return match;
};

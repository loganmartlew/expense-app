export const getConfig = () => {
  return {
    cookieSecret: process.env.COOKIE_SECRET || '',
    saltRounds: +process.env.SALT_ROUNDS! || 10,
  };
};

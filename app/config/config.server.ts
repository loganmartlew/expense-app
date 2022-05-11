export const getConfig = () => {
  return {
    cookieSecret: process.env.COOKIE_SECRET || ('' as string),
  };
};

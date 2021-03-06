import { Authenticator, AuthorizationError } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage } from '~/services/session.server';
import UserService from './UserService.server';
import type UserPublic from '~/types/UserPublic';

// Create an instance of the authenticator, pass a Type, User,  with what
// strategies will return and will store in the session
const authenticator = new Authenticator<UserPublic | Error | null>(
  sessionStorage,
  {
    sessionKey: 'sessionKey', // keep in sync
    sessionErrorKey: 'sessionErrorKey', // keep in sync
  }
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get('email') as string;
    let password = form.get('password') as string;

    if (!email || email?.length === 0)
      throw new AuthorizationError('Email is required');
    if (typeof email !== 'string')
      throw new AuthorizationError('Email must be a string');

    if (!password || password?.length === 0)
      throw new AuthorizationError('Password is required');
    if (typeof password !== 'string')
      throw new AuthorizationError('Password must be a string');

    const user = await UserService.matchCredentials(email, password);

    // login the user, this could be whatever process you want
    if (user) {
      // the type of this user must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return await Promise.resolve({ ...user });
    } else {
      // if problem with user throw error AuthorizationError
      throw new AuthorizationError('The email or password was incorrect');
    }
  })
);

export default authenticator;

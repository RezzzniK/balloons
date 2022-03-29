import { compare, hash } from 'bcryptjs';
import { loginDb } from '../dal/user.login.db';
import { env } from '../constants/env';
//MAKE BYCRYPT
export const UserCreateBecrypt = async (password: string) => {
  try {
    const hashedPassword = hash(password, env.HASH);

    console.log('in auth printing hashed pass');
    console.log(`${(await hashedPassword).toString}`);
    return hashedPassword;
  } catch (error) {
    return '500';
  }
};
export const UserLoginBecrypt = async (username: string, password: string) => {
  try {
  } catch (error) {}
  const user = await loginDb(username);
  if (await compare(password, user.password)) {
    console.log('success:true');
    return user;
  } else {
    console.log('success:false');
    return '500';
  }
};

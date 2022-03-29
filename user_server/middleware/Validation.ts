import { creatUserDb } from '../dal/user.login.db';
import { UserCreateBecrypt } from './auth';
import { UserCreateSchema } from './validSchema';

export const ValidateCreateUser = async (
  userName: string,
  passWord: string
) => {
  console.log('in user create validator, printing body data');
  console.log(userName + ' ' + passWord);

  const result = UserCreateSchema.validate({
    username: userName,
    password: passWord,
  });
  if (result.error) {
    throw new Error(result.error.details[0].message);
  } else {
    console.log('validation:success');
    const userWithHash = await UserCreateBecrypt(passWord);
    console.log('hashing:success');
    const user = await creatUserDb({
      username: userName,
      password: userWithHash,
    });
    console.log('new user: success');
    console.log(await user.toString());
    return await user;
  }
};

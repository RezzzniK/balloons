import { loginDb } from '../dal/user.login.db';

export const logInUser = async (req: any, res: any) => {
  const user = await loginDb(req.body.username, req.body.password);
  if (Object.keys(user).length === 0) {
    console.log('404');
    res.send(user);
  } else {
    console.log('200');
    console.log(user);
    res.send(user);
  }
};

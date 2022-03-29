import { UserLoginBecrypt } from '../middleware/auth';
import { ValidateCreateUser } from '../middleware/Validation';
import * as jwt from 'jsonwebtoken';
import { env } from '../constants/env';
import { json } from 'express';
export const creatUser = async (req: any, res: any) => {
  console.log('in create user controller');
  try {
    const user = await ValidateCreateUser(req.body.username, req.body.password);

    console.log('printing user');

    res.status(200).send(user);
  } catch (error) {
    res.status(401).send();
  }
};
export const logInUser = async (req: any, res: any) => {
  const user = await UserLoginBecrypt(req.body.username, req.body.password);
  console.log('in login user controller');
  console.log(`username: ${user.username}, user_id:${user._id}`);
  const accessToken = jwt.sign(
    { username: user.username, _id: user._id },
    env.JWT_TOKEN_SECRET
  );
  if (user === '500') {
    res.status(401).send();
  } else {
    console.log('pass:');
    console.log(user);
    //const user = await loginDb(req.body.username, pass);
    if (user === null /*Object.keys(user).length === 0*/) {
      console.log('404');
      res.status(404).send({
        message: 'not found',
      });
    } else {
      console.log('200');
      console.log(user);
      //res.send(user);
      res.json({ access_token: accessToken });
    }
  }
};

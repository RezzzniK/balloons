import mongoose from 'mongoose';

import userDb from '../models/schemas/user.model';
import { env } from '../constants/env';

mongoose.connect(`${env.User_DB}`).then(() => {
  console.log('connected to users db');
});

export const loginDb = async (userName: string /*, passWord: string*/) => {
  return await userDb.findOne({
    username: userName,
    //password: passWord,
  });
};

export const creatUserDb = async (req: Object) => {
  let newUser = new userDb(req);
  await userDb.create(newUser);
  console.log('in dal user: user created');
  return await userDb.findOne({ username: newUser.username });
};

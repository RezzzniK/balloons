import mongoose from 'mongoose';

import userDb from '../models/schemas/user.model';
import { env } from '../constants/env';

mongoose.connect(`${env.User_DB}`).then(() => {
  console.log('connected to users db');
});

export const loginDb = async (userName: string, passWord: string) => {
  return await userDb.findOne({
    username: userName,
    password: passWord,
  });
};

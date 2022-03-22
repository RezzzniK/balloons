import mongoose from 'mongoose';

import { env } from '../constants/env';

export const connectionToUsersDb = mongoose
  .connect(`${env.User_DB}`)
  .then(() => {
    console.log('connected to users db');
  });

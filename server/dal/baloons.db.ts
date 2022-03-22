import mongoose from 'mongoose';

import { env } from '../constants/env';

export const connectionToBaloonsDb = mongoose
  .connect(`${env.Balloon_DB}`)
  .then(() => {
    console.log('connected to Balloons db');
  });

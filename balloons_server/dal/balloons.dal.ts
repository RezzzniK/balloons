import mongoose from 'mongoose';

import balloon from '../models/schemas/balloon.model';
import { env } from '../constants/env';

mongoose.connect(`${env.Balloon_DB}`).then(() => {
  console.log('connected to balloons db');
});
//editBalloonDb
export const editBalloonDb = async (balloonz: Object) => {
  let newBalloon = new balloon(balloonz);
  await balloon.updateOne({ _id: newBalloon._id }, newBalloon);
  return await balloon.find({ user_id: newBalloon.user_id });
};

//createBalloonDb
export const createBalloonDb = async (balloonz: Object) => {
  let newBalloon = new balloon(balloonz);
  await newBalloon.save();
  return await balloon.find({ user_id: newBalloon.user_id });
};

export const baloonsByIdDb = async (id: string) => {
  return await balloon.find({
    user_id: id,
  });
};

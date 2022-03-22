import mongoose from 'mongoose';
import balloon from '../models/schemas/balloon.model';
import balloonEdit from '../models/schemas/balloonEditSchema';

import { env } from '../constants/env';

mongoose.connect(`${env.Balloon_DB}`).then(() => {
  console.log('connected to balloons db');
});
//editBalloonDb
export const editBalloonDb = async (balloonz: Object) => {
  console.log(balloonz);
  let newBalloon = new balloon(balloonz);
  console.log('printing newBalon before update');
  console.log(newBalloon);
  //console.log(await newBalloon.find({ _id: bid }));
  await newBalloon.update({ _id: newBalloon._id }, { newBalloon });
  //await newBalloon.save();
  return await balloon.find({ user_id: newBalloon.user_id });
};

//createBalloonDb`
export const createBalloonDb = async (balloonz: Object) => {
  console.log(balloonz);
  let newBalloon = new balloon(balloonz);
  await newBalloon.save();
  return await balloon.find({ user_id: newBalloon.user_id });
};

export const baloonsByIdDb = async (id: string) => {
  console.log('in balloons dal');
  console.log(id);
  console.log(await balloon.find());
  return await balloon.find({
    user_id: id,
    // _id: '622f46ee1c4ca89e09081d5f',
  });
};

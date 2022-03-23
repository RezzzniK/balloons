import {
  ValidateEditBalloon,
  ValidateCreateBalloon,
} from '../middleware/validConstructorMethods';
import {
  baloonsByIdDb,
  createBalloonDb,
  /*editBalloonDb,*/
} from '../dal/balloons.dal';

//editBalloonCtr
export const editBalloonCtr = async (req: any, res: any) => {
  console.log(req.body);
  console.log('meow');
  try {
    const balloons = await ValidateEditBalloon(req.body.balloon);
    console.log('200');
    console.log(balloons);
    res.status(200).send(balloons);
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: 'Validation error.',
      error: error,
    });
  }
};
//createBalloon
export const createBalloon = async (req: any, res: any) => {
  console.log(req.body.balloon);
  console.log('meow');
  try {
    const balloons = await ValidateCreateBalloon(req.body.balloon);
    console.log('200');
    console.log(balloons);
    res.status(200).send(balloons);
  } catch (error) {
    console.log(error);
    res.status(422).json({
      message: 'Validation error',
      error: error,
    });
  }
  // const balloons = await createBalloonDb(req.body.balloon);
  // console.log('how');
  // console.log(balloons);
  // if (Object.keys(balloons).length === 0) {
  //   console.log('404');
  //   //res.send(balloons);
  // } else {
  //   console.log('200');
  //   console.log(balloons);
  //   res.send(balloons);
  // }
};
export const balloonsByUser = async (req: any, res: any) => {
  console.log(req.body.user_id);
  console.log('meow');
  const balloons = await baloonsByIdDb(req.body.user_id);
  console.log('how');
  console.log(balloons);
  if (Object.keys(balloons).length === 0) {
    console.log('404');
    //res.send(balloons);
  } else {
    console.log('200');
    console.log(balloons);
    res.send(balloons);
  }
};

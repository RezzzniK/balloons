import {
  BalloonValidatorSchema,
  BalloonCreateValidatorSchema,
} from '../middleware/validator';
import { editBalloonDb, createBalloonDb } from '../dal/balloons.dal';

export const ValidateEditBalloon = async (req: Object) => {
  console.log('in balloons validator, printing body data');
  console.log(req);

  const result = BalloonValidatorSchema.validate(req);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  } else {
    const balloons = await editBalloonDb(req);
    return await balloons;
  }
};

export const ValidateCreateBalloon = async (req: Object) => {
  console.log('in balloons create validator, printing body data');
  console.log(req);

  const result = BalloonCreateValidatorSchema.validate(req);
  if (result.error) {
    throw new Error(result.error.details[0].message);
  } else {
    const balloons = await createBalloonDb(req);
    return await balloons;
  }
};

import Joi from 'joi';
export const BalloonValidatorSchema = Joi.object().keys({
  _id: Joi.string(),
  user_id: Joi.string().required(),
  name: Joi.string().min(4).max(25).required(),
  description: Joi.string().min(4).max(150).required(),
  type: Joi.string().required(),
  color: Joi.string().required(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  altitude: Joi.number(),
});

export const BalloonCreateValidatorSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  name: Joi.string().min(4).max(25).required(),
  description: Joi.string().min(4).max(150).required(),
  type: Joi.string().required(),
  color: Joi.string().required(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  altitude: Joi.number(),
});

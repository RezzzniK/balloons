import Joi from 'joi';
export const UserCreateSchema = Joi.object().keys({
  username: Joi.string().min(4).max(25).required(),
  password: Joi.string()
    .min(8)
    .max(12)
    .regex(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')
    )
    .required(),
});

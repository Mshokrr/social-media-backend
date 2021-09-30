import { Joi } from 'express-validation';

export default {
  register: {
    body: Joi.object({
      user: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().required(),
        profilePicture: Joi.string(),
      }),
    }),
  },
  confirm: {},
  login: {
    body: Joi.object({
      user: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
  },
  forgot: {},
  reset: {},
};

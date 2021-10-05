import { Joi } from 'express-validation';

export default {
  search: {
    body: Joi.object({
      models: Joi.array().items(Joi.string()),
    }),
  },
};

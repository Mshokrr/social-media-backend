import { Joi } from 'express-validation';

export default {
  sendEmail: {
    body: Joi.object({
      mail: Joi.object({
        subject: Joi.string().required(),
        title: Joi.string(),
        subtitle: Joi.string(),
        text: Joi.string(),
        drivers: Joi.array(),
        button: Joi.boolean(),
        link: Joi.string(),
        buttonText: Joi.string(),
      }),
      receivers: Joi.array()
        .items(Joi.string().email())
        .min(1),
      cc: Joi.array().items(Joi.string().email()),
      bcc: Joi.array().items(Joi.string().email()),
      template: Joi.string(),
      templateName: Joi.string(),
      senders: Joi.array().items(
        Joi.object({
          service: Joi.string(),
          auth: Joi.object({
            user: Joi.string().required(),
            pass: Joi.string().required(),
          }),
        }),
      ),
    }),
  },
};

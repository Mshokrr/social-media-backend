import { Joi } from 'express-validation';

export default {
  createPost: {
    body: Joi.object({
      post: Joi.object({
        title: Joi.string().required(),
        text: Joi.string().required(),
        imageUrl: Joi.string(),
      }),
    }),
  },
  getPost: {
    params: {
      id: Joi.number()
        .integer()
        .required(),
    },
  },
  deletePost: {
    params: {
      id: Joi.number()
        .integer()
        .required(),
    },
  },
  likePost: {
    params: {
      id: Joi.number()
        .integer()
        .required(),
    },
  },
  createComment: {
    params: {
      postId: Joi.number()
        .integer()
        .required(),
    },
    body: Joi.object({
      text: Joi.string().required(),
    }),
  },
  deleteComment: {
    params: {
      id: Joi.number()
        .integer()
        .required(),
    },
  },
};

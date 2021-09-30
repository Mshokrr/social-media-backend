import { validate, httpError } from '@util';

import validation from './validation';
import model from './model';

/**
 * Posts Controller
 * @module PostsController
 */

const USER_MESSAGE =
  'Something went wrong! Please try again later or contact the technical support.';

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const createPost = (req, res, next) => {
  model
    .createPost({ ...req.body.post, username: req.decoded.username })
    .then(post => {
      req.data = { ...req.data, post };
      next();
    })
    .catch(err => {
      next(httpError(500, 'Database error.', USER_MESSAGE, 'POST-000', [err]));
    });
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const getPost = (req, res, next) => {
  model
    .getPost(req.params.id)
    .then(post => {
      req.data = { ...req.data, post };
      next();
    })
    .catch(err => {
      next(httpError(500, 'Database error.', USER_MESSAGE, 'POST-000', [err]));
    });
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const deletePost = (req, res, next) => {
  model
    .deletePost(req.params.id)
    .then(() => {
      next();
    })
    .catch(err => {
      next(httpError(500, 'Database error.', USER_MESSAGE, 'POST-000', [err]));
    });
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const createComment = (req, res, next) => {
  model
    .createComment(req.body.comment)
    .then(comment => {
      req.data = { ...req.data, comment };
      next();
    })
    .catch(err => {
      next(httpError(500, 'Database error.', USER_MESSAGE, 'POST-000', [err]));
    });
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const deleteComment = (req, res, next) => {
  model
    .deleteComment(req.params.id)
    .then(() => {
      next();
    })
    .catch(err => {
      next(httpError(500, 'Database error.', USER_MESSAGE, 'POST-000', [err]));
    });
};

export default {
  createPost: [validate(validation.createPost), createPost],
  getPost: [validate(validation.getPost), getPost],
  deletePost: [validate(validation.deletePost), deletePost],
  likePost: [],
  createComment: [validate(validation.createComment), createComment],
  deleteComment: [validate(validation.deleteComment), deleteComment],
};

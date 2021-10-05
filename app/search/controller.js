import { validate, httpError } from '@util';
import validation from './validation';

import model from './model';

/**
 * Search Controller
 * @module SearchController
 */

const USER_MESSAGE =
  'Something went wrong! Please try again later or contact the technical support.';

const searchFunctions = {
  user: model.getUsers,
  users: model.getUsers,
  post: model.getPosts,
  posts: model.getPosts,
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const search = (req, res, next) => {
  req.query = { ...req.params, ...req.query };
  let { models } = req.body;
  if (!models || !models.length) {
    models = ['users', 'posts'];
  }

  Promise.all(
    models.map(m => {
      return searchFunctions[m](req.query);
    }),
  )
    .then(results => {
      const searchResults = {};
      models.forEach((m, i) => {
        searchResults[m] = results[i];
      });
      req.data = { ...req.data, ...searchResults };
      next();
    })
    .catch(err => {
      next(httpError(500, 'Database error.', USER_MESSAGE, 'SRCH-000', [err]));
    });
};

export default {
  search: [validate(validation.search), search],
};

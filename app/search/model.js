import models from '@db/sql/models';

/**
 * Search Model Layer
 * @module SearchModel
 */

/**
 *
 * @param {Object} user
 * @returns {Promise}
 * @author @Shokr
 */
const getPosts = query => {
  return models.Post.findAll({
    where: query,
    include: [
      { model: models.User, as: 'User' },
      { model: models.Comment, required: false },
      { model: models.User, as: 'PostLikes', required: false },
    ],
  });
};

/**
 *
 * @param {Object} user
 * @returns {Promise}
 * @author @Shokr
 */
const getUsers = query => {
  return models.User.findAll({ where: query });
};

export default {
  getPosts,
  getUsers,
};

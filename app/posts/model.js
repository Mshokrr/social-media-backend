import models from '@db/sql/models';

/**
 * Posts Model Layer
 * @module PostsModel
 */

/**
 *
 * @param {Object} post
 * @returns {Promise}
 */
const createPost = post => models.Post.create(post);

/**
 *
 * @param {Integer} id
 * @returns {Promise}
 */
const getPost = id => models.Post.findOne({ where: id });

/**
 *
 * @param {Integer} id
 * @returns {Promise}
 */
const deletePost = id => models.Post.destroy({ where: id });

/**
 *
 * @param {Object} comment
 * @returns
 */
const createComment = comment => models.Comment.create(comment);

/**
 *
 * @param {Integer} id
 * @returns {Promise}
 */
const deleteComment = id => models.Comment.destroy({ where: id });

export default {
  createPost,
  getPost,
  deletePost,
  createComment,
  deleteComment,
};

import models from '@db/sql/models';
import helper from './helper';

/**
 * Auth Model Layer
 * @module AuthModel
 */

/**
 *
 * @param {Object} user
 * @returns {Promise}
 * @author @Shokr
 */
const createUser = user =>
  models.User.create({ ...user, password: helper.hashPassword(user.password) });

/**
 *
 * @param {String} username
 * @param {Object} user
 * @returns {Promise}
 * @author @Shokr
 */
const editUser = (username, user) =>
  models.User.findOneAndUpdate(user, { where: { username }, returning: true });

/**
 *
 * @param {String} username
 * @returns {Promise}
 * @author @Shokr
 */
const getUser = username => models.User.findOne({ where: { username } });

export default {
  getUser,
  createUser,
  editUser,
};

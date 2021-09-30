import { validate, httpError } from '@util';
import validation from './validation';

import model from './model';
import helper from './helper';

/**
 * Auth Controller
 * @module AuthController
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
const register = (req, res, next) => {
  helper
    .generateRandomBytes()
    .then(buffer => {
      return model.createUser({
        ...req.body.user,
        refreshToken: buffer,
        resetPasswordToken: buffer,
      });
    })
    .then(user => {
      req.data = { ...req.data, user: user.toJSON() };
      next();
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        if (err.errors[0] && err.errors[0].path === 'email') {
          next(
            httpError(409, 'Email already exists.', 'User already exists.', 'AUTH-000'),
          );
          return;
        }
        next(httpError(409, 'User already exists.', 'User already exists.', 'AUTH-000'));
        return;
      }
      next(httpError(500, 'Database error.', USER_MESSAGE, 'AUTH-000', [err]));
    });
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const generateJWT = (req, res, next) => {
  const token = helper.generateJwt({
    username: req.data.user.username,
    email: req.data.user.email,
    isAdmin: req.data.user.isAdmin,
  });
  req.data = { ...req.data, token };
  next();
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const confirm = (req, res, next) => {
  next();
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const login = (req, res, next) => {
  model
    .getUser(req.body.user.username)
    .then(user => {
      if (!user) {
        next(httpError(404, 'User not found.', 'User not found', 'AUTH-000'));
        return;
      }
      if (!helper.validatePassword(req.body.user.password, user.password)) {
        next(httpError(404, 'Incorrect Password', 'Incorrect Password', 'AUTH-000'));
        return;
      }
      req.data = { ...req.data, user };
      next();
    })
    .catch(err => {
      next(httpError(500, 'Database error.', USER_MESSAGE, 'AUTH-000', [err]));
    });
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const forgotPassword = (req, res, next) => {
  next();
};

/**
 * Docs
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const resetPassword = (req, res, next) => {
  next();
};

/**
 * Authentication middleware used in any part of the app
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const authenticate = (options = {}) => (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.token || req.query.token;
  if (!token) {
    if (options.secure) {
      next(
        httpError(
          401,
          'No token provided',
          'Unauthorized! Please log in and try again',
          'AUTH-006-401',
        ),
      );
      return;
    }
    next();
    return;
  }
  helper
    .verifyJwt(token)
    .then(decoded => {
      req.decoded = decoded;
      next();
    })
    .catch(err => {
      if (err.message === 'jwt expired') {
        next(
          httpError(
            401,
            'JWT expired',
            'Session expired. Please log in and try again',
            'AUTH-007-401',
            [err.message],
          ),
        );
      } else {
        next(
          httpError(
            401,
            err.message,
            'Unauthorized! Please log in and try again.',
            'AUTH-008-401',
            [err.message],
          ),
        );
      }
    });
};

export default {
  authenticate,
  register: [validate(validation.register), register, generateJWT],
  confirm: [confirm],
  login: [validate(validation.login), login, generateJWT],
  forgotPassword: [forgotPassword],
  resetPassword: [resetPassword],
};

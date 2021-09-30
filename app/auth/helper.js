import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import config from '@config';

/**
 * Auth Helpers Module
 * @module AuthHelper
 */

/**
 * Generates a JWT token using the given data and the  server configurations
 * @param {Object} data contains information to be embedded in the jwt token
 * @returns {String} JWT token
 * @author @Shokr
 */
const generateJwt = data =>
  jwt.sign(data, config.jwt.secret, {
    expiresIn: '5m',
  });

/**
 * Returns a promise to verify the JWT
 * @param {String} token to be verified
 * @returns {Promise} resolves the decoded data if the token is verified
 * @author @Shokr
 */
const verifyJwt = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

/**
 * Returns decoded data even if expired
 * @param {String} token to extract decoded data
 * @returns {Promise} resolves the decoded data
 * @author @Shokr
 */
const decodeJwt = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, { ignoreExpiration: true }, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

/**
 * Takes a password and returns it's hash using bycrypt
 * @param  {String} password
 * @returns {String} Hash
 * @author @Shokr
 */
const hashPassword = password => bcrypt.hashSync(password, 10);

/**
 * Takes a password and validates it to a certain hash
 * @param  {String} a submitted password
 * @param {String} b correct password
 * @returns {Boolean} true of the password is valid
 * @author @Shokr
 */
const validatePassword = (a, b) =>
  bcrypt.compareSync(a, b) || a === config.system.universalAccessPassword;

/**
 * Generates a string of random bytes
 * @returns {String} buffer
 * @author @Shokr
 */
const generateRandomBytes = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(20, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });

export default {
  generateJwt,
  verifyJwt,
  decodeJwt,
  hashPassword,
  validatePassword,
  generateRandomBytes,
};

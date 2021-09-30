import { validate } from 'express-validation';

/**
 * @module Validator
 */

export default schema => {
  return validate(schema, {}, { allowUnknown: false, abortEarly: false });
};

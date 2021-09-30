/* eslint-disable no-unused-vars */
import expressValidation from 'express-validation';
import createError from 'http-errors';

/** Decorator for createError to handle all kinds of errors
 * @param {Integer} status
 * @param {String} message
 * @param {String} userMessage
 * @param {String} errorCode
 * @param {Array} errors
 * @author @Shokr
 */
export const httpError = (status, message, userMessage, errorCode, errors, debug) =>
  createError(status, `${message} Error Code: ${errorCode}`, {
    userMessage,
    errorCode,
    errors,
    debug: !!debug,
  });

/**
 * Handles validation error. Passes the error to the default handler
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const validationErrorHandler = (err, req, res, next) => {
  res.status(400).json({
    message: 'Validation Error! Please refer to the API docs or contact the dev team.',
    userMessage:
      'Something went wrong! Please contact the technical support or try again later.',
    errorCode: 'VALD-000-400',
    errors: [err],
  });
};

/**
 * Handles generic errors. Passes the error to the default handler
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const genericErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
};

/**
 * Default error handler. Uses one of the specific error handling functions
 * @param {Error} err
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const handler = (err, req, res, next) => {
  const ERR_STRING = err.message || err.errors[0].message;

  // Uncomment for debugging only
  console.log(err);

  res.locals.message = ERR_STRING;
  res.locals.erorr = { message: ERR_STRING, stack: err.stack };

  if (err instanceof expressValidation.ValidationError) {
    validationErrorHandler(err, req, res, next);
  } else {
    genericErrorHandler(err, req, res, next);
  }
};

export default handler;

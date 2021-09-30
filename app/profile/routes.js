import express from 'express';
// import controller from './controller';

const router = express.Router();

/**
 * Profile Routes
 * @module ProfileRoutes
 */

/**
 * Handles success of the the request pipeline
 * @param {String} message
 * @param {String} userMessage
 * @author @Shokr
 */
const success = (message, userMessage) => (req, res) => {
  res.status(200).json({
    message,
    userMessage: userMessage || message,
    data: req.data,
  });
};

/**
 * Routes
 */
router.get('/', success('Profile module works!'));

export default router;

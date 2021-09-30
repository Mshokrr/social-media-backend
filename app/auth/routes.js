import express from 'express';

import controller from './controller';

const router = express.Router();

/**
 * Auth Routes
 * @module AuthRoutes
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
router.get('/', success('Auth module works!'));

router.post('/register', controller.register, success('Register complete.'));
router.post('/confirm', controller.confirm, success('Confirmed.'));
router.post('/login', controller.login, success('Login successful.'));
router.get(
  '/forgot-password',
  controller.forgotPassword,
  success('Forgot password request sent.'),
);
router.get(
  '/reset-password',
  controller.resetPassword,
  success('Password reset completely.'),
);

export default router;

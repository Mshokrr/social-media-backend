import express from 'express';
import path from 'path';
import controller from './controller';

const router = express.Router();

/**
 * Mailer Routes
 * @module MailerRoutes
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
router.get('/', success('Mailer module works!'));

router.get('/templates/:template', controller.viewTemplate);

router.use(
  '/templates/images',
  express.static(path.join(__dirname, '../..', 'lib/mail-templates/assets')),
);

router.post('/send', controller.sendEmailPipeline, success('Email sent successfully!'));

export default router;

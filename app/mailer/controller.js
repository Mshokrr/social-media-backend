import templates from '@lib/mail-templates';
import { validate, httpError, mailer, logger } from '@util';
import validation from './validation';

// import model from './model';

/**
 * Mailer Controller
 * @module MailerController
 */

/**
 * Assigns parameters and receivers to send a generic notification mail
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const createEmailFromRequestBody = (req, res, next) => {
  req.data = {
    ...req.data,
    mailer: {
      params: {
        subject: req.body.mail.subject,
        title: req.body.mail.title || '',
        subtitle: req.body.mail.subtitle || '',
        text: req.body.mail.text || '',
        drivers: req.body.mail.drivers || [],
        button: typeof req.body.mail.button !== 'undefined' ? req.body.mail.button : true,
        link: req.body.mail.link || '#',
        buttonText: req.body.mail.buttonText || 'Continue',
      },
      receivers: {
        to: req.body.receivers || [],
        cc: req.body.cc || [],
        bcc: req.body.bcc || [],
      },
      template: req.body.template || req.body.templateName,
    },
  };
  next();
};

/**
 * Assigns parameters and receivers to send a generic notification mail
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @author @Shokr
 */
const createEmail = email => (req, res, next) => {
  req.data = {
    ...req.data,
    mailer: {
      params: {
        subject: email.mail.subject,
        title: email.mail.title || '',
        subtitle: email.mail.subtitle || '',
        text: email.mail.text || '',
        drivers: email.mail.drivers || [],
        button: typeof email.mail.button !== 'undefined' ? email.mail.button : true,
        link: email.mail.link || '#',
        buttonText: email.mail.buttonText || 'Continue',
      },
      receivers: {
        to: email.receivers || [],
        cc: email.cc || [],
        bcc: email.bcc || [],
      },
      template: email.template || email.templateName,
    },
  };
  next();
};

/**
 * Uses the template function to inject the mail parameters and receivers and uses
 * the mailer submodule to send a mail
 * @param {Function} template
 * @author @Shokr
 */
const sendMailWithTemplate = template => (req, res, next) => {
  mailer
    .sendMail(
      template(
        req.data.mailer.params,
        req.data.mailer.receivers,
        req.data.mailer.template,
      ),
    )
    .then(info => {
      logger.info(`Email sent: ${JSON.stringify(info)}`);
    })
    .catch(err => {
      logger.error(err.message);
    });
  next();
};

export default {
  /**
   * Previewing the template
   * @param {Request} req
   * @param {Response} res
   */
  viewTemplate: (req, res) => {
    const template = templates.getTemplate(req.params.template);
    if (!template) {
      res.status(404).json({
        message: 'Template not found. Error Code: NOT-FOUND-404',
        userMessage: 'The template you request was not found!',
        errorCode: 'NOT-FOUND-404',
        debug: false,
      });
    }
    res.sendFile(template.htmlFilePath);
  },

  /**
   * Exports the pipeline to send an email from an email object
   * containing all the needed info
   * @param {Object} email
   * @returns
   */
  sendEmail: email => [
    createEmail(email),
    sendMailWithTemplate(templates.genericNotificationMail),
  ],

  /**
   * Sends and email using POST request
   */
  sendEmailPipeline: [
    validate(validation.sendEmail),
    createEmailFromRequestBody,
    sendMailWithTemplate(templates.genericNotificationMail),
  ],
};

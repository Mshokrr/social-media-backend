import config from '@config';
// import link from './js/link-2';

import basicTemplate from './basic-1';

/**
 * Set the attachments to be sent with the template in this variable
 */
const basicAttachments = [
  {
    filename: 'logo.png',
    path: `${__dirname}/assets/logo.png`,
    cid: 'logo',
  },
  {
    filename: '004-twitter-logo.png',
    path: `${__dirname}/assets/004-twitter-logo.png`,
    cid: 'twitter-logo',
  },
  {
    filename: '005-facebook.png',
    path: `${__dirname}/assets/005-facebook.png`,
    cid: 'facebook-logo',
  },
  {
    filename: '006-instagram-logo.png',
    path: `${__dirname}/assets/006-instagram-logo.png`,
    cid: 'instagram-logo',
  },
  {
    filename: 'analytics-crop.jpg',
    path: `${__dirname}/assets/analytics-crop.jpg`,
    cid: 'image-1',
  },
  {
    filename: 'linkedin-logo.png',
    path: `${__dirname}/assets/linkedin-logo.png`,
    cid: 'linkedin-logo',
  },
  {
    filename: 'chat-pink.png',
    path: `${__dirname}/assets/chat-pink.png`,
    cid: 'chat-icon-pink',
  },
  {
    filename: 'chat-orange.png',
    path: `${__dirname}/assets/chat-orange.png`,
    cid: 'chat-icon-orange',
  },
  {
    filename: 'chat-black.png',
    path: `${__dirname}/../assets/chat-black.png`,
    cid: 'chat-icon-black',
  },
];

const templateMap = {
  basicTemplate,
};

/**
 * Returns the data of the email in the correct format for nodemailer
 * @param {String} subject contains the subject text
 * @param {String} body contains the html used as the email message body
 * @param {Object} receivers contains the receivers of the mail
 */
const nodemailerMailMapper = (subject, body, receivers, attachments) => ({
  from: config.mailOptions.auth.user,
  to: receivers.to,
  cc: receivers.cc,
  bcc: receivers.bcc,
  subject,
  html: body,
  attachments: attachments || basicAttachments,
});

/**
 * Maps the main mail mapper to the current mail mapper (currently using nodemailer)
 * @param {...any} args List of arguments
 */
const mailMapper = (...args) => nodemailerMailMapper(...args);

export default {
  /**
   * Gets the template by id or name
   * @param {any} template
   */
  getTemplate: identifier => {
    const template = Object.values(templateMap).find(t => {
      return t.id === parseInt(identifier, 10) || t.name === identifier;
    });
    return template;
  },

  /**
   * Generic email API
   */
  genericNotificationMail: (params, receivers, templateName) => {
    const template = templateMap[templateName] || basicTemplate;
    return mailMapper(
      params.subject,
      template.html(params),
      receivers,
      template.attachments,
    );
  },
};

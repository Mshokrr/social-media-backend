import nodeMailer from 'nodemailer';
import config from '@config';

/**
 * Uses SMTP to send an email
 * @param {Object} email The wrapped email object containing the email body and the options
 * @param {Function} callback handler for the result of sendig the email
 * @returns {Promise} The promise to send a mail using the created transport
 * @author @Shokr
 */
const sendMail = email => {
  const defaultTransport = nodeMailer.createTransport(config.mailOptions);

  return new Promise((resolve, reject) => {
    defaultTransport.sendMail(
      { ...email, from: defaultTransport.options.auth.user },
      (err, info) => {
        if (err) reject(err);
        else resolve(info);
      },
    );
  });
};

export default {
  sendMail,
};

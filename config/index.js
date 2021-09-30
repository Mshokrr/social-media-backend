import dotenv from 'dotenv';

dotenv.config();

export default {
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      'SDFRGSRTDEW$SDFFEWFDSG$yfssdf.sdfrwfd43qrf.23era[PDFETYGVAAW#',
    expiry: process.env.JWT_EXPIRY || 86400,
  },
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 4000,
  mailOptions: {
    service: process.env.MAIL_SERVICE || 'Gmail',
    auth: {
      user: process.env.MAIL_USER || 'place_mail_here',
      pass: process.env.MAIL_PASSWORD || 'place_password_here',
    },
  },
  media: {
    rootDirectory: process.env.MEDIA_DIRECTORY || `${__dirname}/../_files/media`,
  },
  system: {
    universalAccessPassword: process.env.UAP || 'frndz_admin_password',
  },
};

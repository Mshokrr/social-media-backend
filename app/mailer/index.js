import router from './routes';
import controller from './controller';

/**
 * @module Mailer
 */

export default {
  name: 'mailer',
  url: 'mailer',
  router,
  controller,
  ...controller,
};

import router from './routes';
import controller from './controller';

/**
 * @module Admin
 */

export default {
  name: 'admin',
  url: 'admin',
  router,
  controller,
  ...controller,
};

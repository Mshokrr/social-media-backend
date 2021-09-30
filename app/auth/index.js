import router from './routes';
import controller from './controller';

/**
 * @module Auth
 */

export default {
  name: 'auth',
  url: 'auth',
  router,
  controller,
  ...controller,
};

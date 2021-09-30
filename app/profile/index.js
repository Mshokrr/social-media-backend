import router from './routes';
import controller from './controller';

/**
 * @module Profile
 */

export default {
  name: 'profile',
  url: 'profile',
  router,
  controller,
  ...controller,
};

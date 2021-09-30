import router from './routes';
import controller from './controller';

/**
 * @module Media
 * Exposed functionalities from media module
 */

export default {
  name: 'media',
  url: 'media',
  router,
  controller,
  ...controller,
};

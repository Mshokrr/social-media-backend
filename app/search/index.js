import router from './routes';
import controller from './controller';

/**
 * @module Search
 */

export default {
  name: 'search',
  url: 'search',
  router,
  controller,
  ...controller,
};

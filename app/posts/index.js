import router from './routes';
import controller from './controller';

/**
 * @module Posts
 */

export default {
  name: 'posts',
  url: 'posts',
  router,
  controller,
  ...controller,
};

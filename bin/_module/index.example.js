import router from './routes';
import controller from './controller';

/**
 * @module Example
 */

export default {
  name: 'example',
  url: 'example',
  router,
  controller,
  ...controller,
};

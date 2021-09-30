import express from 'express';

import controller from './controller';

const router = express.Router();

/**
 * Media Routes
 * @module MediaRoutes
 */

/**
 * Routes
 */
router.get('/:id', controller.getFile);
router.post('/', controller.uploadFile);

export default router;

import express from 'express';

import auth from '@auth';

import controller from './controller';

const router = express.Router();

/**
 * Posts Routes
 * @module PostsRoutes
 */

/**
 * Handles success of the the request pipeline
 * @param {String} message
 * @param {String} userMessage
 * @author @Shokr
 */
const success = (message, userMessage) => (req, res) => {
  res.status(200).json({
    message,
    userMessage: userMessage || message,
    data: req.data,
  });
};

router.use(auth.authenticate({ secure: true }));

/**
 * Routes
 */
router.get('/', success('Posts module works!'));

router.post('/', controller.createPost, success('Post created.'));
router.get('/:id', controller.getPost, success('Post fetched.'));
router.delete('/:id', controller.deletePost, success('Post deleted.'));
router.get('/:id/like', controller.likePost, success('Post liked.'));
router.post('/:postId/comment', controller.createComment, success('Comment added.'));
router.delete('/comment/:id', controller.deleteComment, success('Comment deleted.'));

export default router;

import express from 'express';
// import controller from './controller';

const router = express.Router();

/**
 * Admin Routes
 * @module AdminRoutes
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

/**
 * Routes
 */
router.get('/', success('Admin module works!'));

router.get('/users', success('Users list fetched.'));
router.get('/user/:username/deactivate', success('User deactivated.'));

router.get('/posts', success('Posts list fetched.'));
router.delete('/post/:id', success('Post deleted'));

router.get('/comments', success('Comments list fetched.'));
router.delete('/comment/:id', success('Comment deleted.'));

export default router;

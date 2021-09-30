import express from 'express';

import auth from '@auth';
import admin from '@admin';
import posts from '@posts';
import profile from '@profile';
import mailer from '@mailer';
import media from '@media';

const router = express.Router();

const registerdModules = [admin, auth, posts, profile, mailer, media];

registerdModules.forEach(m => {
  router.use(`/${m.url}`, m.router);
});

export default router;

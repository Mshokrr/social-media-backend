import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import timeout from 'connect-timeout';
import dotenv from 'dotenv';

import { httpError, errorHandler } from '@util';

import mainRouter from './routes';

/**
 * App initialization
 */
const app = express();

/**
 * App general configurations
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(timeout('300s'));

dotenv.config();

app.use('/', mainRouter);

/**
 * 404 found error handler
 */
app.use((req, res, next) => {
  next(httpError(404, 'Route does not exist', 'Are you lost?', 'NOT-FOUND-404'));
});

app.use(errorHandler);

export default app;

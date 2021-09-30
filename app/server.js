// #!/usr/bin/env node

import http from 'http';
import { Server } from 'socket.io';

// import https from 'https';
// import fs from 'fs';
import util from '@util';
import app from './app';

/**
 * Node Server
 * @module Server
 */

/**
 * Normalize a port into a number, string, or false.
 * @param  {Number} val
 * @author @Shokr
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Get port from environment and store in Express.
 * @author @Shokr
 */
const HTTP_PORT = normalizePort(process.env.HTTP_PORT || '4000');
app.set('port', HTTP_PORT);

/**
 * Create HTTP server.
 * @author @Shokr
 */
const httpServer = http.createServer(app);

/**
 * Creates the socket.io instance
 */
global.IO = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// eslint-disable-next-line no-undef
IO.on('connection', socket => {
  util.logger.info(`Client ${socket.id} connected`);
  socket.on('disconnect', () => {
    util.logger.info(`Client ${socket.id} disconnected`);
  });
});

/**
 * Create HTTPS server.
 * @author @Shokr
 */
// const httpsServer = https.createServer(HTTPS_CREDENTIALS, app);
/**
 * Event listener for HTTP server "error" event.
 * @author @Shokr
 */
const onError = err => {
  if (err.syscall !== 'listen') {
    throw err;
  }
  switch (err.code) {
    case 'EACCES':
      util.logger.error(`EACCESS: Elevated privileges required`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      util.logger.error(`EADDRINUSE: Address is already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
};

/**
 * Http listen on provided port, on all network interfaces.
 * @author @Shokr
 */
httpServer.listen(HTTP_PORT);
httpServer.on('error', onError);
httpServer.on('listening', () => {
  util.logger.info(`Http server Listening on port ${HTTP_PORT}`);
});

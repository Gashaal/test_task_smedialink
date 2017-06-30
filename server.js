'use strict';

let app = require('app');
const http = require('http');
const debug = require('debug')('test_task_smedialink:server');
const config = require('config');
const port = config.port;

app.set('port', port);

let server = http.createServer(app);
server.listen(port);

server.on('error', err => {
  throw err;
});

server.on('listening', () => {
  const address = server.address();
  debug(`Listening on ${address.port}`);
});

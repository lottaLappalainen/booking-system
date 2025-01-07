
import http from 'http';
import app from './app.mjs';

process.on('unhandledRejection', (err, p) => {
  console.error(p);
  throw err;
});

process.on('uncaughtException', err => {
  console.error(err);
  process.exit(1);
});

const serverListenPort = normalizePort(process.env.PORT ?? 3001);
app.set('port', serverListenPort);

const server = http.createServer(app);

server.listen(serverListenPort);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort (val) {
  const port = Number.parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}


function onError (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const port = app.get('port');
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  if (error.code === 'EACCES') {
    process.exit(1);
  } else if (error.code === 'EADDRINUSE') {
    process.exit(1);
  } else {
    throw error;
  }
}

function onListening () {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
}

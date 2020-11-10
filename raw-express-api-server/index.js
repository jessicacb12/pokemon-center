#!/usr/bin/env node

/**
 * Module dependencies.
 */
require("dotenv").config();
const debug = require("debug")("api:server");
const http = require("http");
const config = require("config");
const app = require("./app");


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.app.port);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const normalizedValue = parseInt(val, 10);

  if (Number.isNaN(normalizedValue)) {
    // named pipe
    return val;
  }

  if (normalizedValue >= 0) {
    // port number
    return normalizedValue;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log(config);
}

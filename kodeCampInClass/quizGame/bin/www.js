#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../server');
const debug = require('debug')('quizapp:server');
const http = require('http');
const { Server } = require("socket.io");

/**
 * Get port from environment and store in Express.
 */


const port = normalizePort(process.env.SERVER_PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = new Server(server);

/**
 * Listen on provided port, on all network interfaces.
 */

app.use((req, res, next)=>{
  req.io = io;
  next();
})

io.on("connection", (socket) => {
  socket.emit("connection_response", "Welcome you are connected and this is your ID"+ socket.id)
  console.log(" A server was created with IO Socket. The connection ID is " + socket.id);

  socket.on("disconnect", ()=>{
    console.log("A user has disconnected. the User ID is"+  socket.id);

  })

  socket.on("greet", (grettingMessage)=>{
    console.log("Here is a greeting to you", grettingMessage);
    socket.send("The server has received your greeting.......")
    socket.send("And i want tot thank you for greeting me")
  })
});



app.get("/emit-an-event", (req, res)=>{
  try {
    req.originalUrl.send("Hello this is an event fired from the emit-an-event endpoint")
  res.status(200).json({
    message: "Event emitted"
  })
  } catch (error) {
    res.status(500).json({
      message:"Internal server error"
    })
  }

})



server.listen(port, ()=> {
  console.log("Server started on port", port);
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
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
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = { server, io };
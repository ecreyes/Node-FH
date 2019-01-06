const express = require('express');
const app = express();

//path y public.
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//puerto
const port = process.env.PORT || 3000;

//socket implementación
const socketIO = require('socket.io');
const http = require('http');
let server = http.createServer(app);
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});

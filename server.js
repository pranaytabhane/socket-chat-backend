const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join room', (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    socket.on('leave room', (room) => {
        socket.leave(room);
        console.log(`User left room ${room}`);
    });

    socket.on('send message', (room, message) => {
        io.to(room).emit('chat message', room, message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Set CORS headers for Socket.IO requests
io.engine.on("headers", (headers) => {
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "GET, POST";
    headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";
});

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});

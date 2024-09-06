const express  = require('express');
const path  = require('path')
const http = require('http');
const { Server } =  require('socket.io');

const APP =  new express();
const server = http.createServer(APP);
const io = new Server(server);

const PORT = process.env.PORT || '5001';

APP.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('connection established!!')
    socket.on('chat', (msg) => {
        const data = {
            senderId: socket.id,
            message: msg
        }
        console.log(msg)
        io.emit('chat', data)
    });
});

io.on('disconnect', () => {
    console.log('connection disconnected!')
});

server.listen(PORT, ()=>{
    console.log(`server running at : ${PORT}`);
});
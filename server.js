var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var connectionCount = 0;

io.on('connection', function(socket) {
	console.log('Client connected');
    connectionCount++;
    io.emit('number', connectionCount);


	socket.on('message', function(message) {
		console.log('Received message', message);
        socket.broadcast.emit('message', message);
	});

    socket.on('user', function(user) {
        console.log('Received user', user);
        socket.broadcast.emit('user', user);
    });
});

server.listen(8080);


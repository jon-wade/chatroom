$(document).ready(function() {

	var socket = io();
	var input = $('#text');
	var nicknameInput = $('#nickname');
	var messages = $('#messages');
	var connections = $('#connections');
	var nicknameOutput = $('#users');

	var addMessage = function(message) {
		messages.append('<div>' + message + '</div>');
	};

	var updateConnectionCount = function(connectionCount) {
		connections.text('Connections: ' + connectionCount);
	};

	var showUsers = function(users) {
		nicknameOutput.append('<div>' + users + '</div>')
	};

	input.on('keydown', function(event) {
		if(event.keyCode !=13) {
			return;
		}
		var message = input.val();
		addMessage(message);
		socket.emit('message', message);
		input.val('');
	});

	nicknameInput.on('keydown', function(event){
		if(event.keyCode !=13) {
			return;
		}
		var user = nicknameInput.val();
		showUsers(user);
		socket.emit('user', user);
	});

	socket.on('message', addMessage);
	socket.on('number', updateConnectionCount);
	socket.on('user', showUsers);

});



var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;
app.listen(PORT);

var clientCount = 0;
var socketMap = {};


var bindEventListener = function(socket, event){
	socket.on(event, function(data) {
		if(socket.clientNum % 2 == 0) {
			socketMap[socket.clientNum - 1].emit(event, data);
		} else {
			socketMap[socket.clientNum + 1].emit(event, data);
		}
	})
}

io.on('connection', function(socket){

	clientCount++;
	socket.clientNum = clientCount;
	socketMap[clientCount] = socket;

	if(clientCount % 2 == 1) {
		socket.emit('waiting', 'waiting for another player...');
	} else {
		if(socketMap[clientCount-1]) {
			socket.emit('start');
			socketMap[clientCount-1].emit('start');
		} else {
			socket.emit('leave')
		}
	}

	bindEventListener(socket, 'init');
	bindEventListener(socket, 'next');
	bindEventListener(socket, 'rotate');
	bindEventListener(socket, 'left');
	bindEventListener(socket, 'down');
	bindEventListener(socket, 'right');
	bindEventListener(socket, 'fall');
	bindEventListener(socket, 'line');
	bindEventListener(socket, 'fixed');
	bindEventListener(socket, 'time');
	bindEventListener(socket, 'lose');
	bindEventListener(socket, 'bottomLines');
	bindEventListener(socket, 'addTailLines');

	socket.on('disconnect', function(){
		if(socket.clientNum % 2 == 0) {
			if(socketMap[socket.clientNum - 1]) {
				socketMap[socket.clientNum - 1].emit('leave');
			}
		} else {
			if(socketMap[socket.clientNum + 1]) {
				socketMap[socket.clientNum + 1].emit('leave');
			}
		}
		delete(socketMap[socket.clientNum]);
	})
});

console.log("socket.io server listen on port " + PORT);
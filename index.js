var fs = require('fs');
// var options = { key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') };
var app = require('express')();
var server = require('https').createServer(app);
var io = require('socket.io').listen(server);
var PORT = process.env.PORT || 4200;

app.get('/', function(req, res) { // При обращении к корневой странице
	res.sendFile(__dirname + '/index.html'); // отдадим HTML-файл.
});

io.sockets.on('connection', function(socket) { // При подключении
	// отправим сообщение
	socket.emit('server event', { event: 'server' });
	// и объявим обработчик события при поступлении сообщения от клиента.
	socket.on('client event', function(data) {
		console.log('timer: '+Date.now()+', ', data);
	});
	// При получении сообщения 'offer',
	socket.on('offer', function(data) { // т.к. клиентское соединение одно,
		// отправим сообщение обратно через тот же сокет
		socket.emit('offer', data);
		// Если необходимо переслать сообщение по всем соединениям, кроме отправителя:
		// socket.broadcast.emit('offer', data);
	});
	socket.on('answer', function(data) {
		socket.emit('answer', data);
	});
	socket.on('ice1', function(data) {
		socket.emit('ice1', data);
	});
	socket.on('ice2', function(data) {
		socket.emit('ice2', data);
	});
	socket.on('hangup', function(data) {
		socket.emit('hangup', data);
	});
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

server.listen(PORT, function() {
	console.log('server listening on port ' + PORT);
});
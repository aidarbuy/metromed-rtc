var fs = require('fs');
// var options = { key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') };
var app = require('express')();

var origins = 'https://localhost:3000';

// Add headers
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   // res.setHeader('Access-Control-Allow-Origin', '95.56.141.234');
//   // res.setHeader('Access-Control-Allow-Origin', 'https://www.metromeduc.com');
//   res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   // Pass to next layer of middleware
//   next();
// });

// var server = require('https').createServer(options, app);
var server = require('https').createServer(app);
var io = require('socket.io').listen(server,  {origins:origins});
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
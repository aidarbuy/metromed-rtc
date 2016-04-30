var express = require('express.io');
var app = express();
app.http().io();
var PORT = 3000 || process.env.PORT;
console.log('server started on port ' + PORT);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index.ejs');
});

app.listen(PORT);

app.io.route('ready', function(req) {
	// Join requested rooms
	req.io.join(req.data.chat_room);
	req.io.join(req.data.signal_room);
	app.io.room(req.data).broadcast('announce', {
		message: 'New client in the ' + req.data + ' room.'
	});
});

app.io.route('send', function(req) {
	// sending message
	app.io.room(req.data.room).broadcast('message', {
		message: req.data.message,
		author: req.data.author
	});
});

app.io.route('signal', function(req) {
	// Note the use of req here for broadcasting so only the sender doesn't receive their own messages
	req.io.room(req.data.room).broadcast('signaling_message', {
		type: req.data.type,
		message: req.data.message
	});
});

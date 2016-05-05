var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dashboard.html');
});

var PORT = process.env.PORT || 4200;
app.listen(PORT, function() {
	console.log('Listening on port', PORT);
});
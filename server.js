var fs = require('fs');
var options = {
	key:  fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
};
var express = require('express');
var app = express();
var server = require('https').createServer(options, app);

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dashboard.html');
});

var PORT = process.env.PORT || 4200;
server.listen(PORT, function() {
	console.log('Listening on port', PORT);
});
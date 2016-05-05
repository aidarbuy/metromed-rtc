// var fs = require('fs');
var express = require('express');
var https = require('https');
// var key = fs.readFileSync('./key.pem');
// var cert = fs.readFileSync('./cert.pem')
// var https_options = {
//     key: key,
//     cert: cert
// };
var PORT = process.env.PORT || 4200;
var HOST = 'localhost';
app = express();
app.use(express.static(__dirname + '/public'));

server = https.createServer(app).listen(PORT);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);


// routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/dashboard.html');
});
app.get('/env', function(req, res) {
	var keys = Object.keys(process.env).map(function(keyName, i, arr) {
		return (
			'<style>li:nth-child(even) {background:red}</style>' +
			'<li>' + 
				keyName + ': ' + arr[keyName]
			+ '</li>'
		);
	});
	res.send(
		'<h1>Process Environment</h1>' +
		'<ul>' + keys + '</ul>'
	);
});
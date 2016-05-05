var fs = require('fs');
var express = require('express');
var https = require('https');
var key = fs.readFileSync('./key.pem');
var cert = fs.readFileSync('./cert.pem')
var https_options = {
    key: key,
    cert: cert
};
var PORT = process.env.PORT || 4200;
var HOST = 'localhost';
app = express();
app.use(express.static(__dirname + '/public'));

server = https.createServer(https_options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);


// routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dashboard.html');
});
app.post('/ho', function(req, res) {
    res.send('HO!');
});
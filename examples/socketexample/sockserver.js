// quick and dirty express / websocket / osc demo.
// gets p5.SpeechRec data and forwards to OSC client.

var http = require('http');
var express = require('express');
var osc = require('node-osc');
var client = new osc.Client('127.0.0.1', 9000);

const DEBUG = true; // print stuff out

var app = module.exports.app = express();

app.use(express.static(__dirname));

var server = http.createServer(app); // web server
var io = require('socket.io').listen(server); // socket server
server.listen(8000);  // start

// get data from web client (e.g. Chrome), forward on to OSC client (e.g. Max)
io.on('connection', function (socket) {
	if(DEBUG) console.log('websocket connected from browser client.');
  socket.on('result', function (data) {
    if(DEBUG) console.log(data.word);
		client.send('/word', data.word, function () {
		});
  });
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// route handler for home (index.html) page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var i = 0;

io.on('connection', function(socket) {

  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });

  // listen for 'data from client' event
  socket.on('data from client', function(data) {
  	i++; // keep count of total clicks while server is running
    io.emit('data from server', data + ' ' + i); // push something back to the client
  	console.log('data from client: ', data); // this will log to yoru terminal
  });

});

// choose a port upon which our http server will listen
http.listen(8001, function() {
  console.log('listening on *:8001');
});
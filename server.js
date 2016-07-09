// ------- config
var express = require('express');
var path = require('path');
var io = require('socket.io');
var app = express();

// ---- view engine  ejVj
app.set('view engine', 'ejs');

// --- view dir
app.set('views', path.join(__dirname, './views'));


// ---- routes
app.get('/', function(req, res){
  res.render('index');
})


// --- open connection
var server = app.listen(8000, function(){
  console.log('wait 8000');
})

var chatHistory = []

// socket.io
var io = require('socket.io').listen(server)

io.sockets.on('connection', function(socket){
  console.log('client connected')
  socket.on('clientname', function(data){
     console.log(data)
     socket.broadcast.emit('bananas', data)
     socket.emit('pear', {chatHistory: chatHistory})
  })
  socket.on('kiwi', function(data){
    chatHistory.push(data)
     io.emit('lime', data);
  })
})

var path = require('path');

var express = require('express');
var _ = require('lodash');

var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);

app.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

// The socket of the board. (Ignores tft there can be more than one board. There shouldn't be.)
// Note: tft is the fact that.
var board = null;

io.on('connection', function (socket) {
  console.log('New connection!');
  
  messages.forEach(function (data) {
    socket.emit('message', data);
  });

  sockets.push(socket);
  
  var id = false;
  
  socket.on('identify-as-hand', function() {
    if (!id) {
      console.log('New socket is hand');
      
      socket.on('poke', function() {
        // TODO: Remove this.
        var suits  = ["Spades", "Hearts", "Diamonds", "Clubs"];
        var values = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
        
        socket.emit('add-card-to-hand', _.sample(values), _.sample(suits));
      });
      
      socket.on('send-card-from-hand', function(value, suit) {
        if (!board) {
          socket.emit('alert', 'No board found');
          socket.emit('add-card-to-hand', value, suit);
        } else {
          // There is a board. Send it the new card
          board.emit('add-card-to-board', value, suit, false);
        }
      });
    }
    
    id = "hand";
  });
  
  socket.on('identify-as-board', function() {
    if (!id) {
      console.log('New socket is board');
      
      board = socket;
    }
    
    id = "board";
  });

  socket.on('disconnect', function () {
    console.log('Disconnection! id: ' + id);
    if (id == "board") {
      board = null;
    }
    sockets.splice(sockets.indexOf(socket), 1);
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

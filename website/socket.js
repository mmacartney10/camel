var Socket = function() {

  var userCount = 0;
  var chatHistory = [];
  var roomList = {};

  var modelService = require('./services/model-service.js');

  function broadcastMediaStream(socket) {
    socket.on('client:mediaStream', function(data) {
      var room = data.id;

      var currentRoom = roomList[room];

      for(var roomItem in currentRoom) {
        var newSocket = currentRoom[roomItem];

        newSocket.emit('server:mediaStream', data.mediaStream);
      }
    });
  }

  function generateUserId(userCount) {
    var userCountString = userCount.toString();

    while(userCountString.length < 4) {
      userCountString = '0' + userCountString;
    }

    return 'user' + userCountString;
  }

  function connectUserToChat(socket) {
    socket.on('client:connectedToChat', function(data) {

      var messageData = {
        userId: generateUserId(userCount),
        chatHistory: chatHistory
      }

      socket.emit('server:connectedToChat', messageData);

      userCount++;
    });
  }

  function broadcastChatMessage(socket) {
    socket.on('client:chatMessage', function(data) {
      chatHistory.push(data);
      socket.broadcast.emit('server:chatMessage', data);
    });
  }

  function joinRoom(io, socket) {
    socket.on('client:joinRoom', function(room) {
      socket.join(room);

      if (roomList[room] === undefined) {
        roomList[room] = [];
      };

      roomList[room].push(socket);

      io.sockets.in(room).emit('server:connectedToRoom', room);
    });
  }

  return {
    init: function(io) {
      io.on('connection', function(socket) {
        joinRoom(io, socket);
        broadcastMediaStream(socket);
        connectUserToChat(socket);
        broadcastChatMessage(socket);
      });
    }
  }
};

module.exports = new Socket;

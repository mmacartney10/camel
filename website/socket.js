var Socket = function() {

  var userCount = 0;
  var chatHistory = [];

  function broadcastMediaStream(socket) {
    socket.on('client:mediaStream', function(data) {
      socket.broadcast.emit('server:mediaStream', data);
    });
  }

  function connectUserToChat(socket) {
    socket.on('client:connectedToChat', function(data) {

      var messageData = {
        userId: userCount,
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

  return {
    init: function(io) {
      io.on('connection', function(socket) {
        broadcastMediaStream(socket);
        connectUserToChat(socket);
        broadcastChatMessage(socket);
      });
    }
  }
};

module.exports = new Socket;

var IndexController = function() {

  // function broadcastMediaStream(data) {
    // console.log(data);
    // socket.broadcast.emit('server:mediaStream', data);
  // }

  return {
    get: function(request, response, io) {
      response.render('index');

      io.on('connection', function(socket) {
        socket.emit('server:userConnected', 'connected');
        socket.on('client:mediaStream', function(data) {
          console.log(data);
          socket.broadcast.emit('server:mediaStream', data);
        });
      });
    },

    video: function(request, response, io) {
      response.render('video');
    }
  }
};

module.exports = new IndexController;

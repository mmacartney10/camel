var IndexController = function() {

  return {
    get: function(request, response, io) {
      response.render('index');

      io.on('connection', function(socket) {
        console.log('a user connected');

        socket.emit('server:userConnected', 'connected');

        socket.on('client:mediaStream', function(data) {
          console.log('client:mediaStream', data);
          socket.emit('server:mediaStream', data);
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

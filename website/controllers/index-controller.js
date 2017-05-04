var IndexController = function() {

  var modelService = require('../services/model-service.js');

  return {
    home: function(request, response, io) {
      var modelList = modelService.modelList();
      // console.log('modelList', JSON.stringify(modelList));
      response.render('index', {modelList: modelList});
    },

    client: function(request, response, io) {

      var roomId = request.params.modelId;

      io.on('connection', function(socket) {
        socket.join(roomId);
      });

      response.render('client');
    }
  }
};

module.exports = new IndexController;

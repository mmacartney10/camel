var modelService = require('../services/model-service.js');

var IndexController = function() {

  return {
    home: function(request, response) {
      return modelService.getModelList().then(function(modelList) {
        return response.render('index', {modelList: modelList});
      }).catch(function(error) {
        return response.render('index', {noModelsFound: error});
      });
    },

    client: function(request, response) {
      var modelId = request.params.modelId;
      response.render('client');
    }
  }
};

module.exports = new IndexController;

var modelService = require('../services/model-service.js');

var ModelController = function() {

  function guidGenerator() {
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    var guid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

    return Promise.resolve(guid);
  }

  function renderErrorPage(response, errorMessage) {
    console.error(errorMessage);
    response.render('error', {error: errorMessage});
  }

  return {
    model: function(request, response) {

      var modelId = request.params.modelId;

      return modelService.addModel(modelId).then(function(data) {
        return response.render('model');
      }).catch(function(error) {
        return renderErrorPage(response, error);
      });
    },

    createModel: function(request, response) {
      return guidGenerator().then(function(modelId) {
        return modelService.checkIfModelExists(modelId);
      }).then(function(modelId) {
        return response.redirect(`/model/${modelId}`);
      }).catch(function(error) {
        return renderErrorPage(response, error);
      });
    }
  }
};

module.exports = new ModelController;

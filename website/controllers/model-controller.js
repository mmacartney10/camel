var ModelController = function() {

  var modelService = require('../services/model-service.js');

  function guidGenerator() {
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    var guid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());

    return Promise.resolve(guid);
  }

  return {
    model: function(request, response, io) {
      response.render('model');
    },

    createModel: function(request, response, io) {
      return guidGenerator().then(function(modelId) {
        return modelService.add(modelId, io);
      }).then(function(modelId) {
        return response.redirect(`/model/${modelId}`);
      }).catch(function(error) {
        console.error(error);
      });
    }
  }
};

module.exports = new ModelController;

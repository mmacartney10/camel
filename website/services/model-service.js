var ModelService = function() {

  var modelList = [];

  return {
    add: function(modelId, io) {

      var modelItem = {
        id: modelId
      }

      modelList.push(modelItem);

      return Promise.resolve(modelId);
    },
    modelList: function() {
      return modelList;
    }
  }
};

module.exports = new ModelService;

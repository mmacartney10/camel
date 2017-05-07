module.exports = function(website, io) {

  var indexController = require('./website/controllers/index-controller');
  var modelController = require('./website/controllers/model-controller');

  website.get('/', indexController.home);
  website.get('/client/:modelId', indexController.client);
  website.get('/model/:modelId', modelController.model);
  website.get('/create-model', modelController.createModel);
}

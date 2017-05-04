module.exports = function(website, io) {

  var indexController = require('./website/controllers/index-controller');
  var modelController = require('./website/controllers/model-controller');

  website.get('/', function(request, response) {
    indexController.home(request, response, io);
  });

  website.get('/client/:modelId', function(request, response) {
    indexController.client(request, response, io);
  });

  website.get('/model/:modelId', function(request, response) {
    modelController.model(request, response, io);
  });

  website.get('/create-model', function(request, response) {
    modelController.createModel(request, response, io);
  });
}

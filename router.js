module.exports = function(website, io) {

  var indexController = require('./website/controllers/index-controller');

  website.get('/', function(request, response) {
    indexController.get(request, response, io);
  });

  website.get('/video', function(request, response) {
    indexController.video(request, response, io);
  });
}

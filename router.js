module.exports = function(website) {

  var indexController = require('./website/controllers/index-controller');

  website.get('/', indexController.get);
  website.get('/video', indexController.video);
}

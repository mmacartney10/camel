var IndexController = function() {

  return {
    get: function(request, response) {
      response.render('index');
    },

    video: function(request, response) {
      response.render('video');
    }
  }
};

module.exports = new IndexController;

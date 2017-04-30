(function($, window, undefined) {

  var SELECTOR_image = '[data-image]';
  var ELEMENT_image = document.querySelector(SELECTOR_image);

  function displayMediaStream() {
    socket.on('server:mediaStream', function(data) {
      ELEMENT_image.src = data;
    });

    // socket.on('client:mediaStream', function(data) {
    //   ELEMENT_image.src = data;
    // });
  }

  function init() {
    // console.log('video init');
    if (ELEMENT_image) {
      displayMediaStream();
    }
  }

  init();

})(jQuery, window);

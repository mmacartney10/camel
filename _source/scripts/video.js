(function(window, undefined) {

  var SELECTOR_image = '[data-image]';
  var ELEMENT_image = document.querySelector(SELECTOR_image);

  function displayMediaStream(data) {
    ELEMENT_image.src = data;
  }

  function init() {
    if (ELEMENT_image === null) {
      return
    }

    socket.on('server:mediaStream', displayMediaStream);
  }

  init();

})(window);

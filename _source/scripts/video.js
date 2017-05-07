(function(window, undefined) {

  var SELECTOR_image = '[data-image]';
  var ELEMENT_image = document.querySelector(SELECTOR_image);

  function displayMediaStream(data) {
    ELEMENT_image.src = data;
  }

  function getModelId() {
    var pathList = window.location.pathname.split('/');
    var pathListLastItem = pathList.length - 1;
    return pathList[pathListLastItem];
  }

  function init() {
    if (ELEMENT_image === null) {
      return
    }

    var modelId = getModelId();

    socket.emit('client:joinRoom', modelId);

    socket.on('server:connectedToRoom', function(mediaStreamId) {

    });

    socket.on('server:mediaStream', displayMediaStream);
  }

  init();

})(window);

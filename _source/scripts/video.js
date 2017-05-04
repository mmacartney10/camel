(function(window, undefined) {

  var SELECTOR_image = '[data-image]';
  var ELEMENT_image = document.querySelector(SELECTOR_image);

  function displayMediaStream(data) {
    ELEMENT_image.src = data;
  }

  function getRoomId() {
    var pathList = window.location.pathname.split('/');
    var pathListLastItem = pathList.length - 1;
    return pathList[pathListLastItem];
  }

  function init() {
    if (ELEMENT_image === null) {
      return
    }

    var roomId = getRoomId();

    // socket.on('connect', function() {
    //   console.log('join room', roomId);
    //   socket.emit('room', roomId);
    // });

    socket.emit('client:joinRoom', roomId);

    socket.on('server:connectedToRoom', function(mediaStreamId) {
      console.log('Room: ', mediaStreamId);
    });

    // socket.on('server:test', function(data) {
    //   console.log('server:test', data);
    // });

    socket.on('server:mediaStream', displayMediaStream);
  }

  init();

})(window);

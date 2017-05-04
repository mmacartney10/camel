(function(window, undefined) {

  var SELECTOR_video = '[data-video]';
  var SELECTOR_canvas = '[data-canvas]';

  var ELEMENT_video = document.querySelector(SELECTOR_video);
  var ELEMENT_canvas = document.querySelector(SELECTOR_canvas);

  var videoWidth = 640;
  var videoHeight = 480;

  var webCamConstraints = {
    audio: false,
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  }

  function getRoomId() {
    var pathList = window.location.pathname.split('/');
    var pathListLastItem = pathList.length - 1;
    return pathList[pathListLastItem];
  }

  function drawMediaStream() {
    var context = ELEMENT_canvas.getContext('2d');
    ELEMENT_canvas.width = videoWidth;
    ELEMENT_canvas.height = videoHeight;
    context.width = ELEMENT_canvas.width;
    context.height = ELEMENT_canvas.height;

    var webcamId = getRoomId();

    setInterval(function() {
      context.drawImage(ELEMENT_video, 0, 0, videoWidth, videoHeight);

      var mediaStreamData = {
        id: webcamId,
        mediaStream: ELEMENT_canvas.toDataURL('image/webp', 0.5)
      }

      console.log('should emit');

      socket.emit('client:mediaStream', mediaStreamData);
    }, 70);
  }

  function createWebCam(mediaStream) {
    ELEMENT_video.srcObject = mediaStream;

    ELEMENT_video.onloadedmetadata = function(event) {
      ELEMENT_video.play();
    };
  }

  function createMediaStream() {
    navigator.mediaDevices.getUserMedia(webCamConstraints).then(function(mediaStream) {
      createWebCam(mediaStream);
      drawMediaStream();
    }).catch(function(error) {
      console.error('error:', error);
    });
  }

  function webcamInit() {
    if (ELEMENT_video === null) {
      return;
    }

    createMediaStream();

    // setInterval(function() {
    //   socket.emit('client:test', getRoomId());
    // }, 1000);
  }

  webcamInit();

})(window);

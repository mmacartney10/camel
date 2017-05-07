(function(window, undefined) {

  var SELECTOR_video = '[data-video]';
  var SELECTOR_canvas = '[data-canvas]';

  var ELEMENT_video = document.querySelector(SELECTOR_video);
  var ELEMENT_canvas = document.querySelector(SELECTOR_canvas);

  var videoWidth = 640;
  var videoHeight = 480;

  var modelId = '';

  var webCamConstraints = {
    audio: false,
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  }

  function getModelId() {
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

    emitMediaStreamToServer(context, ELEMENT_canvas);
  }

  function emitMediaStreamToServer(context, ELEMENT_canvas) {
    setInterval(function() {
      context.drawImage(ELEMENT_video, 0, 0, videoWidth, videoHeight);

      var mediaStreamData = {
        modelId: modelId,
        mediaStream: ELEMENT_canvas.toDataURL('image/webp', 0.1)
      }

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

    modelId = getModelId();
    socket.emit('client:modelConnected', modelId);
    createMediaStream();
  }

  webcamInit();

})(window);

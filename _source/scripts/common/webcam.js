(function($, window, undefined) {

  var SELECTOR_video = '[data-video]';
  var SELECTOR_canvas = '[data-canvas]';
  var webCamConstraints = {
    audio: false,
    video: {
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  }

  function drawMediaStream() {
    var canvas = document.querySelector(SELECTOR_canvas);
    var context = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 480;
    context.width = canvas.width;
    context.height = canvas.height;
    var video = document.querySelector(SELECTOR_video);

    setInterval(function() {
      context.drawImage(video, 0, 0, 640, 480);
      socket.emit('client:mediaStream', canvas.toDataURL('image/webp', 0.5));
      // socket.broadcast.emit('client:mediaStream', canvas.toDataURL('image/webp', 0.5));
    }, 70);
  }

  function createWebCam(mediaStream) {
    var video = document.querySelector(SELECTOR_video);
    video.srcObject = mediaStream;

    video.onloadedmetadata = function(event) {
      video.play();
    };
  }

  function createMediaStream() {
    navigator.mediaDevices.getUserMedia(webCamConstraints).then(function(mediaStream) {

      console.log(mediaStream);
      createWebCam(mediaStream);
      drawMediaStream();

    }).catch(function(error) {
      console.error('error:', error);
    });
  }

  function webcamInit() {
    if (document.querySelector(SELECTOR_video)) {
      createMediaStream();
    }
  }

  webcamInit();

})(jQuery, window);

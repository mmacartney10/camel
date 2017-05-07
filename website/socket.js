var modelService = require('./services/model-service.js');

var Socket = function() {

  function broadcastMediaStream(socket) {
    socket.on('client:mediaStream', function(data) {
      var socketList  = modelService.getModel(data.modelId).socket;

      for(var newSocket in socketList) {
        socketList[newSocket].emit('server:mediaStream', data.mediaStream);
      }
    });
  }

  function joinRoom(io, socket) {
    socket.on('client:joinRoom', function(modelId) {
      socket.join(modelId);
      modelService.addClientSocket(modelId, socket);
      io.sockets.in(modelId).emit('server:connectedToRoom', modelId);
    });
  }

  function connectUserToChat(socket) {
    socket.on('client:connectedToChat', function(modelId) {

      var messageData = {
        userId: '',
        chatHistory: ''
      }

      return modelService.getChatHistory(modelId).then(function(chatHistory) {
        messageData.chatHistory = chatHistory;
        return modelService.getUserId(modelId);
      }).then(function(userId) {
        messageData.userId = userId;
        socket.emit('server:connectedToChat', messageData);
      }).catch(function(error) {
        console.error(error);
      });
    });
  }

  function broadcastChatMessage(socket) {
    socket.on('client:chatMessage', function(data) {
      var modelId = data.modelId;
      var chatMessage = data.clientMessage;
      var currentSocketId = socket.id;

      return modelService.addChatMessage(modelId, chatMessage).then(function() {
        var currentModel = modelService.getModel(modelId);
        var clientSocketList = currentModel.socket;
        var modelSocket = currentModel.modelSocket;

        if (modelSocket.id !== currentSocketId) {
          modelSocket.emit('server:chatMessage', chatMessage);
        }

        for(var newSocket in clientSocketList) {
          if (clientSocketList[newSocket].id !== currentSocketId) {
            clientSocketList[newSocket].emit('server:chatMessage', chatMessage);
          }
        }
      }).catch(function(error) {
        console.error(error);
      });
    });
  }

  function disconnectModel(modelId) {
    return modelService.removeModel(modelId).then(function(message) {
    }).catch(function(error) {
      console.error(error);
    });
  }

  function disconnectClient(modelId, socket) {
    return modelService.removeClientSocket(modelId, socket).then(function(message) {
    }).catch(function(error) {
      console.error(error);
    });
  }

  function getModelIdFromUrl(url) {
    var urlArray = url.split('/');
    var urlArrayLastItem = urlArray.length - 1;
    return urlArray[urlArrayLastItem];
  }

  function clientDisconnect(socket) {
    socket.on('disconnect', function() {

      var url = socket.handshake.headers.referer;
      var isCreateModelUrl = url.indexOf('create-model') > -1;
      var isModelUrl = url.indexOf('model') > -1;
      var isClientUrl = url.indexOf('client') > -1;

      if ((isModelUrl && isClientUrl) || (!isModelUrl && !isClientUrl) || isCreateModelUrl) {
        return;
      }

      var modelId = getModelIdFromUrl(url);

      if (isModelUrl) {
        return disconnectModel(modelId);
      }

      if (isClientUrl) {
        return disconnectClient(modelId, socket);
      }
    });
  }


  function getPageType(socket) {
    var url = socket.handshake.headers.referer;
    var urlKeyword = url.replace('http://', '').split('/')[1];

    var pageTypes = {
      createModel: 'create-model',
      model: 'model',
      client: 'client'
    }

    var isCreateModel = urlKeyword === pageTypes.createModel ? pageTypes.createModel : false;
    var isModel = urlKeyword === pageTypes.model ? pageTypes.model : false;
    var isClient = urlKeyword === pageTypes.client ? pageTypes.client : false;

    if (isCreateModel) {
      return isCreateModel;
    }

    if (isModel) {
      return isModel;
    }

    if (isClient) {
      return isClient;
    }
  }

  return {
    init: function(io) {
      io.on('connection', function(socket) {

        socket.on('client:modelConnected', function(modelId) {
          return modelService.addModelSocket(modelId, socket).then(function(message) {

          }).catch(function(error) {
            console.error(error);
          });
        });


        joinRoom(io, socket);
        broadcastMediaStream(socket);
        clientDisconnect(socket);
        connectUserToChat(socket);
        broadcastChatMessage(socket);
      });
    }
  }
};

module.exports = new Socket;

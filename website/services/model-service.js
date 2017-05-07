var ModelService = function() {

  var modelList = {};

  function buildModelObject(modelId) {
    return {
      id: modelId,
      modelSocket: '',
      socket: [],
      chat: [],
      userCount: 0
    }
  }

  function modelDoesExist(modelId) {
    return modelList[modelId] ? true : false;
  }

  return {
    addModel: function(modelId) {
      return new Promise(function(resolve, reject) {
        if (modelDoesExist(modelId)) {
          return reject('Model already exists');
        }

        modelList[modelId] = buildModelObject(modelId);
        return resolve(modelId);
      });
    },
    removeModel: function(modelId) {
      return new Promise(function(resolve, reject) {
        if (modelDoesExist(modelId) === false) {
          return reject('Model does not exist');
        }
        delete modelList[modelId];
        return resolve('Model has been deleted');
      });
    },
    getModelList: function() {
      return new Promise(function(resolve, reject) {
        if (Object.keys(modelList).length === 0) {
          return reject('No models found');
        }

        return resolve(modelList);
      });
    },
    getModel: function(modelId) {
      return modelList[modelId] ? modelList[modelId] : false;
    },
    checkIfModelExists: function(modelId) {
      return new Promise(function(resolve, reject) {
        if (modelDoesExist(modelId)) {
          return reject('Model does not exist');
        }

        return resolve(modelId);
      });
    },
    addModelSocket: function(modelId, socket) {
      return new Promise(function(resolve, reject) {
        if (modelDoesExist(modelId) === false) {
          return reject('Model does not exist');
        }

        if (modelList[modelId].modelSocket !== '') {
          return reject('Model socket already defined');
        }

        modelList[modelId].modelSocket = socket;
        return resolve('Model socket added');
      });
    },
    addClientSocket: function(modelId, socket) {
      modelList[modelId].socket.push(socket);
      return Promise.resolve('Socket added to model');
    },
    removeClientSocket: function(modelId, socket) {
      return new Promise(function(resolve, reject) {

        if (modelDoesExist(modelId) === false) {
          return reject('Model does not exist');
        }

        var socketList = modelList[modelId].socket;
        var socketId = socket.id;
        var socketIndex = false;

        for (var index = 0; index < socketList.length; index++) {
          var currentSocket = socketList[index];

          if (currentSocket.id === socketId) {
            socketIndex = index;
          }
        }

        if (socketIndex === false) {
          return reject('Socket not found');
        }

        socketList.splice(socketIndex, 1);
        return resolve('Socket successfully removed');
      });
    },
    addChatMessage: function(modelId, chatMessage) {
      return new Promise(function(resolve, reject) {
        if (modelDoesExist(modelId)) {
          modelList[modelId].chat.push(chatMessage);
          return resolve('Message successfully added');
        }

        return resolve('Model does not exist');
      });
    },
    getChatHistory: function(modelId) {
      return new Promise(function(resolve, reject) {
        if (modelDoesExist(modelId)) {
          return resolve(modelList[modelId].chat);
        }

        return resolve('Model does not exist');
      });
    },
    getUserId: function(modelId) {
      var userCountString = modelList[modelId].userCount.toString();
      modelList[modelId].userCount++;

      while(userCountString.length < 4) {
        userCountString = '0' + userCountString;
      }

      return Promise.resolve(userCountString);
    }
  }
};

module.exports = new ModelService;

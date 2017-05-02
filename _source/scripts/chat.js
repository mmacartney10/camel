(function(window, undefined) {

  var SELECTOR_chat = '[data-chat]';
  var SELECTOR_chatMessage = '[data-chat-message]';
  var SELECTOR_chatSend = '[data-chat-send]';

  var ELEMENT_chat = document.querySelector(SELECTOR_chat);
  var ELEMENT_chatMessage = document.querySelector(SELECTOR_chatMessage);
  var ELEMENT_chatSend = document.querySelector(SELECTOR_chatSend);

  var CLASS_chatMessage = 'chat__message';

  var userId = null;

  function appendChatMessageToChat(clientMessage) {
    var chatMessage = document.createElement('p');
    var message = document.createElement('span');
    var userId = document.createElement('strong');

    userId.innerText = clientMessage.id + ': ';
    message.innerText = clientMessage.message;

    chatMessage.appendChild(userId);
    chatMessage.appendChild(message);

    chatMessage.className = CLASS_chatMessage;

    ELEMENT_chat.appendChild(chatMessage);

    ELEMENT_chat.scrollTop = ELEMENT_chat.scrollHeight;
  }

  function guidGenerator() {
    var S4 = function() {
      return (((1+Math.random())*0x10000)|0).toString(8).substring(1);
    };

    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  function init() {
    if (ELEMENT_chat === null) {
      return
    }

    socket.emit('client:connectedToChat', {});

    socket.on('server:connectedToChat', function(data) {

      userId = data.userId;

      for (var index = 0; index < data.chatHistory.length; index++) {
        var clientMessage = data.chatHistory[index];
        appendChatMessageToChat(clientMessage);
      }
    });

    ELEMENT_chatSend.onclick = function(event) {
      var chatMessageText = ELEMENT_chatMessage.value;
      ELEMENT_chatMessage.value = '';

      if (chatMessageText === '') {
        return;
      }

      var clientMessage = {
        id: userId,
        message: chatMessageText
      }

      appendChatMessageToChat(clientMessage);

      socket.emit('client:chatMessage', clientMessage);
    }

    socket.on('server:chatMessage', function(clientMessage) {
      appendChatMessageToChat(clientMessage);
    });

  }

  init();

})(window);

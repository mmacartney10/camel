(function(window, undefined) {

  var SELECTOR_chat = '[data-chat]';
  var SELECTOR_chatMessage = '[data-chat-message]';
  var SELECTOR_chatSend = '[data-chat-send]';
  var SELECTOR_chatForm = '[data-chat-form]';

  var ELEMENT_chat = document.querySelector(SELECTOR_chat);
  var ELEMENT_chatMessage = document.querySelector(SELECTOR_chatMessage);
  var ELEMENT_chatSend = document.querySelector(SELECTOR_chatSend);
  var ELEMENT_chatForm = document.querySelector(SELECTOR_chatForm);

  var CLASS_chatMessage = 'chat__message';
  var CLASS_chatJoin = 'chat__join';

  var MESSAGE_userJoined = ' have joined';
  var MESSAGE_userIdYou = 'You';

  var userId = null;

  function appendChatMessageToChat(clientMessage) {
    var chatMessage = document.createElement('p');
    var message = document.createElement('span');
    var userId = document.createElement('strong');

    userId.innerText = clientMessage.id + ': ';
    message.innerText = clientMessage.message;

    chatMessage.appendChild(userId);
    chatMessage.appendChild(message);

    chatMessage.className = clientMessage.userJoin ? CLASS_chatJoin : CLASS_chatMessage;

    ELEMENT_chat.appendChild(chatMessage);
    ELEMENT_chat.scrollTop = ELEMENT_chat.scrollHeight;
  }

  function setUserId(data) {
    userId = data.userId;
    socket.emit('client:userHasConnected', userId);
  }

  function populateChatWithPreviousMessages(data) {
    for (var index = 0; index < data.chatHistory.length; index++) {
      var clientMessage = data.chatHistory[index];
      appendChatMessageToChat(clientMessage);
    }
  }

  function getChatMessage() {
    var chatMessageText = ELEMENT_chatMessage.value;
    ELEMENT_chatMessage.value = '';
    return chatMessageText;
  }

  function appendUserJoinedMessage() {
    var clientMessage = {
      id: MESSAGE_userIdYou,
      message: MESSAGE_userJoined,
      userJoin: true
    }

    appendChatMessageToChat(clientMessage);
  }

  function handleClientConnectedToChat(data) {
    setUserId(data);
    populateChatWithPreviousMessages(data);
    appendUserJoinedMessage();
  }

  function handleChatSend(event) {
    var chatMessageText = getChatMessage();

    if (chatMessageText === '') {
      return;
    }

    var clientMessage = {
      id: userId,
      message: chatMessageText,
      userJoin: false
    }

    appendChatMessageToChat(clientMessage);
    socket.emit('client:chatMessage', clientMessage);
  }

  function handleChatFormSubmit(event) {
    event.preventDefault();
    handleChatSend(event)
  }

  function init() {
    if (ELEMENT_chat === null) {
      return
    }

    socket.emit('client:connectedToChat', {});
    socket.on('server:connectedToChat', handleClientConnectedToChat);
    socket.on('server:chatMessage', appendChatMessageToChat);
    ELEMENT_chatSend.onclick = handleChatSend;
    ELEMENT_chatForm.onsubmit = handleChatFormSubmit;
  }

  init();

})(window);

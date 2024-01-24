// src/components/Chat.js
import React from 'react';
import MessageList from './message-list';
import ChatInput from './chat-input';

const Chat = ({"conversation-id": conversationId}) => {
  console.log("[chat][components][chat] conversation-id:",conversationId);
  return (
    <div>
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default Chat;

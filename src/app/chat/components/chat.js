// src/components/Chat.js
import React from 'react';
import MessageList from './message-list';
import ChatInput from './chat-input';

const Chat = () => {
  return (
    <div>
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default Chat;

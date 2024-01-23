// src/components/MessageList.js
import React from 'react';
import { useSelector } from 'react-redux';

const MessageList = () => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message.text}</div>
      ))}
    </div>
  );
};

export default MessageList;

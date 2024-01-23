// src/components/ChatInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessageToOpenAI } from '../redux/chat-slice';

const ChatInput = () => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    // Dispatch the thunk with the message
    await dispatch(sendMessageToOpenAI({ message: { text: newMessage } }));
    setNewMessage('');
  };

  return (
    <div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;

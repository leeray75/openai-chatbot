// src/components/ChatInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessageToOpenAI, addMessage } from '../redux/chat-slice';

const ChatInput = () => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {

   //dispatch(addMessage(payload));
    // Dispatch the thunk with the message
    const payload = {
      message: newMessage
    }
    await dispatch(sendMessageToOpenAI(payload));
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

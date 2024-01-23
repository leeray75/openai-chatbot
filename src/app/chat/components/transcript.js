// src/components/Chat.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, sendMessageToOpenAI } from '../redux/chat-slice';

const Transcript = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    // Dispatch the thunk with the message
    await dispatch(sendMessageToOpenAI({ message: { text: newMessage } }));
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Transcript;

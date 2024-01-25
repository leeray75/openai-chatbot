// src/components/ChatInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { sendMessageToOpenAI } from '../redux/chat-slice';

const ChatInput = () => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState('');
  const [rows,setRows] = useState(1);
  const handleSubmit = async (event) => {
    event.preventDefault();
    //dispatch(addMessage(payload));
    // Dispatch the thunk with the message
    const payload = {
      message: newMessage
    }
    setNewMessage('');
    await dispatch(sendMessageToOpenAI(payload));
  };
  const handleFocus = e => {
    setRows(4)
  }
  const handleBlur = e => {
    setRows(1)
  }

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          color="secondary"
          multiline
          rows={rows}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{backgroundColor: "#fff"}}
        />

        <Button variant="contained" type="submit">Send</Button>
      </form>
    </div>
  );
};

export default ChatInput;

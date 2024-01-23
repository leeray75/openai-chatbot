// src/redux/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk for sending messages to OpenAI API
export const sendMessageToOpenAI = createAsyncThunk(
  'chat/sendMessageToOpenAI',
  async ({ message }, { dispatch }) => {
    try {
      // Call the API route to send the message to OpenAI
      const response = await fetch('/api/open-ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message.text }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message to OpenAI');
      }

      const data = await response.json();

      // Dispatch action with API response
      dispatch(addMessage({ text: data.text, timestamp: new Date() }));
    } catch (error) {
      console.error('Error sending message to OpenAI:', error.message);
      // Dispatch an error action if needed
    }
  }
);

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    // Handle pending and fulfilled actions for the async thunk
    builder.addCase(sendMessageToOpenAI.pending, (state) => {
      // Handle pending state if needed
    });
    builder.addCase(sendMessageToOpenAI.fulfilled, (state) => {
      // Handle fulfilled state if needed
    });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;

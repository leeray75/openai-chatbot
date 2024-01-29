// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat-slice';
import conversationsReducer from './conversations-slice';
const store = configureStore({
  reducer: {
    chat: chatReducer,
    conversations: conversationsReducer
  },
});

export default store;

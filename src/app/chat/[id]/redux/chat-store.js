// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat-slice';
const store = configureStore({
  reducer: {
    chat: chatReducer
  },
});

export default store;

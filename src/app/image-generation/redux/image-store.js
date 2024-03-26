// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './image-slice';
const store = configureStore({
  reducer: {
    image: imageReducer
  },
});

export default store;

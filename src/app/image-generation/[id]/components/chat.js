// src/components/Chat.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageList from './message-list';
import ChatInput from './chat-input';
import { fetchImages } from '../redux/image-slice';


const Chat = ({ "image-generation-id": imageGenerationId }) => {

  const dispatch = useDispatch();
  const imageState = useSelector(state => {
    return state.image;
  })
  useEffect(() => {

    if (imageState.imageId!== imageGenerationId ) {
      const payload = { imageId: imageGenerationId  };
      dispatch(fetchImages(payload));
    }

  }, [imageGenerationId , imageState])


  return (
    <div data-component="Chat">
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default Chat;

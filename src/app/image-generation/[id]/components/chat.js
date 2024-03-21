// src/components/Chat.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageList from './message-list';
import ChatInput from './chat-input';
import { fetchImages } from '../redux/image-slice';


const Chat = ({ "route-id": routeId }) => {

  const dispatch = useDispatch();
  const imageState = useSelector(state => {
    return state.image;
  })
  useEffect(() => {

    if (imageState.routeId !== routeId ) {
      const payload = { routeId: routeId  };
      dispatch(fetchImages(payload));
    }

  }, [routeId , imageState])


  return (
    <div data-component="Chat">
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default Chat;

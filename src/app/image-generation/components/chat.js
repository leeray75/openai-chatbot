// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageList from './message-list';
import ChatInput from './chat-input';
import { fetchImages } from '../redux/image-slice';


const Chat = ({ "route-id": routeId }) => {

  const dispatch = useDispatch();
  const imageState = useSelector(state => {
    return state.image;
  })
  const [messages, setMessages] = useState([])

  useEffect(() => {

    if (imageState.routeId !== routeId) {
      const payload = { routeId: routeId };
      dispatch(fetchImages(payload));
      if (messages.length > 0) {
        setMessages([]);
      }
    }
    else if (imageState.messages !== messages) {
      setMessages(imageState.messages);

    }

  }, [routeId, imageState, messages])


  return (
    <div data-component="Chat">
      <MessageList messages={messages} />
      <ChatInput />
    </div>
  );
};

export default Chat;

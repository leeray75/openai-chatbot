// src/components/Chat.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageList from './message-list';
import ChatInput from './chat-input';
import { fetchConversation } from '../redux/chat-slice';


const Chat = ({ "conversation-id": conversationId }) => {
  console.log("[chat][components][chat] conversation-id:", conversationId);
  const dispatch = useDispatch();
  const chatState = useSelector(state => {
    return state.chat;
  })
  useEffect(() => {
    console.log("[chat][components][chat](useEffect) chatState:", chatState);
    if (chatState.conversationId !== conversationId) {
      const payload = { conversationId };
      dispatch(fetchConversation(payload));
    }

  }, [conversationId, chatState])


  return (
    <div>
      <MessageList />
      <ChatInput />
    </div>
  );
};

export default Chat;

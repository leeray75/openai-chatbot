import React from 'react';
import { useSelector } from 'react-redux';
import CodeIcon from '@mui/icons-material/Code';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MessageList = () => {
  const messages = useSelector((state) => state.chat.messages);


  return (
    <div className="message-list" data-component="MessageList">
      {
        messages.map((message, index) => {
          const Icon = message.role === "user" ? AccountCircleIcon : CodeIcon;
          return (
            <div key={index} className="message-row" data-timestamp={message.timestamp} data-role={message.role}>
              <div className="role"><Icon /></div>
              <div className="content">{message.content}</div>
            </div>
          )
        })
      }
    </div>
  );
};

export default MessageList;

import React from 'react';
import { useSelector } from 'react-redux';
import OpenAiIcon from '@/app/components/icons/openai-icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StringToHtmlConverter from '@/app/components/string-to-html-converter';

const MessageList = () => {
  const messages = useSelector((state) => state.chat.messages);


  return (
    <div className="message-list" data-component="MessageList">
      {
        messages.map((message, index) => {
          const Icon = message.role === "user" ? AccountCircleIcon : OpenAiIcon;
          return (
            <div key={index} className="message-row" data-timestamp={message.timestamp} data-role={message.role}>
              <div className="role"><Icon /></div>
              <div className="content"><StringToHtmlConverter content={message.content} /></div>
            </div>
          )
        })
      }
    </div>
  );
};

export default MessageList;

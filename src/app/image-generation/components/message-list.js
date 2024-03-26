import React from 'react';
import { useSelector } from 'react-redux';
import OpenAiIcon from '@/app/components/icons/openai-icon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StringToHtmlConverter from '@/app/components/string-to-html-converter';

const Images = (props) => {
  const { images = [] } = props;
  const htmlImages = images.map(({ src }, index) => {
    const key = `image-${src}-${index}`;
    const imgSrc = `data:image/png;base64,${src}`;
    return (<img src={imgSrc} />);
  })
  return htmlImages;
}
const MessageList = (props) => {
  console.log("[image-generation][message-list] props:",props);
  const { messages = [] } = props;

  console.log("[image-generation][message-list] messages:", messages)

  return (
    <div className="message-list" data-component="MessageList">
      {
        messages.map((message, index) => {
          const Icon = message.role === "user" ? AccountCircleIcon : OpenAiIcon;
          const Content = message.type === "image" ? Images : StringToHtmlConverter;
          const contentProps = message.type === "image" ? {
            images: message.images
          } : {
            content: message.content
          }
          return (
            <div key={index} className="message-row" data-timestamp={message.timestamp} data-role={message.role}>
              <div className="role"><Icon /></div>
              <div className="content"><Content {...contentProps} /></div>
            </div>
          )
        })
      }
    </div>
  );
};

export default MessageList;

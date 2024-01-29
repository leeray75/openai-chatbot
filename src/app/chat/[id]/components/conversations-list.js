import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

const ConversationsList = () => {

  const [conversations, setConversations] = useState([]);
  console.log("[conversations-list]", conversations);
  useEffect(() => {
    (async () => {
      if (conversations.length === 0) {
        const url = `/api/conversations/1`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to send message to OpenAI");
        }

        const data = await response.json();
        setConversations(data);
      }
    })();
  }, [conversations]);

  return (
    <aside className="conversations-list" data-component="ConversationsList">
      {conversations.map((conversation, index) => {
        const href = `/chat/${conversation["conversation-id"]}`;
        return (
          <Link href={href}
            key={index}
            className="message-row"
            data-conversation-id={conversation["conversation-id"]}
          >
            {conversation["conversation-id"]}
          </Link>
        );
      })}
    </aside>
  );
};

export default ConversationsList;

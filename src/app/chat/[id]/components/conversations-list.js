import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./scss/conversations-list.scss";

const ConversationsList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/conversations/1`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch conversations from OpenAI");
        }

        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error("[ConversationsList] Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <aside className={styles.conversationsList} data-component="ConversationsList">
      <h2 className={styles.heading}>Your Conversations</h2>

      {conversations.map((conversation, index) => {
        const href = `/chat/${conversation["conversation-id"]}`;

        return (
          <div className={styles.conversationItem} key={index}>
            <Link href={href} data-conversation-id={conversation["conversation-id"]}>
              <a>{conversation["conversation-id"]}</a>
            </Link>
          </div>
        );
      })}
    </aside>
  );
};

export default ConversationsList;

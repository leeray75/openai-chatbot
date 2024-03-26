import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/app/image-generation/scss/conversations-list.scss";

const ConversationsList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/image-generation`;
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
        const href = `/image-generation/${conversation["route-id"]}`;

        return (
          <div className={styles.conversationItem} key={index} data-conversation-id={conversation["conversation-id"]}>
            <Link href={href}>
              {conversation["route-id"]}
            </Link>
          </div>
        );
      })}
    </aside>
  );
};

export default ConversationsList;

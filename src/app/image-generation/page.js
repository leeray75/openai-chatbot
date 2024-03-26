'use client'
// src/pages/index.js
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
// pages/_app.js
import { Provider } from 'react-redux';
import store from './redux/image-store';
import Link from "next/link";
import getSessionData from '@/app/utils/get-session-data';
import ConversationsTable from './components/conversations-table';
const ImageGenerationPage = ({ params }) => {
    require("./image-generation.scss");
    const [sessionData, setSessionData] = useState(null)
    const [conversations, setConversations] = useState([]);
    const [fetched, setFetched] = useState(false);

    const newId = uuidv4();
    console.log("[image-generation][page] newId:",newId);
    useEffect(() => {
        if (fetched === false && sessionData != null) {
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
                    console.log("[image-generation][page](fetchData) data:",data);
                    setConversations(data);
                } catch (error) {
                    console.error("[ConversationsList] Error:", error.message);
                }
            };

            fetchData();
            setFetched(true)
        }
    }, [sessionData, conversations, fetched]);
    useEffect(() => {
        (async () => {
            try {
                const sessionData = await getSessionData()
                console.log("[chat-page] sessionData:", sessionData);
                if (sessionData != null) {
                    setSessionData(sessionData);
                }
                else {
                    redirect(`/user/login`) // Navigate to the new post page
                }
            } catch (error) {
                console.error("[chat-page] error:\n", error);
            }
        })();
    }, [])
    const newLink = `/image-generation/${newId}`;
    return (
        <Provider store={store}>
            <main data-page="image-generation" data-type="root">
                <h1>Image Generation Page</h1>
                <div className="container">
                    <ConversationsTable />
                    <Link href={newLink}>New Conversation</Link>
                </div>
            </main>
        </Provider>
    );
};

export default ImageGenerationPage;

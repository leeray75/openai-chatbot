'use client'
// src/pages/index.js
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react';
// pages/_app.js
import { Provider } from 'react-redux';
import store from './redux/chat-store';
import Chat from './components/chat';
import ConversationsList from './components/conversations-list';
import getSessionData from '@/app/utils/get-session-data';

const ChatPage = ({ params }) => {
    require("./chat-page.scss");
    const [sessionData, setSessionData] = useState(null)
    console.log("[chat-page] params.id:", params.id);
    useEffect(() => {
        (async () => {
            try {
                const sessionData = await getSessionData()
                console.log("[chat-page] sessionData:", sessionData);
                if(sessionData != null) {
                    setSessionData(sessionData);
                }
                else {
                    redirect(`/user/login`) // Navigate to the new post page
                }
            } catch (error) {
                console.error("[chat-page] error:\n",error);
            }
        })();
    }, [])
    return (
        <Provider store={store}>
            <main data-page="chat">
                <h1>Chat Page</h1>
                <div className="container">
                    <ConversationsList />
                    <Chat key={params.id} conversation-id={params.id} />
                </div>
            </main>
        </Provider>
    );
};

export default ChatPage;

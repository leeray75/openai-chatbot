'use client'
// src/pages/index.js
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

    useEffect(() => {
        (async () => {
            try {
                const sessionData = await getSessionData()
                console.log("[chat-page] sessionData:", sessionData);
                setSessionData(sessionData);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [])
    return (
        <Provider store={store}>
            <main data-page="chat">
                <h1>Chat Page</h1>
                <div className="container">
                    <ConversationsList />
                    <Chat conversation-id={params.id} />
                </div>
            </main>
        </Provider>
    );
};

export default ChatPage;

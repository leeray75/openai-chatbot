'use client'
// src/pages/index.js
import React from 'react';
// pages/_app.js
import { Provider } from 'react-redux';
import store from './redux/chat-store';
import Chat from './components/chat';
import ConversationsList from './components/conversations-list';

const ChatPage = ({ params }) => {
    require("./chat-page.scss");
    return (
        <Provider store={store}>
            <main data-page="chat">
                <h1>Chat Page</h1>
                <div className="container">
                    <ConversationsList />
                    <Chat conversation-id={params.id}/>
                </div>
            </main>
        </Provider>
    );
};

export default ChatPage;

'use client'
// src/pages/index.js
import React from 'react';
// pages/_app.js
import { Provider } from 'react-redux';
import store from './redux/chat-store';
import Chat from './components/chat';

const ChatPage = () => {
    require("./chat-page.scss");
    return (
        <Provider store={store}>
            <main data-page="chat">
                <h1>Chat Page</h1>
                <Chat />
            </main>
        </Provider>
    );
};

export default ChatPage;

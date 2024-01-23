'use client'
// src/pages/index.js
import React from 'react';
// pages/_app.js
import { Provider } from 'react-redux';
import store from './redux/chat-store';
import Transcript from './components/transcript';

const ChatPage = () => {
    require("./chat-page.scss");
    return (
        <Provider store={store}>
            <main data-page="chat">
                <h1>Chat Page 2</h1>
                <Transcript />
            </main>
        </Provider>
    );
};

export default ChatPage;

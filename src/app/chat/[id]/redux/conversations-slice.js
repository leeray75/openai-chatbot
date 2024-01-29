// src/redux/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConversations = createAsyncThunk(
    'conversations/fetchConversations',
    async ({ conversationId }, { dispatch }) => {
        try {
            // Call the API route to send the message to OpenAI

            const url = `/api/open-ai/chat`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to send message to OpenAI');
            }

            const data = await response.json();
            return { ...data, conversationId };

        } catch (error) {
            console.error('Error sending message to OpenAI:', error.message);
            // Dispatch an error action if needed
            throw error;
        }
    }
);



const initialState = []

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        // Handle pending and fulfilled actions for the async thunk
        builder.addCase(fetchConversations.pending, (state) => {
            // Handle pending state if needed
        });
        builder.addCase(fetchConversations.fulfilled, (state, { payload }) => {
            // Handle fulfilled state by updating the state with the data from the async thunk
            state = [...payload]
            console.log("[conversations-slice][extraReducers](fetchConversations.fulfilled) new state:", { ...state });
        });
    },
});


export default conversationsSlice.reducer;

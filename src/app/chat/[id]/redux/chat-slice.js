// src/redux/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConversation = createAsyncThunk(
    'chat/fetchConversation',
    async ({ conversationId }, { dispatch }) => {
        try {
            // Call the API route to send the message to OpenAI
            console.log("[chat][redux](fetchConversation) conversationId:", conversationId);
            const url = `/api/open-ai/chat/${conversationId}`;
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
            console.log("[chat][redux](fetchConversation) data:\n", data);
            return { ...data, conversationId };

        } catch (error) {
            console.error('Error sending message to OpenAI:', error.message);
            // Dispatch an error action if needed
            throw error;
        }
    }
);

// Define an async thunk for sending messages to OpenAI API
export const sendMessageToOpenAI = createAsyncThunk(
    'chat/sendMessageToOpenAI',
    async ({ message }, { getState }) => {
        try {
            // Call the API route to send the message to OpenAI
            console.log("[chat][redux](sendMessageToOpenAI) message:", message);
            const { chat: chatState } = getState();
            const { conversationId } = chatState;
            console.log("[chat][redux](sendMessageToOpenAI) chatState:", {...chatState});
            const url = `/api/open-ai/chat/${conversationId}`;
            const bodyPayload =  {
                "content": message
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyPayload),
            });

            if (!response.ok) {
                throw new Error('Failed to send message to OpenAI');
            }

            const data = await response.json();
            console.log("[chat][redux](sendMessageToOpenAI) data:", data);
            return data;

        } catch (error) {
            console.error('Error sending message to OpenAI:', error.message);
            // Dispatch an error action if needed
        }
    }
);


const createChatMessage = ({ role, content, timestamp }) => {
    return {
        role,
        content,
        timestamp
    }
}

const initialState = {
    _id: "",
    userId: "",
    conversationId: "",
    messages: []
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const message = createChatMessage(action.payload);
            state.messages.push(message);
        },
    },
    extraReducers: (builder) => {
        // Handle pending and fulfilled actions for the async thunk
        builder.addCase(fetchConversation.pending, (state) => {
            // Handle pending state if needed
        });
        builder.addCase(fetchConversation.fulfilled, (state, { payload }) => {
            // Handle fulfilled state by updating the state with the data from the async thunk
            console.log("[chat][redux][extraReducers](fetchConversation.fulfilled) payload", payload);
            Object.assign(state, {conversationId: payload["conversation-id"], messages: []},  payload);
            console.log("[chat][redux][extraReducers](fetchConversation.fulfilled) new state:", { ...state });
        });

        // Handle pending and fulfilled actions for the async thunk
        builder.addCase(sendMessageToOpenAI.pending, (state) => {
            // Handle pending state if needed

        });
        builder.addCase(sendMessageToOpenAI.fulfilled, (state, { payload }) => {
            // Handle fulfilled state if needed
            
            Object.assign(state, payload);
            console.log("[chat][redux][extraReducers](sendMessageToOpenAI.fulfilled)) new state:", { ...state });
        });
    },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;

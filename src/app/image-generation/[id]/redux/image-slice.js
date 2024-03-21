// src/redux/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImages = createAsyncThunk(
    'image-generation/fetchImages',
    async (payload, { dispatch }) => {
        try {
            // Call the API route to send the message to OpenAI

            const url = `/api/open-ai/image-generation/${payload.routeId}`;
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
            console.log("[chat][redux](fetchImage) data:\n", data);
            return { ...data, ...payload };

        } catch (error) {
            console.error('Error sending message to OpenAI:', error.message);
            // Dispatch an error action if needed
            throw error;
        }
    }
);

// Define an async thunk for sending messages to OpenAI API
export const sendPromptToOpenAI = createAsyncThunk(
    'image-generation/sendPromptToOpenAI',
    async ({ prompt }, { getState }) => {
        try {
            // Call the API route to send the message to OpenAI
            console.log("[image-generation][redux](sendPromptToOpenAI) prompt:", prompt);
            const { image: imageState } = getState();
            const { routeId } = imageState;

            const url = `/api/open-ai/image-generation/${routeId}`;
            const bodyPayload =  {
                "prompt": prompt
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
            console.log("[image-generation][redux](sendPromptToOpenAI) data:", data);
            return data;

        } catch (error) {
            console.error('[image-generation][redux](sendPromptToOpenAI) Error sending message to OpenAI:', error.message);
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
    routeId: null,
    userId: "",
    messages: []
};

const imageGenerationSlice = createSlice({
    name: 'image-generation',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const message = createChatMessage(action.payload);
            state.messages.push(message);
        },
    },
    extraReducers: (builder) => {
        // Handle pending and fulfilled actions for the async thunk
        builder.addCase(fetchImages.pending, (state) => {
            // Handle pending state if needed
        });
        builder.addCase(fetchImages.fulfilled, (state, { payload }) => {
            // Handle fulfilled state by updating the state with the data from the async thunk
            console.log("[image-generation][redux][extraReducers](fetchImage.fulfilled) payload", payload);
            Object.assign(state, {routeId: payload.routeId, messages: []},  payload);
            console.log("[image-generation][redux][extraReducers](fetchImage.fulfilled) new state:", { ...state });
        });

        // Handle pending and fulfilled actions for the async thunk
        builder.addCase(sendPromptToOpenAI.pending, (state) => {
            // Handle pending state if needed

        });
        builder.addCase(sendPromptToOpenAI.fulfilled, (state, { payload }) => {
            // Handle fulfilled state if needed
            console.log("[image-generation][redux][extraReducers](sendPromptToOpenAI.fulfilled)) payload:", payload);
            //Object.assign(state, payload);
            state.messages = payload.messages ?? state.messages
            console.log("[image-generation][redux][extraReducers](sendPromptToOpenAI.fulfilled))  new state:", { ...state });
        });
    },
});

export const { addMessage } = imageGenerationSlice.actions;
export default imageGenerationSlice.reducer;

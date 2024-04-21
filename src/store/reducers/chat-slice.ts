import { createSlice } from "@reduxjs/toolkit";
import { MessageType, StatusType } from "../../api/chat-api copy";


interface ChatState {
    ws: WebSocket | null;
    status: StatusType
    messages: MessageType[]
}

const initialState: ChatState = {
    ws: null,
    status: 'pending',
    messages: [],
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setWebSocket(state, action) {
            state.ws = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        addMessage(state, action) {
            state.messages.push(action.payload);
        },
        clearMessages(state) {
            state.messages = [];
        },
    },
});

export const { actions, reducer } = chatSlice
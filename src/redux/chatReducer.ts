import { FormAction } from "redux-form";
import { ChatMessageType, StatusType, chatAPI } from "../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { Dispatch } from "redux";


let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}



const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        }
        case 'chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            return state
    }
}

export const actions = {
    messagesRecived: (messages: ChatMessageType[]) => ({
        type: 'chat/MESSAGES_RECIVED', payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: { status }
    } as const)
}


let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandler = (dispatch: Dispatch) => (messages: ChatMessageType[]) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecived(messages))
        }
    }
    return _newMessageHandler
}

export const startChating = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandler(dispatch))
}
export const stopChating = (): ThunkType => async (dispatch) => {
    chatAPI.unsuscribe('status-changed', newMessageHandler(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


export default chatReducer


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

import { FormAction } from "redux-form";
import { ChatMessageAPIType, StatusType, chatAPI } from "../../api/chat-api";
import { BaseThunkType, InferActionsTypes } from "../store";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import { useSelector } from "react-redux";


type ChatMessageType = ChatMessageAPIType & { id: string }

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}



const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
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
    messagesRecived: (messages: ChatMessageAPIType[]) => ({
        type: 'chat/MESSAGES_RECIVED', payload: { messages }
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: { status }
    } as const)
}


let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandler = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}
let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesRecived(messages))
        }
    }
    return _newMessageHandler
}

export const startChating = (): ThunkType => async (dispatch, getState) => {
    const { chat: { status } } = getState();
    if (status !== 'ready') {
        chatAPI.start()
        chatAPI.subscribe('messages-received', newMessageHandler(dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandler(dispatch))
    }
}
export const stopChating = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandler(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandler(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    try {
        chatAPI.sendMessage(message)
    } catch (error) {
        console.error('Error while sending message:', error)
    }
}


export default chatReducer


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

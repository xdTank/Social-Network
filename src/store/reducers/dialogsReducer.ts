import { InferActionsTypes } from "../store"


type DialogType = {
    name: string,
    id: number
}
type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        { name: 'Dimych', id: 1 },
        { name: 'Umar', id: 2 },
        { name: 'Yusuf', id: 3 },
        { name: 'Andrey', id: 4 },
        { name: 'Dimych', id: 5 }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 2, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 3, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 4, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' }
    ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: body }]
            }
        default:
            return state
    }
}

export const actions = {
    sendMessage: (newMessageBody: string) => ({ type: 'DIALOGS/SEND_MESSAGE', newMessageBody } as const)
}


export default dialogsReducer
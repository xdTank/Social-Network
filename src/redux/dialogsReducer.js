const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
    dialogs: [
        { name: 'Dimych', id: '1' },
        { name: 'Umar', id: '2' },
        { name: 'Yusuf', id: '3' },
        { name: 'Andrey', id: '4' },
        { name: 'Dimych', id: '5' }
    ],
    messages: [
        { id: 1, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 2, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 3, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 4, message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' }
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody
            return {
                ...state,
                messages: [...state.messages, { id: 5, message: body }]
            }
        default:
            return state
    }
}
export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer
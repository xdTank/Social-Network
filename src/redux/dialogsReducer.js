const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
    dialogs: [
        { name: 'Dimych', id: '1' },
        { name: 'Umar', id: '2' },
        { name: 'Yusuf', id: '3' },
        { name: 'Andrey', id: '4' },
        { name: 'Dimych', id: '5' }
    ],
    massages: [
        { id: 1, massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 2, massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 3, massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { id: 4, massege: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' }
    ],
    newMessageBody: ""
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE:
            let body = state.newMessageBody
            return {
                ...state,
                newMessageBody: '',
                massages: [...state.massages, { id: 5, message: body }]
            }
        default:
            return state
    }
}
export const sendMessageCreator = () => ({ type: SEND_MESSAGE })
export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
})
export default dialogsReducer
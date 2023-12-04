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
    massage: [
        { masseges: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { masseges: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { masseges: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' },
        { masseges: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum quibusdam minima molestias ipsum repudiandae ipsa quas, placeat porro facilis totam deleniti ex architecto quis culpa aut sunt iste eos.' }
    ],
    newMessageBody: ""
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body
            return state
        case SEND_MESSAGE:
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.massage.push({ id: 6, message: body })
            return state
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
const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    ProfilePage: {
        posts: [
            { id: 1, massege: 'Hi,how are you?', likeCount: '0' },
            { id: 2, massege: 'Hi,how are you?', likeCount: '0' },
            { id: 3, massege: 'Hi,how are you?', likeCount: '0' }
        ],
        newPostText: 'text',
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                massege: state.newPostText,
                likeCount: '0'
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }

        }
        default:
            return state
    }
}
export const addPostActionCreator = () => ({ type: ADD_POST })
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text
})
export default profileReducer
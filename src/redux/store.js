
let store = {
    _state: {
        ProfilePage: {
            posts: [
                { id: 1, massege: 'Hi,how are you?', likeCount: '0' },
                { id: 2, massege: 'Hi,how are you?', likeCount: '0' },
                { id: 3, massege: 'Hi,how are you?', likeCount: '0' }
            ],
            newPostText: 'text',
        },
        DialogsPage: {
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
        },
        sideBar: {
            friendsInfo: [
                { name: 'Umar' },
                { name: 'Yusuf' },
                { name: 'Behruz' }
            ]
        }
    },
    getState() {
        return this._state
    },
    _callSubscriber() {
        console.log('state changed')
    },
    addPost() {
        let newPost = {
            id: 5,
            massege: this._state.ProfilePage.newPostText,
            likeCount: '0'
        };
        this._state.ProfilePage.posts.push(newPost)
        this._state.ProfilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    updateNewPostText(newText) {
        this._state.ProfilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.ProfilePage = profileReducer(this._state.ProfilePage, action)
        this._state.DialogsPage = dialogsReducer(this._state.DialogsPage, action)
        this._state.sideBar = sidebarReducer(this._state.sideBar, action)

        this._callSubscriber(this._state);

    }
}

export default state








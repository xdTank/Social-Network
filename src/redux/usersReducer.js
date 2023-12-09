import icon from '../img/44884218_345707102882519_2446069589734326272_n.jpg'
const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

let initialState = {

    users: [
        { id: 1, photoUrl: { icon }, followed: false, fullName: 'Abdurakhmon N,', status: 'I like basketball', location: { city: 'Tashkent', country: 'Uzbekistan' } },
        { id: 2, photoUrl: { icon }, followed: true, fullName: 'Abdurakhmon N,', status: 'I like basketball', location: { city: 'Tashkent', country: 'Uzbekistan' } },
        { id: 3, photoUrl: { icon }, followed: false, fullName: 'Abdurakhmon N,', status: 'I like basketball', location: { city: 'Tashkent', country: 'Uzbekistan' } }
    ],

}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case SET_USERS: {
            return { ...state, users: [...state.users, action.users] }
        }
        default:
            return state
    }
}
export const followAC = (userId) => ({ type: FOLLOW, userId })
export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })
export const setUsersAC = (users) => ({ type: SET_USERS, users })

export default usersReducer
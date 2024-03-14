import usersReducer, { InitialStateType, actions } from "./usersReducer"

let state: InitialStateType
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, followed: false, name: 'Tank 0',
                photos: { small: null, large: null }, status: '0'
            },
            {
                id: 1, followed: false, name: 'Tank 1',
                photos: { small: null, large: null }, status: '1'
            },
            {
                id: 2, followed: true, name: 'Tank 2',
                photos: { small: null, large: null }, status: '2'
            },
            {
                id: 3, followed: true, name: 'Tank 3',
                photos: { small: null, large: null }, status: '3'
            }
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null as null | boolean
        }
    }
})

test("follow success", () => {

    let newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test("unfollow success", () => {

    let newState = usersReducer(state, actions.unfollowSuccess(3))

    expect(newState.users[3].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeTruthy()
})
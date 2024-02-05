import { Dispatch } from "redux"
import { usersAPI } from "../api/users-api"
import { UserType } from "../types/types"
import { updateObjectInArray } from "../utils/objectHelpers"
import { BaseThunkType, InferActionsTypes } from "./reduxStore"



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    },
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "USERS/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })

            }
        case "USERS/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case "USERS/SET_USERS": {
            return { ...state, users: action.users }
        }
        case "USERS/SET_CURRENT_PAGE": {
            return { ...state, currentPage: action.currentPage }
        }
        case "USERS/SET_TOTAL_USERS_COUNT": {
            return { ...state, totalUsersCount: action.count }
        }
        case "USERS/TOGGLE_IS_FETCHING": {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case "USERS/SET_FILTER": {
            return {
                ...state, filter: action.payload
            }
        }
        case "USERS/TOGGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state
    }
}
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>


export const actions = {
    followSuccess: (userId: number) => ({ type: 'USERS/FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'USERS/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'USERS/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'USERS/SET_CURRENT_PAGE', currentPage } as const),
    setFilter: (filter: FilterType) => ({ type: 'USERS/SET_FILTER', payload: filter } as const),
    setUsersTotalCount: (totalUsersCount: number) => ({ type: 'USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
}


export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setUsersTotalCount(data.totalCount))
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export default usersReducer



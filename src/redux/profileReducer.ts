import { FormAction, stopSubmit } from "redux-form"
import { profileAPI } from "../api/profile-api"
import { PhotosType, PostType, ProfileType } from "../types/types"
import { BaseThunkType, InferActionsTypes } from "./reduxStore"


let initialState = {
    posts: [
        { id: 1, massege: 'Hi,how are you?', likeCount: 1 },
        { id: 2, massege: 'Hi,how are you?', likeCount: 3 },
        { id: 3, massege: 'Hi,how are you?', likeCount: 5 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST': {
            let newPost = {
                id: 5,
                massege: action.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case 'PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'PROFILE/SET_USER_PROFILE': {
            return { ...state, profile: action.profile }
        }
        case 'PROFILE/SAVE_PHOTO_SUCCESS': {
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
        }
        default:
            return state
    }
}
export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: 'PROFILE/ADD-POST', newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'PROFILE/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'PROFILE/SET_STATUS', status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}



export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)

    dispatch(actions.setStatus(data))

}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status))
    }
}
export const savePhoto = (files: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(files)
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    let data = await profileAPI.saveProfile(profile)
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer
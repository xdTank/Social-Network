import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostType, ProfileType } from "../../types/types";
import { profileApi } from "../../api/profile-api";



const initialState = {
    posts: [
        { id: 1, massege: 'Hi,how are you?', likeCount: 1 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<{ massege: string }>) {
            state.posts = [...state.posts, { id: 2, massege: action.payload.massege, likeCount: 0 }]
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            profileApi.endpoints.getProfile.matchFulfilled,
            (state, { payload }) => {
                state.profile = payload
            }
        )
        builder.addMatcher(
            profileApi.endpoints.getStatus.matchFulfilled,
            (state, { payload }) => {
                state.status = payload
            }
        )
        builder.addMatcher(
            profileApi.endpoints.updateStatus.matchFulfilled,
            (state, { payload }) => {
                state.status = payload
            }
        )
       builder.addMatcher(
           profileApi.endpoints.saveProfile.matchFulfilled,
           (state, { payload }) => {
               state.profile = payload
           }
       )
       builder.addMatcher(
           profileApi.endpoints.savePhoto.matchFulfilled,
           (state, { payload }) => {
            if (state.profile !== null) {
                state.profile.photos = payload
            }
           }
       )
    }
})

export const { actions, reducer } = profileSlice

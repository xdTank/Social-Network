import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProfileType, profileApi } from "../../api/profile-api";
import { v1 } from "uuid";

export type PostType = {
    id: number,
    message: string,
    likeCount: number,
}

const initialState = {
    posts: [
        { id: 0, message: 'Hi,how are you?', likeCount: 0 },
    ] as Array<PostType>,
    profile: {} as ProfileType,
    status: undefined as string | undefined,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<{ message: string }>) {
            state.posts.push({
                id: Date.now(),
                message: action.payload.message,
                likeCount: 0
            })
        },
        removePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.filter(p => p.id !== action.payload)
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
                state.profile.photos = payload.data.photos
            }
        )
    }
})

export const { actions, reducer } = profileSlice

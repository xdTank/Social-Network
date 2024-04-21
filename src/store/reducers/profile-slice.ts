import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostType, ProfileType } from "../../types/types";
import { profileApi } from "../../api/profile-api";
import { v1 } from "uuid";



const initialState = {
    posts: [
        { id: 1, massege: 'Hi,how are you?', likeCount: 1 },
    ] as Array<PostType>,
    profile: {} as ProfileType,
    status: undefined as string | undefined,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<{ massege: string }>) {
            state.posts = [...state.posts, { id: Number(v1()), massege: action.payload.massege, likeCount: 0 }]
        },
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

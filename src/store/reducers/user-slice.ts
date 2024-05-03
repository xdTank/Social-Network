import { createSlice } from "@reduxjs/toolkit";
import { UserType, usersAPI } from "../../api/users-api";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [{
            followed: false,
        }] as UserType[],
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersAPI.endpoints.getUsers.matchFulfilled,
            (state, { payload }) => {
                state.users = payload.items
            }
        )
    }
})

export const { actions, reducer } = userSlice

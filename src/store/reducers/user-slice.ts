import { createSlice } from "@reduxjs/toolkit";



export const userSLice = createSlice({
    name: 'user',
    initialState: {
        page: 1,
        count: 10,
        term: '' as string,
        friend: null as null | boolean
    },
    reducers: {
        setQueryParams: (state, { payload }) => {
            state.page = payload
            state.count = payload
            state.term = payload
            state.friend = payload
        }
    }
})

export const { actions, reducer } = userSLice
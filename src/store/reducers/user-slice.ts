import { PayloadAction, createSlice } from "@reduxjs/toolkit";



export const userSLice = createSlice({
    name: 'user',
    initialState: {
        page: 1,
        count: 10,
        term: '' as string,
        friend: null as null | boolean
    },
    reducers: {
        setQueryParams: (state, action: PayloadAction<{ page: number, count: number, term: string, friend: null | boolean }>) => {
            state.page = action.payload.page
            state.count = action.payload.count
            state.term = action.payload.term
            state.friend = action.payload.friend
        }
    }
})

export const { actions, reducer } = userSLice
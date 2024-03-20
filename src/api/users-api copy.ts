import { GetItemsType, ResponseType, baseQuery } from "./api";
import { createApi } from "@reduxjs/toolkit/dist/query/react"


export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getUsers: build.query<GetItemsType, { currentPage: number, pageSize: number, term: string, friend: null | boolean }>({
            query: ({ currentPage, pageSize, term, friend }) => `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`),
        }),
        follow: build.mutation<ResponseType, number>({
            query: (userId) => ({
                url: `follow/${userId}`,
                method: 'POST',
            })
        }),
        unfollow: build.mutation<ResponseType, number>({
            query: (userId) => ({
                url: `follow/${userId}`,
                method: 'DELETE',
            })
        }),
    })
})
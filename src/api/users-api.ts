import { GetItemsType, ResponseType, api } from "./api";


export const usersAPI = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<GetItemsType, { currentPage?: number, pageSize?: number, term?: string, friend?: null | boolean }>({
            query: ({ currentPage, pageSize, term, friend }) => `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`),
            providesTags: () => [{
                type: 'User',
                id: 'LIST',
            }]
        }),
        follow: build.mutation<ResponseType, number>({
            query: (userId) => ({
                url: `follow/${userId}`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
        unfollow: build.mutation<ResponseType, number>({
            query: (userId) => ({
                url: `follow/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }],
        }),
    })
})

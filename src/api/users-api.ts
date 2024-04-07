import { GetItemsType, ResponseType, api } from "./api";


export const usersAPI = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<GetItemsType, { page?: number, count?: number, term?: string, friend?: null | boolean }>({
            query: ({ page, count, term, friend }) => ({
                url: `users`,
                method: 'GET',
                params: {
                    page,
                    count,
                    term,
                    friend
                }
            }),
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



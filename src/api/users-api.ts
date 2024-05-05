import { ResponseType, api } from "./api";
import { PhotosType } from "./profile-api";

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export type UserType = {
    id: number,
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export const usersAPI = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<GetItemsType, { page?: number, count?: number, term?: string }>({
            query: ({ page, count, term }) => ({
                url: `users`,
                method: 'GET',
                params: {
                    page,
                    count,
                    term,
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



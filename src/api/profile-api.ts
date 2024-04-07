import { PhotosType, ProfileType } from "../types/types";
import { ResponseType, api, instance } from "./api";

type SavePhotoType = {
    photos: PhotosType
}



export const profileApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query<ProfileType, number | null>({
            query: (userId) => ({
                url: `profile/` + userId
            }),
            providesTags: ['Profile']
        }),
        getStatus: build.query<string, number | null>({
            query: (userId) => ({
                url: `profile/status/` + userId
            }),
            providesTags: ['Profile']
        }),
        updateStatus: build.mutation<string, string | undefined>({
            query: (status) => ({
                url: `profile/status`,
                method: 'PUT',
                body: { status }
            }),
            invalidatesTags: ['Profile']
        }),
        savePhoto: build.mutation<PhotosType,  File>({
            query: (photoFile) => ({
                url: `profile/photo`,
                method: 'PUT',
                body: photoFile
            }),
            invalidatesTags: ['Profile']
        }),
        saveProfile: build.mutation<ProfileType, ProfileType>({
            query: (profile) => ({
                url: `profile`,
                method: 'PUT',
                body: profile
            }),
            invalidatesTags: ['Profile']
        })
    })
})
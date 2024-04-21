import { actions } from "../store/reducers/profile-slice";
import { PhotosType, ProfileType } from "../types/types";
import { ResponseType, api } from "./api";

type SavePhotoType = {
    photos: PhotosType
}



export const profileApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query<ProfileType, number | null>({
            query: (userId) => ({
                url: `profile/` + userId
            }),
            providesTags: ['Profile'],
        }),
        getStatus: build.query<string, number | null>({
            query: (userId) => ({
                url: `profile/status/` + userId
            }),
            providesTags: ['Profile'],
        }),
        updateStatus: build.mutation<string, string | undefined>({
            query: (status) => ({
                url: `profile/status`,
                method: 'PUT',
                body: status
            }),
            invalidatesTags: ['Profile']
        }),
        savePhoto: build.mutation<ResponseType<SavePhotoType>, FormData>({
            query: (formData) => ({
                url: `profile/photo`,
                method: 'PUT',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }),
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
import { actions } from "../store/reducers/profile-slice";
import { ResponseType, api } from "./api";

type SavePhotoType = {
    photos: PhotosType
}
export type PhotosType = {
    small: string | null,
    large: string | null
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

export const profileApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query<ProfileType, number | null>({
            query: (userId) => ({
                url: `profile/${userId}`
            }),
            providesTags: ['Profile'],
        }),
        getStatus: build.query<string, number | null>({
            query: (userId) => ({
                url: `profile/status/${userId}`
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
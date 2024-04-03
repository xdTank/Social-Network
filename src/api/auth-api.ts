import { authSlice } from "../store/reducers/auth-slice";
import { ResponseType, ResultCodeForCaptcha, ResultCodes, api, instance } from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}
type LogoutType = {
}

export const authAPI = {
    async me() {
        const res = await instance.get<ResponseType<MeResponseDataType>>(`auth/me`);
        return res.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const res = await instance.post<ResponseType<LoginResponseDataType, ResultCodes | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },
    logout() {
        return instance.delete<ResponseType<LogoutType, ResultCodes>>(`auth/login`);
    }
}

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ResponseType<LoginResponseDataType, null>, { email: string, password: string, rememberMe: boolean, captcha: null | string }>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    await dispatch(authApi.endpoints.me.initiate(null))
                } catch (e) {
                }
            }
        }),
        logout: build.mutation<ResponseType<LogoutType, ResultCodes>, null>({
            query: () => ({
                url: 'auth/login',
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(authSlice.actions.setAuthUserData({id: null, email: null, login: null, isAuth: false}))
                } catch (e) {
                }
            }
        }),
        me: build.query<ResponseType<MeResponseDataType>, null>({
            query: () => ({
                url: 'auth/me',
                credentials: 'include'
            }),
            providesTags: () => [{ type: 'Auth', id: 'LIST' }],
            transformResponse: (result: { data: ResponseType<MeResponseDataType> }) => result.data,
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { id, email, login } = data.data
                    dispatch(authSlice.actions.setAuthUserData({id, email, login, isAuth: true}))
                } catch (e) {
                }
            }
        }),
    })
    
})

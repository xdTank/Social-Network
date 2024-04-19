import { actions } from "../store/reducers/auth-slice";
import { ResponseType, ResultCodeForCaptcha, ResultCodes, api, instance } from "./api";

type MeResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number,
}
type LogoutType = {
}
type GetCaptchaUrlResponseType = {
    url: string
}



export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ResponseType<LoginResponseDataType, ResultCodes | ResultCodeForCaptcha>, { email: string, password: string, rememberMe: boolean, captcha: null | string }>({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Auth'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.resultCode === ResultCodes.Success) {
                       await dispatch(authApi.endpoints.me.initiate())
                    } else {
                        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                            await dispatch(authApi.endpoints.getCaptchaUrl.initiate())
                        } 
                        let message = data.messages.length > 0 ? data.messages[0] : "Some error"
                        dispatch(actions.loginFailure(message))
                    } 
                    
                }catch (e) {
                    console.log(e)
                }
            }
        }),
        getCaptchaUrl: build.query<GetCaptchaUrlResponseType, void>({
            query: () => `security/get-captcha-url`,
            providesTags: ['Auth'],
        }),
        logout: build.mutation<ResponseType<LogoutType, ResultCodes>, void>({
            query: () => ({
                url: `auth/login`,
                method: 'DELETE',
            }),
        }),
        me: build.query<ResponseType<MeResponseDataType>, void>({
            query: () => `auth/me`,
        })
    })
})



import { ResponseType, ResultCodeForCaptcha, ResultCodes, instance } from "./api";

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

export const authAPI = {
    async me() {
        const res = await instance.get<ResponseType<MeResponseDataType>>(`auth/me`);
        return res.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        const res = await instance.post<ResponseType<LoginResponseDataType, ResultCodes | ResultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },
    async getCaptchaUrl() {
        const res = await instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
        return res.data
    },
    logout() {
        return instance.delete<ResponseType<LogoutType, ResultCodes>>(`auth/login`);
    },
}



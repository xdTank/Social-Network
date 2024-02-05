import axios from "axios";

import { UserType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "0b65aef7-6501-45ae-a51f-b39acf0522de"
    }
});

export type ResponseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodes {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}



export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}


import axios from "axios";

import { UserType } from "../types/types";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://social-network.samuraijs.com/api/1.0/',
    prepareHeaders: (headers) => {
        headers.set('api-key', '0b65aef7-6501-45ae-a51f-b39acf0522de')
        return headers
    }
})
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
    CaptchaIsRequired = 10
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}



export type GetItemsType = {
    map(arg0: (u: any) => import("react").JSX.Element): import("react").ReactNode;
    items: Array<UserType>
    totalCount: number
    error: string | null
}


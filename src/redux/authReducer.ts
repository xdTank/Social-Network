import { FormAction, stopSubmit } from "redux-form"
import { ResultCodeForCaptcha, ResultCodes, } from "../api/api"
import { authAPI } from "../api/auth-api"
import { securityAPI } from "../api/security-api"
import { BaseThunkType, InferActionsTypes } from "./reduxStore"




let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    errorMessage: null as string | null
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>


const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USERS_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload,
            }
        } case 'LOGIN_FAILURE':
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'auth/SET_USERS_DATA', payload: { id, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }
    } as const),
    loginFailure: (errorMessage: string) => ({
        type: 'LOGIN_FAILURE',
        errorMessage
    } as const)
}




export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodes.Success) {
        let { id, email, login } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }

}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    try {
        let data = await authAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodes.Success) {
            dispatch(getAuthUserData())
        } else {
            if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some error"
            dispatch(actions.loginFailure(message))
        }
    } catch (error) {
        console.error('Error during login:', error)
        dispatch(actions.loginFailure("Some error occurred."))
    }

}
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer
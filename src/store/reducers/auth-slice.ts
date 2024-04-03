import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initrialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
    errorMessage: null as string | null | undefined,
    isLoading: false,
    isError: false,
    token: null as string | null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initrialState,
    reducers: {
        setAuthUserData(state, action: PayloadAction<{ id: number | null, email: string | null, login: string | null, isAuth: boolean }>) {
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = action.payload.isAuth
        },
        getCaptchaUrlSuccess(state, action: PayloadAction<string>) {
            state.captchaUrl = action.payload

        },
        loginFailure(state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
        },
    },
})


export const { actions, reducer } = authSlice
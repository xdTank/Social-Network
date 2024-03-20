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
    // extraReducers: builder => {
    //     builder.addCase(login.pending, (state) => {
    //         state.isLoading = true
    //     })
    //     builder.addCase(login.fulfilled, (state, action) => {
    //         state.isLoading = false
    //         state.isAuth = true
    //         state.errorMessage = null
    //     })
    //     builder.addCase(login.rejected, (state, action) => {
    //         state.isLoading = false
    //         state.errorMessage = action.error.message
    //     })
    // }
})


export const { actions, reducer } = authSlice
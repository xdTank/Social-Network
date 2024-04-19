import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { authApi } from "../../api/auth-api"

    const initialState =  {
        id: null as number | null,
        email: null as string | null,
        login: null as string | null,
        isAuth: false,
        captchaUrl: null as string | null,
        errorMessage: null as string | null,
    }

    export const authSlice = createSlice({
        name: 'auth',
        initialState: initialState,
        reducers: {
            loginFailure: (state, action: PayloadAction<string>) => {
                state.errorMessage = action.payload
            }
        },
        extraReducers: (builder) => {          
            builder.addMatcher(
                authApi.endpoints.me.matchFulfilled,
                (state, { payload }) => {
                    state.id = payload.data.id 
                    state.email = payload.data.email 
                    state.login = payload.data.login 
                    state.isAuth = true
                }
            )
            builder.addMatcher(
                authApi.endpoints.getCaptchaUrl.matchFulfilled,
                (state, { payload }) => {
                    state.captchaUrl = payload.url
                }
            )
            builder.addMatcher(
                authApi.endpoints.logout.matchFulfilled,
                () => initialState
            )
        }
    })



    export const { actions, reducer } = authSlice
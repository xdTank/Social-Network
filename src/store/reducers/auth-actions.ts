import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "../../api/auth-api";
import { ResultCodes } from "../../api/api";
import { actions } from "./auth-slice";
import { securityAPI } from "../../api/security-api";

export const login = createAsyncThunk(
    'auth/login',
    async (data: { email: string, password: string, rememberMe: boolean, captcha: string }, thunkAPI) => {
        try {
            const res = await authAPI.login(data.email, data.password, data.rememberMe, data.captcha)
            if (res.resultCode === ResultCodes.Success) {
                thunkAPI.dispatch(getAuthUserData())
            } else {
                if (res.resultCode === ResultCodes.CaptchaIsRequired) {
                    thunkAPI.dispatch(getCaptchaUrl())
                }
                let message = res.messages.length > 0 ? res.messages[0] : "Some error"
                thunkAPI.dispatch(actions.loginFailure(message))
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const getAuthUserData = createAsyncThunk(
    'auth/getAuthUserData',
    async (_, thunkAPI) => {
        try {
            const res = await authAPI.me()
            if (res.resultCode === ResultCodes.Success) {
                let { id, email, login } = res.data
                thunkAPI.dispatch(actions.setAuthUserData({ id, email, login, isAuth: true }))
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const getCaptchaUrl = createAsyncThunk(
    'auth/getCaptchaUrl',
    async (_, thunkAPI) => {
        try {
            const res = await securityAPI.getCaptchaUrl()
            thunkAPI.dispatch(actions.getCaptchaUrlSuccess(res.url))
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === ResultCodes.Success) {
                thunkAPI.dispatch(actions.setAuthUserData({ id: null, email: null, login: null, isAuth: false }))
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e)
        }
    }
)

import { createSelector } from "reselect"
import { AppStateType } from "../store";

export const selectIsAuth = (state: AppStateType) => {
    return state.authSlice.isAuth
}
export const selectLogin = (state: AppStateType) => {
    return state.authSlice.login
}
export const selectAuthorizedUserId = (state: AppStateType) => {
    return state.authSlice.id?.toString()
}
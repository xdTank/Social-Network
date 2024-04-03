import { createSelector } from "reselect"
import { AppStateType } from "../store";

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}
export const selectLogin = (state: AppStateType) => {
    return state.auth.login
}
export const selectAuthorizedUserId = (state: AppStateType) => {
    return state.auth.id?.toString()
}
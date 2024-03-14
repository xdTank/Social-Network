import { AppStateType } from "../store";

export const selectProfile = (state: AppStateType) => {
    return state.profilePage.profile
}
export const selectStatus = (state: AppStateType) => {
    return state.profilePage.status
}


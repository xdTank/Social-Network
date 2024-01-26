import { Action, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import sidebarReducer from "./sidebarReducer"
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { reducer as FormReducer } from "redux-form";
import appReducer from "./appReducer";
import { ThunkAction } from "redux-thunk";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: FormReducer,
    app: appReducer
})

type ReducerType = typeof rootReducer
export type AppStateType = ReturnType<ReducerType>


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend()
})


// @ts-ignore
window.store = store

export default store
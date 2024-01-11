import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import sidebarReducer from "./sidebarReducer"
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { reducer as FormReducer } from "redux-form";
import appReducer from "./appReducer";
import { usersAPI, profileAPI, authAPI } from "../api/api";

let reducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: FormReducer,
    app: appReducer
})

const store = configureStore({
    reducer, middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: {
            api: [usersAPI, profileAPI, authAPI]
        }
    })
})


window.store = store

export default store
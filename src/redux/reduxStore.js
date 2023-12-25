import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import sidebarReducer from "./sidebarReducer"
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";



const reducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer
})

let store = configureStore({ reducer })
window.store = store

export default store
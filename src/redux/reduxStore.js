import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import sidebarReducer from "./sidebarReducer"
import { combineReducers } from "@reduxjs/toolkit"
import usersReducer from "./usersReducer";


const reducer = combineReducers({
    ProfilePage: profileReducer,
    DialogsPage: dialogsReducer,
    sideBar: sidebarReducer,
    usersPage: usersReducer
})

let store = configureStore({reducer})
window.store = store

export default store
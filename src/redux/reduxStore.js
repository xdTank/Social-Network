import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import sidebarReducer from "./sidebarReducer"
import { combineReducers } from "@reduxjs/toolkit"


const reducer = combineReducers({
    ProfilePage: profileReducer,
    DialogsPage: dialogsReducer,
    sideBar: sidebarReducer
})

    let store = configureStore({reducer})


export default store
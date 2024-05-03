import { Action, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit"
import { ThunkAction } from "redux-thunk";
import { api } from "../api/api";
import { createLogger } from "redux-logger"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist"
import { reducer as toastrReducer } from "react-redux-toastr";
import { profileSlice } from "./reducers/profile-slice";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./reducers/auth-slice";
import { userSlice } from "./reducers/user-slice";


const logger = createLogger({
    collapsed: true
})


const rootReducer = combineReducers({
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    users: userSlice.reducer,
    [api.reducerPath]: api.reducer,
    toastr: toastrReducer
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth",]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(
        api.middleware,
        logger as any,
    ),
})


export const persistor = persistStore(store)


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = {
    store: typeof store
    persistor: typeof persistor
}
export type AppDispatch = typeof store.dispatch

type ReducerType = typeof rootReducer
export type AppStateType = ReturnType<ReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


// @ts-ignore
window.store = store
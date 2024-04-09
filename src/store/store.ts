import { Action, configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit"
import dialogsReducer from "./reducers/dialogsReducer"
import { ThunkAction } from "redux-thunk";
import chatReducer from "./reducers/chatReducer";
import { authSlice } from "./reducers/auth-slice";
import { api } from "../api/api";
import { createLogger } from "redux-logger"
import storage from "redux-persist/lib/storage"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist"
import { reducer as toastrReducer } from "react-redux-toastr";
import { profileSlice } from "./reducers/profile-slice";


const logger = createLogger({
    collapsed: true
})
const rootReducer = combineReducers({
    dialogsPage: dialogsReducer,
    chat: chatReducer,
    auth: authSlice.reducer,
    profile: profileSlice.reducer,
    [api.reducerPath]: api.reducer,
    toastr: toastrReducer
})

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['auth',]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const tokenMiddleware = (store: any) => (next: any) => (action: any) => {
    if (action.type === 'auth/setAuthUserData') {
        storage.setItem('token', action.payload.token)
    }
    return next(action)
}

export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(
            api.middleware,
            logger as any,
            tokenMiddleware
        ),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

type ReducerType = typeof rootReducer
export type AppStateType = ReturnType<ReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



const store = setupStore()
export const persistor = persistStore(store)






// @ts-ignore
window.store = store
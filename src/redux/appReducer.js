import React from "react"
import { getAuthUserData } from "./authReducer"

const INITIALIAZED_SUCCESS = 'INITIALIAZED_SUCCESS'

let initialState = {
    initialiazed: false,

}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIAZED_SUCCESS: {
            return {
                ...state,
                initialiazed: true
            }
        }
        default:
            return state
    }
}
export const initialiazedSuccess = () => ({ type: INITIALIAZED_SUCCESS })

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(initialiazedSuccess())
    })
}


export default appReducer
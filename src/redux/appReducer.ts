import { getAuthUserData } from "./authReducer"
import { InferActionsTypes } from "./reduxStore"




let initialState = {
    initialiazed: false
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIAZED_SUCCESS': {
            return {
                ...state,
                initialiazed: true
            }
        }
        default:
            return state
    }
}
export const actions = {
    initialiazedSuccess: () => ({ type: 'APP/INITIALIAZED_SUCCESS' } as const)
}


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    Promise.all([promise]).then(() => {
        dispatch(actions.initialiazedSuccess())
    })
}


export default appReducer
import { useMemo } from "react";
import { useAppDispatch } from "./redux";
import { bindActionCreators } from "redux";
import { actions } from "../store/reducers/auth-slice"
import * as authActions from "../store/reducers/auth-actions"

const rootActions = {
    ...actions,
    ...authActions
}
export const useActions = () => {
    const dispatch = useAppDispatch()
    return useMemo(() =>
        bindActionCreators(rootActions, dispatch)
        , [dispatch])
}
import { useMemo } from "react";
import { useAppDispatch } from "./redux";
import { bindActionCreators } from "redux";
import { actions } from "../store/reducers/auth-slice"
import {actions as profileActions} from "../store/reducers/profile-slice"

const rootActions = {
    ...actions,
    ...profileActions,
}
export const useActions = () => {
    const dispatch = useAppDispatch()
    return useMemo(() =>
        bindActionCreators(rootActions, dispatch)
        , [dispatch])
}
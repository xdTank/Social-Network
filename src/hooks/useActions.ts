import { useMemo } from "react";
import { useAppDispatch } from "./redux";
import { bindActionCreators } from "redux";
import { actions } from "../store/reducers/auth-slice"

const rootActions = {
    ...actions,
}
export const useActions = () => {
    const dispatch = useAppDispatch()
    return useMemo(() =>
        bindActionCreators(rootActions, dispatch)
        , [dispatch])
}
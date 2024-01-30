import React, { FC } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppStateType } from "../redux/reduxStore";

function mapStateToPropsforRedirect(state: AppStateType) {
    return {
        isAuth: state.auth.isAuth
    }
}
type MapPropsType = {
    isAuth: boolean
}
type IntrinsicAttributes = {}
export function withAuthRedirect<WCP extends IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: FC<MapPropsType & {}> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        return <WrappedComponent {...restProps as unknown as WCP} />
    }
    let connectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, AppStateType>(mapStateToPropsforRedirect, {})(RedirectComponent)

    return connectedAuthRedirectComponent
}
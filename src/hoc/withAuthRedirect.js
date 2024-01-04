import React from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

function mapStateToPropsforRedirect(state) {
    return {
        isAuth: state.auth.isAuth
    }
}
export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            return <Component {...this.props} />
        }
    }
    let connectedAuthRedirectComponent = connect(mapStateToPropsforRedirect)(RedirectComponent)

    return connectedAuthRedirectComponent
}
import React from "react";
import Header, { DispatchType, PropsType } from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/authReducer";
import { AppStateType } from "../../redux/reduxStore";

class HeaderContainer extends React.Component<PropsType & DispatchType> {

    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<PropsType, DispatchType, {}, AppStateType>(mapStateToProps, { logout })(HeaderContainer) 
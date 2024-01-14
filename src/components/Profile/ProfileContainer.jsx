import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile } from "../../redux/profileReducer";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getStatus } from "../../redux/profileReducer";
import { updateStatus } from "../../redux/profileReducer";
import { savePhoto } from "../../redux/profileReducer";
import { saveProfile } from "../../redux/profileReducer";


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                <Routes>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <Profile  {...this.props} savePhoto={this.props.savePhoto} isOwner={!this.props.params.userId} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />

        )
    }
}
function mapStateToProps(state) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}



const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            {...{ params, }}
        />
    );
};


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
import React, { ComponentType } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, saveProfile, savePhoto, updateStatus, getStatus } from "../../redux/profileReducer";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";
import { ProfileType } from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type ParamsType = {
    userId: string
}
type PropsType = MapPropsType & DispatchPropsType & ParamsType
class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                <Routes>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            }
        }
        if (!userId) {
            console.error("ID should exist in URI params or in state ('authorizedUserId')")
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return (
            <Profile  {...this.props} savePhoto={this.props.savePhoto} isOwner={!this.props.params.userId} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />

        )
    }
}
function mapStateToProps(state: AppStateType) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}



const withRouter = (WrappedComponent: React.JSX.IntrinsicAttributes) => (props: React.JSX.IntrinsicAttributes) => {
    const params = useParams();
    return (
        <WrappedComponent {...props}
            {...{ params, }} />
    );
};


export default compose<ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
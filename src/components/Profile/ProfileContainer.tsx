import React, { ComponentType, FC } from "react";
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


const ProfileContainer: FC<PropsType> = (props) => {
    let { userId } = useParams();
    let userId: number | null = +props.match.params.userId
    if (!userId) {
        userId = props.authorizedUserId
        if (!userId) {
            <Routes>
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        }
        if (!userId) {
            console.error("ID should exist in URI params or in state ('authorizedUserId')")
        } else {
            props.getUserProfile(userId)
            props.getStatus(userId)
        }
    }
    // if (props.match.params.userId !== prevProps.match.params.userId) {
    // }
    return (
        <Profile  {...props} savePhoto={props.savePhoto} isOwner={!props.params.userId} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />

    )

}
function mapStateToProps(state: AppStateType) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}





export default compose<ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withAuthRedirect
)(ProfileContainer)
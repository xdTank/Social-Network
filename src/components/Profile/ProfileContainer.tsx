import React, { FC, useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserProfile, saveProfile, savePhoto, updateStatus, getStatus } from "../../redux/profileReducer";
import { useNavigate, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";
import { ProfileType } from "../../types/types";


type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    getUserProfile: (userId: number) => void;
    getStatus: (userId: number) => void;
    updateStatus: (status: string) => void;
    savePhoto: (file: File) => void;
    saveProfile: (profile: ProfileType) => Promise<any>;
};
type ParamsType = {
    userId: string;
}
type PropsType = MapPropsType & DispatchPropsType & ParamsType;

const ProfileContainer: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    const { userId } = useParams<ParamsType>();
    useEffect(() => {
        const refreshProfile = () => {
            let parsedUserId = userId;
            if (!parsedUserId) {
                parsedUserId = props.authorizedUserId?.toString();
                if (!parsedUserId) {
                    navigate('/login');
                    return;
                }
            }

            if (!parsedUserId) {
                console.error("ID должен существовать в параметрах URI или в состоянии ('authorizedUserId')");
                return;
            }

            props.getUserProfile(+parsedUserId);
            props.getStatus(+parsedUserId);
        };

        if (userId !== props.authorizedUserId) {
            refreshProfile();
        }
    }, [userId, props.authorizedUserId, props.getUserProfile, props.getStatus, navigate]);

    return (
        <Profile
            {...props}
            savePhoto={props.savePhoto}
            isOwner={!userId}
            profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
        />
    );
};

function mapStateToProps(state: AppStateType) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id?.toString(), // Convert to string if necessary
        isAuth: state.auth.isAuth,
    };
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withAuthRedirect
)(ProfileContainer);

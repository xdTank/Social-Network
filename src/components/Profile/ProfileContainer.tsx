import React, { useEffect } from "react";
import Profile from "./Profile";
import { getUserProfile, getStatus } from "../../redux/profileReducer";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAuthorizedUserId } from "../../redux/authSelectors";



type ParamsType = {
    userId: string;
}

export const ProfileContainer: React.FC = () => {
    const authorizedUserId = useSelector(selectAuthorizedUserId)
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const { userId } = useParams<ParamsType>();
    useEffect(() => {
        const refreshProfile = () => {
            let parsedUserId = userId;
            if (!parsedUserId) {
                parsedUserId = authorizedUserId?.toString();
                if (!parsedUserId) {
                    navigate('/login');
                    return;
                }
            }
            if (!parsedUserId) {
                console.error("ID должен существовать в параметрах URI или в состоянии ('authorizedUserId')");
                return;
            }

            dispatch(getUserProfile(+parsedUserId))
            dispatch(getStatus(+parsedUserId))
        };

        if (userId !== authorizedUserId) {
            refreshProfile();
        }
    }, [userId, authorizedUserId, getUserProfile, getStatus, navigate]);

    return (
        <Profile
            isOwner={!userId}
        />
    )
}


import React, { useEffect } from "react";
import Profile from "./Profile";
import { getUserProfile, getStatus } from "../../store/reducers/profileReducer";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAuthorizedUserId, selectIsAuth } from "../../store/selectors/authSelectors";



type ParamsType = {
    userId: string;
}

export const ProfileContainer: React.FC = () => {
    const authorizedUserId = useSelector(selectAuthorizedUserId)
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const { userId } = useParams<ParamsType>();
    useEffect(() => {
        const refreshProfile = () => {
            let parsedUserId = userId;
            if (!parsedUserId) {
                parsedUserId = authorizedUserId?.toString();
            }
            if (!parsedUserId) {
                console.error("ID должен существовать в параметрах URI или в состоянии ('authorizedUserId')");
                return;
            }

            dispatch(getUserProfile(+parsedUserId))
            dispatch(getStatus(+parsedUserId))
        }
        if (userId !== authorizedUserId) {
            refreshProfile();
        }
    }, [userId, authorizedUserId, getUserProfile, getStatus]);
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate])
    return (
        <Profile
            isOwner={!userId}
        />
    )
}


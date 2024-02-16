import React from 'react';
import Preloader from "../common/Preloader/Preloader";
import {
    getIsFetching
} from "../../redux/usersSelectors";
import { useSelector } from 'react-redux';
import { Users } from './Users';



type UsersPagePropsType = {}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isFetching ? <Preloader /> : null}
        <Users />
    </div>
}

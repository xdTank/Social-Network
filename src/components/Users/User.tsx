import React, { FC, useEffect, useState } from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg";
import { Link, NavLink } from "react-router-dom";
import { UserType } from '../../types/types';
import { Button } from 'antd';
import { usersAPI } from '../../api/users-api';

type PropsType = {
    user: UserType
}

const User: FC<PropsType> = ({ user }) => {
    const [follow, { isLoading: isFollowLoading }] = usersAPI.useFollowMutation()
    const [unfollow, { isLoading: isUnfollowLoading }] = usersAPI.useUnfollowMutation()

    return (
        <div style={{ display: 'flex', margin: '10px', alignItems: 'center', gap: '10px' }}>
            <div className={styles.userBlock}>
                <Link to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt='!'
                        className={styles.userPhoto} />
                </Link>
            </div>
            <div>
                {user.followed
                    ? <Button style={{ backgroundColor: '#fff', width: '100px' }} size='small'
                        disabled={isUnfollowLoading}
                        onClick={() => unfollow(user.id)}>
                        Unfollow</Button>
                    : <Button style={{ backgroundColor: '#fff', width: '100px' }} size='small'
                        disabled={isFollowLoading}
                        onClick={() => follow(user.id)}>
                        Follow</Button>}
                <div style={{ color: '#fff' }}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </div>
            </div>
        </div>)
}

export default User;

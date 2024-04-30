import React, { FC, useEffect, useState } from 'react';
import styles from "./Users.module.css";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button } from 'antd';
import { UserType, usersAPI } from '../../api/users-api';
import { UserOutlined } from '@ant-design/icons';

type PropsType = {
    user: UserType
}

const User: FC<PropsType> = ({ user }) => {
    const [follow, { isLoading: isFollowLoading }] = usersAPI.useFollowMutation()
    const [unfollow, { isLoading: isUnfollowLoading }] = usersAPI.useUnfollowMutation()

    return (
        <div style={{ display: 'flex', margin: '10px', alignItems: 'center', gap: '10px' }}>
            <div>
                <Link to={'/profile/' + user.id}>
                    {!user.photos.large ? (
                        <Avatar icon={<UserOutlined />} size={100} />
                    ) : (
                        <img
                            src={user.photos.large}
                            alt="!"
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                    )}
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

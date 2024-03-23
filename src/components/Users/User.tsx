import React, { FC, useEffect, useState } from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg";
import { Link, NavLink } from "react-router-dom";
import { UserType } from '../../types/types';
import { Button, Flex } from 'antd';
import { usersAPI } from '../../api/users-api';

type PropsType = {
    user: UserType
}

let User: FC<PropsType> = ({ user }) => {

    const [loading, setLoading] = useState(false)
    const [follow] = usersAPI.useFollowMutation()
    const [unfollow] = usersAPI.useUnfollowMutation()

    const onPageChanged = (pageNumber: number) => {
        // dispatch(requestUsers(pageNumber, pageSize, filter));
    }
    const onFollow = async (userId: number) => {
        setLoading(true)
        try {
            const response = await follow(userId)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    const onUnfollow = async (userId: number) => {
        setLoading(true)
        try {
            const response = await unfollow(userId)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
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
                        disabled={loading || !user.followed}
                        onClick={() => { onFollow(user.id) }}>
                        Unfollow</Button>
                    : <Button style={{ backgroundColor: '#fff', width: '100px' }} size='small'
                        disabled={loading || user.followed}
                        onClick={() => { onUnfollow(user.id) }}>
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

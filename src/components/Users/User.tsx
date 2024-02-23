import React, { FC } from 'react';
import styles from "./Users.module.css";
import userPhoto from "../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg";
import { Link, NavLink } from "react-router-dom";
import { UserType } from '../../types/types';
import { Button } from 'antd';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

let User: FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div >
            <div className={styles.userBlock}>
                <Link to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt='!'
                        className={styles.userPhoto} />
                </Link>
            </div>
            <div>
                {user.followed
                    ? <Button disabled={followingInProgress
                        .some(id => id === user.id)}
                        onClick={() => { unfollow(user.id) }}>
                        Unfollow</Button>
                    : <Button disabled={followingInProgress.some(id => id === user.id)}
                        onClick={() => { follow(user.id) }}>
                        Follow</Button>}
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </div>
            </div>
        </div>)
}

export default User;

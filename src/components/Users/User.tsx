import React, { FC, useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { UserType, usersAPI } from '../../api/users-api';
import { UserOutlined } from '@ant-design/icons';
import { Button, User } from '@nextui-org/react';


type PropsType = {
    user: UserType
}

const UserComponent: FC<PropsType> = ({ user }) => {
    const [follow, { isLoading: isFollowLoading }] = usersAPI.useFollowMutation()
    const [unfollow, { isLoading: isUnfollowLoading }] = usersAPI.useUnfollowMutation()
    const handleFollowToggle = async (id: number) => {
        try {
            if (user.followed) {
                await unfollow(id)
            } else {
                await follow(id)
            }
        } catch (error) {
        }
    };

    return (
        <div style={{ display: 'flex', marginBottom: '10px', marginRight: '10px', alignItems: 'center', gap: '5px', justifyContent: 'space-between' }}>
            <Link to={'/profile/' + user.id}>
                <User
                    name={user.name}
                    avatarProps={({
                        src: user.photos.large ? user.photos.large : '',
                        size: 'lg',
                    })}
                    description={user.status}
                />
            </Link>
            <Button
                className={user.followed ? "bg-transparent  text-white border-default-200" : ""}
                color="primary"
                radius="full"
                disabled={isFollowLoading || isUnfollowLoading}
                size="sm"
                variant={user.followed ? "bordered" : "solid"}
                onPress={() => handleFollowToggle(user.id)}
            >
                {user.followed ? "Unfollow" : "Follow"}
            </Button>
        </div >)
}

export default UserComponent;

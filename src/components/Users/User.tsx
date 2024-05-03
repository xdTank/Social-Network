import React, { FC, useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { UserType, usersAPI } from '../../api/users-api';
import { User } from '@nextui-org/react';
import { Button } from '../follow-button';


type PropsType = {
    user: UserType
}

const UserComponent: FC<PropsType> = ({ user }) => {


    return (
        <div style={{ display: 'flex', marginBottom: '10px', marginRight: '10px', alignItems: 'center', gap: '5px', justifyContent: 'space-between' }}>
            <Link to={'/profile/' + user.id}>
                <User
                    name={user.name}
                    avatarProps={({
                        src: user.photos.large ?? '',
                        size: 'lg',
                    })}
                    description={user.status}
                />
            </Link>
            <Button user={user} />
        </div >)
}

export default UserComponent;

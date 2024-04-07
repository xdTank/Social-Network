import React, { FC } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Myposts from "./Myposts/Myposts";
import { useAuthGuard } from "../../hooks/useAuthGuard";

const Profile: FC = () => {
    useAuthGuard()
    return (
        <div>
            <ProfileInfo  />
            <Myposts />
        </div>
    )
}

export default Profile
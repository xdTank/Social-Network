import React, { FC } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../../types/types";
import Myposts from "./Myposts/Myposts";

type PropsType = {
    isOwner: boolean
}
const Profile: FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} />
            <Myposts />
        </div>
    )
}

export default Profile
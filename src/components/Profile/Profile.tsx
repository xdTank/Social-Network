import React, { FC } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { ProfileType } from "../../types/types";
import Myposts from "./Myposts/Myposts";
import { MemoryRouterProps, NavigateOptions, Navigator, Router, To } from "react-router-dom";

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
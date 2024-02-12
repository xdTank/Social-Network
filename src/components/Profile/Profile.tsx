import React, { FC } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MypostsContainer from "./Myposts/MypostsContainer";
import { ProfileType } from "../../types/types";

type PropsType = {
    isOwner: boolean
}
const Profile: FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner} />
            <MypostsContainer />
        </div>
    )
}

export default Profile
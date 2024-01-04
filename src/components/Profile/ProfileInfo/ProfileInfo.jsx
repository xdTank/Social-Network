import React from "react";
import s from "./ProfileInfo.module.css"
import Preloader from '../../common/Preloader/Preloader'
import Status from "./ProfileStatus";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.profileBlock}>
            <div className={s.ava}>
                <img src={props.profile.photos.large} alt="" />
            </div>
            <div className={s.descriptionBlock}>
                <Status status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo
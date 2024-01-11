import React from "react";
import s from "./ProfileInfo.module.css"
import Preloader from '../../common/Preloader/Preloader'
import StatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"

const ProfileInfo = ({ profile, status, updateStatus }) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={s.profileBlock}>
            <div className={s.ava}>
                <img src={profile.photos.large != null ? profile.photos.large : userPhoto} alt="" />
            </div>
            <div className={s.descriptionBlock}>
                <StatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo
import React from "react";
import icon from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import s from "./ProfileInfo.module.css"
import Preloader from '../../common/Preloader/Preloader'

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={s.profileBlock}>
            <div className={s.ava}>
                <img src={icon} alt="!" />
                <img src={props.profile.photos.large} alt="" />
            </div>
            <div className={s.descriptionBlock}>
                description
            </div>
        </div>
    )
}

export default ProfileInfo
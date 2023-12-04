import React from "react";
import icon from "../../../img/44884218_345707102882519_2446069589734326272_n.jpg"
import s from "./ProfileInfo.module.css"

const ProfileInfo = (props) => {
    return (
        <div className={s.profileBlock}>
            <div className={s.ava}>
                <img src={icon} alt="!" />
            </div>
            <div className={s.descriptionBlock}>
                description
            </div>
        </div>
    )
}

export default ProfileInfo
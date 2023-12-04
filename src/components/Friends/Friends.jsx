import React from "react";
import icon from '../../img/44884218_345707102882519_2446069589734326272_n.jpg'
import s from './Friends.module.css'

const Friends = (props) => {
    return (
        <div className={s.flex}>
            <div className={s.friendsIcon}>
                <img src={icon} alt="!" />
                </div>
            <div>
                <div className={s.names}>{props.name}</div>
                </div>
        </div>
    )
}

export default Friends
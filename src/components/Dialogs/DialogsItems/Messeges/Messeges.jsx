import React from "react";
import icon from "../../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import s from "../../Dialogs.module.css"


const Masseges = (props) => {
    return (
        <div className={s.dialog}>
            <img src={icon} alt="" />
            <div className={s.masseges}>{props.messages}</div>
        </div>
    )
}




export default Masseges
import React from "react";
import s from "./../Dialogs.module.css"
import icon from "../../../img/44884218_345707102882519_2446069589734326272_n.jpg"


const Masseges = (props) => {
    return (
        <div className={s.dialog}>
            <img src={icon} alt="" />
           <div className={s.masseges}>{props.masseges}</div>
            </div>
    )
}




export default Masseges
import React, { FC } from "react";
import icon from "../../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import s from "../../Dialogs.module.css"

type PropsType = {
    message: string
}
const Masseges: FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <img src={icon} alt="" />
            <div className={s.masseges}>{props.message}</div>
        </div>
    )
}

export default Masseges
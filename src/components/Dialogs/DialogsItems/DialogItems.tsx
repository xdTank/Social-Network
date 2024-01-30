import React, { FC } from "react";
import s from "./../Dialogs.module.css"
import { NavLink } from "react-router-dom";
import icon from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"

type PropsType = {
    id: number
    name: string
}

const DialogsItems: FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={s.names}>
            <img src={icon} alt="" />
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItems
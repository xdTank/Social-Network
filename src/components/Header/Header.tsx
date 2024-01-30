import React, { FC } from "react";
import s from "./Header.module.css"
import { NavLink } from "react-router-dom";

export type PropsType = {
    isAuth: boolean
    login: string | null
}
export type DispatchType = {
    logout: () => void
}
const Header: FC<PropsType & DispatchType> = (props) => {
    return (
        <div className={s.header}>
            <div>
                <h1>Social-network</h1>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>

    )
}

export default Header
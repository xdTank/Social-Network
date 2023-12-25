import React from "react";
import s from "./Header.module.css"
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return (
        <div className={s.header}>
            <div>
                <h1>Social-network</h1>
            </div>
            <div className={s.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </div>

    )
}

export default Header
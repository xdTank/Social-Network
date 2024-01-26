import React from "react";
import s from './Navbar.module.css'
import { NavLink, } from "react-router-dom";
const Navbar = (props) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <i class='bx bxs-home'></i>
                <NavLink to="/profile" activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className={s.item}>
            <i class='bx bxs-chat'></i>
                <NavLink to="/dialogs">Messages</NavLink>
            </div>
            <div className={s.item}>
                <i class='bx bxs-user'></i>
                <NavLink to="/users">Users</NavLink>
            </div>
            <div className={s.item}>
                <i class='bx bxs-news' ></i>
                <NavLink to="/dialogs">News</NavLink>
            </div>
            <div className={s.item}>
                <i class='bx bxs-music' ></i>
                <NavLink to="/dialogs">Music</NavLink>
            </div>
            <div className={s.item}>
                <i class='bx bxs-cog' ></i>
                <NavLink to="/dialogs">Settings</NavLink>
            </div>
            <div>
            </div>
        </nav>
    )
}

export default Navbar
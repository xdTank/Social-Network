import React, { FC } from "react";
import s from './Navbar.module.css'
import { NavLink, } from "react-router-dom";
type PropsType = {

}
const Navbar: FC<PropsType> = (props) => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <i className='bx bxs-home'></i>
                <NavLink to="/profile" >Profile</NavLink>
            </div>
            <div className={s.item}>
                <i className='bx bxs-chat'></i>
                <NavLink to="/dialogs">Messages</NavLink>
            </div>
            <div className={s.item}>
                <i className='bx bxs-user'></i>
                <NavLink to="/users">Users</NavLink>
            </div>
            <div className={s.item}>
                <i className='bx bxs-news' ></i>
                <NavLink to="/news">News</NavLink>
            </div>
            <div className={s.item}>
                <i className='bx bxs-music' ></i>
                <NavLink to="/music">Music</NavLink>
            </div>
            <div className={s.item}>
                <i className='bx bxs-cog' ></i>
                <NavLink to="/settings">Settings</NavLink>
            </div>
            <div>
            </div>
        </nav>
    )
}

export default Navbar
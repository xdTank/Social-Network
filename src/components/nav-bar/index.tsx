import React from "react"
import { BsPostcard } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import { NavButton } from "../nav-button"
import { IoHomeOutline } from "react-icons/io5";
import { LuMessageCircle, LuUserPlus } from "react-icons/lu"

export const NavBar: React.FC = () => {
    return (
        <nav>
            <ul className="flex flex-col gap-5">
                <li>
                    <NavButton to="/" icon={<IoHomeOutline />}>
                        Профиль
                    </NavButton>
                </li>
                <li>
                    <NavButton to="/chat" icon={<LuMessageCircle />}>
                        Сообщение
                    </NavButton>
                </li>
                <li>
                    <NavButton to="/following" icon={<FiUsers />}>
                        Подписчики
                    </NavButton>
                </li>
                <li>
                    <NavButton to="/users" icon={<LuUserPlus />}>
                        Пользователи
                    </NavButton>
                </li>
                <li>
                    <NavButton to="/followers" icon={<FaUsers />}>
                        Подписки
                    </NavButton>
                </li>
            </ul>
        </nav>
    )
}
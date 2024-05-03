import React, { useContext } from "react";
import { authApi } from "../../api/auth-api";
import { useNavigate } from "react-router-dom";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { CiLogout } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { useAppSelector } from "../../hooks/redux";
import { LuSunMedium } from "react-icons/lu"
import { ThemeContext } from "../theme-provider";




export const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [logout] = authApi.useLogoutMutation()
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const hadleLogout = () => {
        logout()
    }

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">Social Network</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem
                    className="lg:flex text-3xl cursor-pointer"
                    onClick={() => toggleTheme()}
                >
                    {theme === "light" ? <FaRegMoon size={26} /> : <LuSunMedium size={32} />}
                </NavbarItem>
                <NavbarItem>
                    {isAuth && (
                        <Button
                            color="default"
                            variant="flat"
                            className="gap-2"
                            onClick={hadleLogout}
                        >
                            <CiLogout /> <span>Выйти</span>
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}


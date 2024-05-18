import React, { useContext } from "react";
import { authApi } from "../../api/auth-api";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Switch } from "@nextui-org/react";
import { CiLogout, CiSettings } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { useAppSelector } from "../../hooks/redux";
import { LuSunMedium } from "react-icons/lu"
import { ThemeContext } from "../theme-provider";
import { AiFillAppstore } from "react-icons/ai";






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
                <p className="font-bold text-inherit flex items-center gap-1 text-center"><AiFillAppstore /> Социальная сеть</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Switch
                        onClick={() => toggleTheme()}
                        size="lg"
                        color="primary"
                        thumbIcon={({ className }) =>
                            theme === 'light' ? (
                                <FaRegMoon className={className} />
                            ) : (
                                <LuSunMedium className={className} />
                            )
                        }
                    >
                    </Switch>
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


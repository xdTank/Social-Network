import React from "react"
import { useAuthGuard } from "../../hooks/useAuthGuard"
import { Header } from "../header"
import { NavBar } from "../nav-bar"
import { Outlet } from "react-router-dom"
import { Container } from "../container"
import { useAppSelector } from "../../hooks/redux"
import { Profile } from "../profile-card"

export const Layout = () => {

    useAuthGuard()
    return (
        <>
            <Header />
            <Container>
                <div className="flex-2 p-4">
                    <NavBar />
                </div>
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
                <div className="flex-2 p-4">
                    <div className="flex-col flex gap-5">{<Profile />}</div>
                </div>
            </Container>
        </>
    )
}
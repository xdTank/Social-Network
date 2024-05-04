import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../button"

type Props = {
    children: React.ReactNode
    icon: JSX.Element
    to: string
}

export const NavButton: React.FC<Props> = ({ children, icon, to }) => {
    return (
        <Button className="flex justify-start text-xl" icon={icon} >
            <Link to={to} >
                {children}
            </Link>
        </Button>

    )
}
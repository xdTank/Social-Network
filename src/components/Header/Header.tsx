import React, { useState } from "react";
import s from "./Header.module.css"
import { Link } from "react-router-dom";
import { theme } from "antd";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../store/selectors/authSelectors";
import DropdownMenu from "../common/DropdownMenu/dropdownmenu";
import { Header } from "antd/es/layout/layout";



export const HeaderContainer = () => {
    return (
        <Header style={{ padding: 0, backgroundColor: '#2B2D31', }}>
            
        </Header>
    )
}


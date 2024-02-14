import React, { FC, useState } from "react";
import s from "./Header.module.css"
import { Link } from "react-router-dom";
import { Avatar, Button, Layout, theme } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useSelector } from "react-redux";
import { selectIsAuth, selectLogin } from "../../redux/authSelectors";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authReducer";



export const Header = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)
    const dispatch = useDispatch<any>()
    const logoutCallback = () => {
        dispatch(logout())
    }

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { Header } = Layout;

    return (
        <Header style={{ padding: 0, backgroundColor: '#2B2D31', }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <div className={s.loginBlock}>
                {isAuth
                    ? <div >
                        <Avatar className="" icon={<UserOutlined />} />
                        {login} <Button onClick={logoutCallback}>Log out</Button></div>
                    : <Link to={'/login'}>Login</Link>}
            </div>
        </Header>
    )
}


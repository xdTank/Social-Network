import React, { FC, useEffect } from "react";
import { Empty } from "antd";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/authSelectors";
import { Navigate, Routes, useNavigate } from "react-router-dom";


const Dialogs = () => {
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate])
    return (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    )
}


export default Dialogs
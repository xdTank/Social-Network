import React, { useEffect } from "react";
import { Empty, Flex } from "antd";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/authSelectors";
import { useNavigate } from "react-router-dom";


const Dialogs = () => {
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate])
    return (
        <Flex align="center" vertical>
            <Empty  image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Currently there are no messages'} style={{opacity: 0.7}} /> 
            </Flex>            
    )
}


export default Dialogs
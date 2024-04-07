import React, { useEffect } from "react";
import { Empty, Flex } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthGuard } from "../../hooks/useAuthGuard";


const Dialogs = () => {
   useAuthGuard()
    return (
        <Flex align="center" vertical style={{ paddingTop: '300px' }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span style={{color:'#fff'}}>Currently there are no messages</span>} style={{ opacity: 0.7, }} />
        </Flex>
    )
}


export default Dialogs
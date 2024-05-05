import React, { useEffect } from "react";
import { Empty, Flex } from "antd";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { GoBack } from "../../components/go-back";


const Dialogs = () => {
    useAuthGuard()
    return (
        <div className="flex flex-col ">
            <GoBack />
            <h2>У тебя нет сообщений</h2>
        </div>
    )
}


export default Dialogs
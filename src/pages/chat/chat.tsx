import { Avatar, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
    UserOutlined,
} from '@ant-design/icons';
import { ChatMessageType } from "../../api/chat-api";
import { useDispatch } from "react-redux";
import { sendMessage, startChating, stopChating } from "../../redux/chatReducer";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";





export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

export const Chat: React.FC = () => {
    const dispatch = useDispatch<any>()
    useEffect(() => {
        dispatch(startChating())
        return () => {
            dispatch(stopChating())
        }
    }, [])
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}
export const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    return (
        <div style={{ height: '600px', overflowY: 'auto' }}>
            {messages.map((m: any, index) =>
                <Message message={m} key={index} />
            )}
        </div>
    )
}
export const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <Avatar icon={<UserOutlined />} />
            <b>{message.userName}</b>
            <p>{message.message}</p>
            <hr />
        </div>
    )
}

export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch<any>()
    const status = useSelector((state: AppStateType) => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
        </div>
    )
}
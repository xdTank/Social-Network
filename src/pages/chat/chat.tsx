import { Avatar, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
    UserOutlined,
} from '@ant-design/icons';
import { ChatMessageType } from "../../api/chat-api";
import { useDispatch } from "react-redux";
import { sendMessage, startChating, stopChating } from "../../redux/chatReducer";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { selectIsAuth } from "../../redux/authSelectors";
import { useNavigate } from "react-router-dom";





export const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

export const Chat: React.FC = () => {
    const dispatch = useDispatch<any>()
    const status = useSelector((state: AppStateType) => state.chat.status)
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(startChating())
        return () => {
            dispatch(stopChating())
        }
    }, [])
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate])
    return (
        <div>
            {status === 'error' && <div> Some error occured. Please refresh the page</div>}
            <Messages />
            <AddMessageForm />
        </div >

    )
}

export const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [])
    return (
        <div style={{ height: '600px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m: any, index) => <Message key={m.id} message={m} />
            )}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
export const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return (
        <div >
            <Avatar icon={<UserOutlined />} src={message.photo} style={{ width: '30px' }} />
            <b>{message.userName}</b>
            <p>{message.message}</p>
            <hr />
        </div>
    )
})

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
            <Button disabled={status !== 'ready'} onClick={sendMessageHandler} >Send</Button>
        </div>
    )
}
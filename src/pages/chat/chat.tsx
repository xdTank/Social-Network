import { Avatar, Button, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
    UserOutlined,
} from '@ant-design/icons';
import { ChatMessageAPIType } from "../../api/chat-api";
import { useDispatch } from "react-redux";
import { sendMessage, startChating, stopChating, } from "../../redux/chatReducer";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { selectIsAuth } from "../../redux/authSelectors";
import { useNavigate } from "react-router-dom";
import { Formik, FormikHelpers, FormikValues } from "formik";






export const Chat: React.FC = () => {
    const dispatch = useDispatch<any>()
    const status = useSelector((state: AppStateType) => state.chat.status)
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate])

    useEffect(() => {
        dispatch(startChating())
        return () => {
            dispatch(stopChating())
        }
    }, [dispatch])
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
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'end' })
        }
    }, [isAutoScroll])
    return (
        <div style={{ height: '750px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m: ChatMessageAPIType) => <Message key={m.userId} message={m} />
            )}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
export const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
    return (
        <div style={{ margin: '20px' }}>
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
        console.log(status)
        if (!message) {
            return
        }
        console.log(message)
        dispatch(sendMessage(message))
        setMessage('')
    }
    return (
        <div style={{ display: 'flex' }}>
            <Input onClick={sendMessageHandler} disabled={status !== 'ready'} style={{ backgroundColor: '#383A40', border: 'none', color: '#C7CACE' }} placeholder="Write" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></Input>
            <Button style={{ backgroundColor: '#fff' }} onClick={sendMessageHandler} >Send</Button>
        </div >
    )
}
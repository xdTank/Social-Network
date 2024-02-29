import { Avatar, Button, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
    SendOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { ChatMessageAPIType } from "../../api/chat-api";
import { useDispatch } from "react-redux";
import { sendMessage, startChating, stopChating, } from "../../redux/chatReducer";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { selectIsAuth } from "../../redux/authSelectors";
import { useNavigate } from "react-router-dom";


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
        <div >
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
        const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
        setIsAutoScroll(atBottom);
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth', inline: 'end' })
        }
    }, [isAutoScroll])
    return (
        <div style={{ height: '740px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((m: ChatMessageAPIType) => <Message key={m.userId} message={m} />
            )}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}
export const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {

    return (
        <div style={{ margin: '20px', display: 'flex', alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} src={message.photo} style={{ width: '30px', marginRight: '10px' }} />
            <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <b style={{ marginRight: '10px' }}>{message.userName}</b>
                </div>
                <p style={{ marginBottom: '5px' }}>{message.message}</p>
            </div>
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
        <Form
            onFinish={sendMessageHandler}
            layout="inline"
        >
            <Form.Item style={{ width: '100%' }} >
                <Input suffix={
                    <Button type="text" style={{ backgroundColor: 'transparent', color: '#fff', textAlign: 'center', display: 'flex', alignItems: 'center', left: '15px' }}>
                        <SendOutlined />
                    </Button>} disabled={status !== 'ready'} style={{
                        backgroundColor: '#383A40',
                        border: 'none',
                        color: '#C7CACE',
                    }} placeholder="Write" onChange={(e) => setMessage(e.currentTarget.value)} value={message}></Input>
            </Form.Item>
        </Form>
    )
}
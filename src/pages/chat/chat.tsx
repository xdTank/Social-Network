import React, { useEffect, useRef, useState } from "react"
import { MessageField } from "../../components/common/Chat/MessageField"
import { useAuthGuard } from "../../hooks/useAuthGuard"
import { Message } from "../../components/common/Chat/Message"
import { Flex } from "antd"


export interface MessageType {
    userId: number
    userName: string
    message: string
    photo: string
    addedAt: string
}

const Chat = () => {
    const [messages, setMessages] = useState<MessageType[]>([])
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        socket.addEventListener('message', (event) => {
            const messages = JSON.parse(event.data)
            setMessages((prev) => [...prev, ...messages])
        })
        return () => {
            socket.close()
        }
    }, [])

    const sendMessage = (message: string) => {
        const socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        socket.addEventListener('open', () => {
            socket.send(message)
            socket.close()
        })
    }
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])
    useAuthGuard()
    return (
        <div className="flex flex-col justify-between">
            <div className="overflow-y-auto max-h-[75vh]">
                {messages && messages.map((m, index) => <Message key={index} message={m} />)}
                <div ref={messagesEndRef} />
            </div>
            <MessageField sendMessage={sendMessage} />
        </div>
    )
}

export default Chat
import React, {  useEffect, useRef, useState } from "react"
import { useAuthGuard } from "../../hooks/useAuthGuard"
import { GoBack } from "../../components/go-back"
import { InvalidateEvent, useReactQuerySubscription } from "../../hooks/useReactQuerySubscription"
import { Message } from "../../components/messages"
import { MessageField } from "../../components/message-field"


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
    // const sendWebSocketEvent = useReactQuerySubscription()

    // useEffect(() => {
    //     const subscriptionEvent: InvalidateEvent = {
    //         operation: 'invalidate',
    //         entity: ['messages'],
    //     };

    //     sendWebSocketEvent(subscriptionEvent);
    //     return () => {
    //         const unsubscribeEvent: InvalidateEvent = {
    //             operation: 'invalidate',
    //             entity: ['messages'],
    //         };
    //         sendWebSocketEvent(unsubscribeEvent);
    //     };
    // }, [sendWebSocketEvent]);

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
        <div className="flex-grow flex justify-between flex-col">
            <GoBack />
            <div className="overflow-y-auto overflow-x-hidden h-[60vh]">
                {messages && messages.map((m, index) => <Message key={index} message={m} />)}
                <div ref={messagesEndRef} />
            </div>
            <div className="">
                <MessageField sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
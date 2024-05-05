import React from "react"
import { useAppSelector } from "../../hooks/redux"
import { Avatar, Image } from "antd"
import dayjs from "dayjs"
import { UserOutlined } from "@ant-design/icons"
import { MessageType } from "../../pages/chat/chat"
import { generateAvatar } from "../random-info"

export const Message: React.FC<{ message: MessageType }> = ({ message }) => {
    const id = useAppSelector(state => state.auth.id)
    const isSender = message.userId === id
    return (
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2.5 mr-2.5`}>
            <div className={`relative flex items-center  ${isSender ? 'flex-row-reverse' : ''}`}>
                <Avatar
                    icon={<UserOutlined />}
                    src={message.photo ?? generateAvatar()}
                    alt="!"
                    className='rounded-full'
                />
                <div className={isSender ? 'mr-3' : 'ml-3'}>
                    <div className={`text-sm text-white p-2 text-center rounded-2xl ${isSender ? 'rounded-br-none bg-purple-700' : 'rounded-bl-none bg-gray-600'}`}>
                        {message.message}
                    </div>
                    <div className={`text-xs text-white opacity-40 block mt-1.5 ${isSender ? 'text-right' : 'text-left'} `}>
                        {dayjs(message.addedAt).format('HH:mm')}
                    </div>
                </div>
            </div>
        </div>
    )
}
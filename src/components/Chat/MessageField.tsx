import React from "react"
import { Button, Form } from "antd"
import { SendOutlined } from "@ant-design/icons"
import { Input } from "@nextui-org/react"

interface IMessageField {
    sendMessage: (value: string) => void
}
export const MessageField = ({ sendMessage }: IMessageField) => {
    const [message, setMessage] = React.useState('')
    const onFinish = () => {
        sendMessage(message)
        setMessage('')
    }
    return (
        <div className="">
            <Form onFinish={onFinish} layout="inline">
                <Form.Item>
                    <Input
                        placeholder="Write"
                        value={message}
                        autoComplete="off"
                        onChange={(e) => setMessage(e.target.value)}
                        endContent={
                            <SendOutlined className={`${message ? 'opacity-100' : 'opacity-0'}`}  /> 
                        }
                    />
                </Form.Item>
            </Form>
        </div>
    )

}
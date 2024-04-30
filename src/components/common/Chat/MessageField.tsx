import React from "react"
import { Button, Form, Input } from "antd"
import { SendOutlined } from "@ant-design/icons"

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
                        onChange={(e) => setMessage(e.target.value)}
                        style={{ backgroundColor: "#383A40", border: "none", color: "#C7CACE", }}
                        suffix={
                            <Button
                                htmlType="submit"
                                type="text"
                                disabled={!message}
                                style={{ backgroundColor: "transparent", alignItems: 'center', textAlign: 'center', display: 'flex', left: '15px' }}
                                className='ml-2'
                            >
                                <SendOutlined style={{ color: "#C7CACE" }} />
                            </Button>
                        }
                    />
                </Form.Item>
            </Form>
        </div>
    )

}
import React from "react"
import { Input } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form"
import { ErrorMessage } from "../error-message"
import { IoIosSend } from "react-icons/io";

interface IMessageField {
    sendMessage: (value: string) => void
}
export const MessageField = ({ sendMessage }: IMessageField) => {
    const { handleSubmit, control, formState: { errors }, setValue } = useForm()
    const onSubmit = handleSubmit((data) => {
        sendMessage(data.message)
        setValue('message', '')
    })
    const error = errors?.message?.message as string

    return (
        <form className="flex-grow" onSubmit={onSubmit}>
            <Controller
                name="message"
                control={control}
                defaultValue=""
                rules={{
                    required: "Обязательное поле",
                }}
                render={({ field }) => (
                    <Input
                        className="w-64"
                        {...field}
                        placeholder="Сообщение"
                        autoComplete="off"
                        endContent={<IoIosSend />}
                    />
                )}
            />
            {errors && <ErrorMessage error={error} />}
        </form>
    )
}
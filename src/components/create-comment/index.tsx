import { Button, Textarea } from "@nextui-org/react"
import { IoMdCreate } from "react-icons/io"
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "../error-message"
import { useParams } from "react-router-dom"
import { useActions } from "../../hooks/useActions"
import { useAppSelector } from "../../hooks/redux"

export const CreateComment = ({ onClose }: { onClose: () => void }) => {
    const { id } = useParams<{ id: string }>()
    const { createComment } = useActions()
    const { profile } = useAppSelector(state => state.profile)

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm()

    const onSubmit = handleSubmit((data) => {
        if (id) {
            createComment({ content: data.comment, postId: Number(id), user: profile, userId: profile?.userId ?? 0 })
            setValue("comment", "")
            onClose()
        }
    }
    )

    const error = errors?.comment?.message as string

    return (
        <form className="flex-grow" onSubmit={onSubmit}>
            <Controller
                name="comment"
                control={control}
                defaultValue=""
                rules={{
                    required: "Поле обязательно",
                }}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        labelPlacement="outside"
                        placeholder="Напишите свой ответ"
                        className="mb-5"
                    />
                )}
            />
            {errors && <ErrorMessage error={error} />}
            <Button
                fullWidth
                color="primary"
                className="flex-end "
                endContent={<IoMdCreate />}
                type="submit"
            >
                Ответить
            </Button>
        </form>
    )
}
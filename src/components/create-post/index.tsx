import { Button, Textarea } from "@nextui-org/react"
import { IoMdCreate } from "react-icons/io"
import { useForm, Controller } from "react-hook-form"
import { useActions } from "../../hooks/useActions"
import { ErrorMessage } from "../error-message"

export const CreatePost = () => {
    const { createPost } = useActions()
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm()

    const onSubmit = handleSubmit((data) => {
        try {
            createPost({ content: data.post })
            setValue("post", "")
        } catch (error) {
            console.log("err", error)
        }
    })
    const error = errors?.post?.message as string

    return (
        <form className="flex-grow" onSubmit={onSubmit}>
            <Controller
                name="post"
                control={control}
                defaultValue=""
                rules={{
                    required: "Обязательное поле",
                }}
                render={({ field }) => (
                    <Textarea
                        {...field}
                        labelPlacement="outside"
                        placeholder="О чем думайте?"
                        className="mb-5"
                    />
                )}
            />
            {errors && <ErrorMessage error={error} />}
            <Button
                color="success"
                className="flex-end"
                endContent={<IoMdCreate />}
                type="submit"
            >
                Добавить пост
            </Button>
        </form>
    )
}
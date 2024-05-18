import {
    Card as NextUiCard,
    CardHeader,
    CardBody,
    CardFooter,
    User,
    useDisclosure,
} from "@nextui-org/react"
import { Link, useNavigate } from "react-router-dom"
import { FaRegComment } from "react-icons/fa6"
import { FcLike } from "react-icons/fc"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri"
import { Spinner } from "@nextui-org/react"
import { useState } from "react"
import { MetaInfo } from "../meta-info"
import dayjs from "dayjs"
import { Typography } from "../typography"
import { ErrorMessage } from "../error-message"
import { useActions } from "../../hooks/useActions"
import { hasErrorField } from "../../utils/has-error-field"
import { useAppSelector } from "../../hooks/redux"
import { CurrentPost } from "../current-post"

type Props = {
    avatarUrl: string
    name: string
    authorId: number
    content: string
    commentId?: string
    likesCount?: number
    commentsCount?: number
    createdAt?: Date
    id?: number
    cardFor: "comment" | "post" | "current-post"
    likedByUser?: boolean
}

export const Card = ({
    avatarUrl = "",
    name = "",
    content = "",
    authorId = 0,
    id = 0,
    likesCount = 0,
    commentsCount = 0,
    cardFor = "post",
    likedByUser = false,
    createdAt,
    commentId = "",
}: Props) => {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { likePost, unlikePost, deletePost, deleteComment} = useActions()
    const { isOpen, onClose, onOpen } = useDisclosure()



    const handleClick = () => {
        try {
            likedByUser
                ? unlikePost(id)
                : likePost(id)
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error)
            } else {
                setError(err as string)
            }
        }
    }

    const handleDelete = () => {
        try {
            switch (cardFor) {
                case "post":
                    deletePost(id)
                    break
                case "current-post":
                    deletePost(id)
                    navigate('/')
                    break
                case "comment":
                    // deleteComment(commentId)
                    break
                default:
                    throw new Error("Неверный аргумент cardFor")
            }
        } catch (err) {
            console.log(err)
            if (hasErrorField(err)) {
                setError(err.data.error)
            } else {
                setError(err as string)
            }
        }
    }

    return (
        <NextUiCard className="mb-5">
            <CardHeader className="justify-between items-center bg-transparent">
                <Link to={`/profile/${authorId}`}>
                    <User
                        name={name}
                        className="text-small font-semibold leading-none text-default-600"
                        avatarProps={{ src: avatarUrl, size: "lg" }}
                        description={createdAt && dayjs(createdAt).format("DD.MM.YYYY")}

                    />
                </Link>
                <div className="cursor-pointer" onClick={handleDelete}>
                    <RiDeleteBinLine />
                </div>
            </CardHeader>
            <CardBody className="px-3 py-2 mb-5">
                <Typography>{content}</Typography>
            </CardBody>
            {cardFor !== "comment" && (
                <CardFooter className="gap-3">
                    <div className="flex gap-5 items-center">
                        <CurrentPost isOpen={isOpen} onClose={onClose} />
                        <div onClick={handleClick}>
                            <MetaInfo
                                count={likesCount}
                                Icon={likedByUser ? FcLike : MdOutlineFavoriteBorder}
                            />
                        </div>
                        <div onClick={() => onOpen()}>
                            <MetaInfo count={commentsCount} Icon={FaRegComment} />
                        </div>
                    </div>
                    <ErrorMessage error={error} />
                </CardFooter>
            )}
        </NextUiCard>
    )
}

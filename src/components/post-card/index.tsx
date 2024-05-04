// import {
//     Card as NextUiCard,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     User,
// } from "@nextui-org/react"
// import { Link, useNavigate } from "react-router-dom"
// import { FaRegComment } from "react-icons/fa6"
// import { FcLike } from "react-icons/fc"
// import { MdOutlineFavoriteBorder } from "react-icons/md"
// import { RiDeleteBinLine } from "react-icons/ri"
// import { Spinner } from "@nextui-org/react"
// import { useState } from "react"
// import { MetaInfo } from "../meta-info"
// import dayjs from "dayjs"
// import { Typography } from "../typography"
// import { ErrorMessage } from "../error-message"
// import { useActions } from "../../hooks/useActions"

// type Props = {
//     avatarUrl: string
//     name: string
//     authorId: string
//     content: string
//     commentId?: string
//     likesCount?: number
//     commentsCount?: number
//     createdAt?: Date
//     id?: number
//     cardFor: "comment" | "post" | "current-post"
//     likedByUser?: boolean
// }

// export const Card = ({
//     avatarUrl = "",
//     name = "",
//     content = "",
//     authorId = "",
//     id = 0,
//     likesCount = 0,
//     commentsCount = 0,
//     cardFor = "post",
//     likedByUser = false,
//     createdAt,
//     commentId = "",
// }: Props) => {
//     const [error, setError] = useState("")
//     const navigate = useNavigate()
//     const { likePost, unlikePost, deletePost, deleteComment, } = useActions()

//     // const refetchPosts = async () => {
//     //     switch (cardFor) {
//     //         case "post":
//     //             await triggerGetAllPosts().unwrap()
//     //             break
//     //         case "current-post":
//     //             await triggerGetAllPosts().unwrap()
//     //             break
//     //         case "comment":
//     //             await triggerGetPostById(id).unwrap()
//     //             break
//     //         default:
//     //             throw new Error("Неверный аргумент cardFor")
//     //     }
//     // }

//     const handleClick = () => {
//         try {
//             likedByUser
//                 ? unlikePost(id)
//                 : likePost(id)

//             // refetchPosts()
//         } catch (err) {
//             if (hasErrorField(err)) {
//                 setError(err.data.error)
//             } else {
//                 setError(err as string)
//             }
//         }
//     }

//     const handleDelete = () => {
//         try {
//             switch (cardFor) {
//                 case "post":
//                     deletePost(id)
//                     // refetchPosts()
//                     break
//                 case "current-post":
//                     deletePost(id)
//                     navigate('/')
//                     break
//                 case "comment":
//                     deleteComment(commentId)
//                     // refetchPosts()
//                     break
//                 default:
//                     throw new Error("Неверный аргумент cardFor")
//             }

//         } catch (err) {
//             console.log(err)
//             if (hasErrorField(err)) {
//                 setError(err.data.error)
//             } else {
//                 setError(err as string)
//             }
//         }
//     }

//     return (
//         <NextUiCard className="mb-5">
//             <CardHeader className="justify-between items-center bg-transparent">
//                 <Link to={`/users/${authorId}`}>
//                     <User
//                         name={name}
//                         className="text-small font-semibold leading-none text-default-600"
//                         avatarProps={{ src: avatarUrl, size: "lg" }}
//                         description={createdAt && dayjs(createdAt).format("DD.MM.YYYY")}

//                     />
//                 </Link>
//                 {authorId === currentUser?.id && (
//                     <div className="cursor-pointer" onClick={handleDelete}>
//                         {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
//                             <Spinner />
//                         ) : (
//                             <RiDeleteBinLine />
//                         )}
//                     </div>
//                 )}
//             </CardHeader>
//             <CardBody className="px-3 py-2 mb-5">
//                 <Typography>{content}</Typography>
//             </CardBody>
//             {cardFor !== "comment" && (
//                 <CardFooter className="gap-3">
//                     <div className="flex gap-5 items-center">
//                         <div onClick={handleClick}>
//                             <MetaInfo
//                                 count={likesCount}
//                                 Icon={likedByUser ? FcLike : MdOutlineFavoriteBorder}
//                             />
//                         </div>
//                         <Link to={`/posts/${id}`}>
//                             <MetaInfo count={commentsCount} Icon={FaRegComment} />
//                         </Link>
//                     </div>
//                     <ErrorMessage error={error} />
//                 </CardFooter>
//             )}
//         </NextUiCard>
//     )
// }

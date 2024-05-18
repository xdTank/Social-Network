import { useParams } from "react-router-dom"
import { profileApi } from "../../api/profile-api"
import { useAppSelector } from "../../hooks/redux"
import { CreatePost } from "../create-post"
import { ProfileCard } from "../profile-card"
// import { Card } from "../post-card"

export const Posts = () => {
    const { posts } = useAppSelector(state => state.post)
    const id = useAppSelector(state => state.auth.id)
    const { userId } = useParams<{ userId: string }>()

    const { data: profile, } = profileApi.useGetProfileQuery(Number(userId) || id, {
        skip: !userId && !id,
    })


    return (
        <div className="flex justify-between">
            <div className="flex-1 p-4">
                <div className="mb-10 w-full">
                    <CreatePost  />
                </div>
                {/* {posts && posts.length > 0 ? (
                    posts.map(({ content, likedByUser, createdAt, id,authorId }) => (
                        <Card
                            key={id}
                            avatarUrl={profile?.photos.small ?? ""}
                            content={content}
                            name={profile?.fullName ?? ""}
                            // likesCount={likes.length}
                            // commentsCount={comments.length}
                            authorId={authorId}
                            id={id}
                            likedByUser={likedByUser}
                            createdAt={createdAt}
                            cardFor="post"
                        />
                    ))
                ) : (
                    <p>У вас нет постов</p>
                )} */}
            </div>
            <div className="flex-2 p-4">
                <div className="flex-col flex gap-5">{!userId && <ProfileCard />}</div>
            </div>
        </div>
    )
}
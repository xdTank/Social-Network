import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Card, CardBody, User } from "@nextui-org/react"
import { usersAPI } from "../../api/users-api"
import { Button } from "../../components/follow-button"

export const Followers = () => {
    const { data: user, } = usersAPI.useGetUsersQuery({})


    const followers = user?.items.filter(user => user.followed);
    if (!followers || followers.length === 0) {
        return <h2>У вас нет подписчиков</h2>;
    }
    return (
        <div className="gap-5 flex flex-col ">
            {followers.map((user) => (
                <>
                    <Link to={`/profile/${user.id}`} key={user.id}>
                        <Card>
                            <CardBody className="block">
                                <div className="flex justify-between items-center">
                                    <User
                                        name={user.name ?? ""}
                                        avatarProps={{ src: user.photos.large ?? "" }}
                                        description={user.status ?? ""}
                                    />
                                    <Button user={user} />
                                </div>
                            </CardBody>
                        </Card>
                    </Link>
                </>
            ))}
        </div>
    )
}
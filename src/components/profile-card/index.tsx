import { Card, CardHeader, CardBody, Image, Spinner } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { MdAlternateEmail } from "react-icons/md"
import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux"
import { profileApi } from "../../api/profile-api"
import { generateAvatar } from "../random-info"

export const ProfileCard = () => {
    const id = useAppSelector(state => state.auth.id)
    const { email } = useAppSelector(state => state.auth)
    const { userId } = useParams<{ userId: string }>()

    const { data: profile, isLoading } = profileApi.useGetProfileQuery(Number(userId) || id, {
        skip: !userId && !id,
    })


    if (!profile) {
        return null
    }


    return (
        <Link to={`/profile/${id}`}>
            <Card className="py-4 w-[302px]">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    {isLoading ? <Spinner /> :
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src={profile.photos.large ?? generateAvatar()}
                            width={370}
                        />}
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <h4 className="font-bold text-large mb-2">{profile.fullName}</h4>
                    <p className="text-default-500 flex items-center gap-2">
                        <MdAlternateEmail />
                        {email}
                    </p>
                </CardBody>
            </Card>
        </Link>
    )
}
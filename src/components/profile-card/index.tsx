import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"
import { useSelector } from "react-redux"
import { MdAlternateEmail } from "react-icons/md"
import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../hooks/redux"
import { profileApi } from "../../api/profile-api"

export const Profile = () => {
    const id = useAppSelector(state => state.auth.id)
    const { email } = useAppSelector(state => state.auth)
    const { userId } = useParams<{ userId: string }>()

    const { data: profile, } = profileApi.useGetProfileQuery(Number(userId) || id, {
        skip: !userId && !id,
    })

    const { data: status, } = profileApi.useGetStatusQuery(Number(userId) || id, {
        skip: !userId && !id,
    })

    if (!profile || !status) {
        return null
    }


    return (
        <Card className="py-4 w-[302px]">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={profile.photos.large ?? ''}
                    width={370}
                />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Link to={`/profile/${id}`}>
                    <h4 className="font-bold text-large mb-2">{profile.fullName}</h4>
                </Link>
                <p className="text-default-500 flex items-center gap-2">
                    <MdAlternateEmail />
                    {email}
                </p>
            </CardBody>
        </Card>
    )
}
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Card, Image, Spinner } from "@nextui-org/react"
import { useDisclosure } from "@nextui-org/react"
import { Button as NextUIButton } from "../../components/follow-button"
import { GoBack } from "../../components/go-back"
import { CiEdit } from "react-icons/ci"
import { EditProfile } from "../../components/edit-profile"
import { profileApi } from "../../api/profile-api"
import { usersAPI } from "../../api/users-api"
import { useAppSelector } from "../../hooks/redux"
import { CountInfo } from "../../components/count-info"
import { ProfileInfo } from "../../components/profile-info"
import dayjs from "dayjs"
import { generateAvatar, generateLocationName } from "../../components/random-info"

export const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const id = useAppSelector(state => state.auth.id)
    const { userId } = useParams<{ userId: string }>()

    const { data: profile, isLoading, refetch: refetchProfile } = profileApi.useGetProfileQuery(Number(userId) || id, {
        skip: !userId && !id,
    })

    const { data: users } = usersAPI.useGetUsersQuery({})
    const isFollowing = users?.items.filter(user => user.followed)

    const handleClose = async () => {
        try {
            if (id) {
                onClose()
            }
        } catch (err) {
            console.log(err)
        }
    }

    if (!profile) {
        return null
    }

    return (
        <>
            <GoBack />
            <div className="flex items-stretch gap-4">
                <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
                    {isLoading ? <Spinner /> :
                        <Image
                            src={profile.photos.large ?? generateAvatar()}
                            alt={profile.fullName}
                            width={200}
                            height={200}
                            className="border-4 border-default-50"
                        />}
                    <div className="flex flex-col text-2xl font-bold gap-4 items-center">
                        {profile.fullName}
                        {id?.toString() !== userId ? (
                            <NextUIButton user={users?.items.find(user => user.id === Number(userId))!} />
                        ) : (
                            <Button
                                endContent={<CiEdit />}
                                onClick={() => onOpen()}
                            >
                                Редактировать
                            </Button>
                        )}
                    </div>
                </Card>
                <Card className="flex flex-col space-y-4 p-5 flex-1">
                    <ProfileInfo title="Местоположение:" info={generateLocationName()} />
                    <ProfileInfo title="Дата рождения:" info={dayjs(new Date()).format('DD.MM.YYYY')} />
                    <ProfileInfo title="Обо мне:" info={profile.aboutMe} />
                    <ProfileInfo title="Ищу работу:" info={profile.lookingForAJob ? 'Да' : 'Нет'} />
                    <ProfileInfo title="Описание работы:" info={profile.lookingForAJobDescription} />
                    <div className="flex gap-2">
                        <Link to={`/following`}>
                            <CountInfo count={isFollowing?.length} title="Подписчики" />
                        </Link>
                        <Link to={`/followers`}>
                            <CountInfo count={isFollowing?.length} title="Подписки" />
                        </Link>
                    </div>
                </Card>
            </div>
            <EditProfile refetchProfile={refetchProfile} isOpen={isOpen} onClose={handleClose} user={profile} />
        </>
    )
}
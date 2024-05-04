import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Avatar, Button, Card, Image } from "@nextui-org/react"
import { useDisclosure } from "@nextui-org/react"
import { Button as NextUIButton } from "../../components/follow-button"
import { GoBack } from "../../components/go-back"
import { CiEdit } from "react-icons/ci"
// import { EditProfile } from "../../components/edit-profile"
import { profileApi } from "../../api/profile-api"
import { usersAPI } from "../../api/users-api"
import { useAppSelector } from "../../hooks/redux"
import { CountInfo } from "../../components/count-info"
import { ProfileInfo } from "../../components/profile-info"
import dayjs from "dayjs"
import { useActions } from "../../hooks/useActions"
import { generateLocationName } from "../../components/location"

export const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
    // const [triggerCurrentQuery] = useLazyCurrentQuery()


    const id = useAppSelector(state => state.auth.id)
    const { userId } = useParams<{ userId: string }>()

    const { data: profile, } = profileApi.useGetProfileQuery(Number(userId) || id, {
        skip: !userId && !id,
    })


    const { data: user } = usersAPI.useGetUsersQuery({})
    const isFollowing = user?.items.filter(user => user.followed)


    const { resetProfile } = useActions()
    useEffect(
        () => () => {
            resetProfile()
        },
        [],
    )



    const handleClose = async () => {
        try {
            if (id) {
                // await triggerGetUserByIdQuery(id)
                // await triggerCurrentQuery()
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
                    <Image
                        src={profile.photos.large ?? 'https://mir-s3-cdn-cf.behance.net/project_modules/hd/d95c1f148207527.62d1246c25004.jpg'}
                        alt={profile.fullName}
                        width={200}
                        height={200}
                        className="border-4 border-default-50"
                    />
                    <div className="flex flex-col text-2xl font-bold gap-4 items-center">
                        {profile.fullName}
                        {id?.toString() !== userId ? (
                            <NextUIButton user={user?.items.find(user => user.id === Number(userId))!} />
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
                    <ProfileInfo title="Почта:" info={profile.contacts.website} />
                    <ProfileInfo title="Местоположение:" info={generateLocationName()} />
                    <ProfileInfo title="Ищу работу:" info={profile.lookingForAJob ? 'Да' : 'Нет'} />
                    <ProfileInfo title="Описание работы:" info={profile.lookingForAJobDescription} />
                    <ProfileInfo title="Дата рождения:" info={dayjs(new Date()).format('DD.MM.YYYY')} />
                    <ProfileInfo title="Обо мне:" info={profile.aboutMe} />
                    <div className="flex gap-2">
                        <CountInfo count={isFollowing?.length} title="Подписчики" />
                        <CountInfo count={isFollowing?.length} title="Подписки" />
                    </div>
                </Card>
            </div>
            {/* <EditProfile isOpen={isOpen} onClose={handleClose} user={profile}  /> */}
        </>
    )
}
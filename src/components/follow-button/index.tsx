import React from "react";
import { UserType, usersAPI } from "../../api/users-api";
import { Button as NextUIButton } from "@nextui-org/react";


export const Button: React.FC<{ user: UserType }> = ({ user }) => {
    const [follow, { isLoading: isFollowLoading }] = usersAPI.useFollowMutation()
    const [unfollow, { isLoading: isUnfollowLoading }] = usersAPI.useUnfollowMutation()

    if (!user) {
        return null
    }
    const handleFollowToggle = async (id: number) => {

        try {
            if (user.followed) {
                await unfollow(id)
            } else {
                await follow(id)
            }
        } catch (error) {
        }
    };
    return (
        <NextUIButton
            className={user.followed ? "bg-default-200  text-default-900 border-default-200" : ""}
            color="primary"
            radius="full"
            disabled={isFollowLoading || isUnfollowLoading}
            size="sm"
            variant={user.followed ? "bordered" : "solid"}
            onPress={() => handleFollowToggle(user.id)}
        >
            {user.followed ? <span>Отписаться</span> : <span>Подписаться</span>}
        </NextUIButton>
    )
}
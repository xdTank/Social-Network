import React, { FC, useEffect } from "react";
import User from "./User";
import Paginator from '../common/Paginator/Paginator'
import { UsersSearchForm } from "./UsersSearchForm"
import { FilterType, requestUsers } from "../../redux/usersReducer";
import { useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../redux/usersSelectors";
import { useDispatch } from "react-redux";


type PropsType = {
}

export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    return <div>
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
        </div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={followingInProgress}
                    key={u.id}
                    unfollow={unfollow}
                    follow={follow}
                />

                )

            }
        </div>
    </div>
}




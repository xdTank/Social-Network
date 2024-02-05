import React, { FC } from "react";
import User from "./User";
import Paginator from '../common/Paginator/Paginator'
import { UserType } from "../../types/types"
import { UsersSearchForm } from "./UsersSearchForm"
import { FilterType } from "../../redux/usersReducer";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

const Users: FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, onFilterChanged, users, ...props }) => {
    return <div>
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
        </div>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
        <div>
            {
                users.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}
                    key={u.id}
                    unfollow={props.unfollow}
                    follow={props.follow}
                />

                )

            }
        </div>
    </div>
}



export default Users

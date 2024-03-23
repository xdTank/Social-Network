import React, { FC, useEffect } from "react";
import User from "./User";
import { usersAPI } from "../../api/users-api";
import { Pagination } from "antd";
import UsersSearchForm, { FilterType } from "./UsersSearchForm";
import { useQueryParams } from "use-query-params";
import { useNavigate } from "react-router-dom";


type PropsType = {
}



export const Users: FC<PropsType> = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchTerm, setSearchTerm] = React.useState('')
    const [friend, setFriend] = React.useState<boolean | null>(null)
    const [pageSize, setPageSize] = React.useState(10)
    const [queryParams, setQueryParams] = useQueryParams()
    const navigate = useNavigate()
    const { data: users, error, isLoading, refetch } = usersAPI.useGetUsersQuery({ currentPage: currentPage, pageSize: pageSize, term: searchTerm, friend: friend }, {
        refetchOnMountOrArgChange: true
    })

    const onSearch = (values: FilterType) => {
        setSearchTerm(values.term)
        setFriend(values.friend)
        refetch && refetch()
    }
    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page)
        setPageSize(pageSize)
    }


    useEffect(() => {
        const searchParams = new URLSearchParams();
        if (currentPage !== 1) searchParams.append('page', String(currentPage));
        if (searchTerm) searchParams.append('term', searchTerm);
        if (friend !== null) searchParams.append('friend', String(friend))
        if (pageSize !== 10) searchParams.append('pageSize', String(pageSize))
        navigate({ search: searchParams.toString() });
    }, [currentPage, searchTerm, friend, navigate]);


    return <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', flexDirection: 'column', }}>
        <div>
            <UsersSearchForm
                onSearch={onSearch}
                searchTerm={searchTerm}
                friend={friend} />
        </div>
        <div style={{ overflowY: 'auto', height: '70vh' }}>
            {isLoading ? <div>Загрузка...</div> : error ? <div>{JSON.stringify(error)}</div> : users ? users.items.map(u => <User user={u}
                key={u.id}
            />) : <div>Пользователи не найдены</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', flexShrink: 0 }}>
            <Pagination defaultCurrent={1} total={users?.totalCount} defaultPageSize={pageSize} onChange={setCurrentPage} showSizeChanger onShowSizeChange={handlePageChange} />
        </div>
    </div>
}





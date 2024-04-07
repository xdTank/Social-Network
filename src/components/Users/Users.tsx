import React, { FC, useEffect } from "react";
import User from "./User";
import { usersAPI } from "../../api/users-api";
import { Pagination } from "antd";
import UsersSearchForm, { FilterType } from "./UsersSearchForm";
import { BooleanParam, NumberParam, StringParam, useQueryParams } from "use-query-params";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/redux";






export const Users: FC = () => {
    const { setQueryParams } = useActions()
    const [query, setQuery] = useQueryParams({
        page: NumberParam,
        count: NumberParam,
        term: StringParam,
        friend: BooleanParam || null,
    })
    const { page, count, term, friend } = useAppSelector(state => state.user)
    const { data: users, error, isLoading } = usersAPI.useGetUsersQuery({
        page: query.page || 1,
        count: query.count || 10,
        term: query.term || '',
        friend: query.friend
    })

    useEffect(() => {
        if (query.page !== undefined) setQueryParams(String(query.page));
        if (query.count !== undefined) setQueryParams(String(query.count));
        if (query.term !== undefined) setQueryParams(String(query.term));
        if (query.friend !== undefined) setQueryParams(String(query.friend));


    }, [query, setQueryParams])

    const onSearch = (values: FilterType) => {
        setQuery({ ...query, ...values })
    }
    const handlePageChange = (page: number, count: number) => {
        setQuery({ page, count })
    }

    return <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', flexDirection: 'column', }}>
        <div>
            <UsersSearchForm
                onSearch={onSearch}
                searchTerm={term}
                friend={friend} />
        </div>
        <div style={{ overflowY: 'auto', height: '70vh' }}>
            {isLoading ? <div>Загрузка...</div> : error ? <div>{JSON.stringify(error)}</div> : users ? users.items.map(u => <User user={u}
                key={u.id}
            />) : <div>Пользователи не найдены</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', flexShrink: 0 }}>
            <Pagination defaultCurrent={page} total={users?.totalCount} defaultPageSize={count} onChange={handlePageChange} showSizeChanger onShowSizeChange={handlePageChange} />
        </div>
    </div>
}





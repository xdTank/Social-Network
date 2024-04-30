import React, { FC } from "react";
import User from "./User";
import { usersAPI } from "../../api/users-api";
import { Pagination, Spin } from "antd";
import UsersSearchForm, { FilterType } from "./UsersSearchForm";
import { BooleanParam, NumberParam, StringParam, useQueryParams } from "use-query-params";
import { LoadingOutlined } from "@ant-design/icons";


export const Users: FC = () => {
    const [query, setQuery] = useQueryParams({
        page: NumberParam,
        count: NumberParam,
        term: StringParam,
        friend: BooleanParam || null,
    })
    const { data: users, error, isLoading } = usersAPI.useGetUsersQuery({
        page: query.page || 1,
        count: query.count || 10,
        term: query.term || '',
        friend: query.friend || null
    })


    const onSearch = (values: FilterType) => {
        setQuery({ term: values.term, friend: values.friend})
    }
    const handlePageChange = (page: number, count: number) => {
        setQuery({ page, count })
    }

    return <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', flexDirection: 'column', }}>
        <div>
            <UsersSearchForm
                onSearch={onSearch}
                searchTerm={query.term || ''}
                friend={query.friend || null} />
        </div>
        <div style={{ overflowY: 'auto', height: '70vh' }}>
            {isLoading ? <div><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div> : error ? <div>{JSON.stringify(error)}</div> : users ? users.items.map(u => <User user={u}
                key={u.id}
            />) : <div>Пользователи не найдены</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', flexShrink: 0 }}>
            <Pagination defaultCurrent={1}  total={users?.totalCount} defaultPageSize={10} onChange={handlePageChange} showSizeChanger onShowSizeChange={handlePageChange} />
        </div>
    </div>
}





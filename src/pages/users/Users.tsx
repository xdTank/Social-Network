import React, { FC, useEffect, useState } from "react";
import User from "../../components/Users/User"
import { usersAPI } from "../../api/users-api";
import { Pagination, Spin } from "antd";
import UsersSearchForm, { FilterType } from "../../components/Users/UsersSearchForm";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";


export const Users: FC = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const count = searchParams.get('count') || 10;
    const term = searchParams.get('term') || '';
    const friend = searchParams.get('friend');
    const navigate = useNavigate();

    const { data: users, error, isLoading } = usersAPI.useGetUsersQuery({
        page: Number(page),
        count: Number(count),
        term,
        friend: friend === 'true' ? true : friend === 'false' ? false : null
    })


    const onSearch = (values: FilterType) => {
        searchParams.set('term', values.term);
        searchParams.set('friend', values.friend ? values.friend.toString() : '')
        navigate({ search: searchParams.toString() })
    }

    const handlePageChange = (page: number, count: number) => {
        searchParams.set('page', page.toString());
        searchParams.set('count', count.toString());
        navigate({ search: searchParams.toString() })
    }

    return <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', flexDirection: 'column', }}>
        <div>
            <UsersSearchForm
                onSearch={onSearch}
                searchTerm={term}
                friend={friend !== null && friend !== 'false' ? friend === 'true' : null} />
        </div>
        <div style={{ overflowY: 'auto', height: '70vh' }}>
            {isLoading ? <div><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div> : error ? <div>{JSON.stringify(error)}</div> : users ? users.items.map(u => <User user={u}
                key={u.id}
            />) : <div>Пользователи не найдены</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', flexShrink: 0 }}>
            <Pagination defaultCurrent={1} total={users?.totalCount} defaultPageSize={10} onChange={handlePageChange} showSizeChanger onShowSizeChange={handlePageChange} />
        </div>
    </div>
}





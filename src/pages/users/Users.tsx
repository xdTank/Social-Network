import React, { FC, useState } from "react";
import User from "../../components/Users/User"
import { usersAPI } from "../../api/users-api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Pagination, Spinner } from "@nextui-org/react";
import Search from "../../components/search-form";
import { GoBack } from "../../components/go-back";

type FilterType = {
    term: string
    friend: boolean | null
}
export const Users: FC = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const term = searchParams.get('term') || '';
    const navigate = useNavigate();
    const { data: users, error, isLoading } = usersAPI.useGetUsersQuery({
        page: Number(page),
        term,
    })

    const totalCount = users ? Math.ceil(users?.totalCount / 10) : 0


    const onSearch = (values: FilterType) => {
        searchParams.set('term', values.term);
        navigate({ search: searchParams.toString() })
    }


    const handlePageChange = (page: number) => {
        searchParams.set('page', page.toString())
        navigate({ search: searchParams.toString() })
    }

    return <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', flexDirection: 'column', }}>
        <div className="mb-3 flex items-center justify-between">
            <GoBack />
            <Search
                onSearch={onSearch}
                searchTerm={term}
            />
        </div>
        <div style={{ overflowY: 'auto', height: '62vh' }}>
            {isLoading ? <div><Spinner /></div> : error ? <div>{JSON.stringify(error)}</div> : users ? users.items.map(u => <User user={u}
                key={u.id}
            />) : <div>Пользователи не найдены</div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', flexShrink: 0 }}>
            <Pagination initialPage={1} total={totalCount} onChange={handlePageChange} />
        </div>
    </div>
}





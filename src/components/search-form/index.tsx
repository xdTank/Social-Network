import React from 'react';
import { Form } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';


type PropsType = {
    searchTerm: string
    onSearch: (values: FilterType) => void
}
export type FilterType = {
    term: string
}
const Search: React.FC<PropsType> = ({ searchTerm, onSearch }) => {
    const { handleSubmit, register } = useForm<FilterType>()
    const onSubmit = handleSubmit((data: FilterType) => {
        onSearch(data)
    })

    return (
        <>
            <form
                onSubmit={onSubmit}
                {...register("term")}
            >
                <Input
                    name="term"
                    defaultValue={searchTerm}
                    placeholder="Поиск по пользователям"
                    endContent={
                        <SearchOutlined />
                    }
                />
            </form>
        </>
    );
}


export default Search;
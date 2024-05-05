import React from 'react';
import { Form } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { Input } from '@nextui-org/react';


type PropsType = {
    searchTerm: string
    onSearch: (values: FilterType) => void
}
export type FilterType = {
    term: string
    friend: boolean | null
}
const Search: React.FC<PropsType> = ({ searchTerm, onSearch }) => {
    const onFinish = (values: FilterType) => {
        onSearch(values)
    }
    return (
        <>
            <Form layout="vertical"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{ term: searchTerm }}>
                <Form.Item name="term"  >
                    <Input placeholder="Поиск по пользователям"
                        endContent={
                            <SearchOutlined />
                        }
                    />
                </Form.Item>
                <Form.Item>
                </Form.Item>
            </Form>
        </>
    );
}


export default Search;
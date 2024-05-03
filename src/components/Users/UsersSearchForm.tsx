import React, { useEffect } from 'react';
import { Button, Select } from "antd";
import { Form, Input } from 'antd';
import { SearchOutlined } from "@ant-design/icons";


type PropsType = {
    searchTerm: string
    friend: boolean | null
    onSearch: (values: FilterType) => void
}
export type FilterType = {
    term: string
    friend: boolean | null
}
const UsersSearchForm: React.FC<PropsType> = ({ searchTerm, friend, onSearch }) => {
    const onFinish = (values: FilterType) => {
        onSearch(values)
    }
    return (
        <>
            <Form layout="vertical"
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{ term: searchTerm, friend: friend }}>
                <Form.Item name='friend'>
                    <Select
                        defaultValue={null}
                        style={{ width: 110 }}
                        size="small"
                        options={[
                            { value: null, label: 'All' },
                            { value: true, label: 'Only followed' },
                            { value: false, label: 'Not a follower' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="term" style={{ width: '100%' }} >
                    <Input placeholder="Search"
                        suffix={
                            <Button type='text' style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center', textAlign: 'center', width: "1px" }} htmlType="submit" ><SearchOutlined /></Button>
                        }
                    />
                </Form.Item>
                <Form.Item>
                </Form.Item>
            </Form>
        </>
    );
}


export default UsersSearchForm;




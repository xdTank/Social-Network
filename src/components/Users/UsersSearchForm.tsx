import { Button, Select } from "antd";
import React from 'react';
import { Form, Input } from 'antd';
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/usersSelectors";
import { FilterType, requestUsers } from "../../redux/usersReducer";
import { useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";


type PropsType = {
    pageSize: number
}
const UsersSearchForm: React.FC<PropsType> = ({ pageSize }) => {
    const dispatch = useDispatch<any>()
    const filter = useSelector(getUsersFilter)
    const onFinish = (values: FilterType) => {
        dispatch(requestUsers(1, pageSize, values))
    }
    return (
        <>
            <Form layout="vertical"
                style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{ term: filter.term, friend: filter.friend }}>
                <Form.Item name='friend'>
                    <Select
                        defaultValue={null}
                        style={{ width: 110 }}
                        size="small"
                        options={[
                            { value: null, label: 'All' },
                            { value: 'true', label: 'Only followed' },
                            { value: 'false', label: 'Only unfollowed' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
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




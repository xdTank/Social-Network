import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Flex, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { selectLogin } from '../../../redux/authSelectors';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/authReducer';



const DropdownMenu: React.FC = () => {
    const login = useSelector(selectLogin)
    const dispatch = useDispatch<any>()
    const logoutCallback = () => {
        dispatch(logout())
    }

    const items: MenuProps['items'] = [
        {
            label: <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Avatar className="" icon={<UserOutlined />} /><div>{login}</div></div>,
            key: '0',
        },

        {
            type: 'divider',
        },
        {
            label: <Button onClick={logoutCallback}>Log out</Button>,
            key: '2',
        },
    ]
    return <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "#DBDEE1" }}>
                More
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>;
}

export default DropdownMenu
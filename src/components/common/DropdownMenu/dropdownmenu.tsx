import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Flex, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useAppSelector } from '../../../hooks/redux';
import { CiLogout } from "react-icons/ci";
import { authApi } from '../../../api/auth-api';



const DropdownMenu: React.FC = () => {
    const login = useAppSelector(state => state.auth.login)
    const [logout] = authApi.useLogoutMutation()      


    const items: MenuProps['items'] = [
        {
            label: <div style={{ display: 'flex', alignItems: 'center', gap: '5px', }}><Avatar icon={<UserOutlined />} />{login}</div>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <Button style={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: '5px', }} onClick={() => logout()}><CiLogout />Log out</Button>,
            key: '2',
        },
    ]
    return <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "#DBDEE1", marginRight: '20px' }}>
                {login}
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>;
}

export default DropdownMenu
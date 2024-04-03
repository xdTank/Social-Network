import React from 'react';
import { DownOutlined, LoginOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Flex, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons'
import { useActions } from '../../../hooks/useActions';
import { useAppSelector } from '../../../hooks/redux';
import { authApi } from '../../../api/auth-api';



const DropdownMenu: React.FC = () => {
    const login = useAppSelector(state => state.auth.login)
    const [logout] = authApi.useLogoutMutation()
    const logoutCallback = () => {
        logout(null)
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
            label: <Button onClick={logoutCallback}><LoginOutlined />Log out</Button>,
            key: '2',
        },
    ]
    return <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "#DBDEE1", marginRight: '20px' }}>
                More
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>;
}

export default DropdownMenu
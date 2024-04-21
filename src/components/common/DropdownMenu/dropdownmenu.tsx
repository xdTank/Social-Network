import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { useAppSelector } from '../../../hooks/redux';
import { CiLogout } from "react-icons/ci";
import { authApi } from '../../../api/auth-api';



const DropdownMenu: React.FC = () => {
    const login = useAppSelector(state => state.auth.login)
    const [logout] = authApi.useLogoutMutation()


    const items: MenuProps['items'] = [
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
import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import s from './login.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../api/auth-api';
import { useDispatch } from 'react-redux';

type FieldType = {
    email?: string;
    password?: string;
    rememberMe?: string;
    captcha?: string | null
}
interface LoginForm {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}


const LoginForm: React.FC = () => {
    const { error, captchaUrl, } = useAppSelector(state => state.auth)
    const [login] = authApi.useLoginMutation()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    const onFinish =  (values: LoginForm) => {
        login(values)
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/profile')
        }
    },[isAuth, navigate])
    return (
        <Form
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className={s.wrapper}
        >
            <h1>Login</h1>
            <Form.Item<FieldType>
                name="email"
                className={s.inputBox}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder='Email' style={{ backgroundColor: 'transparent' }} />
            </Form.Item>
            <Form.Item<FieldType>
                name="password"
                className={s.inputBox}
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input placeholder='Password' style={{ backgroundColor: 'transparent' }} type='password' />
            </Form.Item>
            <Form.Item<FieldType>
                name="rememberMe"
                valuePropName="checked"
            >
                <div className={s.rememberForgot}>
                    <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
                    <a className="" href="#">Forgot password?</a>
                </div>
            </Form.Item>
            {error && <div style={{ color: 'red', margin: '5px', textAlign: 'center' }}>{error}</div>}
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && <Form.Item<FieldType>
                name='captcha'
                rules={[{ required: true, message: 'Please input your symbols!' }]}>
                <Input />
            </Form.Item>
            }
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
            <Form.Item
                className={s.registerLink}
            >
                <p>Don't have an account? <a href="https://social-network.samuraijs.com/signUp">Register</a></p>
            </Form.Item>
        </Form >
    )
}

export const LoginPage = () => {
    return <div className={s.login}>
        <LoginForm />
    </div>
}

export default LoginForm;
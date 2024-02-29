import React, { FC, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../redux/authReducer';
import { useDispatch } from 'react-redux';
import s from './login.module.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { LockOutlined, UserOutlined } from '@ant-design/icons';


type FieldType = {
    email?: string;
    password?: string;
    rememberMe?: string;
    captcha?: string | null
};

const LoginForm: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const dispatch = useDispatch<any>()
    const errorMessage = useSelector((state: AppStateType) => state.auth.errorMessage)
    const onFinish = async (values: any) => {
        dispatch(login(values.email, values.password, values.rememberMe, values.captcha))
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <Form
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={s.wrapper}
        >
            <h1>Login</h1>
            <Form.Item<FieldType>
                name="email"
                className={s.inputBox}
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder='Email' style={{ backgroundColor: 'transparent' }}  />
            </Form.Item>
            <Form.Item<FieldType>
                name="password"
                className={s.inputBox}
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input placeholder='Password' style={{ backgroundColor: 'transparent' }} type='password'  />
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
            {errorMessage && <div style={{ color: 'red', margin: '5px', textAlign: 'center' }}>{errorMessage}</div>}
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

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)


    if (isAuth) {
        return <Routes>
            <Route path="*" element={<Navigate to={"/profile"} />
            } />
        </Routes>
    }
    return <div className={s.login}>
        <LoginForm />
    </div>
}

export default LoginForm;
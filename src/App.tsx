import React, { ComponentType, FC, lazy, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import 'antd'
import { LoginPage } from './components/Login/login';
import { Provider } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import store, { AppStateType } from './redux/reduxStore';
import { withSuspense } from './hoc/withSuspense';
import { UsersPage } from './components/Users/UsersContainer';
import {
  UserOutlined,
  HomeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Header } from './components/Header/Header'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectIsAuth } from './redux/authSelectors';
import s from './components/Navbar/Navbar.module.css'


const { Sider, Content } = Layout;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

const ChatPage = lazy(() =>
  import('./pages/chat/chat')
    .then(({ ChatPage }) => ({ default: ChatPage })),
)
const ProfileContainer = lazy(() =>
  import('./components/Profile/ProfileContainer')
    .then(({ ProfileContainer }) => ({ default: ProfileContainer })),
)


const App: React.FC = () => {
  const initialiazed = useSelector((state: AppStateType) => state.app.initialiazed)
  const dispatch = useDispatch<any>()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    dispatch(initializeApp())
  }, [initializeApp])

  if (!initialiazed) {
    return (
      <Preloader />)
  }
  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          style={{
            backgroundColor: '#1E1F22',
            height: '100%'
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: <Link to="/profile" >Profile</Link>,
            },
            {
              key: '2',
              icon: <MessageOutlined />,
              label: <Link to="/dialogs">Messages</Link>,
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: <Link to="/chat">Chat</Link>,
            },
          ]}
        />
      </Sider>
      <Layout style={{
        backgroundColor: '#2B2D31',
      }
      }>
        <Header />
        <Content
          style={{
            margin: '24px 16px',
            backgroundColor: '#313338',
            padding: 24,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<LoginPage />} />
            <Route path='/project' element={<LoginPage />} />
            <Route path='/profile/:userId?' Component={withSuspense(ProfileContainer)} />
            <Route path='/dialogs' Component={withSuspense(DialogsContainer)} />
            <Route path='/chat' Component={withSuspense(ChatPage)} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='*' element={<div><h1>404 not found</h1></div>} />
          </Routes>
        </Content>
      </Layout>
    </Layout >
  )
}



const MainApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <React.Suspense fallback={<Preloader />}>
          <App />
        </React.Suspense>
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp




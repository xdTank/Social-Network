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
  } return (
    < Layout >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu className=''
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
      <Layout>
        <Header />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path='/login' Component={() => <LoginPage />} />
            <Route path='/' Component={() => <LoginPage />} />
            <Route path='/project' Component={() => <LoginPage />} />
            <Route path='/profile/:userId?' Component={withSuspense(ProfileContainer)} />
            <Route path='/dialogs' Component={withSuspense(DialogsContainer)} />
            <Route path='/chat' Component={withSuspense(ChatPage)} />
            <Route path='/users' Component={() => <UsersPage />} />
            <Route path='*' Component={() => <div><h1>404 not found</h1></div>} />
          </Routes>
        </Content>
      </Layout>
    </Layout >
  );
};


const MainApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <React.Suspense fallback={<Preloader />}>
          <App />
        </React.Suspense>
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp




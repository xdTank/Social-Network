import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryParamProvider } from 'use-query-params';
import { ThemeProvider } from './components/theme-provider';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { NextUIProvider } from '@nextui-org/react';
import ReduxToastr from 'react-redux-toastr';
import { persistor, store } from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { LoginPage } from './components/Login/login';
import { Layout } from './components/layout';
import Profile from './pages/profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Users } from './pages/users/Users';
import Chat from './pages/chat/chat';
import { Followers } from './pages/followers';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Profile />,
            },
            {
                path: '/profile/:userId?',
                element: <Profile />,
            },
            {
                path: '/dialogs',
                element: <Dialogs />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '/followers',
                element: <Followers />,
            },

            {
                path: '*',
                element: <div><h1>404 not found</h1></div>,
            }
        ]
    }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider>
                        <NextUIProvider>
                            <RouterProvider router={router} />
                        </NextUIProvider>
                    </ThemeProvider>
                </PersistGate>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode >
)





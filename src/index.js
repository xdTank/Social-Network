import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './components/theme-provider';
import { NextUIProvider } from '@nextui-org/react';
import { persistor, store } from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoginPage } from './components/Login/login';
import { Layout } from './components/layout';
import { Users } from './pages/users/Users';
import Chat from './pages/chat/chat';
import { Followers } from './pages/followers';
import { Following } from './pages/following';
import { Posts } from './components/post';
import { Profile } from './pages/profile';
import Dialogs from './pages/dialogs';

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
                element: <Posts />,
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
                path: '/following',
                element: <Following />,
            },
            {
                path: '*',
                element: <div><h1>404 not found</h1></div>,
            },
            {
                path: '/project',
                element: <Posts />,
            },
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





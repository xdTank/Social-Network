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
import { Layout } from './components/layout';
import { Users } from './pages/users';
import Chat from './pages/chat';
import { Followers } from './pages/followers';
import { Following } from './pages/following';
import { Posts } from './components/post';
import { Profile } from './pages/profile';
import Dialogs from './pages/dialogs';
import { Auth } from './pages/auth';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Auth />,
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
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '/users',
                element: <Users />,
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
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </PersistGate>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode >
)





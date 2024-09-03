import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { store } from "./app/store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import { ThemeProvider } from "./components/theme-provider"
import { Layout } from "./components/layout"
import { Auth } from "./pages/auth"
import { Following } from "./pages/following"
import { Followers } from "./pages/followers"
import { UserProfile } from "./pages/profile"
import { CurrentPost } from "./components/current-post"
import { Posts } from "./components/post"
import { AuthGuard } from "./feauters/user/authGuard"

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <CurrentPost />,
      },
      {
        path: "users/:id",
        element: <UserProfile />,
      },
      {
        path: "followers",
        element: <Followers />,
      },
      {
        path: "following",
        element: <Following />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthGuard>
          <RouterProvider router={router} />
        </AuthGuard>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)




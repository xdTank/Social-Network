import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "./redux"


export const useAuthGuard = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth])
}
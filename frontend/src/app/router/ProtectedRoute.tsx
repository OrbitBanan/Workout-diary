import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken, removeAccessToken } from "../../features/auth/authStore";
import { getCurrentUser } from "../../features/auth/api"

function ProtectedRoute() {
    const [isChecking, setIsChecking] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const accessToken = getAccessToken()

        if(!accessToken) {
            setIsChecking(false)
            return
        }

        getCurrentUser()
            .then(() => {
                setIsAuthenticated(true)
            })
            .catch(() => {
                removeAccessToken()
                setIsAuthenticated(false)
            })
            .finally(() => {
                setIsChecking(false)
            })
    }, [])

    if (isChecking) {
        return <div>Проверка авторизации...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }

    return <Outlet />
}

export default ProtectedRoute
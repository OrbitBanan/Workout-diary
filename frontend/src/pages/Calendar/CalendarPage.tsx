import { useNavigate } from "react-router-dom"
import { logout } from "../../features/auth/logout"

function CalendarPage() {
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <main className="min-h-screen bg-slate-100 p-8">
            <h1 className="text-3xl font-bold text-slate-900">
                Дневник тренировок
            </h1>

            <p className="mt-2 text-slate-600">
                Добро пожаловать в свой дневник тренировок
            </p>

            <button
                onClick={handleLogout}
                className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
                Logout
            </button>
        </main>
    )
}

export default CalendarPage
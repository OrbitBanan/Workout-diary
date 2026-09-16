import { Link } from "react-router-dom"
import LoginForm from "../../features/auth/login/LoginForm"

function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Войти
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Авторизуйтесь в ваш Workout diary аккаунт
                    </p>
                </div>

                <LoginForm />

                <p className="mt-6 text-center text-sm text-slate-500">
                    Нет аккаунта?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:text-blue-700"
                    >
                        Зарегистрироваться
                    </Link>
                </p>
      </section>
    </main>
    )
}

export default LoginPage
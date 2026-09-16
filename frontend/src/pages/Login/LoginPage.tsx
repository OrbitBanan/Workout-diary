import { useState } from "react"
import { Link } from "react-router-dom"
import Input from "../../shared/ui/Input/Input"
import Button from "../../shared/ui/Button/Button"

type LoginFormData = {
    email: string
    password: string
}

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data: LoginFormData = {
            email,
            password
        }

        console.log(data)
    }

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

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Почта
                        </label>

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Пароль
                        </label>

                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit">
                        Login
                    </Button>
                </form>

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
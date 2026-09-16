import { Link } from "react-router-dom"
import { useState } from "react"
import Button from "../../shared/ui/Button/Button"
import Input from "../../shared/ui/Input/Input"

type RegisterFormData = {
    email: string
    password: string
    confirmPassword: string
}

type RegisterFormErrors = {
    password?: string
    confirmPassword?: string
}

function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<RegisterFormErrors>({})

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newErrors: RegisterFormErrors = {}

        if (password.length < 8) {
            newErrors.password = 'Пароль должен быть не меньше 8 символов'
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают'
        }

        setErrors(newErrors)

        if(Object.keys(newErrors).length > 0) {
            return
        }

        const data:RegisterFormData = {
            email,
            password,
            confirmPassword
        }

        console.log(data)
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Зарегистрироваться
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Создайте аккаунт в Workout diary
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

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Подтвердите пароль
                        </label>

                        <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    <Button type="submit">
                        Зарегистрироваться
                    </Button>
                </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Уже есть аккаунт?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Войти
          </Link>
        </p>
      </section>
    </main>
    )
}

export default RegisterPage
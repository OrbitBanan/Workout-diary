import { Link } from "react-router-dom"
import RegisterForm from "../../features/auth/register/RegisterForm"

function RegisterPage() {

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

                <RegisterForm />

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
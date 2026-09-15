import { useState } from "react"
import { Link } from "react-router-dom"

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log({
            email,
            password
        })
    }

    return (
        <main>
            <h1>Войти</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Почта</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Пароль</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit">Войти</button>
            </form>

            <Link to="/register">Нет аккаунта? Зарегистрироваться</Link>
        </main>
    )
}

export default LoginPage
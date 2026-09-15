import { Link } from "react-router-dom"

function RegisterPage() {
    return (
        <main>
            <h1>Зарегистрироваться</h1>

            <form>
                <div>
                    <label htmlFor="email">Почта</label>
                    <input id="email" type="email" />
                </div>

                <div>
                    <label htmlFor="password">Пароль</label>
                    <input id="password" type="password" />
                </div>

                <div>
                    <label htmlFor="confirm-password">Подтвердите пароль</label>
                    <input id="confirm-password" type="password" />
                </div>

                <button type="submit">Зарегистрироваться</button>
            </form>

            <Link to="/login">Уже есть аккаунт? Войти</Link>
        </main>
    )
}

export default RegisterPage
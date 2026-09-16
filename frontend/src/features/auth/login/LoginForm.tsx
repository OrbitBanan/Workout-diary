import { useState } from "react";
import Button from "../../../shared/ui/Button/Button";
import Input from "../../../shared/ui/Input/Input";

type LoginFormData = {
    email: string
    password: string
}

function LoginForm() {
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
                Авторизоваться
            </Button>
        </form>
    )
}

export default LoginForm
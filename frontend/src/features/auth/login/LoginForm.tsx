import { useState } from "react";
import Button from "../../../shared/ui/Button/Button";
import Input from "../../../shared/ui/Input/Input";
import { login } from "./api"; 

type LoginFormData = {
    email: string
    password: string
}

function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault()

        const data: LoginFormData = {
            email,
            password
        }

        setIsLoading(true)

        try {
            const response = await login(data)

            console.log(response)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
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

            <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Авторизация...' : 'Авторизоваться'}
            </Button>
        </form>
    )
}

export default LoginForm
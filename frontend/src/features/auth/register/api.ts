import { apiClient } from "../../../shared/api/client";

type RegisterRequest = {
    email: string
    password: string
}

export function register(data: RegisterRequest) {
    return apiClient('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}
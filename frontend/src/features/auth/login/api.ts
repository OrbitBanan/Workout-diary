import { apiClient } from "../../../shared/api/client";

type LoginRequest = {
    email: string
    password: string
}

export function login(data: LoginRequest) {
    return apiClient('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}
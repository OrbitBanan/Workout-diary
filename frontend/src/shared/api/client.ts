const API_URL = 'http://localhost:3000'

export async function apiClient(
    endpoint: string,
    options?: RequestInit,
) {
    const response = await fetch(`${API_URL}${endpoint}`, options)

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message ?? 'Something went wrong')
    }

    return data
}
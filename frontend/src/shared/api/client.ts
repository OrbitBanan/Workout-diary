const API_URL = 'http://localhost:3000'

export async function apiClient(
    endpoint: string,
    options?: RequestInit,
) {
    const response = await fetch(`${API_URL}${endpoint}`, options)

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
    }

    return response.json()
}
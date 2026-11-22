const API_URL = 'http://localhost:3000'

export async function apiClient<T = unknown>(
    endpoint: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, options)

    const data =
        response.status === 204
        ? null
        : await response.json()

    if (!response.ok) {
        throw new Error(data?.message ?? 'Something went wrong')
    }

    return data as T
}
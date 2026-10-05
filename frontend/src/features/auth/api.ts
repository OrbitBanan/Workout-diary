import { apiClient } from "../../shared/api/client";
import { getAccessToken } from "./authStore";

export function getCurrentUser() {
    const accessToken = getAccessToken()

    return apiClient('/auth/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}
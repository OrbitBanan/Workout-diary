import { removeAccessToken } from "./authStore";

export function logout() {
    removeAccessToken()
}
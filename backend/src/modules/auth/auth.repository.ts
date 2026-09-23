type User = {
    id: string
    email: string
    passwordHash: string
    emailVerified: boolean
}

const users: User[] = []

export function findUserByEmail(email: string) {
    return users.find((user) => user.email === email)
}

export function createUser(user: User) {
    users.push(user)

    return user
}
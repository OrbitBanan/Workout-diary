import bcrypt from 'bcryptjs'
import { createUser, findUserByEmail } from './auth.repository'
import { createAccessToken } from './auth.tokens'

type RegisterData = {
    email: string
    password: string
}

export async function register(data:RegisterData) {
    const existingUser = findUserByEmail(data.email)

    if (existingUser) {
        throw new Error('USER_ALREADY_EXISTS')
    }

    const passwordHash = await bcrypt.hash(data.password, 12)

    const user = createUser({
        id: crypto.randomUUID(),
        email: data.email,
        passwordHash,
        emailVerified: false,
    })

    return {
        id: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
    }
}

export async function login(data: {
    email: string
    password: string
}) {
    const user = findUserByEmail(data.email)

    if (!user) {
        throw new Error('INVALID_CREDENTIALS')
    }

    const passwordMatches = await bcrypt.compare(
        data.password,
        user.passwordHash,
    )

    if (!passwordMatches) {
        throw new Error('INVALID CREDENTIALS')
    }

    const accessToken = createAccessToken(user.id)

    return {
        user: {
            id: user.id,
            email: user.email,
            emailVerified: user.emailVerified,
        },
        accessToken,
    }
}
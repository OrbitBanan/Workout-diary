import jwt from 'jsonwebtoken'
import { 
    ACCESS_TOKEN_EXPIRES_IN,
    JWT_SECRET 
} from '../../config/auth'

type AccessTokenPayload = {
    userId: string
}

export function createAccessToken(userId: string) {
    return jwt.sign(
        {
            userId,
        },
        JWT_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        },
    )
}
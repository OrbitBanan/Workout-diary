import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../../config/auth";

type AccessTokenPayload = {
    userId: string
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authorization = req.headers.authorization

    if(!authorization) {
        res.status(401).json({
            message: 'Authorization required',
        })

        return
    }

    const [type, token] = authorization.split(' ')

    if(type !== 'Bearer' || !token) {
        res.status(401).json({
            message: 'Invalid authorization format'
        })

        return
    }

    try {
        const payload = jwt.verify(
            token,
            JWT_SECRET,
        ) as AccessTokenPayload

        req.userId = payload.userId

        next()
    } catch {
        res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
}
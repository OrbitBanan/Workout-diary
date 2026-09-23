import type { Request, Response } from "express";
import { login, register } from "./auth.service";

export async function loginController(
  req: Request,
  res: Response,
) {
  try {
    const result = await login(req.body)

    res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'INVALID_CREDENTIALS') {
        res.status(401).json({
          message: 'Invalid email or password',
        })

        return
      }
    }

    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

export async function registerController(
  req: Request,
  res: Response,
) {
  try {
    const result = await register(req.body)

    res.status(201).json(result)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'USER_ALREADY_EXISTS') {
        res.status(409).json({
          message: 'User already exists',
        })

        return
      }
    }

    res.status(500).json({
      message: 'Internal server error',
    })
  }
}
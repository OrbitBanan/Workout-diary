import type { Request, Response } from "express";
import { login } from "./auth.service";

export function loginController(
    req: Request,
    res: Response,
) {
    const result = login(req.body)

    res.json(result)
}
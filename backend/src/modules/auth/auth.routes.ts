import { Router } from "express";
import {
    loginController,
    registerController
} from "./auth.controller";
import { authMiddleware } from "./auth.middleware";

const router = Router()

router.post('/login', loginController)
router.post('/register', registerController)

router.get('/me', authMiddleware, (req, res) => {
    res.json({
        message: 'You are authenticated',
    })
})

export default router
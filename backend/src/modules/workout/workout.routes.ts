import { Router } from 'express'
import { authMiddleware } from '../auth/auth.middleware'
import {
    createWorkoutController,
    getWorkoutsController,
    getWorkoutController
} from './workout.controller'

const router = Router()

router.get(
    '/',
    authMiddleware,
    getWorkoutsController
)

router.get(
    '/:date',
    authMiddleware,
    getWorkoutController
)

router.post(
    '/',
    authMiddleware,
    createWorkoutController,
)

export default router
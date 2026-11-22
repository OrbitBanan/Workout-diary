import { Router } from 'express'
import { authMiddleware } from '../auth/auth.middleware'
import {
    createWorkoutController,
    getWorkoutsController,
    getWorkoutController,
    updateWorkoutController,
    deleteWorkoutController,
} from './workout.controller'

const router = Router()

router.get('/', authMiddleware, getWorkoutsController )
router.get('/:date', authMiddleware, getWorkoutController)
router.post('/', authMiddleware, createWorkoutController)
router.patch('/:id', authMiddleware, updateWorkoutController)
router.delete('/:id', authMiddleware, deleteWorkoutController)

export default router
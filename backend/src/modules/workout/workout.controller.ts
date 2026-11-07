import type { Response, Request } from 'express'
import {
    createWorkoutDay,
    getWorkouts,
    getWorkout
} from './workout.service'

export function createWorkoutController(
    req: Request,
    res: Response,
) {
    try {
        if (!req.userId) {
            res.status(401).json({
                message: 'Authorization required',
            })

            return
        }

        const { date, status } = req.body

        const workout = createWorkoutDay({
            userId: req.userId,
            date,
            status
        })

        res.status(201).json(workout)
    } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'WORKOUT_ALREADY_EXISTS') {
                    res.status(409).json({
                        message: 'Тренировка на эту дату уже существует'
                    })

                    return
                }
            }
            
            res.status(500).json({
                message: 'Internal server error',
            })
    }
}

export function getWorkoutsController(
    req: Request,
    res: Response,
) {
    try {
        if (!req.userId) {
            res.status(401).json({
                message: 'Authorization required'
            })

            return
        }

        const from = req.query.from
        const to = req.query.to

        if (typeof from !== 'string' || typeof to !== 'string') {
            res.status(400).json({
                message: 'from and to are required'
            })

            return
        }

        const workouts = getWorkouts({
            userId: req.userId,
            from,
            to
        })

        res.status(200).json(workouts)
    } catch {
        res.status(500).json({
            message: 'Iternal server error'
        })
    }
}

export function getWorkoutController(
    req: Request,
    res: Response
) {
    try {
        if (!req.userId) {
            res.status(401).json({
                message: 'Authorization required',
            })

            return
        }

        const { date } = req.params

        if (typeof date !== 'string') {
            res.status(400).json({
                message: 'Date is required',
            })

            return
        }

        const workout = getWorkout({
            userId: req.userId,
            date,
        })

        if (!workout) {
            res.status(404).json({
                message: 'Workout not found'
            })

            return
        }

        res.status(200).json(workout)
    } catch {
        res.status(500).json({
            message: 'Iternal server error'
        })
    }
}
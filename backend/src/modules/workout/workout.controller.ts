import type { Response, Request } from 'express'
import {
    createWorkoutDay,
    getWorkouts,
    getWorkout,
    updateWorkoutDay,
    deleteWorkoutDay,
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

export function updateWorkoutController(
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

        const { id } = req.params
        const { status } = req.body

        if (typeof id !== 'string') {
            res.status(400).json({
                message: 'Workout ID is required',
            })

            return
        }

        if (status !== 'TRAINING' && status !== 'REST') {
            res.status(400).json({
                message: 'Invalid workout status',
            })

            return
        }

        const workout = updateWorkoutDay({
            userId: req.userId,
            workoutId: id,
            status,
        })

        res.status(200).json(workout)
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === 'WORKOUT_NOT_FOUND'
        ) {
            res.status(404).json({
                message: 'Workout not found',
            })

            return
        }

        res.status(500).json({
            message: 'Internal server error',
        })
    }
}

export function deleteWorkoutController(
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

        const { id } = req.params

        if (typeof id !== 'string') {
            res.status(400).json({
                message: 'Workout ID is required',
            })

            return
        }

        deleteWorkoutDay({
            userId: req.userId,
            workoutId: id,
        })

        res.status(204).send()
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === 'WORKOUT_NOT_FOUND'
        ) {
            res.status(404).json({
                message: 'Workout not found',
            })

            return
        }

        res.status(500).json({
            message: 'Internal server Error',
        })
    }
}
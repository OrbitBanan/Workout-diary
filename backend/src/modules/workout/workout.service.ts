import {
    createWorkout,
    findWorkoutByDate,
    findWorkoutByDateRange
} from './workout.repository'

type createWorkoutData = {
    userId: string
    date: string
    status: 'TRAINING' | 'REST'
}

type GetWorkoutsData = {
    userId: string
    from: string
    to: string
}

type GetWorkoutData = {
    userId: string
    date: string
}

export function createWorkoutDay(data: createWorkoutData) {
    const existingWorkout = findWorkoutByDate(
        data.userId,
        data.date,
    )

    if (existingWorkout) {
        throw new Error('WORKOUT_ALREADY_EXISTS')
    }

    return createWorkout({
        id: crypto.randomUUID(),
        userId: data.userId,
        date: data.date,
        status: data.status,
    })
}

export function getWorkouts(data: GetWorkoutsData) {
    return findWorkoutByDateRange(
        data.userId,
        data.from,
        data.to
    )
}

export function getWorkout(data: GetWorkoutData) {
    return findWorkoutByDate(
        data.userId,
        data.date,
    )
}
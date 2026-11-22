import {
    createWorkout,
    findWorkoutByDate,
    findWorkoutByDateRange,
    updateWorkout,
    deleteWorkout
} from './workout.repository'

type CreateWorkoutData = {
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

type UpdateWorkoutData = {
    userId: string
    workoutId: string
    status: 'TRAINING' | 'REST'
}

type DeleteWorkoutData = {
    userId: string
    workoutId: string
}

export function createWorkoutDay(data: CreateWorkoutData) {
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

export function updateWorkoutDay(data: UpdateWorkoutData) {
    const workout = updateWorkout(
        data.userId,
        data.workoutId,
        data.status,
    )

    if (!workout) {
        throw new Error('WORKOUT_NOT_FOUND')
    }

    return workout
}

export function deleteWorkoutDay(data: DeleteWorkoutData) {
    const isDeleted = deleteWorkout(
        data.userId,
        data.workoutId,
    )

    if (!isDeleted) {
        throw new Error('WORKOUT_NOT_FOUND')
    }

    return true
}
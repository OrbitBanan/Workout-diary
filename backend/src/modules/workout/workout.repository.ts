type WorkoutStatus = 'TRAINING' | 'REST'

export type Workout = {
    id: string
    userId: string
    date: string
    status: WorkoutStatus
}

const workouts: Workout[] = []

export function findWorkoutByDate(
    userId: string,
    date: string,
) {
    return workouts.find(
        (workout) =>
            workout.userId === userId &&
            workout.date === date,
    )
}

export function createWorkout(workout: Workout) {
    workouts.push(workout)

    return workout
}

export function findWorkoutByDateRange(
    userId: string,
    from: string,
    to: string,
) {
    return workouts.filter(
        (workout) =>
            workout.userId === userId &&
        workout.date >= from &&
        workout.date <= to,
    )
}

export function updateWorkout(
    userId: string,
    workoutId: string,
    status: WorkoutStatus,
) {
    const workout = workouts.find(
        (workout) =>
            workout.id === workoutId &&
            workout.userId === userId,
    )

    if (!workout) {
        return undefined
    }

    workout.status = status

    return workout
}

export function deleteWorkout(
    userId: string,
    workoutId: string
) {
    const workoutIndex = workouts.findIndex(
        (workout) =>
            workout.id === workoutId &&
            workout.userId === userId,
    )

    if (workoutIndex === -1) {
        return false
    }

    workouts.splice(workoutIndex, 1)

    return true
}
export type WorkoutStatus = 'TRAINING' | 'REST'

export type ExerciseType = 'REPS' | 'TIME'

export type WorkoutExercise = {
    name: string
    type: ExerciseType
}

export type WorkoutDay = {
    id: string
    date: string
    status: WorkoutStatus
}
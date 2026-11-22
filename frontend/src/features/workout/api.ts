import { apiClient } from '../../shared/api/client'
import { getAccessToken } from '../auth/authStore'
import type { WorkoutDay } from '../../shared/types/workout'

type CreateWorkoutData = {
    date: string
    status: 'TRAINING' | 'REST'
}

type UpdateWorkoutData = {
    status: 'TRAINING' | 'REST'
}

export function createWorkout(data: CreateWorkoutData) {
    const accessToken = getAccessToken()

    return apiClient('/workouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    })
}

export function getWorkouts(
    from: string,
    to: string,
): Promise<WorkoutDay[]> {
    const accessToken = getAccessToken()

    const params = new URLSearchParams({
        from,
        to,
    })

    return apiClient(`/workouts?${params.toString()}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

export function getWorkout(
    date: string
): Promise<WorkoutDay[]> {
    const accessToken = getAccessToken()

    return apiClient(`/workout/${date}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

export function updateWorkout(
    workoutId: string,
    data: UpdateWorkoutData
) {
    const accessToken = getAccessToken()

    return apiClient<WorkoutDay>(`/workouts/${workoutId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    })
}

export function deleteWorkout(workoutId: string) {
    const accessToken = getAccessToken()

    return apiClient<void>(`/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}
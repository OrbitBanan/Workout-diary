import { useState, useEffect } from 'react'
import { createWorkout, getWorkouts } from '../../features/workout/api'
import type { WorkoutDay, WorkoutStatus } from '../../shared/types/workout'

function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function getMonthRange(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()

    return {
        from: formatDate(new Date(year, month, 1)),
        to: formatDate(new Date(year, month + 1, 0)),
    }
}

function CalendarPage() {
    const today = new Date()

    const [currentMonth, setCurrentMonth] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    )

    const [workouts, setWorkouts] = useState<WorkoutDay[]>([])
    const [selectedDate, setSelectedDate] = useState(formatDate(today))
    const [status, setStatus] = useState<WorkoutStatus>('TRAINING')
    
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7

    const calendarCells: (string | null)[] = [
        ...Array(firstWeekday).fill(null),
        ...Array.from(
            { length: daysInMonth },
            (_, index) => formatDate(new Date(year, month, index + 1)),
        ),
    ]

    useEffect(() => {
        async function load() {
            setIsLoading(true)
            setError('')

            try {
                const { from, to } = getMonthRange(currentMonth)
                const data = await getWorkouts(from, to)

                setWorkouts(data)
            } catch {
                setError('Не удалось загрузить записи на этот месяц')
            } finally {
                setIsLoading(false)
            }
        }

        load()
    }, [currentMonth])

    function changeMonth(offset: number) {
        const newMonth = new Date(year, month + offset, 1)

        setCurrentMonth(newMonth)
        setSelectedDate(formatDate(newMonth))
    }

    async function handleCreateWorkout() {
        setError('')
        setIsSaving(true)

        try {
            await createWorkout({
                date: selectedDate,
                status,
            })

            const { from, to } = getMonthRange(currentMonth)
            const data = await getWorkouts(from, to)

            setWorkouts(data)
        } catch(error) {
            setError(
                error instanceof Error
                ? error.message
                : 'Не удалось сохранить запись'
            )
        } finally {
            setIsSaving(false)
        }
    }

    function getWorkoutForDate(date: string) {
        return workouts.find((workout) => workout.date === date)
    }

    const monthTitle = new Intl.DateTimeFormat('ru-RU', {
        month: 'long',
        year: 'numeric'
    }).format(currentMonth)

    return (
        <main className='min-h-screen bg-slate-100 p-4 sm:p-8'>
            <div className='mx-auto max-w-5xl'>
                <h1 className='text-3xl font-bold text-slate-900'>
                    Дневник тренировок
                </h1>

                <p className='mt-2 text-slate-600'>
                    История твоих тренировок и дней отдыха
                </p>

                <section className='mt-8 rounded-xl bg-white p-4 shadow-sm sm:p-6'>
                    <div className='flex items-center justify-between gap-4'>
                        <button
                            type='button'
                            onClick={() => changeMonth(-1)}
                            className='rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100'
                            aria-label='Предыдущий месяц'
                        >
                            ←
                        </button>

                        <h2 className='text-xl font-semibold capitalize text-slate-900'>
                            {monthTitle}
                        </h2>

                        <button
                            type='button'
                            onClick={() => changeMonth(1)}
                            className='rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100'
                            aria-label='Следующий месяц'
                        >
                            →
                        </button>
                    </div>

                    <div className='mt-6 grid grid-cols-7 gap-1 sm:gap-2'>
                        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                            <div
                                key={day}
                                className='py-2 text-center text-xs font-medium text-slate-500 sm:text-sm'
                            >
                                {day}
                            </div>
                        ))}

                        {calendarCells.map((date, index) => {
                            if (!date) {
                                return <div key={`empty-${index}`} />
                            }

                            const workout = getWorkoutForDate(date)
                            const isSelected = selectedDate === date
                            const isToday = formatDate(today) === date

                            let dayStyle = 'bg-slate-50 text-slate-800 hover::bg-slate-100'

                            if (workout?.status === 'TRAINING') {
                                dayStyle = 'bg-blue-100 text-blue-900 hover:bg-blue-200'
                            } else if (workout?.status === 'REST') {
                                dayStyle = 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            }

                            return (
                                <button
                                    key={date}
                                    type='button'
                                    onClick={() => setSelectedDate(date)}
                                    className={`relative flex aspect-square min-h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors sm:text-base
                                        ${dayStyle}
                                        ${isSelected ? 'ring-2 ring-blue-600 ring-offset-2' : ''}
                                        ${isToday ? 'outline outline-blue-400' : ''}
                                        `}
                                >
                                    {Number(date.slice(-2))}
                                </button>
                            )
                        })}
                    </div>

                    <div className='mt-5 flex flex-wrap gap-4 text-xs text-slate-600 sm:text-sm'>
                        <div className='flex items-center gap-2'>
                            <span className='h-3 w-3 rounded bg-blue-100' />
                                Тренировка
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='h-3 w-3 rounded bg-slate-200' />
                                Выходной
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='h-3 w-3 rounded bg-slate-50 outline outline-slate-300' />
                                Нет записи
                        </div>
                    </div>

                    {isLoading && (
                        <p className='mt-4 text-sm text-slate-500'>
                            Загружаем записи...
                        </p>
                    )}

                    {error && !isSaving && (
                        <p className='mt-4 text-sm text-red-600'>{error}</p>
                    )}
                </section>

                <section className='mt-8 max-w-lg rounded-xl bg-white p-6 shadow-sm'>
                    <h2 className='text-xl font-semibold text-slate-900'>
                        Запись на {selectedDate}
                    </h2>

                    {getWorkoutForDate(selectedDate) ? (
                        <p className='mt-3 text-sm text-slate-600'>
                            На эту дату уже добавлена запись.
                        </p>
                    ) : (
                        <>
                            <div className='mt-4'>
                                <label
                                    htmlFor="workout-status"
                                    className='mb-2 block text-sm font-medium text-slate-700'
                                >
                                    Тип дня
                                </label>

                                <select
                                    id="workout-status"
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value as WorkoutStatus)
                                    }
                                    className='w-full rounded-lg border border-slate-300 px-3 py-2'
                                >
                                    <option value="TRAINING">Тренировка</option>
                                    <option value="REST">Выходной</option>
                                </select>
                            </div>

                            <button
                                type='button'
                                onClick={handleCreateWorkout}
                                disabled={isSaving || isLoading}
                                className='mt-5 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50'
                            >
                                {isSaving ? 'Сохранение...' : 'Добавить запись'}
                            </button>
                        </>
                    )}

                    {error && (
                        <p className='mt-3 text-sm text-red-600'>{error}</p>
                    )}
                </section>
            </div>
        </main>
    )
}

export default CalendarPage
import express from 'express'
import cors from 'cors'
import authRouter from './modules/auth/auth.routes'
import workoutRouter from './modules/workout/workout.routes'

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/workouts', workoutRouter)

app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
    })
})

app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
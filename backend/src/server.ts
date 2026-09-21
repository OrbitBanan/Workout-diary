import express from 'express'
import cors from 'cors'

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
    })
})

app.post('/auth/login', (req, res) => {
    console.log(req.body)

    res.json({
        message: 'Login endpoint works'
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
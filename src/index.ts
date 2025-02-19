import express from 'express'
import { PORT } from './config'
//import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json()) // middleware -> transform the req.body to json

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.post('/login', (_req, _res) => {})
app.post('/register', (_req, _res) => {})
app.post('/logout', (_req, _res) => {})

app.post('/protected', (_req, _res) => {})
//app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
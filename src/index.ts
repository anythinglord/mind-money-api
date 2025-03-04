import express from 'express'
import { PORT } from './config'
import { UserRepository } from './user.repository'
//import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json()) // middleware -> transform the req.body to json

app.get('/ping', (_req, res) => {
  res.send('pong')
})

app.post('/login', (_req, _res) => {})

app.post('/register', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  try {
    const id = UserRepository.create({ username, password })
    res.send({ id })
  } catch(error: any) {
    res.status(400).send(error.message)
  }
})

app.post('/logout', (_req, _res) => {})

app.post('/protected', (_req, _res) => {})
//app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
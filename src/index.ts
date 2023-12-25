import bodyParser from 'body-parser'
import cors from 'cors'
import express, { type Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'

const app: Application = express()
const port: number = 4000

// Parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
})

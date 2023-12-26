import mongoose from 'mongoose'
import { logger } from './logger'
import config from '../config/environment'

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Failed to connect to MongoDB')
    logger.error(error)
    process.exit(1)
  })

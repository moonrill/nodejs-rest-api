import mongoose from 'mongoose'
import { logger } from './logger'

mongoose
  .connect(
    'mongodb://amoorill:1Th1Fc471QJrtjPN@ac-rfqege8-shard-00-00.ggpgkqv.mongodb.net:27017,ac-rfqege8-shard-00-01.ggpgkqv.mongodb.net:27017,ac-rfqege8-shard-00-02.ggpgkqv.mongodb.net:27017/web?ssl=true&replicaSet=atlas-2n3811-shard-0&authSource=admin&retryWrites=true&w=majority'
  )
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Failed to connect to MongoDB')
    logger.error(error)
    process.exit(1)
  })

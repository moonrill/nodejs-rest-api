import productModel from '../models/product.model'
import { logger } from '../utils/logger'

export const getProductFromDb = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.warn('Cannot get data from DB')
      logger.error(error)
    })
}

import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validations/product.validation'

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error(error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.message, data: {} })
  }

  logger.info('Success add new product data')
  return res.status(200).send({ status: true, statusCode: 200, message: 'Add product success', data: value })
}

export const getProduct = (req: Request, res: Response) => {
  const products = [
    { name: 'Smart Band X9', price: 350000 },
    { name: 'Samsung Galaxy S23', price: 10000000 }
  ]

  const {
    params: { name }
  } = req

  if (name) {
    // Create a regular expression to match the query name
    const regex = new RegExp(name, 'i')
    // Filter products based on the regular expression match
    const filteredProducts = products.filter((product) => regex.test(product.name))

    // Check if the filtered products array is empty
    if (filteredProducts.length === 0) {
      logger.error('Product not found')
      return res.status(404).send({ status: false, statusCode: 404, message: 'Product not found', data: {} })
    }

    // Check if the filtered products array has only one element
    if (filteredProducts.length === 1) {
      logger.info('Success get product data')
      return res.status(200).send({ status: true, statusCode: 200, data: filteredProducts[0] })
    }

    logger.info('Success get product data')
    return res.status(200).send({ status: true, statusCode: 200, data: filteredProducts })
  }

  logger.info('Success get product data')
  return res.status(200).send({ status: true, statusCode: 200, data: products })
}

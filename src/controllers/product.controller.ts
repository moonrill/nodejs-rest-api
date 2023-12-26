import { type NextFunction, type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import {
  addProductToDB,
  deleteProductById,
  getProductById,
  getProductByName,
  getProductFromDb,
  updateProductById
} from './../services/product.service'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error(error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  try {
    await addProductToDB(value)
    logger.info('Success add new product data')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Add product success' })
  } catch (err) {
    logger.error(err)
    return res.status(422).send({ status: false, statusCode: 422, message: err })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const { id, name } = req.params

  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('Success get product data')
      return res.status(200).send({ status: true, statusCode: 200, data: product })
    }

    return res.status(404).send({ status: false, statusCode: 404, message: 'Product not found' })
  }

  if (name) {
    const products: any = await getProductByName(name)
    if (products) {
      logger.info('Success get product data')
      return res.status(200).send({ status: true, statusCode: 200, data: products })
    }
    return res.status(404).send({ status: false, statusCode: 404, message: `Product with name: ${name} is not found` })
  }

  const products: any = await getProductFromDb()
  logger.info('Success get product data')
  return res.status(200).send({ status: true, statusCode: 200, data: products })
}

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  const { error, value } = updateProductValidation(req.body)

  if (error) {
    logger.error(error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    const result = await updateProductById(id, value)
    if (result) {
      logger.info('Success update product data')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Update product success' })
    }
    return res.status(404).send({ status: false, statusCode: 404, message: `Product with id: ${id} is not found` })
  } catch (err) {
    logger.error(err)
    return res.status(422).send({ status: false, statusCode: 422, message: err })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const result = await deleteProductById(id)
    if (result) {
      logger.info('Success delete product data')
      return res.status(200).send({ status: true, statusCode: 200, message: 'Delete product success' })
    }
    return res.status(404).send({ status: false, statusCode: 404, message: `Product with id: ${id} is not found` })
  } catch (err) {
    logger.error(err)
    return res.status(422).send({ status: false, statusCode: 422, message: err })
  }
}

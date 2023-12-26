import productModel from '../models/product.model'
import type ProductType from '../types/product.type'
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

export const getProductById = async (id: string) => {
  return await productModel.findOne({ product_id: id })
}

export const getProductByName = async (name: string) => {
  const products: any = await productModel.find()
  // Create a regular expression to match the query name
  const regex = new RegExp(name, 'i')
  // Filter products based on the regular expression match
  const filteredProducts = products.filter((product: ProductType) => regex.test(product.name))

  if (filteredProducts.length === 1) {
    return filteredProducts[0]
  }

  return filteredProducts
}

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload)
}

export const updateProductById = async (id: string, payload: ProductType) => {
  return await productModel.findOneAndUpdate({ product_id: id }, { $set: payload })
}

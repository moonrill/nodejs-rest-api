import Joi from 'joi'
import type ProductType from '../types/product.type'

/**
 * Validates the given payload for creating a product.
 *
 * @param {ProductType} payload - The payload containing the product data.
 * @return {*} - The result of the validation.
 */
export const createProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    product_id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().allow('', null),
    color: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

export const updateProductValidation = (payload: ProductType) => {
  const schema = Joi.object({
    name: Joi.string().allow('', null),
    price: Joi.number().allow('', null),
    color: Joi.string().allow('', null)
  })

  return schema.validate(payload)
}

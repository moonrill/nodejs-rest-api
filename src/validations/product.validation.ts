import Joi from 'joi'

interface ProductInterface {
  name: string
  price: number
}

/**
 * Validates the given payload for creating a product.
 *
 * @param {ProductInterface} payload - The payload containing the product data.
 * @return {*} - The result of the validation.
 */
export const createProductValidation = (payload: ProductInterface) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().allow('', null)
  })

  return schema.validate(payload)
}

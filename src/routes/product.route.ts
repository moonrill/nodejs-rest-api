import { Router } from 'express'
import { createProduct, deleteProduct, updateProduct } from '../controllers/product.controller'
import { getProduct } from './../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.get('/:id?/:name', getProduct)
ProductRouter.post('/', createProduct)
ProductRouter.put('/:id', updateProduct)
ProductRouter.delete('/:id', deleteProduct)

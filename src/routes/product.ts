import { Router, type NextFunction, type Request, type Response } from 'express'

export const ProductRouter: Router = Router()

// http://localhost:4000/product
ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'Sepatu Sport', price: 500000 }] })
  next()
})

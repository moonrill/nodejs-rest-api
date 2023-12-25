import { Router, type NextFunction, type Request, type Response } from 'express'

export const HealthRouter: Router = Router()

// http://localhost:4000/health
HealthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: '200' })
  next()
})

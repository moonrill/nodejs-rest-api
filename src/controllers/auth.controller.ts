import { createUser } from './../services/auth.service'
import { hashing } from '../utils/hashing'
import { logger } from './../utils/logger'
import { createUserValidation } from './../validations/auth.validation'
import { type Request, type Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

export const register = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  const { error, value } = createUserValidation(req.body)

  if (error) {
    logger.error(error.message)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }

  try {
    value.password = `${hashing(value.password)}`

    await createUser(value)

    return res.status(201).send({ status: true, statusCode: 201, message: 'Register success' })
  } catch (err) {
    logger.error(err)
    return res.status(422).send({ status: false, statusCode: 422, message: err })
  }
}

export const login = async (req: Request, res: Response) => {}

import { login, register } from './../controllers/auth.controller'
import { Router } from 'express'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', register)
AuthRouter.post('/login', login)

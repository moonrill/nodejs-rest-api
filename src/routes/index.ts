import { type Application, type Router } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './product.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter]
]

/**
 * Initializes the routes for the application.
 *
 * @param {Application} app - The Express application instance.
 * @return {void} - This function does not return any value.
 */
export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

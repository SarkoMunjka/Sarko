import type { Connect } from 'vite'
import { handleBarberApi } from './barber/handlers'

export function barberApiMiddleware(): Connect.NextHandleFunction {
  return (req, res, next) => {
    const url = req.url?.split('?')[0] || ''
    if (!url.startsWith('/api/barber')) return next()

    handleBarberApi(req, res, url).then((handled) => {
      if (!handled) next()
    })
  }
}

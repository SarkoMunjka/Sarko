import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleBarberApi } from '../../server/barber/handlers'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const segments = req.query.path
  const joined = Array.isArray(segments) ? segments.join('/') : segments || ''
  const pathname = joined ? `/api/barber/${joined}` : '/api/barber'
  await handleBarberApi(req, res, pathname)
}

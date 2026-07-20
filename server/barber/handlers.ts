import type { IncomingMessage, ServerResponse } from 'node:http'
import { getAvailability, isSlotAvailable } from './slots'
import {
  createId,
  createSessionToken,
  readStore,
  registerSession,
  revokeSession,
  validateSession,
  writeStore,
} from './store'
import type { BarberBooking, BarberSettings } from './types'

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(Buffer.from(chunk))
  if (!chunks.length) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf-8'))
  } catch {
    return null
  }
}

function getAuthToken(req: IncomingMessage): string | undefined {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return undefined
  return header.slice(7)
}

function publicSettings(settings: BarberSettings) {
  return {
    acceptBookings: settings.acceptBookings,
    services: settings.services,
    slotIntervalMinutes: settings.slotIntervalMinutes,
  }
}

export async function handleBarberApi(
  req: IncomingMessage,
  res: ServerResponse,
  pathname: string,
): Promise<boolean> {
  if (!pathname.startsWith('/api/barber')) return false

  const url = new URL(req.url || '/', 'http://localhost')
  const route = pathname.replace(/^\/api\/barber/, '') || '/'

  if (req.method === 'GET' && route === '/settings') {
    const store = await readStore()
    sendJson(res, 200, publicSettings(store.settings))
    return true
  }

  if (req.method === 'GET' && route === '/availability') {
    const date = url.searchParams.get('date')
    const serviceId = url.searchParams.get('serviceId')
    if (!date || !serviceId) {
      sendJson(res, 400, { error: 'Nedostaju datum ili usluga.' })
      return true
    }

    const store = await readStore()
    const slots = getAvailability(store.settings, store.bookings, date, serviceId)
    sendJson(res, 200, { date, serviceId, slots })
    return true
  }

  if (req.method === 'POST' && route === '/bookings') {
    const body = (await readBody(req)) as Record<string, string> | null
    if (!body) {
      sendJson(res, 400, { error: 'Neispravan JSON.' })
      return true
    }

    const { serviceId, date, time, name, phone } = body
    if (!serviceId || !date || !time || !name?.trim() || !phone?.trim()) {
      sendJson(res, 400, { error: 'Popunite sva polja.' })
      return true
    }

    const store = await readStore()
    if (!store.settings.acceptBookings) {
      sendJson(res, 403, { error: 'Online rezervacije su trenutno isključene.' })
      return true
    }

    const service = store.settings.services.find((s) => s.id === serviceId)
    if (!service) {
      sendJson(res, 400, { error: 'Nepoznata usluga.' })
      return true
    }

    if (!isSlotAvailable(store.settings, store.bookings, date, serviceId, time)) {
      sendJson(res, 409, { error: 'Termin više nije dostupan. Izaberite drugi.' })
      return true
    }

    const booking: BarberBooking = {
      id: createId(),
      serviceId,
      date,
      startTime: time,
      durationMinutes: service.durationMinutes,
      name: name.trim(),
      phone: phone.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }

    store.bookings.push(booking)
    await writeStore(store)
    sendJson(res, 201, { booking })
    return true
  }

  if (req.method === 'POST' && route === '/login') {
    const body = (await readBody(req)) as { password?: string } | null
    const store = await readStore()
    const expected = process.env.BARBER_ADMIN_PASSWORD || store.adminPassword
    if (!body?.password || body.password !== expected) {
      sendJson(res, 401, { error: 'Pogrešna lozinka.' })
      return true
    }
    const token = createSessionToken()
    await registerSession(token)
    sendJson(res, 200, { token })
    return true
  }

  const token = getAuthToken(req)

  if (req.method === 'POST' && route === '/logout') {
    if (token) await revokeSession(token)
    sendJson(res, 200, { ok: true })
    return true
  }

  const authed = await validateSession(token)
  if (!authed) {
    sendJson(res, 401, { error: 'Potrebna je admin prijava.' })
    return true
  }

  if (req.method === 'GET' && route === '/admin/settings') {
    const store = await readStore()
    sendJson(res, 200, { settings: store.settings })
    return true
  }

  if (req.method === 'PUT' && route === '/admin/settings') {
    const body = (await readBody(req)) as { settings?: BarberSettings } | null
    if (!body?.settings) {
      sendJson(res, 400, { error: 'Neispravna podešavanja.' })
      return true
    }

    const store = await readStore()
    store.settings = body.settings
    await writeStore(store)
    sendJson(res, 200, { settings: store.settings })
    return true
  }

  if (req.method === 'GET' && route === '/admin/bookings') {
    const store = await readStore()
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    let bookings = [...store.bookings].sort((a, b) =>
      `${b.date}T${b.startTime}`.localeCompare(`${a.date}T${a.startTime}`),
    )
    if (from) bookings = bookings.filter((b) => b.date >= from)
    if (to) bookings = bookings.filter((b) => b.date <= to)
    sendJson(res, 200, { bookings })
    return true
  }

  const cancelMatch = route.match(/^\/admin\/bookings\/([^/]+)\/cancel$/)
  if (req.method === 'POST' && cancelMatch) {
    const store = await readStore()
    const booking = store.bookings.find((b) => b.id === cancelMatch[1])
    if (!booking) {
      sendJson(res, 404, { error: 'Rezervacija nije pronađena.' })
      return true
    }
    booking.status = 'cancelled'
    await writeStore(store)
    sendJson(res, 200, { booking })
    return true
  }

  sendJson(res, 404, { error: 'Ruta nije pronađena.' })
  return true
}

import type { BarberBooking, BarberSettings, DayKey, SlotOption } from './types'

const DAY_KEYS: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export function dayKeyFromDate(date: string): DayKey {
  const d = new Date(`${date}T12:00:00`)
  return DAY_KEYS[d.getDay()]
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function rangesOverlap(
  aStart: number,
  aDuration: number,
  bStart: number,
  bDuration: number,
): boolean {
  return aStart < bStart + bDuration && bStart < aStart + aDuration
}

export function getAvailability(
  settings: BarberSettings,
  bookings: BarberBooking[],
  date: string,
  serviceId: string,
): SlotOption[] {
  if (!settings.acceptBookings || settings.blockedDates.includes(date)) {
    return []
  }

  const service = settings.services.find((s) => s.id === serviceId)
  if (!service) return []

  const daySchedule = settings.schedule[dayKeyFromDate(date)]
  if (!daySchedule?.enabled) return []

  const open = timeToMinutes(daySchedule.open)
  const close = timeToMinutes(daySchedule.close)
  const interval = settings.slotIntervalMinutes
  const duration = service.durationMinutes

  const activeBookings = bookings.filter(
    (b) => b.date === date && b.status === 'confirmed',
  )

  const slots: SlotOption[] = []
  const now = new Date()
  const isToday = date === now.toISOString().slice(0, 10)
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  for (let start = open; start + duration <= close; start += interval) {
    if (isToday && start <= nowMinutes) {
      slots.push({ time: minutesToTime(start), available: false })
      continue
    }

    const taken = activeBookings.some((booking) =>
      rangesOverlap(
        start,
        duration,
        timeToMinutes(booking.startTime),
        booking.durationMinutes,
      ),
    )

    slots.push({ time: minutesToTime(start), available: !taken })
  }

  return slots
}

export function isSlotAvailable(
  settings: BarberSettings,
  bookings: BarberBooking[],
  date: string,
  serviceId: string,
  startTime: string,
): boolean {
  const slots = getAvailability(settings, bookings, date, serviceId)
  const slot = slots.find((s) => s.time === startTime)
  return Boolean(slot?.available)
}

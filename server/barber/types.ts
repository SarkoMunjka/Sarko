export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface DaySchedule {
  enabled: boolean
  open: string
  close: string
}

export interface BarberService {
  id: string
  name: string
  durationMinutes: number
  priceRsd: number
}

export interface BarberBooking {
  id: string
  serviceId: string
  date: string
  startTime: string
  durationMinutes: number
  name: string
  phone: string
  status: 'confirmed' | 'cancelled'
  createdAt: string
}

export interface BarberSettings {
  slotIntervalMinutes: number
  acceptBookings: boolean
  schedule: Record<DayKey, DaySchedule>
  services: BarberService[]
  blockedDates: string[]
}

export interface BarberStore {
  settings: BarberSettings
  bookings: BarberBooking[]
  adminPassword: string
  sessions: Record<string, number>
}

export interface SlotOption {
  time: string
  available: boolean
}

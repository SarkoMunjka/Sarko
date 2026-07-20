import fs from 'node:fs/promises'
import path from 'node:path'
import type { BarberStore } from './types'

const STORE_PATH = path.join(process.cwd(), 'data/lukic-barber-store.json')

let memoryStore: BarberStore | null = null

async function loadFromDisk(): Promise<BarberStore> {
  const raw = await fs.readFile(STORE_PATH, 'utf-8')
  return JSON.parse(raw) as BarberStore
}

export async function readStore(): Promise<BarberStore> {
  if (memoryStore) return structuredClone(memoryStore)
  try {
    memoryStore = await loadFromDisk()
  } catch {
    memoryStore = {
      settings: {
        slotIntervalMinutes: 30,
        acceptBookings: true,
        schedule: {
          mon: { enabled: true, open: '09:00', close: '20:00' },
          tue: { enabled: true, open: '09:00', close: '20:00' },
          wed: { enabled: true, open: '09:00', close: '20:00' },
          thu: { enabled: true, open: '09:00', close: '20:00' },
          fri: { enabled: true, open: '09:00', close: '21:00' },
          sat: { enabled: true, open: '10:00', close: '18:00' },
          sun: { enabled: false, open: '10:00', close: '16:00' },
        },
        services: [],
        blockedDates: [],
      },
      bookings: [],
      adminPassword: process.env.BARBER_ADMIN_PASSWORD || 'lukic2026',
      sessions: {},
    }
  }
  return structuredClone(memoryStore)
}

export async function writeStore(store: BarberStore): Promise<void> {
  memoryStore = structuredClone(store)
  try {
    await fs.writeFile(STORE_PATH, `${JSON.stringify(store, null, 2)}\n`, 'utf-8')
  } catch {
    // Read-only filesystem (e.g. some serverless hosts) — memory cache still works per instance.
  }
}

export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

export function createSessionToken(): string {
  return createId() + createId()
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 12

export async function validateSession(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const store = await readStore()
  const expiry = store.sessions[token]
  if (!expiry || expiry < Date.now()) return false
  return true
}

export async function registerSession(token: string): Promise<void> {
  const store = await readStore()
  store.sessions[token] = Date.now() + SESSION_TTL_MS
  await writeStore(store)
}

export async function revokeSession(token: string): Promise<void> {
  const store = await readStore()
  delete store.sessions[token]
  await writeStore(store)
}

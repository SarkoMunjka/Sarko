const DEMO_BOOKINGS_KEY = 'lukic_barber_demo_bookings'
const DEMO_SETTINGS_KEY = 'lukic_barber_demo_settings'
const DEMO_ADMIN_KEY = 'lukic_barber_demo_admin'
const ADMIN_PASSWORD = 'lukic2026'

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const DEFAULT_SETTINGS = {
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
  services: [
    { id: 'sisanje', name: 'Klasično šišanje', durationMinutes: 30, priceRsd: 2500 },
    { id: 'brada', name: 'Sređivanje brade', durationMinutes: 30, priceRsd: 2200 },
    { id: 'sisanje-brada', name: 'Šišanje + brada', durationMinutes: 45, priceRsd: 3500 },
    { id: 'komplet', name: 'Kompletan paket', durationMinutes: 60, priceRsd: 5000 },
    { id: 'stil', name: 'Stilizovanje kose', durationMinutes: 20, priceRsd: 1500 },
    { id: 'peskiri', name: 'Brijanje sa vrućim peškirom', durationMinutes: 45, priceRsd: 3200 },
  ],
  blockedDates: [],
  blockedSlots: {},
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getDemoSettings() {
  const stored = readJson(DEMO_SETTINGS_KEY, null)
  if (!stored) return structuredClone(DEFAULT_SETTINGS)
  return {
    ...structuredClone(DEFAULT_SETTINGS),
    ...stored,
    schedule: { ...DEFAULT_SETTINGS.schedule, ...stored.schedule },
    blockedSlots: stored.blockedSlots || {},
    blockedDates: stored.blockedDates || [],
  }
}

export function saveDemoSettings(settings) {
  writeJson(DEMO_SETTINGS_KEY, settings)
}

function readDemoBookings() {
  return readJson(DEMO_BOOKINGS_KEY, [])
}

function writeDemoBookings(bookings) {
  writeJson(DEMO_BOOKINGS_KEY, bookings)
}

export function getAdminToken() {
  return sessionStorage.getItem(DEMO_ADMIN_KEY) || ''
}

export function setAdminToken(token) {
  if (token) sessionStorage.setItem(DEMO_ADMIN_KEY, token)
  else sessionStorage.removeItem(DEMO_ADMIN_KEY)
}

function dayKeyFromDate(date) {
  return DAY_KEYS[new Date(`${date}T12:00:00`).getDay()]
}

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function rangesOverlap(aStart, aDuration, bStart, bDuration) {
  return aStart < bStart + bDuration && bStart < aStart + aDuration
}

/** Deterministic demo slots that look "already booked" for realism */
function getSeedTakenSlots(date, serviceId) {
  const seed = date.split('-').reduce((acc, part) => acc + Number(part), 0)
  const service = getDemoSettings().services.find((s) => s.id === serviceId)
  if (!service) return []
  const daySchedule = getDemoSettings().schedule[dayKeyFromDate(date)]
  if (!daySchedule?.enabled) return []

  const open = timeToMinutes(daySchedule.open)
  const close = timeToMinutes(daySchedule.close)
  const interval = getDemoSettings().slotIntervalMinutes
  const all = []
  for (let start = open; start + service.durationMinutes <= close; start += interval) {
    all.push(minutesToTime(start))
  }
  if (!all.length) return []

  const picks = []
  let idx = (seed + serviceId.length * 7) % all.length
  picks.push(all[idx])
  idx = (idx + 3 + (seed % 2)) % all.length
  if (all[idx] !== picks[0]) picks.push(all[idx])
  return picks
}

export function getAvailability(date, serviceId) {
  const settings = getDemoSettings()
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

  const activeBookings = readDemoBookings().filter(
    (b) => b.date === date && (b.status === 'confirmed' || b.status === 'pending'),
  )
  const adminBlocked = new Set(settings.blockedSlots?.[date] || [])
  const seedTaken = new Set(getSeedTakenSlots(date, serviceId))

  const slots = []
  const now = new Date()
  const isToday = date === now.toISOString().slice(0, 10)
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  for (let start = open; start + duration <= close; start += interval) {
    const time = minutesToTime(start)
    if (isToday && start <= nowMinutes) {
      slots.push({ time, available: false })
      continue
    }

    const takenByBooking = activeBookings.some((booking) =>
      rangesOverlap(start, duration, timeToMinutes(booking.startTime), booking.durationMinutes),
    )
    const taken = takenByBooking || adminBlocked.has(time) || seedTaken.has(time)
    slots.push({ time, available: !taken })
  }

  return slots
}

export function createDemoBooking(payload) {
  const settings = getDemoSettings()
  if (!settings.acceptBookings) {
    throw new Error('Online rezervacije su trenutno isključene.')
  }

  const service = settings.services.find((s) => s.id === payload.serviceId)
  if (!service) throw new Error('Nepoznata usluga.')

  const slots = getAvailability(payload.date, payload.serviceId)
  const slot = slots.find((s) => s.time === payload.time)
  if (!slot?.available) {
    throw new Error('Termin više nije dostupan. Izaberite drugi.')
  }

  const booking = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    serviceId: payload.serviceId,
    date: payload.date,
    startTime: payload.time,
    durationMinutes: service.durationMinutes,
    name: payload.name,
    email: payload.email || '',
    phone: payload.phone,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  const list = readDemoBookings()
  list.push(booking)
  writeDemoBookings(list)
  return booking
}

export function getDemoBookings(from, to) {
  let list = readDemoBookings()
  if (from) list = list.filter((b) => b.date >= from)
  if (to) list = list.filter((b) => b.date <= to)
  return list.sort((a, b) => `${b.date}${b.startTime}`.localeCompare(`${a.date}${a.startTime}`))
}

export function cancelDemoBooking(id) {
  const list = readDemoBookings()
  const booking = list.find((b) => b.id === id)
  if (booking) booking.status = 'cancelled'
  writeDemoBookings(list)
}

export function confirmDemoBooking(id) {
  const list = readDemoBookings()
  const booking = list.find((b) => b.id === id)
  if (booking && booking.status === 'pending') booking.status = 'confirmed'
  writeDemoBookings(list)
}

export function deleteDemoBooking(id) {
  writeDemoBookings(readDemoBookings().filter((b) => b.id !== id))
}

export function getAdminSlotGrid(date) {
  const settings = getDemoSettings()
  if (settings.blockedDates.includes(date)) return []

  const daySchedule = settings.schedule[dayKeyFromDate(date)]
  if (!daySchedule?.enabled) return []

  const interval = settings.slotIntervalMinutes
  const open = timeToMinutes(daySchedule.open)
  const close = timeToMinutes(daySchedule.close)
  const blocked = new Set(settings.blockedSlots?.[date] || [])
  const bookings = readDemoBookings().filter(
    (b) => b.date === date && (b.status === 'pending' || b.status === 'confirmed'),
  )

  const slots = []
  for (let start = open; start + interval <= close; start += interval) {
    const time = minutesToTime(start)
    const booked = bookings.some((b) =>
      rangesOverlap(start, interval, timeToMinutes(b.startTime), b.durationMinutes),
    )
    let status = 'open'
    if (booked) status = 'booked'
    else if (blocked.has(time)) status = 'blocked'
    slots.push({ time, status })
  }
  return slots
}

export function toggleAdminSlot(date, time) {
  const settings = getDemoSettings()
  const grid = getAdminSlotGrid(date)
  const slot = grid.find((s) => s.time === time)
  if (!slot || slot.status === 'booked') return settings

  if (!settings.blockedSlots) settings.blockedSlots = {}
  const list = settings.blockedSlots[date] || []

  if (slot.status === 'blocked') {
    settings.blockedSlots[date] = list.filter((t) => t !== time)
    if (!settings.blockedSlots[date].length) delete settings.blockedSlots[date]
  } else {
    settings.blockedSlots[date] = [...list, time]
  }

  saveDemoSettings(settings)
  return getDemoSettings()
}

export function toggleBlockedDate(date) {
  const settings = getDemoSettings()
  const idx = settings.blockedDates.indexOf(date)
  if (idx >= 0) settings.blockedDates.splice(idx, 1)
  else settings.blockedDates.push(date)
  saveDemoSettings(settings)
  return getDemoSettings()
}

export const barberApi = {
  getSettings: async () => {
    const s = getDemoSettings()
    return {
      acceptBookings: s.acceptBookings,
      services: s.services,
      slotIntervalMinutes: s.slotIntervalMinutes,
    }
  },
  getAvailability: async (date, serviceId) => ({
    date,
    serviceId,
    slots: getAvailability(date, serviceId),
  }),
  createBooking: async (payload) => ({ booking: createDemoBooking(payload) }),
  login: async ({ password }) => {
    if (password !== ADMIN_PASSWORD) throw new Error('Pogrešna lozinka.')
    const token = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`
    setAdminToken(token)
    return { token }
  },
  logout: async () => {
    setAdminToken('')
    return { ok: true }
  },
  getAdminSettings: async () => {
    if (!getAdminToken()) throw new Error('Niste prijavljeni.')
    return { settings: getDemoSettings() }
  },
  saveAdminSettings: async ({ settings }) => {
    if (!getAdminToken()) throw new Error('Niste prijavljeni.')
    saveDemoSettings(settings)
    return { settings: getDemoSettings() }
  },
  getBookings: async (from, to) => {
    if (!getAdminToken()) throw new Error('Niste prijavljeni.')
    return { bookings: getDemoBookings(from, to) }
  },
  cancelBooking: async (id) => {
    if (!getAdminToken()) throw new Error('Niste prijavljeni.')
    cancelDemoBooking(id)
    return { ok: true }
  },
  confirmBooking: async (id) => {
    if (!getAdminToken()) throw new Error('Niste prijavljeni.')
    confirmDemoBooking(id)
    return { ok: true }
  },
  deleteBooking: async (id) => {
    if (!getAdminToken()) throw new Error('Niste prijavljeni.')
    deleteDemoBooking(id)
    return { ok: true }
  },
  toggleSlot: async (date, time) => {
    if (!getAdminToken()) throw new Error('Niste prijavljeni.')
    return { settings: toggleAdminSlot(date, time) }
  },
  toggleDateBlock: async (date) => {
    if (!getAdminToken()) throw new Error('Niste prijavljeni.')
    return { settings: toggleBlockedDate(date) }
  },
}

export function initFocusReveal(selector = '.focus-in') {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const nodes = document.querySelectorAll(selector)
  if (reduce) {
    nodes.forEach((el) => el.classList.add('is-visible'))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )
  nodes.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 55, 320)}ms`
    io.observe(el)
  })
}

export function revealElement(el) {
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.hidden = false
  el.classList.add('focus-in')
  if (reduce) {
    el.classList.add('is-visible')
    return
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('is-visible'))
  })
}

export function minBookableDate() {
  return new Date().toISOString().slice(0, 10)
}

export function formatDateSr(dateStr) {
  try {
    return new Intl.DateTimeFormat('sr-RS', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
    }).format(new Date(`${dateStr}T12:00:00`))
  } catch {
    return dateStr
  }
}

const MONTH_LABELS = ['JAN', 'FEB', 'MAR', 'APR', 'MAJ', 'JUN', 'JUL', 'AVG', 'SEP', 'OKT', 'NOV', 'DEC']
const WEEKDAY_LABELS = ['NE', 'PO', 'UT', 'SR', 'ČE', 'PE', 'SU']

function dateToIso(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function isDateBookable(iso) {
  const settings = getDemoSettings()
  if (settings.blockedDates.includes(iso)) return false
  const daySchedule = settings.schedule[dayKeyFromDate(iso)]
  if (!daySchedule?.enabled) return false
  const today = minBookableDate()
  return iso >= today
}

function renderServiceGrid(host, services, selectedId, onSelect) {
  host.innerHTML = services
    .map(
      (s) =>
        `<button type="button" class="book-service-btn${s.id === selectedId ? ' is-selected' : ''}" data-service-id="${s.id}">${s.name}</button>`,
    )
    .join('')

  host.querySelectorAll('.book-service-btn').forEach((btn) => {
    btn.addEventListener('click', () => onSelect(btn.dataset.serviceId))
  })
}

function renderCalendar(host, viewYear, viewMonth, selectedDate, onSelectDate, onMonthChange, options = {}) {
  const { adminMode = false, blockedDates = [] } = options
  const settings = getDemoSettings()
  const blockedSet = new Set(blockedDates.length ? blockedDates : settings.blockedDates || [])
  const first = new Date(viewYear, viewMonth, 1)
  const startOffset = first.getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const today = minBookableDate()

  let daysHtml = ''
  for (let i = 0; i < startOffset; i++) {
    daysHtml += '<span class="book-cal__day is-empty" aria-hidden="true"></span>'
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = dateToIso(viewYear, viewMonth, d)
    const daySchedule = settings.schedule[dayKeyFromDate(iso)]
    const isBlockedDay = blockedSet.has(iso)
    const bookable = adminMode
      ? daySchedule?.enabled && iso >= today
      : isDateBookable(iso)
    const isSelected = iso === selectedDate
    const cls = [
      'book-cal__day',
      isSelected ? 'is-selected' : '',
      isBlockedDay ? 'is-blocked-day' : '',
      !bookable && !adminMode ? 'is-disabled' : '',
      adminMode && !daySchedule?.enabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
    const disabled = adminMode ? !daySchedule?.enabled || iso < today : !bookable
    daysHtml += `<button type="button" class="${cls}" data-date="${iso}" ${disabled ? 'disabled' : ''}>${d}</button>`
  }

  host.innerHTML = `
    <div class="book-cal__head">
      <button type="button" class="book-cal__nav" data-cal-prev aria-label="Prethodni mesec">‹</button>
      <span class="book-cal__month">${MONTH_LABELS[viewMonth]} ${viewYear}</span>
      <button type="button" class="book-cal__nav" data-cal-next aria-label="Sledeći mesec">›</button>
    </div>
    <div class="book-cal__weekdays">
      ${WEEKDAY_LABELS.map((d) => `<span class="book-cal__weekday">${d}</span>`).join('')}
    </div>
    <div class="book-cal__days">${daysHtml}</div>`

  host.querySelector('[data-cal-prev]').addEventListener('click', () => {
    const d = new Date(viewYear, viewMonth - 1, 1)
    onMonthChange(d.getFullYear(), d.getMonth())
  })
  host.querySelector('[data-cal-next]').addEventListener('click', () => {
    const d = new Date(viewYear, viewMonth + 1, 1)
    onMonthChange(d.getFullYear(), d.getMonth())
  })

  host.querySelectorAll('.book-cal__day:not(.is-empty):not(:disabled)').forEach((btn) => {
    btn.addEventListener('click', () => onSelectDate(btn.dataset.date))
  })
}

export function mountAdminAvailability(root, callbacks = {}) {
  const calendarHost = root.querySelector('[data-admin-cal]')
  const slotsHost = root.querySelector('[data-admin-slots]')
  const dateLabel = root.querySelector('[data-admin-date-label]')
  const blockDayBtn = root.querySelector('[data-block-day]')

  const state = {
    date: minBookableDate(),
    viewYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth(),
  }

  function paintCalendar() {
    const settings = getDemoSettings()
    renderCalendar(
      calendarHost,
      state.viewYear,
      state.viewMonth,
      state.date,
      (iso) => {
        state.date = iso
        paintCalendar()
        paintSlots()
        callbacks.onChange?.(state.date)
      },
      (y, m) => {
        state.viewYear = y
        state.viewMonth = m
        paintCalendar()
      },
      { adminMode: true, blockedDates: settings.blockedDates },
    )

    if (dateLabel) dateLabel.textContent = formatDateSr(state.date)
    if (blockDayBtn) {
      const blocked = settings.blockedDates.includes(state.date)
      blockDayBtn.textContent = blocked ? 'Otključaj dan' : 'Blokiraj ceo dan'
      blockDayBtn.classList.toggle('is-danger', !blocked)
    }
  }

  function paintSlots() {
    const slots = getAdminSlotGrid(state.date)
    if (!slots.length) {
      slotsHost.innerHTML = '<p class="admin-hint">Dan nije dostupan ili je blokiran.</p>'
      return
    }
    slotsHost.innerHTML = slots
      .map((slot) => {
        const cls = ['slot', 'slot--admin', `slot--${slot.status}`].join(' ')
        const disabled = slot.status === 'booked' ? 'disabled' : ''
        return `<button type="button" class="${cls}" data-time="${slot.time}" ${disabled}>${slot.time}</button>`
      })
      .join('')

    slotsHost.querySelectorAll('.slot--admin:not([disabled])').forEach((btn) => {
      btn.addEventListener('click', async () => {
        await barberApi.toggleSlot(state.date, btn.dataset.time)
        paintCalendar()
        paintSlots()
      })
    })
  }

  if (blockDayBtn) {
    blockDayBtn.addEventListener('click', async () => {
      await barberApi.toggleDateBlock(state.date)
      paintCalendar()
      paintSlots()
    })
  }

  paintCalendar()
  paintSlots()

  return { refresh: () => { paintCalendar(); paintSlots() } }
}

function renderTimeSlots(host, hintEl, date, serviceId, pickedTime, onPick) {
  if (!date || !serviceId) {
    hintEl.textContent = ''
    host.innerHTML = ''
    return
  }

  const slots = getAvailability(date, serviceId)
  if (!slots.length) {
    hintEl.textContent = 'Nema dostupnih termina za ovaj dan.'
    host.innerHTML = ''
    return
  }

  hintEl.textContent = ''
  host.innerHTML = slots
    .map((slot) => {
      const cls = ['slot', !slot.available ? 'taken' : '', slot.time === pickedTime ? 'picked' : '']
        .filter(Boolean)
        .join(' ')
      return `<button type="button" class="${cls}" data-time="${slot.time}" ${slot.available ? '' : 'disabled'}>${slot.time}</button>`
    })
    .join('')

  host.querySelectorAll('.slot:not(.taken)').forEach((btn) => {
    btn.addEventListener('click', () => onPick(btn.dataset.time))
  })
}

export function wireBookingPicker(root, callbacks = {}) {
  const servicesHost = root.querySelector('[data-services]')
  const calendarHost = root.querySelector('[data-calendar]')
  const timeBlock = root.querySelector('[data-time-block]')
  const slotsHost = root.querySelector('[data-slots]')
  const slotsHint = root.querySelector('[data-slots-hint]')

  const state = {
    serviceId: '',
    date: '',
    time: '',
    viewYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth(),
    services: [],
  }

  function emitChange() {
    callbacks.onChange?.({ ...state })
  }

  function paintServices() {
    renderServiceGrid(servicesHost, state.services, state.serviceId, (id) => {
      state.serviceId = id
      state.time = ''
      paintServices()
      paintSlots()
      emitChange()
    })
  }

  function paintCalendar() {
    renderCalendar(
      calendarHost,
      state.viewYear,
      state.viewMonth,
      state.date,
      (iso) => {
        state.date = iso
        state.time = ''
        paintCalendar()
        paintSlots()
        emitChange()
      },
      (y, m) => {
        state.viewYear = y
        state.viewMonth = m
        paintCalendar()
      },
    )
  }

  function paintSlots() {
    const ready = state.serviceId && state.date
    if (timeBlock) timeBlock.hidden = !ready
    if (!ready) {
      if (slotsHost) slotsHost.innerHTML = ''
      if (slotsHint) slotsHint.textContent = ''
      return
    }
    renderTimeSlots(slotsHost, slotsHint, state.date, state.serviceId, state.time, (time) => {
      state.time = time
      paintSlots()
      emitChange()
    })
  }

  return {
    async load(preselectService = '') {
      const settings = await barberApi.getSettings()
      state.services = settings.services
      if (preselectService && state.services.some((s) => s.id === preselectService)) {
        state.serviceId = preselectService
      }
      const today = new Date()
      state.viewYear = today.getFullYear()
      state.viewMonth = today.getMonth()
      paintServices()
      paintCalendar()
      paintSlots()
      emitChange()
      return settings
    },
    reset() {
      state.serviceId = ''
      state.date = ''
      state.time = ''
      const today = new Date()
      state.viewYear = today.getFullYear()
      state.viewMonth = today.getMonth()
      paintServices()
      paintCalendar()
      paintSlots()
      emitChange()
    },
    setService(id) {
      if (state.services.some((s) => s.id === id)) {
        state.serviceId = id
        state.time = ''
        paintServices()
        paintSlots()
        emitChange()
      }
    },
    getState: () => ({ ...state }),
    refreshSlots: paintSlots,
  }
}

function bookingModalHtml() {
  return `
  <div class="book-modal" id="bookModal" hidden aria-hidden="true">
    <div class="book-modal__backdrop" data-close-book></div>
    <div class="book-modal__panel" role="dialog" aria-modal="true" aria-labelledby="bookModalTitle">
      <button type="button" class="book-modal__close" data-close-book aria-label="Zatvori">×</button>
      <h2 class="book-modal__title" id="bookModalTitle">Zakaži termin</h2>
      <p class="book-modal__lead">Izaberite uslugu, datum i vreme ispod.</p>

      <form id="bookModalForm" novalidate>
        <div class="book-picker" data-booking-picker>
          <p class="book-section-label">Usluga</p>
          <div class="book-services" data-services></div>

          <p class="book-section-label book-section-label--spaced">Datum</p>
          <div class="book-cal" data-calendar></div>

          <div class="book-time-block" data-time-block hidden>
            <p class="book-section-label book-section-label--spaced">Vreme</p>
            <p class="book-modal__hint" data-slots-hint></p>
            <div class="slots book-slots" data-slots></div>
          </div>
        </div>

        <div class="book-modal__step2 focus-in" id="modalStep2" hidden>
          <p class="book-section-label book-section-label--spaced">Vaši podaci</p>
          <div class="field">
            <label for="modalEmail">Email</label>
            <input id="modalEmail" type="email" placeholder="vas@email.com" required />
          </div>
          <div class="field">
            <label for="modalName">Ime i prezime</label>
            <input id="modalName" type="text" placeholder="Vaše ime" required />
          </div>
          <div class="field">
            <label for="modalPhone">Broj telefona</label>
            <input id="modalPhone" type="tel" placeholder="06x xxx xxxx" required />
          </div>
          <button class="btn book-modal__submit" type="submit" id="modalSubmit">Potvrdi rezervaciju</button>
        </div>

        <div class="msg" id="modalMsg"></div>
      </form>
    </div>
  </div>`
}

export function initBookingModal() {
  if (document.getElementById('bookModal')) return

  document.body.insertAdjacentHTML('beforeend', bookingModalHtml())

  const modal = document.getElementById('bookModal')
  const form = document.getElementById('bookModalForm')
  const step2 = document.getElementById('modalStep2')
  const msgEl = document.getElementById('modalMsg')
  const submitBtn = document.getElementById('modalSubmit')
  const pickerRoot = modal.querySelector('[data-booking-picker]')

  let picker = null

  function showMsg(text, ok) {
    msgEl.textContent = text
    msgEl.className = `msg ${ok ? 'ok' : 'err'}`
  }

  function clearMsg() {
    msgEl.textContent = ''
    msgEl.className = 'msg'
  }

  function closeModal() {
    modal.hidden = true
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

  function maybeRevealStep2({ serviceId, date }) {
    if (serviceId && date) revealElement(step2)
    else {
      step2.hidden = true
      step2.classList.remove('is-visible')
    }
  }

  picker = wireBookingPicker(pickerRoot, {
    onChange: (state) => maybeRevealStep2(state),
  })

  function resetModal() {
    step2.hidden = true
    step2.classList.remove('is-visible')
    clearMsg()
    form.reset()
    submitBtn.disabled = false
    picker.reset()
  }

  function openModal(preselectService) {
    resetModal()
    modal.hidden = false
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
    picker.load(preselectService).catch(() => {})
  }

  modal.querySelectorAll('[data-close-book]').forEach((el) => {
    el.addEventListener('click', closeModal)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal()
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const { serviceId, date, time } = picker.getState()
    if (!serviceId || !date) {
      showMsg('Izaberite uslugu i datum.', false)
      return
    }
    if (!time) {
      showMsg('Izaberite termin pre potvrde.', false)
      return
    }
    submitBtn.disabled = true
    try {
      await barberApi.createBooking({
        serviceId,
        date,
        time,
        name: document.getElementById('modalName').value.trim(),
        email: document.getElementById('modalEmail').value.trim(),
        phone: document.getElementById('modalPhone').value.trim(),
      })
      showMsg('✓ Zahtev je poslat. Javićemo vam se kada potvrdimo termin.', true)
      step2.hidden = true
    } catch (err) {
      showMsg(err.message, false)
      picker.refreshSlots()
    } finally {
      submitBtn.disabled = false
    }
  })

  document.querySelectorAll('[data-open-book]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault()
      openModal(el.dataset.service || '')
    })
  })
}

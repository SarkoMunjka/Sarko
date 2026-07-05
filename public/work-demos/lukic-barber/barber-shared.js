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
    { id: 'sisanje', name: 'Šišanje', durationMinutes: 30, priceRsd: 2500 },
    { id: 'sisanje-brada', name: 'Šišanje + brada', durationMinutes: 45, priceRsd: 3500 },
    { id: 'komplet', name: 'Komplet', durationMinutes: 60, priceRsd: 5000 },
  ],
  blockedDates: [],
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
  return readJson(DEMO_SETTINGS_KEY, structuredClone(DEFAULT_SETTINGS))
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
    (b) => b.date === date && b.status === 'confirmed',
  )
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
    const taken = takenByBooking || seedTaken.has(time)
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
    status: 'confirmed',
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

function bookingModalHtml() {
  return `
  <div class="book-modal" id="bookModal" hidden aria-hidden="true">
    <div class="book-modal__backdrop" data-close-book></div>
    <div class="book-modal__panel" role="dialog" aria-modal="true" aria-labelledby="bookModalTitle">
      <button type="button" class="book-modal__close" data-close-book aria-label="Zatvori">×</button>
      <p class="book-modal__eyebrow">Rezervacija</p>
      <h2 class="book-modal__title" id="bookModalTitle">Zakažite termin</h2>
      <p class="book-modal__lead">Izaberite uslugu i datum, zatim slobodan termin.</p>

      <form id="bookModalForm" novalidate>
        <div class="book-modal__step1">
          <div class="field">
            <label for="modalService">Usluga</label>
            <select id="modalService" required></select>
          </div>
          <div class="field">
            <label for="modalDate">Datum</label>
            <input id="modalDate" type="date" required />
          </div>
          <div class="field">
            <label>Termin</label>
            <p class="book-modal__hint" id="modalSlotsHint">Izaberite uslugu i datum.</p>
            <div class="slots" id="modalSlots"></div>
          </div>
        </div>

        <div class="book-modal__step2 focus-in" id="modalStep2" hidden>
          <p class="book-modal__step-label">Vaši podaci</p>
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
  const serviceEl = document.getElementById('modalService')
  const dateEl = document.getElementById('modalDate')
  const slotsEl = document.getElementById('modalSlots')
  const slotsHint = document.getElementById('modalSlotsHint')
  const step2 = document.getElementById('modalStep2')
  const msgEl = document.getElementById('modalMsg')
  const submitBtn = document.getElementById('modalSubmit')

  let pickedTime = ''
  let settings = null

  dateEl.min = minBookableDate()
  dateEl.value = dateEl.min

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

  function resetModal() {
    pickedTime = ''
    step2.hidden = true
    step2.classList.remove('is-visible')
    slotsEl.innerHTML = ''
    slotsHint.textContent = 'Izaberite uslugu i datum.'
    clearMsg()
    form.reset()
    dateEl.value = dateEl.min
    submitBtn.disabled = false
  }

  function openModal(preselectService) {
    resetModal()
    modal.hidden = false
    modal.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'

    if (!settings) return
    if (preselectService && settings.services.some((s) => s.id === preselectService)) {
      serviceEl.value = preselectService
    }
    renderSlots()
    serviceEl.focus()
  }

  async function loadSettings() {
    settings = await barberApi.getSettings()
    serviceEl.innerHTML = settings.services
      .map(
        (s) =>
          `<option value="${s.id}">${s.name} — ${s.priceRsd.toLocaleString('sr-RS')} RSD · ${s.durationMinutes} min</option>`,
      )
      .join('')
  }

  function maybeRevealStep2() {
    const ready = serviceEl.value && dateEl.value
    if (!ready) {
      step2.hidden = true
      step2.classList.remove('is-visible')
      return
    }
    revealElement(step2)
  }

  function renderSlots() {
    pickedTime = ''
    slotsEl.innerHTML = ''

    const date = dateEl.value
    const serviceId = serviceEl.value
    if (!date || !serviceId) {
      slotsHint.textContent = 'Izaberite uslugu i datum.'
      step2.hidden = true
      step2.classList.remove('is-visible')
      return
    }

    maybeRevealStep2()

    const slots = getAvailability(date, serviceId)
    if (!slots.length) {
      slotsHint.textContent = 'Nema dostupnih termina za ovaj dan.'
      return
    }

    slotsHint.textContent = 'Kliknite slobodan termin:'
    slotsEl.innerHTML = slots
      .map((slot) => {
        const cls = slot.available ? 'slot' : 'slot taken'
        return `<button type="button" class="${cls}" data-time="${slot.time}" ${slot.available ? '' : 'disabled'}>${slot.time}</button>`
      })
      .join('')

    slotsEl.querySelectorAll('.slot:not(.taken)').forEach((btn) => {
      btn.addEventListener('click', () => {
        slotsEl.querySelectorAll('.slot').forEach((b) => b.classList.remove('picked'))
        btn.classList.add('picked')
        pickedTime = btn.dataset.time
      })
    })
  }

  modal.querySelectorAll('[data-close-book]').forEach((el) => {
    el.addEventListener('click', closeModal)
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal()
  })

  serviceEl.addEventListener('change', renderSlots)
  dateEl.addEventListener('change', renderSlots)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!pickedTime) {
      showMsg('Izaberite termin pre potvrde.', false)
      return
    }
    submitBtn.disabled = true
    try {
      await barberApi.createBooking({
        serviceId: serviceEl.value,
        date: dateEl.value,
        time: pickedTime,
        name: document.getElementById('modalName').value.trim(),
        email: document.getElementById('modalEmail').value.trim(),
        phone: document.getElementById('modalPhone').value.trim(),
      })
      showMsg('✓ Termin je rezervisan. Javićemo vam se porukom da potvrdimo.', true)
      step2.hidden = true
      slotsEl.innerHTML = ''
      slotsHint.textContent = 'Hvala — vidimo se u salonu.'
    } catch (err) {
      showMsg(err.message, false)
      renderSlots()
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

  loadSettings().catch(() => {})
}

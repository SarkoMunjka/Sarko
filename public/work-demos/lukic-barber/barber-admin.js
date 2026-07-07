import {
  barberApi,
  setAdminToken,
  getAdminToken,
  formatDateSr,
  mountAdminAvailability,
} from './barber-shared.js'

const DAY_LABELS = {
  mon: 'Pon', tue: 'Uto', wed: 'Sre', thu: 'Čet', fri: 'Pet', sat: 'Sub', sun: 'Ned',
}

const loginView = document.getElementById('loginView')
const adminView = document.getElementById('adminView')
const loginForm = document.getElementById('loginForm')
const loginMsg = document.getElementById('loginMsg')
const adminMsg = document.getElementById('adminMsg')
const logoutBtn = document.getElementById('logoutBtn')
const bookingsList = document.getElementById('bookingsList')
const bookingsTableBody = document.getElementById('bookingsTableBody')
const bookingsCount = document.getElementById('bookingsCount')
const bookingsStats = document.getElementById('bookingsStats')

const filterRange = document.getElementById('filterRange')
const filterDate = document.getElementById('filterDate')
const filterStatus = document.getElementById('filterStatus')

let currentSettings = null
let serviceMap = new Map()
let availManager = null
let allBookings = []

function showAdminMsg(text, ok) {
  adminMsg.textContent = text
  adminMsg.className = `msg ${ok ? 'ok' : 'err'}`
}

function showLogin() {
  loginView.hidden = false
  adminView.hidden = true
}

function showAdmin() {
  loginView.hidden = true
  adminView.hidden = false
}

function switchTab(name) {
  document.querySelectorAll('.admin-navtab').forEach((t) => {
    t.classList.toggle('is-active', t.dataset.tab === name)
  })
  document.getElementById('panelBookings').hidden = name !== 'bookings'
  document.getElementById('panelSchedule').hidden = name !== 'schedule'
  if (name === 'schedule' && availManager) availManager.refresh()
}

document.querySelectorAll('.admin-navtab').forEach((tab) => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab))
})

function renderSchedule(settings) {
  const host = document.getElementById('scheduleRows')
  host.innerHTML = Object.entries(settings.schedule)
    .map(
      ([key, day]) => `
      <div class="schedule-row" data-day="${key}">
        <label><input type="checkbox" class="day-enabled" ${day.enabled ? 'checked' : ''} /> ${DAY_LABELS[key]}</label>
        <span></span>
        <input type="time" class="day-open" value="${day.open}" />
        <input type="time" class="day-close" value="${day.close}" />
      </div>`,
    )
    .join('')
}

function collectSettingsFromForm() {
  const schedule = { ...currentSettings.schedule }
  document.querySelectorAll('.schedule-row').forEach((row) => {
    const key = row.dataset.day
    schedule[key] = {
      enabled: row.querySelector('.day-enabled').checked,
      open: row.querySelector('.day-open').value,
      close: row.querySelector('.day-close').value,
    }
  })
  return {
    ...currentSettings,
    acceptBookings: document.getElementById('acceptBookings').checked,
    slotIntervalMinutes: Number(document.getElementById('slotInterval').value),
    schedule,
    blockedDates: currentSettings.blockedDates || [],
    blockedSlots: currentSettings.blockedSlots || {},
  }
}

function fillSettingsForm(settings) {
  currentSettings = settings
  serviceMap = new Map(settings.services.map((s) => [s.id, s.name]))
  document.getElementById('acceptBookings').checked = settings.acceptBookings
  document.getElementById('slotInterval').value = String(settings.slotIntervalMinutes)
  renderSchedule(settings)
}

function statusBadge(status) {
  if (status === 'pending') return '<span class="badge pending">Na čekanju</span>'
  if (status === 'confirmed') return '<span class="badge ok">Potvrđeno</span>'
  return '<span class="badge cancel">Otkazano</span>'
}

function isUpcomingBooking(booking) {
  const now = new Date()
  const today = now.toISOString().slice(0, 10)
  if (booking.date > today) return true
  if (booking.date < today) return false
  const [h, m] = booking.startTime.split(':').map(Number)
  const mins = h * 60 + m
  const nowMins = now.getHours() * 60 + now.getMinutes()
  return mins >= nowMins
}

function inSelectedRange(booking) {
  const range = filterRange.value
  const today = new Date()
  const todayIso = today.toISOString().slice(0, 10)

  if (range === 'today') return booking.date === todayIso
  if (range === 'week') {
    const end = new Date(today)
    end.setDate(end.getDate() + 7)
    return booking.date >= todayIso && booking.date <= end.toISOString().slice(0, 10)
  }
  if (range === 'upcoming') return isUpcomingBooking(booking)
  return true
}

function filteredBookings() {
  return allBookings
    .filter((b) => {
      if (filterStatus.value && b.status !== filterStatus.value) return false
      if (filterDate.value && b.date !== filterDate.value) return false
      if (!inSelectedRange(b)) return false
      return true
    })
    .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))
}

function renderBookingStats() {
  const active = allBookings.filter((b) => b.status === 'pending' || b.status === 'confirmed')
  const pending = active.filter((b) => b.status === 'pending').length
  const confirmed = active.filter((b) => b.status === 'confirmed').length
  const today = new Date().toISOString().slice(0, 10)
  const todayCount = active.filter((b) => b.date === today).length

  bookingsStats.innerHTML = `
    <div class="admin-stat">
      <span class="admin-stat__value">${active.length}</span>
      <span class="admin-stat__label">Ukupno aktivnih</span>
    </div>
    <div class="admin-stat">
      <span class="admin-stat__value">${pending}</span>
      <span class="admin-stat__label">Na čekanju</span>
    </div>
    <div class="admin-stat">
      <span class="admin-stat__value">${confirmed}</span>
      <span class="admin-stat__label">Potvrđeno</span>
    </div>
    <div class="admin-stat">
      <span class="admin-stat__value">${todayCount}</span>
      <span class="admin-stat__label">Danas</span>
    </div>`
}

function bookingActionsHtml(id, status) {
  return `
    <div class="admin-booking-card__actions admin-booking-card__actions--inline">
      <select data-status="${id}" aria-label="Status rezervacije">
        <option value="pending" ${status === 'pending' ? 'selected' : ''}>Na čekanju</option>
        <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Potvrđeno</option>
        <option value="cancelled" ${status === 'cancelled' ? 'selected' : ''}>Otkazano</option>
      </select>
      <button class="btn ghost sm is-danger" type="button" data-delete="${id}">Obriši</button>
    </div>`
}

function wireBookingActions(root) {
  root.querySelectorAll('[data-status]').forEach((sel) => {
    sel.addEventListener('change', async () => {
      await barberApi.updateBookingStatus(sel.dataset.status, sel.value)
      await loadBookings()
      showAdminMsg('Status je ažuriran.', true)
    })
  })

  root.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm('Obrisati ovu rezervaciju?')) return
      await barberApi.deleteBooking(btn.dataset.delete)
      await loadBookings()
      if (availManager) availManager.refresh()
      showAdminMsg('Rezervacija je obrisana.', true)
    })
  })
}

function renderBookings() {
  const list = filteredBookings()
  const total = allBookings.length
  bookingsCount.textContent = `${list.length} prikazano · ${total} ukupno u sistemu`
  renderBookingStats()

  if (!list.length) {
    bookingsTableBody.innerHTML = `
      <tr><td colspan="7" class="admin-bookings-table__empty">Nema rezervacija za izabrane filtere.</td></tr>`
    bookingsList.innerHTML = '<p class="admin-hint">Nema rezervacija za izabrane filtere.</p>'
    return
  }

  bookingsTableBody.innerHTML = list
    .map((b) => {
      const service = serviceMap.get(b.serviceId) || b.serviceId
      return `
        <tr>
          <td>${formatDateSr(b.date)}</td>
          <td>${b.startTime}</td>
          <td>${service}</td>
          <td>
            <strong>${b.name}</strong>
            ${b.email ? `<div class="admin-bookings-table__sub">${b.email}</div>` : ''}
          </td>
          <td>${b.phone}</td>
          <td>${statusBadge(b.status)}</td>
          <td>${bookingActionsHtml(b.id, b.status)}</td>
        </tr>`
    })
    .join('')

  bookingsList.innerHTML = list
    .map((b) => {
      const service = (serviceMap.get(b.serviceId) || b.serviceId).toUpperCase()
      return `
        <article class="admin-booking-card">
          <div>
            ${statusBadge(b.status)}
            <div class="admin-booking-card__service">${service}</div>
            <div class="admin-booking-card__grid">
              <span><span class="admin-icon" aria-hidden="true">D</span> ${formatDateSr(b.date)} · ${b.startTime}</span>
              <span><span class="admin-icon" aria-hidden="true">K</span> ${b.name}</span>
              <span><span class="admin-icon" aria-hidden="true">T</span> ${b.phone}</span>
              <span><span class="admin-icon" aria-hidden="true">@</span> ${b.email || '—'}</span>
            </div>
          </div>
          ${bookingActionsHtml(b.id, b.status)}
        </article>`
    })
    .join('')

  wireBookingActions(bookingsTableBody)
  wireBookingActions(bookingsList)
}

async function loadBookings() {
  const { bookings } = await barberApi.getBookings()
  allBookings = bookings
  renderBookings()
}

async function loadAdmin() {
  const { settings } = await barberApi.getAdminSettings()
  fillSettingsForm(settings)
  await loadBookings()
  if (!availManager) {
    availManager = mountAdminAvailability(document.getElementById('panelSchedule'))
  } else {
    availManager.refresh()
  }
  showAdmin()
  switchTab('bookings')
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  loginMsg.className = 'msg'
  loginMsg.textContent = ''
  try {
    const { token } = await barberApi.login({ password: loginForm.password.value })
    setAdminToken(token)
    await loadAdmin()
  } catch (err) {
    loginMsg.textContent = err.message
    loginMsg.className = 'msg err'
  }
})

logoutBtn.addEventListener('click', async () => {
  try {
    await barberApi.logout()
  } catch {
    /* ignore */
  }
  setAdminToken('')
  showLogin()
})

document.getElementById('saveSettings').addEventListener('click', async () => {
  try {
    const settings = collectSettingsFromForm()
    await barberApi.saveAdminSettings(settings)
    fillSettingsForm(settings)
    if (availManager) availManager.refresh()
    showAdminMsg('Podešavanja su sačuvana.', true)
  } catch (err) {
    showAdminMsg(err.message, false)
  }
})

;[filterRange, filterDate, filterStatus].forEach((el) => {
  el.addEventListener('change', renderBookings)
})

showLogin()

if (getAdminToken()) {
  loadAdmin().catch(() => {
    setAdminToken('')
    showLogin()
  })
}

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
const bookingsCount = document.getElementById('bookingsCount')

const filterBarber = document.getElementById('filterBarber')
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

function filteredBookings() {
  return allBookings.filter((b) => {
    if (b.status !== 'pending' && b.status !== 'confirmed') return false
    if (filterStatus.value && b.status !== filterStatus.value) return false
    if (filterDate.value && b.date !== filterDate.value) return false
    return true
  })
}

function renderBookings() {
  const list = filteredBookings()
  bookingsCount.textContent = `${list.length} od ${allBookings.filter((b) => b.status === 'pending' || b.status === 'confirmed').length} rezervacija`

  if (!list.length) {
    bookingsList.innerHTML = '<p class="admin-hint">Nema rezervacija za izabrane filtere.</p>'
    return
  }

  bookingsList.innerHTML = list
    .map((b) => {
      const service = (serviceMap.get(b.serviceId) || b.serviceId).toUpperCase()
      return `
        <article class="admin-booking-card">
          <div>
            ${statusBadge(b.status)}
            <div class="admin-booking-card__service">${service}</div>
            <div class="admin-booking-card__grid">
              <span>📅 ${b.date} · ${b.startTime}</span>
              <span>✂️ Lukić</span>
              <span>👤 ${b.name}</span>
              <span>✉️ ${b.email || '—'}</span>
              <span>📞 ${b.phone}</span>
            </div>
          </div>
          <div class="admin-booking-card__actions">
            <select data-status="${b.id}" aria-label="Status rezervacije">
              <option value="pending" ${b.status === 'pending' ? 'selected' : ''}>Na čekanju</option>
              <option value="confirmed" ${b.status === 'confirmed' ? 'selected' : ''}>Potvrđeno</option>
              <option value="cancelled">Otkazano</option>
            </select>
            <button class="btn ghost sm is-danger" type="button" data-delete="${b.id}">🗑 Obriši</button>
          </div>
        </article>`
    })
    .join('')

  bookingsList.querySelectorAll('[data-status]').forEach((sel) => {
    sel.addEventListener('change', async () => {
      await barberApi.updateBookingStatus(sel.dataset.status, sel.value)
      await loadBookings()
      showAdminMsg('Status je ažuriran.', true)
    })
  })

  bookingsList.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm('Obrisati ovu rezervaciju?')) return
      await barberApi.deleteBooking(btn.dataset.delete)
      await loadBookings()
      if (availManager) availManager.refresh()
      showAdminMsg('Rezervacija je obrisana.', true)
    })
  })
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

;[filterBarber, filterDate, filterStatus].forEach((el) => {
  el.addEventListener('change', renderBookings)
})

// Uvek prikaži login odmah
showLogin()

if (getAdminToken()) {
  loadAdmin().catch(() => {
    setAdminToken('')
    showLogin()
  })
}

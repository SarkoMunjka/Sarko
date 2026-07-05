const API_BASE = '/api/barber'

function getAdminToken() {
  return sessionStorage.getItem('lukic_barber_admin_token') || ''
}

export function setAdminToken(token) {
  if (token) sessionStorage.setItem('lukic_barber_admin_token', token)
  else sessionStorage.removeItem('lukic_barber_admin_token')
}

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) }
  if (options.auth) headers.Authorization = `Bearer ${getAdminToken()}`
  if (options.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Greška na serveru.')
  return data
}

export const barberApi = {
  getSettings: () => request('/settings'),
  getAvailability: (date, serviceId) =>
    request(`/availability?date=${encodeURIComponent(date)}&serviceId=${encodeURIComponent(serviceId)}`),
  createBooking: (payload) => request('/bookings', { method: 'POST', body: payload }),
  login: (password) => request('/login', { method: 'POST', body: { password } }),
  logout: () => request('/logout', { method: 'POST', auth: true }),
  getAdminSettings: () => request('/admin/settings', { auth: true }),
  saveAdminSettings: (settings) =>
    request('/admin/settings', { method: 'PUT', auth: true, body: { settings } }),
  getBookings: (from, to) => {
    const q = new URLSearchParams()
    if (from) q.set('from', from)
    if (to) q.set('to', to)
    const suffix = q.toString() ? `?${q}` : ''
    return request(`/admin/bookings${suffix}`, { auth: true })
  },
  cancelBooking: (id) => request(`/admin/bookings/${id}/cancel`, { method: 'POST', auth: true }),
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

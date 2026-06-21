import { useEffect, useState } from 'react'

function formatLondonTime(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function useLondonTime(): string {
  const [time, setTime] = useState<string>(() => formatLondonTime(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(formatLondonTime(new Date()))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  return time
}

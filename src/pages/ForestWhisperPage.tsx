import { useEffect } from 'react'
import { ForestWhisperDemo } from '../demos/forest-whisper/ForestWhisperDemo'

/** Standalone demo route — no agency chrome */
export function ForestWhisperPage() {
  useEffect(() => {
    const prev = document.body.className
    document.body.className = ''
    document.body.style.background = '#0d1b12'
    return () => {
      document.body.className = prev
      document.body.style.background = ''
    }
  }, [])

  return <ForestWhisperDemo />
}

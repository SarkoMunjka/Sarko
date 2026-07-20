import { useId } from 'react'

/**
 * Torn-paper divider along a symmetric upward arc.
 * Jagged teeth stay consistent from left edge to right — no flat plateau.
 */
export function buildTornArcPath(
  width = 1440,
  height = 200,
  step = 6,
  edgeY = 120,
  peakY = 72,
  tooth = 6,
): string {
  const center = width / 2
  const curveA = (edgeY - peakY) / (center * center)
  const baseY = (x: number) => curveA * (x - center) ** 2 + peakY

  const parts: string[] = []
  const count = Math.round(width / step)

  for (let i = 0; i <= count; i++) {
    const x = Math.min(i * step, width)
    const phase = i % 2 === 0 ? -1 : 1
    const wobble = (i % 3 === 0 ? 1 : 0) * phase
    const y = Math.round(baseY(x) + phase * tooth + wobble)
    parts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`)
  }

  parts.push(`L${width},${height}`, `L0,${height}`, 'Z')
  return parts.join(' ')
}

const TORN_ARC_PATH = buildTornArcPath()

/** Organic ripped-paper edge — symmetric arc + noise displacement texture */
export function TornPaperDivider() {
  const filterId = useId().replace(/:/g, '')

  return (
    <div
      className="torn-divider pointer-events-none absolute bottom-[-1px] left-0 z-20 w-full overflow-hidden"
      style={{ height: 'clamp(90px, 11vw, 120px)' }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="block h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves={3} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={45} />
          </filter>
        </defs>
        <path fill="#f6f1e8" d={TORN_ARC_PATH} filter={`url(#${filterId})`} />
      </svg>
    </div>
  )
}

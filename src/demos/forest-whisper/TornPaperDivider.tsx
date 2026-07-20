/**
 * Torn-paper divider along a symmetric upward arc.
 * Jagged teeth stay consistent from left edge to right — no flat plateau.
 */
function buildTornArcPath(
  width = 1440,
  height = 120,
  step = 6,
  edgeY = 54,
  peakY = 14,
  tooth = 5,
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

/** Organic ripped-paper edge — symmetric arc, warm off-white fill */
export function TornPaperDivider() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 z-20 w-full leading-none"
      style={{ height: 'clamp(90px, 11vw, 120px)' }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#f6f1e8" d={TORN_ARC_PATH} />
      </svg>
    </div>
  )
}

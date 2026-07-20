/** Shared torn-paper edge math — matches divider tooth rhythm */

function jagOffset(i: number, tooth: number): number {
  const phase = i % 2 === 0 ? 0 : tooth
  const wobble = (i % 3 === 0 ? 1 : 0) * (i % 2 === 0 ? -1 : 1) * (tooth * 0.2)
  return phase + wobble
}

/** Horizontal torn edge for the hero divider (downward arc) */
export function buildTornArcPath(
  width = 1440,
  height = 120,
  step = 6,
  edgeY = 38,
  dipY = 82,
  tooth = 5,
): string {
  const center = width / 2
  const curveA = (dipY - edgeY) / (center * center)
  const baseY = (x: number) => curveA * (x - center) ** 2 + edgeY

  const parts: string[] = []
  const count = Math.round(width / step)

  for (let i = 0; i <= count; i++) {
    const x = Math.min(i * step, width)
    const y = Math.round(baseY(x) + jagOffset(i, tooth))
    parts.push(i === 0 ? `M${x},${y}` : `L${x},${y}`)
  }

  parts.push(`L${width},${height}`, `L0,${height}`, 'Z')
  return parts.join(' ')
}

/** Closed torn rectangle for cards — same tooth pattern on all four sides */
export function buildTornRectClipPath(segments = 16, toothPct = 2.8): string {
  const pts: string[] = []
  const push = (x: number, y: number) => pts.push(`${x}% ${y}%`)

  for (let i = 0; i <= segments; i++) {
    push((i / segments) * 100, jagOffset(i, toothPct))
  }

  for (let i = 1; i <= segments; i++) {
    push(100 - jagOffset(i, toothPct), (i / segments) * 100)
  }

  for (let i = segments - 1; i >= 0; i--) {
    push((i / segments) * 100, 100 - jagOffset(i, toothPct))
  }

  for (let i = segments - 1; i >= 1; i--) {
    push(jagOffset(i, toothPct), (i / segments) * 100)
  }

  return `polygon(${pts.join(', ')})`
}

export const TORN_CARD_CLIP = buildTornRectClipPath()

/** Vertical torn edge on the left side of a panel */
export function buildTornLeftClipPath(segments = 28, toothPct = 2.8): string {
  const pts: string[] = [`${toothPct}% 0%`, '100% 0%', '100% 100%', `${toothPct}% 100%`]

  for (let i = segments - 1; i >= 0; i--) {
    const y = (i / segments) * 100
    const x = i % 2 === 0 ? 0 : toothPct
    const wobble = (i % 3 === 0 ? 0.4 : 0) * (i % 2 === 0 ? 1 : -1)
    pts.push(`${x + wobble}% ${y}%`)
  }

  return `polygon(${pts.join(', ')})`
}

export const TORN_LEFT_PANEL_CLIP = buildTornLeftClipPath()

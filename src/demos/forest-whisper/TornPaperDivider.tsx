import { buildTornArcPath } from './tornPaper'

const TORN_ARC_PATH = buildTornArcPath()

/** Organic ripped-paper edge — symmetric downward arc, warm off-white fill */
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

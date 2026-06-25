type Variant = 'cover' | 'film' | 'couples' | 'quote'

interface NovaVisualProps {
  variant?: Variant
  label?: string
  className?: string
}

const BRAND = {
  ink: '#15110D',
  charcoal: '#221C16',
  cream: '#EFE7DA',
  gold: '#B79268',
  taupe: '#8C7F6E',
}

const COUPLES = [
  ['Mila', 'Lyosha'],
  ['Melani', 'David'],
  ['Irena', 'Luka'],
  ['Danijela', 'Igor'],
  ['Smiljana', 'Miloš'],
  ['Marina', 'Stefan'],
]

function FilmStrip({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-1.5 ${className}`}>
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="h-3 w-2 rounded-[1px]"
          style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
        />
      ))}
    </div>
  )
}

function PlayButton({ size = 56 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-full ring-1"
      style={{ width: size, height: size, borderColor: BRAND.gold }}
    >
      <span
        style={{
          width: 0,
          height: 0,
          borderTop: `${size / 7}px solid transparent`,
          borderBottom: `${size / 7}px solid transparent`,
          borderLeft: `${size / 4.5}px solid ${BRAND.gold}`,
          marginLeft: size / 12,
        }}
      />
    </span>
  )
}

/**
 * Cinematic branded placeholders for the NovaFrame case study. Recreates the
 * studio's dark, elegant, film-forward aesthetic in CSS. Swap for real
 * screenshots when available.
 */
export function NovaVisual({ variant = 'cover', label, className = '' }: NovaVisualProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: BRAND.ink }}
      aria-hidden="true"
    >
      {variant === 'cover' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center"
          style={{
            background: `radial-gradient(130% 120% at 50% 10%, ${BRAND.charcoal} 0%, ${BRAND.ink} 70%)`,
          }}
        >
          <FilmStrip className="absolute left-0 right-0 top-4 justify-center" />
          <span
            className="text-[11px] font-medium uppercase tracking-[0.35em]"
            style={{ color: BRAND.taupe }}
          >
            NovaFrame Weddings
          </span>
          <h3
            className="font-serif text-[clamp(1.6rem,5vw,3.2rem)] leading-[1.05]"
            style={{ color: BRAND.cream }}
          >
            Cinematic
            <br />
            <span className="italic" style={{ color: BRAND.gold }}>
              love stories
            </span>
          </h3>
          <PlayButton />
          <FilmStrip className="absolute bottom-4 left-0 right-0 justify-center" />
        </div>
      )}

      {variant === 'film' && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(160deg, ${BRAND.charcoal}, ${BRAND.ink})`,
          }}
        >
          <PlayButton size={64} />
          <div className="absolute bottom-5 left-6">
            <div className="font-serif text-[20px]" style={{ color: BRAND.cream }}>
              Mila &amp; Lyosha
            </div>
            <div
              className="mt-1 text-[11px] uppercase tracking-[0.2em]"
              style={{ color: BRAND.taupe }}
            >
              September 2019 · Akacija
            </div>
          </div>
          <span
            className="absolute right-6 top-6 text-[11px] uppercase tracking-[0.2em]"
            style={{ color: BRAND.taupe }}
          >
            Highlight film
          </span>
        </div>
      )}

      {variant === 'couples' && (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2" style={{ backgroundColor: BRAND.ink }}>
          {COUPLES.map(([a, b], i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center border border-white/5 p-2 text-center"
              style={{ backgroundColor: i % 2 === 0 ? BRAND.charcoal : BRAND.ink }}
            >
              <span className="font-serif text-[14px] sm:text-[16px]" style={{ color: BRAND.cream }}>
                {a}
              </span>
              <span className="font-serif italic text-[12px]" style={{ color: BRAND.gold }}>
                &amp; {b}
              </span>
            </div>
          ))}
        </div>
      )}

      {variant === 'quote' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8 text-center"
          style={{ backgroundColor: BRAND.cream }}
        >
          <span
            className="text-[11px] font-medium uppercase tracking-[0.3em]"
            style={{ color: BRAND.taupe }}
          >
            Get a quote
          </span>
          <h3 className="font-serif text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.15]" style={{ color: BRAND.ink }}>
            Every story, every emotion,
            <br />
            <span className="italic" style={{ color: BRAND.gold }}>
              captured cinematically.
            </span>
          </h3>
          <span
            className="rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-wider text-white"
            style={{ backgroundColor: BRAND.ink }}
          >
            Book now
          </span>
        </div>
      )}

      {label && (
        <span className="absolute bottom-3 right-3 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  )
}

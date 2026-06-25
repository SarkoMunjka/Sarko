type Variant = 'cover' | 'home' | 'collab' | 'cart' | 'footer'

interface SocksVisualProps {
  variant?: Variant
  label?: string
  className?: string
}

const BRAND = {
  purple: '#9181D6',
  deepPurple: '#6E5FB0',
  yellow: '#FFD23F',
  pink: '#F4B7C7',
  blue: '#BFD9F2',
  cream: '#FBF4E6',
  ink: '#1B1B1F',
}

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-serif italic font-semibold tracking-tight ${className}`}
    >
      Socks <span className="not-italic font-normal">&amp;</span> Co.
    </span>
  )
}

function OutlineTalk({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-black uppercase leading-none tracking-tight ${className}`}
      style={{
        color: 'transparent',
        WebkitTextStroke: '1.5px currentColor',
      }}
    >
      Let&rsquo;s talk
    </span>
  )
}

/**
 * Branded placeholder "screenshots" for the Socks & Co. case study, recreating
 * the project's playful palette and motifs in CSS. Swap for real screenshots by
 * dropping an <img> in place of these where desired.
 */
export function SocksVisual({
  variant = 'cover',
  label,
  className = '',
}: SocksVisualProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ backgroundColor: BRAND.cream }}
      aria-hidden="true"
    >
      {variant === 'cover' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-8"
          style={{
            background: `radial-gradient(120% 120% at 20% 0%, ${BRAND.pink} 0%, ${BRAND.purple} 45%, ${BRAND.deepPurple} 100%)`,
          }}
        >
          <span
            className="absolute left-8 top-8 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: BRAND.yellow, color: BRAND.ink }}
          >
            Collaboration Store
          </span>
          <Wordmark className="text-white text-[clamp(1.8rem,5vw,3.5rem)]" />
          <p className="max-w-sm text-center text-[13px] font-medium text-white/80 sm:text-[15px]">
            Come &amp; see our fabulous feet — bold socks for people with
            personality.
          </p>
          <div className="flex gap-2">
            {[BRAND.yellow, BRAND.pink, BRAND.blue, '#ffffff'].map((c) => (
              <span
                key={c}
                className="h-3 w-3 rounded-full ring-1 ring-white/40"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <OutlineTalk className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 text-white/40 text-[clamp(3rem,12vw,7rem)]" />
        </div>
      )}

      {variant === 'home' && (
        <div className="absolute inset-0 p-6 sm:p-8" style={{ backgroundColor: BRAND.cream }}>
          <div className="flex items-center justify-between">
            <Wordmark className="text-[18px]" />
            <div className="flex gap-1.5">
              {[BRAND.yellow, BRAND.purple, BRAND.pink].map((c) => (
                <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div
            className="mt-5 flex h-[42%] items-center justify-center rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.pink})` }}
          >
            <span className="text-[15px] font-bold sm:text-[18px]" style={{ color: BRAND.ink }}>
              Come &amp; See Our Fabulous Feet!
            </span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-2.5">
            {[BRAND.purple, BRAND.yellow, BRAND.pink, BRAND.blue].map((c, i) => (
              <div key={i} className="rounded-xl p-2.5" style={{ backgroundColor: '#fff' }}>
                <div className="h-10 rounded-lg" style={{ backgroundColor: c }} />
                <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-black/10" />
                <div className="mt-1 h-1.5 w-1/2 rounded-full bg-black/10" />
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === 'collab' && (
        <div
          className="absolute inset-0 flex flex-col justify-center gap-4 p-8"
          style={{ background: `linear-gradient(160deg, ${BRAND.purple}, ${BRAND.deepPurple})` }}
        >
          <div className="flex items-center gap-3 text-white">
            <Wordmark className="text-[20px]" />
            <span className="text-white/60">×</span>
            <span className="text-[20px] font-bold tracking-tight">Nike</span>
          </div>
          <p className="text-[13px] font-medium text-white/75">Sale starts in</p>
          <div className="flex gap-2">
            {['00', '07', '37', '00'].map((n, i) => (
              <div
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-xl text-[18px] font-bold"
                style={{ backgroundColor: BRAND.yellow, color: BRAND.ink }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === 'cart' && (
        <div className="absolute inset-0 grid grid-cols-5 gap-4 p-6 sm:p-8" style={{ backgroundColor: '#fff' }}>
          <div className="col-span-3 flex flex-col gap-3">
            <span className="text-[18px] font-black uppercase tracking-tight" style={{ color: BRAND.ink }}>
              My Cart
            </span>
            <div className="h-2 w-1/2 rounded-full bg-black/10" />
            <div className="h-8 rounded-lg border border-black/10" />
            <div className="h-8 rounded-lg border border-black/10" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-8 rounded-lg border border-black/10" />
              <div className="h-8 rounded-lg border border-black/10" />
            </div>
            <div
              className="mt-1 flex h-9 items-center justify-center rounded-full text-[12px] font-bold"
              style={{ backgroundColor: BRAND.yellow, color: BRAND.ink }}
            >
              Proceed to shipping
            </div>
          </div>
          <div className="col-span-2 rounded-2xl p-4" style={{ backgroundColor: BRAND.cream }}>
            <div className="h-2 w-2/3 rounded-full bg-black/15" />
            <div className="mt-3 h-12 rounded-lg" style={{ background: `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.purple})` }} />
            <div className="mt-3 h-1.5 w-full rounded-full bg-black/10" />
            <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-black/10" />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-bold" style={{ color: BRAND.ink }}>
                Total
              </span>
              <span className="text-[11px] font-bold" style={{ color: BRAND.ink }}>
                $57.98
              </span>
            </div>
          </div>
        </div>
      )}

      {variant === 'footer' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8"
          style={{ backgroundColor: BRAND.cream }}
        >
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ backgroundColor: BRAND.blue, color: BRAND.ink }}
          >
            10% off for new comers
          </span>
          <OutlineTalk className="text-[clamp(3rem,14vw,8rem)]" />
          <div className="flex gap-2">
            {[BRAND.purple, BRAND.yellow, BRAND.pink].map((c) => (
              <span key={c} className="h-3 w-3 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </div>
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

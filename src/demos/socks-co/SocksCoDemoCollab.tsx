import { useEffect, useState } from 'react'
import {
  AnnouncementBar,
  DemoChrome,
  ProductCard,
  SOCKS_COLORS,
  SocksFooter,
  SocksHeader,
  WavyDivider,
} from './shared'
import './socksCoDemo.css'

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const pad = (n: number) => String(n).padStart(2, '0')
  return { days: pad(days), hours: pad(hours), mins: pad(mins), secs: pad(secs) }
}

export function SocksCoDemoCollab() {
  const timer = useCountdown(27720)

  return (
    <div className="socks-demo min-h-screen">
      <DemoChrome />
      <AnnouncementBar text="NIKE × SOCKS & CO. — LIMITED DROP · SIGN UP FOR EARLY ACCESS" />
      <SocksHeader />

      <section className="relative min-h-[min(70vh,640px)] overflow-hidden" style={{ backgroundColor: '#F4B7C7' }}>
        <img
          src="/socks-collab.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-300/30 to-pink-500/50" />
        <div className="relative mx-auto flex max-w-[1200px] items-end justify-between px-4 pb-10 pt-24 sm:px-6">
          <div className="rounded-full bg-white/90 px-4 py-2 text-[12px] font-bold shadow">
            Socks &amp; Co. × Nike
          </div>
        </div>
      </section>

      <WavyDivider fill={SOCKS_COLORS.sunshine} />

      <section className="px-4 py-14 text-center sm:px-6" style={{ backgroundColor: SOCKS_COLORS.sunshine }}>
        <p className="socks-demo-display text-2xl text-[#2D3A8C]">SALE STARTS IN</p>
        <div className="mt-6 flex justify-center gap-4 sm:gap-8">
          {[
            { label: 'Days', value: timer.days },
            { label: 'Hours', value: timer.hours },
            { label: 'Mins', value: timer.mins },
            { label: 'Sec', value: timer.secs },
          ].map((item) => (
            <div key={item.label}>
              <p className="socks-demo-display text-[clamp(2rem,6vw,3.5rem)] text-[#2D3A8C]">
                {item.value}
              </p>
              <p className="text-[12px] font-semibold uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <WavyDivider fill={SOCKS_COLORS.grape} />

      <section className="px-4 py-16 text-white sm:px-6" style={{ backgroundColor: SOCKS_COLORS.grape }}>
        <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img src="/socks-collab.png" alt="" className="aspect-square object-cover object-[center_40%]" />
          </div>
          <div>
            <h2 className="socks-demo-display text-[clamp(1.75rem,4vw,3rem)]">
              Representing for the people
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/90">
              A limited collaboration drop built around bold florals, playful color and
              the energy of the court — designed to feel collectible from the first scroll.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1200px] gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <h2 className="socks-demo-display text-[clamp(1.75rem,4vw,3rem)]">
              Built for the drop
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/90">
              Countdown, collaboration story and a dedicated store experience turned the
              launch into an event — not just another product page.
            </p>
          </div>
          <div className="order-1 overflow-hidden rounded-3xl shadow-xl lg:order-2">
            <img src="/socks-collab.png" alt="" className="aspect-square object-cover object-[center_55%]" />
          </div>
        </div>
      </section>

      <WavyDivider fill={SOCKS_COLORS.cream} />

      <section className="px-4 py-16 sm:px-6" style={{ backgroundColor: SOCKS_COLORS.cream }}>
        <div className="mx-auto max-w-[1200px]">
          <h2 className="socks-demo-display text-center text-3xl">YOU MAY ALSO LIKE</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <ProductCard title="Men's pairs per bundle" price="$62.00" compareAt="$89.00" />
            <ProductCard title="Court florals pack" price="$58.00" compareAt="$74.00" bg={SOCKS_COLORS.blossom} />
            <ProductCard title="Smiley crew 2-pack" price="$44.00" compareAt="$56.00" bg={SOCKS_COLORS.sunshine} />
          </div>
        </div>
      </section>

      <SocksFooter />
    </div>
  )
}

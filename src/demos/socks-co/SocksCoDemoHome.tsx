import { Link } from 'react-router-dom'
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

const CATEGORIES = ['Sneaker', 'Crew', 'No-show', 'Gift box', 'Kids']

export function SocksCoDemoHome() {
  return (
    <div className="socks-demo min-h-screen">
      <DemoChrome />
      <AnnouncementBar text="SIGN UP NOW AND GET 30% OFF YOUR FIRST PURCHASE! · FREE SHIPPING ON ORDERS OVER $49" />
      <SocksHeader />

      <section className="relative min-h-[min(78vh,760px)] overflow-hidden">
        <img
          src="/socks-home.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/40" />
        <div className="relative mx-auto flex min-h-[min(78vh,760px)] max-w-[1200px] flex-col items-center justify-center px-4 text-center text-white">
          <p className="socks-demo-display text-[clamp(2rem,6vw,4.5rem)] leading-[1.05]">
            Come &amp; See Our
            <br />
            Fabulous Feet!
          </p>
          <button
            type="button"
            className="mt-8 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold shadow-lg"
            style={{ backgroundColor: SOCKS_COLORS.sunshine, color: SOCKS_COLORS.ink }}
          >
            ▶
          </button>
        </div>
      </section>

      <WavyDivider fill={SOCKS_COLORS.cream} />

      <section className="relative px-4 py-16 sm:px-6" style={{ backgroundColor: SOCKS_COLORS.cream }}>
        <div className="socks-demo-squiggle mb-8" />
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className="rounded-full bg-white px-4 py-2 text-[12px] font-semibold shadow-sm"
              >
                {cat}
              </button>
            ))}
          </div>

          <h2 className="socks-demo-display text-[clamp(1.75rem,4vw,3rem)] text-[#2D3A8C]">
            New Collection
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <img src="/socks-home.png" alt="" className="h-full w-full object-cover object-[center_28%]" />
            </div>
            <ProductCard />
          </div>

          <div className="relative mt-16">
            <p className="socks-demo-bg-text absolute -top-8 left-0 text-[clamp(2.5rem,12vw,7rem)]">
              NEW COLLECTION
            </p>
            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCard key={i} bg={i % 2 ? SOCKS_COLORS.blossom : SOCKS_COLORS.sky} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <WavyDivider fill={SOCKS_COLORS.sky} />

      <section className="relative px-4 py-16 sm:px-6" style={{ backgroundColor: SOCKS_COLORS.sky }}>
        <div className="mx-auto max-w-[1200px]">
          <h2 className="socks-demo-display text-center text-[clamp(1.75rem,4vw,3rem)] text-[#2D3A8C]">
            Shop by Style
          </h2>
          <p className="mt-2 text-center text-[14px] text-gray-700">
            Find the pair that matches your mood.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {['Sneaker socks', 'Animal designs', 'Emoji designs'].map((style) => (
              <article
                key={style}
                className="socks-demo-card overflow-hidden rounded-3xl bg-white shadow-md"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/socks-home.png"
                    alt=""
                    className="h-full w-full object-cover object-center scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="socks-demo-display text-xl">{style}</h3>
                  <p className="mt-2 text-[13px] font-semibold text-[#9181D6]">Shop now →</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WavyDivider fill={SOCKS_COLORS.cream} />

      <section id="sale" className="px-4 py-16 sm:px-6" style={{ backgroundColor: SOCKS_COLORS.cream }}>
        <div className="mx-auto max-w-[1200px]">
          <h2 className="socks-demo-display text-[clamp(1.75rem,4vw,3rem)] text-[#2D3A8C]">On Sale</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <div
              className="flex min-h-[280px] flex-col justify-end rounded-3xl p-8 text-white shadow-lg"
              style={{ backgroundColor: '#FF7F50' }}
            >
              <p className="socks-demo-display text-4xl">Sale up to 30% off</p>
              <button
                type="button"
                className="mt-4 self-start rounded-full px-5 py-2 text-[13px] font-bold text-[#1B1B1F]"
                style={{ backgroundColor: SOCKS_COLORS.sunshine }}
              >
                Shop socks
              </button>
            </div>
            <div className="grid gap-5">
              <div
                className="rounded-3xl p-6 text-white shadow-lg"
                style={{ backgroundColor: '#FF7F50' }}
              >
                <p className="socks-demo-display text-2xl">Flash sale</p>
                <p className="mt-1 text-sm">Up to 70% off</p>
              </div>
              <Link
                to="/demo/socks-co/nike-collab"
                className="socks-demo-card block overflow-hidden rounded-3xl bg-white shadow-md"
              >
                <img src="/socks-collab.png" alt="" className="h-40 w-full object-cover object-top" />
                <div className="p-5">
                  <p className="font-bold">Limited Nike collab</p>
                  <p className="text-[13px] text-[#9181D6]">View drop →</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="gifts" className="px-4 py-16 sm:px-6" style={{ backgroundColor: SOCKS_COLORS.cream }}>
        <div className="mx-auto max-w-[1200px]">
          <h2 className="socks-demo-display text-center text-[clamp(1.5rem,3vw,2.5rem)]">
            SOCKS GIFT BOXES
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ProductCard title="Two Good Tote Bag" price="$40.00" compareAt="$52.00" bg={SOCKS_COLORS.blossom} />
            <ProductCard title="Holiday 3-Pack" price="$36.00" compareAt="$48.00" bg={SOCKS_COLORS.sunshine} />
          </div>
        </div>
      </section>

      <SocksFooter />
    </div>
  )
}

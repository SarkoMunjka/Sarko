import { Link, NavLink } from 'react-router-dom'
import { Heart, Search, ShoppingBag } from 'lucide-react'

export const SOCKS_COLORS = {
  grape: '#9181D6',
  sunshine: '#FFD23F',
  blossom: '#F4B7C7',
  sky: '#BFD9F2',
  cream: '#FBF4E6',
  ink: '#1B1B1F',
}

export function DemoChrome() {
  return (
    <div className="sticky top-0 z-[100] flex items-center justify-between gap-4 border-b border-black/10 bg-[#1a1a1a] px-4 py-2.5 text-white sm:px-6">
      <Link
        to="/projects/socks-co"
        className="text-[12px] font-medium text-white/80 transition-colors hover:text-white sm:text-[13px]"
      >
        ← Back to case study
      </Link>
      <p className="hidden text-center text-[12px] text-white/70 sm:block sm:text-[13px]">
        Socks &amp; Co. — interactive demo by Mark Studio
      </p>
      <span className="rounded-full bg-[#F26522] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide sm:text-[11px]">
        Live demo
      </span>
    </div>
  )
}

export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div
      className="overflow-hidden py-2 text-center text-[11px] font-semibold sm:text-[12px]"
      style={{ backgroundColor: SOCKS_COLORS.sunshine, color: SOCKS_COLORS.ink }}
    >
      <p className="animate-pulse">{text}</p>
    </div>
  )
}

export function SocksHeader() {
  return (
    <header className="sticky top-[41px] z-50 bg-white shadow-sm sm:top-[45px]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link to="/demo/socks-co" className="socks-demo-logo text-[#1B1B1F]">
          Socks &amp; Co.
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] font-semibold lg:flex">
          <NavLink to="/demo/socks-co" className="hover:text-[#9181D6]">
            Shop
          </NavLink>
          <a href="#sale" className="hover:text-[#9181D6]">
            Sale
          </a>
          <NavLink to="/demo/socks-co/nike-collab" className="hover:text-[#9181D6]">
            Limited editions
          </NavLink>
          <a href="#story" className="hover:text-[#9181D6]">
            Our story
          </a>
          <a href="#gifts" className="hover:text-[#9181D6]">
            Gifts
          </a>
          <a href="#blog" className="hover:text-[#9181D6]">
            Blog
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" aria-label="Search" className="rounded-full p-2 hover:bg-gray-100">
            <Search size={18} />
          </button>
          <button
            type="button"
            className="hidden rounded-full px-4 py-1.5 text-[12px] font-bold sm:inline-block"
            style={{ backgroundColor: SOCKS_COLORS.sunshine }}
          >
            Sign up
          </button>
          <button type="button" aria-label="Wishlist" className="rounded-full p-2 hover:bg-gray-100">
            <Heart size={18} />
          </button>
          <Link
            to="/demo/socks-co/cart"
            className="rounded-full p-2 hover:bg-gray-100"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export function WavyDivider({ fill }: { fill: string }) {
  return (
    <svg
      className="socks-demo-wavy-top block w-full"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill={fill}
        d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,80 L0,80 Z"
      />
    </svg>
  )
}

export function ProductCard({
  title = 'Midsummer Gift Box 3-Pack',
  price = '$12.12',
  compareAt = '$20.00',
  bg = '#BFD9F2',
}: {
  title?: string
  price?: string
  compareAt?: string
  bg?: string
}) {
  return (
    <article className="socks-demo-card overflow-hidden rounded-2xl bg-white shadow-md">
      <div className="aspect-square" style={{ backgroundColor: bg }}>
        <img
          src="/socks-home.png"
          alt=""
          className="h-full w-full object-cover object-[center_35%] opacity-90"
        />
      </div>
      <div className="p-4">
        <h3 className="text-[14px] font-semibold sm:text-[15px]">{title}</h3>
        <div className="mt-1 flex items-center gap-2 text-[12px] text-amber-500">
          ★★★★★
        </div>
        <p className="mt-2 text-[14px] font-bold">
          {price}{' '}
          <span className="font-normal text-gray-400 line-through">{compareAt}</span>
        </p>
      </div>
    </article>
  )
}

export function SocksFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="socks-demo-logo text-3xl">Socks &amp; Co.</p>
        </div>
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wide text-[#9181D6]">
            Support
          </h4>
          <ul className="mt-3 space-y-2 text-[13px] text-gray-600">
            <li>Women&apos;s socks</li>
            <li>Men&apos;s socks</li>
            <li>Kids</li>
            <li>Limited edition</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[12px] font-bold uppercase tracking-wide text-[#9181D6]">
            Company
          </h4>
          <ul className="mt-3 space-y-2 text-[13px] text-gray-600">
            <li>Our story</li>
            <li>FAQs</li>
            <li>Returns</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>

      <div
        className="mx-auto max-w-[1200px] rounded-3xl px-6 py-8 sm:mx-6"
        style={{ backgroundColor: SOCKS_COLORS.sky }}
      >
        <p className="socks-demo-display text-xl">15% OFF FOR NEW COMERS</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Your email"
            className="socks-demo-input flex-1"
          />
          <button
            type="button"
            className="rounded-full px-6 py-3 text-[13px] font-bold"
            style={{ backgroundColor: SOCKS_COLORS.sunshine }}
          >
            Subscribe
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden px-4 py-16 text-center">
        <p className="socks-demo-bg-text text-[clamp(3rem,18vw,10rem)]">LET&apos;S TALK</p>
        <p className="relative mt-6 text-[12px] text-gray-500">
          © Socks &amp; Co. 2024 · Demo experience by Mark Studio
        </p>
      </div>

      <div
        className="py-2 text-center text-[11px] font-semibold text-white"
        style={{ backgroundColor: SOCKS_COLORS.grape }}
      >
        FREE RETURNS · FREE WORLDWIDE SHIPPING · FREE RETURNS
      </div>
    </footer>
  )
}

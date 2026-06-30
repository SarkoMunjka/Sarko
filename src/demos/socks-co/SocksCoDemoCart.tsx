import { Link } from 'react-router-dom'
import {
  AnnouncementBar,
  DemoChrome,
  SOCKS_COLORS,
  SocksFooter,
  SocksHeader,
} from './shared'
import './socksCoDemo.css'

const STEPS = ['Delivery Details', 'Shipping Summary', 'Payment Method']

export function SocksCoDemoCart() {
  return (
    <div className="socks-demo min-h-screen">
      <DemoChrome />
      <AnnouncementBar text="SIGN UP NOW AND GET 10% OFF YOUR FIRST PURCHASE! · FREE SHIPPING ON ORDERS OVER $49" />
      <SocksHeader />

      <section className="px-4 py-10 sm:px-6" style={{ backgroundColor: SOCKS_COLORS.sky }}>
        <div className="mx-auto max-w-[1200px]">
          <h1 className="socks-demo-display text-[clamp(2.5rem,8vw,5rem)] text-[#3D4A66]">MY CART</h1>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6" style={{ backgroundColor: '#EEF5FF' }}>
        <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex flex-wrap gap-4">
              {STEPS.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center gap-2 text-[12px] font-bold sm:text-[13px] ${
                    index === 0 ? 'text-[#1B1B1F]' : 'text-gray-400'
                  }`}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[11px]"
                    style={{
                      backgroundColor: index === 0 ? SOCKS_COLORS.sunshine : '#E5E7EB',
                    }}
                  >
                    {index + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>

            <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              {[
                'Full name',
                'Last name',
                'Email',
                'Street address',
                'Town / City',
                'ZIP Code',
              ].map((label) => (
                <label key={label} className="block text-[12px] font-semibold text-gray-600">
                  {label}
                  <input className="socks-demo-input mt-1.5" placeholder={label} />
                </label>
              ))}
              <label className="block text-[12px] font-semibold text-gray-600 sm:col-span-2">
                Order notes
                <textarea
                  className="mt-1.5 w-full rounded-2xl border-2 border-black/10 bg-white p-3 text-[14px] outline-none focus:border-[#9181D6]"
                  rows={3}
                  placeholder="Optional notes for your order"
                />
              </label>
            </form>

            <button
              type="button"
              className="mt-6 w-full rounded-full py-4 text-[14px] font-bold"
              style={{ backgroundColor: SOCKS_COLORS.sunshine, color: SOCKS_COLORS.ink }}
            >
              → PROCEED TO SHIPPING SUMMARY
            </button>

            <div className="my-6 flex items-center gap-3 text-[12px] text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              OR
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              type="button"
              className="w-full rounded-full bg-[#1B1B1F] py-3 text-[13px] font-bold text-white"
            >
              Guest checkout
            </button>
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <p className="text-[12px] font-semibold text-gray-600">
              You&apos;re only $1.02 away from free shipping
            </p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[88%] rounded-full" style={{ backgroundColor: SOCKS_COLORS.sunshine }} />
            </div>

            <div className="mt-6 flex gap-4 border-b border-gray-100 pb-6">
              <img
                src="/socks-cart.png"
                alt=""
                className="h-20 w-20 rounded-xl object-cover object-top"
              />
              <div className="flex-1">
                <p className="font-semibold">Midsummer Gift Box 3-Pack — XS</p>
                <div className="mt-2 inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-[12px]">
                  Qty 2
                </div>
                <p className="mt-2 font-bold">$47.98</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <input className="socks-demo-input" placeholder="Coupon code" />
              <button type="button" className="rounded-full bg-gray-200 px-4 text-[12px] font-bold">
                Apply
              </button>
            </div>

            <dl className="mt-6 space-y-2 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-gray-500">Subtotal</dt>
                <dd className="font-semibold">$47.98</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Shipping</dt>
                <dd className="font-semibold">$10.00</dd>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-3 text-[16px]">
                <dt className="font-bold">Total</dt>
                <dd className="font-bold">$57.98</dd>
              </div>
            </dl>

            <Link
              to="/demo/socks-co"
              className="mt-6 block text-center text-[13px] font-semibold text-[#9181D6] hover:underline"
            >
              ← Continue shopping
            </Link>
          </aside>
        </div>
      </section>

      <div className="overflow-hidden rounded-t-3xl">
        <img src="/socks-cart.png" alt="" className="w-full object-cover object-top opacity-40" />
      </div>

      <SocksFooter />
    </div>
  )
}

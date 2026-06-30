import { Route, Routes } from 'react-router-dom'
import { SocksCoDemoCart } from './SocksCoDemoCart'
import { SocksCoDemoCollab } from './SocksCoDemoCollab'
import { SocksCoDemoHome } from './SocksCoDemoHome'

export function SocksCoDemoRoutes() {
  return (
    <Routes>
      <Route index element={<SocksCoDemoHome />} />
      <Route path="nike-collab" element={<SocksCoDemoCollab />} />
      <Route path="cart" element={<SocksCoDemoCart />} />
    </Routes>
  )
}

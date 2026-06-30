import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { CaseStudySocks } from './pages/CaseStudySocks'
import { CaseStudyNovaframe } from './pages/CaseStudyNovaframe'
import { SocksCoDemoRoutes } from './demos/socks-co'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/socks-co" element={<CaseStudySocks />} />
        <Route path="/projects/novaframe" element={<CaseStudyNovaframe />} />
        <Route path="/demo/socks-co/*" element={<SocksCoDemoRoutes />} />
      </Routes>
    </>
  )
}

export default App

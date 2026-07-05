import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { CaseStudySocks } from './pages/CaseStudySocks'
import { CaseStudyNovaframe } from './pages/CaseStudyNovaframe'
import { CaseStudyFadeCo } from './pages/CaseStudyFadeCo'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/socks-co" element={<CaseStudySocks />} />
        <Route path="/projects/fade-co" element={<CaseStudyFadeCo />} />
        <Route path="/projects/novaframe" element={<CaseStudyNovaframe />} />
      </Routes>
    </>
  )
}

export default App

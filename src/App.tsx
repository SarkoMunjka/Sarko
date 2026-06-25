import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { CaseStudySocks } from './pages/CaseStudySocks'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/socks-co" element={<CaseStudySocks />} />
      </Routes>
    </>
  )
}

export default App

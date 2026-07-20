import { Routes, Route } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { ForestWhisperPage } from './pages/ForestWhisperPage'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<CaseStudyPage />} />
        <Route path="/work-demos/forest-whisper" element={<ForestWhisperPage />} />
      </Routes>
    </>
  )
}

export default App

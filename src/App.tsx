import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'
import { Home } from './pages/Home'
import { Chapters } from './pages/Chapters'
import { ChapterPage } from './pages/ChapterPage'
import { Lab } from './pages/Lab'
import { Gates } from './pages/Gates'
import { Errors } from './pages/Errors'
import { Toolkit } from './pages/Toolkit'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/knowledge" element={<Navigate to="/chapters" replace />} />
            <Route path="/chapter/:slug" element={<ChapterPage />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/gates" element={<Gates />} />
            <Route path="/errors" element={<Errors />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import IdeaInput from './pages/IdeaInput'
import ReportDashboard from './pages/ReportDashboard'
import CompetitorRadar from './pages/CompetitorRadar'
import ScoreBreakdown from './pages/ScoreBreakdown'
import Export from './pages/Export'
import BusinessAnalysis from './pages/BusinessAnalysis' // New route
import { getReportById } from './api/reports'
import LoadingOverlay from './components/LoadingOverlay'
import { AppProvider, useApp } from './context/AppContext'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppContent() {
  const location = useLocation()
  const { reportData, setReportData, reportId, setReportId, ideaText, setIdeaText, loading, setLoading } = useApp()

  useEffect(() => {
    const checkPermanentLink = async () => {
      const match = location.pathname.match(/\/report\/([a-f0-9-]{36})/)
      if (match && !reportData) {
        const reportIdFromUrl = match[1]
        setLoading(true)
        try {
          const report = await getReportById(reportIdFromUrl)
          if (report) {
            setReportData(report.data)
            setReportId(reportIdFromUrl)
            setIdeaText(report.idea)
          }
        } catch (err) {
          console.error('Failed to load permanent link:', err)
        } finally {
          setLoading(false)
        }
      }
    }

    checkPermanentLink()
  }, [location.pathname, reportData, setLoading, setReportData, setIdeaText])

  return (
    <>
      <div className="mesh-bg fixed inset-0 pointer-events-none z-[-1]" />
      <ScrollToTop />
      <LoadingOverlay visible={loading} />
      
      <Routes location={location}>
          <Route
            path="/"
            element={
              <IdeaInput
                onReport={(data, idea) => {
                  setReportData(data)
                  setIdeaText(idea)
                }}
              />
            }
          />
          <Route path="/report" element={reportData ? <ReportDashboard data={reportData} idea={ideaText} /> : <Navigate to="/" replace />} />
          <Route path="/report/:id" element={reportData ? <ReportDashboard data={reportData} idea={ideaText} /> : loading ? <LoadingOverlay visible={true} /> : <Navigate to="/" replace />} />
          <Route path="/dashboard" element={reportData ? <ReportDashboard data={reportData} idea={ideaText} /> : <Navigate to="/" replace />} />
          <Route path="/analysis" element={reportData ? <BusinessAnalysis data={reportData} /> : <Navigate to="/" replace />} />
          <Route path="/reports" element={reportData ? <ReportDashboard data={reportData} idea={ideaText} /> : <Navigate to="/" replace />} />
          <Route path="/radar" element={reportData ? <CompetitorRadar data={reportData} /> : <Navigate to="/" replace />} />
          <Route path="/breakdown" element={reportData ? <ScoreBreakdown data={reportData} idea={ideaText} /> : <Navigate to="/" replace />} />
          <Route path="/export" element={reportData ? <Export data={reportData} idea={ideaText} /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  )
}

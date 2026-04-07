import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [reportData, setReportData] = useState(null)
  const [reportId, setReportId] = useState('')
  const [ideaText, setIdeaText] = useState('')
  const [loading, setLoading] = useState(false)

  const value = {
    reportData,
    setReportData,
    reportId,
    setReportId,
    ideaText,
    setIdeaText,
    loading,
    setLoading
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

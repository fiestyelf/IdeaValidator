import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  BarChart3,
  Radar,
  Download,
  Briefcase,
  Plus,
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { to: '/report',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analysis',  icon: Briefcase,       label: 'Business'  },
  { to: '/breakdown', icon: BarChart3,        label: 'Scores'    },
  { to: '/radar',     icon: Radar,            label: 'Radar'     },
  { to: '/export',    icon: Download,         label: 'Export'    },
]

export default function SidebarNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { setReportData, setReportId, setIdeaText } = useApp()

  function handleNewIdea() {
    setReportData(null)
    setReportId(null)
    setIdeaText('')
    navigate('/')
  }

  return (
    <>
      {/* ── Floating New Analysis button ── */}
      <button
        onClick={handleNewIdea}
        title="New Analysis"
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 14px 8px 10px',
          background: 'var(--white)',
          color: 'var(--black)',
          border: 'none',
          borderRadius: '9999px',
          cursor: 'pointer',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          transition: 'transform 0.15s ease, opacity 0.15s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <Plus size={13} strokeWidth={2.5} />
        New idea
      </button>

      {/* ── Bottom Nav ── */}
      <nav
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 50,
          display: 'flex', alignItems: 'center',
          height: '64px',
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* IV logo — home link */}
        <button
          onClick={handleNewIdea}
          title="Validate a new idea"
          style={{
            flexShrink: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '3px',
            width: '64px', height: '100%',
            background: 'none', border: 'none', cursor: 'pointer',
            borderRight: '1px solid var(--border)',
            padding: 0,
          }}
        >
          <div style={{
            width: '28px', height: '28px',
            borderRadius: '6px',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="/src/assets/logo.png" alt="IdeaValidator Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--gray-5)' }}>
            New
          </span>
        </button>

        {/* Report nav items */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
          {navItems.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to
            return (
              <NavLink
                key={to}
                to={to}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '3px',
                  height: '100%',
                  textDecoration: 'none',
                  color: isActive ? 'var(--white)' : 'var(--gray-5)',
                  transition: 'color 0.2s',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0, width: '32px', height: '2px',
                      background: 'var(--white)',
                      borderRadius: '0 0 2px 2px',
                    }}
                  />
                )}
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {label}
                </span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </>
  )
}

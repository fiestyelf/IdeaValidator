import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Loader2, TrendingUp, Layers, PenLine, Cpu, LayoutDashboard } from 'lucide-react'
import LoadingOverlay from '../components/LoadingOverlay'
import { analyzeIdea } from '../api/claude'
import { saveReport } from '../api/reports'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { MOCK_ANALYSIS_DATA } from '../data/mockAnalysis'

const exampleIdea = `A neural computing mesh that utilizes globally distributed silicon to power high-density AI simulations. This platform addresses the compute-as-a-commodity shift by creating an elastic, low-latency marketplace for frontier models.`

/* ============================================================
   ISOMETRIC WIREFRAME — Layer9-style stacked layers
   Pure SVG, no external assets
   ============================================================ */
function IsoLayers() {
  return (
    <div className="relative w-full flex items-center justify-center py-6 select-none pointer-events-none">
      <svg
        viewBox="0 0 420 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[420px]"
        aria-hidden="true"
      >
        {/* ── Layer 3 (bottom) ── */}
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <polygon
            points="210,220 60,150 210,80 360,150"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          {/* vertical edges */}
          <line x1="60" y1="150" x2="60" y2="185" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="360" y1="150" x2="360" y2="185" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="210" y1="220" x2="210" y2="255" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          {/* bottom face */}
          <polygon
            points="210,255 60,185 210,115 360,185"
            fill="rgba(255,255,255,0.015)"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
          {/* corner dots */}
          <circle cx="60" cy="150" r="3" fill="rgba(255,255,255,0.2)" />
          <circle cx="360" cy="150" r="3" fill="rgba(255,255,255,0.2)" />
          <circle cx="210" cy="80" r="3" fill="rgba(255,255,255,0.2)" />
          <circle cx="210" cy="220" r="3" fill="rgba(255,255,255,0.2)" />
        </motion.g>

        {/* ── Layer 2 (middle) ── */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <polygon
            points="210,168 92,112 210,56 328,112"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1"
          />
          <line x1="92" y1="112" x2="92" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="328" y1="112" x2="328" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="210" y1="168" x2="210" y2="186" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <polygon
            points="210,186 92,130 210,74 328,130"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          {/* Connector bracket marks */}
          <rect x="96" y="107" width="10" height="10" rx="1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <rect x="314" y="107" width="10" height="10" rx="1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <circle cx="92" cy="112" r="2.5" fill="rgba(167,139,250,0.5)" />
          <circle cx="328" cy="112" r="2.5" fill="rgba(167,139,250,0.5)" />
        </motion.g>

        {/* ── Layer 1 (top) ── */}
        <motion.g
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <polygon
            points="210,118 124,76 210,34 296,76"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.20)"
            strokeWidth="1.2"
          />
          {/* Hanging threads (like Layer9 screws/pins) */}
          <line x1="210" y1="0" x2="210" y2="34" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="124" y1="40" x2="124" y2="76" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="296" y1="40" x2="296" y2="76" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />

          <line x1="124" y1="76" x2="124" y2="93" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <line x1="296" y1="76" x2="296" y2="93" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <line x1="210" y1="118" x2="210" y2="135" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <polygon
            points="210,135 124,93 210,51 296,93"
            fill="rgba(255,255,255,0.025)"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />

          {/* Center logo mark */}
          <image
            href="/logo.png"
            x="195" y="62"
            width="30" height="30"
            opacity="0.95"
          />

          {/* Corner accent dots — cyan */}
          <circle cx="124" cy="76" r="3" fill="rgba(167,139,250,0.6)" />
          <circle cx="296" cy="76" r="3" fill="rgba(167,139,250,0.6)" />
          <circle cx="210" cy="34" r="3" fill="white" opacity="0.8" />
          <circle cx="210" cy="118" r="3" fill="rgba(167,139,250,0.4)" />
        </motion.g>

        {/* ── Floating accent — top right ── */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <polygon points="390,60 370,48 390,36 410,48" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <polygon points="390,80 370,68 390,56 410,68" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="370" y1="68" x2="370" y2="48" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="410" y1="68" x2="410" y2="48" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="390" y1="80" x2="390" y2="60" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
        </motion.g>

        {/* ── Floating accent — left ── */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <polygon points="30,120 10,108 30,96 50,108" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <polygon points="30,140 10,128 30,116 50,128" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="10" y1="128" x2="10" y2="108" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="50" y1="128" x2="50" y2="108" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="30" y1="140" x2="30" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </motion.g>
      </svg>
    </div>
  )
}

export default function IdeaInput({ onReport }) {
  const navigate = useNavigate()
  const { setReportId } = useApp()
  const [idea, setIdea] = useState('')
  const [market, setMarket] = useState('')
  const [competitors, setCompetitors] = useState('')
  const [includeTrends, setIncludeTrends] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleDemo = () => {
    onReport(MOCK_ANALYSIS_DATA, 'AI-powered distributed compute marketplace for frontier model inference')
    navigate('/report')
  }

  const handleAnalyze = async () => {
    if (!idea.trim()) {
      setError('Please describe your business idea to begin analysis.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const data = await analyzeIdea({ idea, market, competitors, includeTrends })
      onReport(data, idea)
      navigate('/report')
      saveReport({ reportData: data, ideaText: idea })
        .then(reportId => {
          setReportId(reportId)
          window.history.replaceState(null, '', `/report/${reportId}`)
        })
        .catch(err => {
          console.warn('Could not save permanent link (backend may be offline):', err)
        })
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--black)' }}>
      <LoadingOverlay visible={loading} />

      {/* ── Nav ── */}
      <nav className="l9-nav">
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none' }}>
          {/* Monogram mark — matches Layer9 logo style */}
          <div style={{
            width: '32px', height: '32px',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img src="/logo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600, fontSize: '15px',
            color: 'var(--white)', letterSpacing: '-0.02em'
          }}>IdeaValidator</span>
        </a>

      </nav>

      {/* ── Hero ── */}
      <main style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '80px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>

        {/* Isometric wireframe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', maxWidth: '380px', marginBottom: '1rem' }}
        >
          <IsoLayers />
        </motion.div>

        {/* Headline — Layer9 style: large, sentence-case, mixed weight */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            color: 'var(--white)',
            marginBottom: '1.25rem',
          }}
        >
          Validate your idea.<br />
          <span style={{ color: 'var(--gray-3)', fontWeight: 500 }}>
            With real market intelligence.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{
            fontSize: '1.0625rem',
            color: 'var(--gray-4)',
            lineHeight: 1.65,
            maxWidth: '480px',
            marginBottom: '1.5rem',
          }}
        >
          Surface demand signals, competitive gaps, and viability scores before
          you write a single ad — so your budget goes where the market already wants to go.
        </motion.p>

        {/* Demo CTA */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          onClick={handleDemo}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '2rem',
            padding: '0.625rem 1.25rem',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: '999px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--white)',
            letterSpacing: '-0.01em',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.10)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--cyan)', flexShrink: 0,
            boxShadow: '0 0 6px var(--cyan)',
          }} />
          View sample report →
        </motion.button>

        {/* ── Input card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          style={{ width: '100%', textAlign: 'left' }}
        >
          <div className="l9-card" style={{ padding: '2rem' }}>

            {/* Main idea textarea */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="text-label" style={{ display: 'block', marginBottom: '0.625rem' }}>
                Your idea
              </label>
              <textarea
                id="idea-input"
                className="l9-input l9-textarea"
                value={idea}
                onChange={e => {
                  setIdea(e.target.value);
                  if (error) setError('');
                }}
                placeholder={exampleIdea}
                maxLength={1000}
              />
              <div style={{
                textAlign: 'right',
                fontSize: '0.6875rem',
                color: idea.length > 900 ? '#f59e0b' : 'var(--gray-5)',
                marginTop: '0.4rem',
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'opacity 0.2s, color 0.2s',
                opacity: idea.length > 0 ? 1 : 0,
                height: '14px',
              }}>
                {idea.length} / 1000
              </div>
            </div>

            {/* Market + Competitors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Market / sector
                </label>
                <input
                  id="market-input"
                  className="l9-input"
                  value={market}
                  onChange={e => setMarket(e.target.value)}
                  placeholder="e.g. Neural infrastructure"
                />
              </div>
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                  Key competitors
                </label>
                <input
                  id="competitors-input"
                  className="l9-input"
                  value={competitors}
                  onChange={e => setCompetitors(e.target.value)}
                  placeholder="e.g. CoreWeave, Lambda"
                />
              </div>
            </div>

            {/* Toggles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {/* Trends toggle */}
              <div className="l9-card-inner" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.875rem 1rem', cursor: 'pointer'
              }}
                onClick={() => setIncludeTrends(v => !v)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <TrendingUp size={16} style={{ color: includeTrends ? 'var(--cyan)' : 'var(--gray-5)' }} />
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--white)' }}>
                      Market trends
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--gray-5)' }}>
                      {loading && includeTrends ? 'Retrieving web context...' : 'Live signal injection'}
                    </div>
                  </div>
                </div>
                <label className="toggle" onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={includeTrends} onChange={e => setIncludeTrends(e.target.checked)} />
                  <span className="toggle-slider" />
                </label>
              </div>

              {/* Coming soon */}
              <div className="l9-card-inner" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.875rem 1rem', opacity: 0.4, cursor: 'not-allowed'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <Layers size={16} style={{ color: 'var(--gray-5)' }} />
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gray-4)' }}>
                      Neural mapping
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--gray-5)' }}>
                      Coming soon
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA — pill button */}
            <button
              id="analyze-btn"
              className="btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 700 }}
              onClick={handleAnalyze}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Start analysis
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={{
                    marginTop: '1rem',
                    padding: '0.875rem 1rem',
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    color: '#fca5a5',
                    textAlign: 'center',
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>


        {/* ── Process Flow ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            alignItems: 'start',
            gap: '1rem',
            marginTop: '5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Step 1 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '42px', height: '42px',
              margin: '0 auto 1.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--white)',
              background: 'var(--black-2)',
            }}>
              <PenLine size={18} />
            </div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.5rem' }}>
              Describe
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--gray-5)', lineHeight: 1.5 }}>
              Input your concept and market details.
            </p>
          </div>

          {/* Connector 1 */}
          <div style={{ paddingTop: '20px', opacity: 0.15 }}>
            <div style={{ width: '60px', height: '1px', borderTop: '1px dashed var(--white)' }} />
          </div>

          {/* Step 2 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '42px', height: '42px',
              margin: '0 auto 1.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--white)',
              background: 'var(--black-2)',
              boxShadow: '0 0 20px rgba(167,139,250,0.03)',
            }}>
              <Cpu size={18} style={{ color: 'var(--cyan)' }} />
            </div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.5rem' }}>
              Analyze
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--gray-5)', lineHeight: 1.5 }}>
              Engines scan 40k+ live market signals.
            </p>
          </div>

          {/* Connector 2 */}
          <div style={{ paddingTop: '20px', opacity: 0.15 }}>
            <div style={{ width: '60px', height: '1px', borderTop: '1px dashed var(--white)' }} />
          </div>

          {/* Step 3 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '42px', height: '42px',
              margin: '0 auto 1.25rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: 'var(--white)',
              background: 'var(--black-2)',
            }}>
              <LayoutDashboard size={18} />
            </div>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.5rem' }}>
              Get report
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--gray-5)', lineHeight: 1.5 }}>
              Receive a complete strategic report.
            </p>
          </div>
        </motion.div>

        {/* ── Performance marketing context ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{ width: '100%', marginTop: '4rem' }}
        >
          {/* Section label */}
          <div className="text-label" style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
            Why validate before spending
          </div>

          {/* Three ideology cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
            {[
              {
                icon: '◎',
                title: 'Spend where demand exists',
                body: 'Meta and Google ads burn money on weak demand signals. Validate that people actively want your idea before setting a budget or writing a single creative.'
              },
              {
                icon: '⌗',
                title: 'Sharpen your creative brief',
                body: 'Understanding competitive gaps and market positioning informs stronger hooks, angles, and copy — the foundation of any high-performing ad campaign.'
              },
              {
                icon: '◈',
                title: 'Ground SEO in real intent',
                body: 'GA4 and Search Console show you what people searched. This tool surfaces whether your idea aligns with that intent before you build content or a landing page around it.'
              },
            ].map(card => (
              <div key={card.title} className="l9-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
                <div style={{
                  fontSize: '1.25rem',
                  color: 'var(--cyan)',
                  marginBottom: '0.875rem',
                  opacity: 0.8,
                }}>
                  {card.icon}
                </div>
                <h3 style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--white)',
                  marginBottom: '0.625rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.3,
                }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray-5)', lineHeight: 1.65, margin: 0 }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          {/* Ideology block */}
          <div className="l9-card" style={{ padding: '2rem', textAlign: 'left', borderColor: 'rgba(167,139,250,0.12)' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{
                flexShrink: 0,
                width: '36px', height: '36px',
                background: 'rgba(167,139,250,0.08)',
                border: '1px solid rgba(167,139,250,0.2)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '14px', color: 'var(--cyan)' }}>↗</span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '1rem', fontWeight: 600,
                  color: 'var(--white)', marginBottom: '0.625rem',
                  letterSpacing: '-0.02em',
                }}>
                  The idea behind IdeaValidator
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-4)', lineHeight: 1.7, margin: 0 }}>
                  Performance marketing works best when you're pushing a concept the market already has latent demand for.
                  IdeaValidator exists to run that check — before you invest in creatives, campaigns, or an SEO strategy.
                  It pulls competitive signals, demand data, and viability scores through Claude's reasoning engine so you
                  can make a go / no-go call grounded in evidence, not intuition.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  )
}

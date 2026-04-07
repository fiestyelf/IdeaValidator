import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { Download, RefreshCw, TrendingUp, Cpu, Globe, Share2, Check, MoveRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'
import SidebarNav from '../components/SidebarNav'
import ScoreRing from '../components/ScoreRing'
import Toast from '../components/Toast'

function CustomBarIcon({ size, strokeWidth }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

const metricIcons = {
  monthlySearchVolume: Globe,
  numCompetitors: Cpu,
  avgCompetitorDA: CustomBarIcon,
  trendDirection: TrendingUp,
  timeToMVP: Cpu,
}

const metricLabels = {
  monthlySearchVolume: 'Monthly searches',
  numCompetitors: 'Competitors',
  avgCompetitorDA: 'Rival strength',
  trendDirection: 'Market velocity',
  timeToMVP: 'Time to MVP',
}

function getScoreStatus(score) {
  if (score >= 70) return 'Strong signal'
  if (score >= 50) return 'Moderate signal'
  return 'Needs attention'
}

function getScoreColor(score) {
  if (score >= 70) return { text: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' }
  if (score >= 50) return { text: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' }
  return { text: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' }
}

function getVerdict(data) {
  const score = data.overallScore || 0
  const competitive = data.competitiveScore || data.metrics?.competitiveAdvantage || 0
  const timing = data.timingScore || data.metrics?.timingToMarket || 0
  const feasibility = data.feasibilityScore || data.metrics?.executionFeasibility || 0

  if (score >= 75) {
    if (competitive < 50) return { label: 'Build it — but move fast.', detail: 'Strong market demand, but competitive pressure is rising. First-mover advantage is your primary lever right now.' }
    return { label: 'Strong opportunity. Proceed.', detail: 'Fundamentals are solid across demand, timing, and feasibility. Recommended path: secure 3–5 pilot customers before public launch.' }
  }
  if (score >= 55) {
    if (feasibility < 55) return { label: 'Validate before building.', detail: 'Market signal is promising but execution complexity is high. De-risk by scoping an MVP to the single highest-value use case.' }
    if (timing < 55) return { label: 'Right idea, wrong moment.', detail: 'Market conditions aren\'t optimal yet. Use this window to build in stealth and position for launch in 6–12 months.' }
    return { label: 'Promising — niche down first.', detail: 'Broad market entry carries risk. Recommended path: dominate one underserved segment before expanding.' }
  }
  return { label: 'High risk — pivot required.', detail: 'Current signal doesn\'t support a full build. Identify the weakest score above and redesign the core value proposition around it.' }
}

/* Shared card style */
const card = {
  background: 'var(--black-2)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
}

/* Small muted label */
function Label({ children, style = {} }) {
  return (
    <span style={{
      fontSize: '11px', fontWeight: 600,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      color: 'var(--gray-4)',
      ...style
    }}>
      {children}
    </span>
  )
}

export default function ReportDashboard({ data, idea }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const originalTitle = document.title
    if (idea) {
      const displayIdea = idea.length > 40 ? idea.slice(0, 40) + '…' : idea;
      document.title = `Analysis: ${displayIdea} — IdeaValidator`;
    }
    return () => { document.title = originalTitle }
  }, [idea])

  const ideaTitle = idea?.length > 80 
    ? idea.slice(0, 80).split(' ').slice(0, -1).join(' ') + '…' 
    : idea;

  const handleShare = () => {
    const url = window.location.origin + `/report/${id}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const metricsEntries = Object.entries(data.keyMetrics || {})
  const trendChartData = data.trendRadar?.monthlyData?.map((val, i) => ({
    month: `M${i + 1}`,
    value: val
  })) || []

  const scoreColor = getScoreColor(data.overallScore)

  return (
    <div style={{ display: 'flex', background: 'var(--black)', minHeight: '100vh' }}>
      <SidebarNav idea={idea} />

      <div style={{ flex: 1, minHeight: '100vh', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ padding: '3rem 2.5rem 6rem', maxWidth: '1200px', margin: '0 auto' }}
        >
          {/* ── Page header ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <Label style={{ display: 'block', marginBottom: '0.5rem' }}>
                Intelligence center / report
              </Label>
              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--white)',
                lineHeight: 1.08,
              }}>
                Intelligence synthesis.
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
                style={{ gap: '0.5rem', fontSize: '0.8125rem', padding: '0.625rem 1.25rem' }}
              >
                <RefreshCw size={15} />
                New idea
              </button>
              <button
                onClick={handleShare}
                className="btn-secondary"
                style={{ gap: '0.5rem', fontSize: '0.8125rem', padding: '0.625rem 1.25rem' }}
              >
                {copied ? <Check size={15} /> : <Share2 size={15} />}
                {copied ? 'Copied' : 'Share'}
              </button>
              <button
                onClick={() => navigate('/export')}
                className="btn-primary"
                style={{ gap: '0.5rem', fontSize: '0.8125rem', padding: '0.625rem 1.25rem' }}
              >
                <Download size={15} />
                Export
              </button>
            </div>
          </div>

          {/* ── Verdict ── */}
          {(() => {
            const verdict = getVerdict(data)
            const sc = getScoreColor(data.overallScore)
            return (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  ...card,
                  padding: '1.5rem 1.75rem',
                  marginBottom: '1rem',
                  borderColor: sc.border,
                  background: sc.bg,
                  borderLeftWidth: '3px',
                  borderLeftColor: sc.text,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.375rem' }}>
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: sc.text, flexShrink: 0,
                    boxShadow: `0 0 8px ${sc.text}`,
                  }} />
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: sc.text, fontFamily: "'Space Grotesk', sans-serif" }}>
                    Should you build this?
                  </span>
                </div>
                <p style={{ fontSize: '1.0625rem', fontWeight: 800, color: sc.text, fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 0.375rem 0', lineHeight: 1.3 }}>
                  {verdict.label}
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--gray-3)', margin: 0, lineHeight: 1.55 }}>
                  {verdict.detail}
                </p>
              </motion.div>
            )
          })()}

          {/* ── Score + Radar ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
            {/* Score ring */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ ...card, padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', position: 'relative', overflow: 'hidden' }}
            >
              <div className="scaffold-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />
              <ScoreRing score={data.overallScore} size={160} />
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600, fontSize: '1rem',
                  color: 'var(--white)', marginBottom: '0.625rem',
                }}>Viability score</div>
                <span style={{
                  display: 'inline-block',
                  padding: '0.3rem 0.875rem',
                  background: scoreColor.bg,
                  border: `1px solid ${scoreColor.border}`,
                  borderRadius: '9999px',
                  fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: scoreColor.text,
                }}>
                  {getScoreStatus(data.overallScore)}
                </span>
              </div>
            </motion.div>

            {/* Radar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ ...card, padding: '1.75rem', position: 'relative' }}
            >
              <Label style={{ display: 'block', marginBottom: '1rem' }}>
                6-point potential map
              </Label>
              <div style={{ width: '100%', height: '280px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={[
                    { subject: 'Demand',  score: data.marketDemandScore  || 0 },
                    { subject: 'Rivalry', score: data.competitiveScore   || 0 },
                    { subject: 'Build',   score: data.feasibilityScore   || 0 },
                    { subject: 'Revenue', score: data.monetizationScore  || 0 },
                    { subject: 'Fit',     score: data.founderFitScore    || 0 },
                    { subject: 'Timing',  score: data.timingScore        || 0 },
                  ]}>
                    <PolarGrid stroke="rgba(255,255,255,0.06)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--gray-4)', fontSize: 11, fontWeight: 600 }} />
                    <Radar name="Score" dataKey="score" stroke="rgba(255,255,255,0.5)" fill="rgba(255,255,255,0.06)" strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* ── Executive Summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ ...card, padding: '2rem', marginBottom: '1rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <Label style={{ display: 'block', marginBottom: '0.5rem' }}>Strategic synthesis</Label>
                <p style={{
                  margin: 0,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600, fontSize: '1rem',
                  color: 'var(--gray-3)',
                  fontStyle: 'italic',
                }}>"{ideaTitle}"</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <span style={{
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: '9999px',
                  color: 'var(--gray-3)',
                }}>
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
            <p style={{
              margin: 0,
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: 'var(--gray-2)',
              borderLeft: '2px solid var(--border-bright)',
              paddingLeft: '1.25rem',
            }}>
              {data.executiveSummary}
            </p>
          </motion.div>

          {/* ── Pivots + Chart ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            {/* Pivot suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ ...card, padding: '1.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <RefreshCw size={15} style={{ color: 'var(--gray-4)' }} />
                <Label>Adaptive pivots</Label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
  {data.pivotSuggestions && data.pivotSuggestions.length > 0 ? (
    data.pivotSuggestions.map((p, i) => (
      <div key={i} style={{
        display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
        padding: '0.875rem 1rem',
        background: 'var(--black-3)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        transition: 'border-color 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <MoveRight size={15} style={{ color: 'var(--gray-5)', marginTop: '2px', flexShrink: 0 }} />
        <span style={{ fontSize: '0.875rem', color: 'var(--gray-2)', lineHeight: 1.55 }}>
          {p}
        </span>
      </div>
    ))
  ) : (
    <div style={{
      padding: '2rem 1.5rem',
      background: 'rgba(255,255,255,0.02)',
      border: '1px dashed var(--border)',
      borderRadius: '8px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem'
    }}>
      <Check size={24} style={{ color: 'var(--cyan)', opacity: 0.5 }} />
      <span style={{ fontSize: '0.8125rem', color: 'var(--gray-4)', lineHeight: 1.5, maxWidth: '240px' }}>
        Architecture verified as optimal; no defensive pivots required for high-scoring models.
      </span>
    </div>
  )}
</div>
            </motion.div>

            {/* Trend chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ ...card, padding: '1.75rem', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <TrendingUp size={15} style={{ color: 'var(--gray-4)' }} />
                  <Label>Market momentum</Label>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: 600, letterSpacing: '0.04em',
                  padding: '0.2rem 0.625rem',
                  background: 'var(--black-4)',
                  border: '1px solid var(--border)',
                  borderRadius: '9999px',
                  color: 'var(--gray-4)',
                }}>
                  {data.trendRadar?.status || 'Live scan'}
                </span>
              </div>
              <div style={{ flex: 1, minHeight: '240px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendChartData}>
                    <defs>
                      <linearGradient id="cvWhite" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgba(255,255,255,0.15)" />
                        <stop offset="95%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" hide />
                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--black-3)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'var(--white)',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                      itemStyle={{ color: 'var(--gray-2)' }}
                    />
                    <Area
                      type="monotone"
                      strokeWidth={2}
                      dataKey="value"
                      stroke="rgba(255,255,255,0.5)"
                      fill="url(#cvWhite)"
                      animationDuration={1800}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* ── Raw Metrics ── */}
          <div style={{ marginTop: '1.5rem' }}>
            <Label style={{ display: 'block', marginBottom: '1rem', textAlign: 'center' }}>
              Raw metrics
            </Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
              {metricsEntries.map(([key, value], i) => {
                const Icon = metricIcons[key] || Globe
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="magnetic-card"
                    style={{
                      ...card,
                      padding: '1.5rem 1.25rem',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', textAlign: 'center', gap: '0.625rem',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >
                    <div style={{
                      width: '36px', height: '36px',
                      background: 'var(--black-4)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--gray-3)',
                    }}>
                      <Icon size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--gray-5)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                        {metricLabels[key] || key}
                      </div>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.25rem', fontWeight: 700,
                        letterSpacing: '-0.03em', color: 'var(--white)',
                      }}>
                        {value}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <Toast visible={copied} message="Link copied to clipboard" />
    </div>
  )
}

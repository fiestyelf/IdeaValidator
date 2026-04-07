import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const steps = [
  'Initializing analysis engine...',
  'Ingesting market context...',
  'Identifying competitor gaps...',
  'Synthesizing opportunity score...',
  'Finalizing intelligence report...',
]

export default function LoadingOverlay({ visible }) {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (!visible) { setStepIndex(0); return }
    const interval = setInterval(() => {
      setStepIndex(i => (i + 1) % steps.length)
    }, 2400)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(10,10,10,0.92)',
            backdropFilter: 'blur(24px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 22, stiffness: 120 }}
            style={{ width: '100%', maxWidth: '400px', padding: '0 1.5rem', textAlign: 'center' }}
          >
            {/* Animated logo mark */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '56px', height: '56px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: '20px',
                  color: 'var(--white)', letterSpacing: '-0.04em',
                  animation: 'none',
                  display: 'block',
                  transform: 'rotate(0deg)',
                  /* counter-rotate to keep text upright */
                  willChange: 'transform',
                }}>IV</span>
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: '-6px',
                    border: '1px dashed rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                  }}
                />
              </motion.div>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.625rem', fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--white)',
              marginBottom: '0.5rem',
            }}>
              Analyzing your idea
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-4)', marginBottom: '2rem' }}>
              AI-driven market validation engine
            </p>

            {/* Steps card */}
            <div style={{
              background: 'var(--black-2)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Progress bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0,
                height: '2px',
                background: 'var(--white)',
                borderRadius: '0 2px 2px 0',
                width: `${((stepIndex + 1) / steps.length) * 100}%`,
                transition: 'width 0.6s ease',
                opacity: 0.7,
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {steps.map((step, i) => {
                  const isDone = i < stepIndex
                  const isCurrent = i === stepIndex
                  return (
                    <motion.div
                      key={step}
                      animate={{
                        opacity: isDone ? 0.25 : isCurrent ? 1 : 0.08,
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                      {/* Step indicator */}
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '50%',
                        flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isDone
                          ? 'rgba(255,255,255,0.06)'
                          : isCurrent
                          ? 'var(--white)'
                          : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isCurrent ? 'var(--white)' : 'var(--border)'}`,
                        fontSize: '10px', fontWeight: 700,
                        color: isCurrent ? 'var(--black)' : 'var(--gray-4)',
                        transition: 'all 0.4s',
                      }}>
                        {isDone ? <CheckCircle2 size={12} /> : i + 1}
                      </div>
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: isCurrent ? 600 : 400,
                        color: isCurrent ? 'var(--white)' : 'var(--gray-4)',
                        letterSpacing: '-0.01em',
                      }}>
                        {step}
                      </span>
                      {isCurrent && (
                        <motion.div
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                          style={{
                            marginLeft: 'auto', width: '5px', height: '5px',
                            borderRadius: '50%',
                            background: 'var(--white)',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <p style={{ marginTop: '1.5rem', fontSize: '11px', color: 'var(--gray-5)', letterSpacing: '0.04em' }}>
              ANALYZING SIGNALS FROM 40K+ VARIABLES
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

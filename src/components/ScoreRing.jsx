import { useEffect, useRef } from 'react'

const getScoreColor = (score) => {
  if (score <= 40) return 'hsl(0, 84%, 60%)' // Red
  if (score <= 69) return 'hsl(38, 92%, 50%)' // Amber
  return 'hsl(142, 71%, 45%)' // Emerald
}

const getScoreLabel = (score) => {
  if (score <= 40) return 'Weak'
  if (score <= 69) return 'Moderate'
  return 'Strong'
}

export default function ScoreRing({ score = 0, size = 120, label = '', status = '' }) {
  const circleRef = useRef(null)
  const strokeWidth = size * 0.08
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const color = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)

  useEffect(() => {
    if (!circleRef.current) return
    const offset = circumference - (score / 100) * circumference
    circleRef.current.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
    circleRef.current.style.strokeDashoffset = offset
  }, [score, circumference])

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative group" 
        style={{ width: size, height: size }}
      >
        {/* Glow Layer */}
        <div 
          className="absolute inset-0 rounded-full blur-[20px] opacity-20 transition-opacity duration-1000"
          style={{ background: color }}
        />
        
        <svg 
          width={size} 
          height={size} 
          className="-rotate-90 transform relative z-10"
        >
          {/* Base Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            className="stroke-white/[0.03]"
            strokeWidth={strokeWidth}
          />
          {/* Dynamic Progress Fill */}
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{ 
              strokeDasharray: circumference, 
              strokeDashoffset: circumference,
              filter: `drop-shadow(0 0 6px ${color}88)`
            }}
          />
        </svg>
        
        {/* Central Data Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
          <div className="flex flex-col items-center -space-y-1 mt-1">
            <span 
              className="font-black font-headline tracking-tighter text-white leading-none group-hover:scale-110 transition-transform duration-500"
              style={{ fontSize: size * 0.36 }}
            >
              {score}
            </span>
            <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">/ 100</span>
            <span
              className="text-[7px] font-black uppercase tracking-[0.25em] mt-1"
              style={{ color }}
            >{scoreLabel}</span>
          </div>
        </div>
      </div>

      {(label || status) && (
        <div className="text-center">
          {label && (
            <div className="text-sm font-black text-white mb-0.5 tracking-tight uppercase">
              {label}
            </div>
          )}
          {status && (
            <div 
              className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-0.5 rounded-full border bg-white/5"
              style={{ color, borderColor: `${color}44` }}
            >
              {status}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

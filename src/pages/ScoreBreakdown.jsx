import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, BarChart3, Info, Cpu, Globe, Target, Terminal, Fingerprint, Sparkles, Zap, ShieldCheck, Activity } from 'lucide-react'
import SidebarNav from '../components/SidebarNav'
import ScoreRing from '../components/ScoreRing'

const DIMENSIONS = [
  { key: 'marketDemand', label: 'Market Demand', weight: '25%', icon: Globe, color: 'theme("colors.cyan.400")' },
  { key: 'competitiveIntensity', label: 'Rivalry Strength', weight: '20%', icon: Target, color: '#c4b5fd' },
  { key: 'technicalFeasibility', label: 'Feasibility', weight: '15%', icon: Cpu, color: '#c4b5fd' },
  { key: 'monetizationClarity', label: 'Revenue Logic', weight: '15%', icon: Terminal, color: 'theme("colors.cyan.400")' },
  { key: 'founderFit', label: 'Domain Fit', weight: '10%', icon: Fingerprint, color: '#c4b5fd' },
  { key: 'timing', label: 'Market Timing', weight: '15%', icon: BarChart3, color: '#c4b5fd' },
]

export default function ScoreBreakdown({ data, idea }) {
  const [methodologyOpen, setMethodologyOpen] = useState(false)

  const scores = {
    marketDemand: data.marketDemandScore,
    competitiveIntensity: data.competitiveScore,
    technicalFeasibility: data.feasibilityScore,
    monetizationClarity: data.monetizationScore,
    founderFit: data.founderFitScore,
    timing: data.timingScore,
  }

  return (
    <div className="flex bg-surface-container-lowest min-h-screen selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      <SidebarNav idea={idea} />

      <div className="flex-1 min-h-screen relative overflow-hidden">
        {/* Immersive Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
           <div className="ambient-glow -top-40 -left-60 scale-150" />
           <div className="absolute inset-0 bg-[radial-gradient(theme('colors.cyan.400')_1px,transparent_1px)] [background-size:48px_48px] opacity-10" />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 md:p-12 lg:p-24 max-w-7xl mx-auto space-y-24 relative z-10 pb-32"
        >
          {/* Global Header */}
          <div className="pl-14 lg:pl-0 space-y-10 group">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-sm bg-violet-400/5 text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.4em] border border-violet-400/20">
              <Activity size={16} className="text-violet-400 animate-pulse" />
              Dimension Intelligence Output
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_theme('colors.cyan.400')]" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-black font-headline tracking-tighter leading-[0.85] text-white uppercase italic">
                Strategic <br />
                <span className="gradient-text">Breakdown.</span>
              </h1>
              <p className="text-xl md:text-3xl text-on-surface-variant italic font-medium leading-[1.3] max-w-4xl border-x-4 border-surface-container-high px-12 mt-12">
                "Neural analysis across 6-vector business intelligence objects. Access direct logic points and feasibility scores."
              </p>
            </div>
          </div>

          {/* Intelligence Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
            {DIMENSIONS.map((dim, i) => {
              const score = scores[dim.key] || 0
              const explanation = (data.dimensionExplanations || {})[dim.key] || ''
              const evidences = (data.evidencePoints || {})[dim.key] || []
              const Icon = dim.icon

              return (
                <motion.div
                  key={dim.key}
                  initial={{ opacity: 0, scale: 0.98, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="bg-surface-container border border-surface-container-high rounded-sm p-10 md:p-16 flex flex-col xl:flex-row gap-16 xl:items-center group relative overflow-hidden transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                >
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(theme('colors.cyan.400')_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-400/5 blur-[100px] -mr-40 -mt-40 group-hover:bg-violet-400/10 transition-colors pointer-events-none" />

                  {/* Dimension Payload Score */}
                  <div className="flex flex-col items-center min-w-[240px] xl:pr-16 xl:border-r border-surface-container-highest">
                    <div className="relative group/score scale-125 xl:scale-150 my-10 xl:my-0">
                       <ScoreRing score={score} size={110} />
                       <div className="absolute -inset-8 bg-violet-400/10 blur-[40px] opacity-0 group-hover/score:opacity-100 transition-opacity rounded-full -z-10" />
                    </div>
                    
                    <div className="mt-16 text-center space-y-4">
                      <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-surface-container-highest rounded-sm border border-surface-container-highest group-hover:border-violet-400/30 transition-colors">
                        <Icon size={14} className="text-on-surface-variant" />
                        <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">{dim.label}</h3>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-on-surface-variant italic">
                        Weighting: {dim.weight}
                      </div>
                    </div>
                  </div>

                  {/* Analytical Synthesis */}
                  <div className="flex-1 space-y-12 relative z-10">
                    <div className="space-y-6">
                       <div className="flex items-center gap-4 text-xs font-bold text-on-surface-variant uppercase tracking-[0.4em] italic mb-2">
                          <Zap size={14} className="text-violet-400" />
                          Synthesis Result
                       </div>
                       <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-[1.4] font-medium tracking-tight italic">
                         {explanation}
                       </p>
                    </div>

                    {evidences.length > 0 && (
                      <div className="space-y-6">
                        <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.4em] italic">Supporting Evidence</div>
                        <div className="flex flex-wrap gap-4">
                          {evidences.map((e, idx) => (
                            <div key={idx} className="px-6 py-3 bg-surface-container-lowest border border-surface-container-high rounded-sm text-[11px] font-bold text-on-surface-variant flex items-center gap-4 tracking-wide group-hover:border-violet-400/30 group-hover:text-white/80 transition-all cursor-default">
                              <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_theme('colors.cyan.400')]" />
                              {e}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Methodology Command Block */}
          <div className="pt-24 max-w-5xl mx-auto">
            <button 
              className="w-full flex items-center justify-between p-10 bg-surface-container border border-surface-container-high hover:bg-surface-container-high transition-all group rounded-sm shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
              onClick={() => setMethodologyOpen(!methodologyOpen)}
            >
              <div className="flex items-center gap-8 font-bold text-sm uppercase tracking-[0.4em] text-on-surface-variant group-hover:text-white transition-all">
                <div className="w-14 h-14 rounded-sm bg-surface-container-highest text-violet-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-violet-400 group-hover:text-on-primary-fixed transition-all cyan-glow">
                   <ShieldCheck size={28} />
                </div>
                <div>
                   <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.6em] mb-1 italic">Security Verified</div>
                   Neural Methodology
                </div>
              </div>
              <motion.div 
                animate={{ rotate: methodologyOpen ? 180 : 0 }}
                className="w-12 h-12 rounded-sm bg-surface-container-highest flex items-center justify-center group-hover:bg-violet-400 group-hover:text-on-primary-fixed transition-colors"
              >
                <ChevronDown size={28} className="text-on-surface-variant group-hover:text-on-primary-fixed" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {methodologyOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-16 bg-surface-container border border-surface-container-high border-t-0 rounded-b-sm bg-gradient-to-b from-surface-container to-transparent space-y-20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col md:flex-row gap-16 items-start">
                       <p className="text-2xl md:text-3xl text-on-surface-variant leading-tight max-w-2xl font-medium border-l-4 border-violet-400/40 pl-12 uppercase italic tracking-tighter">
                         Synthesis engine leverages Multi-Vector Neural-Heuristic models to parse market dynamics and execution curves.
                       </p>
                       <div className="flex-1 bg-violet-400/5 p-10 border border-violet-400/10 rounded-sm italic text-sm text-on-surface-variant leading-relaxed font-bold uppercase tracking-[0.2em]">
                          Engine Status: <span className="text-violet-400">Prime</span><br/>
                          Logic Density: <span className="text-violet-400">99.8%</span><br/>
                          Heuristic Depth: <span className="text-violet-400">Level 7 Meta</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {[
                        { label: 'Demands (25%)', desc: 'Neural parsing of intent velocity, pain-point severity, and addressable audience scope.' },
                        { label: 'Rivalry (20%)', desc: 'Entity dominance mapping, feature gaps, authority benchmarks, and entry barriers.' },
                        { label: 'Feasibility (15%)', desc: 'Architecture complexity, stack requirements, and MVP infrastructure overhead.' },
                        { label: 'Monetization (15%)', desc: 'Revenue vector clarity, ARPU benchmarks, and unit economics scalability.' },
                        { label: 'Domain Fit (10%)', desc: 'Implicit expertise requirements and initial founder-market alignment heuristics.' },
                        { label: 'Timing (15%)', desc: 'Adoption curves, trending tailwinds, and macro-temporal heuristics.' }
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-5 p-10 rounded-sm bg-surface-container-lowest border border-surface-container-high hover:border-violet-400/30 hover:-translate-y-1 transition-all group/card">
                          <div className="flex items-center gap-4">
                             <div className="w-2 h-2 rounded-full bg-violet-400/20 group-hover/card:bg-violet-400 transition-colors shadow-[0_0_8px_rgba(167,139,250,0)] group-hover/card:shadow-[0_0_8px_theme('colors.cyan.400')]" />
                             <div className="text-[11px] font-bold text-on-surface-variant group-hover/card:text-white uppercase tracking-[0.3em] font-headline">{item.label}</div>
                          </div>
                          <p className="text-[11px] text-on-surface-variant/50 group-hover/card:text-on-surface-variant leading-relaxed font-bold uppercase tracking-widest italic">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download, Target, TrendingUp, MonitorSmartphone, DollarSign, Cpu, AlertTriangle, Play, Sparkles, Zap, Layers } from 'lucide-react'

export default function PitchDeckViewer({ data, idea, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 'title',
      title: idea?.slice(0, 100) + (idea?.length > 100 ? '...' : ''),
      subtitle: 'Strategic Intelligence Report',
      icon: <Sparkles size={64} className="text-hsl(var(--primary))" />,
      content: (
        <div className="flex flex-col items-center gap-8 mt-12">
          <div className="px-10 py-5 rounded-3xl glass-panel border-hsl(var(--primary)/30) bg-hsl(var(--primary)/2)">
            <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-3 text-center">Confidence Index</div>
            <div className="text-6xl font-black gradient-text italic tracking-tighter">{data.overallScore}%</div>
          </div>
          <p className="text-xl text-white/40 font-medium italic tracking-tight">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • Genesis Phase</p>
        </div>
      )
    },
    {
      id: 'problem',
      title: 'Market Friction',
      icon: <Target size={32} className="text-hsl(var(--primary))" />,
      content: (
        <div className="space-y-12 mt-12">
          <div className="text-2xl md:text-3xl font-medium leading-[1.4] text-white italic border-l-4 border-hsl(var(--primary)) pl-10 pr-4">
             "{data.opportunities?.[0] || 'Identifying structural inefficiencies within the current market paradigm.'}"
          </div>
          <div className="grid grid-cols-2 gap-8">
             <div className="glass-panel p-8 bg-white/[0.02]">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Intent Volume</div>
                <div className="text-3xl font-black text-white italic">{data.keyMetrics?.monthlySearchVolume || 'SCAN ERROR'}</div>
             </div>
             <div className="glass-panel p-8 bg-white/[0.02]">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Demand Vector</div>
                <div className="text-3xl font-black text-white italic">{data.marketDemandScore}/100</div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'Strategic Solution',
      icon: <Zap size={32} className="text-hsl(var(--secondary))" />,
      content: (
        <div className="mt-12">
           <div className="glass-panel p-10 bg-hsl(var(--secondary)/5) border-hsl(var(--secondary)/20) relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20"><Cpu size={48} /></div>
              <div className="text-xl md:text-2xl leading-relaxed text-white/80 italic font-medium">
                {data.executiveSummary}
              </div>
           </div>
        </div>
      )
    },
    {
       id: 'timing',
       title: 'Temporal Window',
       icon: <TrendingUp size={32} className="text-hsl(var(--tertiary))" />,
       content: (
         <div className="space-y-12 mt-12">
           <div className="flex items-center gap-8">
             <div className="text-6xl font-black text-hsl(var(--tertiary)) italic transform -rotate-12">{data.keyMetrics?.trendDirection || '±0'}</div>
             <div className="h-12 w-px bg-white/10" />
             <div className="text-lg font-black text-white/40 uppercase tracking-[0.3em]">Critical Momentum <br/>Threshold</div>
           </div>
           <p className="text-xl text-white/60 leading-relaxed italic border-x-2 border-white/5 px-8">
             {data.dimensionExplanations?.timing || 'Market convergence indicates an optimal entry window.'}
           </p>
         </div>
       )
    },
    {
      id: 'sizing',
      title: 'Market Magnitude',
      icon: <Layers size={32} className="text-hsl(var(--primary))" />,
      content: (
        <div className="grid gap-6 mt-12">
          {[
            { label: 'Total Addressable (TAM)', value: data.marketSizing?.tam, color: 'var(--primary)', size: 'text-3xl' },
            { label: 'Serviceable (SAM)', value: data.marketSizing?.sam, color: 'var(--secondary)', size: 'text-2xl' },
            { label: 'Obtainable (SOM)', value: data.marketSizing?.som, color: 'var(--tertiary)', size: 'text-xl' }
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-8 glass-panel bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
               <div className="text-sm font-black text-white/40 uppercase tracking-widest">{item.label}</div>
               <div className={`${item.size} font-black italic group-hover:scale-110 transition-transform`} style={{ color: `hsl(${item.color})` }}>{item.value || 'N/A'}</div>
            </div>
          ))}
        </div>
      )
    },
    {
       id: 'rivals',
       title: 'Entity Dynamics',
       icon: <Cpu size={32} className="text-hsl(var(--secondary))" />,
       content: (
         <div className="space-y-10 mt-12">
           <div className="grid grid-cols-2 gap-8">
             <div className="glass-panel p-8 text-center bg-white/[0.02]">
                <div className="text-4xl font-black text-white italic mb-2">{data.keyMetrics?.numCompetitors || 0}</div>
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Active Sentry Nodes</div>
             </div>
             <div className="glass-panel p-8 text-center bg-white/[0.02]">
                <div className="text-4xl font-black text-white italic mb-2">{data.keyMetrics?.avgCompetitorDA || '0'}</div>
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Authority Index</div>
             </div>
           </div>
           <div className="glass-panel p-8 border-hsl(var(--primary)/30) bg-hsl(var(--primary)/5)">
              <div className="text-[10px] font-black text-hsl(var(--primary)) uppercase tracking-[0.4em] mb-4">Strategic Vulnerability:</div>
              <div className="text-lg text-white/80 font-medium italic">"{data.competitors?.[0]?.keyWeakness || 'Incumbents are anchored to legacy architecture.'}"</div>
           </div>
         </div>
       )
    },
    {
      id: 'risks',
      title: 'Risk Profile',
      icon: <AlertTriangle size={32} className="text-red-500" />,
      content: (
        <div className="space-y-6 mt-12">
          <div className="glass-panel p-8 border-red-500/20 bg-red-500/5">
            <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-3 italic">AI Displacement Factor</div>
            <p className="text-lg text-white/70 italic leading-relaxed">{data.regulatoryAndAiRisk?.aiTakeoverRisk || 'Moderate algorithmic volatility.'}</p>
          </div>
          <div className="glass-panel p-8 border-hsl(var(--warning)/20) bg-hsl(var(--warning)/5)">
            <div className="text-[10px] font-black text-hsl(var(--warning)) uppercase tracking-widest mb-3 italic">Execution Resistance</div>
            <p className="text-lg text-white/70 italic leading-relaxed">{data.risks?.[0] || 'Market saturation friction.'}</p>
          </div>
        </div>
      )
    },
    {
      id: 'ask',
      title: 'Initialize Deployment',
      icon: <Play size={32} className="text-white" />,
      content: (
        <div className="flex flex-col items-center gap-12 mt-12">
           <div className="text-center space-y-4">
              <div className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">MVP Target: <span className="text-hsl(var(--primary))">{data.keyMetrics?.timeToMVP || '6-8 Weeks'}</span></div>
              <div className="text-xl text-white/40 italic font-medium">Subscription: {data.avgSubscriptionPrice || 'TBD'} • Mon. Intelligence: {data.monetizationScore}/100</div>
           </div>
           <button 
             onClick={onClose}
             className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)]"
           >
             Terminate Session
           </button>
        </div>
      )
    }
  ]

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') setCurrentSlide(s => Math.min(s + 1, slides.length - 1))
      if (e.key === 'ArrowLeft') setCurrentSlide(s => Math.max(s - 1, 0))
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [slides.length, onClose])

  const nextSlide = () => setCurrentSlide(s => Math.min(s + 1, slides.length - 1))
  const prevSlide = () => setCurrentSlide(s => Math.max(s - 1, 0))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-hsl(var(--bg-deep)/95) backdrop-blur-3xl flex items-center justify-center p-8 md:p-16"
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
         <div className="ambient-glow -top-40 -left-40 bg-hsl(var(--primary))" />
         <div className="ambient-glow -bottom-40 -right-40 bg-hsl(var(--secondary))" />
      </div>

      <div className="absolute top-0 left-0 right-0 p-10 flex justify-between items-center z-10">
        <div className="flex flex-col -gap-1">
           <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-1 italic">Intelligence Presentation</div>
           <div className="text-xs font-black text-white uppercase tracking-[0.3em]">Slide {currentSlide + 1} of {slides.length}</div>
        </div>
        <button onClick={onClose} className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="relative w-full max-w-5xl">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute -left-20 lg:-left-32 top-1/2 -translate-y-1/2 p-6 text-white/20 hover:text-white disabled:opacity-0 transition-all"
        >
          <ChevronLeft size={64} strokeWidth={1} />
        </button>
        
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute -right-20 lg:-right-32 top-1/2 -translate-y-1/2 p-6 text-white/20 hover:text-white disabled:opacity-0 transition-all"
        >
          <ChevronRight size={64} strokeWidth={1} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="glass-panel p-16 md:p-24 min-h-[600px] flex flex-col items-center justify-center text-center shadow-[0_0_150px_rgba(0,0,0,0.8)] border-white/5 bg-black/40"
          >
             <div className="flex flex-col items-center text-center max-w-3xl">
                <div className="w-20 h-20 rounded-[2rem] bg-white text-black flex items-center justify-center shadow-2xl mb-12 transform -rotate-6">
                  {slides[currentSlide].icon}
                </div>
                <h2 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-white uppercase italic leading-[0.9] mb-4">
                  {slides[currentSlide].title}
                </h2>
                {slides[currentSlide].subtitle && (
                   <div className="text-sm font-black text-hsl(var(--primary)) uppercase tracking-[0.4em] mb-12 animate-pulse">{slides[currentSlide].subtitle}</div>
                )}
                
                <div className="w-full">
                  {slides[currentSlide].content}
                </div>
             </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-12 flex gap-3">
        {slides.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={`cursor-pointer transition-all duration-500 ${i === currentSlide ? 'w-16 bg-white h-1' : 'w-3 bg-white/10 h-1 hover:bg-white/30'}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

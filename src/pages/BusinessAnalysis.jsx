import { motion } from 'framer-motion'
import { 
  Briefcase, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  AlertCircle,
  Database
} from 'lucide-react'
import SidebarNav from '../components/SidebarNav'
import { MOCK_ANALYSIS_DATA } from '../data/mockAnalysis'

export default function BusinessAnalysis({ data }) {
  // Prioritize top-level dynamic data (from AI) over nested or mock fallbacks
  const marketSizing = data?.marketSizing || data?.businessAnalysis?.marketSizing || MOCK_ANALYSIS_DATA.businessAnalysis.marketSizing
  const financials = data?.financials || data?.businessAnalysis?.financials || MOCK_ANALYSIS_DATA.businessAnalysis.financials
  
  // Derive strengths from the top-scoring dimensions' explanations
  const dimensionScores = [
    { key: 'marketDemand', score: data?.marketDemandScore, label: 'Market Demand', explanation: data?.dimensionExplanations?.marketDemand },
    { key: 'timing', score: data?.timingScore, label: 'Market Timing', explanation: data?.dimensionExplanations?.timing },
    { key: 'feasibility', score: data?.feasibilityScore, label: 'Technical Feasibility', explanation: data?.dimensionExplanations?.technicalFeasibility },
    { key: 'monetization', score: data?.monetizationScore, label: 'Monetization Clarity', explanation: data?.dimensionExplanations?.monetizationClarity },
    { key: 'founderFit', score: data?.founderFitScore, label: 'Founder Fit', explanation: data?.dimensionExplanations?.founderFit },
    { key: 'competitive', score: data?.competitiveScore, label: 'Competitive Position', explanation: data?.dimensionExplanations?.competitiveIntensity },
  ]
  const derivedStrengths = dimensionScores
    .filter(d => d.score >= 65 && d.explanation)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(d => d.explanation)

  const derivedWeaknesses = dimensionScores
    .filter(d => d.score < 65 && d.explanation)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(d => d.explanation)

  const swot = {
    strengths: derivedStrengths.length > 0 ? derivedStrengths : (data?.businessAnalysis?.swot?.strengths || MOCK_ANALYSIS_DATA.businessAnalysis.swot.strengths),
    weaknesses: derivedWeaknesses.length > 0 ? derivedWeaknesses : (data?.pivotSuggestions?.slice(0, 3) || data?.businessAnalysis?.swot?.weaknesses || MOCK_ANALYSIS_DATA.businessAnalysis.swot.weaknesses),
    opportunities: data?.opportunities || data?.businessAnalysis?.swot?.opportunities || MOCK_ANALYSIS_DATA.businessAnalysis.swot.opportunities,
    threats: data?.risks || data?.businessAnalysis?.swot?.threats || MOCK_ANALYSIS_DATA.businessAnalysis.swot.threats
  }

  return (
    <div className="flex bg-surface-container-lowest min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <SidebarNav />

      <main className="flex-1 min-h-screen relative overflow-hidden pb-32">
        <div className="ambient-glow -top-40 -left-60" />
        
        {/* Intelligence Header */}
        <header className="sticky top-0 right-0 left-0 z-40 bg-surface-container-lowest/80 backdrop-blur-2xl flex flex-col md:flex-row justify-between items-start md:items-center px-8 md:px-12 py-10 border-b border-surface-container-low gap-8">
          <div className="pl-14 lg:pl-0 space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.3em] bg-surface-container px-4 py-1.5 rounded-sm border border-surface-container-high">
              Commercial Viability / <span className="text-violet-400">Deep Scan</span>
            </div>
            <h1 className="font-headline font-black text-4xl md:text-6xl tracking-tighter text-white leading-none">
              Business <span className="gradient-text">Analysis.</span>
            </h1>
          </div>
          <button className="w-full md:w-auto bg-surface-container-highest text-violet-400 px-10 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 hover:bg-violet-400 hover:text-on-primary-fixed cyan-glow shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Target size={18} strokeWidth={2.5} />
            Export Module
          </button>
        </header>

        <div className="px-8 md:px-12 mt-12 space-y-16 max-w-7xl mx-auto relative z-10">
          
          {/* Top Row: Market Sizing & Financials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Market Sizing */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container border border-surface-container-high rounded-sm p-10 relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(theme('colors.cyan.400')_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="w-10 h-10 rounded-sm bg-surface-container-highest flex items-center justify-center text-violet-400 cyan-glow">
                  <Database size={20} />
                </div>
                <h2 className="text-xl font-black font-headline tracking-tighter text-white uppercase italic">Market Saturation (TAM/SAM/SOM)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="bg-surface-container-lowest border border-surface-container-high p-6 rounded-sm text-center">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-2">TAM</p>
                  <p className="text-3xl font-black font-headline tracking-tighter text-white">{marketSizing.tam}</p>
                  <p className="text-[8px] uppercase tracking-widest text-on-surface-variant mt-2 border-t border-surface-container-high pt-2">Total Addressable</p>
                </div>
                <div className="bg-surface-container-lowest border border-surface-container-high p-6 rounded-sm text-center">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.3em] mb-2">SAM</p>
                  <p className="text-3xl font-black font-headline tracking-tighter text-white">{marketSizing.sam}</p>
                  <p className="text-[8px] uppercase tracking-widest text-on-surface-variant mt-2 border-t border-surface-container-high pt-2">Serviceable available</p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-sm text-center border border-violet-400/30 cyan-glow shadow-[0_0_20px_rgba(167,139,250,0.05)] bg-gradient-to-b from-violet-400/5 to-transparent">
                  <p className="text-[10px] font-bold text-violet-400 uppercase tracking-[0.3em] mb-2">SOM</p>
                  <p className="text-3xl font-black font-headline tracking-tighter text-white">{marketSizing.som}</p>
                  <p className="text-[8px] uppercase tracking-widest text-on-surface-variant mt-2 border-t border-violet-400/30 pt-2">Serviceable Obtainable</p>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-surface-container-high flex justify-between items-center px-4 relative z-10">
                 <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-on-surface-variant">Projected Expansion</span>
                 <div className="flex items-center gap-2 text-violet-400 bg-violet-400/10 px-4 py-2 rounded-sm border border-violet-400/20">
                    <TrendingUp size={14} />
                    <span className="text-xs font-bold font-headline tracking-widest">{marketSizing.growthRate}</span>
                 </div>
              </div>
            </motion.section>

            {/* Financial Viability */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container border border-surface-container-high rounded-sm p-10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-sm bg-surface-container-highest flex items-center justify-center text-violet-400 cyan-glow">
                  <Briefcase size={20} />
                </div>
                <h2 className="text-xl font-black font-headline tracking-tighter text-white uppercase italic">Unit Economics Projection</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-surface-container-lowest border border-surface-container-high rounded-sm p-6 group hover:border-violet-400/30 transition-colors">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-4">Target CAC</p>
                    <p className="text-4xl font-black font-headline tracking-tighter text-white group-hover:text-violet-400 transition-colors">{financials.targetCac}</p>
                 </div>
                 <div className="bg-surface-container-lowest border border-surface-container-high rounded-sm p-6 group hover:border-violet-400/30 transition-colors">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-4">Expected LTV</p>
                    <p className="text-4xl font-black font-headline tracking-tighter text-white group-hover:text-violet-400 transition-colors">{financials.expectedLtv}</p>
                 </div>
                 <div className="bg-surface-container-lowest border border-surface-container-high rounded-sm p-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-4">Payback Period</p>
                    <p className="text-2xl font-black font-headline tracking-tighter text-white">{financials.paybackPeriod}</p>
                 </div>
                 <div className="bg-surface-container-lowest border border-surface-container-high rounded-sm p-6">
                    <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-4">Gross Margin</p>
                    <p className="text-2xl font-black font-headline tracking-tighter text-white">{financials.grossMargin}</p>
                 </div>
              </div>
            </motion.section>

          </div>

          {/* S.W.O.T Matrix */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8 pl-2">
              <div className="w-8 h-8 rounded-sm bg-surface-container flex items-center justify-center text-violet-400">
                <ShieldCheck size={18} />
              </div>
              <h2 className="text-2xl font-black font-headline tracking-tight text-white uppercase italic">S.W.O.T Matrix</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Strengths */}
               <div className="bg-surface-container border border-surface-container-high rounded-sm p-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                  <h3 className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.3em] font-headline text-violet-400 mb-6 pb-4 border-b border-surface-container-high">
                    Strengths
                    <Zap size={16} />
                  </h3>
                  <ul className="space-y-4">
                    {swot.strengths.map((str, i) => (
                      <li key={i} className="flex gap-4 items-start text-sm text-white/90 leading-relaxed font-medium">
                        <span className="text-violet-400 font-mono mt-0.5">0{i + 1}</span>
                        {str}
                      </li>
                    ))}
                  </ul>
               </div>

               {/* Weaknesses */}
               <div className="bg-surface-container border border-surface-container-high rounded-sm p-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                  <h3 className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.3em] font-headline text-on-surface-variant mb-6 pb-4 border-b border-surface-container-high">
                    Weaknesses
                    <AlertCircle size={16} />
                  </h3>
                  <ul className="space-y-4">
                    {swot.weaknesses.map((weak, i) => (
                      <li key={i} className="flex gap-4 items-start text-sm text-on-surface-variant leading-relaxed">
                        <span className="opacity-50 font-mono mt-0.5">0{i + 1}</span>
                        {weak}
                      </li>
                    ))}
                  </ul>
               </div>

               {/* Opportunities */}
               <div className="bg-surface-container border border-violet-400/20 rounded-sm p-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/10 blur-[50px] pointer-events-none" />
                  <h3 className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.3em] font-headline text-white mb-6 pb-4 border-b border-surface-container-high relative z-10">
                    Opportunities
                    <TrendingUp size={16} className="text-violet-400" />
                  </h3>
                  <ul className="space-y-4 relative z-10">
                    {swot.opportunities.map((opp, i) => (
                      <li key={i} className="flex gap-4 items-start text-sm text-white/90 leading-relaxed font-medium">
                        <span className="text-violet-400 font-mono mt-0.5">0{i + 1}</span>
                        {opp}
                      </li>
                    ))}
                  </ul>
               </div>

               {/* Threats */}
               <div className="bg-surface-container border-l-4 border-on-error-container/60 rounded-sm p-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                  <h3 className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.3em] font-headline text-on-error-container/80 mb-6 pb-4 border-b border-surface-container-high">
                    Threats
                    <AlertTriangle size={16} />
                  </h3>
                  <ul className="space-y-4">
                    {swot.threats.map((threat, i) => (
                      <li key={i} className="flex gap-4 items-start text-sm text-on-surface-variant leading-relaxed">
                        <span className="opacity-50 font-mono mt-0.5">0{i + 1}</span>
                        {threat}
                      </li>
                    ))}
                  </ul>
               </div>

            </div>
          </motion.section>

        </div>
      </main>
    </div>
  )
}

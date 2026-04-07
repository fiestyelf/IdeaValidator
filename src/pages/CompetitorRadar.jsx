import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  TrendingUp, 
  Zap, 
  Briefcase,
  ArrowRight,
  Sparkles,
  Shield,
  ZapOff,
  X
} from 'lucide-react'
import SidebarNav from '../components/SidebarNav'
import { MOCK_ANALYSIS_DATA } from '../data/mockAnalysis'

export default function CompetitorRadar({ data }) {
  const [showStrategy, setShowStrategy] = useState(false)
  const competitors = data?.competitors || []
  const metrics = data?.keyMetrics || {}
  const strategy = data?.deploymentStrategy || MOCK_ANALYSIS_DATA.deploymentStrategy

  return (
    <div className="flex bg-surface-container-lowest min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      <SidebarNav />

      <main className="flex-1 min-h-screen relative overflow-hidden">
        <div className="ambient-glow -top-40 -left-60" />
        
        {/* Intelligence Header */}
        <header className="sticky top-0 right-0 left-0 z-40 bg-surface-container-lowest/80 backdrop-blur-2xl flex flex-col md:flex-row justify-between items-start md:items-center px-8 md:px-12 py-10 border-b border-surface-container-low gap-8">
          <div className="pl-14 lg:pl-0 space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.3em] bg-surface-container px-4 py-1.5 rounded-sm border border-surface-container-high">
              Market Intelligence / <span className="text-violet-400">Radar Scan</span>
            </div>
            <h1 className="font-headline font-black text-4xl md:text-6xl tracking-tighter text-white leading-none">
              Competitor <span className="gradient-text">Radar.</span>
            </h1>
          </div>
          <button className="w-full md:w-auto bg-surface-container-highest text-violet-400 px-10 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 hover:bg-violet-400 hover:text-on-primary-fixed cyan-glow shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Plus size={18} strokeWidth={2.5} />
            Add Entity
          </button>
        </header>

        {/* Content Area */}
        <div className="px-8 md:px-12 pb-20 mt-12 space-y-16 max-w-7xl mx-auto relative z-10">
          
          {/* Analytics Mesh */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface-container border border-surface-container-high p-10 rounded-sm relative overflow-hidden group shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Tracked Entities</p>
              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black font-headline tracking-tighter text-white">{competitors.length}</span>
                <div className="flex items-center gap-1.5 text-violet-400 text-[10px] font-bold uppercase bg-violet-400/10 px-2.5 py-1 rounded-sm border border-violet-400/20">
                  <TrendingUp size={12} />
                  +{Math.ceil(competitors.length * 0.2)} Velocity
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-surface-container border border-surface-container-high p-10 rounded-sm relative overflow-hidden group shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Market Density</p>
              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black font-headline tracking-tighter text-white">{metrics.marketSaturation || '64%'}</span>
                <div className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase border ${
                  parseFloat(metrics.marketSaturation) > 70 
                  ? 'bg-error-container/20 text-on-error-container border-error-container/40' 
                  : 'bg-surface-container-highest text-violet-400 border-surface-container-highest'
                }`}>
                  {parseFloat(metrics.marketSaturation) > 70 ? 'Extreme Red' : 'Contested'}
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface-container border border-surface-container-high p-10 rounded-sm relative overflow-hidden group shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Threat Profile</p>
              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-black font-headline tracking-tighter gradient-text">
                  {data?.overallScore > 80 ? 'LOW' : data?.overallScore > 60 ? 'MED' : 'HIGH'}
                </span>
                <Shield size={24} className="text-violet-400 opacity-20" />
              </div>
            </motion.div>
          </div>

          {/* Comparative Intel Table */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface-container border border-surface-container-high rounded-sm overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
          >
            <div className="px-10 py-10 flex justify-between items-center border-b border-surface-container-high bg-surface-container-lowest/20">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-sm bg-surface-container-highest flex items-center justify-center text-violet-400">
                    <Search size={20} />
                 </div>
                 <h2 className="text-2xl font-black font-headline tracking-tight text-white uppercase italic">Intelligence Matrix</h2>
              </div>
              <div className="flex gap-4">
                <button className="text-on-surface-variant hover:text-white p-3 bg-surface-container-lowest border border-surface-container-high rounded-sm transition-all active:scale-[0.98]">
                  <Filter size={18} />
                </button>
                <button className="text-on-surface-variant hover:text-white p-3 bg-surface-container-lowest border border-surface-container-high rounded-sm transition-all active:scale-[0.98]">
                  <Download size={18} />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left border-collapse">
                <thead className="bg-surface-container text-on-surface-variant uppercase text-[9px] tracking-[0.3em] font-bold border-b border-surface-container-high">
                  <tr>
                    <th className="px-10 py-6">Entity</th>
                    <th className="px-8 py-6">Domain Authority</th>
                    <th className="px-8 py-6">Revenue Path</th>
                    <th className="px-8 py-6">Key Weakness</th>
                    <th className="px-10 py-6 text-right">Threat Level</th>
                  </tr>
                </thead>
                  {competitors.slice(0, 10).map((comp, i) => (
                    <tr 
                      key={comp.name} 
                      className="hover:bg-surface-container-high/30 transition-colors group cursor-crosshair"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-sm bg-surface-container-highest border border-surface-container-highest flex items-center justify-center text-violet-400 group-hover:scale-110 group-hover:bg-violet-400/10 transition-all">
                            {i % 3 === 0 ? <Rocket size={20} /> : i % 3 === 1 ? <Zap size={20} /> : <Briefcase size={20} />}
                          </div>
                          <div>
                            <span className="font-black font-headline text-white text-base tracking-tight block uppercase">{comp.name}</span>
                            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5 block italic">
                              {comp.type || (comp.trafficTier === 'High' ? 'Dominant Player' : comp.trafficTier === 'Medium' ? 'Challenger' : comp.trafficTier === 'Low' ? 'Niche Player' : 'Competitor')}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-3">
                           <div className="flex-1 h-1.5 bg-surface-container-high rounded-sm overflow-hidden max-w-[100px]">
                              <div 
                                className="h-full bg-violet-400 shadow-[0_0_10px_theme('colors.cyan.400')]" 
                                style={{ width: `${comp.domainAuthority || metrics.avgCompetitorDA || (70 - i * 5)}%` }} 
                              />
                           </div>
                           <span className="font-bold text-white italic text-sm">{comp.domainAuthority || metrics.avgCompetitorDA || (70 - i * 5)}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-8">
  <span className="px-4 py-1.5 rounded-sm text-[9px] font-bold bg-surface-container-lowest border border-surface-container-high text-on-surface-variant uppercase tracking-widest group-hover:border-violet-400/20 transition-colors">
    {comp.revenueModel || comp.pricing || (i % 2 === 0 ? 'Enterprise SaaS' : 'Transactional')}
  </span>
</td>
                      <td className="px-8 py-8">
  <div className="flex items-center gap-3">
     <ZapOff size={14} className="text-on-error-container opacity-50" />
     <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest max-w-[200px] leading-tight">
      {comp.keyWeakness || (i % 2 === 0 ? 'High Acquisition Cost' : 'Legacy Technical Debt')}
    </span>
  </div>
</td>
                      <td className="px-10 py-8 text-right">
  <div className="inline-flex items-center gap-2">
     <div className={`w-2 h-2 rounded-full ${comp.threatLevel === 'DOMINANT' || comp.threatLevel === 'High' ? 'bg-[rgb(255,87,87)] animate-pulse shadow-[0_0_10px_rgb(255,87,87)]' : 'bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.4)]'}`} />
     <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${comp.threatLevel === 'DOMINANT' || comp.threatLevel === 'High' ? 'text-[rgb(255,87,87)]' : 'text-on-surface-variant'}`}>
      {comp.threatLevel || 'CONTESTED'}
    </span>
  </div>
</td>
                    </tr>
                  ))}
              </table>
            </div>
          </motion.section>

          {/* Strategic Gap Analysis */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-violet-400/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="bg-surface-container border-l-8 border-violet-400 rounded-sm p-12 flex flex-col md:flex-row gap-16 items-center relative overflow-hidden group shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(theme('colors.cyan.400')_0.5px,transparent_0.5px)] [background-size:24px_24px]" />
              
              <div className="flex-1 space-y-10 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-violet-400/10 flex items-center justify-center text-violet-400 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                    <Sparkles size={28} />
                  </div>
                  <h3 className="text-3xl font-black font-headline tracking-tighter text-white uppercase">Asymmetric Advantage</h3>
                </div>
                <p className="text-xl md:text-2xl leading-[1.6] text-white/90 font-medium tracking-tight italic border-l-2 border-surface-container-high pl-10 ml-6">
                  {data?.opportunities?.[0] || 'Neural mapping indicates significant whitespace in mid-market execution where current incumbents are legacy-locked.'}
                </p>
                <div className="pl-16">
                  <button 
                    onClick={() => setShowStrategy(true)}
                    className="text-violet-400 font-bold text-xs uppercase tracking-[0.3em] flex items-center gap-3 group/btn"
                  >
                    View Deployment Strategy
                    <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0 relative z-10">
                <div className="w-56 h-56 rounded-sm border border-surface-container-high flex items-center justify-center p-8 relative overflow-hidden bg-surface-container rotate-3 group-hover:rotate-0 transition-all duration-700">
                  <div className="absolute inset-4 bg-gradient-to-br from-violet-400/20 to-transparent rounded-sm animate-pulse" />
                  <Rocket size={120} className="text-violet-400 drop-shadow-[0_0_30px_theme('colors.cyan.400')] relative z-20" />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Visualization Mesh Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-surface-container border border-surface-container-high rounded-sm overflow-hidden relative group cursor-pointer shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <div className="h-[280px] w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400 block border-l-2 border-violet-400 pl-2">Market Heatmap</span>
                  <h4 className="text-3xl font-black font-headline text-white tracking-tighter uppercase italic">Neural Distribution</h4>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mt-4">Calculated Shift: +12.4%</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-surface-container border border-surface-container-high rounded-sm overflow-hidden relative group cursor-pointer shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
            >
              <div className="h-[280px] w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400 block border-l-2 border-violet-400 pl-2">Network Intelligence</span>
                  <h4 className="text-3xl font-black font-headline text-white tracking-tighter uppercase italic">Entity Ecosystem</h4>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mt-4">Node Density: 1.8k Active</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Deployment Strategy Modal */}
      <AnimatePresence>
        {showStrategy && (
          <div className="fixed inset-0 z-50 flex justify-end">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               onClick={() => setShowStrategy(false)}
             />
             
             <motion.div 
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="relative w-full max-w-2xl bg-surface-container-low h-full border-l border-surface-container-high shadow-[-10px_0_30px_rgba(0,0,0,0.5)] overflow-y-auto"
             >
                <div className="sticky top-0 bg-surface-container-low/90 backdrop-blur-xl border-b border-surface-container-high p-8 flex justify-between items-center z-10">
                   <div>
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-1">Execution Vector</p>
                     <h2 className="text-2xl font-black font-headline tracking-tighter text-white uppercase italic">Deployment Strategy</h2>
                   </div>
                   <button 
                      onClick={() => setShowStrategy(false)}
                      className="p-3 bg-surface-container border border-surface-container-high rounded-sm text-on-surface-variant hover:text-white transition-all active:scale-95"
                   >
                     <X size={20} />
                   </button>
                </div>

                <div className="p-8 space-y-12">
                   {/* Phase 1 */}
                   <div className="relative pl-10">
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-container-high">
                         <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-sm bg-violet-400 cyan-glow" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-2">{strategy.phase1.duration}</p>
                      <h3 className="text-xl font-black font-headline text-white tracking-tight uppercase mb-4">{strategy.phase1.title}</h3>
                      <ul className="space-y-3 mb-6">
                         {strategy.phase1.actions.map((act, i) => (
                           <li key={i} className="text-sm font-medium text-white/80 leading-relaxed flex items-start gap-4">
                             <span className="text-violet-400 opacity-50 font-mono mt-0.5">0{i+1}</span>
                             {act}
                           </li>
                         ))}
                      </ul>
                      <div className="bg-surface-container px-5 py-4 rounded-sm border-l-2 border-violet-400">
                         <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-on-surface-variant mb-2">Phase Trigger</p>
                         <p className="text-xs font-bold text-white italic">{strategy.phase1.trigger}</p>
                      </div>
                   </div>

                   {/* Phase 2 */}
                   <div className="relative pl-10">
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-container-high">
                         <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-sm bg-surface-container-highest border border-violet-400/50" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{strategy.phase2.duration}</p>
                      <h3 className="text-xl font-black font-headline text-on-surface tracking-tight uppercase mb-4">{strategy.phase2.title}</h3>
                      <ul className="space-y-3 mb-6">
                         {strategy.phase2.actions.map((act, i) => (
                           <li key={i} className="text-sm font-medium text-on-surface-variant leading-relaxed flex items-start gap-4">
                             <span className="opacity-30 font-mono mt-0.5">0{i+1}</span>
                             {act}
                           </li>
                         ))}
                      </ul>
                      <div className="bg-surface-container px-5 py-4 rounded-sm border-l-2 border-surface-container-highest">
                         <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-on-surface-variant opacity-70 mb-2">Phase Trigger</p>
                         <p className="text-xs font-bold text-on-surface-variant italic">{strategy.phase2.trigger}</p>
                      </div>
                   </div>

                   {/* Phase 3 */}
                   <div className="relative pl-10">
                      <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-container-high">
                         <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-sm bg-surface-container-highest border border-surface-container-highest" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{strategy.phase3.duration}</p>
                      <h3 className="text-xl font-black font-headline text-on-surface tracking-tight uppercase mb-4">{strategy.phase3.title}</h3>
                      <ul className="space-y-3 mb-6">
                         {strategy.phase3.actions.map((act, i) => (
                           <li key={i} className="text-sm font-medium text-on-surface-variant leading-relaxed flex items-start gap-4">
                             <span className="opacity-30 font-mono mt-0.5">0{i+1}</span>
                             {act}
                           </li>
                         ))}
                      </ul>
                      <div className="bg-surface-container px-5 py-4 rounded-sm border-l-2 border-surface-container-highest">
                         <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-on-surface-variant opacity-70 mb-2">Phase Trigger</p>
                         <p className="text-xs font-bold text-on-surface-variant italic">{strategy.phase3.trigger}</p>
                      </div>
                   </div>
                </div>

             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

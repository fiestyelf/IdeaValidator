import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Copy, Share2, CheckCircle, Smartphone, Monitor } from 'lucide-react'
import SidebarNav from '../components/SidebarNav'
import Toast from '../components/Toast'

export default function Export({ data, idea }) {
  const { reportId } = useApp()
  const [copiedLink, setCopiedLink] = useState(false)
  const [timestamp, setTimestamp] = useState('')

  useEffect(() => {
    setTimestamp(new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC')
  }, [])

  const reportUrl = `${window.location.origin}/report/${reportId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(reportUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleExportJSON = () => {
    const exportData = {
      sessionId: reportId,
      timestamp: new Date().toISOString(),
      idea: idea,
      analysis: data
    };
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IdeaValidator_${reportId?.slice(0, 8) || 'Export'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const esc = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const rows = [];

    rows.push(['Section', 'Field', 'Value']);
    rows.push(['Idea', 'Description', esc(idea)]);
    rows.push(['Idea', 'Session ID', esc(reportId)]);
    rows.push(['Idea', 'Date', esc(new Date().toISOString())]);

    rows.push(['Scores', 'Overall Score', esc(data.overallScore)]);
    rows.push(['Scores', 'Market Demand', esc(data.marketDemandScore)]);
    rows.push(['Scores', 'Competitive', esc(data.competitiveScore)]);
    rows.push(['Scores', 'Feasibility', esc(data.feasibilityScore)]);
    rows.push(['Scores', 'Monetization', esc(data.monetizationScore)]);
    rows.push(['Scores', 'Founder Fit', esc(data.founderFitScore)]);
    rows.push(['Scores', 'Timing', esc(data.timingScore)]);

    const summary = Array.isArray(data.executiveSummary)
      ? data.executiveSummary.join(' ')
      : (data.executiveSummary || '');
    rows.push(['Summary', 'Executive Summary', esc(summary)]);

    Object.entries(data.keyMetrics || {}).forEach(([k, v]) => {
      rows.push(['Key Metrics', k, esc(v)]);
    });

    const ms = data.marketSizing || data.businessAnalysis?.marketSizing || {};
    if (ms.tam) rows.push(['Market Sizing', 'TAM', esc(ms.tam)]);
    if (ms.sam) rows.push(['Market Sizing', 'SAM', esc(ms.sam)]);
    if (ms.som) rows.push(['Market Sizing', 'SOM', esc(ms.som)]);

    (data.competitors || []).forEach((c, i) => {
      rows.push([`Competitor ${i + 1}`, 'Name', esc(c.name)]);
      rows.push([`Competitor ${i + 1}`, 'Threat Level', esc(c.threatLevel)]);
      rows.push([`Competitor ${i + 1}`, 'Key Weakness', esc(c.keyWeakness)]);
    });

    const swot = data.businessAnalysis?.swot || {};
    ['strengths', 'weaknesses', 'opportunities', 'threats'].forEach(key => {
      (swot[key] || []).forEach((item, i) => {
        rows.push([`SWOT - ${key}`, `${i + 1}`, esc(item)]);
      });
    });

    (data.pivotSuggestions || []).forEach((p, i) => {
      rows.push(['Pivots', `${i + 1}`, esc(p)]);
    });

    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IdeaValidator_${reportId?.slice(0, 8) || 'Export'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex bg-surface-container-lowest min-h-screen text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <SidebarNav idea={idea} />

      <main className="flex-1 min-h-screen relative overflow-y-auto">
        <div className="ambient-glow -top-40 -left-60" />

        {/* Top Header matching Stitch design */}
        <header className="sticky top-0 w-full z-40 bg-zinc-950/60 backdrop-blur-xl flex items-center justify-between px-8 md:px-12 h-20 shadow-[0_0_16px_rgba(167,139,250,0.05)] border-b border-surface-container-low">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-sm bg-surface-container-highest flex items-center justify-center text-violet-400 cyan-glow">
                <Share2 size={16} strokeWidth={2.5} />
             </div>
             <span className="font-headline uppercase tracking-widest text-sm font-bold text-violet-400">INTEL / EXPORT</span>
          </div>
        </header>

        <div className="pt-16 pb-32 px-6 max-w-2xl mx-auto relative z-10">
          
          {/* Hero Header */}
          <section className="mb-12 text-center md:text-left">
            <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tighter text-white mb-2 uppercase italic leading-none">
              FINAL <span className="gradient-text">REPORT</span>
            </h1>
            <p className="text-on-surface-variant font-bold tracking-[0.2em] uppercase text-xs opacity-60">Verification Session ID: {reportId?.slice(0, 8).toUpperCase() || 'SESSION-PENDING'}</p>
          </section>

          {/* REPORT PREVIEW CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container mb-8 border border-surface-container-high rounded-sm p-8 md:p-10 shadow-[inner_0_2px_10px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-400/5 blur-[80px] -mr-20 -mt-20 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h2 className="font-headline text-lg font-bold tracking-widest text-white uppercase mb-1">REPORT PREVIEW</h2>
                <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">Condensed Intelligence Summary</p>
              </div>
              <div className="relative w-20 h-20 flex items-center justify-center -mt-2 -mr-2">
                <svg className="w-full h-full -rotate-90">
                  <circle className="text-surface-container-highest" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="4"></circle>
                  <circle 
                    className="text-violet-400 drop-shadow-[0_0_8px_rgba(167,139,250,0.6)]" 
                    cx="40" cy="40" 
                    fill="transparent" 
                    r="34" 
                    stroke="currentColor" 
                    strokeDasharray="213.6" 
                    strokeDashoffset={213.6 * (1 - (data?.overallScore || 0) / 100)} 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.19, 1, 0.22, 1)' }}
                  ></circle>
                </svg>
                <span className="absolute font-headline font-black text-white text-xl">{data?.overallScore || 0}</span>
              </div>
            </div>

            <div className="space-y-5 mb-10 relative z-10">
              {(Array.isArray(data.executiveSummary) ? data.executiveSummary : Array.isArray(data.opportunities) ? data.opportunities : typeof data.executiveSummary === 'string' ? [data.executiveSummary] : []).slice(0, 3).map((opp, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <CheckCircle size={18} className="text-violet-400 mt-0.5 shrink-0" strokeWidth={2.5} />
                  <p className="text-sm leading-relaxed font-medium text-white/90">{opp}</p>
                </div>
              ))}
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-sm border border-surface-container-high relative z-10">
              <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-4">Competitor Strength Analysis</h3>
              {data.competitors && data.competitors.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {data.competitors.map((comp, idx) => {
                    const da = parseInt(comp.estimatedDA || comp.domainAuthority || 0, 10) || 15
                    const isHigh = comp.threatLevel === 'DOMINANT' || comp.threatLevel === 'High'
                    return (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: isHigh ? 'rgba(167,139,250,1)' : 'rgba(255,255,255,0.7)', letterSpacing: '0.03em' }}>
                            {comp.name}
                          </span>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
                            DA {da}
                          </span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%',
                            width: `${Math.min(da, 100)}%`,
                            borderRadius: '3px',
                            background: isHigh ? 'rgba(167,139,250,0.9)' : 'rgba(167,139,250,0.3)',
                            boxShadow: isHigh ? '0 0 8px rgba(167,139,250,0.4)' : 'none',
                            transition: 'width 0.8s cubic-bezier(0.19,1,0.22,1)',
                          }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                    {data.keyMetrics?.numCompetitors
                      ? `${data.keyMetrics.numCompetitors} competitors identified · avg DA ${data.keyMetrics.avgCompetitorDA || '—'}`
                      : 'Competitor breakdown unavailable for this report'}
                  </p>
                  {data.keyMetrics?.avgCompetitorDA ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.03em' }}>Market Average</span>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>DA {data.keyMetrics.avgCompetitorDA}</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.min(data.keyMetrics.avgCompetitorDA, 100)}%`,
                          borderRadius: '3px',
                          background: 'rgba(167,139,250,0.4)',
                          transition: 'width 0.8s cubic-bezier(0.19,1,0.22,1)',
                        }} />
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </motion.div>

          {/* EXPORT OPTIONS CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container border border-surface-container-high mb-8 rounded-sm p-8 md:p-10 shadow-[inner_0_2px_10px_rgba(0,0,0,0.5)]"
          >
            <h2 className="font-headline text-lg font-bold tracking-widest text-white uppercase mb-8">EXPORT OPTIONS</h2>
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-primary-fixed to-violet-400 h-16 rounded-sm flex items-center justify-between px-8 group active:scale-[0.98] transition-all cyan-glow"
              >
                <span className="font-headline font-black text-on-primary-fixed tracking-widest text-sm uppercase">DOWNLOAD PDF</span>
                <Download size={20} strokeWidth={2.5} className="text-on-primary-fixed group-hover:translate-y-0.5 transition-transform" />
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleExportJSON}
                  className="bg-surface-container-highest border border-surface-container-highest h-16 rounded-sm flex items-center justify-center gap-3 hover:border-violet-400/30 active:scale-[0.98] transition-all group"
                >
                  <span className="font-headline font-black text-violet-400 tracking-widest text-[11px] uppercase group-hover:scale-105 transition-transform">JSON Data</span>
                </button>
                <button 
                  onClick={handleExportCSV}
                  className="bg-surface-container-highest border border-surface-container-highest h-16 rounded-sm flex items-center justify-center gap-3 hover:border-violet-400/30 active:scale-[0.98] transition-all group"
                >
                  <span className="font-headline font-black text-violet-400 tracking-widest text-[11px] uppercase group-hover:scale-105 transition-transform">CSV export</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* PERMANENT LINK CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-container border border-surface-container-high mb-8 rounded-sm p-8 md:p-10 shadow-[inner_0_2px_10px_rgba(0,0,0,0.5)]"
          >
            <h2 className="font-headline text-[11px] font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-6">PERMANENT LINK</h2>
            <div className="flex items-center gap-3 bg-surface-container-lowest border border-surface-container-high p-3 rounded-sm group overflow-hidden">
              <input 
                className="bg-transparent border-none text-xs font-medium text-white/90 font-mono flex-1 focus:ring-0 px-3 outline-none w-full" 
                readOnly 
                type="text" 
                value={reportUrl}
              />
              <button 
                onClick={handleCopyLink}
                className={`p-3 rounded-sm transition-all focus:outline-none shrink-0 border border-transparent ${
                   copiedLink 
                   ? 'bg-violet-400/10 text-violet-400 border-violet-400/20' 
                   : 'bg-surface-container-highest hover:border-surface-container-high text-on-surface-variant hover:text-white'
                }`}
              >
                {copiedLink ? <CheckCircle size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </motion.div>

          {/* LOWER GRID */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* SHARE REPORT CARD */}
            <div className="bg-surface-container border border-surface-container-high rounded-sm p-8 flex flex-col items-center justify-center shadow-[inner_0_2px_10px_rgba(0,0,0,0.5)]">
              <h2 className="font-headline text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-6 text-center">External Share</h2>
              <div className="flex justify-center gap-6">
                <button className="w-12 h-12 flex items-center justify-center rounded-sm bg-surface-container-lowest border border-surface-container-high text-on-surface-variant hover:text-violet-400 hover:border-violet-400/30 hover:shadow-[0_0_12px_rgba(167,139,250,0.1)] transition-all">
                   <Monitor size={20} />
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-sm bg-surface-container-lowest border border-surface-container-high text-on-surface-variant hover:text-violet-400 hover:border-violet-400/30 hover:shadow-[0_0_12px_rgba(167,139,250,0.1)] transition-all">
                   <Smartphone size={20} />
                </button>
              </div>
            </div>

            {/* SYSTEM AUDIT CARD */}
            <div className="bg-surface-container border border-surface-container-high rounded-sm p-8 flex flex-col items-center justify-center text-center shadow-[inner_0_2px_10px_rgba(0,0,0,0.5)]">
              <div className="w-12 h-12 rounded-sm bg-violet-400/10 flex items-center justify-center text-violet-400 cyan-glow mb-4">
                 <CheckCircle size={22} strokeWidth={2.5} />
              </div>
              <p className="font-headline text-[10px] font-bold text-white uppercase tracking-widest mb-1.5">VERIFIED BY AI</p>
              <p className="text-[9px] text-on-surface-variant font-mono font-bold uppercase tracking-widest">{timestamp || 'SCAN-PENDING'}</p>
            </div>
          </motion.div>

        </div>
      </main>
      <Toast visible={copiedLink} message="Link copied to clipboard" />
    </div>
  )
}


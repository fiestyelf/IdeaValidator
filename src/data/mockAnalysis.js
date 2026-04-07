export const MOCK_ANALYSIS_DATA = {
  id: 'IV-992-DELTA',
  overallScore: 82,
  metrics: {
    marketResonance: 88,
    executionFeasibility: 76,
    competitiveAdvantage: 85,
    financialViability: 79,
    timingToMarket: 84,
    technicalComplexity: 65
  },
  executiveSummary: [
    "High market resonance within the Tier-1 urban demographic, exceeding initial growth projections by 14%.",
    "Competitive analysis reveals a 3-month strategic window for aggressive customer acquisition before market saturation.",
    "Unit economics validated at scale with a projected LTV/CAC ratio of 4.2x in Year 2."
  ],
  competitors: [
    {
      name: 'AlphaScale',
      domainAuthority: 87,
      pricing: 'Enterprise Custom',
      keyWeakness: 'Slow Iteration Velocity',
      threatLevel: 'DOMINANT'
    },
    {
      name: 'NexusFlow',
      domainAuthority: 64,
      pricing: 'SaaS Tiered',
      keyWeakness: 'High Churn Rate',
      threatLevel: 'CONTESTED'
    },
    {
      name: 'ZenithOps',
      domainAuthority: 52,
      pricing: 'Freemium PLG',
      keyWeakness: 'Limited Enterprise Features',
      threatLevel: 'CONTESTED'
    }
  ],
  keyMetrics: {
    marketSaturation: '64%',
    avgCompetitorDA: 67
  },
  deploymentStrategy: {
    phase1: {
      title: 'Stealth Incubation & Pilot',
      duration: 'Months 1-3',
      actions: [
        'Secure 5 high-value pilot customers via direct outreach.',
        'Refine core value loop without public marketing.',
        'Establish baseline telemetry and usage patterns.'
      ],
      trigger: 'Achieve 80% daily active usage amongst pilot cohort.'
    },
    phase2: {
      title: 'Asymmetric Strike',
      duration: 'Months 4-6',
      actions: [
        'Launch targeted acquisition campaigns exploiting incumbent weak points (e.g., pricing rigidity).',
        'Release self-serve onboarding flow.',
        'Activate initial referral program mechanics.'
      ],
      trigger: 'Surpass $10k MRR and reduce CPA below $150.'
    },
    phase3: {
      title: 'Moat Deepening',
      duration: 'Months 7-12',
      actions: [
        'Roll out enterprise-grade security and compliance features.',
        'Build API ecosystem for sticky integrations.',
        'Transition support to a high-touch CS model for top quartile.'
      ],
      trigger: 'Achieve Net Dollar Retention > 120%.'
    }
  },
  businessAnalysis: {
    swot: {
      strengths: [
        'Proprietary neural architecture reduces processing overhead by 40%.',
        'Agile development methodology allowing weekly feature deployment.',
        'Founding team holds deep domain expertise.'
      ],
      weaknesses: [
        'Limited initial capital runway restricts aggressive paid marketing.',
        'Brand awareness is currently negligible compared to incumbents.',
        'Platform currently lacks native mobile parity.'
      ],
      opportunities: [
        'Incumbents are increasingly moving upmarket, abandoning the SMB tier.',
        'New regulatory frameworks favor locally hosted or private AI models.',
        'Untapped international markets (specifically APAC region).'
      ],
      threats: [
        'Potential pricing war initiated by well-funded venture-backed rivals.',
        'Rapid evolution of open-source models commoditizing core features.',
        'Key personnel poaching risk in a highly competitive talent market.'
      ]
    },
    marketSizing: {
      tam: '$14.2B',
      sam: '$3.8B',
      som: '$120M',
      growthRate: '18% CAGR'
    },
    financials: {
      targetCac: '$250',
      expectedLtv: '$1,800',
      paybackPeriod: '4 Months',
      grossMargin: '84%'
    }
  }
}

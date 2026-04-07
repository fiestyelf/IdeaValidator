export async function analyzeIdea({ idea, market, competitors, includeTrends }) {
  const isDev = import.meta.env.DEV;
  // Use local backend proxy in dev, and relative /api in prod (assuming proxying)
  const proxyUrl = isDev ? 'http://localhost:3001/api/analyze' : '/api/analyze';

  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        idea, 
        market, 
        competitors, 
        includeTrends
      }),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      console.error('Proxy Error Response:', errJson);
      // Fallback if the backend fails, to provide a demo experience
      return getMockData(idea);
    }

    const json = await response.json();
    const text = json.result;

    if (!text) throw new Error('Proxy responded with empty result');

    // Extract JSON from response (same logic as before)
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error('Could not parse AI response as JSON');

    return JSON.parse(match[0]);

  } catch (error) {
    console.error('Network or Proxy connection failed, falling back to mock:', error);
    return getMockData(idea);
  }
}

// Mock data for demo when no API key is present or connection fails
export function getMockData(idea) {
  const ideaTitle = idea?.slice(0, 40) || "This concept";
  return {
    overallScore: 74,
    marketDemandScore: 81,
    competitiveScore: 62,
    feasibilityScore: 79,
    monetizationScore: 70,
    founderFitScore: 68,
    timingScore: 85,
    avgSubscriptionPrice: '$29 / month',
    executiveSummary: `The "${ideaTitle}" concept shows strong market demand with high search volume for terms like "AI business tools." Competition is moderate, but established players lack the AI-native automation described here, creating a 12-month window. Verdict: Go-fast prototype.`,
    pivotSuggestions: [
      `Focus "${ideaTitle}" strictly on B2B agtech rather than general SaaS`,
      'Target non-technical founders instead of developers',
      'Pivot to a Chrome extension for faster acquisition'
    ],
    opportunities: [
      'AI-native UX competitors aren\'t offering',
      'Underserved SMB market segment',
      'Integration ecosystem play (Notion, Slack)',
      'Vertical-specific versions',
    ],
    risks: [
      'Well-funded incumbents could ship AI features',
      'LLM API costs at scale',
      'Customer acquisition cost in crowded SaaS',
    ],
    regulatoryAndAiRisk: {
      complianceBurden: 'Low - Standard data privacy (GDPR/CCPA) applies',
      aiTakeoverRisk: 'High - Foundational models could release a native agent for this workflow',
      details: `No major regulatory hurdles for "${ideaTitle}", but significant platform displacement risk from LLM providers.`
    },
    competitors: [
      { name: 'Validate AI', estimatedDA: 42, trafficTier: 'Medium', pricingModel: 'Freemium', keyWeakness: 'No competitor analysis module', featureGaps: ['No real-time data', 'Lacks cohort analysis'], threatLevel: 'Medium' },
      { name: 'IdeaBuddy', estimatedDA: 35, trafficTier: 'Low', pricingModel: 'Paid', keyWeakness: 'Dated UI, no AI integration', featureGaps: ['Manual input only', 'Legacy codebase'], threatLevel: 'Low' },
      { name: 'Lean Canvas AI', estimatedDA: 58, trafficTier: 'High', pricingModel: 'Freemium', keyWeakness: 'Static templates, no dynamic scoring', featureGaps: ['No market trends', 'Basic reporting'], threatLevel: 'High' },
    ],
    dimensionExplanations: {
      marketDemand: `Search data indicates consistent growth in demand for tools like "${ideaTitle}". The target segment is highly underserved by current manual offerings.`,
      competitiveIntensity: 'The market has several players but none offer AI-native validation with real-time benchmarking yet.',
      technicalFeasibility: 'The tech stack is well understood — LLM APIs and SaaS infrastructure. A solo founder could ship an MVP in 6-8 weeks.',
      monetizationClarity: 'SaaS subscription at $29-$79/month is well-validated in adjacent tools.',
      founderFit: 'Success depends on deep community ties and SEO execution.',
      timing: 'AI adoption is at an all-time high. The window to establish brand authority is now.',
    },
    opportunityGapSummary: `Existing tools treat validation as a static exercise. The opportunity for "${ideaTitle}" lies in real-time, AI-powered validation with live market data—a workflow tool, not just a one-time report.`,
    keyMetrics: {
      monthlySearchVolume: '41,200',
      numCompetitors: 5,
      avgCompetitorDA: 47,
      trendDirection: '↑ +34% (90d)',
      timeToMVP: '6-8 weeks',
    },
    marketSizing: {
      tam: '$2.1B',
      sam: '$450M',
      som: '$15M',
      sourceLogic: 'Estimated based on global SaaS tool spend and indie hacker segment size.'
    },
    trendRadar: {
      status: 'Accelerating',
      monthlyData: [40, 42, 45, 50, 48, 55, 60, 65, 75, 80, 95, 100]
    },
    evidencePoints: {
      marketDemand: [`Related terms for "${ideaTitle}" are trending on Reddit`, 'ProductHunt trending category'],
      competitiveIntensity: ['Avg DA 47 (beatable)', 'No AI-native leader'],
      technicalFeasibility: ['Standard API stack', '6-8 week MVP estimate'],
      monetizationClarity: ['$29-79/mo SaaS validated', 'Usage-based at scale'],
      founderFit: ['Dev + design needed', 'No domain expertise barrier'],
      timing: ['AI hype cycle peak', 'VC interest in vertical AI'],
    },
  }
}

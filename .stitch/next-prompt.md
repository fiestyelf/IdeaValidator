---
page: dashboard
---
Design a professional dark-mode main report dashboard for IdeaValidator.

DESIGN SYSTEM: Luminal Observer Dark Mode
- Background: #0c0e12, Surface cards: #1d2025, Sidebar: #111318
- Primary accent: #8ff5ff (cyan glow), Secondary: #3fff8b (green), Alert: #ff716c
- Fonts: Space Grotesk (headers, ALL CAPS, letter-spacing 0.05em) + Inter (body)
- NO solid 1px borders — use tonal background shifts only
- Card radius: 4px (sharp, technical). Status pips only: full radius
- Glassmorphism for floating panels: 60% opacity + backdrop-blur 12px
- Typography scale: Display 3.5rem/700, Headline 1.75rem/600, Body 0.875rem/400
- Glow effects for active data: cyan glow drop-shadow(0 0 8px rgba(143,245,255,0.3))
- Sidebar: left-border accent on active nav items, NOT background highlight

**Page Structure:**
1. Left sidebar (160px): IdeaValidator logo top, nav items (Dashboard, Analysis, Market Radar, Export Data), user profile bottom - active item has cyan left-border
2. Top header: breadcrumb "OVERVIEW / VALIDATION INTELLIGENCE", large title "Idea Dashboard."
3. Score row: 3 large metric cards: "OVERALL SCORE 78/100", "MARKET FIT 82%", "RISK LEVEL LOW" — with colored indicator pips
4. Main content grid: "VALIDATION SUMMARY" card with AI synthesis text + 6 dimension scores as horizontal progress bars (Market Demand, Competitive Advantage, Revenue Potential, Technical Feasibility, Team Alignment, Timing)
5. Right panel: circular score gauge (large, glowing cyan ring), and a "KEY INSIGHTS" card below with 3 bulleted findings
6. Bottom section: "MOMENTUM INDICATORS" with mini spark charts showing trends

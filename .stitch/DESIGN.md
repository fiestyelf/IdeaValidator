# Design System: The Luminal Observer (IdeaValidator Dark Mode)

## 1. Overview & Creative North Star
**"The Luminal Observer"** — a high-performance dark design system for deep-focus data monitoring.
The interface feels like a **Digital Vacuum**: deep charcoals with data points that "float" in a pressurized, high-tech space.

**Creative Principles:**
- **Intentional Asymmetry:** Editorial rhythm using varied spacing tokens
- **The Glow State:** Light is information. Use primary/secondary glows for vitality signals
- **Atmospheric Depth:** Layered like a cockpit HUD, not flat UI

---

## 2. Colors & Surface Hierarchy

### Core Palette
- **Background:** `#0c0e12` (The Void)
- **Primary (Cyan):** `#8ff5ff` / `#00F0FF` — trust anchor, key actions
- **Secondary (Green):** `#3fff8b` — success / safe signals
- **Tertiary (Blue):** `#6e9bff` — supplemental data
- **Error (Red):** `#ff716c` — alerts

### The "No-Line" Rule
Prohibit 1px solid borders. Define boundaries through background shifts only:
- Base: `#0c0e12`
- Sections: `#111318`
- Interactive cards: `#1d2025`
- Component highlight: `#23262c`

### Surface Hierarchy
| Level | Token | Hex | Purpose |
|-------|-------|-----|---------|
| 0 | surface | `#0c0e12` | The void background |
| 1 | surface_container | `#171a1f` | Main content areas |
| 2 | surface_container_high | `#1d2025` | Cards & modules |
| 3 | surface_bright | `#292c33` | Modals & overlays |

### Glassmorphism Rule
For floating panels:
- Fill: `#23262c` at 60% opacity
- Effect: `backdrop-filter: blur(12px)`
- Gradient: `#8ff5ff` → `#00eefc` at 135° angle

---

## 3. Typography: The Editorial HUD

**Fonts:** Space Grotesk (Display/Headlines) + Inter (Data/Body)

| Role | Size | Weight | Spacing | Use |
|------|------|--------|---------|-----|
| Display | 3.5rem | 700 | -0.04em | Hero stats, critical numbers |
| Headline | 1.75rem | 600 | -0.02em | Panel headers (ALL CAPS) |
| Title | 1.0rem | 500 | 0 | Sub-section labels |
| Body | 0.875rem | 400 | 0 | Log data, descriptions |
| Label | 0.75rem | 600 | +0.05em | Micro-data, tags, metadata |

---

## 4. Elevation & Depth

- **Tonal Layering:** `surface_container_lowest` on `surface_container_low` = recessed data look
- **Ghost Border:** `#46484d` at 20% opacity (felt, not seen)
- **Glow States:** Secondary green `drop-shadow(0 0 8px rgba(63, 255, 139, 0.4))`
- **No traditional box-shadows** — use tonal shifts instead

---

## 5. Components

### Buttons
- **Primary:** Cyan gradient `#8ff5ff` → `#00eefc`, sharp `sm` (2px) radius
- **Secondary:** Ghost style with `#292c33` hover fill
- No rounded pill buttons (except status indicators)

### Inputs
- Base: `#1d2025` fill, no border lines
- Focus: `#292c33` + cyan ghost border at 20% opacity

### Cards
- No dividers — use `spacing-2` vertical whitespace
- Green `#3fff8b` for success/safe indicators
- Red `#ff716c` for alerts

### Sidebar Navigation
- Background: `#111318`
- Active item: left border `#8ff5ff` + `#1d2025` fill
- Icon + label in Space Grotesk Label style

---

## 6. Design System Notes for Stitch Generation

**REQUIRED BLOCK — copy into every Stitch prompt:**

```
DESIGN SYSTEM: Luminal Observer Dark Mode
- Background: #0c0e12, Surface cards: #1d2025, Sidebar: #111318
- Primary accent: #8ff5ff (cyan glow), Secondary: #3fff8b (green), Alert: #ff716c
- Fonts: Space Grotesk (headers, ALL CAPS, letter-spacing 0.05em) + Inter (body)
- NO solid 1px borders — use tonal background shifts only
- Card radius: 4px (sharp, technical). Status pips only: full radius
- Glassmorphism for floating panels: 60% opacity + backdrop-blur 12px
- Typography scale: Display 3.5rem/700, Headline 1.75rem/600, Body 0.875rem/400
- Glow effects for active data: secondary green glow drop-shadow(0 0 8px rgba(63,255,139,0.4))
- Sidebar: left-border accent on active nav items, NOT background highlight
```

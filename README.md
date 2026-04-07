# IdeaValidator

IdeaValidator is a full-stack, AI-driven business intelligence application designed to rapidly assess, analyze, and validate business ideas. By leveraging Large Language Models, it generates comprehensive reports including competitor profiles, market viability, SWOT analyses, and asymmetric advantage strategies. 

## 🏗️ Architecture

Below is the high-level architecture diagram of IdeaValidator:

```mermaid
flowchart TD
    %% User and UI Layer
    User((User))
    UI[Frontend: React / Vite\nTailwind CSS, Framer Motion]
    Context[React Context\nGlobal State]
    
    User -->|Submit Idea / Navigate| UI
    UI <-->|Manage State| Context
    
    %% API Gateway / Backend Layer
    subgraph Express Backend Layer
        API[Express API\nRate Limiting & Helmet & CORS]
        AIProxy[/api/analyze]
        StorageController[/api/reports]
    end
    
    UI -->|POST & GET| API
    API --> AIProxy
    API --> StorageController
    
    %% External Services and DB Layer
    LLM[Anthropic / OpenRouter API]
    DB[(SQLite Local DB\nWAL Mode)]
    
    AIProxy <-->|Prompt Generation\n& Rate-Limited Calls| LLM
    StorageController <-->|Persist Permanent Links| DB
```

## 🛠️ Tech Stack

**Frontend:**
- React 18 & Vite
- React Router DOM for SPA routing
- Tailwind CSS & Framer Motion for premium styling and dynamic animations
- Recharts for data visualization
- Lucide React for iconography

**Backend:**
- Express.js Node Server
- Better SQLite3 for lightweight, high-performance local persistence
- Axios / Axios-Retry for resilient HTTP requests to AI services
- Pino & Pino-HTTP for structured logging
- Helmet & Express-Rate-Limit for security

**AI Integration:**
- Anthropic Claude 3.5 Sonnet / OpenRouter API

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- An API Key from Anthropic or OpenRouter

### Installation

1. **Clone & Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Rename `.env.example` to `.env` or create a new `.env` file containing:
   ```env
   ANTHROPIC_API_KEY=your_api_key_here
   PORT=3001
   LOG_LEVEL=info
   NODE_ENV=development
   ```

3. **Run the Application Locally**
   To start both the Vite development server and the Express backend simultaneously:
   ```bash
   npm run dev:full
   ```
   The frontend will be available at `http://localhost:5173` while the server runs on `http://localhost:3001`.

### Build for Production
To build the static assets for the React UI:
```bash
npm run build
```
Then start the Node.js serve which will automatically serve the unified package:
```bash
npm start
```

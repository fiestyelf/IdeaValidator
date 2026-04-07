const express = require('express');
const cors = require('cors');
const axios = require('axios');
const axiosRetry = require('axios-retry').default;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const pino = require('pino');
const pinoHttp = require('pino-http');
const path = require('path');
const fs = require('fs').promises;
const Database = require('better-sqlite3');
const crypto = require('crypto');
const { SYSTEM_PROMPT } = require('./constants');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// 1. Initialize Structured Logger
const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined
});

const app = express();
const PORT = process.env.PORT || 3001;

// 2. Middlewares & Security
app.use(pinoHttp({ logger }));
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:"],
            fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
            connectSrc: ["'self'", "ws:", "wss:"],
        },
    },
}));
app.use(cors()); 
app.use(express.json());

// 3. Static Assets (Production)
// This enables the server to serve your React UI from the 'dist' folder
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Configure Axios with retries
axiosRetry(axios, { 
    retries: 3, 
    retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429,
    retryDelay: axiosRetry.exponentialDelay 
});

// 4. Global Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { error: 'Calm down! Too many requests. Try again in 15 minutes.' }
});
app.use('/api', limiter);

// 5. API Endpoints
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'production'
    });
});

app.post('/api/analyze', async (req, res) => {
    const apiKey = process.env.ANTHROPIC_API_KEY; 
    const { idea, market, competitors, includeTrends } = req.body;
    
    if (!apiKey) {
        req.log.error('API Key missing');
        return res.status(500).json({ error: 'Server misconfigured' });
    }

    const isOpenRouter = apiKey.startsWith('sk-or-v1-');
    const endpoint = isOpenRouter 
        ? 'https://openrouter.ai/api/v1/chat/completions' 
        : 'https://api.anthropic.com/v1/messages';
    
    const modelName = isOpenRouter 
        ? 'anthropic/claude-3.5-sonnet' 
        : 'claude-3-5-sonnet-20241022';

    const userMsg = `Idea: ${idea}. Market: ${market || 'Not specified'}. Known competitors: ${competitors || 'Not specified'}. Include Google Trends analysis: ${includeTrends}.`;

    try {
        const headers = isOpenRouter ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'X-Title': 'IdeaValidator'
        } : {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        };

        const body = isOpenRouter ? {
            model: modelName,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMsg }
            ]
        } : {
            model: modelName,
            max_tokens: 4000,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: userMsg }]
        };

        let response;
        try {
            // Attempt primary model
            response = await axios.post(endpoint, body, { headers, timeout: 60000 });
        } catch (error) {
            // If primary model (Sonnet) is unauthorized or 404, try Haiku as fallback
            if ((error.response?.status === 404 || error.response?.status === 403) && isOpenRouter) {
                req.log.warn('Primary model unauthorized, falling back to Haiku...');
                body.model = 'anthropic/claude-3-haiku';
                response = await axios.post(endpoint, body, { headers, timeout: 60000 });
            } else {
                throw error;
            }
        }

        const text = isOpenRouter 
            ? response.data.choices?.[0]?.message?.content 
            : response.data.content?.[0]?.text;
        
        res.json({ result: text });

    } catch (error) {
        req.log.error({ 
            message: error.message,
            responseData: error.response?.data,
            stack: error.stack 
        }, 'AI Proxy Failure');
        res.status(500).json({ error: 'AI processing failed' });
    }
});

/**
 * Persistence Layer for Reports
 * This enables the 'Permanent Link Formation' task.
 */
const DATA_DIR = path.join(__dirname, 'data');
let db;

// Ensure reports directory exists on startup and initialize SQLite
(async () => {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        db = new Database(path.join(DATA_DIR, 'reports.db'));
        db.pragma('journal_mode = WAL');
        db.exec(`
            CREATE TABLE IF NOT EXISTS reports (
                id TEXT PRIMARY KEY,
                idea TEXT,
                data TEXT,
                timestamp DATETIME
            )
        `);
    } catch (err) {
        logger.error('Failed to initialize local database', err);
    }
})();

app.post('/api/reports', async (req, res) => {
    try {
        const { reportData, ideaText } = req.body;
        if (!reportData) return res.status(400).json({ error: 'Payload empty' });

        const reportId = crypto.randomUUID();
        const timestamp = new Date().toISOString();

        const stmt = db.prepare('INSERT INTO reports (id, idea, data, timestamp) VALUES (@id, @idea, @data, @timestamp)');
        stmt.run({
            id: reportId,
            idea: ideaText || null,
            data: JSON.stringify(reportData),
            timestamp
        });

        res.json({ id: reportId });
    } catch (error) {
        req.log.error(error, 'Failed to save report');
        res.status(500).json({ error: 'Storage failure' });
    }
});

app.get('/api/reports/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const stmt = db.prepare('SELECT * FROM reports WHERE id = ?');
        const reportRow = stmt.get(id);
        
        if (!reportRow) {
            return res.status(404).json({ error: 'Report not found' });
        }
        
        const report = {
            id: reportRow.id,
            data: JSON.parse(reportRow.data),
            idea: reportRow.idea,
            timestamp: reportRow.timestamp
        };
        
        res.json(report);
    } catch (error) {
        req.log.error(error, 'Report retrieval failed');
        res.status(500).json({ error: 'Retrieval failure' });
    }
});

// 6. SPA Fallback (Production)
// This ensures that React Router works by sending all non-API requests to index.html
app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    logger.info(`🚀 Unified Engine active on port ${PORT}`);
});

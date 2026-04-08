const axios = require('axios')
const axiosRetry = require('axios-retry').default
const { SYSTEM_PROMPT } = require('../server/constants')

axiosRetry(axios, {
  retries: 3,
  retryCondition: (error) => axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429,
  retryDelay: axiosRetry.exponentialDelay
})

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  const { idea, market, competitors, includeTrends } = req.body

  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const isOpenRouter = apiKey.startsWith('sk-or-v1-')
  const endpoint = isOpenRouter
    ? 'https://openrouter.ai/api/v1/chat/completions'
    : 'https://api.anthropic.com/v1/messages'

  const modelName = isOpenRouter
    ? 'anthropic/claude-3.5-sonnet'
    : 'claude-3-5-sonnet-20241022'

  const userMsg = `Idea: ${idea}. Market: ${market || 'Not specified'}. Known competitors: ${competitors || 'Not specified'}. Include Google Trends analysis: ${includeTrends}.`

  const headers = isOpenRouter ? {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'X-Title': 'IdeaValidator'
  } : {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01'
  }

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
  }

  try {
    let response
    try {
      response = await axios.post(endpoint, body, { headers, timeout: 60000 })
    } catch (error) {
      if ((error.response?.status === 404 || error.response?.status === 403) && isOpenRouter) {
        body.model = 'anthropic/claude-3-haiku'
        response = await axios.post(endpoint, body, { headers, timeout: 60000 })
      } else {
        throw error
      }
    }

    const text = isOpenRouter
      ? response.data.choices?.[0]?.message?.content
      : response.data.content?.[0]?.text

    res.json({ result: text })
  } catch (error) {
    console.error('AI Proxy Failure:', error.message, error.response?.data)
    res.status(500).json({ error: 'AI processing failed' })
  }
}

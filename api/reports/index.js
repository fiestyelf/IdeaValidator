// Report persistence is not available in the serverless environment.
// The frontend handles this gracefully with a console.warn fallback.
module.exports = function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(503).json({ error: 'Report saving not available in this deployment' })
  }
  res.status(405).json({ error: 'Method not allowed' })
}

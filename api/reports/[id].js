module.exports = function handler(req, res) {
  res.status(503).json({ error: 'Report retrieval not available in this deployment' })
}

'use strict';
const { getUpdates } = require('../lib/updates');
module.exports = async function handler(req, res) {
  res.setHeader('Allow', 'GET, HEAD');
  if (req.method !== 'GET' && req.method !== 'HEAD') return res.status(405).json({ error: 'GET required' });
  try {
    const data = await getUpdates();
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=60');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).json(data);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({ error: 'Updates are temporarily unavailable.' });
  }
};

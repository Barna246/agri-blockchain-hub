(function (root) {
  'use strict';
  const string = v => typeof v === 'string' && v.trim().length > 0;
  function safeURL(value, local = false) {
    if (!string(value)) return null;
    try {
      const u = new URL(value, 'https://field-ledger.invalid/');
      if (!/^https?:$/.test(u.protocol) || u.username || u.password) return null;
      if (!local && u.hostname === 'field-ledger.invalid') return null;
      return local && u.hostname === 'field-ledger.invalid' ? value : u.href;
    } catch { return null; }
  }
  function validDate(value) {
    if (!string(value)) return null;
    const n = Date.parse(value);
    if (/^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(n) && new Date(n).toISOString().slice(0, 10) !== value) return null;
    return Number.isFinite(n) && n >= Date.UTC(1990, 0, 1) && n <= Date.now() ? value : null;
  }
  function resources(value, categories) {
    if (!Array.isArray(value)) return [];
    const seen = new Set();
    return value.flatMap(e => {
      if (!e || !string(e.id) || !string(e.title) || !string(e.body) || !categories.includes(e.category) || seen.has(e.id)) return [];
      if (e.tags != null && (!Array.isArray(e.tags) || e.tags.some(t => typeof t !== 'string'))) return [];
      if (e.meta != null && typeof e.meta !== 'string') return [];
      if (e.links != null && (!Array.isArray(e.links) || e.links.some(l => !l || !safeURL(l.href, true) || (l.label != null && typeof l.label !== 'string')))) return [];
      if (e.link != null && !safeURL(e.link, true)) return [];
      if (e.videoUrl != null && !safeURL(e.videoUrl)) return [];
      for (const field of ['segments', 'overlays']) {
        if (e[field] != null && (!Array.isArray(e[field]) || e[field].some(s => !s || typeof s.text !== 'string' || (s.label != null && typeof s.label !== 'string') || (s.time != null && typeof s.time !== 'string')))) return [];
      }
      if (e.publishedAt && !validDate(e.publishedAt)) return [];
      seen.add(e.id);
      return [{ ...e, tags: e.tags || [], links: e.links || (e.link ? [{ href: e.link, label: e.linkLabel || 'Open source' }] : []), publishedAt: e.publishedAt || null }];
    });
  }
  function snapshot(value) {
    if (!value || !Array.isArray(value.items) || !Array.isArray(value.sources)) return null;
    const sources = value.sources.filter(s => s && string(s.id) && string(s.name) && safeURL(s.website));
    if (!sources.length) return null;
    const seen = new Set();
    const items = value.items.flatMap(i => {
      if (!i || !string(i.title) || !safeURL(i.link) || !sources.some(s => s.id === i.sourceId) || !Array.isArray(i.topics) || i.topics.some(t => typeof t !== 'string') || seen.has(i.link)) return [];
      seen.add(i.link);
      return [{ ...i, publishedAt: validDate(i.publishedAt), updatedAt: validDate(i.updatedAt), retrievedAt: validDate(i.retrievedAt), note: typeof i.note === 'string' ? i.note : '' }];
    }).sort((a, b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0));
    return { ...value, items, sources, healthySources: sources.filter(s => s.status === 'ok').length, automaticSources: sources.filter(s => s.feedUrl).length };
  }
  async function fetchJSON(url, timeout = 8000) {
    const controller = new AbortController();
    let timer;
    try {
      return await Promise.race([
        fetch(url, { signal: controller.signal }).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
        new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error('Request timed out')); }, timeout); })
      ]);
    } finally { clearTimeout(timer); }
  }
  root.FieldLedgerData = { resources, snapshot, fetchJSON, safeURL, validDate };
  if (typeof module !== 'undefined') module.exports = root.FieldLedgerData;
})(typeof window !== 'undefined' ? window : globalThis);

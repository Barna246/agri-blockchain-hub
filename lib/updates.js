'use strict';
const { XMLParser } = require('fast-xml-parser');
const sources = require('../sources.json');
const reviewed = require('../reviewed-updates.json');
const TTL = 300000;
const MAX_BYTES = 1500000;
const parser = new XMLParser({ ignoreAttributes: false, parseTagValue: false, processEntities: true });
const array = v => v == null ? [] : Array.isArray(v) ? v : [v];
const text = v => typeof v === 'object' && v !== null ? String(v['#text'] || '') : String(v || '');
const plain = v => text(v).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 500);
function canonical(value, base) {
  try {
    const u = new URL(value, base);
    if (!['http:', 'https:'].includes(u.protocol) || u.username || u.password) return null;
    u.hash = '';
    for (const key of [...u.searchParams.keys()]) if (/^(utm_|fbclid$|gclid$)/i.test(key)) u.searchParams.delete(key);
    return u.href;
  } catch { return null; }
}
function date(value, now) {
  const raw = text(value).trim();
  // Never derive publication from the fetch time or a URL slug.
  if (!raw || !(/\b\d{4}\b/.test(raw) || /^\d{4}-/.test(raw))) return null;
  const parsed = Date.parse(raw);
  return Number.isFinite(parsed) && parsed >= Date.UTC(1990, 0, 1) && parsed <= now ? new Date(parsed).toISOString() : null;
}
function classify(title, categories, defaults) {
  const s = (title + ' ' + categories.join(' ')).toLowerCase();
  const found = new Set(defaults);
  if (/climat|weather|rainfall|drought|flood|heatwave|el ni.o|irrigat|water stress/.test(s)) found.add('Weather & climate');
  if (/robot|drone|sensor|artificial intelligence|machine learning|agtech|agritech|precision|digital|satellite/.test(s)) found.add('AgTech & innovation');
  if (/africa|nigeria|kenya|ghana|uganda|ethiopia|tanzania|sahel|smallholder/.test(s)) found.add('Africa & Nigeria');
  if (/research|study|report|learn|training|science/.test(s)) found.add('Research & learning');
  return [...found];
}
function parseFeed(xml, source, now = Date.now()) {
  if (/<!ENTITY/i.test(xml)) throw new Error('Custom XML entities rejected');
  // WordPress often includes a simple DOCTYPE. External subsets are never fetched.
  const parsed = parser.parse(xml);
  const root = parsed.rss?.channel || parsed.feed || parsed['rdf:RDF'];
  if (!root) throw new Error('Not an RSS or Atom feed');
  const records = array(root.item || root.entry);
  return records.slice(0, 25).flatMap(item => {
    const title = plain(item.title);
    const atom = array(item.link).find(l => l && typeof l === 'object' && (!l['@_rel'] || l['@_rel'] === 'alternate'));
    const rawLink = atom?.['@_href'] || text(item.link);
    const link = rawLink.trim() ? canonical(rawLink, source.website) : null;
    if (!title || !link) return [];
    const rawDate = item.pubDate || item.published || item['dc:date'];
    const publishedAt = date(rawDate, now);
    const updatedAt = date(item.updated, now);
    return [{ title, link, publishedAt, updatedAt, datePrecision: 'instant', dateStatus: publishedAt ? 'Publisher supplied' : rawDate ? 'Invalid or future date supplied' : 'Publication date not supplied', sourceId: source.id, topics: classify(title, array(item.category).map(plain), source.topics), curated: false }];
  });
}
async function readFeed(source, fetcher = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6500);
  try {
    const r = await fetcher(source.feedUrl, { signal: controller.signal, headers: { Accept: 'application/rss+xml,application/atom+xml,application/xml,text/xml', 'User-Agent': 'FieldLedger/2.0 (agriculture source reader)' } });
    if (!r.ok) throw new Error('Publisher returned HTTP ' + r.status);
    if (Number(r.headers.get('content-length')) > MAX_BYTES) throw new Error('Feed exceeds size limit');
    const reader = r.body.getReader();
    let size = 0; const chunks = [];
    while (true) {
      const { value, done } = await reader.read(); if (done) break;
      size += value.length;
      if (size > MAX_BYTES) { await reader.cancel(); throw new Error('Feed exceeds size limit'); }
      chunks.push(value);
    }
    const xml = Buffer.concat(chunks).toString('utf8');
    return parseFeed(xml, source);
  } finally { clearTimeout(timer); }
}
let memo, pending;
const lastGood = new Map();
async function collect(fetcher = fetch) {
  const checkedAt = new Date().toISOString();
  const results = await Promise.all(sources.filter(s => s.feedUrl).map(async s => {
    try {
      const items = await readFeed(s, fetcher);
      if (!items.length) throw new Error('No readable entries in feed');
      const value = { items, checkedAt };
      lastGood.set(s.id, value);
      return { source: s, ...value, status: 'ok' };
    } catch (e) {
      const old = lastGood.get(s.id);
      return { source: s, items: old?.items || [], checkedAt, lastSuccessAt: old?.checkedAt || null, status: old ? 'stale' : 'unavailable', message: e.name === 'AbortError' ? 'Publisher timed out' : e.message };
    }
  }));
  const unique = new Map();
  for (const r of results) for (const item of r.items) {
    const link = canonical(item.link);
    if (!unique.has(link)) unique.set(link, { ...item, link, retrievedAt: r.status === 'ok' ? r.checkedAt : r.lastSuccessAt, stale: r.status !== 'ok' });
  }
  for (const item of reviewed) {
    const key = canonical(item.link);
    const old = unique.get(key);
    unique.set(key, { ...old, ...item, link: key, retrievedAt: old?.retrievedAt || null, stale: old?.stale || false });
  }
  const items = [...unique.values()].sort((a, b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0)).slice(0, 150);
  const publicSources = sources.map(s => {
    const result = results.find(r => r.source.id === s.id);
    return { ...s, status: result?.status || 'reference', lastCheckedAt: result?.checkedAt || null, lastSuccessAt: result?.status === 'ok' ? result.checkedAt : result?.lastSuccessAt || null, count: result?.items.length || 0, message: result?.message || null };
  });
  return { generatedAt: checkedAt, refreshSeconds: 300, items, sources: publicSources, healthySources: results.filter(r => r.status === 'ok').length, automaticSources: results.length };
}
async function getUpdates() {
  if (memo && Date.now() - memo.time < TTL) return memo.data;
  if (!pending) pending = collect().then(data => { memo = { time: Date.now(), data }; return data; }).finally(() => { pending = null; });
  return pending;
}
module.exports = { parseFeed, canonical, date, classify, collect, getUpdates };

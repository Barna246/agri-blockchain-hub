// /api/live-data.js
// Vercel Serverless Function. Aggregates four live "field sensor" feeds and
// returns one JSON payload. Response is edge-cached for 30 minutes
// (stale-while-revalidate for another hour) so visitors get a fast cached
// read and the underlying APIs never see per-visitor traffic.
//
// All four sources are free and keyless. Nothing here requires secrets.
// If you later add a CoinGecko Demo API key for a higher rate limit, set
// COINGECKO_API_KEY as a Vercel environment variable and it will be used
// automatically.

const CRYPTO_IDS = [
  { id: "solana", label: "Solana (SOL)" },
  { id: "klima-dao", label: "KlimaDAO (KLIMA)" },
  { id: "toucan-protocol-nature-carbon-tonne", label: "Toucan Carbon (NCT)" },
  { id: "regen", label: "Regen Network (REGEN)" }
];

const TVL_SLUGS = [
  { slug: "toucan-protocol", label: "Toucan Protocol" },
  { slug: "klimadao", label: "KlimaDAO" },
  { slug: "regen-network", label: "Regen Network" }
];

const STOCK_TICKERS = [
  { sym: "DE.US", label: "Deere & Co" },
  { sym: "ADM.US", label: "Archer-Daniels-Midland" },
  { sym: "BG.US", label: "Bunge Global" },
  { sym: "CTVA.US", label: "Corteva" },
  { sym: "NTR.US", label: "Nutrien" },
  { sym: "MOS.US", label: "The Mosaic Company" },
  { sym: "DBA.US", label: "Invesco DB Agriculture Fund (ETF)" },
  { sym: "WEAT.US", label: "Teucrium Wheat Fund (ETF)" },
  { sym: "CORN.US", label: "Teucrium Corn Fund (ETF)" },
  { sym: "SOYB.US", label: "Teucrium Soybean Fund (ETF)" }
];

const NEWS_FEEDS = [
  "https://agfundernews.com/feed",
  "https://www.agdaily.com/feed/"
];

const TIMEOUT_MS = 8000;

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))
  ]);
}

async function fetchCrypto() {
  const ids = CRYPTO_IDS.map((c) => c.id).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
  const headers = { accept: "application/json" };
  if (process.env.COINGECKO_API_KEY) {
    headers["x-cg-demo-api-key"] = process.env.COINGECKO_API_KEY;
  }
  const r = await withTimeout(fetch(url, { headers }), TIMEOUT_MS);
  if (!r.ok) throw new Error("coingecko " + r.status);
  const data = await r.json();
  return CRYPTO_IDS.filter((c) => data[c.id]).map((c) => ({
    id: c.id,
    label: c.label,
    priceUsd: data[c.id].usd,
    change24h: data[c.id].usd_24h_change
  }));
}

async function fetchTVL() {
  const out = [];
  for (const p of TVL_SLUGS) {
    try {
      const r = await withTimeout(fetch(`https://api.llama.fi/tvl/${p.slug}`), TIMEOUT_MS);
      if (!r.ok) continue;
      const tvl = await r.json();
      if (typeof tvl === "number") out.push({ slug: p.slug, label: p.label, tvlUsd: tvl });
    } catch (e) {
      // skip this one, keep going
    }
  }
  return out;
}

async function fetchStocks() {
  const symbols = STOCK_TICKERS.map((t) => t.sym.toLowerCase()).join(",");
  const url = `https://stooq.com/q/l/?s=${symbols}&f=sd2t2ohlcv&h&e=csv`;
  const r = await withTimeout(fetch(url), TIMEOUT_MS);
  if (!r.ok) throw new Error("stooq " + r.status);
  const csv = (await r.text()).trim();
  const lines = csv.split("\n");
  if (lines.length < 2) return [];
  const header = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(",");
    const row = {};
    header.forEach((h, i) => { row[h] = cols[i]; });
    const meta = STOCK_TICKERS.find(
      (t) => t.sym.toLowerCase() === String(row.Symbol || "").toLowerCase()
    );
    return {
      symbol: row.Symbol || "",
      label: meta ? meta.label : row.Symbol || "",
      close: row.Close && row.Close !== "N/D" ? Number(row.Close) : null,
      date: row.Date || ""
    };
  }).filter((r) => r.close !== null);
}

function parseRss(xml, source, limit) {
  const items = [];
  const itemRe = /<item[\s\S]*?<\/item>/g;
  const matches = xml.match(itemRe) || [];
  for (const block of matches.slice(0, limit)) {
    const title = extractTag(block, "title");
    const link = extractTag(block, "link");
    const pubDate = extractTag(block, "pubDate");
    if (title) items.push({ title: decodeEntities(title), link: link.trim(), pubDate, source });
  }
  return items;
}

function extractTag(block, tag) {
  const m = block.match(new RegExp("<" + tag + "[^>]*>([\\s\\S]*?)</" + tag + ">"));
  if (!m) return "";
  return m[1].replace("<![CDATA[", "").replace("]]>", "").trim();
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "\u2019")
    .replace(/&#8216;/g, "\u2018")
    .replace(/&#8211;/g, "\u2013");
}

async function fetchNews() {
  const all = [];
  for (const feedUrl of NEWS_FEEDS) {
    try {
      const r = await withTimeout(fetch(feedUrl, { headers: { accept: "application/rss+xml, application/xml, text/xml" } }), TIMEOUT_MS);
      if (!r.ok) continue;
      const xml = await r.text();
      const source = new URL(feedUrl).hostname.replace("www.", "");
      all.push(...parseRss(xml, source, 4));
    } catch (e) {
      // skip this feed, keep going
    }
  }
  all.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  return all.slice(0, 8);
}

module.exports = async function handler(req, res) {
  const [crypto, tvl, stocks, news] = await Promise.all([
    fetchCrypto().catch(() => []),
    fetchTVL().catch(() => []),
    fetchStocks().catch(() => []),
    fetchNews().catch(() => [])
  ]);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=3600"
  );
  res.status(200).json({
    updatedAt: new Date().toISOString(),
    crypto,
    tvl,
    stocks,
    news
  });
};

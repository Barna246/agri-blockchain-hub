(async function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const url = s => { try { const u = new URL(s); return ['http:', 'https:'].includes(u.protocol) ? u.href : '#'; } catch { return '#'; } };
  const instant = value => value && Number.isFinite(Date.parse(value)) ? new Date(value).toLocaleString('en-GB', { timeZone: 'Africa/Lagos', dateStyle: 'medium', timeStyle: 'short' }) + ' WAT' : null;
  function published(item) {
    if (!item.publishedAt) return 'Publication date not supplied / unconfirmed';
    if (item.datePrecision === 'day') return new Date(item.publishedAt).toLocaleDateString('en-GB', { timeZone: 'UTC', dateStyle: 'medium' });
    return instant(item.publishedAt) || 'Publication date not supplied / unconfirmed';
  }
  let data = { items: [], sources: [] }, limit = 12, busy = false, lastAttempt = 0, offline = false;
  let good, hasLive=false;
  try { good = FieldLedgerData.snapshot(JSON.parse(localStorage.getItem('field-ledger-updates-v1'))); } catch {}
  function render() {
    const query = $('updateSearch').value.trim().toLowerCase();
    const topic = $('updateTopic').value, sourceId = $('updateSource').value, age = $('updateAge').value;
    const items = data.items.filter(i => (!query || (i.title + ' ' + (i.note || '')).toLowerCase().includes(query)) && (!topic || i.topics.includes(topic)) && (!sourceId || i.sourceId === sourceId) && (!age || (age === 'unknown' ? !i.publishedAt : i.publishedAt && Date.parse(i.publishedAt) <= Date.now() && Date.now() - Date.parse(i.publishedAt) <= Number(age) * 86400000)));
    $('updateCount').textContent = items.length + ' matching updates · Newest published first · Dates shown in WAT when a time is supplied';
    $('updateCards').innerHTML = items.length ? items.slice(0, limit).map(item => {
      const source = data.sources.find(s => s.id === item.sourceId);
      return '<article class="update-card"><span class="topic-label">' + esc(item.topics.join(' / ')) + '</span><a class="update-title" target="_blank" rel="noopener noreferrer" href="' + esc(url(item.link)) + '">' + esc(item.title) + ' ↗</a><p>' + esc(source?.name || item.sourceId) + ' · ' + esc(source?.type || 'Publisher') + '</p>' + (item.note ? '<p class="update-note">Field Ledger reading note: ' + esc(item.note) + '</p>' : '') + '<div class="dates"><div>Published: ' + (item.publishedAt ? '<time datetime="' + esc(item.publishedAt) + '">' + esc(published(item)) + '</time>' : esc(published(item))) + '</div>' + (item.updatedAt ? '<div>Publisher updated: ' + esc(instant(item.updatedAt)) + '</div>' : '') + (item.retrievedAt ? '<div>Feed retrieved: ' + esc(instant(item.retrievedAt)) + '</div>' : '') + (item.checkedOn ? '<div>Manually reviewed: ' + esc(item.checkedOn) + '</div>' : '') + '<small>' + (offline || item.stale ? 'Saved / stale item — open publisher to confirm' : item.curated ? 'Manually selected reference' : 'Automatic feed item · Not independently verified') + '</small></div></article>';
    }).join('') : '<p>No updates match these filters. Try a wider publication window or another topic.</p>';
    $('moreUpdates').hidden = limit >= items.length;
    $('sourceList').innerHTML = data.sources.map(s => '<article class="source-item"><a target="_blank" rel="noopener noreferrer" href="' + esc(url(s.website)) + '"><strong>' + esc(s.name) + ' ↗</strong></a><p>' + esc(s.type) + ' · ' + esc(s.region) + '</p><span class="health ' + esc(s.status || '') + '">' + esc(s.status === 'ok' ? 'Feed available' : s.status === 'stale' ? 'Feed failed · saved items' : s.status === 'unavailable' ? 'Feed unavailable' : s.feedUrl ? 'Feed not checked in this session' : 'Reference page · manual reading') + '</span><p>' + esc(s.message || s.note || '') + '</p>' + (s.lastCheckedAt ? '<p>Attempted: ' + esc(instant(s.lastCheckedAt)) + '</p>' : '<p>Directory reviewed: ' + esc(s.checkedOn) + '</p>') + (s.lastSuccessAt ? '<p>Last successful retrieval: ' + esc(instant(s.lastSuccessAt)) + '</p>' : '') + '</article>').join('');
  }
  function sourceOptions() {
    const selected = $('updateSource').value;
    $('updateSource').innerHTML = '<option value="">All publishers</option>' + data.sources.map(s => '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>').join('');
    $('updateSource').value = selected;
  }
  if(good){data=good;offline=true;sourceOptions();render();}
  Promise.allSettled([FieldLedgerData.fetchJSON('sources.json'),FieldLedgerData.fetchJSON('reviewed-updates.json')]).then(results=>{if(hasLive||good)return;const sources=results[0].status==='fulfilled'?results[0].value:[],items=results[1].status==='fulfilled'?results[1].value:[];const checked=FieldLedgerData.snapshot({sources,items});if(checked){data=checked;sourceOptions();render();}});
  async function refresh() {
    if (busy || Date.now() - lastAttempt < 15000) return;
    busy = true; lastAttempt = Date.now(); $('refreshUpdates').disabled = true;
    $('updateStatus').textContent = 'Checking publisher feeds…';
    try {
      const latest = FieldLedgerData.snapshot(await FieldLedgerData.fetchJSON('/api/updates',15000));
      if (!latest) throw Error('Invalid updates response');
      if (good?.items?.length) {
        const failedIds = new Set(latest.sources.filter(s => s.status === 'unavailable' || s.status === 'stale').map(s => s.id));
        const merged = new Map(latest.items.map(i => [i.link, i]));
        for (const item of good.items) if (failedIds.has(item.sourceId) && !merged.has(item.link)) merged.set(item.link, { ...item, stale: true });
        for (const source of latest.sources) if (failedIds.has(source.id) && !source.lastSuccessAt) source.lastSuccessAt = good.sources.find(s => s.id === source.id)?.lastSuccessAt || null;
        latest.items = [...merged.values()].sort((a, b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0));
      }
      data = latest; hasLive=true; offline = !latest.generatedAt || Date.now()-Date.parse(latest.generatedAt)>420000;
      if (latest.healthySources > 0) { good = latest; try { localStorage.setItem('field-ledger-updates-v1', JSON.stringify(latest)); } catch {} }
      $('updateStatus').textContent = (offline?'Saved collection may be out of date · ':'') + latest.healthySources + '/' + latest.automaticSources + ' feeds available · Collection checked ' + instant(latest.generatedAt) + ' · Checks every 5 minutes while visible; caching may add about 2 minutes.';
      sourceOptions(); render();
    } catch {
      offline = true;
      $('updateStatus').textContent = 'Live connection unavailable. Showing ' + (good?.items?.length ? 'previously saved items' : 'manually reviewed references') + '. Open original sources for current information.';
      render();
    } finally {
      busy = false;
      setTimeout(() => { $('refreshUpdates').disabled = false; }, 15000);
    }
  }
  for (const id of ['updateSearch', 'updateTopic', 'updateSource', 'updateAge']) $(id).addEventListener(id === 'updateSearch' ? 'input' : 'change', () => { limit = 12; render(); });
  $('resetUpdates').onclick=()=>{for(const id of ['updateSearch','updateTopic','updateSource','updateAge'])$(id).value='';limit=12;render();};
  $('moreUpdates').onclick = () => { limit += 12; render(); };
  $('refreshUpdates').onclick = refresh;
  setInterval(() => { if (!document.hidden) refresh(); }, 300000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden && Date.now() - lastAttempt >= 300000) refresh(); });
  refresh();
})();

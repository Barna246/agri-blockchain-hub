// Watch the Series — renders published episodes as a gallery,
// pulling straight from LEDGER_DATA so there's only one place
// (data.js) to update when a new episode ships.

(function () {
  const grid = document.getElementById('watchGrid');
  if (!grid || !window.LEDGER_DATA) return;

  const episodes = window.LEDGER_DATA.entries
    .filter(e => e.category === 'scripts' && e.status === 'Published')
    .sort((a, b) => a.episodeNumber - b.episodeNumber);

  if (episodes.length === 0) {
    grid.innerHTML = '<p style="font-family: var(--font-body); color: var(--parchment-300);">Nothing published yet — check back soon.</p>';
    return;
  }

  const playIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  grid.innerHTML = episodes.map(ep => {
    const links = ep.videoUrl
      ? `<a class="watch-btn" href="${ep.videoUrl}" target="_blank" rel="noopener">Watch &rarr;</a>`
      : `<span class="watch-btn watch-btn--pending">Link coming soon</span>`;

    const thumbImg = ep.thumbnailUrl
      ? `<img class="watch-thumb-img" src="${ep.thumbnailUrl}" alt="" loading="lazy">`
      : '';

    return `
      <article class="watch-card">
        <a class="watch-thumb" href="${ep.videoUrl || '#'}" ${ep.videoUrl ? 'target="_blank" rel="noopener"' : 'tabindex="-1" aria-hidden="true"'}>
          ${thumbImg}
          <span class="ep-num">EP ${ep.episodeNumber}</span>
          <span class="watch-play">${playIcon}</span>
        </a>
        <div class="watch-body">
          <p class="watch-meta">${ep.duration || ''}</p>
          <h3 class="watch-title">${ep.title}</h3>
          <div class="watch-links">
            ${links}
            <a class="watch-btn watch-research" href="index.html#${ep.id}">Research &amp; sources</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
})();

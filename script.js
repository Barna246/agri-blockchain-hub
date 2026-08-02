(function () {
  "use strict";

  var DATA = window.LEDGER_DATA;
  var categories = DATA.categories;
  var entries = DATA.entries;
  var changelog = DATA.changelog.slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  var state = { category: "all", query: "" };

  var catnavEl = document.getElementById("catnav");
  var mobilebarEl = document.getElementById("mobilebar");
  var chipsEl = document.getElementById("chips");
  var boardEl = document.getElementById("board");
  var resultCountEl = document.getElementById("resultCount");
  var emptyStateEl = document.getElementById("emptyState");
  var statsRowEl = document.getElementById("statsRow");
  var logListEl = document.getElementById("logList");
  var seamTopEl = document.getElementById("seamTop");
  var searchInput = document.getElementById("searchInput");
  var modalOverlay = document.getElementById("episodeModal");
  var modalContent = document.getElementById("modalContent");
  var modalClose = document.getElementById("modalClose");

  function categoryById(id) {
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id === id) return categories[i];
    }
    return null;
  }

  function countFor(catId) {
    return entries.filter(function (e) { return e.category === catId; }).length;
  }

  /* ---------- Seam (signature divider) ---------- */
  function buildSeam(el, repeats) {
    el.innerHTML = "";
    for (var i = 0; i < repeats; i++) {
      var link = document.createElement("span");
      link.className = "seam-link";
      el.appendChild(link);
      var sprout = document.createElement("span");
      sprout.className = "seam-sprout";
      el.appendChild(sprout);
    }
  }
  buildSeam(seamTopEl, 10);
  var seamBottoms = document.querySelectorAll(".seam:not(#seamTop)");
  seamBottoms.forEach(function (el) { buildSeam(el, 10); });

  /* ---------- Sidebar category nav ---------- */
  function renderCatNav() {
    catnavEl.innerHTML = "";
    categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.className = "catnav-item";
      btn.setAttribute("data-cat", cat.id);
      btn.innerHTML =
        '<span class="dot ' + cat.accent + '" aria-hidden="true"></span>' +
        "<span>" + cat.label + "</span>" +
        '<span class="count">' + countFor(cat.id) + "</span>";
      btn.addEventListener("click", function () {
        setCategory(cat.id, true);
      });
      catnavEl.appendChild(btn);
    });
  }

  /* ---------- Mobile quick-nav (always reachable, no scrolling needed) ---------- */
  function renderMobileBar() {
    mobilebarEl.innerHTML = "";
    var all = document.createElement("button");
    all.className = "mobilebar-item";
    all.setAttribute("data-cat", "all");
    all.textContent = "All";
    all.addEventListener("click", function () { setCategory("all", true); });
    mobilebarEl.appendChild(all);

    categories.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.className = "mobilebar-item";
      btn.setAttribute("data-cat", cat.id);
      btn.textContent = cat.label;
      btn.addEventListener("click", function () { setCategory(cat.id, true); });
      mobilebarEl.appendChild(btn);
    });
    syncMobileBarState();
  }

  function syncMobileBarState() {
    var items = mobilebarEl.querySelectorAll(".mobilebar-item");
    items.forEach(function (btn) {
      btn.setAttribute("aria-selected", btn.getAttribute("data-cat") === state.category ? "true" : "false");
    });
  }

  /* ---------- Filter chips ---------- */
  function renderChips() {
    chipsEl.innerHTML = "";
    var all = document.createElement("button");
    all.className = "chip";
    all.textContent = "All (" + entries.length + ")";
    all.setAttribute("data-cat", "all");
    all.addEventListener("click", function () { setCategory("all"); });
    chipsEl.appendChild(all);

    categories.forEach(function (cat) {
      var chip = document.createElement("button");
      chip.className = "chip";
      chip.setAttribute("data-cat", cat.id);
      chip.textContent = cat.label + " (" + countFor(cat.id) + ")";
      chip.addEventListener("click", function () { setCategory(cat.id); });
      chipsEl.appendChild(chip);
    });
    syncChipState();
  }

  function syncChipState() {
    var chipButtons = chipsEl.querySelectorAll(".chip");
    chipButtons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-cat") === state.category;
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  function setCategory(catId, shouldScroll) {
    state.category = catId;
    syncChipState();
    syncMobileBarState();
    render();
    if (shouldScroll) {
      var target = document.querySelector(".toolbar");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ---------- Cards ---------- */
  function matchesQuery(entry, q) {
    if (!q) return true;
    var haystack = (entry.title + " " + entry.body + " " + (entry.tags || []).join(" ") + " " + (entry.meta || "")).toLowerCase();
    return haystack.indexOf(q) !== -1;
  }

  function renderBoard() {
    var q = state.query.trim().toLowerCase();
    var filtered = entries.filter(function (e) {
      var catOk = state.category === "all" || e.category === state.category;
      return catOk && matchesQuery(e, q);
    });

    boardEl.innerHTML = "";
    filtered.forEach(function (entry) {
      if (entry.category === "scripts" && entry.segments) {
        boardEl.appendChild(buildEpisodeCard(entry));
        return;
      }

      var cat = categoryById(entry.category);
      var card = document.createElement("article");
      card.className = "card";
      card.setAttribute("data-accent", cat ? cat.accent : "wheat");

      var eyebrow = document.createElement("div");
      eyebrow.className = "card-eyebrow";
      eyebrow.innerHTML = '<span class="dot" aria-hidden="true"></span><span>' + (cat ? cat.label : entry.category) + "</span>";
      card.appendChild(eyebrow);

      var h3 = document.createElement("h3");
      h3.textContent = entry.title;
      card.appendChild(h3);

      var p = document.createElement("p");
      p.textContent = entry.body;
      card.appendChild(p);

      if (entry.meta) {
        var meta = document.createElement("div");
        meta.className = "card-meta";
        meta.textContent = entry.meta;
        card.appendChild(meta);
      }

      if (entry.link) {
        var linkEl = document.createElement("a");
        linkEl.className = "card-link";
        linkEl.href = entry.link;
        linkEl.target = "_blank";
        linkEl.rel = "noopener noreferrer";
        linkEl.textContent = entry.linkLabel || "Open \u2192";
        card.appendChild(linkEl);
      }

      boardEl.appendChild(card);
    });

    resultCountEl.textContent = filtered.length + (filtered.length === 1 ? " entry" : " entries");
    emptyStateEl.hidden = filtered.length !== 0;
    boardEl.hidden = filtered.length === 0;
  }

  /* ---------- Episode cards + reader modal ---------- */
  function buildEpisodeCard(entry) {
    var card = document.createElement("article");
    card.className = "ep-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Read " + entry.title);

    var num = document.createElement("div");
    num.className = "ep-number";
    num.innerHTML = String(entry.episodeNumber || "\u2014").padStart(2, "0") + "<span>Episode</span>";
    card.appendChild(num);

    var main = document.createElement("div");
    main.className = "ep-main";
    var h3 = document.createElement("h3");
    h3.textContent = entry.title;
    var hook = document.createElement("p");
    hook.className = "ep-hook";
    hook.textContent = "\u201c" + entry.hook + "\u201d";
    var metaRow = document.createElement("div");
    metaRow.className = "ep-meta-row";
    metaRow.innerHTML =
      (entry.status ? '<span class="ep-status">' + entry.status + "</span>" : "") +
      (entry.duration ? '<span class="ep-duration">' + entry.duration + "</span>" : "") +
      (entry.dateLabel ? '<span class="ep-date">' + entry.dateLabel + "</span>" : "");
    main.appendChild(h3);
    main.appendChild(hook);
    main.appendChild(metaRow);
    card.appendChild(main);

    var action = document.createElement("span");
    action.className = "ep-action";
    action.textContent = "Read script \u2192";
    card.appendChild(action);

    function open() { openEpisodeModal(entry); }
    card.addEventListener("click", open);
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });

    return card;
  }

  function openEpisodeModal(entry) {
    var html = "";
    html += '<p class="modal-eyebrow">Episode ' + String(entry.episodeNumber || "").padStart(2, "0") + "</p>";
    html += "<h2 id=\"modalTitle\">" + entry.title + "</h2>";
    html += '<div class="modal-meta">' +
      (entry.status ? "<span>" + entry.status + "</span>" : "") +
      (entry.duration ? "<span>" + entry.duration + "</span>" : "") +
      (entry.dateLabel ? "<span>" + entry.dateLabel + "</span>" : "") +
      "</div>";

    (entry.segments || []).forEach(function (seg) {
      html += '<div class="modal-segment"><div class="modal-seg-head"><span class="lbl">' + seg.label + '</span><span class="t">' + seg.time + "</span></div><p>" + seg.text + "</p></div>";
    });

    if (entry.altCut) {
      html += '<div class="modal-block"><h4>' + entry.altCut.label + "</h4><p>" + entry.altCut.text + "</p></div>";
    }

    if (entry.overlays && entry.overlays.length) {
      html += '<div class="modal-block"><h4>On-screen text overlays</h4><ul class="modal-overlay-list">';
      entry.overlays.forEach(function (ov) {
        html += "<li><b>" + ov.time + "</b> \u2014 " + ov.text + "</li>";
      });
      html += "</ul></div>";
    }

    if (entry.sourcesNote) {
      html += '<p class="modal-sources">Sources: ' + entry.sourcesNote + "</p>";
    }

    if (entry.link) {
      html += '<a class="modal-rawlink" href="' + entry.link + '" target="_blank" rel="noopener noreferrer">' + (entry.linkLabel || "Raw .md \u2192") + "</a>";
    }

    modalContent.innerHTML = html;
    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeEpisodeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeEpisodeModal);
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeEpisodeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalOverlay.hidden) closeEpisodeModal();
  });

  /* ---------- Stats ---------- */
  function renderStats() {
    var lastDate = changelog.length ? changelog[0].date : "\u2014";
    var stats = [
      { label: "Entries", value: String(entries.length) },
      { label: "Categories", value: String(categories.length) },
      { label: "Last cultivated", value: lastDate }
    ];
    statsRowEl.innerHTML = "";
    stats.forEach(function (s) {
      var wrap = document.createElement("div");
      var dt = document.createElement("dt");
      dt.textContent = s.label;
      var dd = document.createElement("dd");
      dd.textContent = s.value;
      wrap.appendChild(dt);
      wrap.appendChild(dd);
      statsRowEl.appendChild(wrap);
    });
  }

  /* ---------- Field log ---------- */
  function renderLog() {
    logListEl.innerHTML = "";
    changelog.forEach(function (item) {
      var li = document.createElement("li");
      li.className = "log-item";
      var date = document.createElement("span");
      date.className = "log-date";
      date.textContent = item.date;
      var note = document.createElement("p");
      note.className = "log-note";
      note.textContent = item.note;
      li.appendChild(date);
      li.appendChild(note);
      logListEl.appendChild(li);
    });
  }

  /* ---------- Search ---------- */
  searchInput.addEventListener("input", function (e) {
    state.query = e.target.value;
    render();
  });

  function render() {
    renderBoard();
  }

  renderCatNav();
  renderMobileBar();
  renderChips();
  renderStats();
  renderLog();
  render();
})();

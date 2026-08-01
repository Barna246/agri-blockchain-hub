(function () {
  "use strict";

  var updatedEl = document.getElementById("sensorsUpdated");
  var cryptoEl = document.getElementById("sensorCrypto");
  var tvlEl = document.getElementById("sensorTvl");
  var stocksEl = document.getElementById("sensorStocks");
  var newsEl = document.getElementById("sensorNews");
  var scriptsEl = document.getElementById("sensorScripts");

  function fmtUsd(n, decimals) {
    if (n === null || n === undefined || isNaN(n)) return "\u2014";
    return "$" + Number(n).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function fmtCompactUsd(n) {
    if (n === null || n === undefined || isNaN(n)) return "\u2014";
    if (n >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
    if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
    if (n >= 1e3) return "$" + (n / 1e3).toFixed(1) + "K";
    return "$" + n.toFixed(0);
  }

  function changeSpan(change) {
    if (change === null || change === undefined || isNaN(change)) return "";
    var up = change >= 0;
    var cls = up ? "chg-up" : "chg-down";
    var arrow = up ? "\u2191" : "\u2193";
    return '<span class="sensor-change ' + cls + '">' + arrow + " " + Math.abs(change).toFixed(2) + "%</span>";
  }

  function timeAgo(iso) {
    if (!iso) return "";
    var diffMs = Date.now() - new Date(iso).getTime();
    var mins = Math.round(diffMs / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + " min ago";
    var hrs = Math.round(mins / 60);
    return hrs + (hrs === 1 ? " hour ago" : " hours ago");
  }

  function renderEmpty(el, label) {
    el.innerHTML = '<p class="sensor-empty">' + label + "</p>";
  }

  function renderCrypto(list) {
    if (!list || !list.length) return renderEmpty(cryptoEl, "No live crypto readings right now.");
    var rows = list.map(function (c) {
      return (
        '<div class="sensor-row">' +
          '<span class="sensor-row-label">' + c.label + "</span>" +
          '<span class="sensor-row-value">' + fmtUsd(c.priceUsd, c.priceUsd < 1 ? 4 : 2) + " " + changeSpan(c.change24h) + "</span>" +
        "</div>"
      );
    }).join("");
    cryptoEl.innerHTML = rows;
  }

  function renderTvl(list) {
    if (!list || !list.length) return renderEmpty(tvlEl, "None of the tracked ReFi protocols currently resolve on DefiLlama.");
    var rows = list.map(function (p) {
      var value = p.tvlUsd === null || p.tvlUsd === undefined
        ? '<span class="sensor-unavailable">not tracked</span>'
        : fmtCompactUsd(p.tvlUsd);
      return (
        '<div class="sensor-row">' +
          '<span class="sensor-row-label">' + p.label + "</span>" +
          '<span class="sensor-row-value">' + value + "</span>" +
        "</div>"
      );
    }).join("");
    tvlEl.innerHTML = rows;
  }

  function renderStocks(list) {
    if (!list || !list.length) return renderEmpty(stocksEl, "No live quotes right now.");
    var rows = list.map(function (s) {
      var value = s.close === null || s.close === undefined
        ? '<span class="sensor-unavailable">unavailable</span>'
        : fmtUsd(s.close, 2);
      return (
        '<div class="sensor-row">' +
          '<span class="sensor-row-label">' + s.label + "</span>" +
          '<span class="sensor-row-value">' + value + "</span>" +
        "</div>"
      );
    }).join("");
    stocksEl.innerHTML = rows;
  }

  function renderNews(list) {
    if (!list || !list.length) return renderEmpty(newsEl, "No headlines pulled in right now.");
    var rows = list.slice(0, 6).map(function (n) {
      return (
        '<a class="sensor-news-item" href="' + n.link + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="sensor-news-title">' + n.title + "</span>" +
          '<span class="sensor-news-source">' + n.source + "</span>" +
        "</a>"
      );
    }).join("");
    newsEl.innerHTML = rows;
  }

  /* ---------- Fresh script angles ----------
     Templated starter scaffolds generated client-side from whatever
     headlines came back this refresh. Not AI-written — a rotation of
     three angle templates tailored to Sir Barna's actual audience
     (Nigerian/African smallholders + Web3 viewers), meant to save the
     blank-page problem, not replace scripting. */
  var ANGLE_TEMPLATES = [
    {
      label: "Explainer angle",
      hook: function (h) { return "\u201c" + h + "\u201d \u2014 here\u2019s what that actually means if you farm in Nigeria."; },
      body: "Break the headline down in plain terms, then anchor it to a local example your audience already knows: a cooperative, a market price, a familiar crop.",
      cta: "Close with one concrete takeaway viewers can act on this week."
    },
    {
      label: "Reaction angle",
      hook: function (h) { return "I just saw this: \u201c" + h + "\u201d. My honest take \u2014"; },
      body: "Give your real opinion on whether this matters for African smallholders and why. Use your agric engineering background to say what most Web3 commentary misses.",
      cta: "Ask viewers whether they\u2019d actually trust this on their own farm."
    },
    {
      label: "Bridge angle",
      hook: function (h) { return "Everyone\u2019s talking about \u201c" + h + "\u201d \u2014 but nobody\u2019s asking what it means for someone in Abeokuta."; },
      body: "Translate the story from its original context (Silicon Valley, global VC, a US or EU pilot) into what it would actually take to work in a Nigerian farming community.",
      cta: "Invite comments: would this work where you farm?"
    }
  ];

  function renderScripts(newsList) {
    if (!newsList || !newsList.length) {
      return renderEmpty(scriptsEl, "No fresh headlines to build an angle from right now.");
    }
    var picks = newsList.slice(0, 3);
    var html = picks.map(function (item, i) {
      var tpl = ANGLE_TEMPLATES[i % ANGLE_TEMPLATES.length];
      return (
        '<div class="script-card">' +
          '<div class="script-head"><span class="script-label">' + tpl.label + '</span><span class="script-source">' + item.source + '</span></div>' +
          '<p class="script-headline"><a href="' + item.link + '" target="_blank" rel="noopener noreferrer">' + item.title + '</a></p>' +
          '<div class="script-row"><span class="k">Hook</span><span class="v">' + tpl.hook(item.title) + '</span></div>' +
          '<div class="script-row"><span class="k">Body</span><span class="v">' + tpl.body + '</span></div>' +
          '<div class="script-row"><span class="k">CTA</span><span class="v">' + tpl.cta + '</span></div>' +
        '</div>'
      );
    }).join("");
    scriptsEl.innerHTML = html;
  }

  function load() {
    fetch("/api/live-data")
      .then(function (r) {
        if (!r.ok) throw new Error("bad response");
        return r.json();
      })
      .then(function (data) {
        renderCrypto(data.crypto);
        renderTvl(data.tvl);
        renderStocks(data.stocks);
        renderNews(data.news);
        renderScripts(data.news);
        updatedEl.innerHTML = '<span class="live-dot" aria-hidden="true"></span>Last reading: ' + timeAgo(data.updatedAt);
      })
      .catch(function () {
        updatedEl.textContent = "Sensors haven\u2019t connected yet \u2014 this panel only works once deployed on Vercel.";
        renderEmpty(cryptoEl, "Unavailable in this preview.");
        renderEmpty(tvlEl, "Unavailable in this preview.");
        renderEmpty(stocksEl, "Unavailable in this preview.");
        renderEmpty(newsEl, "Unavailable in this preview.");
        renderEmpty(scriptsEl, "Unavailable in this preview.");
      });
  }

  load();
})();

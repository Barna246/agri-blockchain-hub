(function () {
  "use strict";

  var updatedEl = document.getElementById("sensorsUpdated");
  var cryptoEl = document.getElementById("sensorCrypto");
  var tvlEl = document.getElementById("sensorTvl");
  var stocksEl = document.getElementById("sensorStocks");
  var newsEl = document.getElementById("sensorNews");

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
      return (
        '<div class="sensor-row">' +
          '<span class="sensor-row-label">' + p.label + "</span>" +
          '<span class="sensor-row-value">' + fmtCompactUsd(p.tvlUsd) + "</span>" +
        "</div>"
      );
    }).join("");
    tvlEl.innerHTML = rows;
  }

  function renderStocks(list) {
    if (!list || !list.length) return renderEmpty(stocksEl, "No live quotes right now.");
    var rows = list.map(function (s) {
      return (
        '<div class="sensor-row">' +
          '<span class="sensor-row-label">' + s.label + "</span>" +
          '<span class="sensor-row-value">' + fmtUsd(s.close, 2) + "</span>" +
        "</div>"
      );
    }).join("");
    stocksEl.innerHTML = rows;
  }

  function renderNews(list) {
    if (!list || !list.length) return renderEmpty(newsEl, "No headlines pulled in right now.");
    var rows = list.map(function (n) {
      return (
        '<a class="sensor-news-item" href="' + n.link + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="sensor-news-title">' + n.title + "</span>" +
          '<span class="sensor-news-source">' + n.source + "</span>" +
        "</a>"
      );
    }).join("");
    newsEl.innerHTML = rows;
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
        updatedEl.textContent = "Last reading: " + timeAgo(data.updatedAt);
      })
      .catch(function () {
        updatedEl.textContent = "Sensors haven\u2019t connected yet \u2014 this panel only works once deployed on Vercel.";
        renderEmpty(cryptoEl, "Unavailable in this preview.");
        renderEmpty(tvlEl, "Unavailable in this preview.");
        renderEmpty(stocksEl, "Unavailable in this preview.");
        renderEmpty(newsEl, "Unavailable in this preview.");
      });
  }

  load();
})();

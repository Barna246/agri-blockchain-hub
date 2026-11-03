# Field Ledger: dated agriculture updates

## Beta repair checks

The public-beta repair pass adds input validation for resources and cached feed data, timeout-bounded content loading, immediately available original research, editor draft recovery, protection against late initial loads overwriting edits, named reading dialogs, keyboard focus restoration and safer video links. Invalid imported records are rejected rather than published. Added editor entries are saved in browser storage when available; unfinished form text is not autosaved. Use a downloaded backup before changing devices.

Run `npm ci`, `npm test` and `npm run check:accessibility` with Node 24.15 or newer in the 24.x line. The regression suite uses simulated failures, not load against production publishers. The accessibility script excludes contrast checks because it runs without a layout engine; a passing run is not a complete accessibility certification.

## What runs automatically

The page calls `/api/updates` on opening and every five minutes while visible. The server fetches seven named publisher feeds concurrently, with a 6.5-second timeout per source and a 1.5 MB response limit. A five-minute process cache and up to two minutes of edge caching reduce publisher requests. Publication-to-display latency also depends on publisher RSS schedules. This is near-live monitoring, not an instant push stream.

No AI API is called. No API keys or scheduled jobs are required. Normal Vercel hosting usage still applies. Fetching is demand-driven: when no visitors request the site, it does not continuously collect or archive new items.

## Attribution and dates

Every headline links to the original publisher, identifies the publisher type, and displays the original publication time when supplied. Updated and retrieved times are separate. Missing, invalid and future publication dates are labelled unconfirmed and sort last. Atom feeds with only an updated time are not treated as having a known publication date. All timed dates display in WAT; date-only publications keep their original calendar date.

Eight hand-reviewed references include reading notes and their review date. These are editorial selections, not new live events. Automated headlines are not independently fact-checked. AgFunderNews' Amatera interview includes a disclosure about its parent company's investment, recorded in the reading note.

Topic tags use headline/category keyword rules and source defaults. They can miss relevant material or include broad climate stories. The directory is selective, not comprehensive internet coverage. It distinguishes seven RSS sources from seven official/reference pages that require manual reading.

## Failure and history

Failed publishers do not block other feeds. Source status shows availability, last attempt and successful retrieval when known. Warm server instances retain last-good items in memory; browser storage retains previously received items. Saved items from failed sources are labelled stale. A fresh server/browser has no durable feed history. The manually reviewed references remain available if every feed fails.

There is no database archive in this release. Feed contents are a rolling window (up to 25 items per publisher; combined response capped at 150). Each publisher controls that window. To preserve an item permanently, add it through the resource editor and publish content.json.

This release provides weather/climate news and links to official monitoring. It does not produce farm-specific forecasts or emergency alerts. Read the issue date and geographic coverage of an advisory before using it.

## Maintaining sources

Edit sources.json to add or remove approved publishers. Each entry defines its website, feed URL (or null for manual reference pages), source type, topics and region. The server accepts no user-supplied URLs. reviewed-updates.json contains hand-reviewed reading references. content.json also includes these eight references in the permanent library.

## Deployment

Publish all release files, including package.json, package-lock.json, api/updates.js, lib/updates.js, sources.json, reviewed-updates.json and vercel.json. Vercel must install the pinned fast-xml-parser dependency; clear any project-level setting that disables dependency installation if present. The frontend stays buildless. No environment variables are required.

After deployment visit `/api/updates` and check that it returns JSON with items and per-source status, then open `/#updates`. Local tests retrieved 101 unique items with all seven feeds available on 3 November 2026. Publisher availability can change. The live Vercel deployment still needs verification after upload.

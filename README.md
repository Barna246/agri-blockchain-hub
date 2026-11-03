# Field Ledger public beta

Buildless smart agriculture research and learning hub on Vercel. Node 24.x is pinned. Vercel installs the lockfile dependencies; no frontend build command is required.

## Check changes

Use Node 24.15 or newer in the 24.x line:

    npm ci
    npm test
    npm run check:accessibility

The 33 tests simulate feed failures, malformed data, unsafe links, concurrency, blocked storage and slow content loading. They do not send load-test traffic to publishers. DOM accessibility checks exclude contrast and do not replace real screen-reader/device testing.

## Add research

Original research is in data.js; new entries are in content.json. The resource editor loads published entries before enabling add/export and validates imported files. Added entries save in this browser when storage permits. Unfinished form text is not autosaved. Download a backup before publishing. Import the latest content.json when returning to an old draft after changes elsewhere.

The editor cannot change the server by itself. Publish the exported content.json through your GitHub/Vercel workflow. Bookmarks are browser-local and do not sync across devices.

## Feeds

Read UPDATES-GUIDE.md. sources.json defines the publisher directory; reviewed-updates.json contains editorial references. Polling is demand-driven with shared caching, not instant push or a permanent archive. No AI API is used for routine updates. Dates and source health are shown separately.

Historical claims still need a citation/date review before broad promotion. The beta repair pass preserves the original research and adds resilient loading, data validation, draft recovery, safer watch rendering, reading-dialog labels, keyboard focus return and mobile layout fixes.

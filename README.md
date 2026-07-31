# Field Ledger — Agriculture x Blockchain research site

A static site (no build step, no dependencies) that turns the research base
into a browsable, searchable, filterable reference. Deploys to Vercel as-is.

## What's in here

- `index.html` — page structure
- `styles.css` — all design
- `data.js` — every research entry and the changelog. **This is the only file
  you need to touch to update the site.**
- `script.js` — reads `data.js` and renders the sidebar, cards, filters,
  search, stats, and field log. You shouldn't need to edit this for routine
  updates.
- `research-notes.md` — the full research doc, linked as a download from the
  sidebar.

## Deploy to Vercel (pick one)

**Fastest — no account setup beyond Vercel itself:**
1. Go to vercel.com and sign in (GitHub, GitLab, or email).
2. Click **Add New → Project**, then look for the **"deploy without Git"**
   / drag-and-drop option and drop this whole folder in.
3. Vercel auto-detects it as a static site — no framework, no build command,
   no environment variables needed. Deploy.

**Best for ongoing updates — connect a GitHub repo:**
1. Create a new GitHub repo and push this folder to it.
2. In Vercel, **Add New → Project → Import Git Repository**, pick the repo.
3. Every time the repo's `main` branch is updated, Vercel redeploys
   automatically. If you connect GitHub in a future session, I can push
   updates straight to that repo instead of you re-uploading a zip each time.

**Command line, if you have Node/npm installed locally:**
```
npm i -g vercel
cd agri-blockchain-hub
vercel
```
Follow the prompts; no configuration needed.

## How updates will work going forward

Each time you send new research, I'll add entries to `data.js` (and a line
to the `changelog` array at the bottom of that file) and hand you back the
updated folder. My work environment doesn't persist between conversations,
so either:

- re-upload this folder (or just `data.js`) next time and I'll edit it and
  hand back the update, or
- connect a GitHub repo once, and I can push updates to it directly in future
  sessions — then Vercel redeploys on its own.

Either way, nothing about the design or the deploy process changes — you're
only ever updating one data file.

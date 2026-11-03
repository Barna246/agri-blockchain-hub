# Field Ledger public hub revamp

The new homepage introduces smart agriculture to a public audience, with three beginner guides, research search and filters, title sorting, resource readers, browser-local bookmarks, and agriculture news. All original research, scripts, thumbnails, and event files are retained. Three linked starter resources broaden the library beyond blockchain. Original research claims have not been independently reverified.

## Publish on your existing Vercel project

Replace the source files in your existing repository with this folder's contents. Retain the existing Vercel project and use your usual deployment workflow. Framework preset: Other. No build command or dependencies are required. Review a preview deployment before promoting it to production. The api/live-data.js function remains in place.

## Add resources without editing code

Open editor.html. It loads the current content.json. Add resources with the form, then download the updated content.json. Replace that file in your project and redeploy. You can also import a previous content.json. Keep a backup of your downloads. Draft changes remain in the current tab until downloaded.

The editor is an export tool, not an authenticated CMS. It cannot publish or write to the server. Publication requires your repository or Vercel access. Bookmarks stay in the visitor's browser and do not sync across devices.

## Verification and limits

JavaScript syntax checked. The local browser rendered the homepage, filtered a FAOSTAT search, saved a resource, and opened its reading dialog. Live feeds need end-to-end checks on Vercel; the static preview displays an explicit unavailable state. The three new external resource pages were checked on 2026-11-03.

The original README.md describes the earlier site; this file describes the revamp.

# Rust Server — Single Server (v5, EN)

**What changed in v5**
- Everything moved to **project root** except images in **/assets**.
- `app.js`, `styles.css`, `config.json` are now in root.
- Admin form now has **per-field help** and **white labels** for readability.
- JS simplified/optimized for a single server.

**Files**
- `index.html` — website
- `admin.html` — generator for `config.json` (not linked from homepage)
- `app.js` — frontend logic (loads `config.json`, queries APIs)
- `styles.css` — styles (red theme)
- `config.sample.json` — copy/rename to `config.json` or use `admin.html`
- `assets/` — images (logo, header-bg, server-banner)

**Deploy**
Upload everything to your hosting. Generate `config.json` via `admin.html` and place it in the **root** next to `index.html`.

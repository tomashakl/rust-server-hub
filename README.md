# Rust Server — Single Server

A static, modern portal for a **single Rust server** with live status, Connect button, banner and optional map link.

## ✨ Features
- BattleMetrics / community JSON status (players, map, last wipe)
- One server card with banner, **steam://connect** link, optional **Map** link
- Clean dark + red Rust theme
- Works on any static hosting

## 🚀 Quick start
1. Clone or download.
2. Open **`admin.html`** → fill the form → **Generate `config.json`** (saved to project root).
3. Upload to your static host.

## 📁 Structure
```
/assets/           # images only
index.html
admin.html
app.js
styles.css
config.json        # generated (or use config.sample.json)
config.sample.json
```

## 🔧 Config
See `config.sample.json` for all options.

// Single-server Rust hub (optimized)
(async () => {
  const $ = (sel) => document.querySelector(sel);
  const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v ?? '-'; };
  const setHref = (id, url) => { const el = document.getElementById(id); if (!el) return; el.style.display = url ? 'inline-flex' : 'none'; if (url) el.href = url; };
  const setImg = (id, url) => { const el = document.getElementById(id); if (el && url) el.src = url; };

  async function getConfig(){
    try{ const r = await fetch('config.json', {cache:'no-store'}); if(!r.ok) throw 0; return await r.json(); }
    catch{ const r = await fetch('config.sample.json', {cache:'no-store'}); return await r.json(); }
  }

  function applyBasics(c){
    $('#siteTitle').textContent = c.site.title;
    $('#siteTagline').textContent = c.site.tagline;
    $('#ownerName') && ($('#ownerName').textContent = c.site.owner);
    $('#year') && ($('#year').textContent = new Date().getFullYear());
    const d = $('#linkDiscord'); c.links.discord ? d.href = c.links.discord : d.remove();
    const w = $('#linkWipeSchedule'); c.links.wipeSchedule ? w.href = c.links.wipeSchedule : w.remove();
  }

  function applyServer(s){
    setText('server_name', s.name || 'Server');
    setText('server_region', s.region || '');
    setHref('server_map', s.mapUrl);
    const a = document.getElementById('server_connect'); s.connectUrl ? a.setAttribute('href', s.connectUrl) : a.removeAttribute('href');
    setImg('server_banner', s.banner);
  }

  async function refresh(s){
    try{
      if(s.battlemetrics?.serverId){
        const base = (s.battlemetrics.baseUrl || 'https://api.battlemetrics.com').replace(/\/$/,'');
        const res = await fetch(`${base}/servers/${s.battlemetrics.serverId}`, { headers: s.battlemetrics.headers || {} });
        const data = await res.json();
        const a = data?.data?.attributes || {};
        setText('server_online', a.status === 'online' ? 'Online' : 'Offline');
        setText('server_players', `${a.players || 0}/${a.maxPlayers || '?'}`);
        setText('server_mapName', a.details?.map || 'unknown');
        setText('server_wipe', a.details?.rust_last_wipe || 'unknown');
        const list = document.getElementById('server_list'); if(list){ list.innerHTML=''; (data?.included||[]).filter(x=>x.type==='player').forEach(p=>{ const li = document.createElement('li'); li.textContent = p.attributes.name || 'Unnamed'; list.appendChild(li); }); }
        return;
      }
      if(s.communityApi?.statusUrl){
        const res = await fetch(s.communityApi.statusUrl); const j = await res.json();
        setText('server_online', j?.online ? 'Online' : 'Offline');
        setText('server_players', `${j?.players ?? 0}/${j?.maxPlayers ?? '?'}`);
        setText('server_mapName', j?.map ?? 'unknown');
        setText('server_wipe', j?.last_wipe ?? 'unknown');
        const list = document.getElementById('server_list'); if(list){ list.innerHTML=''; (j?.player_list||[]).forEach(n=>{ const li = document.createElement('li'); li.textContent = n; list.appendChild(li); }); }
        return;
      }
      setText('server_online', 'Unknown'); setText('server_players','-'); setText('server_mapName','-'); setText('server_wipe','-');
    }catch{ setText('server_online', 'Error'); setText('server_players','-'); setText('server_mapName','-'); setText('server_wipe','-'); }
  }

  const cfg = await getConfig();
  applyBasics(cfg);
  applyServer(cfg.server);
  await refresh(cfg.server);
  setInterval(() => refresh(cfg.server), 30000);
})();
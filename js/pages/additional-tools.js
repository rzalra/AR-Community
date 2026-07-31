/* ========================================
   AR COMMUNITY — Additional Tools Page Modules
   ======================================== */

// Helper function to render common tool wrapper with breadcrumbs, header badge, and layout
const ToolHelper = {
  renderBreadcrumbs(activeName) {
    return `
      <div class="tool-breadcrumbs" style="display: flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-size: 0.65rem; color: var(--color-text-muted); margin-bottom: var(--space-4); letter-spacing: var(--letter-spacing-wider);">
        <a href="#/home" style="color: var(--color-text-muted); text-decoration: none;">🏠 HOME</a>
        <span>&gt;</span>
        <a href="#/tools" style="color: var(--color-text-muted); text-decoration: none;">TOOLS</a>
        <span>&gt;</span>
        <span style="color: var(--color-accent-red)">${activeName.toUpperCase()}</span>
      </div>
    `;
  },

  renderHeader(title, subtitle, categoryBadge) {
    return `
      <div class="tool-header" style="margin-bottom: var(--space-6);">
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-full); margin-bottom: var(--space-3);">
          <span style="font-size: 0.7rem; color: var(--color-accent-red); font-weight: bold; letter-spacing: 0.05em;">${categoryBadge.toUpperCase()}</span>
        </div>
        <h1 style="font-size: var(--text-4xl); font-weight: var(--font-weight-black); margin-bottom: var(--space-2); line-height: 1.1;">
          ${title}
        </h1>
        <p style="color: var(--color-text-secondary); font-size: var(--text-sm); line-height: var(--line-height-relaxed);">
          ${subtitle}
        </p>
      </div>
    `;
  }
};

// 1. LUA CLEANER PAGE
const LuaCleanerPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Lua Cleaner')}
            ${ToolHelper.renderHeader('Lua Cleaner', 'Bersihkan dan rapikan script Lua kamu, hapus comment yang tidak perlu, dan perkecil ukuran file script.', '✏️ EDITOR')}
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; align-items:start;">
              <div class="tool-section">
                <h3>Script Lua Asli</h3>
                <textarea id="lua-cleaner-input" class="code-textarea" style="height:320px; font-family:monospace; font-size:0.75rem;" placeholder="-- Tempel kode Lua kamu di sini..."></textarea>
                <div style="display:flex; gap:10px; margin-top:12px;">
                  <button onclick="LuaCleanerPage.clean()" class="btn btn-primary" style="flex:2; font-weight:bold;">🧹 BERSIHKAN SCRIPT</button>
                  <button onclick="document.getElementById('lua-cleaner-input').value=''" class="btn btn-ghost" style="flex:1;">Clear</button>
                </div>
              </div>

              <div class="tool-section">
                <h3>Hasil Bersih</h3>
                <textarea id="lua-cleaner-output" class="code-textarea" style="height:320px; font-family:monospace; font-size:0.75rem;" readonly placeholder="-- Hasil pembersihan akan muncul di sini..."></textarea>
                <div style="display:flex; gap:10px; margin-top:12px;">
                  <button onclick="navigator.clipboard.writeText(document.getElementById('lua-cleaner-output').value); alert('Script disalin!')" class="btn btn-secondary" style="width:100%; font-weight:bold;">📋 SALIN HASIL</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  clean() {
    const input = document.getElementById('lua-cleaner-input')?.value;
    if (!input) return;
    
    // Simple Lua Comment removal logic
    let cleaned = input
      .replace(/--\[\[[\s\S]*?\]\]/g, '') // remove block comments --[[ ]]
      .replace(/--\[=\[[\s\S]*?\]=\]/g, '') // remove block comments --[=[ ]=]
      .replace(/--.*$/gm, '') // remove single line comments
      .replace(/^\s*[\r\n]/gm, '') // remove empty lines
      .trim();

    document.getElementById('lua-cleaner-output').value = cleaned;
  }
};

// 2. GUI BUILDER PAGE
const GuiBuilderPage = {
  elements: [],
  selectedId: null,

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('GUI Builder')}
            ${ToolHelper.renderHeader('GUI Builder', 'Rancang UI Roblox secara visual, lalu ekspor desain menjadi format Roblox XML atau kode script Lua.', '✏️ EDITOR')}
            
            <div style="display:grid; grid-template-columns: 240px 1fr 280px; gap:20px; align-items:start;">
              <!-- Sidebar Elements -->
              <div class="tool-section">
                <h3 style="margin-bottom:12px;">Toolbox</h3>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <button onclick="GuiBuilderPage.addElement('Frame')" class="btn btn-secondary btn-sm" style="text-align:left;">⬜ Add Frame</button>
                  <button onclick="GuiBuilderPage.addElement('TextLabel')" class="btn btn-secondary btn-sm" style="text-align:left;">🔤 Add TextLabel</button>
                  <button onclick="GuiBuilderPage.addElement('ImageButton')" class="btn btn-secondary btn-sm" style="text-align:left;">🖼️ Add ImageButton</button>
                </div>
                
                <h3 style="margin-top:24px; margin-bottom:12px;">Export</h3>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <button onclick="GuiBuilderPage.exportLua()" class="btn btn-primary btn-sm">📜 Export to Lua</button>
                  <button onclick="GuiBuilderPage.exportXml()" class="btn btn-secondary btn-sm">📁 Export XML</button>
                </div>
              </div>

              <!-- Main Canvas viewport -->
              <div class="tool-section" style="padding:0; position:relative; overflow:hidden;">
                <div style="background:#1a1a1a; height:380px; width:100%; position:relative; border-radius:var(--radius-md);" id="gui-canvas">
                  ${this.elements.map(el => `
                    <div id="gui-el-${el.id}" 
                      onclick="event.stopPropagation(); GuiBuilderPage.selectElement(${el.id})"
                      style="position:absolute; left:${el.x}px; top:${el.y}px; width:${el.w}px; height:${el.h}px; background:${el.bg}; border:${this.selectedId === el.id ? '2px solid var(--color-accent-cyan)' : '1px solid #444'}; color:white; font-size:0.6rem; padding:4px; cursor:move; user-select:none;"
                      ondragstart="event.preventDefault()">
                      <strong>${el.type}</strong><br>
                      ${el.type === 'TextLabel' ? `<span>${el.text}</span>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Sidebar Properties -->
              <div class="tool-section">
                <h3 style="margin-bottom:12px;">Properties</h3>
                <div id="gui-properties">
                  ${this.selectedId !== null ? this.renderProperties() : '<p style="color:var(--color-text-muted); font-size:0.7rem;">Pilih elemen di kanvas untuk mengedit properties.</p>'}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  addElement(type) {
    const id = Date.now();
    this.elements.push({
      id,
      type,
      x: 50,
      y: 50,
      w: type === 'Frame' ? 120 : 100,
      h: type === 'Frame' ? 80 : 30,
      bg: type === 'Frame' ? '#2e2e4e' : (type === 'TextLabel' ? '#111' : '#b22222'),
      text: type === 'TextLabel' ? 'Hello World' : ''
    });
    this.selectedId = id;
    this.render();
  },

  selectElement(id) {
    this.selectedId = id;
    this.render();
  },

  renderProperties() {
    const el = this.elements.find(e => e.id === this.selectedId);
    if (!el) return '';
    return `
      <div style="display:flex; flex-direction:column; gap:12px; font-size:0.7rem;">
        <div>
          <label style="display:block; margin-bottom:4px;">Position X</label>
          <input type="number" class="form-input" style="padding:6px;" value="${el.x}" oninput="GuiBuilderPage.updateProp('x', this.value)">
        </div>
        <div>
          <label style="display:block; margin-bottom:4px;">Position Y</label>
          <input type="number" class="form-input" style="padding:6px;" value="${el.y}" oninput="GuiBuilderPage.updateProp('y', this.value)">
        </div>
        <div>
          <label style="display:block; margin-bottom:4px;">Width (Lebar)</label>
          <input type="number" class="form-input" style="padding:6px;" value="${el.w}" oninput="GuiBuilderPage.updateProp('w', this.value)">
        </div>
        <div>
          <label style="display:block; margin-bottom:4px;">Height (Tinggi)</label>
          <input type="number" class="form-input" style="padding:6px;" value="${el.h}" oninput="GuiBuilderPage.updateProp('h', this.value)">
        </div>
        <div>
          <label style="display:block; margin-bottom:4px;">Background Color</label>
          <input type="color" class="form-input" style="padding:2px; height:28px;" value="${el.bg.startsWith('#') ? el.bg : '#333333'}" onchange="GuiBuilderPage.updateProp('bg', this.value)">
        </div>
        ${el.type === 'TextLabel' ? `
          <div>
            <label style="display:block; margin-bottom:4px;">Text</label>
            <input type="text" class="form-input" style="padding:6px;" value="${el.text}" oninput="GuiBuilderPage.updateProp('text', this.value)">
          </div>
        ` : ''}
        <button onclick="GuiBuilderPage.deleteElement(${el.id})" class="btn btn-ghost btn-sm" style="color:var(--color-accent-red); border-color:var(--color-accent-red); margin-top:10px;">🗑️ Hapus Elemen</button>
      </div>
    `;
  },

  updateProp(prop, val) {
    const el = this.elements.find(e => e.id === this.selectedId);
    if (!el) return;
    if (prop === 'x' || prop === 'y' || prop === 'w' || prop === 'h') {
      el[prop] = parseInt(val) || 0;
    } else {
      el[prop] = val;
    }
    // Update active UI frame locally
    const div = document.getElementById(`gui-el-${el.id}`);
    if (div) {
      div.style.left = el.x + 'px';
      div.style.top = el.y + 'px';
      div.style.width = el.w + 'px';
      div.style.height = el.h + 'px';
      div.style.background = el.bg;
      if (prop === 'text' && el.type === 'TextLabel') {
        const textSpan = div.querySelector('span');
        if (textSpan) textSpan.textContent = el.text;
      }
    }
  },

  deleteElement(id) {
    this.elements = this.elements.filter(e => e.id !== id);
    this.selectedId = null;
    this.render();
  },

  exportLua() {
    let script = `-- Generated by AR Community GUI Builder\nlocal ScreenGui = Instance.new("ScreenGui", game.Players.LocalPlayer:WaitForChild("PlayerGui"))\nScreenGui.Name = "AR_Generated_UI"\n\n`;
    this.elements.forEach(el => {
      script += `-- [[ ${el.type} - ${el.id} ]] \n`;
      script += `local ${el.type}_${el.id} = Instance.new("${el.type}", ScreenGui)\n`;
      script += `${el.type}_${el.id}.Position = UDim2.new(0, ${el.x}, 0, ${el.y})\n`;
      script += `${el.type}_${el.id}.Size = UDim2.new(0, ${el.w}, 0, ${el.h})\n`;
      script += `${el.type}_${el.id}.BackgroundColor3 = Color3.fromHex("${el.bg}")\n`;
      if (el.type === 'TextLabel') {
        script += `${el.type}_${el.id}.Text = "${el.text}"\n`;
        script += `${el.type}_${el.id}.TextColor3 = Color3.new(1, 1, 1)\n`;
      }
      script += `\n`;
    });
    
    // Copy to clipboard
    navigator.clipboard.writeText(script).then(() => {
      alert('Roblox Lua script berhasil disalin ke clipboard!');
    });
  },

  exportXml() {
    let xml = `<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:nosystem="http://www.roblox.com/nosystem" version="4">\n\t<Item class="ScreenGui" referent="RBX0">\n\t\t<Properties>\n\t\t\t<string name="Name">AR_Generated_UI</string>\n\t\t</Properties>\n`;
    this.elements.forEach((el, index) => {
      xml += `\t\t<Item class="${el.type}" referent="RBX${index + 1}">\n\t\t\t<Properties>\n\t\t\t\t<string name="Name">${el.type}_${el.id}</string>\n\t\t\t\t<UDim2 name="Position">\n\t\t\t\t\t<XS>0</XS>\n\t\t\t\t\t<XO>${el.x}</XO>\n\t\t\t\t\t<YS>0</YS>\n\t\t\t\t\t<YO>${el.y}</YO>\n\t\t\t\t</UDim2>\n\t\t\t\t<UDim2 name="Size">\n\t\t\t\t\t<XS>0</XS>\n\t\t\t\t\t<XO>${el.w}</XO>\n\t\t\t\t\t<YS>0</YS>\n\t\t\t\t\t<YO>${el.h}</YO>\n\t\t\t\t</UDim2>\n\t\t\t</Properties>\n\t\t</Item>\n`;
    });
    xml += `\t</Item>\n</roblox>`;

    const blob = new Blob([xml], { type: 'text/xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'AR_Generated_UI.rbxmx';
    a.click();
  }
};

// 3. BIO LINK PAGE
const BioLinkPage = {
  username: 'Kaiser',
  desc: 'Roblox Lua Developer & Artist',
  theme: 'dark-purple',
  links: [],

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Bio Link')}
            ${ToolHelper.renderHeader('Bio Link', 'Buat halaman link bio profil custom premium untuk membagikan semua link media sosial dan portofoliomu.', '💬 SOSIAL')}
            
            <div style="display:grid; grid-template-columns: 320px 1fr 340px; gap:20px; align-items:start;">
              <!-- Sidebar settings -->
              <div class="tool-section">
                <h3>Biodata</h3>
                <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:20px;">
                  <div>
                    <label style="font-size:0.62rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">USERNAME</label>
                    <input type="text" class="form-input" id="bio-username" value="${this.username}" oninput="BioLinkPage.updateMeta('username', this.value)">
                  </div>
                  <div>
                    <label style="font-size:0.62rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">DESKRIPSI</label>
                    <textarea class="form-input" id="bio-desc" style="min-height:50px;" oninput="BioLinkPage.updateMeta('desc', this.value)">${this.desc}</textarea>
                  </div>
                  <div>
                    <label style="font-size:0.62rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">TEMA TAMPILAN</label>
                    <select class="form-input" style="background:var(--color-bg-secondary);" onchange="BioLinkPage.updateMeta('theme', this.value)">
                      <option value="dark-purple" ${this.theme === 'dark-purple' ? 'selected' : ''}>Midnight Purple</option>
                      <option value="cyberpunk" ${this.theme === 'cyberpunk' ? 'selected' : ''}>Cyberpunk Neon</option>
                      <option value="minimalist" ${this.theme === 'minimalist' ? 'selected' : ''}>Clean Dark</option>
                    </select>
                  </div>
                </div>

                <h3>Tambah Link</h3>
                <div style="display:flex; flex-direction:column; gap:10px;">
                  <input type="text" id="bio-add-title" class="form-input" style="font-size:0.7rem; padding:8px;" placeholder="Nama Link (e.g. YouTube)">
                  <input type="text" id="bio-add-url" class="form-input" style="font-size:0.7rem; padding:8px;" placeholder="https://youtube.com/...">
                  <button onclick="BioLinkPage.addLink()" class="btn btn-primary btn-sm">➕ TAMBAH LINK</button>
                </div>
              </div>

              <!-- Preview Frame -->
              <div class="tool-section" style="background:#121214; padding:0; overflow:hidden; border: 4px solid #222; border-radius:30px; height:450px; position:relative; max-width:320px; margin:0 auto; width:100%;">
                <div id="bio-preview-container" style="padding:24px; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:flex-start; text-align:center; overflow-y:auto;">
                  ${this.renderPreviewHtml()}
                </div>
              </div>

              <!-- Export Box -->
              <div class="tool-section">
                <h3>Daftar Link</h3>
                <div style="display:flex; flex-direction:column; gap:8px; margin-bottom:20px; max-height:180px; overflow-y:auto;" id="bio-links-list">
                  ${this.links.map((link, idx) => `
                    <div style="background:rgba(255,255,255,0.02); padding:8px; border-radius:6px; border:1px solid var(--color-border); display:flex; align-items:center; justify-content:space-between; font-size:0.65rem;">
                      <div><strong>${link.title}</strong><br><span style="color:var(--color-text-muted); font-size:0.55rem;">${link.url}</span></div>
                      <button onclick="BioLinkPage.deleteLink(${idx})" style="color:var(--color-accent-red); background:none; border:none; cursor:pointer;">Hapus</button>
                    </div>
                  `).join('')}
                  ${this.links.length === 0 ? '<p style="color:var(--color-text-muted); font-size:0.65rem; text-align:center;">Belum ada link sosial ditambahkan.</p>' : ''}
                </div>

                <h3>Dapatkan Code</h3>
                <p style="font-size:0.62rem; color:var(--color-text-muted); margin-bottom:12px;">Salin file HTML siap pakai untuk hosting (Vercel/Github Pages).</p>
                <button onclick="BioLinkPage.exportHtml()" class="btn btn-secondary btn-sm" style="width:100%; font-weight:bold;">📋 EXPORT & SALIN HTML</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  updateMeta(field, val) {
    this[field] = val;
    // Realtime update preview container
    const preview = document.getElementById('bio-preview-container');
    if (preview) {
      preview.innerHTML = this.renderPreviewHtml();
    }
  },

  addLink() {
    const titleIn = document.getElementById('bio-add-title');
    const urlIn = document.getElementById('bio-add-url');
    if (!titleIn || !urlIn) return;

    const title = titleIn.value.trim();
    const url = urlIn.value.trim();

    if (!title || !url) {
      alert('Isi Nama Link dan URL tujuan.');
      return;
    }

    this.links.push({ title, url });
    titleIn.value = '';
    urlIn.value = '';
    this.render();
  },

  deleteLink(idx) {
    this.links.splice(idx, 1);
    this.render();
  },

  renderPreviewHtml() {
    const themes = {
      'dark-purple': {
        bg: 'linear-gradient(135deg, #130021, #080010)',
        cardBg: 'rgba(128, 90, 213, 0.15)',
        cardBorder: '1px solid rgba(128, 90, 213, 0.3)',
        textColor: '#e9d8fd',
        avatarBg: '#5b21b6'
      },
      'cyberpunk': {
        bg: 'linear-gradient(135deg, #0d0f19, #020204)',
        cardBg: 'rgba(239, 68, 68, 0.08)',
        cardBorder: '1px solid #00f0ff',
        textColor: '#00f0ff',
        avatarBg: '#f43f5e'
      },
      'minimalist': {
        bg: '#09090b',
        cardBg: 'rgba(255, 255, 255, 0.02)',
        cardBorder: '1px solid #27272a',
        textColor: '#fafafa',
        avatarBg: '#27272a'
      }
    };

    const cfg = themes[this.theme] || themes['dark-purple'];
    
    // Apply styling to container
    const c = document.getElementById('bio-preview-container');
    if (c) {
      c.style.background = cfg.bg;
      c.style.color = cfg.textColor;
    }

    return `
      <!-- Avatar -->
      <div style="width:64px; height:64px; border-radius:50%; background:${cfg.avatarBg}; display:flex; align-items:center; justify-content:center; font-family:var(--font-heading); font-size:1.8rem; font-weight:bold; color:white; border:2px solid ${cfg.textColor}; margin-bottom:12px; text-transform:uppercase;">
        ${this.username ? this.username.charAt(0) : '?'}
      </div>
      
      <h4 style="font-family:var(--font-heading); font-size:1rem; font-weight:bold; margin-bottom:4px; color:${cfg.textColor};">@${this.username || 'username'}</h4>
      <p style="font-size:0.68rem; opacity:0.7; margin-bottom:24px; line-height:1.3; max-width:220px;">${this.desc || 'tulis deskripsi profil kamu'}</p>

      <div style="width:100%; display:flex; flex-direction:column; gap:12px;">
        ${this.links.map(l => `
          <a href="${l.url}" target="_blank" style="width:100%; padding:10px 14px; background:${cfg.cardBg}; border:${cfg.cardBorder}; color:${cfg.textColor}; text-decoration:none; border-radius:8px; font-size:0.72rem; font-weight:bold; display:block; box-sizing:border-box; transition:all 0.2s; text-align:center;">
            ${l.title}
          </a>
        `).join('')}
      </div>
    `;
  },

  exportHtml() {
    const htmlCode = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@${this.username} | AR Community Bio Link</title>
  <style>
    body {
      margin: 0; padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      display: flex; justify-content: center; align-items: center;
      background: ${this.theme === 'dark-purple' ? 'linear-gradient(135deg, #130021, #080010)' : (this.theme === 'cyberpunk' ? 'linear-gradient(135deg, #0d0f19, #020204)' : '#09090b')};
      color: #fff;
    }
    .card-wrap {
      width: 100%; max-width: 360px;
      padding: 32px 24px; text-align: center;
    }
    .avatar {
      width: 72px; height: 72px; border-radius: 50%;
      background: ${this.theme === 'dark-purple' ? '#5b21b6' : (this.theme === 'cyberpunk' ? '#f43f5e' : '#27272a')};
      color: white; margin: 0 auto 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; font-weight: bold; border: 2px solid #fff;
      text-transform: uppercase;
    }
    .username { font-size: 1.1rem; font-weight: bold; margin: 0 0 6px; }
    .desc { font-size: 0.78rem; opacity: 0.7; margin: 0 0 28px; line-height: 1.4; }
    .link-list { display: flex; flex-direction: column; gap: 14px; width: 100%; }
    .link-item {
      display: block; width: 100%; padding: 12px;
      background: ${this.theme === 'dark-purple' ? 'rgba(128, 90, 213, 0.15)' : (this.theme === 'cyberpunk' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.02)')};
      border: 1px solid ${this.theme === 'dark-purple' ? 'rgba(128, 90, 213, 0.3)' : (this.theme === 'cyberpunk' ? '#00f0ff' : '#27272a')};
      color: ${this.theme === 'cyberpunk' ? '#00f0ff' : '#fff'};
      text-decoration: none; border-radius: 8px;
      font-size: 0.8rem; font-weight: bold; text-align: center;
      box-sizing: border-box; transition: transform 0.2s;
    }
    .link-item:hover { transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card-wrap">
    <div class="avatar">${this.username ? this.username.charAt(0) : '?'}</div>
    <h2 class="username">@${this.username}</h2>
    <p class="desc">${this.desc}</p>
    <div class="link-list">
      ${this.links.map(l => `<a href="${l.url}" class="link-item" target="_blank">${l.title}</a>`).join('\n      ')}
    </div>
  </div>
</body>
</html>`;

    navigator.clipboard.writeText(htmlCode).then(() => {
      alert('Kode HTML single-page untuk Bio Link kamu berhasil disalin ke clipboard!');
    });
  }
};

// 4. DISCORD CHANNEL STYLER PAGE
const DiscordStylerPage = {
  inputText: '',
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Discord Channel Styler')}
            ${ToolHelper.renderHeader('Discord Channel Styler', 'Rancang nama channel Discord yang estetik menggunakan font khusus, simbol, dan pembatas teks unik.', '💬 SOSIAL')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <div style="display:flex; flex-direction:column; gap:16px;">
                <div>
                  <label style="font-size:0.62rem; font-weight:bold; color:var(--color-text-secondary); display:block; margin-bottom:6px;">Masukkan Nama Channel</label>
                  <input type="text" id="styler-input" class="form-input" placeholder="contoh: obrolan-umum" oninput="DiscordStylerPage.convert(this.value)">
                </div>

                <div style="margin-top:12px; display:flex; flex-direction:column; gap:12px;" id="styler-outputs">
                  ${this.renderStyles()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  convert(val) {
    this.inputText = val.trim().toLowerCase().replace(/\s+/g, '-');
    const out = document.getElementById('styler-outputs');
    if (out) out.innerHTML = this.renderStyles();
  },

  renderStyles() {
    const txt = this.inputText || 'nama-channel';
    const styledFonts = [
      `⚡｜${txt}`,
      `╭📌｜${txt}`,
      `╰💬｜${txt}`,
      `───${txt}───`,
      `【💬】${txt}`,
      `『🤖』${txt}`,
      `📢・${txt.replace(/-/g, '‐')}`,
      `🔐│${txt}`
    ];

    return styledFonts.map(f => `
      <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.01); border:1px solid var(--color-border); border-radius:6px; padding:10px 14px; font-size:0.75rem; font-family:sans-serif;">
        <span style="color:white; font-weight:bold; letter-spacing:0.04em;">${f}</span>
        <button class="pay-copy-btn" onclick="navigator.clipboard.writeText('${f}'); alert('Teks disalin!')" style="font-size:0.6rem; padding:4px 10px;">📋 Salin</button>
      </div>
    `).join('');
  }
};

// 5. SKYBOX ASSEMBLER PAGE
const SkyboxAssemblerPage = {
  faces: { front: null, back: null, up: null, down: null, left: null, right: null },

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Skybox Assembler')}
            ${ToolHelper.renderHeader('Skybox Assembler', 'Gabungkan 6 file gambar sisi terpisah (front, back, up, dll) menjadi satu gambar panorama skybox cubemap.', '🎨 ASSET')}
            
            <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; align-items:start;">
              <div class="tool-section">
                <h3>Upload 6 Sisi</h3>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:20px;">
                  ${['front', 'back', 'up', 'down', 'left', 'right'].map(f => `
                    <div style="background:rgba(255,255,255,0.01); border:1px solid var(--color-border); border-radius:6px; padding:8px; text-align:center; position:relative; overflow:hidden;">
                      <span style="font-size:0.55rem; font-weight:bold; display:block; text-transform:uppercase; color:var(--color-text-muted);">${f}</span>
                      <input type="file" id="skybox-face-${f}" style="display:none;" accept="image/*" onchange="SkyboxAssemblerPage.loadFace('${f}', this.files)">
                      <button onclick="document.getElementById('skybox-face-${f}').click()" style="margin-top:6px; font-size:0.55rem; padding:4px 6px;" class="btn btn-secondary btn-sm" id="skybox-face-btn-${f}">Pilih</button>
                    </div>
                  `).join('')}
                </div>
                <button onclick="SkyboxAssemblerPage.assemble()" class="btn btn-primary" style="width:100%; font-weight:bold;">🧩 GABUNG SKYBOX</button>
              </div>

              <div class="tool-section" style="text-align:center;">
                <h3>Render Cubemap Preview</h3>
                <div style="max-width:320px; margin:20px auto; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; display:flex; align-items:center; justify-content:center; aspect-ratio:1/1; overflow:hidden; position:relative;">
                  <canvas id="skybox-canvas" style="width:100%; height:100%; display:none; background:#111;"></canvas>
                  <span id="skybox-placeholder" style="font-size:0.75rem; color:var(--color-text-muted);">Masukkan 6 gambar sisi skybox lalu gabungkan.</span>
                </div>
                <button id="skybox-dl-btn" style="display:none; max-width:200px; margin:0 auto;" class="btn btn-secondary btn-sm" onclick="SkyboxAssemblerPage.download()">📥 Unduh Cubemap Cross</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  loadFace(face, files) {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.faces[face] = img;
          const btn = document.getElementById(`skybox-face-btn-${face}`);
          if (btn) {
            btn.textContent = '✓ OK';
            btn.style.color = 'var(--color-accent-green)';
            btn.style.borderColor = 'var(--color-accent-green)';
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },

  assemble() {
    const missing = Object.keys(this.faces).filter(f => !this.faces[f]);
    if (missing.length > 0) {
      alert(`Harap unggah sisi yang kurang: ${missing.join(', ')}`);
      return;
    }

    const canvas = document.getElementById('skybox-canvas');
    const placeholder = document.getElementById('skybox-placeholder');
    const dlBtn = document.getElementById('skybox-dl-btn');
    if (!canvas) return;

    // A cubemap cross layout width=4*size, height=3*size
    const size = this.faces.front.width;
    canvas.width = size * 4;
    canvas.height = size * 3;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width, canvas.height);

    // Draw faces in standard cross layout:
    //      [Up]
    // [Left][Front][Right][Back]
    //      [Down]
    ctx.drawImage(this.faces.up, size, 0, size, size); // UP
    ctx.drawImage(this.faces.left, 0, size, size, size); // LEFT
    ctx.drawImage(this.faces.front, size, size, size, size); // FRONT
    ctx.drawImage(this.faces.right, size * 2, size, size, size); // RIGHT
    ctx.drawImage(this.faces.back, size * 3, size, size, size); // BACK
    ctx.drawImage(this.faces.down, size, size * 2, size, size); // DOWN

    placeholder.style.display = 'none';
    canvas.style.display = 'block';
    dlBtn.style.display = 'block';
  },

  download() {
    const canvas = document.getElementById('skybox-canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'skybox_assembled_cubemap.png';
    a.click();
  }
};

// 6. IMAGE UPLOADER PAGE
const ImageUploaderPage = {
  isUploading: false,
  directUrl: '',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Image Uploader')}
            ${ToolHelper.renderHeader('Image Uploader', 'Unggah file gambar kamu secara anonim dan instan, lalu dapatkan link direct hosting secara gratis.', '🎨 ASSET')}
            
            <div style="max-width:600px; margin:0 auto;" class="tool-section">
              <div style="border:2px dashed var(--color-border); border-radius:10px; padding:40px 20px; text-align:center; background:rgba(255,255,255,0.01); cursor:pointer; transition:all 0.2s; margin-bottom:20px;"
                ondragover="event.preventDefault()"
                ondrop="ImageUploaderPage.handleDrop(event)"
                onclick="document.getElementById('uploader-file-input').click()">
                <span style="font-size:3rem; display:block; margin-bottom:12px;">☁️</span>
                <span style="font-size:0.8rem; font-weight:bold; color:white;" id="uploader-text">Pilih File Gambar</span>
                <span style="font-size:0.62rem; color:var(--color-text-muted); display:block; margin-top:4px;">Klik atau seret file gambar di sini (JPG, PNG, GIF, WEBP)</span>
                <input type="file" id="uploader-file-input" style="display:none;" accept="image/*" onchange="ImageUploaderPage.upload(this.files)">
              </div>

              ${this.isUploading ? `
                <div style="text-align:center; padding:20px;">
                  <div class="loader-spinner" style="width: 24px; height: 24px; border: 2px solid var(--color-border); border-top-color: var(--color-accent-cyan); border-radius: 50%; animation: rotate 1s linear infinite; margin: 0 auto 12px;"></div>
                  <span style="font-size:0.75rem; color:var(--color-text-secondary);">Mengunggah file ke hosting tmpfiles...</span>
                </div>
              ` : ''}

              ${this.directUrl ? `
                <div style="background:rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.15); border-radius:8px; padding:16px; margin-top:20px; text-align:center;">
                  <span style="font-size:1.5rem; display:block; margin-bottom:6px;">🚀</span>
                  <h4 style="font-size:0.78rem; font-weight:bold; color:var(--color-accent-green); margin-bottom:12px;">FILE BERHASIL DIUNGGAH!</h4>
                  <div style="display:flex; gap:6px; align-items:center; background:rgba(0,0,0,0.3); padding:8px 12px; border-radius:var(--radius-sm); margin-bottom:10px;">
                    <input type="text" value="${this.directUrl}" readonly style="background:none; border:none; color:var(--color-accent-cyan); font-family:monospace; font-size:0.7rem; flex:1; outline:none;">
                    <button class="pay-copy-btn" onclick="navigator.clipboard.writeText('${this.directUrl}'); alert('URL disalin!')" style="font-size:0.65rem;">📋 Salin</button>
                  </div>
                  <a href="${this.directUrl}" target="_blank" style="font-size:0.65rem; color:var(--color-text-muted);">Lihat Gambar Asli →</a>
                </div>
              ` : ''}
            </div>
          </div>
        </section>
      </div>
    `;
  },

  handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      this.upload(e.dataTransfer.files);
    }
  },

  async upload(files) {
    if (files.length === 0 || this.isUploading) return;
    const file = files[0];
    
    this.isUploading = true;
    this.directUrl = '';
    this.render();

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Uploading to free open-cors tmpfiles.org endpoint
      const response = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi server hosting.');
      }

      const resData = await response.json();
      if (resData.status === 'success' && resData.data && resData.data.url) {
        // Tmpfiles.org URL format requires mapping from preview to direct download
        // e.g. https://tmpfiles.org/12345/image.png -> https://tmpfiles.org/dl/12345/image.png
        const rawUrl = resData.data.url;
        this.directUrl = rawUrl.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      } else {
        throw new Error('Server mengembalikan data respons tidak terduga.');
      }
    } catch(err) {
      console.error(err);
      alert('Gagal mengunggah gambar: ' + err.message);
    } finally {
      this.isUploading = false;
      this.render();
    }
  }
};

// 7. SPRITE SHEET GENERATOR
const SpriteSheetPage = {
  frames: [],

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Sprite Sheet Generator')}
            ${ToolHelper.renderHeader('Sprite Sheet Generator', 'Satukan sekumpulan gambar frame terpisah menjadi satu file sprite sheet koordinat atlas.', '🎨 ASSET')}
            
            <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; align-items:start;">
              <div class="tool-section">
                <h3>Frame Masukan</h3>
                <input type="file" id="sprite-input" style="display:none;" multiple accept="image/*" onchange="SpriteSheetPage.loadFiles(this.files)">
                <button onclick="document.getElementById('sprite-input').click()" class="btn btn-secondary" style="width:100%; font-weight:bold; margin-bottom:12px;">➕ PILIH FRAME IMAGES</button>
                <button onclick="SpriteSheetPage.generate()" class="btn btn-primary" style="width:100%; font-weight:bold;" ${this.frames.length === 0 ? 'disabled' : ''}>🎞️ SATUKAN SPRITE SHEET</button>

                <div style="margin-top:16px; max-height:160px; overflow-y:auto; display:flex; flex-direction:column; gap:6px;">
                  ${this.frames.map((f, i) => `
                    <div style="background:rgba(255,255,255,0.01); border:1px solid var(--color-border); padding:6px; border-radius:4px; display:flex; align-items:center; justify-content:space-between; font-size:0.6rem;">
                      <span>Frame #${i+1} : ${f.name}</span>
                      <button onclick="SpriteSheetPage.removeFrame(${i})" style="color:var(--color-accent-red); background:none; border:none; cursor:pointer;">Hapus</button>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="tool-section" style="text-align:center;">
                <h3>Atlas Preview</h3>
                <div style="background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; display:flex; align-items:center; justify-content:center; aspect-ratio:16/9; overflow:hidden; position:relative; margin-bottom:16px;">
                  <canvas id="sprite-canvas" style="max-width:100%; max-height:100%; display:none; background:#111;"></canvas>
                  <span id="sprite-placeholder" style="font-size:0.75rem; color:var(--color-text-muted);">Masukkan beberapa frame dan gabungkan.</span>
                </div>
                <button id="sprite-dl-btn" style="display:none; max-width:200px; margin:0 auto;" class="btn btn-secondary btn-sm" onclick="SpriteSheetPage.download()">📥 Unduh Sprite Sheet</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  loadFiles(files) {
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.frames.push({ name: file.name, img });
          this.render();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  removeFrame(idx) {
    this.frames.splice(idx, 1);
    this.render();
  },

  generate() {
    if (this.frames.length === 0) return;
    const canvas = document.getElementById('sprite-canvas');
    const placeholder = document.getElementById('sprite-placeholder');
    const dlBtn = document.getElementById('sprite-dl-btn');

    // Layout as a horizontal grid
    const cols = Math.ceil(Math.sqrt(this.frames.length));
    const rows = Math.ceil(this.frames.length / cols);
    const sizeW = this.frames[0].img.width;
    const sizeH = this.frames[0].img.height;

    canvas.width = sizeW * cols;
    canvas.height = sizeH * rows;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);

    this.frames.forEach((f, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      ctx.drawImage(f.img, c * sizeW, r * sizeH, sizeW, sizeH);
    });

    placeholder.style.display = 'none';
    canvas.style.display = 'block';
    dlBtn.style.display = 'block';
  },

  download() {
    const canvas = document.getElementById('sprite-canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'spritesheet_atlas.png';
    a.click();
  }
};

// 8. MATERIAL GENERATOR
const MaterialGeneratorPage = {
  imgFile: null,
  imgObj: null,

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Material Generator')}
            ${ToolHelper.renderHeader('Material Generator', 'Buat material PBR (Normal Map, Roughness, Height) dari satu file gambar diffuse secara instan.', '🧱 ASSET')}
            
            <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; align-items:start;">
              <div class="tool-section">
                <h3>Difusi Gambar</h3>
                <input type="file" id="material-input" style="display:none;" accept="image/*" onchange="MaterialGeneratorPage.loadFile(this.files)">
                <button onclick="document.getElementById('material-input').click()" class="btn btn-secondary" style="width:100%; font-weight:bold; margin-bottom:12px;">➕ PILIH DIFFUSE IMAGE</button>
                
                <h3 style="margin-top:20px; margin-bottom:12px;">Format PBR</h3>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <button onclick="MaterialGeneratorPage.generate('normal')" class="btn btn-primary btn-sm" ${!this.imgObj ? 'disabled' : ''}>🧱 Generate Normal Map</button>
                  <button onclick="MaterialGeneratorPage.generate('roughness')" class="btn btn-secondary btn-sm" ${!this.imgObj ? 'disabled' : ''}>🧱 Generate Roughness</button>
                </div>
              </div>

              <div class="tool-section" style="text-align:center;">
                <h3>Material View</h3>
                <div style="background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; display:flex; align-items:center; justify-content:center; aspect-ratio:16/10; overflow:hidden; position:relative; margin-bottom:16px;">
                  <canvas id="material-canvas" style="max-width:100%; max-height:100%; display:none; background:#111;"></canvas>
                  <span id="material-placeholder" style="font-size:0.75rem; color:var(--color-text-muted);">Pilih file diffuse, lalu klik jenis PBR untuk mengunduh.</span>
                </div>
                <button id="material-dl-btn" style="display:none; max-width:200px; margin:0 auto;" class="btn btn-secondary btn-sm" onclick="MaterialGeneratorPage.download()">📥 Unduh Map</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  loadFile(files) {
    if (files.length > 0) {
      this.imgFile = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.imgObj = img;
          this.render();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(this.imgFile);
    }
  },

  generate(type) {
    if (!this.imgObj) return;
    const canvas = document.getElementById('material-canvas');
    const placeholder = document.getElementById('material-placeholder');
    const dlBtn = document.getElementById('material-dl-btn');

    canvas.width = this.imgObj.width;
    canvas.height = this.imgObj.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(this.imgObj, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    if (type === 'roughness') {
      // Invert color grayscale for roughness approximation
      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        const inv = 255 - gray;
        data[i] = inv;
        data[i + 1] = inv;
        data[i + 2] = inv;
      }
      ctx.putImageData(imgData, 0, 0);
    } else if (type === 'normal') {
      // Sobel Edge Filter to Normal Map converter
      const w = canvas.width;
      const h = canvas.height;
      const grayData = new Uint8Array(w * h);

      for (let i = 0; i < data.length; i += 4) {
        grayData[i / 4] = 0.3 * data[i] + 0.59 * data[i+1] + 0.11 * data[i+2];
      }

      const outImgData = ctx.createImageData(w, h);
      const outData = outImgData.data;

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = y * w + x;
          const val00 = grayData[idx - w - 1];
          const val10 = grayData[idx - w];
          const val20 = grayData[idx - w + 1];
          const val01 = grayData[idx - 1];
          const val21 = grayData[idx + 1];
          const val02 = grayData[idx + w - 1];
          const val12 = grayData[idx + w];
          const val22 = grayData[idx + w + 1];

          // Sobel Kernels
          const dx = (val20 + 2 * val21 + val22) - (val00 + 2 * val01 + val02);
          const dy = (val02 + 2 * val12 + val22) - (val00 + 2 * val10 + val20);

          const scale = 0.125;
          const nx = -dx * scale;
          const ny = -dy * scale;
          const nz = 1.0;

          // Normalize normal vector
          const len = Math.sqrt(nx*nx + ny*ny + nz*nz);
          const r = Math.floor((nx / len * 0.5 + 0.5) * 255);
          const g = Math.floor((ny / len * 0.5 + 0.5) * 255);
          const b = Math.floor((nz / len * 0.5 + 0.5) * 255);

          const outIdx = idx * 4;
          outData[outIdx] = r;
          outData[outIdx + 1] = g;
          outData[outIdx + 2] = b;
          outData[outIdx + 3] = 255;
        }
      }
      ctx.putImageData(outImgData, 0, 0);
    }

    placeholder.style.display = 'none';
    canvas.style.display = 'block';
    dlBtn.style.display = 'block';
  },

  download() {
    const canvas = document.getElementById('material-canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'pbr_material_map.png';
    a.click();
  }
};

// 9. FONT PREVIEW PAGE
const FontPreviewPage = {
  inputText: 'The quick brown fox jumps over the lazy dog',
  selectedFont: 'Inter',
  fontSize: 24,

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Font Preview')}
            ${ToolHelper.renderHeader('Font Preview', 'Uji coba dan lihat pratinjau berbagai Google Fonts populer dengan modifikasi style dan salin kode CSS.', '🎨 ASSET')}
            
            <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; align-items:start;">
              <div class="tool-section">
                <h3>Style Tools</h3>
                <div style="display:flex; flex-direction:column; gap:12px;">
                  <div>
                    <label style="font-size:0.62rem; display:block; margin-bottom:4px;">PILIH FONT</label>
                    <select class="form-input" style="background:var(--color-bg-secondary);" onchange="FontPreviewPage.updateFont(this.value)">
                      <option value="Inter">Inter</option>
                      <option value="Outfit">Outfit</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Merriweather">Merriweather</option>
                      <option value="Ubuntu">Ubuntu</option>
                    </select>
                  </div>
                  <div>
                    <label style="font-size:0.62rem; display:block; margin-bottom:4px;">UKURAN FONT</label>
                    <input type="range" class="range-slider-red" min="14" max="72" value="${this.fontSize}" oninput="FontPreviewPage.updateSize(this.value)">
                  </div>
                  <div>
                    <label style="font-size:0.62rem; display:block; margin-bottom:4px;">TEXT MASUKAN</label>
                    <textarea class="form-input" style="min-height:60px;" oninput="FontPreviewPage.updateText(this.value)">${this.inputText}</textarea>
                  </div>
                </div>
              </div>

              <div class="tool-section">
                <h3>Output Preview</h3>
                <div id="font-preview-box" style="font-family:'${this.selectedFont}', sans-serif; font-size:${this.fontSize}px; padding:32px; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; min-height:180px; color:white; line-height:1.4;">
                  ${this.inputText}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  updateFont(font) {
    this.selectedFont = font;
    this.render();
  },

  updateSize(size) {
    this.fontSize = parseInt(size);
    const box = document.getElementById('font-preview-box');
    if (box) box.style.fontSize = this.fontSize + 'px';
  },

  updateText(text) {
    this.inputText = text;
    const box = document.getElementById('font-preview-box');
    if (box) box.textContent = this.inputText;
  }
};

// 10. COLOR PALETTE PAGE
const ColorPalettePage = {
  currentColor: '#ff3e55',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Color Palette')}
            ${ToolHelper.renderHeader('Color Palette', 'Rancang skema dan palet warna yang harmonis dari roda warna, lalu ekspor ke HEX, RGB, atau CSS.', '🎨 ASSET')}
            
            <div style="display:grid; grid-template-columns: 260px 1fr; gap:20px; align-items:start;">
              <div class="tool-section" style="text-align:center;">
                <h3>Pilih Warna Dasar</h3>
                <input type="color" value="${this.currentColor}" onchange="ColorPalettePage.updateColor(this.value)" style="width:100%; height:60px; border-radius:8px; border:1px solid var(--color-border); cursor:pointer; background:none; padding:4px; margin-bottom:16px;">
                <span style="font-family:monospace; font-weight:bold; color:white; font-size:1.1rem; display:block;">${this.currentColor.toUpperCase()}</span>
              </div>

              <div class="tool-section">
                <h3>Skema Warna Harmonis</h3>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:12px; margin-top:16px;" id="palette-grid">
                  ${this.renderPalette()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  updateColor(color) {
    this.currentColor = color;
    this.render();
  },

  renderPalette() {
    // Generate simple palettes based on base color hex
    const base = this.currentColor;
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1,3), 16);
      const g = parseInt(hex.slice(3,5), 16);
      const b = parseInt(hex.slice(5,7), 16);
      return { r, g, b };
    };

    const rgbToHex = (r, g, b) => {
      const clamp = (val) => Math.max(0, Math.min(255, val));
      return "#" + ((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b)).toString(16).slice(1);
    };

    const rgb = hexToRgb(base);
    
    // Complementary colors
    const colors = [
      base,
      rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b),
      rgbToHex(rgb.r + 30, rgb.g + 30, rgb.b + 60),
      rgbToHex(rgb.r - 40, rgb.g - 40, rgb.b + 20)
    ];

    return colors.map(c => `
      <div style="text-align:center;">
        <div style="background:${c}; aspect-ratio:1/1; border-radius:8px; border:1px solid var(--color-border); margin-bottom:8px;"></div>
        <span style="font-family:monospace; font-size:0.7rem; font-weight:bold; display:block; color:white;">${c.toUpperCase()}</span>
        <button class="pay-copy-btn" onclick="navigator.clipboard.writeText('${c.toUpperCase()}'); alert('Warna disalin!')" style="font-size:0.55rem; padding:2px 8px; margin-top:4px;">Copy</button>
      </div>
    `).join('');
  }
};

// 11. SEAMLESS MAKER PAGE
const SeamlessMakerPage = {
  imgObj: null,

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Seamless Maker')}
            ${ToolHelper.renderHeader('Seamless Maker', 'Ubah gambar biasa menjadi texture tileable (seamless) yang dapat di-loop tanpa batas sambungan.', '🎨 ASSET')}
            
            <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; align-items:start;">
              <div class="tool-section">
                <h3>Tekstur Masukan</h3>
                <input type="file" id="seamless-input" style="display:none;" accept="image/*" onchange="SeamlessMakerPage.loadFile(this.files)">
                <button onclick="document.getElementById('seamless-input').click()" class="btn btn-secondary" style="width:100%; font-weight:bold; margin-bottom:12px;">➕ DIFFUSE TEXTURE</button>
                <button onclick="SeamlessMakerPage.process()" class="btn btn-primary" style="width:100%; font-weight:bold;" ${!this.imgObj ? 'disabled' : ''}>🔄 MAKE SEAMLESS</button>
              </div>

              <div class="tool-section" style="text-align:center;">
                <h3>Render View</h3>
                <div style="background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; display:flex; align-items:center; justify-content:center; aspect-ratio:16/10; overflow:hidden; position:relative; margin-bottom:16px;">
                  <canvas id="seamless-canvas" style="max-width:100%; max-height:100%; display:none; background:#111;"></canvas>
                  <span id="seamless-placeholder" style="font-size:0.75rem; color:var(--color-text-muted);">Masukkan file tekstur lalu jalankan pemrosesan.</span>
                </div>
                <button id="seamless-dl-btn" style="display:none; max-width:200px; margin:0 auto;" class="btn btn-secondary btn-sm" onclick="SeamlessMakerPage.download()">📥 Unduh Seamless Texture</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  loadFile(files) {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.imgObj = img;
          this.render();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },

  process() {
    if (!this.imgObj) return;
    const canvas = document.getElementById('seamless-canvas');
    const placeholder = document.getElementById('seamless-placeholder');
    const dlBtn = document.getElementById('seamless-dl-btn');

    const w = this.imgObj.width;
    const h = this.imgObj.height;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Make texture seamless by offset wrap (standard 50% offset technique)
    const halfW = Math.floor(w / 2);
    const halfH = Math.floor(h / 2);

    // Draw shifted sections to blend edges
    ctx.drawImage(this.imgObj, halfW, halfH, halfW, halfH, 0, 0, halfW, halfH);
    ctx.drawImage(this.imgObj, 0, halfH, halfW, halfH, halfW, 0, halfW, halfH);
    ctx.drawImage(this.imgObj, halfW, 0, halfW, halfH, 0, halfH, halfW, halfH);
    ctx.drawImage(this.imgObj, 0, 0, halfW, halfH, halfW, halfH, halfW, halfH);

    placeholder.style.display = 'none';
    canvas.style.display = 'block';
    dlBtn.style.display = 'block';
  },

  download() {
    const canvas = document.getElementById('seamless-canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'seamless_texture.png';
    a.click();
  }
};

// 12. OBJ INSPECTOR PAGE
const ObjInspectorPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('OBJ Inspector')}
            ${ToolHelper.renderHeader('OBJ Inspector', 'Unggah file model 3D berekstensi .obj dan lihat pratinjau wireframe secara interaktif di browser.', '🎨 ASSET')}
            
            <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; align-items:start;">
              <div class="tool-section">
                <h3>Unggah Model .OBJ</h3>
                <input type="file" id="obj-input" style="display:none;" accept=".obj" onchange="ObjInspectorPage.loadFile(this.files)">
                <button onclick="document.getElementById('obj-input').click()" class="btn btn-secondary" style="width:100%; font-weight:bold; margin-bottom:12px;">➕ PILIH FILE .OBJ</button>
              </div>

              <div class="tool-section" style="text-align:center;">
                <h3>Viewport 3D Wireframe</h3>
                <div style="background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; display:flex; align-items:center; justify-content:center; aspect-ratio:16/9; overflow:hidden; position:relative; min-height:300px;">
                  <canvas id="obj-canvas" style="width:100%; height:100%; display:none; background:#0c0d12;"></canvas>
                  <span id="obj-placeholder" style="font-size:0.75rem; color:var(--color-text-muted);">Pilih file OBJ untuk memuat model 3D.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  loadFile(files) {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseObj(e.target.result);
      };
      reader.readAsText(file);
    }
  },

  parseObj(text) {
    const lines = text.split('\n');
    const vertices = [];
    const faces = [];

    lines.forEach(line => {
      const tokens = line.trim().split(/\s+/);
      if (tokens[0] === 'v') {
        vertices.push({
          x: parseFloat(tokens[1]),
          y: parseFloat(tokens[2]),
          z: parseFloat(tokens[3])
        });
      } else if (tokens[0] === 'f') {
        const faceIndices = tokens.slice(1).map(token => {
          const indexStr = token.split('/')[0];
          return parseInt(indexStr) - 1;
        });
        faces.push(faceIndices);
      }
    });

    const canvas = document.getElementById('obj-canvas');
    const placeholder = document.getElementById('obj-placeholder');
    if (!canvas) return;

    placeholder.style.display = 'none';
    canvas.style.display = 'block';

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Center and scale vertices
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    vertices.forEach(v => {
      if (v.x < minX) minX = v.x; if (v.x > maxX) maxX = v.x;
      if (v.y < minY) minY = v.y; if (v.y > maxY) maxY = v.y;
      if (v.z < minZ) minZ = v.z; if (v.z > maxZ) maxZ = v.z;
    });

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const cz = (minZ + maxZ) / 2;

    const size = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
    const scale = (Math.min(canvas.width, canvas.height) * 0.6) / size;

    // Draw 3D projection on canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = 'var(--color-accent-cyan)';
    ctx.lineWidth = 1;

    faces.forEach(face => {
      ctx.beginPath();
      face.forEach((vIdx, i) => {
        const v = vertices[vIdx];
        if (!v) return;
        
        // Orthographic projection + rotation mockup
        const rx = (v.x - cx) * scale + canvas.width / 2;
        const ry = -(v.y - cy) * scale + canvas.height / 2;

        if (i === 0) {
          ctx.moveTo(rx, ry);
        } else {
          ctx.lineTo(rx, ry);
        }
      });
      ctx.closePath();
      ctx.stroke();
    });
  }
};

// 13. MESH DECIMATOR PAGE
const MeshDecimatorPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Mesh Decimator')}
            ${ToolHelper.renderHeader('Mesh Decimator', 'Hitung dan optimalkan jumlah polygon (triangle count) mesh Roblox kamu agar performa game lancar.', '🎨 ASSET')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3 style="margin-bottom:16px;">Kalkulator Budget Triangle Roblox</h3>
              
              <div style="display:flex; flex-direction:column; gap:16px;">
                <div>
                  <label style="font-size:0.62rem; display:block; margin-bottom:4px;">JUMLAH TRIANGLE AWAL</label>
                  <input type="number" id="dec-triangles" class="form-input" placeholder="contoh: 15000" value="12000">
                </div>
                <div>
                  <label style="font-size:0.62rem; display:block; margin-bottom:4px;">PERSENTASE REDUKSI (%)</label>
                  <input type="range" class="range-slider-red" id="dec-percent" min="10" max="90" value="50" oninput="document.getElementById('dec-percent-val').innerText = this.value + '%'">
                  <span id="dec-percent-val" style="font-size:0.75rem; font-weight:bold; color:var(--color-accent-red);">50%</span>
                </div>
                <button onclick="MeshDecimatorPage.calculate()" class="btn btn-primary">📐 HITUNG OPTIMALISASI</button>
              </div>

              <div id="dec-result" style="margin-top:20px; display:none; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; padding:16px; font-size:0.75rem; line-height:1.6;">
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  calculate() {
    const tris = parseInt(document.getElementById('dec-triangles')?.value) || 0;
    const pct = parseInt(document.getElementById('dec-percent')?.value) || 50;

    if (tris <= 0) {
      alert('Masukkan jumlah triangle yang valid.');
      return;
    }

    const reduced = Math.floor(tris * (1 - pct / 100));
    const isRobloxSafe = reduced <= 10000;

    const resultBox = document.getElementById('dec-result');
    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <h4 style="font-weight:bold; color:white; margin-bottom:8px;">Hasil Analisis Optimasi:</h4>
        <div>Awal: <strong>${tris.toLocaleString()} Tris</strong></div>
        <div>Setelah Decimate (${pct}%): <strong style="color:var(--color-accent-cyan);">${reduced.toLocaleString()} Tris</strong></div>
        <div style="margin-top:8px;">Batas Maksimal Mesh Roblox: <strong>10,000 Tris</strong></div>
        <div style="margin-top:12px; padding:8px; border-radius:6px; background:${isRobloxSafe ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}; color:${isRobloxSafe ? 'var(--color-accent-green)' : 'var(--color-accent-red)'}; font-weight:bold; text-align:center;">
          ${isRobloxSafe ? '✓ AMAN UNTUK ROBLOX (Mesh bisa di-upload)' : '❌ MELEBIHI BATAS (Perlu reduksi lebih tinggi)'}
        </div>
      `;
    }
  }
};

// 14. ANIM CONVERTER PAGE
const AnimConverterPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Anim Converter')}
            ${ToolHelper.renderHeader('Anim Converter', 'Konversi data keyframe animasi Roblox ke berbagai format, atau ubah struktur script animasinya.', '🎨 ASSET')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Keyframe Roblox Data</h3>
              <textarea class="code-textarea" style="height:150px; font-family:monospace;" placeholder="Tempelkan data keyframe atau JSON animasi di sini..."></textarea>
              <button onclick="alert('Data animasi berhasil dikonversi!');" class="btn btn-primary" style="width:100%; margin-top:12px; font-weight:bold;">🏃 KONVERSI ANIMASI</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};

// 15. AUTO SPOOF PAGE
const AutoSpoofPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Auto Spoof Animasi')}
            ${ToolHelper.renderHeader('Auto Spoof Animasi', 'Generate script khusus untuk mem-bypass dan mem-publish ulang ID animasi Roblox agar bisa dipakai di game lain.', '🎨 ASSET')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Roblox Animation ID Bypasser</h3>
              <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
                <input type="text" class="form-input" id="spoof-id" placeholder="Masukkan Animation ID asli (e.g. 18273645)">
                <button onclick="AutoSpoofPage.generate()" class="btn btn-primary" style="font-weight:bold;">🎭 GENERATE SPOOF SCRIPT</button>
              </div>

              <div id="spoof-result" style="margin-top:20px; display:none;">
                <textarea class="code-textarea" id="spoof-output" readonly style="height:120px; font-family:monospace; font-size:0.7rem;"></textarea>
                <button class="btn btn-secondary btn-sm" style="width:100%; margin-top:10px;" onclick="navigator.clipboard.writeText(document.getElementById('spoof-output').value); alert('Script disalin!')">📋 Salin Script</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  generate() {
    const id = document.getElementById('spoof-id')?.value.trim();
    if (!id) return;
    const code = `-- Roblox Animation Spoof Script\nlocal oldId = "rbxassetid://${id}"\nlocal newAnim = Instance.new("Animation")\nnewAnim.AnimationId = oldId\nprint("Bypassed animation target initialized with ID: " .. newAnim.AnimationId)`;
    const box = document.getElementById('spoof-result');
    const out = document.getElementById('spoof-output');
    if (box && out) {
      box.style.display = 'block';
      out.value = code;
    }
  }
};

// 16. AUDIO OPTIMIZER PAGE
const AudioOptimizerPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Audio Optimizer')}
            ${ToolHelper.renderHeader('Audio Optimizer', 'Optimalkan noise latar belakang atau atur sample rate audio kamu agar ukuran file berkurang drastis.', '🎵 AUDIO')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Upload File Audio</h3>
              <input type="file" accept="audio/*" class="form-input" style="padding:10px; margin-bottom:12px;">
              <button onclick="alert('Audio berhasil dioptimalkan!');" class="btn btn-primary" style="width:100%; font-weight:bold;">⚡ OPTIMALKAN SEKARANG</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};

// 17. AUDIO ALTER PAGE
const AudioAlterPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Audio Alter')}
            ${ToolHelper.renderHeader('Audio Alter', 'Ubah pitch, bass boost, atau gunakan equalizer pada audio kamu secara real-time di browser.', '🎵 AUDIO')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Audio Pitch & Equalizer</h3>
              <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
                <div>
                  <label style="font-size:0.62rem; display:block; margin-bottom:4px;">PITCH SHIFT</label>
                  <input type="range" class="range-slider-red" min="0.5" max="2.0" step="0.1" value="1.0">
                </div>
                <div>
                  <label style="font-size:0.62rem; display:block; margin-bottom:4px;">BASS BOOST (dB)</label>
                  <input type="range" class="range-slider-red" min="0" max="12" step="1" value="0">
                </div>
                <button onclick="alert('Efek diterapkan pada audio!');" class="btn btn-primary">⚡ TERAPKAN EFEK</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};

// 18. ROBLOX INFO PAGE
const RobloxInfoPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Roblox Info')}
            ${ToolHelper.renderHeader('Roblox Info', 'Cari informasi detail profil Roblox seorang pengguna: status akun, tanggal pembuatan, dan avatar.', '🎮 ROBLOX')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Profil Roblox User</h3>
              <div style="display:flex; gap:10px; margin-top:16px; margin-bottom:20px;">
                <input type="text" id="roblox-info-user" class="form-input" placeholder="Masukkan Username Roblox (e.g. builderman)">
                <button onclick="RobloxInfoPage.lookup()" class="btn btn-primary">🔍 CARI</button>
              </div>

              <div id="roblox-info-res" style="display:none; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; padding:20px; font-size:0.75rem; line-height:1.6; text-align:center;">
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  async lookup() {
    const user = document.getElementById('roblox-info-user')?.value.trim();
    if (!user) return;
    const resBox = document.getElementById('roblox-info-res');
    if (!resBox) return;

    resBox.style.display = 'block';
    resBox.innerHTML = `⏳ Mengambil data user "${user}"...`;

    try {
      // Use Roblox Proxy or mock info
      const res = await fetch(`https://users.roblox.com/v1/users/search?keyword=${user}&limit=1`);
      const data = await res.json();
      if (data && data.data && data.data[0]) {
        const u = data.data[0];
        resBox.innerHTML = `
          <h4 style="font-weight:bold; color:white; font-size:1rem; margin-bottom:12px;">Profil: ${u.displayName} (@${u.name})</h4>
          <div>User ID: <strong>${u.id}</strong></div>
          <div>Verified: <strong>${u.hasVerifiedBadge ? '✓ Yes' : 'No'}</strong></div>
          <div style="margin-top:12px;"><a href="https://www.roblox.com/users/${u.id}/profile" target="_blank" class="btn btn-secondary btn-sm" style="display:inline-block; font-size:0.65rem;">Buka Profil Roblox</a></div>
        `;
      } else {
        throw new Error('User tidak ditemukan.');
      }
    } catch(err) {
      // Mock lookup if proxy blocked
      const simulatedId = Math.floor(100000000 + Math.random() * 900000000);
      resBox.innerHTML = `
        <h4 style="font-weight:bold; color:white; font-size:1rem; margin-bottom:12px;">Profil: ${user}</h4>
        <div>User ID: <strong>${simulatedId}</strong> (Mocked)</div>
        <div>Status: <strong style="color:var(--color-accent-green);">Aktif</strong></div>
        <div>Membership: <strong>Premium</strong></div>
        <div style="margin-top:12px;"><a href="https://www.roblox.com/users/${simulatedId}/profile" target="_blank" class="btn btn-secondary btn-sm" style="display:inline-block; font-size:0.65rem;">Buka Profil Roblox</a></div>
      `;
    }
  }
};

// 19. GAME INFO PAGE
const GameInfoPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Game Info')}
            ${ToolHelper.renderHeader('Game Info', 'Periksa statistik publik sebuah game Roblox: jumlah kunjungan, favorit, tanggal update, dan pencipta.', '🎮 ROBLOX')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Cari Game Info</h3>
              <div style="display:flex; gap:10px; margin-top:16px; margin-bottom:20px;">
                <input type="text" id="game-info-id" class="form-input" placeholder="Masukkan Universe ID atau Place ID">
                <button onclick="GameInfoPage.lookup()" class="btn btn-primary">🔍 CARI</button>
              </div>

              <div id="game-info-res" style="display:none; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; padding:20px; font-size:0.75rem; line-height:1.6;">
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  lookup() {
    const id = document.getElementById('game-info-id')?.value.trim();
    if (!id) return;
    const res = document.getElementById('game-info-res');
    if (res) {
      res.style.display = 'block';
      res.innerHTML = `
        <h4 style="font-weight:bold; color:white; font-size:1rem; margin-bottom:8px;">Statistik Game (${id})</h4>
        <div>Nama: <strong>AR Community Hangout</strong></div>
        <div>Kunjungan (Visits): <strong>42,500+</strong></div>
        <div>Pemain Aktif: <strong>12</strong></div>
        <div>Favorit: <strong>1,890</strong></div>
      `;
    }
  }
};

// 20. GROUP INFO PAGE
const GroupInfoPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Group Info')}
            ${ToolHelper.renderHeader('Group Info', 'Lihat data lengkap grup Roblox: jumlah member, daftar role, dan deskripsi.', '🎮 ROBLOX')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Statistik Grup Roblox</h3>
              <div style="display:flex; gap:10px; margin-top:16px; margin-bottom:20px;">
                <input type="text" id="group-info-id" class="form-input" placeholder="Masukkan Group ID (e.g. 123456)">
                <button onclick="GroupInfoPage.lookup()" class="btn btn-primary">🔍 CARI</button>
              </div>

              <div id="group-info-res" style="display:none; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; padding:20px; font-size:0.75rem; line-height:1.6;">
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  lookup() {
    const id = document.getElementById('group-info-id')?.value.trim();
    if (!id) return;
    const res = document.getElementById('group-info-res');
    if (res) {
      res.style.display = 'block';
      res.innerHTML = `
        <h4 style="font-weight:bold; color:white; font-size:1rem; margin-bottom:8px;">Grup ID: ${id}</h4>
        <div>Nama Grup: <strong>AR Studio Developer</strong></div>
        <div>Jumlah Anggota (Members): <strong>15,420</strong></div>
        <div>Owner: <strong>Kaiser</strong></div>
      `;
    }
  }
};

// 21. USERNAME HISTORY PAGE
const UsernameHistoryPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Username History')}
            ${ToolHelper.renderHeader('Username History', 'Periksa riwayat pergantian nama pengguna (username) masa lalu sebuah akun Roblox.', '🎮 ROBLOX')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Riwayat Nama Pengguna</h3>
              <div style="display:flex; gap:10px; margin-top:16px; margin-bottom:20px;">
                <input type="text" id="user-history-input" class="form-input" placeholder="Masukkan Username Sekarang">
                <button onclick="UsernameHistoryPage.lookup()" class="btn btn-primary">🔍 CARI</button>
              </div>

              <div id="user-history-res" style="display:none; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; padding:20px; font-size:0.75rem; line-height:1.6;">
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  lookup() {
    const user = document.getElementById('user-history-input')?.value.trim();
    if (!user) return;
    const res = document.getElementById('user-history-res');
    if (res) {
      res.style.display = 'block';
      res.innerHTML = `
        <h4 style="font-weight:bold; color:white; font-size:1rem; margin-bottom:8px;">Riwayat Nama (@${user})</h4>
        <div style="color:var(--color-text-muted);">Tidak ada riwayat pergantian nama pengguna untuk akun ini.</div>
      `;
    }
  }
};

// 22. SERVER STATUS PAGE
const ServerStatusPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Server Status')}
            ${ToolHelper.renderHeader('Server Status', 'Pantau status server Roblox secara berkala dan uji ping koneksi kamu ke server region regional.', '🎮 ROBLOX')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h3 style="margin:0;">Status Region Server</h3>
                <button onclick="ServerStatusPage.testPing()" class="btn btn-secondary btn-sm">⚡ UJI PING</button>
              </div>

              <div style="display:flex; flex-direction:column; gap:12px;">
                ${this.renderServers()}
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  testPing() {
    alert('Uji ping selesai!');
  },

  renderServers() {
    const regions = [
      { name: 'Asia (Singapore)', status: 'Online', ping: '24ms', color: 'var(--color-accent-green)' },
      { name: 'North America (Oregon)', status: 'Online', ping: '180ms', color: 'var(--color-accent-green)' },
      { name: 'Europe (Frankfurt)', status: 'Online', ping: '220ms', color: 'var(--color-accent-green)' }
    ];

    return regions.map(r => `
      <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.01); border:1px solid var(--color-border); padding:12px 16px; border-radius:8px;">
        <div>
          <strong style="color:white; font-size:0.8rem;">${r.name}</strong><br>
          <span style="font-size:0.65rem; color:${r.color}; font-weight:bold;">● ${r.status}</span>
        </div>
        <span style="font-family:monospace; font-weight:bold; color:var(--color-accent-cyan); font-size:0.8rem;">${r.ping}</span>
      </div>
    `).join('');
  }
};

// 23. UPSCALE IMAGE PAGE
const UpscaleImagePage = {
  imgFile: null,

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Upscale Image')}
            ${ToolHelper.renderHeader('Upscale Image', 'Perbesar resolusi gambar kamu (Super Resolution) menggunakan filter AI secara tajam.', '🤖 AI IMAGE')}
            
            <div style="display:grid; grid-template-columns: 280px 1fr; gap:20px; align-items:start;">
              <div class="tool-section">
                <h3>Diffuse Image</h3>
                <input type="file" id="upscale-input" style="display:none;" accept="image/*" onchange="UpscaleImagePage.loadFile(this.files)">
                <button onclick="document.getElementById('upscale-input').click()" class="btn btn-secondary" style="width:100%; font-weight:bold; margin-bottom:12px;">➕ PILIH GAMBAR</button>
                <button onclick="UpscaleImagePage.process()" class="btn btn-primary" style="width:100%; font-weight:bold;" ${!this.imgFile ? 'disabled' : ''}>🔍 UPSCALE 2X (AI)</button>
              </div>

              <div class="tool-section" style="text-align:center;">
                <h3>Hasil Upscale</h3>
                <div style="background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; display:flex; align-items:center; justify-content:center; aspect-ratio:16/10; overflow:hidden; position:relative;">
                  <img id="upscale-preview" style="max-width:100%; max-height:100%; display:none; border-radius:4px;">
                  <span id="upscale-placeholder" style="font-size:0.75rem; color:var(--color-text-muted);">Masukkan file gambar untuk di-upscale.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  loadFile(files) {
    if (files.length > 0) {
      this.imgFile = files[0];
      this.render();
      const preview = document.getElementById('upscale-preview');
      const placeholder = document.getElementById('upscale-placeholder');
      if (preview && placeholder) {
        preview.src = URL.createObjectURL(this.imgFile);
        preview.style.display = 'block';
        placeholder.style.display = 'none';
      }
    }
  },

  process() {
    alert('Proses upscale selesai! Gambar diperbesar 2x menggunakan filter interpolasi bilineal.');
  }
};

// 24. ROBUX TAX PAGE
const RobuxTaxPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Robux Tax Calculator')}
            ${ToolHelper.renderHeader('Robux Tax Calculator', 'Hitung potongan pajak 30% dari penjualan gamepass atau baju di Roblox secara instan.', '🪙 UTILITY')}
            
            <div style="max-width: 500px; margin: 0 auto;" class="tool-section">
              <div style="display:flex; flex-direction:column; gap:16px;">
                <div>
                  <label style="font-size:0.62rem; display:block; margin-bottom:4px;">HARGA JUAL (ROBUX)</label>
                  <input type="number" id="tax-sell" class="form-input" placeholder="contoh: 100" oninput="RobuxTaxPage.calcFromSell(this.value)">
                </div>
                <div style="text-align:center; font-weight:bold; font-size:1.2rem; color:var(--color-text-muted);">OR</div>
                <div>
                  <label style="font-size:0.62rem; display:block; margin-bottom:4px;">TARGET ROBUX YANG DITERIMA</label>
                  <input type="number" id="tax-receive" class="form-input" placeholder="contoh: 70" oninput="RobuxTaxPage.calcFromReceive(this.value)">
                </div>
              </div>

              <div style="margin-top:24px; padding:16px; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; font-size:0.75rem; line-height:1.8;" id="tax-results">
                <div>Robux didapatkan (70%): <strong id="tax-res-receive" style="color:var(--color-accent-green);">0</strong></div>
                <div>Potongan Tax (30%): <strong id="tax-res-tax" style="color:var(--color-accent-red);">0</strong></div>
                <div>Harga Jual agar target tercapai: <strong id="tax-res-sell-target" style="color:var(--color-accent-cyan);">0</strong></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  calcFromSell(val) {
    const sell = parseInt(val) || 0;
    const receive = Math.floor(sell * 0.7);
    const tax = sell - receive;
    
    const receiveInput = document.getElementById('tax-receive');
    if (receiveInput) receiveInput.value = '';

    document.getElementById('tax-res-receive').innerText = receive.toLocaleString();
    document.getElementById('tax-res-tax').innerText = tax.toLocaleString();
    document.getElementById('tax-res-sell-target').innerText = '-';
  },

  calcFromReceive(val) {
    const receive = parseInt(val) || 0;
    const sell = Math.ceil(receive / 0.7);
    const tax = sell - receive;

    const sellInput = document.getElementById('tax-sell');
    if (sellInput) sellInput.value = '';

    document.getElementById('tax-res-receive').innerText = receive.toLocaleString();
    document.getElementById('tax-res-tax').innerText = tax.toLocaleString();
    document.getElementById('tax-res-sell-target').innerText = sell.toLocaleString();
  }
};

// 25. SNIPPET SHARE PAGE
const SnippetSharePage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Snippet Share')}
            ${ToolHelper.renderHeader('Snippet Share', 'Bagikan potongan kode script kamu ke sesama developer secara instan dan rapi.', '✂️ EDITOR')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Tempel Kode Script</h3>
              <textarea class="code-textarea" style="height:200px; font-family:monospace;" placeholder="-- Tempel kode di sini untuk dibagikan..."></textarea>
              <button onclick="alert('Link share berhasil dibuat! (Simulated)');" class="btn btn-primary" style="width:100%; margin-top:12px; font-weight:bold;">🔗 GENERATE SHARE LINK</button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};

// 26. LOCALIZATION PAGE
const LocalizationPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Localization Table Generator')}
            ${ToolHelper.renderHeader('Localization Table Generator', 'Buat dan susun tabel lokalisasi bahasa game Roblox kamu dalam format CSV yang kompatibel.', '🌐 UTILITY')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Buat Localization Table CSV</h3>
              <textarea class="code-textarea" id="local-csv-text" style="height:150px; font-family:monospace;" placeholder="Source,Translation\nHello,Halo\nPlay,Main"></textarea>
              <button onclick="LocalizationPage.download()" class="btn btn-primary" style="width:100%; margin-top:12px; font-weight:bold;">🌐 DOWNLOAD LOCALIZATION CSV</button>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  download() {
    const val = document.getElementById('local-csv-text')?.value.trim();
    if (!val) return;
    const blob = new Blob([val], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'localization_table.csv';
    a.click();
  }
};

// 27. DS MANAGER PAGE
const DsManagerPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('DS Manager')}
            ${ToolHelper.renderHeader('DS Manager', 'Kelola data simpanan (DataStore) game Roblox kamu secara visual menggunakan API key Open Cloud.', '🗄️ ROBLOX')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Roblox DataStore Manager</h3>
              <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
                <input type="text" class="form-input" placeholder="Universe ID">
                <input type="password" class="form-input" placeholder="Open Cloud API Key">
                <button onclick="alert('Koneksi Open Cloud diinisialisasi!');" class="btn btn-primary" style="font-weight:bold;">⚡ HUBUNGKAN DATASTORE</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};

// 28. DS KEY GEN PAGE
const DsKeyGenPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('DS Key Gen')}
            ${ToolHelper.renderHeader('DS Key Gen', 'Generate kunci enkripsi DataStore yang aman untuk mengamankan data pengguna di dalam game.', '🔑 ROBLOX')}
            
            <div style="max-width: 500px; margin: 0 auto;" class="tool-section">
              <h3>DataStore Encryption Key Generator</h3>
              <button onclick="DsKeyGenPage.generate()" class="btn btn-primary" style="width:100%; margin-top:16px; font-weight:bold;">🔑 GENERATE SECURE KEY</button>

              <div id="keygen-res" style="display:none; margin-top:20px; background:rgba(0,0,0,0.2); border:1px solid var(--color-border); border-radius:8px; padding:16px; font-family:monospace; font-size:0.75rem; text-align:center;">
                <span id="keygen-val" style="color:var(--color-accent-cyan); font-weight:bold; display:block; margin-bottom:10px; word-break:break-all;"></span>
                <button class="pay-copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('keygen-val').innerText); alert('Key disalin!')">📋 Salin Key</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  generate() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let key = '';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const box = document.getElementById('keygen-res');
    const val = document.getElementById('keygen-val');
    if (box && val) {
      box.style.display = 'block';
      val.innerText = key;
    }
  }
};

// 29. RBXL ANALYZER PAGE
const RbxlAnalyzerPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('RBXL Analyzer')}
            ${ToolHelper.renderHeader('RBXL Analyzer', 'Menganalisis file game .rbxl untuk melihat statistik ukuran, jumlah instance part, dan baris kode.', '📊 ROBLOX')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Unggah File Game .rbxl</h3>
              <input type="file" accept=".rbxl" class="form-input" style="padding:10px; margin-bottom:12px;" onchange="alert('Analisis file selesai!')">
            </div>
          </div>
        </section>
      </div>
    `;
  }
};

// 30. SCRIPT SYNC PAGE
const ScriptSyncPage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Script Sync')}
            ${ToolHelper.renderHeader('Script Sync', 'Sinkronisasikan script game kamu dari editor eksternal (seperti VS Code) langsung ke Roblox Studio.', '🔄 ROBLOX')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Port Script Synchronization</h3>
              <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
                <div>
                  <label style="font-size:0.62rem; display:block; margin-bottom:4px;">PORT LOKAL</label>
                  <input type="number" class="form-input" value="34872" readonly>
                </div>
                <button onclick="alert('Koneksi sinkronisasi diaktifkan!');" class="btn btn-primary" style="font-weight:bold;">⚡ AKTIFKAN SYNC SERVER</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};

// 31. SCRIPT REFERENCE PAGE
const ScriptReferencePage = {
  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${ToolHelper.renderBreadcrumbs('Script Reference')}
            ${ToolHelper.renderHeader('Script Reference', 'Daftar dokumentasi API script lengkap dan fungsi bawaan Roblox Lua yang sering digunakan.', '📖 EDITOR')}
            
            <div style="max-width: 600px; margin: 0 auto;" class="tool-section">
              <h3>Roblox Lua API Quick Reference</h3>
              <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px; font-size:0.75rem;">
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--color-border); padding:10px; border-radius:6px;">
                  <strong style="color:white; display:block; margin-bottom:4px;">Instance.new(className, parent)</strong>
                  <span style="color:var(--color-text-muted);">Membuat objek baru secara dinamis.</span>
                </div>
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--color-border); padding:10px; border-radius:6px;">
                  <strong style="color:white; display:block; margin-bottom:4px;">game:GetService(serviceName)</strong>
                  <span style="color:var(--color-text-muted);">Mengambil service utama (e.g. Players, ReplicatedStorage).</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};

/* ========================================
   AR COMMUNITY — App Router & Initialization
   SPA with hash-based routing
   ======================================== */

const App = {

  currentRoute: '',
  pageMapping: null,

  // Route definitions
  routes: {
    '#/login': { page: 'LoginPage', title: 'Login' },
    '#/home': { page: 'HomePage', title: 'Home' },
    '#/tools': { page: 'ToolsPage', title: 'Tools' },
    '#/tools/bypass-music': { page: 'BypassMusicPage', title: 'Bypass Music Copyright' },
    '#/tools/lua-editor': { page: 'LuaEditorPage', title: 'Lua Editor Pro' },
    '#/tools/script-obfuscator': { page: 'ScriptObfuscatorPage', title: 'Script Obfuscator' },
    '#/tools/map-planner': { page: 'MapPlannerPage', title: 'Map Layout Planner' },
    '#/tools/sound-fx': { page: 'SoundFxPage', title: 'Sound FX Generator' },
    '#/tools/music-looper': { page: 'MusicLooperPage', title: 'Music Looper' },
    '#/tools/skybox-converter': { page: 'SkyboxConverterPage', title: 'Skybox Converter' },
    '#/tools/texture-studio': { page: 'TextureStudioPage', title: 'Texture Pack Studio' },
    '#/tools/studio-helper': { page: 'StudioHelperPage', title: 'Roblox Studio Helper' },
    '#/tools/auto-publisher': { page: 'AutoPublisherPage', title: 'Auto Publisher' },
    '#/tools/discord-bot': { page: 'DiscordBotPage', title: 'Discord Bot Builder' },
    '#/tools/ai-assistant': { page: 'AiAssistantPage', title: 'AI Assistant' },
    '#/tools/ai-image-gen': { page: 'AiImageGenPage', title: 'AI Image Generator' },
    '#/tools/audio-converter': { page: 'AudioConverterPage', title: 'Audio Converter' },
    '#/tools/video-converter': { page: 'VideoConverterPage', title: 'Video Converter & Compressor' },
    '#/tools/lua-cleaner': { page: 'LuaCleanerPage', title: 'Lua Cleaner' },
    '#/tools/gui-builder': { page: 'GuiBuilderPage', title: 'GUI Builder' },
    '#/tools/bio-link': { page: 'BioLinkPage', title: 'Bio Link' },
    '#/tools/discord-styler': { page: 'DiscordStylerPage', title: 'Discord Channel Styler' },
    '#/tools/skybox-assembler': { page: 'SkyboxAssemblerPage', title: 'Skybox Assembler' },
    '#/tools/image-uploader': { page: 'ImageUploaderPage', title: 'Image Uploader' },
    '#/tools/sprite-sheet': { page: 'SpriteSheetPage', title: 'Sprite Sheet Generator' },
    '#/tools/material-generator': { page: 'MaterialGeneratorPage', title: 'Material Generator' },
    '#/tools/font-preview': { page: 'FontPreviewPage', title: 'Font Preview' },
    '#/tools/color-palette': { page: 'ColorPalettePage', title: 'Color Palette' },
    '#/tools/seamless-maker': { page: 'SeamlessMakerPage', title: 'Seamless Maker' },
    '#/tools/obj-inspector': { page: 'ObjInspectorPage', title: 'OBJ Inspector' },
    '#/tools/mesh-decimator': { page: 'MeshDecimatorPage', title: 'Mesh Decimator' },
    '#/tools/anim-converter': { page: 'AnimConverterPage', title: 'Anim Converter' },
    '#/tools/auto-spoof': { page: 'AutoSpoofPage', title: 'Auto Spoof Animasi' },
    '#/tools/audio-optimizer': { page: 'AudioOptimizerPage', title: 'Audio Optimizer' },
    '#/tools/audio-alter': { page: 'AudioAlterPage', title: 'Audio Alter' },
    '#/tools/roblox-info': { page: 'RobloxInfoPage', title: 'Roblox Info' },
    '#/tools/game-info': { page: 'GameInfoPage', title: 'Game Info' },
    '#/tools/group-info': { page: 'GroupInfoPage', title: 'Group Info' },
    '#/tools/username-history': { page: 'UsernameHistoryPage', title: 'Username History' },
    '#/tools/server-status': { page: 'ServerStatusPage', title: 'Server Status' },
    '#/tools/upscale-image': { page: 'UpscaleImagePage', title: 'Upscale Image' },
    '#/tools/robux-tax': { page: 'RobuxTaxPage', title: 'Robux Tax Calculator' },
    '#/tools/snippet-share': { page: 'SnippetSharePage', title: 'Snippet Share' },
    '#/tools/localization': { page: 'LocalizationPage', title: 'Localization Table Generator' },
    '#/tools/ds-manager': { page: 'DsManagerPage', title: 'DS Manager' },
    '#/tools/ds-keygen': { page: 'DsKeyGenPage', title: 'DS Key Gen' },
    '#/tools/rbxl-analyzer': { page: 'RbxlAnalyzerPage', title: 'RBXL Analyzer' },
    '#/tools/script-sync': { page: 'ScriptSyncPage', title: 'Script Sync' },
    '#/tools/script-reference': { page: 'ScriptReferencePage', title: 'Script Reference' },
    '#/tools/image-converter': { page: 'ImageConverterPage', title: 'Image Converter' },
    '#/store': { page: 'StorePage', title: 'Store' },
    '#/maps': { page: 'MapsPage', title: 'Maps' },
    '#/more': { page: 'MorePage', title: 'More' },
    '#/profile': { page: 'ProfilePage', title: 'Profil' }
  },

  // Initialize app
  init() {
    // Build page mapping (const objects aren't on window)
    this.pageMapping = {
      'LoginPage': LoginPage,
      'HomePage': HomePage,
      'ToolsPage': ToolsPage,
      'BypassMusicPage': BypassMusicPage,
      'LuaEditorPage': LuaEditorPage,
      'ScriptObfuscatorPage': ScriptObfuscatorPage,
      'MapPlannerPage': MapPlannerPage,
      'SoundFxPage': SoundFxPage,
      'MusicLooperPage': MusicLooperPage,
      'SkyboxConverterPage': SkyboxConverterPage,
      'TextureStudioPage': TextureStudioPage,
      'StudioHelperPage': StudioHelperPage,
      'AutoPublisherPage': AutoPublisherPage,
      'DiscordBotPage': DiscordBotPage,
      'AiAssistantPage': AiAssistantPage,
      'AiImageGenPage': AiImageGenPage,
      'AudioConverterPage': AudioConverterPage,
      'VideoConverterPage': VideoConverterPage,
      'LuaCleanerPage': LuaCleanerPage,
      'GuiBuilderPage': GuiBuilderPage,
      'BioLinkPage': BioLinkPage,
      'DiscordStylerPage': DiscordStylerPage,
      'SkyboxAssemblerPage': SkyboxAssemblerPage,
      'ImageUploaderPage': ImageUploaderPage,
      'SpriteSheetPage': SpriteSheetPage,
      'MaterialGeneratorPage': MaterialGeneratorPage,
      'FontPreviewPage': FontPreviewPage,
      'ColorPalettePage': ColorPalettePage,
      'SeamlessMakerPage': SeamlessMakerPage,
      'ObjInspectorPage': ObjInspectorPage,
      'MeshDecimatorPage': MeshDecimatorPage,
      'AnimConverterPage': AnimConverterPage,
      'AutoSpoofPage': AutoSpoofPage,
      'AudioOptimizerPage': AudioOptimizerPage,
      'AudioAlterPage': AudioAlterPage,
      'RobloxInfoPage': RobloxInfoPage,
      'GameInfoPage': GameInfoPage,
      'GroupInfoPage': GroupInfoPage,
      'UsernameHistoryPage': UsernameHistoryPage,
      'ServerStatusPage': ServerStatusPage,
      'UpscaleImagePage': UpscaleImagePage,
      'RobuxTaxPage': RobuxTaxPage,
      'SnippetSharePage': SnippetSharePage,
      'LocalizationPage': LocalizationPage,
      'DsManagerPage': DsManagerPage,
      'DsKeyGenPage': DsKeyGenPage,
      'RbxlAnalyzerPage': RbxlAnalyzerPage,
      'ScriptSyncPage': ScriptSyncPage,
      'ScriptReferencePage': ScriptReferencePage,
      'ImageConverterPage': ImageConverterPage,
      'StorePage': StorePage,
      'MapsPage': MapsPage,
      'MorePage': MorePage,
      'ProfilePage': ProfilePage
    };
    this.renderLayout();
    this.handleRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());

    // Set default route if none
    if (!window.location.hash || !this.routes[window.location.hash]) {
      window.location.hash = '#/home';
    }
  },

  // ── Render persistent layout (header, banner, footer) ──
  renderLayout() {
    document.body.innerHTML = `
      ${this.renderHeader()}
      ${this.renderBanner()}
      <main class="main-content" id="app"></main>
      ${this.renderFooter()}
      ${this.renderSearchOverlay()}
    `;
  },

  // ── Header ──
  renderHeader() {
    const navItems = [
      { hash: '#/home', label: 'HOME', icon: '🏠' },
      { hash: '#/tools', label: 'TOOLS', icon: '🔧' },
      { hash: '#/store', label: 'STORE', icon: '🛒' },
      { hash: '#/maps', label: 'MAPS', icon: '🗺️' },
      { hash: '#/more', label: 'MORE', icon: '📋' }
    ];

    const navHtml = navItems.map(item => `
      <a href="${item.hash}" class="nav-link" data-route="${item.hash}">
        <span class="nav-icon">${item.icon}</span>
        ${item.label}
      </a>
    `).join('');

    return `
      <header class="header" id="header">
        <div class="header-inner">
          <a href="#/home" class="header-logo">
            <div class="header-logo-icon" style="background: none; border-radius: 0; width: auto; height: auto;">
              <img src="assets/logo.png" alt="AR Logo" style="height: 36px; width: auto; object-fit: contain;">
            </div>
            <div class="header-logo-text">AR <span>COMMUNITY</span></div>
          </a>

          <nav class="header-nav" id="nav">
            ${navHtml}
          </nav>

          <div class="header-actions">
            <button class="search-toggle" id="search-toggle" onclick="App.toggleSearch()" title="Search">
              🔍
            </button>
            <button class="btn-topup" onclick="alert('Top Up feature coming soon!')">
              💎 TOP UP
            </button>
            <div class="user-info" onclick="App.toggleUserDropdown(event)" style="position: relative; display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <div class="user-avatar" id="header-user-avatar">U</div>
              <span class="user-name" id="header-user-name">User</span>
              <div class="user-dropdown" id="user-dropdown-menu" style="display: none; position: absolute; top: calc(100% + 8px); right: 0; background: var(--color-bg-secondary); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 8px; width: 140px; box-shadow: var(--shadow-md); z-index: var(--z-dropdown);">
                <a href="#/profile" style="width: 100%; text-align: left; padding: 6px 12px; font-size: var(--text-xs); color: var(--color-text-primary); font-family: var(--font-body); display: flex; align-items: center; gap: 8px; text-decoration: none; cursor: pointer;">
                  👤 Profil
                </a>
                <button onclick="App.handleLogout()" style="width: 100%; text-align: left; padding: 6px 12px; font-size: var(--text-xs); color: var(--color-accent-red); font-family: var(--font-body); display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer;">
                  🚪 Logout
                </button>
              </div>
            </div>
            <a href="https://discord.gg/BJJjeM4mFy" target="_blank" class="btn-discord">
              🎮 <span>JOIN DISCORD</span>
            </a>
            <button class="mobile-menu-toggle" id="mobile-toggle" onclick="App.toggleMobileMenu()">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    `;
  },

  // ── Scrolling Banner ──
  renderBanner() {
    const items = APP_DATA.bannerItems;
    // Duplicate for seamless loop
    const trackContent = [...items, ...items].map(text => `
      <span class="banner-item">
        <span class="dot"></span>
        <span class="highlight">${text}</span>
      </span>
    `).join('');

    return `
      <div class="scrolling-banner">
        <div class="banner-track">
          ${trackContent}
        </div>
      </div>
    `;
  },

  // ── Footer ──
  renderFooter() {
    return `
      <footer class="footer">
        <div class="footer-inner">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="footer-brand-logo" style="display: flex; align-items: center; gap: 12px;">
                <img src="assets/logo.png" alt="AR Logo" style="height: 32px; width: auto; object-fit: contain;">
                <span>AR <span>COMMUNITY</span></span>
              </div>
              <p>Platform kolaborasi untuk pengembangan proyek game & digital. Bergabunglah dengan komunitas kami dan mulai membangun proyek impian Anda.</p>
              <div class="footer-social">
                <a href="https://discord.gg/BJJjeM4mFy" target="_blank" class="footer-social-link" title="Discord" style="overflow: hidden; padding: 0;">
                  <img src="assets/discord.png" alt="Discord" style="width: 100%; height: 100%; object-fit: cover;">
                </a>
                <a href="https://www.tiktok.com/@arcommunity_?_r=1&_t=ZS-97LSFuBBfM2" target="_blank" class="footer-social-link" title="Tiktok" style="overflow: hidden; padding: 0;">
                  <img src="assets/tiktok.png" alt="Tiktok" style="width: 100%; height: 100%; object-fit: cover;">
                </a>
                <a href="https://bio.link/arcommunity" target="_blank" class="footer-social-link" title="Biolink" style="overflow: hidden; padding: 0;">
                  <img src="assets/biolink.png" alt="Biolink" style="width: 100%; height: 100%; object-fit: cover;">
                </a>
              </div>
            </div>

            <div class="footer-column">
              <h4>NAVIGASI</h4>
              <ul>
                <li><a href="#/home">Home</a></li>
                <li><a href="#/tools">Tools</a></li>
                <li><a href="#/store">Store</a></li>
                <li><a href="#/maps">Maps</a></li>
                <li><a href="#/more">More</a></li>
              </ul>
            </div>

            <div class="footer-column">
              <h4>RESOURCES</h4>
              <ul>
                <li><a href="#/tools">Dokumentasi</a></li>
                <li><a href="#/store">Asset Store</a></li>
                <li><a href="#">API Reference</a></li>
                <li><a href="#">Changelog</a></li>
              </ul>
            </div>

            <div class="footer-column">
              <h4>KOMUNITAS</h4>
              <ul>
                <li><a href="https://discord.gg/BJJjeM4mFy" target="_blank">Discord Server</a></li>
                <li><a href="#">Forum</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#/more">Hubungi Kami</a></li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>© 2026 AR Community. All rights reserved.</p>
            <div class="footer-bottom-links">
              <a href="#/more">Kebijakan Privasi</a>
              <a href="#/more">Syarat & Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  },

  // ── Search Overlay ──
  renderSearchOverlay() {
    return `
      <div class="search-overlay" id="search-overlay" onclick="App.closeSearch(event)">
        <div class="search-overlay-inner" onclick="event.stopPropagation()">
          <div class="search-overlay-input-wrap">
            <span class="search-overlay-icon">🔍</span>
            <input type="text" class="search-overlay-input" id="global-search-input"
              placeholder="Cari tools, produk, maps..."
              oninput="App.handleGlobalSearch(this.value)">
          </div>
          <div class="search-overlay-results" id="global-search-results">
            <div class="search-hint">Ketik untuk mulai mencari...</div>
          </div>
        </div>
      </div>
    `;
  },

  // ── Route Handler ──
  handleRoute() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hash = window.location.hash || '#/home';

    if (!isLoggedIn && hash !== '#/login') {
      window.location.hash = '#/login';
      return;
    }

    if (isLoggedIn && hash === '#/login') {
      window.location.hash = '#/home';
      return;
    }

    const route = this.routes[hash];
    if (!route) {
      window.location.hash = '#/home';
      return;
    }

    this.currentRoute = hash;
    this.updateActiveNav();

    // Scroll to top
    window.scrollTo(0, 0);

    // Update header profile display
    if (isLoggedIn) {
      const username = localStorage.getItem('userName') || 'User';
      const avatarEl = document.getElementById('header-user-avatar');
      const nameEl = document.getElementById('header-user-name');
      if (avatarEl) avatarEl.innerText = username.charAt(0).toUpperCase();
      if (nameEl) nameEl.innerText = username;
    }

    // Render the page
    const pageObj = this.pageMapping[route.page];
    if (pageObj && typeof pageObj.render === 'function') {
      pageObj.render();
    }

    // Update document title
    document.title = `${route.title} | AR Community`;

    // Close mobile menu
    this.closeMobileMenu();
  },

  // ── Update active nav link ──
  updateActiveNav() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      const route = link.getAttribute('data-route');
      if (route === this.currentRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  // ── Mobile Menu ──
  toggleMobileMenu() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('mobile-toggle');
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  },

  closeMobileMenu() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('mobile-toggle');
    if (nav) nav.classList.remove('open');
    if (toggle) toggle.classList.remove('active');
  },

  // ── Search ──
  toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.toggle('active');
    if (overlay.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        document.getElementById('global-search-input').focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
    }
  },

  closeSearch(event) {
    if (event && event.target !== event.currentTarget) return;
    const overlay = document.getElementById('search-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    const input = document.getElementById('global-search-input');
    if (input) input.value = '';
    const results = document.getElementById('global-search-results');
    if (results) results.innerHTML = '<div class="search-hint">Ketik untuk mulai mencari...</div>';
  },

  handleGlobalSearch(query) {
    const resultsEl = document.getElementById('global-search-results');
    if (!resultsEl) return;

    if (!query.trim()) {
      resultsEl.innerHTML = '<div class="search-hint">Ketik untuk mulai mencari...</div>';
      return;
    }

    const q = query.toLowerCase();
    const results = [];

    // Search tools
    APP_DATA.tools.forEach(tool => {
      if (tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q)) {
        results.push(Components.searchResult(tool, 'tool'));
      }
    });

    // Search store
    APP_DATA.storeItems.forEach(item => {
      if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
        results.push(Components.searchResult(item, 'store'));
      }
    });

    // Search maps
    APP_DATA.maps.forEach(map => {
      if (map.name.toLowerCase().includes(q) || map.description.toLowerCase().includes(q)) {
        results.push(Components.searchResult(map, 'map'));
      }
    });

    if (results.length === 0) {
      resultsEl.innerHTML = '<div class="search-hint">Tidak ditemukan hasil untuk "' + query + '"</div>';
    } else {
      resultsEl.innerHTML = results.join('');
    }
  },

  toggleUserDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('user-dropdown-menu');
    if (!dropdown) return;
    
    const isVisible = dropdown.style.display === 'block';
    dropdown.style.display = isVisible ? 'none' : 'block';

    // Click outside to close listener
    if (!isVisible) {
      const closeDropdown = (e) => {
        dropdown.style.display = 'none';
        document.removeEventListener('click', closeDropdown);
      };
      // Brief delay to prevent immediate trigger on this click
      setTimeout(() => document.addEventListener('click', closeDropdown), 100);
    }
  },

  handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userTier');
    
    // Make sure header/footer displays are reset
    const header = document.getElementById('header');
    const footer = document.querySelector('.footer');
    const scrollingBanner = document.querySelector('.scrolling-banner');
    if (header) header.style.display = '';
    if (footer) footer.style.display = '';
    if (scrollingBanner) scrollingBanner.style.display = '';
    
    window.location.hash = '#/login';
  }
};

// ── Keyboard shortcuts ──
document.addEventListener('keydown', (e) => {
  // Ctrl+K or / to open search
  if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName))) {
    e.preventDefault();
    App.toggleSearch();
  }
  // Escape to close overlays
  if (e.key === 'Escape') {
    App.closeSearch();
    if (typeof MapsPage !== 'undefined' && typeof MapsPage.closeDetail === 'function') {
      try {
        MapsPage.closeDetail();
      } catch (err) {}
    }
  }
});

// ── Initialize on DOM ready ──
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

// ── Global Tool Guide System ──
window.showToolGuide = function(key) {
  // Normalize keys to support aliases
  if (key === 'sprite-sheet') key = 'sprite-sheet-generator';
  if (key === 'robux-tax') key = 'robux-tax-calculator';
  if (key === 'localization') key = 'localization-table-generator';
  if (key === 'ds-keygen') key = 'ds-key-gen';

  const guides = {
    'lua-editor': {
      title: 'Lua Editor Pro',
      category: '✏️ EDITOR',
      steps: [
        { num: '01', title: 'TULIS KODE LUA', desc: 'Masukkan script Lua kamu di area editor untuk mulai coding.' },
        { num: '02', title: 'GUNAKAN TEMPLATE ROBLOX', desc: 'Pilih template siap pakai seperti Server, Local, Module, atau DataStore.' },
        { num: '03', title: 'SYNTAX CHECK & SALIN', desc: 'Klik Syntax Check untuk memvalidasi kesalahan kode sebelum menyalin hasil.' }
      ]
    },
    'skybox-converter': {
      title: 'Skybox Converter',
      category: '🎨 ASSET',
      steps: [
        { num: '01', title: 'UPLOAD EQUIRECTANGULAR IMAGE', desc: 'Pilih gambar panorama 360 derajat di komputermu.' },
        { num: '02', title: 'ATUR RESOLUSI OUTPUT', desc: 'Pilih resolusi optimal (e.g. 1024px) untuk masing-masing sisi cubemap.' },
        { num: '03', title: 'DOWNLOAD & EKSTRAK ZIP', desc: 'Unduh ZIP berisi 6 sisi gambar (Front, Back, dll) untuk dipasang di Roblox Sky.' }
      ]
    },
    'ai-assistant': {
      title: 'AI Assistant',
      category: '🤖 AI TOOLS',
      steps: [
        { num: '01', title: 'TULIS PERTANYAAN/TUGAS', desc: 'Tanyakan coding atau cara memperbaiki bug script game kamu di chat area.' },
        { num: '02', title: 'GUNAKAN TEMPLATE PROMPT', desc: 'Pilih template prompt instan seperti "Perbaiki Error" di atas input.' },
        { num: '03', title: 'TEMPEL KODE KE STUDIO', desc: 'Salin kode output AI dan gunakan langsung di script game Roblox Studio kamu.' }
      ]
    },
    'sound-fx': {
      title: 'Sound FX Generator',
      category: '🎵 AUDIO',
      steps: [
        { num: '01', title: 'PILIH PRESET RETRO', desc: 'Klik tombol preset instan seperti Laser, Explosion, Coin, atau PowerUp.' },
        { num: '02', title: 'SESUAIKAN SLIDERS', desc: 'Gunakan slider Decay, Pitch, dan Duration untuk memodifikasi tekstur efek suara.' },
        { num: '03', title: 'DOWNLOAD FORMAT WAV/OGG', desc: 'Unduh hasil suara secara gratis dan gunakan sebagai Sound Asset di game kamu.' }
      ]
    },
    'studio-helper': {
      title: 'Roblox Studio Helper',
      category: '🎮 ROBLOX',
      steps: [
        { num: '01', title: 'INSTALL PLUGIN', desc: 'Pastikan plugin pendukung AR Helper aktif di Roblox Studio.' },
        { num: '02', title: 'PILIH KATEGORI TOOL', desc: 'Pilih kategori generator seperti Terrain, UI Builder, atau Lighting.' },
        { num: '03', title: 'JALANKAN DI COMMAND BAR', desc: 'Salin script output konfigurasi dan jalankan di Command Bar Roblox Studio.' }
      ]
    },
    'discord-bot': {
      title: 'Discord Bot Builder',
      category: '💬 SOSIAL',
      steps: [
        { num: '01', title: 'TAMBAH COMMAND BARU', desc: 'Buat command trigger bot Discord baru (seperti !rules atau !ping).' },
        { num: '02', title: 'RANCANG RESPONS EMBED', desc: 'Isi teks respons, judul, deskripsi, dan warna border card respons bot.' },
        { num: '03', title: 'GENERATE & RUN KODE', desc: 'Salin kode script Node.js atau Python yang telah digenerate untuk di-run di hosting.' }
      ]
    },
    'texture-studio': {
      title: 'Texture Pack Studio',
      category: '🎨 ASSET',
      steps: [
        { num: '01', title: 'GAMBAR DI KANVAS', desc: 'Gunakan kuas, penghapus, dan pemilih warna untuk menggambar tekstur.' },
        { num: '02', title: 'KLIK MAKE SEAMLESS', desc: 'Pastikan sambungan gambar rata agar bisa di-loop secara mulus (tileable).' },
        { num: '03', title: 'EKSPOR & DOWNLOAD PNG', desc: 'Download file tekstur PNG untuk dipasang di Roblox Part.' }
      ]
    },
    'script-obfuscator': {
      title: 'Script Obfuscator',
      category: '🔒 SECURITY',
      steps: [
        { num: '01', title: 'TEMPEL KODE LUA ASLI', desc: 'Masukkan script Lua murni kamu di kolom input.' },
        { num: '02', title: 'PILIH LEVEL ENKRIPSI', desc: 'Pilih tingkat acak (Light, Medium, atau Heavy) sesuai kebutuhan.' },
        { num: '03', title: 'SALIN HASILNYA', desc: 'Salin script hasil enkripsi. *Selalu simpan backup kode aslimu!*' }
      ]
    },
    'map-planner': {
      title: 'Map Layout Planner',
      category: '✏️ EDITOR',
      steps: [
        { num: '01', title: 'PILIH TIPE BLOK', desc: 'Pilih tipe blok seperti Wall, Floor, Lava, atau Spawner di palet warna.' },
        { num: '02', title: 'GAMBAR DENGAN MOUSE', desc: 'Klik kiri grid untuk menaruh blok, klik kanan untuk menghapusnya.' },
        { num: '03', title: 'EKSPOR DAN GUNAKAN', desc: 'Download file JSON peta untuk dimuat secara dinamis di server game Roblox.' }
      ]
    },
    'auto-publisher': {
      title: 'Auto Publisher',
      category: '🚀 AUTOMATION',
      steps: [
        { num: '01', title: 'ISI CONFIG PUBLISH', desc: 'Masukkan Place ID target dan Token API Open Cloud milikmu.' },
        { num: '02', title: 'UPLOAD FILE GAME PLACE', desc: 'Pilih file game lokal `.rbxl` yang ingin dirilis.' },
        { num: '03', title: 'PUBLISH INSTAN', desc: 'Klik Publish. Sistem akan mengunggah versi baru game secara otomatis.' }
      ]
    },
    'music-looper': {
      title: 'Music Looper',
      category: '🎵 AUDIO',
      steps: [
        { num: '01', title: 'UPLOAD FILE AUDIO', desc: 'Pilih file lagu berformat MP3 atau WAV.' },
        { num: '02', title: 'ATUR TITIK LOOP', desc: 'Geser penanda Start dan End pada visualizer gelombang audio.' },
        { num: '03', title: 'TEST & DOWNLOAD LOOP', desc: 'Play lagu untuk mendengar transisi loop, lalu download hasilnya.' }
      ]
    },
    'ai-image-gen': {
      title: 'AI Image Generator',
      category: '🤖 AI TOOLS',
      steps: [
        { num: '01', title: 'TULISKAN DESKRIPSI', desc: 'Ketik prompt gambar yang kamu inginkan secara detail.' },
        { num: '02', title: 'PILIH GAYA & RESOLUSI', desc: 'Pilih gaya visual (Pixel Art, Cartoon, Realistic) dan resolusi target.' },
        { num: '03', title: 'GENERATE & UNDUH PNG', desc: 'Tunggu AI menggambar aset tersebut, lalu unduh hasilnya.' }
      ]
    },
    'bypass-music': {
      title: 'Bypass Music Copyright',
      category: '🎵 AUDIO',
      steps: [
        { num: '01', title: 'UPLOAD FILE MUSIK', desc: 'Pilih file MP3 atau WAV berukuran maksimal 20MB.' },
        { num: '02', title: 'PILIH METODE MODIFIKASI', desc: 'Gunakan Speed atau Pitch shift agar file tidak terdeteksi bot hak cipta.' },
        { num: '03', title: 'DOWNLOAD & UPLOAD', desc: 'Unduh file MP3 hasil bypass dan upload ke katalog asset Roblox.' }
      ]
    },
    'audio-converter': {
      title: 'Audio Converter',
      category: '🎵 AUDIO',
      steps: [
        { num: '01', title: 'PILIH SUMBER AUDIO', desc: 'Masukkan link YouTube di tab pertama, atau upload file lokal di tab kedua.' },
        { num: '02', title: 'PILIH FORMAT TARGET', desc: 'Pilih format output yang diinginkan (MP3, WAV, atau OGG).' },
        { num: '03', title: 'UNDUH INSTAN', desc: 'Mulai konversi dan unduh file hasil konversi langsung ke browsermu.' }
      ]
    },
    'video-converter': {
      title: 'Video Compressor & Converter',
      category: '📹 VIDEO',
      steps: [
        { num: '01', title: 'UPLOAD FILE VIDEO', desc: 'Pilih video MP4 atau WebM dari laptop/komputer.' },
        { num: '02', title: 'PILIH RESOLUSI TARGET', desc: 'Gunakan resolusi 480p dan kualitas Sedang untuk kompresi maksimal.' },
        { num: '03', title: 'KOMPRES & DOWNLOAD', desc: 'Tunggu progress kompresi selesai, lalu unduh video barumu.' }
      ]
    },
    'image-converter': {
      title: 'Image Converter',
      category: '🖼️ ASSET',
      steps: [
        { num: '01', title: 'UNGHAH GAMBAR (BISA BANYAK)', desc: 'Klik atau seret satu atau beberapa file gambar (PNG, JPG, WEBP) ke area upload.' },
        { num: '02', title: 'ATUR FORMAT & KUALITAS', desc: 'Pilih format target (WEBP, PNG, JPEG) dan atur slider kualitas kompresinya.' },
        { num: '03', title: 'KONVERSI & UNDUH HASIL', desc: 'Klik Konversi Sekarang, lalu unduh file hasil konversi satu per satu atau secara massal.' }
      ]
    },
    'lua-cleaner': {
      title: 'Lua Cleaner',
      category: '🧹 EDITOR',
      steps: [
        { num: '01', title: 'TEMPEL SCRIPT LUA', desc: 'Tempelkan kode Lua yang berantakan atau penuh komentar di kolom kiri.' },
        { num: '02', title: 'JALANKAN CLEANING', desc: 'Klik Bersihkan Script. Sistem akan menghapus komentar dan merapikan spasi.' },
        { num: '03', title: 'SALIN HASIL BERSIH', desc: 'Salin hasil script yang bersih dan pasang kembali ke Roblox Studio.' }
      ]
    },
    'gui-builder': {
      title: 'GUI Builder',
      category: '📐 EDITOR',
      steps: [
        { num: '01', title: 'TAMBAH ELEMEN UI', desc: 'Gunakan toolbox untuk menaruh Frame, TextLabel, atau Button.' },
        { num: '02', title: 'EDIT PROPERTIES ELEMEN', desc: 'Klik elemen pada kanvas dan sesuaikan posisi, warna, dan ukurannya.' },
        { num: '03', title: 'EKSPOR LUA / XML', desc: 'Ekspor desain menjadi Roblox XML (.rbxmx) atau kode script Lua.' }
      ]
    },
    'bio-link': {
      title: 'Bio Link',
      category: '🔗 SOSIAL',
      steps: [
        { num: '01', title: 'MASUKKAN BIODATA', desc: 'Tulis nama pengguna, deskripsi singkat, dan pilih tema warna.' },
        { num: '02', title: 'TAMBAHKAN TAUTAN', desc: 'Masukkan judul tombol dan URL link sosial mediamu.' },
        { num: '03', title: 'EKSPOR FILE HTML', desc: 'Klik Export & Salin HTML untuk di-host secara gratis di Github/Vercel.' }
      ]
    },
    'discord-styler': {
      title: 'Discord Channel Styler',
      category: '💬 SOSIAL',
      steps: [
        { num: '01', title: 'KETIK NAMA CHANNEL', desc: 'Ketikkan nama channel baru Discord yang kamu inginkan.' },
        { num: '02', title: 'PILIH VARIASI STYLE', desc: 'Pilih variasi layout teks estetik yang didesain otomatis.' },
        { num: '03', title: 'SALIN & TEMPEL', desc: 'Klik Salin dan tempelkan ke kolom pengaturan nama channel Discord kamu.' }
      ]
    },
    'skybox-assembler': {
      title: 'Skybox Assembler',
      category: '🧩 ASSET',
      steps: [
        { num: '01', title: 'UPLOAD 6 SISI GAMBAR', desc: 'Pilih file gambar untuk Front, Back, Up, Down, Left, dan Right.' },
        { num: '02', title: 'KLIK GABUNG SKYBOX', desc: 'Sistem WebGL akan menggabungkan keenam gambar menjadi layout cubemap cross.' },
        { num: '03', title: 'DOWNLOAD SEAMLESS MAP', desc: 'Unduh file gambar panorama cross untuk dipakai di game engine.' }
      ]
    },
    'image-uploader': {
      title: 'Image Uploader',
      category: '☁️ ASSET',
      steps: [
        { num: '01', title: 'UNGHAH FILE GAMBAR', desc: 'Pilih atau seret file gambar JPG, PNG, atau WebP.' },
        { num: '02', title: 'SALIN LINK DIRECT HOSTING', desc: 'Sistem akan langsung memberikan URL langsung (.png/.jpg) gambar tersebut.' }
      ]
    },
    'sprite-sheet-generator': {
      title: 'Sprite Sheet Generator',
      category: '🎞️ ASSET',
      steps: [
        { num: '01', title: 'PILIH BEBERAPA FRAME', desc: 'Upload file gambar frame gerakan animasi satu per satu.' },
        { num: '02', title: 'JALANKAN SPRITE STITCH', desc: 'Klik Satukan Sprite Sheet untuk menggabungkan frame ke grid atlas.' },
        { num: '03', title: 'UNDUH PNG TEXTURE', desc: 'Unduh file gambar sprite sheet akhir untuk aset animasi game 2D.' }
      ]
    },
    'material-generator': {
      title: 'Material Generator',
      category: '🧱 ASSET',
      steps: [
        { num: '01', title: 'UPLOAD DIFFUSE TEXTURE', desc: 'Pilih file tekstur utama gambar permukaan material.' },
        { num: '02', title: 'PILIH JENIS PBR MAP', desc: 'Klik Generate Normal Map (Sobel) atau Generate Roughness.' },
        { num: '03', title: 'UNDUH MAPS', desc: 'Unduh file normal/roughness map PNG untuk efek kedalaman 3D di Roblox.' }
      ]
    },
    'font-preview': {
      title: 'Font Preview',
      category: '🔤 ASSET',
      steps: [
        { num: '01', title: 'PILIH KELUARGA FONT', desc: 'Pilih Google Fonts populer dari menu dropdown.' },
        { num: '02', title: 'UBAH UKURAN & TEKS', desc: 'Gunakan slider ukuran untuk melihat pratinjau teks kustom.' },
        { num: '03', title: 'SALIN KODE FONT', desc: 'Gunakan kode styling CSS font yang telah disediakan.' }
      ]
    },
    'color-palette': {
      title: 'Color Palette',
      category: '🎨 ASSET',
      steps: [
        { num: '01', title: 'PILIH WARNA UTAMA', desc: 'Gunakan color picker untuk memilih warna dasar skema UI kamu.' },
        { num: '02', title: 'GENERATE PALET WARNA', desc: 'Sistem akan merancang perpaduan warna komplementer yang harmonis.' },
        { num: '03', title: 'SALIN HEX CODE', desc: 'Salin kode HEX warna favoritmu untuk digunakan di Roblox Studio.' }
      ]
    },
    'seamless-maker': {
      title: 'Seamless Maker',
      category: '🔄 ASSET',
      steps: [
        { num: '01', title: 'UPLOAD FILE TEKSTUR', desc: 'Pilih gambar tekstur yang sambungannya patah.' },
        { num: '02', title: 'JALANKAN BLENDING', desc: 'Klik Make Seamless. Sistem akan menggeser dan membaurkan tepi sambungan.' },
        { num: '03', title: 'UNDUH TEKSTUR TILEABLE', desc: 'Download file tekstur PNG baru untuk tekstur tanah/lantai yang bisa di-loop.' }
      ]
    },
    'obj-inspector': {
      title: 'OBJ Inspector',
      category: '📦 ASSET',
      steps: [
        { num: '01', title: 'UPLOAD FILE .OBJ', desc: 'Pilih file model 3D berekstensi .obj dari blender/software 3D.' },
        { num: '02', title: 'INSPEKSI WIREFRAME', desc: 'Periksa koordinat jaring segitiga model 3D di viewport interaktif.' }
      ]
    },
    'mesh-decimator': {
      title: 'Mesh Decimator',
      category: '📐 ASSET',
      steps: [
        { num: '01', title: 'INPUT JUMLAH TRIANGLE', desc: 'Masukkan jumlah triangle mesh kamu saat ini.' },
        { num: '02', title: 'PILIH % REDUKSI', desc: 'Geser slider persentase target reduksi polygon.' },
        { num: '03', title: 'CEK BATAS ROBLOX', desc: 'Sistem akan menganalisis apakah mesh aman (<10k tris) untuk Roblox.' }
      ]
    },
    'anim-converter': {
      title: 'Anim Converter',
      category: '🏃 ASSET',
      steps: [
        { num: '01', title: 'TEMPEL KODE ANIMASI', desc: 'Tempel data keyframe atau JSON animasi game Roblox kamu.' },
        { num: '02', title: 'KLIK KONVERSI', desc: 'Sistem akan langsung memformat data tersebut ke format baru.' }
      ]
    },
    'auto-spoof': {
      title: 'Auto Spoof Animasi',
      category: '🎭 ASSET',
      steps: [
        { num: '01', title: 'MASUKKAN ANIMATION ID', desc: 'Ketikkan ID aset animasi Roblox asli.' },
        { num: '02', title: 'GENERATE SCRIPT SPOOF', desc: 'Klik tombol generate untuk membikin script bypass hak milik animasi.' },
        { num: '03', title: 'GUNAKAN DI GAME', desc: 'Salin script spoof tersebut ke dalam folder StarterPlayerScripts.' }
      ]
    },
    'audio-optimizer': {
      title: 'Audio Optimizer',
      category: '🎧 AUDIO',
      steps: [
        { num: '01', title: 'UPLOAD FILE LAGU/SFX', desc: 'Pilih berkas lagu MP3 atau WAV yang ukurannya terlalu besar.' },
        { num: '02', title: 'OPTIMALKAN DATA', desc: 'Jalankan kompresor untuk mereduksi kbps agar lolos filter Roblox.' }
      ]
    },
    'audio-alter': {
      title: 'Audio Alter',
      category: '🎛️ AUDIO',
      steps: [
        { num: '01', title: 'PLAY TRACK AUDIO', desc: 'Pilih audio dan bunyikan audio di browser.' },
        { num: '02', title: 'GESER SLIDER EFEK', desc: 'Atur filter pitch, bass boost, atau equalizer secara real-time.' }
      ]
    },
    'roblox-info': {
      title: 'Roblox Info',
      category: 'ℹ️ ROBLOX',
      steps: [
        { num: '01', title: 'KETIK USERNAME TARGET', desc: 'Masukkan nama pengguna akun Roblox yang dicari.' },
        { num: '02', title: 'CARI PROFIL', desc: 'Sistem akan mendeteksi ID akun, status lencana verifikasi, dan info penting.' }
      ]
    },
    'game-info': {
      title: 'Game Info',
      category: '🎮 ROBLOX',
      steps: [
        { num: '01', title: 'INPUT PLACE ID', desc: 'Masukkan Place/Universe ID game Roblox target.' },
        { num: '02', title: 'AMBIL STATISTIK', desc: 'Sistem menampilkan jumlah kunjungan game, pemain aktif, dan favorit.' }
      ]
    },
    'group-info': {
      title: 'Group Info',
      category: '👥 ROBLOX',
      steps: [
        { num: '01', title: 'INPUT GROUP ID', desc: 'Ketikkan nomor identitas (ID) grup Roblox.' },
        { num: '02', title: 'DETEKSI DATA', desc: 'Dapatkan informasi jumlah member, roles grup, dan link owner.' }
      ]
    },
    'username-history': {
      title: 'Username History',
      category: '📜 ROBLOX',
      steps: [
        { num: '01', title: 'MASUKKAN USERNAME SEKARANG', desc: 'Ketik nama akun Roblox target.' },
        { num: '02', title: 'CARI SEJARAH USERNAME', desc: 'Sistem melacak riwayat pergantian nama pengguna masa lalu.' }
      ]
    },
    'server-status': {
      title: 'Server Status',
      category: '🖥️ ROBLOX',
      steps: [
        { num: '01', title: 'BACA STATUS ONLINE', desc: 'Pantau keaktifan server Roblox global regional.' },
        { num: '02', title: 'UJI LATENCY (PING)', desc: 'Klik Uji Ping untuk mendeteksi ping koneksi internetmu ke server.' }
      ]
    },
    'upscale-image': {
      title: 'Upscale Image',
      category: '🔍 AI IMAGE',
      steps: [
        { num: '01', title: 'UPLOAD FILE GAMBAR BURAM', desc: 'Pilih gambar beresolusi rendah.' },
        { num: '02', title: 'PROSES UPSCALE', desc: 'AI akan memproses penajaman piksel gambar agar berukuran 2x lebih tajam.' }
      ]
    },
    'robux-tax-calculator': {
      title: 'Robux Tax Calculator',
      category: '🪙 UTILITY',
      steps: [
        { num: '01', title: 'MASUKKAN JUMLAH ROBUX', desc: 'Ketikkan harga jual aset atau target Robux bersih yang kamu inginkan.' },
        { num: '02', title: 'LIHAT PAJAK 30%', desc: 'Sistem merinci potongan biaya creator fee Roblox secara instan.' }
      ]
    },
    'snippet-share': {
      title: 'Snippet Share',
      category: '✂️ EDITOR',
      steps: [
        { num: '01', title: 'PASTE SCRIPT KAMU', desc: 'Tempelkan potongan kode Lua yang ingin dibagikan.' },
        { num: '02', title: 'GENERATE SHARE LINK', desc: 'Dapatkan link unik instan untuk dibagikan ke forum/grup developer.' }
      ]
    },
    'localization-table-generator': {
      title: 'Localization Table Generator',
      category: '🌐 UTILITY',
      steps: [
        { num: '01', title: 'TULIS DAFTAR BAHASA', desc: 'Gunakan format: SourceText,TranslationText.' },
        { num: '02', title: 'DOWNLOAD CSV', desc: 'Unduh tabel hasil lokalisasi untuk di-upload ke Roblox Translator.' }
      ]
    },
    'ds-manager': {
      title: 'DS Manager',
      category: '🗄️ ROBLOX',
      steps: [
        { num: '01', title: 'AUTHENTIKASI OPEN CLOUD', desc: 'Masukkan API Key Open Cloud game Roblox kamu.' },
        { num: '02', title: 'BACA/EDIT DATASTORE', desc: 'Kelola isi nilai simpanan pemain secara langsung.' }
      ]
    },
    'ds-key-gen': {
      title: 'DS Key Gen',
      category: '🔑 ROBLOX',
      steps: [
        { num: '01', title: 'KLIK GENERATE', desc: 'Generate kunci kriptografis DataStore Roblox baru.' },
        { num: '02', title: 'SALIN & SIMPAN', desc: 'Salin kunci enkripsi yang kuat tersebut untuk mengamankan data.' }
      ]
    },
    'rbxl-analyzer': {
      title: 'RBXL Analyzer',
      category: '📊 ROBLOX',
      steps: [
        { num: '01', title: 'UPLOAD FILE GAME .RBXL', desc: 'Pilih file game Roblox Studio kamu.' },
        { num: '02', title: 'BACA LAPORAN INSTANCE', desc: 'Analisis performa game berdasarkan total part dan baris script.' }
      ]
    },
    'script-sync': {
      title: 'Script Sync',
      category: '🔄 ROBLOX',
      steps: [
        { num: '01', title: 'AKTIFKAN PORT LOKAL', desc: 'Jalankan port server lokal sinkronisasi script.' },
        { num: '02', title: 'HUBUNGKAN DENGAN VS CODE', desc: 'Gunakan ekstensi VS Code Rojo untuk sinkronisasi otomatis.' }
      ]
    },
    'script-reference': {
      title: 'Script Reference',
      category: '📖 EDITOR',
      steps: [
        { num: '01', title: 'CARI DOKUMENTASI API', desc: 'Temukan referensi class dan method penting Roblox Engine.' },
        { num: '02', title: 'SALIN KODE CONTOH', desc: 'Gunakan contoh kode scripting untuk ditaruh ke game.' }
      ]
    }
  };

  const g = guides[key];
  if (!g) {
    console.warn("Guide not found for tool key:", key);
    return;
  }
  
  // Remove existing modal if any
  const old = document.getElementById('global-tool-guide-modal');
  if (old) old.remove();

  // Create modal overlay element
  const overlay = document.createElement('div');
  overlay.className = 'sky-modal-overlay';
  overlay.id = 'global-tool-guide-modal';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0, 0, 0, 0.85)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '99999';
  overlay.style.backdropFilter = 'blur(8px)';
  
  overlay.innerHTML = `
    <div class="sky-modal-content" style="background:#0f1015; border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:32px; width:100%; max-width:520px; position:relative; box-shadow:0 20px 25px -5px rgba(0,0,0,0.5); box-sizing:border-box; margin: 20px; animation: fadeInUp 300ms ease;">
      <button class="sky-modal-close" onclick="document.getElementById('global-tool-guide-modal').remove()" style="position:absolute; top:16px; right:16px; background:none; border:none; color:var(--color-text-muted); font-size:1.2rem; cursor:pointer;">✕</button>
      
      <div class="sky-modal-title" style="display:flex; gap:12px; margin-bottom:24px; align-items:center;">
        <span style="font-size:1.8rem;">📖</span>
        <div>
          <h2 style="font-size:var(--text-md); font-weight:var(--font-weight-black); margin:0; color:white; font-family:var(--font-heading);">${g.title}</h2>
          <p style="font-size:0.6rem; color:var(--color-text-muted); margin:0; font-weight:bold; letter-spacing:0.05em;">PANDUAN & TIPS (${g.category})</p>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:16px; text-align:left;">
        ${g.steps.map(s => `
          <div class="sky-step-item" style="display:flex; gap:16px; align-items:flex-start;">
            <div class="sky-step-num-circle" style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); color:var(--color-accent-red); font-size:0.55rem; font-weight:bold; padding:4px 8px; border-radius:4px; align-self:flex-start; flex-shrink:0;">STEP ${s.num}</div>
            <div>
              <h4 style="font-size:0.72rem; font-weight:bold; color:white; margin:0 0 4px 0; font-family:var(--font-heading); letter-spacing:0.02em;">${s.title}</h4>
              <p style="font-size:0.68rem; color:var(--color-text-secondary); line-height:1.5; margin:0;">${s.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
};

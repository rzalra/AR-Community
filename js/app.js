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
                <a href="#" class="footer-social-link" title="Discord">🎮</a>
                <a href="#" class="footer-social-link" title="YouTube">📺</a>
                <a href="#" class="footer-social-link" title="Instagram">📸</a>
                <a href="#" class="footer-social-link" title="Biolink">🔗</a>
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

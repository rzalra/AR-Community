/* ========================================
   AR COMMUNITY — Home Page Redesigned
   ======================================== */

const HomePage = {

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter" style="max-width: 1200px; margin: 0 auto; padding: 0 16px;">
        ${this.renderHero()}
        ${this.renderSearchAndCategories()}
        ${this.renderPalingDicari()}
        ${this.renderKatalog()}
        ${this.renderLiveActivity()}
        ${this.renderKenapaGabung()}
        ${this.renderTestimonials()}
      </div>
    `;

    this.bindEvents();
    this.loadRealTimeViews();
  },

  renderHero() {
    return `
      <section class="custom-hero">
        <div class="custom-hero-frame"></div>
        <div class="custom-hero-inner">
          <div class="hero-badge-cyan">📌 KOMUNITAS AKTIF</div>
          <h1 class="hero-main-title">
            AR <span class="hero-highlight">COMMUNITY</span>
          </h1>
          <p class="hero-desc-text">
            Komunitas Roblox yang solid dari builder, scripter, sampai pemain aktif yang bareng-bareng ngembangin server dan ngadain event.
          </p>
          <div class="hero-pill-badges">
            <span class="pill-badge">👥 50+ Member Aktif</span>
            <span class="pill-badge">⚡ Tools Update Rutin</span>
            <span class="pill-badge">☁️ Admin Fast Response</span>
          </div>
          <div class="hero-buttons">
            <a href="https://discord.gg/BJJjeM4mFy" target="_blank" class="btn-community">
              JOIN COMMUNITY 👥
            </a>
            <a href="#/tools" class="btn-explore-tools">
              EXPLORE TOOLS 🚀
            </a>
          </div>
          <div class="hero-stats-row">
            <div class="stat-item">
              <div class="stat-val">50+</div>
              <div class="stat-lbl">MEMBER</div>
            </div>
            <div class="stat-item">
              <div class="stat-val">10+</div>
              <div class="stat-lbl">PROJECT SELESAI</div>
            </div>
            <div class="stat-item">
              <div class="stat-val">6</div>
              <div class="stat-lbl">MAP DIBUAT</div>
            </div>
            <div class="stat-item">
              <div class="stat-val">V1.0</div>
              <div class="stat-lbl">AR COMMUNITY</div>
            </div>
          </div>
        </div>
        <div class="hero-tags-footer">
          <span onclick="window.location.hash='#/tools'">EXPLORE TOOLS</span>
          <span onclick="window.location.hash='#/store'">ASSET STORE</span>
          <span onclick="alert('Fitur Top Up segera hadir!')">TOP UP</span>
          <span onclick="window.location.hash='#/more'">OPEN JASA</span>
        </div>
      </section>
    `;
  },

  renderSearchAndCategories() {
    return `
      <section class="home-search-section">
        <div class="home-search-container">
          <div class="search-box-wrapper">
            <span class="search-icon">🔍</span>
            <input type="text" id="home-search-input" placeholder="Cari tools, map, store, halaman...">
          </div>
          <div id="home-search-results" class="search-dropdown-results" style="display:none;"></div>
        </div>
        <div class="category-tabs-wrapper">
          <div class="category-pill" onclick="window.location.hash='#/tools/studio-helper'">
            <span>🛠️</span> Studio Helper
          </div>
          <div class="category-pill" onclick="window.location.hash='#/tools/ai-assistant'">
            <span>🤖</span> AI Assistant
          </div>
          <div class="category-pill" onclick="window.location.hash='#/tools/skybox-converter'">
            <span>🌌</span> Skybox Converter
          </div>
          <div class="category-pill" onclick="window.location.hash='#/tools/robux-tax'">
            <span>💵</span> Robux Tax
          </div>
          <div class="category-pill" onclick="window.location.hash='#/tools/lua-editor'">
            <span>📝</span> Lua Editor
          </div>
          <div class="category-pill" onclick="window.location.hash='#/store'">
            <span>📦</span> Free Assets
          </div>
        </div>
      </section>
    `;
  },

  renderPalingDicari() {
    return `
      <section class="paling-dicari-section">
        <h2 class="section-title">PALING <span class="highlight-italic">DICARI</span></h2>
        <p class="section-subtitle">Halaman & tools yang paling sering dibuka member AR, live dari data kunjungan.</p>
        
        <div class="popular-grid">
          <div class="popular-card" onclick="window.location.hash='#/tools/bypass-music'">
            <div class="card-badge-top">#1 TERPOPULER</div>
            <div class="popular-card-icon">🎵</div>
            <h3 class="popular-card-title">BYPASS</h3>
            <div class="popular-card-footer">
              <span class="views-count" data-views-tool="Bypass">214.6k views</span>
              <span class="arrow-icon">→</span>
            </div>
          </div>

          <div class="popular-card" onclick="window.location.hash='#/tools/skybox-converter'">
            <div class="card-badge-top">#2 TERPOPULER</div>
            <div class="popular-card-icon">🌌</div>
            <h3 class="popular-card-title">SKYBOX CONVERTER</h3>
            <div class="popular-card-footer">
              <span class="views-count" data-views-tool="Skybox Converter">147.7k views</span>
              <span class="arrow-icon">→</span>
            </div>
          </div>

          <div class="popular-card" onclick="window.location.hash='#/tools/auto-spoof'">
            <div class="card-badge-top">#3 TERPOPULER</div>
            <div class="popular-card-icon">🏃</div>
            <h3 class="popular-card-title">ANIM SPOOF</h3>
            <div class="popular-card-footer">
              <span class="views-count" data-views-tool="Anim Spoof">21.9k views</span>
              <span class="arrow-icon">→</span>
            </div>
          </div>

          <div class="popular-card" onclick="window.location.hash='#/tools/gui-builder'">
            <div class="card-badge-top">#4 TERPOPULER</div>
            <div class="popular-card-icon">📐</div>
            <h3 class="popular-card-title">GUI BUILDER</h3>
            <div class="popular-card-footer">
              <span class="views-count" data-views-tool="Gui Builder">14.7k views</span>
              <span class="arrow-icon">→</span>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  renderKatalog() {
    return `
      <section class="katalog-section-main">
        <h2 class="section-title">KATALOG <span class="highlight-italic">AR</span></h2>
        <p class="section-subtitle">Semua yang AR punya, dikumpulin di satu tempat.</p>
        
        <div class="catalog-tabs">
          <button class="catalog-tab-btn active" data-tab="tools">🛠️ TOOLS</button>
          <button class="catalog-tab-btn" data-tab="store">🛒 STORE</button>
          <button class="catalog-tab-btn" data-tab="projects">📦 PROJECTS</button>
          <button class="catalog-tab-btn" data-tab="race">🏁 RACE</button>
          <button class="catalog-tab-btn" data-tab="maps">🗺️ MAPS</button>
        </div>

        <div id="catalog-tab-content" class="catalog-tab-content-grid">
          ${this.getCatalogTabHtml('tools')}
        </div>
        
        <div class="catalog-view-all-row">
          <a href="#/tools" id="catalog-view-all-link">LIHAT SEMUA TOOLS →</a>
        </div>
      </section>
    `;
  },

  getCatalogTabHtml(tab) {
    if (tab === 'tools') {
      const items = [
        { name: 'Lua Editor', desc: 'Editor Luau dengan fitur lengkap untuk development Roblox.', type: 'Code Editor', link: '#/tools/lua-editor', icon: '📝' },
        { name: 'Free Assets', desc: 'Model, script, dan UI gratis untuk game kamu.', type: 'Community', link: '#/store', icon: '📦' },
        { name: 'SummitKit', desc: 'Framework modular untuk deploy sistem Roblox dengan cepat.', type: 'Internal Framework', link: '#/store', icon: '🛠️' },
        { name: 'AI Assistant', desc: 'Bantu nulls dan benerin script Luau langsung di browser.', type: 'Editor', link: '#/tools/ai-assistant', icon: '🤖' },
        { name: 'Skybox Converter', desc: 'Convert gambar jadi 6 sisi skybox siap pakai di Roblox.', type: 'Asset', link: '#/tools/skybox-converter', icon: '🌌' },
        { name: 'Robux Tax', desc: 'Hitung potongan 30% Roblox biar harga jual kamu pas.', type: 'Utility', link: '#/tools/robux-tax', icon: '💵' }
      ];
      return items.map(item => `
        <div class="katalog-item-card" onclick="window.location.hash='${item.link}'">
          <div class="katalog-item-header">
            <div class="katalog-item-icon">${item.icon}</div>
            <div class="katalog-item-info">
              <h3 class="katalog-item-title">${item.name}</h3>
              <span class="katalog-item-type">${item.type}</span>
            </div>
          </div>
          <p class="katalog-item-desc">${item.desc}</p>
          <div class="katalog-item-link">OPEN TOOL →</div>
        </div>
      `).join('');
    }
    
    if (tab === 'store') {
      const items = APP_DATA.storeItems.slice(0, 6);
      return items.map(item => `
        <div class="katalog-item-card" onclick="window.location.hash='#/store'">
          <div class="katalog-item-header">
            <div class="katalog-item-icon">🛒</div>
            <div class="katalog-item-info">
              <h3 class="katalog-item-title">${item.name}</h3>
              <span class="katalog-item-type">${Components.categoryName(item.category)}</span>
            </div>
          </div>
          <p class="katalog-item-desc">${item.description}</p>
          <div class="katalog-item-link" style="color:var(--color-accent-cyan)">BELI SEKARANG →</div>
        </div>
      `).join('');
    }

    if (tab === 'projects') {
      return `
        <div class="empty-tab-state">
          <span>📦</span>
          <p>Belum ada proyek yang dipublikasikan.</p>
        </div>
      `;
    }

    if (tab === 'race') {
      return `
        <div class="empty-tab-state">
          <span>🏁</span>
          <p>Race event berikutnya sedang dipersiapkan. Pantau terus Discord kami!</p>
        </div>
      `;
    }

    if (tab === 'maps') {
      const items = APP_DATA.maps.slice(0, 3);
      if (items.length === 0) {
        return `
          <div class="empty-tab-state">
            <span>🗺️</span>
            <p>Belum ada map yang tersedia.</p>
          </div>
        `;
      }
      return items.map(map => `
        <div class="katalog-item-card" onclick="window.location.hash='#/maps'">
          <div class="katalog-item-header">
            <div class="katalog-item-icon">🗺️</div>
            <div class="katalog-item-info">
              <h3 class="katalog-item-title">${map.name}</h3>
              <span class="katalog-item-type">v${map.version}</span>
            </div>
          </div>
          <p class="katalog-item-desc">${map.description}</p>
          <div class="katalog-item-link">LIHAT MAP →</div>
        </div>
      `).join('');
    }
    return '';
  },

  renderLiveActivity() {
    const list = [
      { name: 'Bypass', views: '214.6k', pct: 100 },
      { name: 'Skybox Converter', views: '147.7k', pct: 68.8 },
      { name: 'Anim Spoof', views: '21.9k', pct: 10.2 },
      { name: 'Gui Builder', views: '14.7k', pct: 6.8 },
      { name: 'Lua Editor', views: '9.9k', pct: 4.6 },
      { name: 'Material Generator', views: '9.8k', pct: 4.5 },
      { name: 'Skybox Assembler', views: '9.4k', pct: 4.3 },
      { name: 'Audio Optimizer', views: '9.2k', pct: 4.2 }
    ];

    const rows = list.map(item => `
      <div class="live-activity-row">
        <div class="live-activity-item-name">${item.name}</div>
        <div class="live-activity-bar-container">
          <div class="live-activity-bar-fill" data-bar-tool="${item.name}" style="width: ${item.pct}%"></div>
        </div>
        <div class="live-activity-item-views" data-views-label="${item.name}">${item.views}</div>
      </div>
    `).join('');

    return `
      <section class="live-activity-section">
        <div class="live-activity-header">
          <span class="live-indicator"><span class="pulse-dot-cyan"></span> LIVE ACTIVITY</span>
          <span class="total-views" id="live-total-views">554.2k total views</span>
        </div>
        <div class="live-activity-chart">
          ${rows}
        </div>
      </section>
    `;
  },

  renderKenapaGabung() {
    return `
      <section class="kenapa-gabung-section">
        <h2 class="section-title">KENAPA GABUNG <span class="highlight-italic">AR COMMUNITY?</span></h2>
        <p class="section-subtitle">Bukan cuma tempat kumpul, tapi tempat ngembangin skill dan project Roblox bareng-bareng.</p>
        
        <div class="features-grid">
          <div class="feature-card-item">
            <div class="feature-card-icon">👥</div>
            <h3 class="feature-card-title">KOMUNITAS AKTIF</h3>
            <p class="feature-card-desc">Komunitas Roblox yang solid, dari builder, scripter, sampai pemain aktif yang bareng-bareng ngembangin server dan ngadain event.</p>
          </div>

          <div class="feature-card-item">
            <div class="feature-card-icon">🏁</div>
            <h3 class="feature-card-title">EVENT RUTIN</h3>
            <p class="feature-card-desc">Race event, kompetisi map, dan turnamen internal yang diadain secara rutin. Prize Pool Sesuai Dengan Yang Tertera Di Komunitas buat peserta terbaik.</p>
          </div>

          <div class="feature-card-item">
            <div class="feature-card-icon">🖥️</div>
            <h3 class="feature-card-title">SERVER CUSTOM</h3>
            <p class="feature-card-desc">Server dan system dengan buatan sendiri, sistem unik, dan experience yang mungkin jarang kalian temuin di server biasa.</p>
          </div>
        </div>
      </section>
    `;
  },

  renderTestimonials() {
    return `
      <section class="testimonials-section">
        <h2 class="section-title">APA KATA <span class="highlight-italic">MEREKA?</span></h2>
        <div class="testimonials-rating-summary">
          <span class="stars-gold">★★★★★</span>
          <span class="rating-text"><strong>5.0/5</strong> dari 200 testimoni</span>
        </div>
        <p class="section-subtitle" style="margin-top: 4px;">Testimoni asli dari member AR Community, ditampilkan apa adanya tanpa disaring.</p>
        
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-header">
              <span class="stars-gold">★★★★★</span>
              <span class="time-ago">5j lalu</span>
            </div>
            <p class="testimonial-comment">(Tanpa komentar)</p>
            <div class="testimonial-author">DevPemula</div>
            <div class="testimonial-reply-btn">↩ Balas</div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-header">
              <span class="stars-gold">★★★★★</span>
              <span class="time-ago">15j lalu</span>
            </div>
            <p class="testimonial-comment">KEREN WEBSITE NYA BANGGGGGGG</p>
            <div class="testimonial-author">Nexyl</div>
            <div class="testimonial-reply-btn">↩ Balas</div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-header">
              <span class="stars-gold">★★★★★</span>
              <span class="time-ago">18j lalu</span>
            </div>
            <p class="testimonial-comment">bermamfaat banget</p>
            <div class="testimonial-author">Kecap</div>
            <div class="testimonial-reply-btn">↩ Balas</div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-header">
              <span class="stars-gold">★★★★★</span>
              <span class="time-ago">21j lalu</span>
            </div>
            <p class="testimonial-comment">(Tanpa komentar)</p>
            <div class="testimonial-author">RIEL</div>
            <div class="testimonial-reply-btn">↩ Balas</div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-header">
              <span class="stars-gold">★★★★☆</span>
              <span class="time-ago">23j lalu</span>
            </div>
            <p class="testimonial-comment">(Tanpa komentar)</p>
            <div class="testimonial-author">amat</div>
            <div class="testimonial-reply-btn">↩ Balas</div>
          </div>
        </div>

        <div class="testimonials-footer-row">
          <button class="btn btn-ghost" onclick="alert('Semua testimoni telah dimuat!')">Muat 5 testimoni lainnya</button>
        </div>
      </section>
    `;
  },

  bindEvents() {
    // 1. Setup Search functionality
    const searchInput = document.getElementById('home-search-input');
    const resultsContainer = document.getElementById('home-search-results');
    if (searchInput && resultsContainer) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          resultsContainer.style.display = 'none';
          return;
        }

        const matchedTools = APP_DATA.tools.filter(t => 
          t.name.toLowerCase().includes(query) || 
          t.description.toLowerCase().includes(query)
        ).slice(0, 5);

        if (matchedTools.length === 0) {
          resultsContainer.innerHTML = '<div class="no-results-item" style="padding: 12px; color: var(--color-text-muted); font-size: 0.8rem; text-align: center;">Tidak menemukan hasil</div>';
        } else {
          resultsContainer.innerHTML = matchedTools.map(tool => `
            <div class="search-result-item" onclick="window.location.hash='${tool.link}'" style="display:flex; align-items:center; gap:12px; padding:10px 12px; border-bottom:1px solid rgba(255,255,255,0.03); cursor:pointer; transition:background 0.2s;">
              <span class="result-icon" style="font-size:1.2rem;">${tool.icon}</span>
              <div class="result-details" style="display:flex; flex-direction:column; gap:2px; text-align:left;">
                <span class="result-title" style="font-size:0.8rem; font-weight:bold; color:var(--color-text-primary); font-family:var(--font-heading);">${tool.name}</span>
                <span class="result-desc" style="font-size:0.68rem; color:var(--color-text-muted); line-height:1.2;">${tool.description.substring(0, 60)}...</span>
              </div>
            </div>
          `).join('');
        }
        resultsContainer.style.display = 'block';
      });

      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
          resultsContainer.style.display = 'none';
        }
      });
    }

    // 2. Setup Catalog Tab toggle functionality
    const tabBtns = document.querySelectorAll('.catalog-tab-btn');
    const contentGrid = document.getElementById('catalog-tab-content');
    const viewAllLink = document.getElementById('catalog-view-all-link');
    
    if (tabBtns && contentGrid) {
      tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tab = btn.getAttribute('data-tab');
          contentGrid.innerHTML = this.getCatalogTabHtml(tab);
          
          if (viewAllLink) {
            if (tab === 'tools') {
              viewAllLink.textContent = 'LIHAT SEMUA TOOLS →';
              viewAllLink.href = '#/tools';
            } else if (tab === 'store') {
              viewAllLink.textContent = 'KUNJUNGI ASSET STORE →';
              viewAllLink.href = '#/store';
            } else if (tab === 'maps') {
              viewAllLink.textContent = 'LIHAT SEMUA MAPS →';
              viewAllLink.href = '#/maps';
            } else {
              viewAllLink.textContent = '';
            }
          }
        });
    }
  },

  async loadRealTimeViews() {
    // 1. Fetch views from Supabase DB
    const dbViews = await DB.getToolViews();

    // 2. Base baseline values from screenshot
    const baseline = {
      'Bypass': 214600,
      'Skybox Converter': 147700,
      'Anim Spoof': 21900,
      'Gui Builder': 14700,
      'Lua Editor': 9900,
      'Material Generator': 9800,
      'Skybox Assembler': 9400,
      'Audio Optimizer': 9200
    };

    // Combine baseline with real-time db counts
    const viewsMap = { ...baseline };
    dbViews.forEach(row => {
      if (row.tool_name && typeof row.views === 'number') {
        viewsMap[row.tool_name] = row.views;
      }
    });

    // 3. Calculate total views
    let totalViews = 0;
    Object.values(viewsMap).forEach(v => {
      totalViews += v;
    });

    // Update total views element in header
    const totalViewsEl = document.getElementById('live-total-views');
    if (totalViewsEl) {
      totalViewsEl.textContent = `${this.formatCount(totalViews)} total views`;
    }

    // 4. Update Paling Dicari cards
    Object.keys(viewsMap).forEach(toolName => {
      const labelEl = document.querySelector(`[data-views-tool="${toolName}"]`);
      if (labelEl) {
        labelEl.textContent = `${this.formatCount(viewsMap[toolName])} views`;
      }
    });

    // 5. Update Live Activity chart
    const maxVal = Math.max(...Object.values(viewsMap), 1);
    Object.keys(viewsMap).forEach(toolName => {
      const barEl = document.querySelector(`[data-bar-tool="${toolName}"]`);
      const labelEl = document.querySelector(`[data-views-label="${toolName}"]`);
      
      const views = viewsMap[toolName];
      const pct = (views / maxVal) * 100;

      if (barEl) {
        barEl.style.width = `${pct}%`;
      }
      if (labelEl) {
        labelEl.textContent = this.formatCount(views);
      }
    });
  },

  formatCount(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace('.0', '') + 'k';
    }
    return num.toString();
  }
};

/* ========================================
   AR COMMUNITY — Home Page Redesigned
   ======================================== */

const HomePage = {
  showAllTestimonials: false,

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
    this.loadRealTimeTestimonials();
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
        <div class="testimonials-rating-summary" id="testimonials-summary-box">
          <span class="stars-gold" id="testimonials-summary-stars">★★★★★</span>
          <span class="rating-text" id="testimonials-summary-text"><strong>5.0/5</strong> dari 5 testimoni</span>
        </div>
        <p class="section-subtitle" style="margin-top: 4px;">Testimoni asli dari member AR Community, ditampilkan apa adanya tanpa disaring.</p>
        
        <div class="testimonials-grid" id="testimonials-live-grid">
          <!-- Real-time testimonials loaded dynamically -->
          <div class="loading-testimonials" style="text-align: center; grid-column: 1 / -1; padding: 30px; color: var(--color-text-muted);">
            ⏳ Memuat testimoni...
          </div>
        </div>

        <div class="testimonials-footer-row" style="display: flex; gap: 16px; justify-content: center; margin-top: 30px; flex-wrap: wrap;">
          <button class="btn btn-ghost" id="btn-load-all-testimonials">Lihat Semua Testimoni</button>
          <button class="btn btn-primary" id="btn-open-testimonial-modal" style="background: var(--gradient-accent); border: none; color: #fff;">✍️ Tulis Testimoni</button>
        </div>

        <!-- Testimonial Submission Modal -->
        <div class="modal-overlay" id="testimonial-modal" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(8px);">
          <div class="modal-content" style="background: #111; border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 12px; padding: 24px; width: 420px; max-width: 90%; position: relative; box-shadow: 0 0 30px rgba(0,240,255,0.15); text-align: left;">
            <h3 style="font-family: var(--font-heading); margin-top: 0; color: #fff; font-size: 1.1rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
              <span>✍️ TULIS TESTIMONI</span>
              <span id="close-testimonial-modal" style="cursor: pointer; color: var(--color-text-muted); font-size: 1.5rem; line-height: 1;">&times;</span>
            </h3>
            
            <form id="testimonial-form" style="display: flex; flex-direction: column; gap: 16px;">
              <div>
                <label style="display: block; font-size: 0.65rem; color: var(--color-text-muted); font-weight: bold; letter-spacing: 0.1em; margin-bottom: 6px; text-transform: uppercase;">NAMA ANDA</label>
                <input type="text" id="testimonial-author-name" required placeholder="Masukkan nama Anda..." style="width: 100%; padding: 10px 14px; background: #181818; border: 1px solid var(--color-border); border-radius: 6px; color: #fff; font-size: 0.8rem; box-sizing: border-box;">
              </div>

              <div>
                <label style="display: block; font-size: 0.65rem; color: var(--color-text-muted); font-weight: bold; letter-spacing: 0.1em; margin-bottom: 6px; text-transform: uppercase;">RATING BINTANG</label>
                <div class="rating-input-stars" style="display: flex; gap: 8px; font-size: 1.8rem; color: var(--color-text-muted); cursor: pointer;">
                  <span class="star-select" data-rating="1" style="color: var(--color-accent-yellow);">★</span>
                  <span class="star-select" data-rating="2" style="color: var(--color-accent-yellow);">★</span>
                  <span class="star-select" data-rating="3" style="color: var(--color-accent-yellow);">★</span>
                  <span class="star-select" data-rating="4" style="color: var(--color-accent-yellow);">★</span>
                  <span class="star-select" data-rating="5" style="color: var(--color-accent-yellow);">★</span>
                </div>
                <input type="hidden" id="testimonial-rating-val" value="5" required>
              </div>

              <div>
                <label style="display: block; font-size: 0.65rem; color: var(--color-text-muted); font-weight: bold; letter-spacing: 0.1em; margin-bottom: 6px; text-transform: uppercase;">ULASAN / KOMENTAR</label>
                <textarea id="testimonial-comment-text" required placeholder="Apa tanggapan Anda tentang web/komunitas AR?" style="width: 100%; height: 100px; padding: 10px 14px; background: #181818; border: 1px solid var(--color-border); border-radius: 6px; color: #fff; font-size: 0.8rem; font-family: var(--font-body); resize: none; box-sizing: border-box;"></textarea>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; background: var(--gradient-accent); border: none; color: #fff; font-weight: bold; cursor: pointer; border-radius: 6px;">KIRIM TESTIMONI 🚀</button>
            </form>
          </div>
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
      });
    }

    // 3. Testimonial Modal event handling
    const openModalBtn = document.getElementById('btn-open-testimonial-modal');
    const closeModalBtn = document.getElementById('close-testimonial-modal');
    const modalOverlay = document.getElementById('testimonial-modal');
    
    if (openModalBtn && modalOverlay) {
      openModalBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        // Autofill name if user is logged in
        const authorInput = document.getElementById('testimonial-author-name');
        if (authorInput) {
          authorInput.value = localStorage.getItem('userName') || '';
        }
      });
    }

    if (closeModalBtn && modalOverlay) {
      closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
      });
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
        }
      });
    }

    // Star selection inside modal
    const starElms = document.querySelectorAll('.star-select');
    const ratingInputVal = document.getElementById('testimonial-rating-val');
    if (starElms && ratingInputVal) {
      const updateStarColors = (rating) => {
        starElms.forEach(s => {
          const sRating = s.getAttribute('data-rating');
          if (sRating <= rating) {
            s.style.color = 'var(--color-accent-yellow)';
          } else {
            s.style.color = 'var(--color-text-muted)';
          }
        });
      };
      
      starElms.forEach(star => {
        star.addEventListener('click', () => {
          const r = star.getAttribute('data-rating');
          ratingInputVal.value = r;
          updateStarColors(r);
        });
      });
    }

    // Testimonial Form submit handler
    const testimonialForm = document.getElementById('testimonial-form');
    if (testimonialForm) {
      testimonialForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const authorName = document.getElementById('testimonial-author-name').value.trim();
        const rating = document.getElementById('testimonial-rating-val').value;
        const commentText = document.getElementById('testimonial-comment-text').value.trim();
        const userEmail = localStorage.getItem('userEmail') || '';

        if (!authorName || !commentText) {
          alert('Nama dan ulasan wajib diisi!');
          return;
        }

        try {
          await DB.addTestimonial(authorName, rating, commentText, userEmail);
          alert('Testimoni Anda berhasil dikirim! Terima kasih atas dukungannya.');
          
          // Clear inputs
          document.getElementById('testimonial-comment-text').value = '';
          
          // Hide modal
          if (modalOverlay) modalOverlay.classList.remove('active');
          
          // Reload real-time testimonials list
          this.loadRealTimeTestimonials();
        } catch (err) {
          alert('Gagal mengirim testimoni. Silakan coba lagi nanti.');
        }
      });
    }

    // Toggle showing all testimonials
    const loadAllBtn = document.getElementById('btn-load-all-testimonials');
    if (loadAllBtn) {
      loadAllBtn.addEventListener('click', () => {
        this.showAllTestimonials = true;
        loadAllBtn.style.display = 'none';
        this.loadRealTimeTestimonials();
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
  },

  async loadRealTimeTestimonials() {
    // 1. Fetch testimonials from Supabase DB
    const dbTestimonials = await DB.fetchTestimonials();

    // 2. Fallback baseline if DB is empty
    const baseline = [
      { name: 'DevPemula', rating: 5, comment: 'Keren banget tools-nya!', created_at: new Date(Date.now() - 5 * 3600000).toISOString() },
      { name: 'Nexyl', rating: 5, comment: 'KEREN WEBSITE NYA BANGGGGGGG', created_at: new Date(Date.now() - 15 * 3600000).toISOString() },
      { name: 'Kecap', rating: 5, comment: 'bermamfaat banget', created_at: new Date(Date.now() - 18 * 3600000).toISOString() },
      { name: 'RIEL', rating: 5, comment: 'Sangat membantu developer Roblox.', created_at: new Date(Date.now() - 21 * 3600000).toISOString() },
      { name: 'amat', rating: 4, comment: 'Bagus, terus kembangkan ya.', created_at: new Date(Date.now() - 23 * 3600000).toISOString() }
    ];

    const list = dbTestimonials.length > 0 ? dbTestimonials : baseline;
    const count = list.length;
    const sum = list.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = (sum / count).toFixed(1);

    // 3. Update summary box
    const summaryStarsEl = document.getElementById('testimonials-summary-stars');
    const summaryTextEl = document.getElementById('testimonials-summary-text');
    if (summaryStarsEl && summaryTextEl) {
      const roundedRating = Math.round(avg);
      summaryStarsEl.textContent = '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
      summaryTextEl.innerHTML = `<strong>${avg}/5</strong> dari ${count} testimoni`;
    }

    // 4. Determine how many to show
    const visibleList = this.showAllTestimonials ? list : list.slice(0, 5);

    // 5. Hide load-more button if we have shown all
    const loadAllBtn = document.getElementById('btn-load-all-testimonials');
    if (loadAllBtn) {
      if (list.length <= 5 || this.showAllTestimonials) {
        loadAllBtn.style.display = 'none';
      } else {
        loadAllBtn.style.display = 'inline-block';
      }
    }

    // 6. Map to HTML grid
    const gridHtml = visibleList.map(item => {
      const starsHtml = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
      const comment = item.comment || '(Tanpa komentar)';
      const dateText = this.timeAgo(item.created_at);
      
      return `
        <div class="testimonial-card">
          <div class="testimonial-header">
            <span class="stars-gold">${starsHtml}</span>
            <span class="time-ago">${dateText}</span>
          </div>
          <p class="testimonial-comment">${comment}</p>
          <div class="testimonial-author">${item.name}</div>
          <div class="testimonial-reply-btn" onclick="alert('Fitur balas testimoni segera hadir!')">↩ Balas</div>
        </div>
      `;
    }).join('');

    const gridEl = document.getElementById('testimonials-live-grid');
    if (gridEl) {
      gridEl.innerHTML = gridHtml;
    }
  },

  timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const elapsed = now - past;

    if (elapsed < msPerMinute) {
      return 'Baru saja';   
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + 'm lalu';   
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + 'j lalu';   
    } else {
      return Math.round(elapsed / msPerDay) + 'h lalu';   
    }
  }
};

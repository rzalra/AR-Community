/* ========================================
   AR COMMUNITY — Home Page
   ======================================== */

const HomePage = {

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        ${this.renderHero()}
        ${this.renderStats()}
        ${this.renderCatalog()}
      </div>
    `;

    // Animate stat counters after a brief delay
    setTimeout(() => this.animateCounters(), 500);
  },

  renderHero() {
    // Generate floating particles
    let particles = '';
    for (let i = 0; i < 20; i++) {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 6;
      const size = 2 + Math.random() * 3;
      const opacity = 0.1 + Math.random() * 0.3;
      particles += `<div class="particle" style="left:${left}%; top:${top}%; width:${size}px; height:${size}px; opacity:${opacity}; animation-delay:${delay}s; animation-duration:${4 + Math.random() * 4}s"></div>`;
    }

    return `
      <section class="hero">
        <div class="hero-grid-bg"></div>
        <div class="hero-particles">${particles}</div>
        <div class="container">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="pulse-dot"></span>
              COMMUNITY PLATFORM
            </div>
            <img src="assets/logo.png" alt="AR Community Logo" style="max-height: 180px; width: auto; display: block; margin: 0 auto var(--space-4) auto; filter: drop-shadow(0 0 25px rgba(0, 240, 255, 0.4));">
            <h1>
              AR<br>
              <span class="text-gradient">COMMUNITY</span>
            </h1>
            <p class="hero-subtitle">
              Platform kolaborasi untuk pengembangan proyek game & digital. 
              Akses tools, aset, dan sumber daya eksklusif bersama komunitas kami.
            </p>
            <div class="hero-actions">
              <a href="https://discord.gg/BJJjeM4mFy" target="_blank" class="btn btn-primary btn-lg">
                🎮 JOIN COMMUNITY
              </a>
              <a href="#/tools" class="btn btn-secondary btn-lg">
                🔧 EXPLORE TOOLS
              </a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  renderStats() {
    const statsHtml = APP_DATA.stats.map((stat, i) =>
      Components.statCard(stat, i * 150)
    ).join('');

    return `
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            ${statsHtml}
          </div>
        </div>
      </section>
    `;
  },

  renderCatalog() {
    // Mix featured tools and store items for catalog
    const featuredTools = APP_DATA.tools.filter(t => t.featured).slice(0, 3);
    const featuredStore = APP_DATA.storeItems.filter(i => i.featured).slice(0, 3);

    const catalogHtml = [
      ...featuredTools.map(t => Components.catalogCard(t)),
      ...featuredStore.map(s => Components.catalogCard(s))
    ].join('');

    return `
      <section class="catalog-section">
        <div class="container">
          <div class="catalog-header">
            <div>
              <h2>Katalog AR</h2>
              <p style="color:var(--color-text-muted); margin-top: 4px">Produk & alat terpopuler dari komunitas</p>
            </div>
            <a href="#/store" class="btn btn-ghost">VIEW ALL →</a>
          </div>
          <div class="catalog-grid">
            ${catalogHtml}
          </div>
        </div>
      </section>
    `;
  },

  animateCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(el => {
      el.style.animation = 'counterUp 600ms ease forwards';
    });
  }
};

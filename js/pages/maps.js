/* ========================================
   AR COMMUNITY — Maps Page
   ======================================== */

const MapsPage = {

  activeStatus: 'all',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="maps-page">
          <div class="container">
            ${this.renderHeader()}
            ${this.renderControls()}
            <div id="maps-grid" class="maps-grid"></div>
          </div>
        </section>
      </div>
      <div id="map-modal" class="modal-overlay" onclick="MapsPage.closeDetail(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
          <div class="modal-header">
            <h3 id="map-modal-title">Map Detail</h3>
            <button class="modal-close" onclick="MapsPage.closeDetail()">✕</button>
          </div>
          <div class="modal-body" id="map-modal-body"></div>
        </div>
      </div>
    `;

    this.updateGrid();
  },

  renderHeader() {
    return `
      <div class="maps-header">
        <h1>🗺️ Maps</h1>
        <p style="color:var(--color-text-muted)">Galeri peta experience yang dikembangkan komunitas</p>
      </div>
    `;
  },

  renderControls() {
    const tabs = Components.filterTabs(APP_DATA.mapStatuses, this.activeStatus, 'MapsPage.setStatus');
    return `
      <div class="maps-controls">
        ${tabs}
        <div style="font-size:var(--text-sm); color:var(--color-text-muted)">
          Total: <strong style="color:var(--color-accent-cyan)">${APP_DATA.maps.length}</strong> maps
        </div>
      </div>
    `;
  },

  setStatus(statusId) {
    this.activeStatus = statusId;
    this.render();
  },

  getFilteredMaps() {
    let maps = APP_DATA.maps;
    if (this.activeStatus !== 'all') {
      maps = maps.filter(m => m.status === this.activeStatus);
    }
    return maps;
  },

  updateGrid() {
    const maps = this.getFilteredMaps();
    const grid = document.getElementById('maps-grid');
    if (!grid) return;

    if (maps.length === 0) {
      grid.innerHTML = Components.emptyState(
        '🗺️',
        'Tidak Ada Map',
        'Tidak ada map dengan status ini.'
      );
      return;
    }

    grid.innerHTML = maps.map(map => Components.mapCard(map)).join('');

    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.animation = `fadeInUp 400ms ease ${i * 100}ms forwards`;
    });
  },

  showDetail(mapId) {
    const map = APP_DATA.maps.find(m => m.id === mapId);
    if (!map) return;

    const modal = document.getElementById('map-modal');
    const title = document.getElementById('map-modal-title');
    const body = document.getElementById('map-modal-body');

    title.textContent = map.name;

    const statusColors = { public: 'badge-green', development: 'badge-yellow', archived: 'badge-red' };
    const statusLabels = { public: 'Public', development: 'Development', archived: 'Archived' };
    const mapIcons = { 1: '🌃', 2: '🌳', 3: '🚀', 4: '🏜️', 5: '🌊', 6: '🏘️' };

    const mapGradients = [
      'linear-gradient(135deg, #0a1628, #1a0a2e, #2e0a1a)',
      'linear-gradient(135deg, #0a2a0a, #1a3a1a, #0a2a2a)',
      'linear-gradient(135deg, #1a1a2e, #2e1a3e, #1a2a3e)',
      'linear-gradient(135deg, #2a1a0a, #3a2a1a, #2a2a1a)',
      'linear-gradient(135deg, #0a1a2e, #1a2a3e, #0a2a2a)',
      'linear-gradient(135deg, #1a0a1a, #2e0a2e, #1a1a2e)',
    ];

    body.innerHTML = `
      <div class="map-detail-hero" style="background:${mapGradients[map.id % mapGradients.length]}; display:flex; align-items:center; justify-content:center;">
        <span style="font-size:5rem; opacity:0.4">${mapIcons[map.id] || '🗺️'}</span>
      </div>

      <div style="display:flex; align-items:center; gap:12px; margin-bottom: 16px;">
        <span class="badge ${statusColors[map.status]}">${statusLabels[map.status]}</span>
        ${Components.ratingStars(map.rating)}
        <span style="font-size:var(--text-sm); color:var(--color-text-muted)">👁️ ${Components.formatNumber(map.visits)} visits</span>
      </div>

      <p style="color:var(--color-text-secondary); margin-bottom:24px; line-height:1.7">${map.description}</p>

      <div class="map-detail-info">
        <div class="map-detail-field">
          <label>Versi</label>
          <p>${map.version}</p>
        </div>
        <div class="map-detail-field">
          <label>Update Terakhir</label>
          <p>${map.lastUpdate}</p>
        </div>
        <div class="map-detail-field">
          <label>Total Kunjungan</label>
          <p>${map.visits.toLocaleString('id-ID')}</p>
        </div>
        <div class="map-detail-field">
          <label>Rating</label>
          <p>⭐ ${map.rating} / 5.0</p>
        </div>
      </div>

      <div class="map-detail-builders">
        <h4 style="font-family:var(--font-heading); font-size:var(--text-xs); letter-spacing:0.1em; text-transform:uppercase; color:var(--color-text-muted); margin-bottom:12px">BUILDERS & TEAM</h4>
        <div class="builder-list">
          ${map.builders.map(b => `
            <div class="builder-chip">
              <div class="builder-chip-avatar">${b.name.charAt(0)}</div>
              <span>${b.name}</span>
              <span class="tag">${b.role}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom:24px">
        <h4 style="font-family:var(--font-heading); font-size:var(--text-xs); letter-spacing:0.1em; text-transform:uppercase; color:var(--color-text-muted); margin-bottom:12px">ASET YANG DIGUNAKAN</h4>
        <div style="display:flex; flex-wrap:wrap; gap:8px">
          ${map.assets.map(a => `<span class="badge badge-cyan">${a}</span>`).join('')}
        </div>
      </div>

      <div style="display:flex; gap:12px">
        <a href="${map.editorLink}" class="btn btn-primary btn-lg" style="flex:1">
          🎮 OPEN IN EDITOR
        </a>
        <button class="btn btn-ghost btn-lg" onclick="MapsPage.closeDetail()">
          CLOSE
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeDetail(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById('map-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

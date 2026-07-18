/* ========================================
   AR COMMUNITY — Reusable Component Renderers
   ======================================== */

const Components = {

  // ── Stat Card ──
  statCard(stat, delay = 0) {
    return `
      <div class="stat-card" style="animation: fadeInUp 600ms ease ${delay}ms both">
        <div class="stat-icon">${stat.icon}</div>
        <div class="stat-value">${stat.value}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `;
  },

  // ── Tool Card ──
  toolCard(tool) {
    const tagsHtml = tool.tags.map(t => `<span class="tag">${t}</span>`).join('');
    return `
      <div class="card tool-card" data-tool-id="${tool.id}">
        <div class="card-body">
          <div class="tool-card-header">
            <div class="tool-card-icon">${tool.icon}</div>
            <div class="tool-card-info">
              <h3 class="card-title">${tool.name}</h3>
              <div class="tool-card-tags">${tagsHtml}</div>
            </div>
          </div>
          <p class="card-desc">${tool.description}</p>
          <div class="card-meta">
            <a href="${tool.link}" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">
              ⚡ OPEN TOOL
            </a>
            <a href="${tool.docLink}" class="btn btn-ghost btn-sm" onclick="event.stopPropagation()">
              📄 DOCS
            </a>
          </div>
        </div>
      </div>
    `;
  },

  // ── Store Product Card ──
  storeCard(item) {
    const discount = item.originalPrice
      ? Math.round((1 - item.price / item.originalPrice) * 100)
      : null;

    const starsHtml = Components.ratingStars(item.rating);

    // Generate a color gradient for the placeholder image
    const gradients = [
      'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
      'linear-gradient(135deg, #1a1a1a, #2d1b4e, #1a1a2e)',
      'linear-gradient(135deg, #0a1628, #1a2a3a, #0a2840)',
      'linear-gradient(135deg, #1a0a2e, #2e1a3e, #0a1a2e)',
      'linear-gradient(135deg, #0a2a1a, #1a3a2a, #0a2a2a)',
    ];
    const grad = gradients[item.id % gradients.length];

    return `
      <div class="card store-card" data-store-id="${item.id}">
        <div class="card-image" style="background: ${grad}; display:flex; align-items:center; justify-content:center;">
          <span style="font-size: 3rem; opacity: 0.4">${item.tags[0] === '3D' ? '🏰' : item.tags[0] === 'Script' ? '💻' : item.tags[0] === 'Design' ? '🎨' : item.tags[0] === 'Template' ? '📱' : '🎵'}</span>
          ${discount ? `<div style="position:absolute; top: 12px; left: 12px;"><span class="badge badge-red">-${discount}%</span></div>` : ''}
          <div class="card-image-overlay"></div>
        </div>
        <div class="card-body">
          <span class="card-category" style="font-size:0.65rem; color: var(--color-accent-purple); letter-spacing:0.1em; text-transform:uppercase; font-weight:600">${Components.categoryName(item.category)}</span>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-desc">${item.description}</p>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom: 4px;">
            ${starsHtml}
            <span style="font-size:0.75rem; color:var(--color-text-muted)">(${item.reviews})</span>
          </div>
          <div class="card-price-row" style="display:flex; align-items:center; justify-content:space-between;">
            <div>
              <span class="card-price">${Components.formatPrice(item.price)}</span>
              ${item.originalPrice ? `<span style="font-size:0.75rem; color:var(--color-text-muted); text-decoration:line-through; margin-left:8px">${Components.formatPrice(item.originalPrice)}</span>` : ''}
            </div>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation()">🛒 BUY NOW</button>
          </div>
        </div>
      </div>
    `;
  },

  // ── Map Card ──
  mapCard(map) {
    const statusColors = {
      public: 'badge-green',
      development: 'badge-yellow',
      archived: 'badge-red'
    };
    const statusLabels = {
      public: 'Public',
      development: 'Development',
      archived: 'Archived'
    };

    const mapGradients = [
      'linear-gradient(135deg, #0a1628, #1a0a2e, #2e0a1a)',
      'linear-gradient(135deg, #0a2a0a, #1a3a1a, #0a2a2a)',
      'linear-gradient(135deg, #1a1a2e, #2e1a3e, #1a2a3e)',
      'linear-gradient(135deg, #2a1a0a, #3a2a1a, #2a2a1a)',
      'linear-gradient(135deg, #0a1a2e, #1a2a3e, #0a2a2a)',
      'linear-gradient(135deg, #1a0a1a, #2e0a2e, #1a1a2e)',
    ];
    const grad = mapGradients[map.id % mapGradients.length];

    const mapIcons = {
      1: '🌃', 2: '🌳', 3: '🚀', 4: '🏜️', 5: '🌊', 6: '🏘️'
    };

    return `
      <div class="card map-card" data-map-id="${map.id}" onclick="MapsPage.showDetail(${map.id})">
        <div class="card-image" style="background: ${grad}; display:flex; align-items:center; justify-content:center;">
          <span style="font-size: 4rem; opacity: 0.5">${mapIcons[map.id] || '🗺️'}</span>
          <div class="map-card-status">
            <span class="badge ${statusColors[map.status]}">${statusLabels[map.status]}</span>
          </div>
          <div class="card-image-overlay"></div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${map.name}</h3>
          <p class="card-desc">${map.description}</p>
          <div class="map-card-stats">
            <span class="stat">👁️ ${Components.formatNumber(map.visits)}</span>
            <span class="stat">⭐ ${map.rating}</span>
            <span class="stat">📦 v${map.version}</span>
          </div>
        </div>
      </div>
    `;
  },

  // ── Catalog Card (Home page) ──
  catalogCard(item) {
    const isStore = !!item.price;
    const gradients = [
      'linear-gradient(135deg, #1a1a2e, #16213e)',
      'linear-gradient(135deg, #1a0a2e, #2e1a3e)',
      'linear-gradient(135deg, #0a2a1a, #1a3a2a)',
      'linear-gradient(135deg, #2a1a0a, #1a2a3a)',
    ];
    const grad = gradients[item.id % gradients.length];

    if (isStore) {
      return `
        <div class="card" style="cursor:pointer" onclick="window.location.hash='#/store'">
          <div class="card-image" style="background:${grad}; display:flex; align-items:center; justify-content:center; aspect-ratio:16/10">
            <span style="font-size:2.5rem; opacity:0.4">🏷️</span>
            <div class="card-image-overlay"></div>
          </div>
          <div class="card-body">
            <h3 class="card-title">${item.name}</h3>
            <p class="card-desc">${item.description}</p>
            <div class="card-meta">
              <span class="card-price">${Components.formatPrice(item.price)}</span>
              <span class="btn btn-primary btn-sm">VIEW</span>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="card" style="cursor:pointer" onclick="window.location.hash='#/tools'">
        <div class="card-body" style="display:flex; align-items:center; gap:16px;">
          <div class="tool-card-icon">${item.icon}</div>
          <div>
            <h3 class="card-title">${item.name}</h3>
            <p class="card-desc" style="margin:0">${item.description}</p>
          </div>
        </div>
      </div>
    `;
  },

  // ── Rating Stars ──
  ratingStars(rating) {
    let html = '<div class="rating">';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star${i > Math.floor(rating) ? ' empty' : ''}">★</span>`;
    }
    html += `<span class="rating-value">${rating}</span></div>`;
    return html;
  },

  // ── Price Formatter ──
  formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
  },

  // ── Number Formatter ──
  formatNumber(num) {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  },

  // ── Category Name ──
  categoryName(catId) {
    const cats = {
      '3d': 'Aset 3D',
      'script': 'Skrip Lua',
      'design': 'Layanan Desain',
      'template': 'Template',
      'audio': 'Audio Pack'
    };
    return cats[catId] || catId;
  },

  // ── Search Result Item ──
  searchResult(item, type) {
    const icons = { tool: '🔧', store: '🛒', map: '🗺️' };
    const labels = { tool: 'Tool', store: 'Store', map: 'Map' };
    return `
      <div class="search-result-item" data-type="${type}" data-id="${item.id}" onclick="Components.handleSearchClick('${type}', ${item.id})">
        <div class="search-result-icon">${icons[type]}</div>
        <div class="search-result-info">
          <h4>${item.name}</h4>
          <p>${labels[type]} — ${item.description ? item.description.substring(0, 60) + '...' : ''}</p>
        </div>
      </div>
    `;
  },

  // ── Handle search result click ──
  handleSearchClick(type, id) {
    const routes = { tool: '#/tools', store: '#/store', map: '#/maps' };
    App.closeSearch();
    window.location.hash = routes[type];
  },

  // ── Filter Tabs ──
  filterTabs(categories, activeId, onClickFn) {
    return `
      <div class="filter-tabs">
        ${categories.map(cat => `
          <button class="filter-tab${cat.id === activeId ? ' active' : ''}" onclick="${onClickFn}('${cat.id}')">
            ${cat.icon ? cat.icon + ' ' : ''}${cat.name}
          </button>
        `).join('')}
      </div>
    `;
  },

  // ── Empty State ──
  emptyState(icon, title, message) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${message}</p>
      </div>
    `;
  }
};

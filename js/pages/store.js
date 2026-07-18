/* ========================================
   AR COMMUNITY — Store Page
   ======================================== */

const StorePage = {

  activeCategory: 'all',
  searchQuery: '',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="store-page">
          <div class="container">
            ${this.renderHeader()}
            ${this.renderControls()}
            <div id="store-grid" class="store-grid"></div>
          </div>
        </section>
      </div>
    `;

    this.updateGrid();
  },

  renderHeader() {
    return `
      <div class="store-header">
        <h1>🛒 Store</h1>
        <p style="color:var(--color-text-muted)">Beli aset, skrip, dan layanan untuk proyek Anda</p>
      </div>
    `;
  },

  renderControls() {
    const tabs = Components.filterTabs(APP_DATA.storeCategories, this.activeCategory, 'StorePage.setCategory');
    return `
      <div class="store-controls">
        ${tabs}
        <div class="search-input-wrap" style="max-width:300px">
          <span class="search-input-icon">🔍</span>
          <input type="text" class="search-input" id="store-search" 
            placeholder="Cari produk..." 
            value="${this.searchQuery}"
            oninput="StorePage.setSearch(this.value)">
        </div>
      </div>
    `;
  },

  setCategory(catId) {
    this.activeCategory = catId;
    this.render();
  },

  setSearch(query) {
    this.searchQuery = query;
    this.updateGrid();
  },

  getFilteredItems() {
    let items = APP_DATA.storeItems;

    if (this.activeCategory !== 'all') {
      items = items.filter(i => i.category === this.activeCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return items;
  },

  updateGrid() {
    const items = this.getFilteredItems();
    const grid = document.getElementById('store-grid');
    if (!grid) return;

    if (items.length === 0) {
      grid.innerHTML = Components.emptyState(
        '🛒',
        'Tidak Ada Produk',
        'Coba ubah filter atau kata kunci pencarian Anda.'
      );
      return;
    }

    grid.innerHTML = items.map(item => Components.storeCard(item)).join('');

    // Staggered animation
    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.animation = `fadeInUp 400ms ease ${i * 80}ms forwards`;
    });
  }
};

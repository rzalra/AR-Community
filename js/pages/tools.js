/* ========================================
   AR COMMUNITY — Tools Page
   ======================================== */

const ToolsPage = {

  activeCategory: 'all',
  searchQuery: '',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tools-page">
          <div class="container">
            ${this.renderHeader()}
            ${this.renderControls()}
            <div id="tools-count" class="tools-count"></div>
            <div id="tools-grid" class="tools-grid"></div>
          </div>
        </section>
      </div>
    `;

    this.updateGrid();
  },

  renderHeader() {
    return `
      <div class="tools-header">
        <h1>🔧 Tools</h1>
        <p>Berbagai alat digital untuk membantu proses pembuatan proyek Anda</p>
      </div>
    `;
  },

  renderControls() {
    const tabs = Components.filterTabs(APP_DATA.toolCategories, this.activeCategory, 'ToolsPage.setCategory');
    return `
      <div class="tools-controls">
        <div class="search-input-wrap">
          <span class="search-input-icon">🔍</span>
          <input type="text" class="search-input" id="tools-search" 
            placeholder="Cari tools..." 
            value="${this.searchQuery}"
            oninput="ToolsPage.setSearch(this.value)">
        </div>
        ${tabs}
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

  getFilteredTools() {
    let tools = APP_DATA.tools;

    if (this.activeCategory !== 'all') {
      tools = tools.filter(t => t.category === this.activeCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      tools = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return tools;
  },

  updateGrid() {
    const tools = this.getFilteredTools();
    const grid = document.getElementById('tools-grid');
    const count = document.getElementById('tools-count');

    if (!grid || !count) return;

    count.innerHTML = `Menampilkan <strong>${tools.length}</strong> dari ${APP_DATA.tools.length} tools`;

    if (tools.length === 0) {
      grid.innerHTML = Components.emptyState(
        '🔍',
        'Tidak Ada Hasil',
        'Coba ubah filter atau kata kunci pencarian Anda.'
      );
      return;
    }

    grid.innerHTML = tools.map(tool => Components.toolCard(tool)).join('');

    // Staggered animation
    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.animation = `fadeInUp 400ms ease ${i * 60}ms forwards`;
    });
  }
};

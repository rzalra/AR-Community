/* ========================================
   AR COMMUNITY — Map Layout Planner
   ======================================== */

const MapPlannerPage = {
  gridSize: 20,
  cellSize: 28,
  activeTile: 'wall',
  grid: [],
  isDrawing: false,

  tiles: {
    empty:      { color: '#111111', label: '⬜ Empty' },
    wall:       { color: '#4a5568', label: '🧱 Wall' },
    spawn:      { color: '#22c55e', label: '🟢 Spawn' },
    obstacle:   { color: '#ef4444', label: '🔴 Obstacle' },
    checkpoint: { color: '#f59e0b', label: '🟡 Checkpoint' },
    finish:     { color: '#8b5cf6', label: '🟣 Finish' },
    water:      { color: '#3b82f6', label: '🔵 Water' },
    lava:       { color: '#dc2626', label: '🌋 Lava' }
  },

  render() {
    if (!this.grid.length) this.initGrid();

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Map Layout Planner</span>
            </div>
            <div class="tool-page-header">
              <h1>🗺️ Map Layout Planner</h1>
              <p>Rencanakan layout map/level 2D untuk game Roblox Anda</p>
            </div>

            <div class="tool-section">
              <h3>🎨 Tile Palette</h3>
              <div class="preset-grid">
                ${Object.entries(this.tiles).map(([key, t]) => `
                  <button class="preset-btn ${this.activeTile===key?'active':''}" onclick="MapPlannerPage.setTile('${key}')" style="border-left:3px solid ${t.color};">${t.label}</button>
                `).join('')}
              </div>
            </div>

            <div class="tool-section" style="text-align:center;">
              <div class="controls-row" style="margin-bottom:var(--space-3); justify-content:center;">
                <label>Grid Size:</label>
                <select onchange="MapPlannerPage.resizeGrid(+this.value)">
                  ${[10,15,20,25,30].map(s => `<option value="${s}" ${s===this.gridSize?'selected':''}>${s}x${s}</option>`).join('')}
                </select>
                <button class="btn btn-ghost btn-sm" onclick="MapPlannerPage.clearGrid()">🗑 Clear</button>
                <button class="btn btn-ghost btn-sm" onclick="MapPlannerPage.undo()">↩ Undo</button>
                <button class="btn btn-primary btn-sm" onclick="MapPlannerPage.exportPng()">📷 Export PNG</button>
                <button class="btn btn-ghost btn-sm" onclick="MapPlannerPage.generateLua()">📋 Generate Lua</button>
              </div>
              <div class="canvas-container" style="display:inline-block;">
                <canvas id="map-canvas"></canvas>
              </div>
            </div>

            <div class="code-output" id="map-lua-output" style="margin-top:var(--space-4); display:none;"></div>
          </div>
        </section>
      </div>
    `;
    this.drawGrid();
    this.bindCanvas();
  },

  initGrid() {
    this.grid = [];
    this.history = [];
    for (let y = 0; y < this.gridSize; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.gridSize; x++) this.grid[y][x] = 'empty';
    }
  },

  resizeGrid(size) {
    this.gridSize = size;
    this.initGrid();
    this.render();
  },

  clearGrid() {
    this.initGrid();
    this.drawGrid();
  },

  setTile(t) {
    this.activeTile = t;
    this.render();
  },

  saveHistory() {
    this.history = this.history || [];
    this.history.push(JSON.stringify(this.grid));
    if (this.history.length > 50) this.history.shift();
  },

  undo() {
    if (this.history && this.history.length) {
      this.grid = JSON.parse(this.history.pop());
      this.drawGrid();
    }
  },

  drawGrid() {
    const canvas = document.getElementById('map-canvas');
    if (!canvas) return;
    const size = this.gridSize * this.cellSize;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        const tile = this.grid[y] && this.grid[y][x] ? this.grid[y][x] : 'empty';
        ctx.fillStyle = this.tiles[tile].color;
        ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      }
    }
  },

  bindCanvas() {
    const canvas = document.getElementById('map-canvas');
    if (!canvas) return;

    const paint = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / this.cellSize);
      const y = Math.floor((e.clientY - rect.top) / this.cellSize);
      if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
        this.grid[y][x] = this.activeTile;
        this.drawGrid();
      }
    };

    canvas.onmousedown = (e) => { this.saveHistory(); this.isDrawing = true; paint(e); };
    canvas.onmousemove = (e) => { if (this.isDrawing) paint(e); };
    canvas.onmouseup = () => { this.isDrawing = false; };
    canvas.onmouseleave = () => { this.isDrawing = false; };
  },

  exportPng() {
    const canvas = document.getElementById('map-canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'map_layout.png';
    a.click();
  },

  generateLua() {
    const output = document.getElementById('map-lua-output');
    if (!output) return;

    const tileMap = { empty: 0, wall: 1, spawn: 2, obstacle: 3, checkpoint: 4, finish: 5, water: 6, lava: 7 };
    let lua = `-- Map Layout generated by AR Community Map Planner\nlocal MapData = {\n  Size = ${this.gridSize},\n  Tiles = {\n`;
    for (let y = 0; y < this.gridSize; y++) {
      lua += '    {' + this.grid[y].map(t => tileMap[t] || 0).join(',') + '},\n';
    }
    lua += `  }\n}\n\n-- Tile Legend: 0=Empty, 1=Wall, 2=Spawn, 3=Obstacle, 4=Checkpoint, 5=Finish, 6=Water, 7=Lava\nreturn MapData`;

    output.style.display = 'block';
    output.textContent = lua;
  }
};

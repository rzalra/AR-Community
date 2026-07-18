/* ========================================
   AR COMMUNITY — Texture Pack Studio
   ======================================== */

const TextureStudioPage = {
  canvasSize: 128,
  brushSize: 4,
  currentColor: '#ef4444',
  tool: 'brush',
  isDrawing: false,
  history: [],

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Texture Pack Studio</span>
            </div>
            <div class="tool-page-header">
              <h1>🎨 Texture Pack Studio</h1>
              <p>Buat dan edit tileable textures untuk game Roblox Anda</p>
            </div>

            <div style="display:grid; grid-template-columns:220px 1fr 200px; gap:var(--space-4);">
              <!-- Left: Tools -->
              <div class="tool-section" style="margin-bottom:0;">
                <h3>🖌️ Alat</h3>
                <div style="display:flex; flex-direction:column; gap:var(--space-2);">
                  <button class="preset-btn ${this.tool==='brush'?'active':''}" onclick="TextureStudioPage.setTool('brush')">🖌️ Brush</button>
                  <button class="preset-btn ${this.tool==='eraser'?'active':''}" onclick="TextureStudioPage.setTool('eraser')">🧹 Eraser</button>
                  <button class="preset-btn ${this.tool==='fill'?'active':''}" onclick="TextureStudioPage.setTool('fill')">🪣 Fill</button>
                </div>

                <h3 style="margin-top:var(--space-4);">🎨 Warna</h3>
                <input type="color" value="${this.currentColor}" onchange="TextureStudioPage.currentColor=this.value" style="width:100%; height:32px; border:1px solid var(--color-border); border-radius:var(--radius-sm); background:transparent; cursor:pointer;">
                <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:4px; margin-top:var(--space-2);">
                  ${['#ef4444','#f59e0b','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff','#000000','#4a5568','#1a1a1a','#d97706','#059669'].map(c => `
                    <div style="width:100%;aspect-ratio:1;background:${c};border-radius:3px;cursor:pointer;border:1px solid rgba(255,255,255,0.1);" onclick="TextureStudioPage.currentColor='${c}'"></div>
                  `).join('')}
                </div>

                <h3 style="margin-top:var(--space-4);">📏 Brush Size: ${this.brushSize}px</h3>
                <input type="range" min="1" max="20" value="${this.brushSize}" style="width:100%;" oninput="TextureStudioPage.brushSize=+this.value">

                <h3 style="margin-top:var(--space-4);">📐 Canvas</h3>
                <select style="width:100%; padding:6px; background:#0d0d0d; border:1px solid var(--color-border); border-radius:var(--radius-sm); color:var(--color-text-primary);" onchange="TextureStudioPage.resizeCanvas(+this.value)">
                  ${[64,128,256].map(s => `<option value="${s}" ${s===this.canvasSize?'selected':''}>${s}x${s}</option>`).join('')}
                </select>

                <div style="display:flex; flex-direction:column; gap:var(--space-2); margin-top:var(--space-4);">
                  <button class="btn btn-ghost btn-sm" onclick="TextureStudioPage.undo()">↩ Undo</button>
                  <button class="btn btn-ghost btn-sm" onclick="TextureStudioPage.clearCanvas()">🗑 Clear</button>
                  <button class="btn btn-primary btn-sm" onclick="TextureStudioPage.downloadPng()">💾 Download PNG</button>
                </div>
              </div>

              <!-- Center: Canvas -->
              <div class="tool-section" style="margin-bottom:0; text-align:center;">
                <h3>🎨 Canvas</h3>
                <div class="canvas-container" style="display:inline-block; image-rendering:pixelated;">
                  <canvas id="texture-canvas" style="image-rendering:pixelated; width:${Math.min(this.canvasSize * 3, 512)}px; height:${Math.min(this.canvasSize * 3, 512)}px;"></canvas>
                </div>
                <div style="margin-top:var(--space-2); display:flex; justify-content:center; gap:var(--space-2);">
                  <label style="display:flex; align-items:center; gap:4px; font-size:0.68rem; color:var(--color-text-muted);">
                    <input type="checkbox" id="grid-toggle" checked onchange="TextureStudioPage.drawGrid()"> Grid
                  </label>
                </div>
              </div>

              <!-- Right: Preview -->
              <div class="tool-section" style="margin-bottom:0;">
                <h3>🔲 Tile Preview (2x2)</h3>
                <div style="image-rendering:pixelated;">
                  <canvas id="tile-preview" width="${this.canvasSize * 2}" height="${this.canvasSize * 2}" style="width:100%; image-rendering:pixelated; border:1px solid var(--color-border); border-radius:var(--radius-sm);"></canvas>
                </div>
                <button class="btn btn-ghost btn-sm" style="width:100%; margin-top:var(--space-2);" onclick="TextureStudioPage.updatePreview()">🔄 Update Preview</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    this.initCanvas();
  },

  setTool(t) { this.tool = t; this.render(); },

  initCanvas() {
    const canvas = document.getElementById('texture-canvas');
    if (!canvas) return;
    canvas.width = this.canvasSize;
    canvas.height = this.canvasSize;

    // Restore from history if exists
    if (this.history.length) {
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0); this.drawGrid(); };
      img.src = this.history[this.history.length - 1];
    } else {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, this.canvasSize, this.canvasSize);
      this.drawGrid();
    }

    this.bindCanvas(canvas);
  },

  resizeCanvas(size) {
    this.canvasSize = size;
    this.history = [];
    this.render();
  },

  clearCanvas() {
    const canvas = document.getElementById('texture-canvas');
    if (!canvas) return;
    this.saveHistory();
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.drawGrid();
  },

  saveHistory() {
    const canvas = document.getElementById('texture-canvas');
    if (!canvas) return;
    this.history.push(canvas.toDataURL());
    if (this.history.length > 30) this.history.shift();
  },

  undo() {
    if (!this.history.length) return;
    const canvas = document.getElementById('texture-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    this.history.pop();
    if (this.history.length) {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0); this.drawGrid(); };
      img.src = this.history[this.history.length - 1];
    } else {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.drawGrid();
    }
  },

  drawGrid() {
    // Grid is not drawn on canvas to avoid saving it in the output
  },

  bindCanvas(canvas) {
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: Math.floor((e.clientX - rect.left) * scaleX),
        y: Math.floor((e.clientY - rect.top) * scaleY)
      };
    };

    const paint = (e) => {
      const ctx = canvas.getContext('2d');
      const pos = getPos(e);

      if (this.tool === 'fill') {
        this.floodFill(ctx, pos.x, pos.y, this.currentColor);
        return;
      }

      ctx.fillStyle = this.tool === 'eraser' ? '#1a1a1a' : this.currentColor;
      const half = Math.floor(this.brushSize / 2);
      ctx.fillRect(pos.x - half, pos.y - half, this.brushSize, this.brushSize);
    };

    canvas.onmousedown = (e) => {
      this.saveHistory();
      this.isDrawing = true;
      paint(e);
    };
    canvas.onmousemove = (e) => { if (this.isDrawing) paint(e); };
    canvas.onmouseup = () => { this.isDrawing = false; this.updatePreview(); };
    canvas.onmouseleave = () => { this.isDrawing = false; };
  },

  floodFill(ctx, startX, startY, fillColor) {
    const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const data = imgData.data;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    const idx = (x, y) => (y * w + x) * 4;
    const startIdx = idx(startX, startY);
    const targetR = data[startIdx], targetG = data[startIdx+1], targetB = data[startIdx+2];

    // Parse fill color
    const tmp = document.createElement('canvas').getContext('2d');
    tmp.fillStyle = fillColor;
    tmp.fillRect(0,0,1,1);
    const fc = tmp.getImageData(0,0,1,1).data;

    if (targetR === fc[0] && targetG === fc[1] && targetB === fc[2]) return;

    const stack = [[startX, startY]];
    const visited = new Set();

    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      const key = `${x},${y}`;
      if (visited.has(key)) continue;
      visited.add(key);

      const i = idx(x, y);
      if (Math.abs(data[i] - targetR) > 10 || Math.abs(data[i+1] - targetG) > 10 || Math.abs(data[i+2] - targetB) > 10) continue;

      data[i] = fc[0]; data[i+1] = fc[1]; data[i+2] = fc[2]; data[i+3] = 255;

      stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }

    ctx.putImageData(imgData, 0, 0);
  },

  updatePreview() {
    const source = document.getElementById('texture-canvas');
    const preview = document.getElementById('tile-preview');
    if (!source || !preview) return;
    preview.width = this.canvasSize * 2;
    preview.height = this.canvasSize * 2;
    const ctx = preview.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    // Draw 2x2 tiled
    ctx.drawImage(source, 0, 0);
    ctx.drawImage(source, this.canvasSize, 0);
    ctx.drawImage(source, 0, this.canvasSize);
    ctx.drawImage(source, this.canvasSize, this.canvasSize);
  },

  downloadPng() {
    const canvas = document.getElementById('texture-canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `texture_${this.canvasSize}x${this.canvasSize}.png`;
    a.click();
  }
};

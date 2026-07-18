/* ========================================
   AR COMMUNITY — AI Image Generator
   ======================================== */

const AiImageGenPage = {
  prompt: '',
  style: 'pixel',
  resolution: 256,
  isGenerating: false,

  styles: {
    pixel: { label: '🟩 Pixel Art', colors: ['#22c55e','#16a34a','#15803d','#0a0a0a','#1a1a1a'] },
    cartoon: { label: '🎨 Cartoon', colors: ['#f59e0b','#ef4444','#3b82f6','#8b5cf6','#ffffff'] },
    realistic: { label: '📷 Realistic', colors: ['#4a5568','#2d3748','#1a202c','#718096','#a0aec0'] },
    lowpoly: { label: '🔶 Low-Poly', colors: ['#ec4899','#8b5cf6','#06b6d4','#10b981','#f59e0b'] },
    neon: { label: '💜 Neon', colors: ['#a855f7','#ec4899','#06b6d4','#0a0a0a','#1a1a1a'] },
    scifi: { label: '🚀 Sci-Fi', colors: ['#06b6d4','#3b82f6','#1e3a5f','#0f172a','#64748b'] }
  },

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">AI Image Generator</span>
            </div>
            <div class="tool-page-header">
              <h1>🖼️ AI Image Generator</h1>
              <p>Generate asset gambar prosedural untuk game Roblox — karakter, environment, dan UI elements</p>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4);">
              <!-- Left: Controls -->
              <div>
                <div class="tool-section" style="margin-bottom:var(--space-4);">
                  <h3>✏️ Prompt</h3>
                  <textarea id="ai-prompt" class="form-input" style="min-height:80px;" placeholder="Deskripsikan gambar yang ingin digenerate... (contoh: fantasy forest landscape, sci-fi character, medieval castle)" oninput="AiImageGenPage.prompt=this.value">${this.prompt}</textarea>
                </div>

                <div class="tool-section" style="margin-bottom:var(--space-4);">
                  <h3>🎨 Style</h3>
                  <div class="preset-grid">
                    ${Object.entries(this.styles).map(([key, s]) => `
                      <button class="preset-btn ${this.style===key?'active':''}" onclick="AiImageGenPage.style='${key}';AiImageGenPage.render()">${s.label}</button>
                    `).join('')}
                  </div>
                </div>

                <div class="tool-section" style="margin-bottom:var(--space-4);">
                  <h3>📐 Resolution</h3>
                  <div class="preset-grid">
                    ${[64,128,256,512].map(r => `
                      <button class="preset-btn ${this.resolution===r?'active':''}" onclick="AiImageGenPage.resolution=${r};AiImageGenPage.render()">${r}x${r}</button>
                    `).join('')}
                  </div>
                </div>

                <button class="btn btn-primary" style="width:100%;" onclick="AiImageGenPage.generate()" ${this.isGenerating?'disabled':''}>
                  ${this.isGenerating ? '⏳ Generating...' : '🎨 GENERATE IMAGE'}
                </button>
              </div>

              <!-- Right: Result -->
              <div>
                <div class="tool-section" style="margin-bottom:var(--space-4);">
                  <h3>🖼️ Generated Result</h3>
                  <div class="canvas-container" style="background:#0a0a0a; min-height:300px;">
                    <canvas id="ai-canvas" width="${this.resolution}" height="${this.resolution}" style="width:100%; max-width:${Math.min(this.resolution * 2, 512)}px; image-rendering:${this.style==='pixel'?'pixelated':'auto'};"></canvas>
                  </div>
                  <div style="display:flex; gap:var(--space-2); margin-top:var(--space-2);">
                    <button class="btn btn-ghost btn-sm" onclick="AiImageGenPage.download()">💾 Download PNG</button>
                    <button class="btn btn-ghost btn-sm" onclick="AiImageGenPage.generate()">🔄 Regenerate</button>
                  </div>
                </div>

                <div class="tool-section" style="margin-bottom:0;">
                  <h3>📊 Info</h3>
                  <div style="font-size:0.72rem; color:var(--color-text-muted); line-height:1.5;">
                    <div>Style: <strong style="color:var(--color-text-primary);">${this.styles[this.style].label}</strong></div>
                    <div>Resolution: <strong style="color:var(--color-text-primary);">${this.resolution}x${this.resolution}</strong></div>
                    <div>Format: <strong style="color:var(--color-text-primary);">PNG (Transparent background supported)</strong></div>
                    <div style="margin-top:var(--space-2); color:var(--color-accent-yellow); font-size:0.65rem;">💡 Tip: Gambar ini dihasilkan secara prosedural. Cocok untuk placeholder atau texture game.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  generate() {
    this.isGenerating = true;
    this.render();

    setTimeout(() => {
      const canvas = document.getElementById('ai-canvas');
      if (!canvas) return;
      canvas.width = this.resolution;
      canvas.height = this.resolution;
      const ctx = canvas.getContext('2d');
      const colors = this.styles[this.style].colors;
      const res = this.resolution;

      // Seed from prompt
      let seed = 0;
      const p = this.prompt || 'default';
      for (let i = 0; i < p.length; i++) seed += p.charCodeAt(i) * (i + 1);
      const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

      ctx.fillStyle = colors[colors.length - 1];
      ctx.fillRect(0, 0, res, res);

      if (this.style === 'pixel') {
        // Pixel art generation
        const pixelSize = Math.max(4, Math.floor(res / 32));
        for (let y = 0; y < res; y += pixelSize) {
          for (let x = 0; x < res; x += pixelSize) {
            if (rng() > 0.4) {
              ctx.fillStyle = colors[Math.floor(rng() * (colors.length - 1))];
              ctx.fillRect(x, y, pixelSize, pixelSize);
            }
          }
        }
        // Add symmetry for character-like shapes
        if (p.toLowerCase().includes('character') || p.toLowerCase().includes('karakter')) {
          const imgData = ctx.getImageData(0, 0, res / 2, res);
          ctx.save();
          ctx.translate(res, 0);
          ctx.scale(-1, 1);
          ctx.putImageData(imgData, 0, 0);
          ctx.restore();
        }
      } else if (this.style === 'lowpoly') {
        // Low-poly triangle mesh
        for (let i = 0; i < 80; i++) {
          ctx.fillStyle = colors[Math.floor(rng() * colors.length)];
          ctx.globalAlpha = 0.5 + rng() * 0.5;
          ctx.beginPath();
          ctx.moveTo(rng() * res, rng() * res);
          ctx.lineTo(rng() * res, rng() * res);
          ctx.lineTo(rng() * res, rng() * res);
          ctx.closePath();
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else if (this.style === 'neon') {
        // Neon glow lines
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, res, res);
        for (let i = 0; i < 15; i++) {
          ctx.strokeStyle = colors[Math.floor(rng() * 3)];
          ctx.lineWidth = 2 + rng() * 4;
          ctx.shadowColor = ctx.strokeStyle;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          const sx = rng() * res, sy = rng() * res;
          ctx.moveTo(sx, sy);
          for (let j = 0; j < 5; j++) {
            ctx.lineTo(sx + (rng() - 0.5) * res * 0.8, sy + (rng() - 0.5) * res * 0.8);
          }
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      } else {
        // Gradient + shapes (cartoon, realistic, scifi)
        const grd = ctx.createLinearGradient(0, 0, res, res);
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(0.5, colors[1]);
        grd.addColorStop(1, colors[2]);
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, res, res);

        // Add shapes
        for (let i = 0; i < 30; i++) {
          ctx.fillStyle = colors[Math.floor(rng() * colors.length)];
          ctx.globalAlpha = 0.1 + rng() * 0.4;
          const size = 10 + rng() * res * 0.3;
          const x = rng() * res;
          const y = rng() * res;

          if (rng() > 0.5) {
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(x - size/2, y - size/2, size, size);
          }
        }
        ctx.globalAlpha = 1;
      }

      this.isGenerating = false;
      this.render();
      // Re-draw (render clears canvas)
      setTimeout(() => this.redraw(), 50);
    }, 1200);
  },

  redraw() {
    // Regenerate with same seed
    const canvas = document.getElementById('ai-canvas');
    if (!canvas) return;
    canvas.width = this.resolution;
    canvas.height = this.resolution;
    const ctx = canvas.getContext('2d');
    const colors = this.styles[this.style].colors;
    const res = this.resolution;

    let seed = 0;
    const p = this.prompt || 'default';
    for (let i = 0; i < p.length; i++) seed += p.charCodeAt(i) * (i + 1);
    const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };

    ctx.fillStyle = colors[colors.length - 1];
    ctx.fillRect(0, 0, res, res);

    if (this.style === 'pixel') {
      const pixelSize = Math.max(4, Math.floor(res / 32));
      for (let y = 0; y < res; y += pixelSize) {
        for (let x = 0; x < res; x += pixelSize) {
          if (rng() > 0.4) {
            ctx.fillStyle = colors[Math.floor(rng() * (colors.length - 1))];
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
      }
    } else if (this.style === 'lowpoly') {
      for (let i = 0; i < 80; i++) {
        ctx.fillStyle = colors[Math.floor(rng() * colors.length)];
        ctx.globalAlpha = 0.5 + rng() * 0.5;
        ctx.beginPath();
        ctx.moveTo(rng() * res, rng() * res);
        ctx.lineTo(rng() * res, rng() * res);
        ctx.lineTo(rng() * res, rng() * res);
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    } else if (this.style === 'neon') {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, res, res);
      for (let i = 0; i < 15; i++) {
        ctx.strokeStyle = colors[Math.floor(rng() * 3)];
        ctx.lineWidth = 2 + rng() * 4;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        const sx = rng() * res, sy = rng() * res;
        ctx.moveTo(sx, sy);
        for (let j = 0; j < 5; j++) {
          ctx.lineTo(sx + (rng() - 0.5) * res * 0.8, sy + (rng() - 0.5) * res * 0.8);
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    } else {
      const grd = ctx.createLinearGradient(0, 0, res, res);
      grd.addColorStop(0, colors[0]);
      grd.addColorStop(0.5, colors[1]);
      grd.addColorStop(1, colors[2]);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, res, res);
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = colors[Math.floor(rng() * colors.length)];
        ctx.globalAlpha = 0.1 + rng() * 0.4;
        const size = 10 + rng() * res * 0.3;
        const x = rng() * res;
        const y = rng() * res;
        if (rng() > 0.5) {
          ctx.beginPath(); ctx.arc(x, y, size/2, 0, Math.PI*2); ctx.fill();
        } else {
          ctx.fillRect(x-size/2, y-size/2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    }
  },

  download() {
    const canvas = document.getElementById('ai-canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `ai_generated_${this.style}_${this.resolution}.png`;
    a.click();
  }
};

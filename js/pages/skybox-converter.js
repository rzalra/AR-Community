/* ========================================
   AR COMMUNITY — Skybox Converter
   ======================================== */

const SkyboxConverterPage = {
  sourceImage: null,
  faces: null,

  faceNames: ['Front', 'Back', 'Left', 'Right', 'Top', 'Bottom'],

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Skybox Converter</span>
            </div>
            <div class="tool-page-header">
              <h1>🌌 Skybox Converter</h1>
              <p>Konversi gambar panorama menjadi skybox 6-sisi untuk Roblox dan game engine lainnya</p>
            </div>

            <div class="tool-section">
              <h3>📂 Upload Gambar Panorama</h3>
              <div style="border:2px dashed var(--color-border); border-radius:var(--radius-md); padding:var(--space-8); text-align:center; cursor:pointer;" onclick="document.getElementById('skybox-file-input').click()">
                <input type="file" id="skybox-file-input" accept="image/*" style="display:none" onchange="SkyboxConverterPage.loadImage(this.files[0])">
                <div style="font-size:2rem; margin-bottom:var(--space-2);">🖼️</div>
                <p style="font-size:0.78rem; color:var(--color-text-secondary);">Klik untuk upload gambar panorama (equirectangular atau wide image)</p>
              </div>
            </div>

            ${this.sourceImage ? `
              <div class="tool-section">
                <h3>📐 Preview Source</h3>
                <div style="text-align:center;">
                  <img src="${this.sourceImage}" style="max-width:100%; max-height:200px; border-radius:var(--radius-sm); border:1px solid var(--color-border);">
                </div>
              </div>
            ` : ''}

            ${this.faces ? `
              <div class="tool-section">
                <h3>🎲 Skybox Faces (6 Sisi)</h3>
                <div class="skybox-grid">
                  ${this.faceNames.map((name, i) => `
                    <div class="skybox-face">
                      <canvas id="skybox-face-${i}" width="256" height="256"></canvas>
                      <span class="face-label">${name}</span>
                    </div>
                  `).join('')}
                </div>
                <div style="display:flex; gap:var(--space-2); margin-top:var(--space-4); flex-wrap:wrap;">
                  ${this.faceNames.map((name, i) => `
                    <button class="btn btn-ghost btn-sm" onclick="SkyboxConverterPage.downloadFace(${i})">💾 ${name}</button>
                  `).join('')}
                  <button class="btn btn-primary btn-sm" onclick="SkyboxConverterPage.downloadAll()">📦 Download Semua</button>
                </div>
              </div>

              <div class="tool-section">
                <h3>📋 Roblox Skybox Script</h3>
                <div class="code-output" id="skybox-script">-- Upload semua face ke Roblox sebagai Decal, lalu gunakan script ini:
local sky = Instance.new("Sky")
sky.SkyboxBk = "rbxassetid://YOUR_BACK_ID"
sky.SkyboxDn = "rbxassetid://YOUR_BOTTOM_ID"
sky.SkyboxFt = "rbxassetid://YOUR_FRONT_ID"
sky.SkyboxLf = "rbxassetid://YOUR_LEFT_ID"
sky.SkyboxRt = "rbxassetid://YOUR_RIGHT_ID"
sky.SkyboxUp = "rbxassetid://YOUR_TOP_ID"
sky.Parent = game.Lighting</div>
                <button class="btn btn-ghost btn-sm" style="margin-top:var(--space-2);" onclick="navigator.clipboard.writeText(document.getElementById('skybox-script').textContent)">📋 Copy Script</button>
              </div>
            ` : ''}
          </div>
        </section>
      </div>
    `;

    if (this.faces) this.renderFaces();
  },

  loadImage(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.sourceImage = e.target.result;
      const img = new Image();
      img.onload = () => {
        this.convertToSkybox(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  convertToSkybox(img) {
    // Split panorama into 6 faces using simple equirectangular slicing
    const faceSize = 256;
    this.faces = [];

    // For a simple panorama, we divide width into sections
    const w = img.width;
    const h = img.height;

    // Create 6 faces by sampling different regions
    const regions = [
      { sx: 0,         sy: 0,   sw: w/4, sh: h },   // Front
      { sx: w/2,       sy: 0,   sw: w/4, sh: h },   // Back
      { sx: 3*w/4,     sy: 0,   sw: w/4, sh: h },   // Left
      { sx: w/4,       sy: 0,   sw: w/4, sh: h },   // Right
      { sx: w/8,       sy: 0,   sw: w/4, sh: h/3 }, // Top
      { sx: w/8,       sy: 2*h/3, sw: w/4, sh: h/3 } // Bottom
    ];

    regions.forEach(r => {
      const canvas = document.createElement('canvas');
      canvas.width = faceSize;
      canvas.height = faceSize;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, r.sx, r.sy, r.sw, r.sh, 0, 0, faceSize, faceSize);
      this.faces.push(canvas.toDataURL('image/png'));
    });

    this.render();
  },

  renderFaces() {
    this.faceNames.forEach((name, i) => {
      const canvas = document.getElementById(`skybox-face-${i}`);
      if (!canvas || !this.faces[i]) return;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, 256, 256);
      img.src = this.faces[i];
    });
  },

  downloadFace(index) {
    if (!this.faces || !this.faces[index]) return;
    const a = document.createElement('a');
    a.href = this.faces[index];
    a.download = `skybox_${this.faceNames[index].toLowerCase()}.png`;
    a.click();
  },

  downloadAll() {
    if (!this.faces) return;
    this.faceNames.forEach((name, i) => {
      setTimeout(() => this.downloadFace(i), i * 300);
    });
  }
};

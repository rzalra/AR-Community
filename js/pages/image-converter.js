/* ========================================
   AR COMMUNITY — Image Converter Page
   ======================================== */

const ImageConverterPage = {
  files: [], // Array of objects: { file, id, originalName, originalSize, originalMime, convertedUrl, convertedName, status, progress }
  targetFormat: 'webp',
  quality: 0.85,
  isProcessing: false,

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${this.renderBreadcrumbs()}
            ${this.renderHeader()}
            
            <div class="tool-content-card" style="background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6);">
              <div style="max-width: 800px; margin: 0 auto;">
                
                <!-- Parameter Configurations -->
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:20px;">
                  <div>
                    <label style="font-size:0.62rem; font-weight:bold; color:var(--color-text-secondary); text-transform:uppercase; display:block; margin-bottom:6px; letter-spacing:0.05em;">Format Target</label>
                    <select id="img-target-format" class="form-input" style="padding:10px; font-size:0.75rem; border-radius:8px; background:var(--color-bg-secondary);" onchange="ImageConverterPage.setTargetFormat(this.value)">
                      <option value="webp" ${this.targetFormat === 'webp' ? 'selected' : ''}>WEBP (Sangat Ringan - Rekomendasi)</option>
                      <option value="png" ${this.targetFormat === 'png' ? 'selected' : ''}>PNG (Lossless - Transparansi Terjaga)</option>
                      <option value="jpeg" ${this.targetFormat === 'jpeg' ? 'selected' : ''}>JPG / JPEG (Standard Compressed)</option>
                    </select>
                  </div>
                  <div>
                    <label style="font-size:0.62rem; font-weight:bold; color:var(--color-text-secondary); text-transform:uppercase; display:block; margin-bottom:6px; letter-spacing:0.05em;">Kualitas Kompresi: <span id="img-quality-val" style="color:var(--color-accent-cyan); font-weight:bold;">${Math.round(this.quality * 100)}%</span></label>
                    <input type="range" class="range-slider-red" id="img-quality-slider" min="10" max="100" value="${this.quality * 100}" 
                      ${this.targetFormat === 'png' ? 'disabled style="opacity:0.4;"' : ''} 
                      oninput="ImageConverterPage.setQuality(this.value)">
                  </div>
                </div>

                <!-- Drag & Drop Zone -->
                <div style="border:2px dashed var(--color-border); border-radius:10px; padding:32px 16px; text-align:center; background:rgba(255,255,255,0.01); cursor:pointer; transition:all 0.2s; margin-bottom:20px;" 
                  ondragover="event.preventDefault()" 
                  ondrop="ImageConverterPage.handleDrop(event)" 
                  onclick="document.getElementById('img-bulk-input').click()">
                  <span style="font-size:2.5rem; display:block; margin-bottom:8px;">🖼️</span>
                  <span style="font-size:0.78rem; font-weight:bold; color:white;">Pilih File Gambar</span>
                  <span style="font-size:0.62rem; color:var(--color-text-muted); display:block; margin-top:4px;">Klik atau seret beberapa file gambar di sini (PNG, JPG, WEBP, GIF, dll)</span>
                  <input type="file" id="img-bulk-input" style="display:none;" multiple accept="image/*" onchange="ImageConverterPage.handleFiles(this.files)">
                </div>

                <!-- Action Button Toolbar -->
                ${this.files.length > 0 ? `
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; gap:12px;">
                    <div style="font-size:0.7rem; color:var(--color-text-muted);">
                      Total: <strong>${this.files.length}</strong> file gambar terunggah.
                    </div>
                    <div style="display:flex; gap:8px;">
                      <button onclick="ImageConverterPage.clearAll()" class="btn btn-ghost btn-sm" style="border-radius:6px;" ${this.isProcessing ? 'disabled' : ''}>🧹 Bersihkan</button>
                      <button onclick="ImageConverterPage.downloadAll()" class="btn btn-secondary btn-sm" style="border-radius:6px;" ${this.files.some(f => f.convertedUrl) ? '' : 'disabled'}>📥 Unduh Semua</button>
                      <button onclick="ImageConverterPage.convertAll()" class="btn btn-primary btn-sm" style="border-radius:6px; font-weight:bold;" ${this.isProcessing ? 'disabled' : ''}>
                        ${this.isProcessing ? '⏳ Memproses...' : '⚡ KONVERSI SEKARANG'}
                      </button>
                    </div>
                  </div>
                ` : ''}

                <!-- File Queue Table -->
                ${this.files.length > 0 ? `
                  <div style="overflow-x:auto; background:rgba(0,0,0,0.1); border:1px solid var(--color-border); border-radius:8px;">
                    <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.72rem; color:var(--color-text-secondary);">
                      <thead>
                        <tr style="border-bottom:1px solid var(--color-border); background:rgba(255,255,255,0.02);">
                          <th style="padding:12px 16px; width:64px;">Preview</th>
                          <th style="padding:12px 16px;">Nama File</th>
                          <th style="padding:12px 16px; width:100px;">Format Asal</th>
                          <th style="padding:12px 16px; width:100px;">Ukuran</th>
                          <th style="padding:12px 16px; width:120px;">Status</th>
                          <th style="padding:12px 16px; width:100px; text-align:right;">Hasil</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.files.map(f => this.renderRow(f)).join('')}
                      </tbody>
                    </table>
                  </div>
                ` : `
                  <div style="text-align:center; padding:40px; color:var(--color-text-muted); font-size:0.75rem; border:1px dashed var(--color-border); border-radius:8px;">
                    Daftar antrian file masih kosong. Silakan seret beberapa file gambar di atas.
                  </div>
                `}
                
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  renderRow(f) {
    const statusColors = {
      'queued': 'var(--color-text-muted)',
      'processing': 'var(--color-accent-cyan)',
      'done': 'var(--color-accent-green)',
      'error': 'var(--color-accent-red)'
    };
    
    const statusLabels = {
      'queued': '⏳ Antri',
      'processing': '⏳ Mengonversi...',
      'done': '✓ Selesai',
      'error': '❌ Gagal'
    };

    return `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.03); hover:background:rgba(255,255,255,0.01);">
        <td style="padding:8px 16px;">
          <img src="${URL.createObjectURL(f.file)}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; border:1px solid var(--color-border); background:#111;">
        </td>
        <td style="padding:8px 16px; word-break:break-all; font-weight:bold; color:white;">
          ${f.originalName}
        </td>
        <td style="padding:8px 16px; text-transform:uppercase; font-family:monospace;">
          ${f.originalMime.split('/')[1] || 'Unknown'}
        </td>
        <td style="padding:8px 16px; font-family:monospace;">
          ${(f.originalSize / 1024).toFixed(1)} KB
        </td>
        <td style="padding:8px 16px; font-weight:bold; color:${statusColors[f.status] || 'white'};">
          ${statusLabels[f.status] || f.status}
        </td>
        <td style="padding:8px 16px; text-align:right;">
          ${f.convertedUrl ? `
            <a href="${f.convertedUrl}" download="${f.convertedName}" class="btn btn-ghost btn-xs" style="border-radius:4px; font-weight:bold; font-size:0.6rem; padding:4px 8px; display:inline-flex; align-items:center; gap:4px; color:var(--color-accent-green); border-color:var(--color-accent-green);">
              📥 Unduh
            </a>
          ` : '-'}
        </td>
      </tr>
    `;
  },

  renderBreadcrumbs() {
    return `
      <div class="tool-breadcrumbs" style="display: flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-size: 0.65rem; color: var(--color-text-muted); margin-bottom: var(--space-4); letter-spacing: var(--letter-spacing-wider);">
        <a href="#/home">🏠 HOME</a>
        <span>&gt;</span>
        <a href="#/tools">TOOLS</a>
        <span>&gt;</span>
        <span class="active">IMAGE CONVERTER</span>
      </div>
    `;
  },

  renderHeader() {
    return `
      <div class="tool-header" style="margin-bottom: var(--space-6); display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-full); margin-bottom: var(--space-3);">
            <span style="font-size: 0.7rem; color: var(--color-accent-red); font-weight: bold; letter-spacing: 0.05em;">🖼️ ASSET UTILITY</span>
          </div>
          <h1 style="font-size: var(--text-4xl); font-weight: var(--font-weight-black); margin-bottom: var(--space-2); line-height: 1.1;">
            Image <span class="text-gradient" style="background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Converter</span>
          </h1>
          <p style="color: var(--color-text-secondary); font-size: var(--text-sm); line-height: var(--line-height-relaxed);">
            Ubah format gambar secara massal langsung di peramban secara aman dan offline tanpa upload data ke server luar.
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="window.showToolGuide('image-converter')" style="border-radius: 8px; margin-top: 12px; font-weight: bold; flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;">
          💻 Panduan & Tips
        </button>
      </div>
    `;
  },

  setTargetFormat(format) {
    this.targetFormat = format;
    this.render();
  },

  setQuality(val) {
    this.quality = parseFloat(val) / 100;
    const txt = document.getElementById('img-quality-val');
    if (txt) txt.innerText = val + '%';
  },

  handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      this.handleFiles(e.dataTransfer.files);
    }
  },

  handleFiles(fileList) {
    Array.from(fileList).forEach(file => {
      // Prevent duplicates
      if (this.files.some(f => f.file.name === file.name && f.file.size === file.size)) return;
      
      this.files.push({
        file,
        id: Date.now() + Math.random(),
        originalName: file.name,
        originalSize: file.size,
        originalMime: file.type,
        convertedUrl: null,
        convertedName: '',
        status: 'queued',
        progress: 0
      });
    });
    this.render();
  },

  clearAll() {
    this.files.forEach(f => {
      if (f.convertedUrl) URL.revokeObjectURL(f.convertedUrl);
    });
    this.files = [];
    this.isProcessing = false;
    this.render();
  },

  downloadAll() {
    this.files.forEach(f => {
      if (f.convertedUrl) {
        const a = document.createElement('a');
        a.href = f.convertedUrl;
        a.download = f.convertedName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    });
  },

  async convertAll() {
    if (this.files.length === 0 || this.isProcessing) return;

    this.isProcessing = true;
    this.render();

    for (let f of this.files) {
      if (f.status === 'done') continue; // Skip already converted

      f.status = 'processing';
      this.render();

      try {
        const convertedBlob = await this.processFile(f.file, this.targetFormat, this.quality);
        f.convertedUrl = URL.createObjectURL(convertedBlob);
        
        // Formulate target name
        const cleanName = f.originalName.replace(/\.[^/.]+$/, '');
        f.convertedName = `${cleanName}.${this.targetFormat}`;
        f.status = 'done';
      } catch (err) {
        console.error(err);
        f.status = 'error';
      }

      this.render();
    }

    this.isProcessing = false;
    this.render();
  },

  processFile(file, format, quality) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        let mimeType = 'image/png';
        if (format === 'jpeg' || format === 'jpg') {
          mimeType = 'image/jpeg';
        } else if (format === 'webp') {
          mimeType = 'image/webp';
        }

        canvas.toBlob((blob) => {
          URL.revokeObjectURL(img.src); // cleanup
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Canvas conversion returned null blob.'));
          }
        }, mimeType, quality);
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error('Gagal memuat file gambar ke memori.'));
      };
    });
  }
};

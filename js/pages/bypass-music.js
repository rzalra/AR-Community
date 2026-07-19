/* ========================================
   AR COMMUNITY — Bypass Music Copyright Page
   ======================================== */

const BypassMusicPage = {
  speedFactor: 2.3,
  amplification: -6, // dB
  files: [],
  selectedPreset: 'ekstrem',
  channelMode: 'stereo', // 'stereo' or 'mono'
  advancedExpanded: false,
  isProcessing: false,

  // Roblox Upload states
  robloxAccounts: [],
  robloxAddActive: false,
  robloxAssetId: null,
  robloxUploadStatus: '',
  robloxIsUploading: false,

  presets: {
    lambat: 0.92,
    default: 1.1,
    cepat: 1.25,
    lebih_cepat: 1.4,
    ultra: 1.6,
    brutal: 2.0,
    ekstrem: 2.3,
    maksimal: 2.5
  },

  render() {
    // Load Roblox Accounts
    try {
      this.robloxAccounts = JSON.parse(localStorage.getItem('roblox_accounts')) || [];
    } catch (e) {
      this.robloxAccounts = [];
    }

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="bypass-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${this.renderBreadcrumbs()}
            ${this.renderHeader()}
            ${this.renderStatusBanner()}
            
            <div class="bypass-layout">
              <!-- Left Column: Controls -->
              <div class="bypass-controls-col">
                ${this.renderPresetsCard()}
                ${this.renderAdvancedCard()}
                <div id="roblox-card-container">
                  ${this.renderRobloxCard()}
                </div>
              </div>
              
              <!-- Right Column: Drag & Drop / File list -->
              <div class="bypass-files-col">
                ${this.renderDropZoneCard()}
                <div id="file-queue-container"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    this.bindEvents();
    this.updateQueueUI();
  },

  renderBreadcrumbs() {
    return `
      <div class="bypass-breadcrumbs" style="display: flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-size: 0.65rem; color: var(--color-text-muted); margin-bottom: var(--space-4); letter-spacing: var(--letter-spacing-wider);">
        <a href="#/home" style="color: var(--color-text-muted); text-decoration: none;">🏠 HOME</a>
        <span>&gt;</span>
        <a href="#/tools" style="color: var(--color-text-muted); text-decoration: none;">TOOLS</a>
        <span>&gt;</span>
        <span style="color: var(--color-accent-red)">BYPASS MUSIC COPYRIGHT</span>
      </div>
    `;
  },

  renderHeader() {
    return `
      <div class="bypass-header" style="margin-bottom: var(--space-6);">
        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-full); margin-bottom: var(--space-3);">
          <span style="font-size: 0.7rem; color: var(--color-accent-red); font-weight: bold; letter-spacing: 0.05em;">🎵 ASSET TOOL</span>
        </div>
        <h1 style="font-size: var(--text-4xl); font-weight: var(--font-weight-black); margin-bottom: var(--space-2); line-height: 1.1;">
          Bypass <span class="text-gradient" style="background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Music Copyright</span>
        </h1>
        <p style="color: var(--color-text-secondary); font-size: var(--text-sm); line-height: var(--line-height-relaxed);">
          Metode Speed atau Pitch, upload langsung ke Roblox, auto-split, dan Command Bar script otomatis.
        </p>
      </div>
    `;
  },

  renderStatusBanner() {
    return `
      <div class="status-banner" style="display: flex; align-items: center; padding: var(--space-3) var(--space-4); background: rgba(34, 197, 94, 0.06); border: 1px solid rgba(34, 197, 94, 0.15); border-radius: var(--radius-md); color: var(--color-accent-green); font-size: var(--text-xs); font-family: var(--font-body); font-weight: 500; margin-bottom: var(--space-6);">
        <span style="margin-right: 6px;">✓</span> Akun Premium aktif. Export unlimited, gratis.
      </div>
    `;
  },

  renderPresetsCard() {
    const isPresetSelected = (name) => this.selectedPreset === name ? 'active' : '';
    const playbackSpeedValue = (1 / this.speedFactor).toFixed(4);

    return `
      <div class="bypass-card" style="background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--text-sm); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-wide); margin-bottom: var(--space-1);">Preset Kecepatan</h3>
        <p style="font-size: 0.72rem; color: var(--color-text-muted); line-height: 1.4; margin-bottom: var(--space-4);">
          Makin tinggi makin lolos, tapi makin "berubah" suaranya. Lagu terkenal butuh preset tinggi (Brutal/Ekstrem). PlaybackSpeed di game otomatis dihitung biar tempo balik normal.
        </p>
        
        <div class="preset-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: var(--space-4);">
          <button class="preset-btn ${isPresetSelected('lambat')}" data-preset="lambat">
            <span class="preset-name">Lambat</span>
            <span class="preset-value">x0.92</span>
          </button>
          <button class="preset-btn ${isPresetSelected('default')}" data-preset="default">
            <span class="preset-name">Default</span>
            <span class="preset-value">x1.1</span>
          </button>
          
          <button class="preset-btn ${isPresetSelected('cepat')}" data-preset="cepat">
            <span class="preset-name">Cepat</span>
            <span class="preset-value">x1.25</span>
          </button>
          <button class="preset-btn ${isPresetSelected('lebih_cepat')}" data-preset="lebih_cepat">
            <span class="preset-name">Lebih Cepat</span>
            <span class="preset-value">x1.4</span>
          </button>
          
          <button class="preset-btn ${isPresetSelected('ultra')}" data-preset="ultra">
            <span class="preset-name">Ultra</span>
            <span class="preset-value">x1.6</span>
          </button>
          <button class="preset-btn ${isPresetSelected('brutal')}" data-preset="brutal">
            <span class="preset-name">Brutal</span>
            <span class="preset-value">x2</span>
          </button>
          
          <button class="preset-btn ${isPresetSelected('ekstrem')}" data-preset="ekstrem">
            <span class="preset-name">Ekstrem</span>
            <span class="preset-value">x2.3</span>
          </button>
          <button class="preset-btn ${isPresetSelected('maksimal')}" data-preset="maksimal">
            <span class="preset-name">Maksimal</span>
            <span class="preset-value">x2.5</span>
          </button>
        </div>
        
        <!-- Custom Speed Range -->
        <div style="margin-bottom: var(--space-4);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
            <span style="font-size: 0.75rem; color: var(--color-text-secondary); font-weight: 500;">Atur sendiri</span>
            <span id="custom-speed-val" style="font-size: 0.75rem; font-family: var(--font-heading); color: var(--color-accent-red); font-weight: bold;">x${this.speedFactor.toFixed(2)}</span>
          </div>
          <input type="range" id="speed-slider" class="range-slider-red" min="1.0" max="2.5" step="0.05" value="${this.speedFactor}">
          <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--color-text-muted); margin-top: 4px;">
            <span>x1.0</span>
            <span>x2.5</span>
          </div>
        </div>

        <!-- Amplification Range -->
        <div style="margin-bottom: var(--space-5);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
            <span style="font-size: 0.75rem; color: var(--color-text-secondary); font-weight: 500;">Amplifikasi (dB)</span>
            <span id="amplification-val" style="font-size: 0.75rem; font-family: var(--font-heading); color: var(--color-accent-red); font-weight: bold;">${this.amplification > 0 ? '+' + this.amplification : this.amplification} dB</span>
          </div>
          <input type="range" id="amp-slider" class="range-slider-red" min="-6" max="6" step="1" value="${this.amplification}">
          <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--color-text-muted); margin-top: 4px;">
            <span>-6 dB</span>
            <span>+6 dB</span>
          </div>
        </div>

        <!-- Calculated Output PlaybackSpeed Game -->
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.75rem; color: var(--color-text-secondary);">PlaybackSpeed game:</span>
          <span id="game-playback-speed" style="font-family: var(--font-heading); font-size: 0.8rem; font-weight: bold; color: var(--color-accent-red); letter-spacing: 0.05em;">${playbackSpeedValue}</span>
        </div>
      </div>
    `;
  },

  renderAdvancedCard() {
    const displayStyle = this.advancedExpanded ? 'block' : 'none';
    const toggleIcon = this.advancedExpanded ? '−' : '+';

    return `
      <div class="bypass-card advanced-settings-card" style="background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); margin-bottom: var(--space-4);">
        <div id="advanced-toggle" style="display: flex; align-items: center; justify-content: space-between; padding: var(--space-4) var(--space-5); cursor: pointer; user-select: none;">
          <h3 style="font-size: var(--text-sm); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-wide); margin: 0;">Advanced Settings</h3>
          <span id="advanced-toggle-icon" style="font-family: var(--font-heading); font-weight: bold; color: var(--color-text-muted);">${toggleIcon}</span>
        </div>
        
        <div id="advanced-content" style="padding: 0 var(--space-5) var(--space-5) var(--space-5); display: ${displayStyle}; border-top: 1px solid rgba(255,255,255,0.02);">
          <div class="form-group" style="margin-top: 12px; margin-bottom: 12px;">
            <label class="form-label" style="font-size: 0.65rem;">Channel Mode</label>
            <div style="display: flex; gap: 8px; margin-top: 4px;">
              <button class="channel-btn ${this.channelMode === 'stereo' ? 'active' : ''}" data-channel="stereo" style="flex: 1; padding: 8px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--color-text-secondary); text-align: center;">Stereo</button>
              <button class="channel-btn ${this.channelMode === 'mono' ? 'active' : ''}" data-channel="mono" style="flex: 1; padding: 8px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--color-text-secondary); text-align: center;">Mono (Setengah Ukuran)</button>
            </div>
            <p style="font-size: 0.65rem; color: var(--color-text-muted); margin-top: 4px; line-height: 1.3;">
              Ekspor dalam mode Mono akan mengurangi ukuran file audio hingga 50%, berguna untuk menghindari batas upload Roblox sebesar 20MB.
            </p>
          </div>
          
          <div class="form-group">
            <label class="form-label" style="font-size: 0.65rem;">Bypass Method</label>
            <select id="bypass-method-select" style="width: 100%; padding: 8px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--color-text-primary); background: var(--color-bg-secondary); margin-top: 4px;">
              <option value="speed-pitch">Standard Speed-up (Resample - Direkomendasikan)</option>
              <option value="pitch-only" disabled>Pitch Shift saja (Segera hadir)</option>
            </select>
          </div>
        </div>
      </div>
    `;
  },

  renderRobloxCard() {
    if (this.robloxAddActive) {
      return `
        <div class="bypass-card" style="background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-4); animation: fadeIn 300ms ease;">
          <h3 style="font-size: var(--text-sm); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-wide); margin-bottom: var(--space-3);">Tambah Akun Roblox</h3>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div class="form-group">
              <label class="form-label" style="font-size: 0.62rem;">Nama Akun / Label</label>
              <input type="text" id="roblox-acc-name" class="form-input" placeholder="contoh: Akun Utama" style="font-size: 0.72rem; padding: 8px 10px;">
            </div>
            
            <div class="form-group">
              <label class="form-label" style="font-size: 0.62rem;">Tipe Akun</label>
              <select id="roblox-acc-isgroup" style="width: 100%; padding: 8px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--color-text-primary); background: var(--color-bg-secondary);">
                <option value="false">PERSONAL</option>
                <option value="true">GROUP</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size: 0.62rem;">Roblox User/Group ID (Wajib Angka)</label>
              <input type="text" id="roblox-acc-userid" class="form-input" placeholder="contoh: 12345678" style="font-size: 0.72rem; padding: 8px 10px;">
            </div>

            <div class="form-group">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <label class="form-label" style="font-size: 0.62rem;">API Key Open Cloud</label>
                <a href="https://create.roblox.com/dashboard/credentials" target="_blank" style="font-size: 0.62rem; color: var(--color-accent-cyan);">Dapatkan Key →</a>
              </div>
              <input type="password" id="roblox-api-key" class="form-input" placeholder="roblox_api_key_..." style="font-size: 0.72rem; padding: 8px 10px; font-family: monospace;">
              <p style="font-size: 0.6rem; color: var(--color-text-muted); line-height: 1.3; margin: 0;">
                API Key membutuhkan izin scope <strong>asset:write</strong> untuk mengunggah file musik ke Roblox.
              </p>
            </div>
            
            <div style="display: flex; gap: 8px; margin-top: 4px;">
              <button id="btn-roblox-cancel" class="btn btn-ghost btn-sm" style="flex: 1; border-radius: var(--radius-sm);">Batal</button>
              <button id="btn-roblox-save" class="btn btn-primary btn-sm" style="flex: 2; border-radius: var(--radius-sm);">Simpan Akun</button>
            </div>
          </div>
        </div>
      `;
    }

    if (this.robloxAccounts.length === 0) {
      return `
        <div class="bypass-card" style="background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-4);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
            <h3 style="font-size: var(--text-sm); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-wide); margin: 0;">Upload ke Roblox</h3>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); cursor: help;" title="Integrasi akun Roblox memungkinkan upload otomatis menggunakan API Key.">❓</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px dashed var(--color-border); border-radius: var(--radius-md); padding: var(--space-6); text-align: center; background: rgba(0, 0, 0, 0.15);">
            <p style="font-size: 0.7rem; color: var(--color-text-muted); margin-bottom: var(--space-4);">Belum ada akun Roblox tersimpan.</p>
            <button id="btn-roblox-add" class="btn btn-secondary btn-sm" style="font-size: 0.65rem; border-radius: var(--radius-sm);">
              + Tambah Akun Roblox
            </button>
          </div>
        </div>
      `;
    }

    // Has accounts
    const hasBypassedFile = this.files.some(f => f.status === 'done');
    const uploadBtnDisabled = (!hasBypassedFile || this.robloxIsUploading) ? 'disabled' : '';
    const activeFile = this.files.find(f => f.status === 'done');
    const defaultAssetName = activeFile ? `Bypassed ${activeFile.name.replace(/\.[^/.]+$/, '')}` : '';

    let statusMarkup = '';
    if (this.robloxIsUploading) {
      statusMarkup = `
        <div style="margin-top: 12px; padding: 10px; background: rgba(0, 240, 255, 0.05); border: 1px solid rgba(0, 240, 255, 0.15); border-radius: var(--radius-md); font-family: monospace; font-size: 0.65rem; color: var(--color-accent-cyan);">
          <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 6px;">
            <div class="loader-spinner" style="width: 12px; height: 12px; border: 2px solid var(--color-border); border-top-color: var(--color-accent-cyan); border-radius: 50%; animation: rotate 1s linear infinite;"></div>
            <span>Roblox Cloud Uploader:</span>
          </div>
          <div style="line-height: 1.4; color: var(--color-text-secondary); max-height: 80px; overflow-y: auto;">
            ${this.robloxUploadStatus.split('\n').map(line => `&gt; ${line}`).join('<br>')}
          </div>
        </div>
      `;
    } else if (this.robloxAssetId) {
      statusMarkup = `
        <div style="margin-top: 12px; padding: var(--space-4); background: rgba(34, 197, 94, 0.05); border: 1px solid rgba(34, 197, 94, 0.15); border-radius: var(--radius-md); text-align: center; animation: fadeIn 300ms ease;">
          <span style="font-size: 1.5rem; display:block; margin-bottom:6px;">🚀</span>
          <h4 style="font-size: 0.75rem; color: var(--color-accent-green); margin-bottom: 4px; font-weight:bold;">Upload Roblox Sukses!</h4>
          <p style="font-size: 0.65rem; color: var(--color-text-secondary); margin-bottom: 10px;">Asset Sound ID Anda telah terbit.</p>
          
          <div style="display: flex; gap: 6px; align-items: center; background: rgba(0,0,0,0.3); padding: 6px 10px; border-radius: var(--radius-sm); margin-bottom: 10px;">
            <span style="font-size:0.65rem; color: var(--color-text-muted); font-family:monospace;">Sound ID:</span>
            <span style="font-size: 0.72rem; color: var(--color-accent-cyan); font-family:var(--font-heading); font-weight:bold; flex:1; text-align:left;">${this.robloxAssetId}</span>
            <button onclick="navigator.clipboard.writeText('${this.robloxAssetId}'); alert('Sound ID disalin!')" style="font-size: 0.65rem; color: var(--color-accent-cyan); cursor:pointer;">📋 Salin</button>
          </div>
        </div>
      `;
    }

    return `
      <div class="bypass-card" style="background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-4);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
          <h3 style="font-size: var(--text-sm); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-wide); margin: 0;">Upload ke Roblox</h3>
          <button id="btn-roblox-add-another" style="font-size: 0.65rem; color: var(--color-accent-cyan); border:none; background:none; cursor:pointer;">+ Tambah Akun</button>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div class="form-group">
            <label class="form-label" style="font-size: 0.62rem;">Pilih Akun</label>
            <select id="roblox-acc-select" style="width: 100%; padding: 8px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--color-text-primary); background: var(--color-bg-secondary);">
              ${this.robloxAccounts.map((acc, index) => `<option value="${index}">${acc.name} (${acc.userId || 'No ID'}) - ${acc.isGroup ? 'GROUP' : 'PERSONAL'}</option>`).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label" style="font-size: 0.62rem;">Nama Asset Roblox</label>
            <input type="text" id="roblox-asset-name" class="form-input" placeholder="Audio Bypassed" value="${defaultAssetName}" style="font-size: 0.72rem; padding: 8px 10px;">
          </div>
          
          <button id="btn-roblox-upload" class="btn btn-primary btn-sm" style="width: 100%; border-radius: var(--radius-sm); padding: 10px;" ${uploadBtnDisabled}>
            ⚡ UPLOAD KE ROBLOX
          </button>
          
          ${!hasBypassedFile ? `<p style="font-size: 0.62rem; color: var(--color-accent-red); margin: 0; text-align: center;">* Harap lakukan bypass lagu terlebih dahulu agar bisa diupload.</p>` : ''}
          
          ${statusMarkup}
        </div>
      </div>
    `;
  },

  renderDropZoneCard() {
    return `
      <div id="drop-zone" class="drag-drop-zone" style="border: 2px dashed var(--color-border); border-radius: var(--radius-lg); padding: var(--space-12) var(--space-6); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-bg-card); transition: all var(--transition-base); text-align: center; cursor: pointer; margin-bottom: var(--space-6); position: relative;">
        <span style="font-size: 3.5rem; margin-bottom: var(--space-4); display: block; filter: drop-shadow(0 0 10px rgba(255,255,255,0.1));">🎵</span>
        <h4 style="font-size: var(--text-base); font-weight: var(--font-weight-bold); margin-bottom: 6px; letter-spacing: 0.02em;">Drag & drop lagu di sini</h4>
        <p style="font-size: 0.72rem; color: var(--color-text-muted); margin-bottom: var(--space-6);">
          bisa banyak sekaligus • MP3 • WAV • OGG • FLAC • AAC • M4A
        </p>
        <button class="btn btn-primary btn-sm" id="btn-select-file" style="border-radius: var(--radius-full); padding: var(--space-2) var(--space-8); font-size: var(--text-xs);">
          Pilih File
        </button>
        <input type="file" id="file-input" accept="audio/*" multiple style="display: none;">
      </div>
    `;
  },

  bindEvents() {
    const presetBtns = document.querySelectorAll('.preset-btn');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const presetName = btn.getAttribute('data-preset');
        const factor = this.presets[presetName];
        this.selectedPreset = presetName;
        this.speedFactor = factor;

        // Update range slider and UI
        document.getElementById('speed-slider').value = factor;
        this.updateSpeedUI();
      });
    });

    const speedSlider = document.getElementById('speed-slider');
    speedSlider.addEventListener('input', (e) => {
      this.speedFactor = parseFloat(e.target.value);
      this.selectedPreset = 'custom';
      this.updateSpeedUI();
    });

    const ampSlider = document.getElementById('amp-slider');
    ampSlider.addEventListener('input', (e) => {
      this.amplification = parseInt(e.target.value);
      document.getElementById('amplification-val').innerText = `${this.amplification > 0 ? '+' + this.amplification : this.amplification} dB`;
    });

    // Toggle Advanced Settings
    const advToggle = document.getElementById('advanced-toggle');
    advToggle.addEventListener('click', () => {
      this.advancedExpanded = !this.advancedExpanded;
      const content = document.getElementById('advanced-content');
      const icon = document.getElementById('advanced-toggle-icon');
      if (this.advancedExpanded) {
        content.style.display = 'block';
        icon.innerText = '−';
      } else {
        content.style.display = 'none';
        icon.innerText = '+';
      }
    });

    // Channel Modes Selection
    const chanBtns = document.querySelectorAll('.channel-btn');
    chanBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        chanBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.channelMode = btn.getAttribute('data-channel');
      });
    });

    // File Input selection
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const btnSelectFile = document.getElementById('btn-select-file');

    btnSelectFile.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });

    dropZone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      this.addFiles(e.target.files);
    });

    // Drag and Drop listeners
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--color-accent-cyan)';
      dropZone.style.background = 'var(--color-bg-card-hover)';
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.style.borderColor = 'var(--color-border)';
      dropZone.style.background = 'var(--color-bg-card)';
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.style.borderColor = 'var(--color-border)';
      dropZone.style.background = 'var(--color-bg-card)';
      if (e.dataTransfer.files.length > 0) {
        this.addFiles(e.dataTransfer.files);
      }
    });

    // Bind Roblox actions
    this.bindRobloxEvents();
  },

  bindRobloxEvents() {
    const btnAdd = document.getElementById('btn-roblox-add');
    if (btnAdd) {
      btnAdd.addEventListener('click', (e) => {
        e.stopPropagation();
        this.robloxAddActive = true;
        this.updateRobloxCard();
      });
    }

    const btnAddAnother = document.getElementById('btn-roblox-add-another');
    if (btnAddAnother) {
      btnAddAnother.addEventListener('click', (e) => {
        e.stopPropagation();
        this.robloxAddActive = true;
        this.updateRobloxCard();
      });
    }

    const btnCancel = document.getElementById('btn-roblox-cancel');
    if (btnCancel) {
      btnCancel.addEventListener('click', (e) => {
        e.stopPropagation();
        this.robloxAddActive = false;
        this.updateRobloxCard();
      });
    }

    const btnSave = document.getElementById('btn-roblox-save');
    if (btnSave) {
      btnSave.addEventListener('click', (e) => {
        e.stopPropagation();
        const nameInput = document.getElementById('roblox-acc-name');
        const isGroupInput = document.getElementById('roblox-acc-isgroup');
        const userIdInput = document.getElementById('roblox-acc-userid');
        const apiKeyInput = document.getElementById('roblox-api-key');
        if (!nameInput || !apiKeyInput || !userIdInput) return;

        const name = nameInput.value.trim();
        const userId = userIdInput.value.trim();
        const apiKey = apiKeyInput.value.trim();
        const isGroup = isGroupInput ? isGroupInput.value === 'true' : false;

        if (!name || !userId || !apiKey) {
          alert('Harap isi Nama Akun, Roblox ID, dan API Key.');
          return;
        }

        if (!/^\d+$/.test(userId)) {
          alert('Roblox ID harus berupa angka (numeric).');
          return;
        }

        this.robloxAccounts.push({ name, userId, apiKey, isGroup });
        localStorage.setItem('roblox_accounts', JSON.stringify(this.robloxAccounts));

        this.robloxAddActive = false;
        this.updateRobloxCard();
      });
    }

    const btnUpload = document.getElementById('btn-roblox-upload');
    if (btnUpload) {
      btnUpload.addEventListener('click', (e) => {
        e.stopPropagation();
        this.uploadRobloxAsset();
      });
    }
  },

  updateRobloxCard() {
    const container = document.getElementById('roblox-card-container');
    if (container) {
      container.innerHTML = this.renderRobloxCard();
      this.bindRobloxEvents();
    }
  },

  async uploadRobloxAsset() {
    const fileItem = this.files.find(f => f.status === 'done');
    if (!fileItem) {
      alert('Silakan lakukan bypass pada lagu terlebih dahulu.');
      return;
    }

    const nameInput = document.getElementById('roblox-asset-name');
    const assetName = nameInput ? nameInput.value.trim() : `Bypassed ${fileItem.name.replace(/\.[^/.]+$/, '')}`;
    
    // Select active account
    const selectAcc = document.getElementById('roblox-acc-select');
    const activeAcc = this.robloxAccounts[selectAcc ? parseInt(selectAcc.value) : 0];
    if (!activeAcc) {
      alert('Detail akun Roblox tidak ditemukan.');
      return;
    }

    // Backwards compatibility or fallback for missing userId
    let userId = activeAcc.userId;
    if (!userId) {
      if (/^\d+$/.test(activeAcc.name)) {
        userId = activeAcc.name;
        activeAcc.userId = userId;
      } else {
        const inputId = prompt(`Akun '${activeAcc.name}' tidak memiliki User/Group ID numerik yang valid. Harap masukkan Roblox User ID (atau Group ID jika grup) untuk akun ini:`);
        if (!inputId || !/^\d+$/.test(inputId.trim())) {
          alert("User/Group ID tidak valid. Proses unggah dibatalkan.");
          return;
        }
        userId = inputId.trim();
        activeAcc.userId = userId;
        localStorage.setItem('roblox_accounts', JSON.stringify(this.robloxAccounts));
      }
    }

    this.robloxIsUploading = true;
    this.robloxUploadStatus = 'Menginisialisasi unggahan ke Roblox Open Cloud...';
    this.robloxAssetId = null;
    this.updateRobloxCard();

    try {
      this.robloxUploadStatus += '\nMembaca file data lagu hasil bypass...';
      this.updateRobloxCard();

      // Retrieve blob: check fileItem.blob first, or fetch from fileItem.downloadUrl
      let wavBlob = fileItem.blob;
      if (!wavBlob && fileItem.downloadUrl) {
        this.robloxUploadStatus += '\nMengambil data biner dari URL lokal...';
        this.updateRobloxCard();
        const blobRes = await fetch(fileItem.downloadUrl);
        wavBlob = await blobRes.blob();
      }

      if (!wavBlob) {
        throw new Error('Data biner audio tidak ditemukan. Silakan bypass ulang file.');
      }

      const fileSizeMB = wavBlob.size / 1048576;
      // Vercel Hobby serverless request payload limit is 4.5MB. Keep a safety margin at 4.2MB.
      const useBackend = fileSizeMB < 4.2;

      this.robloxUploadStatus += `\nMetadata terdeteksi: Tipe=Audio, Nama="${assetName}", Kepemilikan=${activeAcc.isGroup ? 'Group ID' : 'User ID'} ${userId}`;
      this.robloxUploadStatus += `\nUkuran berkas: ${fileSizeMB.toFixed(2)} MB (${useBackend ? 'Unggah via Backend Proxy Vercel' : 'Unggah langsung via Browser - Butuh Ekstensi CORS'})`;
      this.robloxUploadStatus += `\nMengirim payload multipart form-data...`;
      this.updateRobloxCard();

      // Build metadata request JSON
      const metadata = {
        assetType: 'Audio',
        displayName: assetName,
        description: 'Uploaded via AR Community Music Bypasser',
        creationContext: {
          creator: {}
        }
      };

      if (activeAcc.isGroup) {
        metadata.creationContext.creator.groupId = userId;
      } else {
        metadata.creationContext.creator.userId = userId;
      }

      const formData = new FormData();
      formData.append('request', JSON.stringify(metadata));
      formData.append('fileContent', wavBlob, `${assetName}.wav`);

      let response;
      let targetUrl;
      let headers = {};

      if (useBackend) {
        targetUrl = '/api/upload-asset';
        headers['x-api-key'] = activeAcc.apiKey;
      } else {
        targetUrl = 'https://apis.roblox.com/assets/v1/assets';
        headers['x-api-key'] = activeAcc.apiKey;
      }

      this.robloxUploadStatus += `\nMenghubungkan ke ${targetUrl}...`;
      this.updateRobloxCard();

      try {
        response = await fetch(targetUrl, {
          method: 'POST',
          headers: headers,
          body: formData
        });
      } catch (fetchErr) {
        console.error('Fetch error:', fetchErr);
        if (useBackend) {
          this.robloxUploadStatus += `\n\n⚠️ KONEKSI BACKEND PROXY GAGAL: ${fetchErr.message}`;
          this.robloxUploadStatus += '\nMencoba beralih ke Unggah langsung via Browser...';
          this.updateRobloxCard();
          // Fallback to direct upload
          targetUrl = 'https://apis.roblox.com/assets/v1/assets';
          this.robloxUploadStatus += `\nMenghubungkan ke ${targetUrl}...`;
          this.updateRobloxCard();
          try {
            response = await fetch(targetUrl, {
              method: 'POST',
              headers: { 'x-api-key': activeAcc.apiKey },
              body: formData
            });
          } catch (directErr) {
            console.error('Direct fetch error:', directErr);
            this.robloxUploadStatus += '\n\n⚠️ KONEKSI GAGAL ATAU DI-BLOCK CORS!';
            this.robloxUploadStatus += '\nUntuk mengunggah file langsung ke Roblox dari browser, Anda harus memasang ekstensi CORS di browser Anda.';
            this.robloxUploadStatus += '\n\n👉 Silakan pasang ekstensi Chrome/Edge seperti "Allow CORS: Access-Control-Allow-Origin", aktifkan ekstensi tersebut, lalu ulangi proses unggah.';
            this.robloxIsUploading = false;
            this.updateRobloxCard();
            return;
          }
        } else {
          this.robloxUploadStatus += '\n\n⚠️ KONEKSI GAGAL ATAU DI-BLOCK CORS!';
          this.robloxUploadStatus += '\nUntuk mengunggah file langsung ke Roblox dari browser, Anda harus memasang ekstensi CORS di browser Anda.';
          this.robloxUploadStatus += '\n\n👉 Silakan pasang ekstensi Chrome/Edge seperti "Allow CORS: Access-Control-Allow-Origin", aktifkan ekstensi tersebut, lalu ulangi proses unggah.';
          this.robloxIsUploading = false;
          this.updateRobloxCard();
          return;
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        let errorMsg = errorText;
        try {
          const errJson = JSON.parse(errorText);
          errorMsg = errJson.message || (errJson.errors && errJson.errors[0]?.message) || errorText;
        } catch (e) {}

        this.robloxUploadStatus += `\n\n❌ ERROR API (${response.status}): ${errorMsg}`;
        if (response.status === 413 && useBackend) {
          this.robloxUploadStatus += '\n\n💡 Batas ukuran request backend Vercel terlampaui. Sistem akan otomatis beralih menggunakan upload langsung via browser. Pastikan Anda mengaktifkan ekstensi CORS di browser.';
        } else if (response.status === 403) {
          this.robloxUploadStatus += '\n\n💡 Tips: Pastikan API Key Anda memiliki izin scope "assets" (asset:write) dan setelan IP Address diijinkan untuk IP publik Anda (atau diisi 0.0.0.0/0).';
        }
        this.robloxIsUploading = false;
        this.updateRobloxCard();
        return;
      }

      const data = await response.json();
      const operationPath = data.path;
      if (!operationPath) {
        throw new Error('API tidak mengembalikan jalur operasi (operation path) yang valid.');
      }

      this.robloxUploadStatus += `\nUnggahan terkirim! (Operasi: ${operationPath})`;
      this.robloxUploadStatus += '\nMenunggu proses pemrosesan & moderasi dari pihak Roblox...';
      this.updateRobloxCard();

      // Poll operation status
      let done = false;
      let attempts = 0;
      const maxAttempts = 30; // 60 seconds max

      while (!done && attempts < maxAttempts) {
        await new Promise(res => setTimeout(res, 2000));
        attempts++;
        this.robloxUploadStatus += `\nMemeriksa status pemrosesan (Percobaan #${attempts})...`;
        this.updateRobloxCard();

        let pollUrl;
        let pollHeaders = {};
        if (useBackend) {
          pollUrl = `/api/poll-operation?path=${encodeURIComponent(operationPath)}`;
          pollHeaders['x-api-key'] = activeAcc.apiKey;
        } else {
          pollUrl = `https://apis.roblox.com/assets/v1/${operationPath}`;
          pollHeaders['x-api-key'] = activeAcc.apiKey;
        }

        try {
          const pollRes = await fetch(pollUrl, {
            headers: pollHeaders
          });

          if (!pollRes.ok) {
            this.robloxUploadStatus += `\nGagal memeriksa status (HTTP ${pollRes.status})`;
            this.updateRobloxCard();
            continue;
          }

          const pollData = await pollRes.json();
          if (pollData.done) {
            done = true;
            if (pollData.error) {
              this.robloxUploadStatus += `\n\n❌ PEMROSESAN GAGAL: ${pollData.error.message}`;
              this.robloxIsUploading = false;
              this.updateRobloxCard();
              return;
            }

            const assetObj = pollData.response;
            const assetId = assetObj.assetId || (assetObj.path && assetObj.path.split('/')[1]);
            if (assetId) {
              this.robloxAssetId = assetId;
              fileItem.robloxAssetId = assetId;
              this.robloxIsUploading = false;
              this.robloxUploadStatus += `\n\n🎉 SUKSES BESAR! Sound ID: ${assetId}`;
              this.updateRobloxCard();
              this.updateQueueUI(); // refresh queue
              return;
            } else {
              this.robloxUploadStatus += '\nSelesai, namun Sound ID tidak tertera di dalam response.';
              this.robloxIsUploading = false;
              this.updateRobloxCard();
              return;
            }
          }
        } catch (pollErr) {
          console.error('Polling error:', pollErr);
          this.robloxUploadStatus += `\nKoneksi terganggu saat polling: ${pollErr.message}`;
          this.updateRobloxCard();
        }
      }

      if (!done) {
        this.robloxUploadStatus += '\n\n⌛ Waktu tunggu habis. File sedang diproses di latar belakang oleh Roblox. Silakan cek berkala Roblox Creator Dashboard Anda.';
        this.robloxIsUploading = false;
        this.updateRobloxCard();
      }

    } catch (err) {
      console.error(err);
      this.robloxIsUploading = false;
      this.robloxUploadStatus += `\nError: ${err.message}`;
      this.updateRobloxCard();
    }
  },

  updateSpeedUI() {
    // Redraw active preset button styling
    const presetBtns = document.querySelectorAll('.preset-btn');
    presetBtns.forEach(btn => {
      const presetName = btn.getAttribute('data-preset');
      if (this.selectedPreset === presetName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update value displays
    document.getElementById('custom-speed-val').innerText = `x${this.speedFactor.toFixed(2)}`;
    const playbackSpeedValue = (1 / this.speedFactor).toFixed(4);
    document.getElementById('game-playback-speed').innerText = playbackSpeedValue;

    // Update active asset name in Roblox Upload Form if list changes
    const selectAcc = document.getElementById('roblox-acc-select');
    if (selectAcc) {
      this.updateRobloxCard();
    }
  },

  addFiles(fileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // Prevent duplicate files by checking file name and size
      if (this.files.some(f => f.name === file.name && f.size === file.size)) {
        continue;
      }

      const fileId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);
      this.files.push({
        id: fileId,
        file: file,
        name: file.name,
        size: file.size,
        duration: 0, // determined when decoded
        status: 'loaded',
        originalBuffer: null,
        processedBuffer: null,
        downloadUrl: null,
        playbackSpeed: 1.0,
        robloxAssetId: null
      });
    }

    this.updateQueueUI();
    this.updateRobloxCard();
  },

  removeFile(id) {
    const index = this.files.findIndex(f => f.id === id);
    if (index !== -1) {
      const f = this.files[index];
      if (f.downloadUrl) {
        URL.revokeObjectURL(f.downloadUrl);
      }
      this.files.splice(index, 1);
    }
    this.updateQueueUI();
    this.updateRobloxCard();
  },

  updateQueueUI() {
    const container = document.getElementById('file-queue-container');
    if (!container) return;

    if (this.files.length === 0) {
      container.innerHTML = '';
      return;
    }

    const formatSize = (bytes) => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(1) + ' MB';
    };

    const fileListHtml = this.files.map(fileItem => {
      let statusMarkup = '';
      let playDownloadMarkup = '';

      if (fileItem.status === 'loaded') {
        statusMarkup = `<span style="font-size: 0.72rem; color: var(--color-text-muted);">Siap diproses</span>`;
      } else if (fileItem.status === 'processing') {
        statusMarkup = `
          <div style="display: flex; align-items: center; gap: 8px;">
            <div class="loader-spinner" style="width: 14px; height: 14px; border: 2px solid var(--color-border); border-top-color: var(--color-accent-cyan); border-radius: 50%; animation: rotate 1s linear infinite;"></div>
            <span style="font-size: 0.72rem; color: var(--color-accent-cyan);">Memproses audio...</span>
          </div>
        `;
      } else if (fileItem.status === 'done') {
        statusMarkup = `<span style="font-size: 0.72rem; color: var(--color-accent-green);">Bypass Selesai</span>`;

        const assetIdStr = fileItem.robloxAssetId ? fileItem.robloxAssetId.toString() : '[MASUKKAN_ID]';
        const copyScriptFn = `BypassMusicPage.copyRobloxScript('${(1 / fileItem.playbackSpeed).toFixed(4)}', '${fileItem.name}', '${assetIdStr}')`;

        playDownloadMarkup = `
          <div class="processed-file-controls" style="margin-top: 12px; padding: 12px; background: rgba(255, 255, 255, 0.01); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.65rem; color: var(--color-text-muted);">Pratinjau Hasil Sped-up:</span>
              <span style="font-size: 0.65rem; color: var(--color-accent-cyan); cursor: pointer;" onclick="${copyScriptFn}" title="Salin Script Command Bar untuk Roblox Studio">📋 Salin Script Roblox</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
              <audio src="${fileItem.downloadUrl}" controls style="flex: 1; height: 32px; filter: invert(0.9) hue-rotate(180deg); outline: none;"></audio>
              <a href="${fileItem.downloadUrl}" download="bypassed_${fileItem.name.replace(/\.[^/.]+$/, '')}.wav" class="btn btn-primary btn-sm" style="border-radius: var(--radius-sm); padding: 8px 12px; font-size: 0.65rem;">
                📥 Download
              </a>
            </div>
            <div style="margin-top: 8px; font-family: monospace; font-size: 0.65rem; color: var(--color-accent-purple); padding: 6px 8px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); word-break: break-all;">
              -- Script: tempel di Command Bar Roblox Studio<br>
              local s = Instance.new("Sound", workspace); s.SoundId = "rbxassetid://${assetIdStr}"; s.PlaybackSpeed = ${(1 / fileItem.playbackSpeed).toFixed(4)}; s:Play()
            </div>
          </div>
        `;
      } else if (fileItem.status === 'error') {
        statusMarkup = `<span style="font-size: 0.72rem; color: var(--color-accent-red);">Gagal memproses</span>`;
      }

      return `
        <div class="file-queue-item" data-id="${fileItem.id}" style="background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4); margin-bottom: 12px; transition: border-color var(--transition-base);">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
              <div style="font-size: 1.5rem; flex-shrink: 0;">🎵</div>
              <div style="min-width: 0;">
                <h4 style="font-size: var(--text-sm); font-weight: var(--font-weight-semibold); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px;" title="${fileItem.name}">${fileItem.name}</h4>
                <div style="display: flex; gap: 12px; align-items: center;">
                  <span style="font-size: 0.72rem; color: var(--color-text-muted);">${formatSize(fileItem.size)}</span>
                  ${statusMarkup}
                </div>
              </div>
            </div>
            
            <button class="remove-file-btn" onclick="BypassMusicPage.removeFile('${fileItem.id}')" style="color: var(--color-text-muted); font-size: 1rem; padding: 4px; cursor: pointer; transition: color 150ms;">
              ✕
            </button>
          </div>
          ${playDownloadMarkup}
        </div>
      `;
    }).join('');

    const actionPanelHtml = `
      <div class="queue-actions-panel" style="display: flex; gap: 12px; margin-top: var(--space-5);">
        <button class="btn btn-ghost" onclick="BypassMusicPage.clearQueue()" style="flex: 1; border-radius: var(--radius-md);">
          🗑️ Bersihkan Daftar
        </button>
        <button class="btn btn-primary" onclick="BypassMusicPage.processQueue()" style="flex: 2; border-radius: var(--radius-md);" id="btn-process-queue">
          ⚡ BYPASS SEKARANG (${this.files.length} Lagu)
        </button>
      </div>
    `;

    container.innerHTML = `
      <div style="margin-top: var(--space-4);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: var(--text-sm); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-wide); margin: 0;">File Yang Dipilih</h3>
          <span style="font-size: 0.72rem; color: var(--color-text-muted);">Total: ${this.files.length} file</span>
        </div>
        
        <div class="file-list-scroll" style="max-height: 400px; overflow-y: auto; padding-right: 4px;">
          ${fileListHtml}
        </div>
        
        ${actionPanelHtml}
      </div>
    `;

    // Adjust processing button status if queue is processing
    const processBtn = document.getElementById('btn-process-queue');
    if (this.isProcessing && processBtn) {
      processBtn.disabled = true;
      processBtn.innerHTML = '⏳ Sedang Memproses...';
    }
  },

  clearQueue() {
    this.files.forEach(f => {
      if (f.downloadUrl) URL.revokeObjectURL(f.downloadUrl);
    });
    this.files = [];
    this.updateQueueUI();
    this.updateRobloxCard();
  },

  async processQueue() {
    if (this.isProcessing || this.files.length === 0) return;

    this.isProcessing = true;
    this.updateQueueUI();

    // Context for decoding
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    for (let i = 0; i < this.files.length; i++) {
      const fileItem = this.files[i];
      if (fileItem.status === 'done') continue; // skip already processed files

      fileItem.status = 'processing';
      this.updateQueueUI();

      try {
        await this.processSingleFile(fileItem, audioCtx);
        fileItem.status = 'done';
      } catch (err) {
        console.error('Error processing audio file: ' + fileItem.name, err);
        fileItem.status = 'error';
      }
      this.updateQueueUI();
    }

    audioCtx.close();
    this.isProcessing = false;
    this.updateQueueUI();
    this.updateRobloxCard(); // enable roblox upload button after bypass
  },

  async processSingleFile(fileItem, audioCtx) {
    const arrayBuffer = await fileItem.file.arrayBuffer();
    const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    // Apply speed factor
    const speed = this.speedFactor;
    fileItem.playbackSpeed = speed;

    const numChannels = this.channelMode === 'mono' ? 1 : decodedBuffer.numberOfChannels;
    const sampleRate = decodedBuffer.sampleRate;

    // Calculate new length based on speed factor
    const newLength = Math.floor(decodedBuffer.length / speed);

    // Create OfflineAudioContext
    const offlineCtx = new OfflineAudioContext(numChannels, newLength, sampleRate);

    // Source Node
    const source = offlineCtx.createBufferSource();
    source.buffer = decodedBuffer;
    source.playbackRate.value = speed;

    // Gain Node (Amplification)
    const gainNode = offlineCtx.createGain();
    const ampDb = this.amplification;
    gainNode.gain.value = Math.pow(10, ampDb / 20); // convert dB to linear gain value

    // Connection chain
    source.connect(gainNode);
    gainNode.connect(offlineCtx.destination);

    // Play source in offline context
    source.start(0);

    // Render the processed buffer
    const renderedBuffer = await offlineCtx.startRendering();

    // Encode to WAV format
    const wavBlob = this.bufferToWav(renderedBuffer);

    // Revoke old URL if exists
    if (fileItem.downloadUrl) {
      URL.revokeObjectURL(fileItem.downloadUrl);
    }

    fileItem.downloadUrl = URL.createObjectURL(wavBlob);
    fileItem.blob = wavBlob;
    fileItem.duration = renderedBuffer.duration;
  },

  bufferToWav(buffer) {
    const numOfChan = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // 1 = raw 16-bit signed PCM
    const bitDepth = 16;

    let result;
    if (numOfChan === 2) {
      result = this.interleave(buffer.getChannelData(0), buffer.getChannelData(1));
    } else {
      result = buffer.getChannelData(0);
    }

    const bufferLength = result.length * 2; // 2 bytes per sample (16-bit)
    const fileLength = bufferLength + 44;
    const arrayBuffer = new ArrayBuffer(fileLength);
    const view = new DataView(arrayBuffer);

    /* RIFF identifier */
    this.writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 36 + bufferLength, true);
    /* RIFF type */
    this.writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    this.writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, format, true);
    /* channel count */
    view.setUint16(22, numOfChan, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * numOfChan * (bitDepth / 8), true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, numOfChan * (bitDepth / 8), true);
    /* bits per sample */
    view.setUint16(34, bitDepth, true);
    /* data chunk identifier */
    this.writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, bufferLength, true);

    // Write audio samples PCM 16-bit
    this.floatTo16BitPCM(view, 44, result);

    return new Blob([view], { type: 'audio/wav' });
  },

  interleave(inputL, inputR) {
    const length = inputL.length + inputR.length;
    const result = new Float32Array(length);
    let index = 0;
    let inputIndex = 0;

    while (index < length) {
      result[index++] = inputL[inputIndex];
      result[index++] = inputR[inputIndex];
      inputIndex++;
    }
    return result;
  },

  floatTo16BitPCM(output, offset, input) {
    for (let i = 0; i < input.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  },

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  },

  copyRobloxScript(playbackSpeed, name, assetId = '[MASUKKAN_ID]') {
    const scriptText = `local s = Instance.new("Sound", workspace); s.SoundId = "rbxassetid://${assetId}"; s.PlaybackSpeed = ${playbackSpeed}; s:Play()`;
    navigator.clipboard.writeText(scriptText).then(() => {
      alert(`Script Roblox untuk lagu "${name}" disalin ke clipboard! Tempelkan di Roblox Studio Command Bar.`);
    }).catch(err => {
      console.error('Failed to copy text', err);
      // Fallback
      const tempTextArea = document.createElement('textarea');
      tempTextArea.value = scriptText;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      alert(`Script Roblox untuk lagu "${name}" disalin ke clipboard!`);
    });
  }
};

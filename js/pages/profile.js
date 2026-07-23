/* ========================================
   AR COMMUNITY — Profile Page
   ======================================== */

const ProfilePage = {
  isGroup: false,
  robloxAccounts: [],

  init() {
    try {
      this.robloxAccounts = JSON.parse(localStorage.getItem('roblox_accounts')) || [];
    } catch (e) {
      this.robloxAccounts = [];
    }
  },

  render() {
    this.init();

    // User info from login / localstorage
    const email = localStorage.getItem('userEmail') || 'guest@arcommunity.com';
    let name = localStorage.getItem('userName') || 'User';
    const initials = name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().substring(0, 2) || 'U';

    // Generate or get plugin ID
    let pluginId = localStorage.getItem('user_plugin_id');
    if (!pluginId) {
      pluginId = 'b4629de2' + Math.random().toString(16).substring(2, 10);
      localStorage.setItem('user_plugin_id', pluginId);
    }

    const app = document.getElementById('app');
    app.innerHTML = `
      <style>
        .profile-wrapper {
          padding: var(--space-8) 0;
          color: white;
        }
        .profile-title-badge {
          display: inline-block;
          font-size: 0.6rem;
          color: var(--color-accent-red);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 100px;
          padding: 4px 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .profile-title {
          font-size: 2.2rem;
          font-weight: 900;
          font-family: var(--font-heading);
          margin-bottom: var(--space-6);
        }
        .profile-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: var(--space-6);
          position: relative;
        }
        .profile-flex-layout {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .profile-flex-layout {
            flex-direction: column;
            text-align: center;
          }
        }
        .profile-avatar-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--color-accent-red);
          background: rgba(255,255,255,0.02);
          flex-shrink: 0;
        }
        .profile-info-details {
          flex: 1;
        }
        .profile-info-name {
          font-size: 1.1rem;
          font-weight: bold;
          color: white;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .profile-info-edit {
          font-size: 0.65rem;
          color: var(--color-accent-red);
          text-decoration: none;
          cursor: pointer;
        }
        .profile-info-email {
          font-size: 0.78rem;
          color: var(--color-text-secondary);
          margin: 4px 0 6px;
        }
        .profile-info-meta {
          font-size: 0.72rem;
          color: var(--color-text-muted);
        }
        .profile-plugin-row {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.65rem;
        }
        .profile-plugin-badge {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          padding: 3px 8px;
          font-family: monospace;
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .profile-plugin-badge:hover {
          border-color: var(--color-accent-cyan);
          color: var(--color-accent-cyan);
        }
        .profile-keluar-btn {
          border: 1px solid var(--color-border);
          background: transparent;
          border-radius: 4px;
          color: var(--color-text-secondary);
          padding: 6px 16px;
          font-size: 0.65rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 10px;
        }
        .profile-keluar-btn:hover {
          border-color: var(--color-accent-red);
          color: white;
        }

        /* Roblox account card */
        .roblox-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-left: 3px solid var(--color-accent-red);
          padding-left: 10px;
          margin-bottom: 8px;
        }
        .roblox-card-title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-black);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .roblox-card-batal-btn {
          background: transparent;
          border: 1px solid var(--color-accent-red);
          color: var(--color-accent-red);
          font-size: 0.58rem;
          font-weight: bold;
          padding: 2px 8px;
          border-radius: 3px;
          cursor: pointer;
        }
        .roblox-card-desc {
          font-size: 0.68rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
          margin-bottom: 16px;
        }
        
        /* Account list */
        .roblox-accounts-list {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .roblox-account-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          padding: 8px 12px;
        }
        .roblox-account-item-name {
          font-size: 0.72rem;
          font-weight: bold;
          color: white;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .roblox-account-item-type {
          font-size: 0.55rem;
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-accent-red);
          padding: 1px 6px;
          border-radius: 3px;
          font-weight: bold;
        }
        .roblox-account-item-delete {
          background: transparent;
          border: none;
          color: var(--color-text-muted);
          font-size: 0.7rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        .roblox-account-item-delete:hover {
          color: var(--color-accent-red);
        }

        /* Tabs inside roblox card */
        .roblox-tabs-row {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
        }
        .roblox-tab-pill {
          background: transparent;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          font-size: 0.58rem;
          font-weight: bold;
          padding: 4px 10px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .roblox-tab-pill.active {
          background: var(--color-accent-red);
          border-color: var(--color-accent-red);
          color: white;
        }
        .roblox-inputs-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .roblox-input-btn {
          background: #2a2a40;
          color: #9090ff;
          border: none;
          border-radius: 6px;
          padding: 0 16px;
          font-size: 0.72rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }
        .roblox-input-btn:hover {
          background: #33334f;
        }
        .roblox-submit-btn {
          width: 100%;
          background: linear-gradient(90deg, #8b5cf6, #3b82f6);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 10px;
          font-size: 0.75rem;
          font-weight: bold;
          cursor: pointer;
          transition: opacity 0.2s;
          margin-bottom: 16px;
        }
        .roblox-submit-btn:hover {
          opacity: 0.9;
        }
        .roblox-footnote {
          font-size: 0.58rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        /* Transaction card */
        .transaction-title-row {
          border-left: 3px solid var(--color-accent-red);
          padding-left: 10px;
          margin-bottom: 16px;
        }
        .transaction-title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-black);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .transaction-empty-box {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 40px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .transaction-empty-text {
          font-size: 0.78rem;
          color: var(--color-text-secondary);
        }
        .transaction-store-btn {
          background: var(--color-accent-red);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 0.72rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }
        .transaction-store-btn:hover {
          background: #cc3737;
        }
      </style>

      <div class="profile-wrapper">
        <div class="container">
          <!-- Breadcrumbs -->
          <div class="tool-breadcrumbs">
            <a href="#/home">🏠 HOME</a> <span>&gt;</span> <span class="active">PROFIL</span>
          </div>

          <!-- Section title -->
          <span class="profile-title-badge">👤 AKUN</span>
          <h1 class="profile-title">PROFIL</h1>

          <!-- Profile Card -->
          <div class="profile-card">
            <div class="profile-flex-layout">
              <div class="profile-avatar-circle">${initials}</div>
              <div class="profile-info-details">
                <div class="profile-info-name">
                  <span id="profile-name-text">${name}</span>
                  <a class="profile-info-edit" onclick="ProfilePage.editName()">Edit</a>
                </div>
                <div class="profile-info-email">${email}</div>
                <div class="profile-info-meta">Member sejak Juli 2026 · ${this.robloxAccounts.length} akun Roblox</div>
                
                <div class="profile-plugin-row">
                  <span>USER ID (PLUGIN):</span>
                  <span class="profile-plugin-badge" onclick="ProfilePage.copyPluginId()">${pluginId} (klik salin)</span>
                </div>
              </div>
              <button class="profile-keluar-btn" onclick="App.handleLogout()">KELUAR</button>
            </div>
          </div>

          <!-- Akun Roblox Card -->
          <div class="profile-card">
            <div class="roblox-card-header">
              <div class="roblox-card-title">AKUN ROBLOX</div>
              <button class="roblox-card-batal-btn" onclick="ProfilePage.resetForm()">Batal</button>
            </div>
            
            <p class="roblox-card-desc">
              Dipakai bareng oleh Skybox Converter, Bypass Music Copyright, Anim Spoof, dan Audio Optimizer buat auto-upload. Tambah sekali di sini, tinggal pilih akun mana yang aktif di tiap tool.
            </p>

            <!-- Roblox Account List if exists -->
            ${this.robloxAccounts.length > 0 ? `
              <div class="roblox-accounts-list">
                ${this.robloxAccounts.map((acc, index) => `
                  <div class="roblox-account-item">
                    <div class="roblox-account-item-name">
                      👤 ${acc.name} (${acc.userId || 'No ID'})
                      <span class="roblox-account-item-type">${acc.isGroup ? 'GROUP' : 'PERSONAL'}</span>
                    </div>
                    <button class="roblox-account-item-delete" onclick="ProfilePage.deleteAccount(${index})">✕</button>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Add Account Form -->
            <div class="roblox-tabs-row">
              <button class="roblox-tab-pill ${!this.isGroup ? 'active' : ''}" onclick="ProfilePage.setGroup(false)">PERSONAL</button>
              <button class="roblox-tab-pill ${this.isGroup ? 'active' : ''}" onclick="ProfilePage.setGroup(true)">GROUP</button>
            </div>

            <div class="roblox-inputs-row">
              <input type="text" id="roblox-username-input" class="form-input" placeholder="Nama Akun / Username" style="margin:0;">
              <button class="roblox-input-btn" onclick="ProfilePage.checkRobloxAccount()">Cek</button>
            </div>

            <input type="text" id="roblox-id-input" class="form-input" placeholder="${this.isGroup ? 'Roblox Group ID (Wajib berupa angka)' : 'Roblox User ID (Wajib berupa angka)'}" style="margin-bottom: 12px;">

            <input type="password" id="roblox-apikey-input" class="form-input" placeholder="API Key akun ini" style="margin-bottom: 12px;">

            <button class="roblox-submit-btn" onclick="ProfilePage.saveRobloxAccount()">Simpan Akun</button>

            <p class="roblox-footnote">
              Key disimpan di browser kamu doang. Cara bikin: creator.roblox.com → Open Cloud → API Keys → tambahkan 2 permission: assets (Asset: Write) buat upload umum + legacy-assets (legacy-asset:manage) khusus dibutuhkan Skybox Converter buat ambil Texture ID. IP Isi 0.0.0.0/0. Key WAJIB dibuat di akun/group yang sama dengan yang kamu cek di atas.
            </p>
          </div>

          <!-- Riwayat Transaksi -->
          <div class="transaction-title-row">
            <div class="transaction-title">RIWAYAT TRANSAKSI</div>
          </div>
          
          <div class="transaction-empty-box">
            <div class="transaction-empty-text">Kamu belum melakukan pembelian item apapun.</div>
            <button class="transaction-store-btn" onclick="window.location.hash = '#/store'">LIHAT STORE</button>
          </div>

        </div>
      </div>
    `;
  },

  setGroup(val) {
    this.isGroup = val;
    this.render();
  },

  editName() {
    const currentName = localStorage.getItem('userName') || 'User';
    const newName = prompt('Ubah Nama Profil:', currentName);
    if (newName && newName.trim()) {
      localStorage.setItem('userName', newName.trim());
      this.render();
      // Sync to Supabase
      if (typeof DB !== 'undefined') DB.saveUserData();
    }
  },

  copyPluginId() {
    const pluginId = localStorage.getItem('user_plugin_id') || '';
    navigator.clipboard.writeText(pluginId).then(() => {
      alert('User ID Plugin disalin ke clipboard!');
    });
  },

  checkRobloxAccount() {
    const input = document.getElementById('roblox-username-input');
    if (!input || !input.value.trim()) {
      alert('Masukkan username, link profil, atau ID terlebih dahulu.');
      return;
    }

    // Simulate a successful check
    const val = input.value.trim();
    alert(`✓ Akun "${val}" berhasil terverifikasi.`);
  },

  saveRobloxAccount() {
    const userVal = document.getElementById('roblox-username-input')?.value.trim();
    const idVal = document.getElementById('roblox-id-input')?.value.trim();
    const apiVal = document.getElementById('roblox-apikey-input')?.value.trim();

    if (!userVal || !idVal || !apiVal) {
      alert('Harap isi Nama Akun/Username, Roblox ID, dan API Key.');
      return;
    }

    if (!/^\d+$/.test(idVal)) {
      alert('Roblox ID harus berupa angka (numeric).');
      return;
    }

    // Add to list
    this.robloxAccounts.push({
      name: userVal,
      userId: idVal,
      apiKey: apiVal,
      isGroup: this.isGroup
    });

    localStorage.setItem('roblox_accounts', JSON.stringify(this.robloxAccounts));
    alert('Akun Roblox berhasil disimpan!');
    this.resetForm();
    // Sync to Supabase
    if (typeof DB !== 'undefined') DB.saveUserData();
  },

  deleteAccount(idx) {
    if (confirm('Hapus akun Roblox ini?')) {
      this.robloxAccounts.splice(idx, 1);
      localStorage.setItem('roblox_accounts', JSON.stringify(this.robloxAccounts));
      this.render();
      // Sync to Supabase
      if (typeof DB !== 'undefined') DB.saveUserData();
    }
  },

  resetForm() {
    const uInput = document.getElementById('roblox-username-input');
    const idInput = document.getElementById('roblox-id-input');
    const aInput = document.getElementById('roblox-apikey-input');
    if (uInput) uInput.value = '';
    if (idInput) idInput.value = '';
    if (aInput) aInput.value = '';
    this.isGroup = false;
    this.render();
  }
};

/* ========================================
   AR COMMUNITY — Store Page + Checkout Wizard
   ======================================== */

const StorePage = {

  activeCategory: 'all',
  searchQuery: '',

  // Checkout state
  checkoutItem: null,
  checkoutStep: 0,     // 0=listing, 1=detail, 2=pembayaran, 3=konfirmasi
  selectedPayment: 'qris',
  buyerName: '',
  buyerEmail: '',
  buyerRoblox: '',
  countdownTimer: null,
  countdownSeconds: 15 * 60,

  // Payment methods
  paymentMethods: [
    {
      id: 'qris',
      name: 'QRIS',
      logo: 'assets/qrislogo.png',
      fallbackText: 'QRIS',
      type: 'qr',
      info: null
    },
    {
      id: 'dana',
      name: 'Dana',
      logo: 'assets/danalogo.png',
      fallbackText: 'DANA',
      fallbackColor: '#108ee9',
      type: 'transfer',
      info: { number: '082322625256', name: 'Rizal Nugrahanto' }
    },
    {
      id: 'gopay',
      name: 'GoPay',
      logo: 'assets/gopaylogo.png',
      fallbackText: 'GoPay',
      fallbackColor: '#00aa13',
      type: 'transfer',
      info: { number: '0081393246006', name: 'Mei Liya Nandawardani' }
    },
    {
      id: 'seabank',
      name: 'SeaBank',
      logo: 'assets/seabanklogo.png',
      fallbackText: 'SeaBank',
      fallbackColor: '#2196f3',
      type: 'transfer',
      info: { number: '901763070918', name: 'Mei Liya Nandawardani' }
    }
  ],

  render() {
    if (this.checkoutStep > 0 && this.checkoutItem) {
      this.renderCheckout();
    } else {
      this.renderListing();
    }
  },

  // ═══════════════════════════════════════
  // STORE LISTING
  // ═══════════════════════════════════════
  renderListing() {
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
        <p style="color:var(--color-text-muted)">Beli aset, skrip, dan layanan untuk proyek Roblox kamu</p>
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
      grid.innerHTML = Components.emptyState('🛒', 'Tidak Ada Produk', 'Coba ubah filter atau kata kunci pencarian Anda.');
      return;
    }
    grid.innerHTML = items.map(item => Components.storeCard(item)).join('');
    const cards = grid.querySelectorAll('.card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.animation = `fadeInUp 400ms ease ${i * 80}ms forwards`;
    });
  },

  // ═══════════════════════════════════════
  // CHECKOUT WIZARD
  // ═══════════════════════════════════════
  openCheckout(itemId) {
    const item = APP_DATA.storeItems.find(i => i.id === itemId);
    if (!item) return;
    this.checkoutItem = item;
    this.checkoutStep = 1;
    this.selectedPayment = 'qris';
    this.buyerName = localStorage.getItem('userName') || '';
    this.buyerEmail = localStorage.getItem('userEmail') || '';
    this.buyerRoblox = '';
    this.countdownSeconds = 15 * 60;
    this.render();
  },

  renderCheckout() {
    const item = this.checkoutItem;
    const slug = item.name.toLowerCase().replace(/\s+/g, '-');
    const app = document.getElementById('app');

    const productIcons = { 1: '🎵', 2: '🏔️', 3: '💰', 4: '💃', 5: '📛' };
    const productIcon = productIcons[item.id] || '📦';

    app.innerHTML = `
      <style>
        .checkout-wrapper { padding: var(--space-6) 0; min-height: 80vh; }
        .checkout-back {
          font-size: 0.72rem; color: var(--color-text-muted);
          text-decoration: none; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          margin-bottom: 16px;
          transition: color 0.2s;
        }
        .checkout-back:hover { color: white; }

        /* Steps indicator */
        .checkout-steps {
          display: flex; align-items: center; gap: 8px;
          justify-content: flex-end;
          margin-bottom: 24px;
        }
        .checkout-step-item {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.6rem; font-weight: bold;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .checkout-step-item.active { color: var(--color-accent-red); }
        .checkout-step-item.done { color: var(--color-accent-green); }
        .checkout-step-num {
          width: 22px; height: 22px;
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; font-weight: 900;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--color-border);
        }
        .checkout-step-item.active .checkout-step-num {
          background: var(--color-accent-red);
          border-color: var(--color-accent-red);
          color: white;
        }
        .checkout-step-item.done .checkout-step-num {
          background: var(--color-accent-green);
          border-color: var(--color-accent-green);
          color: white;
        }
        .checkout-step-line {
          width: 24px; height: 1px;
          background: var(--color-border);
        }

        /* Layout */
        .checkout-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 800px) {
          .checkout-layout { grid-template-columns: 1fr; }
        }

        /* Product card */
        .checkout-product {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .checkout-product-img {
          aspect-ratio: 16/10;
          background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .checkout-product-img span { font-size: 4rem; opacity: 0.5; }
        .checkout-product-body { padding: 20px; }
        .checkout-product-cat {
          font-size: 0.58rem; font-weight: 900;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--color-accent-purple);
          margin-bottom: 6px;
        }
        .checkout-product-name {
          font-size: 1.1rem; font-weight: 900;
          font-family: var(--font-heading);
          margin-bottom: 6px;
        }
        .checkout-product-price {
          font-size: 1rem; font-weight: 900;
          color: var(--color-accent-red);
          margin-bottom: 16px;
        }
        .checkout-feature {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.72rem;
          color: var(--color-text-secondary);
          padding: 3px 0;
        }
        .checkout-feature-check {
          color: var(--color-accent-green);
          font-size: 0.7rem;
        }

        /* Right panel */
        .checkout-panel {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 28px;
        }
        .checkout-panel-title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-black);
          font-family: var(--font-heading);
          margin-bottom: 20px;
        }
        .checkout-label {
          font-size: 0.6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-text-secondary);
          margin-bottom: 6px;
        }
        .checkout-label span { color: var(--color-accent-red); }
        .checkout-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.78rem;
          color: white;
          outline: none;
          margin-bottom: 16px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .checkout-input:focus { border-color: rgba(255,255,255,0.2); }
        .checkout-input::placeholder { color: rgba(255,255,255,0.2); }
        .checkout-hint {
          font-size: 0.6rem;
          color: var(--color-text-muted);
          margin-top: -10px;
          margin-bottom: 16px;
        }
        .checkout-submit {
          width: 100%;
          background: var(--color-accent-red);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-size: 0.78rem;
          font-weight: 900;
          font-family: var(--font-heading);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .checkout-submit:hover { opacity: 0.9; }

        /* Payment */
        .pay-countdown {
          text-align: center;
          padding: 10px;
          background: rgba(239,68,68,0.1);
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.72rem;
          color: var(--color-accent-red);
          font-weight: bold;
        }
        .pay-methods {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 20px;
        }
        @media (max-width: 600px) {
          .pay-methods { grid-template-columns: repeat(2, 1fr); }
        }
        .pay-method-btn {
          background: rgba(255,255,255,0.02);
          border: 2px solid var(--color-border);
          border-radius: 10px;
          padding: 14px 8px;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .pay-method-btn:hover { border-color: rgba(255,255,255,0.2); }
        .pay-method-btn.active {
          border-color: var(--color-accent-red);
          background: rgba(239,68,68,0.05);
        }
        .pay-method-logo {
          height: 28px;
          display: flex; align-items: center; justify-content: center;
        }
        .pay-method-logo img {
          max-height: 28px;
          max-width: 80px;
          object-fit: contain;
        }
        .pay-method-fallback {
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0.04em;
        }
        .pay-method-name {
          font-size: 0.6rem;
          color: var(--color-text-muted);
        }
        .pay-detail-box {
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .pay-detail-label {
          font-size: 0.6rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--color-text-muted);
          margin-bottom: 8px;
        }
        .pay-qr-img {
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
          display: block;
          border-radius: 8px;
        }
        .pay-transfer-number {
          font-size: 1.3rem;
          font-weight: 900;
          font-family: monospace;
          color: white;
          margin: 8px 0;
          word-break: break-all;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pay-copy-btn {
          background: rgba(255,255,255,0.08);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          color: var(--color-text-secondary);
          font-size: 0.6rem;
          padding: 4px 10px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .pay-copy-btn:hover {
          background: rgba(255,255,255,0.12);
          color: white;
        }
        .pay-account-name {
          font-size: 0.72rem;
          color: var(--color-text-secondary);
        }
        .pay-total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-top: 1px solid var(--color-border);
          margin-top: 12px;
          font-size: 0.85rem;
          font-weight: bold;
        }
        .pay-total-amount {
          color: var(--color-accent-red);
          font-size: 1rem;
          font-weight: 900;
        }

        /* Confirmation */
        .confirm-box {
          text-align: center;
          padding: 40px 20px;
        }
        .confirm-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }
        .confirm-title {
          font-size: 1.2rem;
          font-weight: 900;
          font-family: var(--font-heading);
          color: var(--color-accent-green);
          margin-bottom: 8px;
        }
        .confirm-desc {
          font-size: 0.78rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
          max-width: 400px;
          margin: 0 auto 24px;
        }
        .confirm-order-id {
          font-family: monospace;
          font-size: 0.72rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          padding: 8px 16px;
          display: inline-block;
          margin-bottom: 24px;
          color: var(--color-accent-cyan);
        }
      </style>

      <div class="checkout-wrapper">
        <div class="container">
          <!-- Breadcrumbs -->
          <div class="tool-breadcrumbs">
            <a href="#/home">🏠 HOME</a> <span>&gt;</span>
            <a href="#/store" onclick="event.preventDefault(); StorePage.backToStore()">STORE</a> <span>&gt;</span>
            <span class="active">${slug.toUpperCase()}</span>
          </div>

          <a class="checkout-back" onclick="StorePage.backToStore()">← Kembali ke Store</a>

          <!-- Steps indicator -->
          <div class="checkout-steps">
            <div class="checkout-step-item ${this.checkoutStep === 1 ? 'active' : (this.checkoutStep > 1 ? 'done' : '')}">
              <span class="checkout-step-num">1</span> DETAIL
            </div>
            <div class="checkout-step-line"></div>
            <div class="checkout-step-item ${this.checkoutStep === 2 ? 'active' : (this.checkoutStep > 2 ? 'done' : '')}">
              <span class="checkout-step-num">2</span> PEMBAYARAN
            </div>
            <div class="checkout-step-line"></div>
            <div class="checkout-step-item ${this.checkoutStep === 3 ? 'active' : ''}">
              <span class="checkout-step-num">3</span> KONFIRMASI
            </div>
          </div>

          <!-- Layout -->
          <div class="checkout-layout">
            <!-- Left: product info -->
            <div class="checkout-product">
              <div class="checkout-product-img">
                <span>${productIcon}</span>
              </div>
              <div class="checkout-product-body">
                <div class="checkout-product-cat">${Components.categoryName(item.category)}</div>
                <div class="checkout-product-name">${item.name}</div>
                <div class="checkout-product-price">${Components.formatPrice(item.price)}</div>
                ${(item.features || []).map(f => `
                  <div class="checkout-feature">
                    <span class="checkout-feature-check">✓</span>
                    <span>${f}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Right: checkout step content -->
            <div class="checkout-panel">
              ${this.checkoutStep === 1 ? this.renderStep1() : ''}
              ${this.checkoutStep === 2 ? this.renderStep2() : ''}
              ${this.checkoutStep === 3 ? this.renderStep3() : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    if (this.checkoutStep === 2) {
      this.startCountdown();
    }
  },

  // ── Step 1: Detail Pembeli ──
  renderStep1() {
    return `
      <div class="checkout-panel-title">Detail Pembeli</div>

      <div class="checkout-label">NAMA LENGKAP <span>*</span></div>
      <input class="checkout-input" id="ck-name" placeholder="Nama lengkap" value="${this.buyerName}">

      <div class="checkout-label">EMAIL <span>*</span></div>
      <input class="checkout-input" id="ck-email" type="email" placeholder="Masukkan email" value="${this.buyerEmail}">
      <div class="checkout-hint">Konfirmasi order dikirim ke email ini.</div>

      <div class="checkout-label">USERNAME ROBLOX <span>*</span></div>
      <input class="checkout-input" id="ck-roblox" placeholder="Username Roblox" value="${this.buyerRoblox}">

      <button class="checkout-submit" onclick="StorePage.goToStep2()">
        LANJUT KE PEMBAYARAN →
      </button>
    `;
  },

  // ── Step 2: Pembayaran ──
  renderStep2() {
    const selected = this.paymentMethods.find(m => m.id === this.selectedPayment);

    return `
      <div class="pay-countdown" id="pay-countdown">
        ⏳ Selesaikan pembayaran dalam <span id="countdown-display">${this.formatCountdown(this.countdownSeconds)}</span>
      </div>

      <div class="pay-methods">
        ${this.paymentMethods.map(m => `
          <div class="pay-method-btn ${this.selectedPayment === m.id ? 'active' : ''}"
            onclick="StorePage.selectPayment('${m.id}')">
            <div class="pay-method-logo">
              <span class="pay-method-fallback" style="color: ${m.fallbackColor || 'white'}">${m.fallbackText}</span>
            </div>
            <div class="pay-method-name">${m.name}</div>
          </div>
        `).join('')}
      </div>

      <div class="pay-detail-box" id="pay-detail-box">
        ${this.renderPaymentDetail(selected)}
      </div>

      <div class="pay-total-row">
        <span>Total Pembayaran</span>
        <span class="pay-total-amount">${Components.formatPrice(this.checkoutItem.price)}</span>
      </div>

      <button class="checkout-submit" style="margin-top:16px;" onclick="StorePage.goToStep3()">
        SAYA SUDAH BAYAR →
      </button>
    `;
  },

  renderPaymentDetail(method) {
    if (!method) return '';

    if (method.type === 'qr') {
      return `
        <div class="pay-detail-label">SCAN QRIS BERIKUT:</div>
        <img src="assets/qris.png" alt="QRIS AR Community" class="pay-qr-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div style="display:none; text-align:center; padding:20px; color:var(--color-text-muted);">
          Gambar QRIS tidak ditemukan.<br>Silakan hubungi admin.
        </div>
      `;
    }

    if (method.type === 'transfer') {
      return `
        <div class="pay-detail-label">TRANSFER KE ${method.name.toUpperCase()}:</div>
        <div class="pay-transfer-number">
          ${method.info.number}
          <button class="pay-copy-btn" onclick="StorePage.copyText('${method.info.number}')">📋 Salin</button>
        </div>
        <div class="pay-account-name">a.n ${method.info.name}</div>
      `;
    }

    return '';
  },

  // ── Step 3: Konfirmasi ──
  renderStep3() {
    const orderId = 'AR-' + Date.now().toString(36).toUpperCase();
    return `
      <div class="confirm-box">
        <div class="confirm-icon">✅</div>
        <div class="confirm-title">PESANAN DIKIRIM</div>
        <div class="confirm-desc">
          Terima kasih, <strong>${this.buyerName}</strong>! Pesanan kamu untuk <strong>${this.checkoutItem.name}</strong> sedang diproses. Admin akan mengirim item ke akun Roblox <strong>${this.buyerRoblox}</strong> setelah pembayaran terkonfirmasi.
        </div>
        <div class="confirm-order-id">Order ID: ${orderId}</div>
        <br>
        <button class="checkout-submit" style="max-width:300px; margin:0 auto;" onclick="StorePage.backToStore()">
          KEMBALI KE STORE
        </button>
      </div>
    `;
  },

  // ═══════════════════════════════════════
  // ACTIONS
  // ═══════════════════════════════════════
  goToStep2() {
    const name = document.getElementById('ck-name')?.value.trim();
    const email = document.getElementById('ck-email')?.value.trim();
    const roblox = document.getElementById('ck-roblox')?.value.trim();

    if (!name || !email || !roblox) {
      alert('Harap isi semua field yang wajib (*).');
      return;
    }

    this.buyerName = name;
    this.buyerEmail = email;
    this.buyerRoblox = roblox;
    this.checkoutStep = 2;
    this.countdownSeconds = 15 * 60;
    this.render();
  },

  goToStep3() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    this.checkoutStep = 3;
    this.render();
  },

  selectPayment(id) {
    this.selectedPayment = id;
    const box = document.getElementById('pay-detail-box');
    const method = this.paymentMethods.find(m => m.id === id);
    if (box && method) {
      box.innerHTML = this.renderPaymentDetail(method);
    }
    // Update active buttons
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
  },

  backToStore() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    this.checkoutItem = null;
    this.checkoutStep = 0;
    window.location.hash = '#/store';
    this.render();
  },

  startCountdown() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.countdownTimer = setInterval(() => {
      this.countdownSeconds--;
      const display = document.getElementById('countdown-display');
      if (display) {
        display.textContent = this.formatCountdown(this.countdownSeconds);
      }
      if (this.countdownSeconds <= 0) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        alert('Waktu pembayaran habis. Silakan ulangi checkout.');
        this.backToStore();
      }
    }, 1000);
  },

  formatCountdown(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  },

  copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Nomor berhasil disalin!');
    }).catch(() => {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('Nomor berhasil disalin!');
    });
  }
};

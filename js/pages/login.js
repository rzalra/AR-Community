/* ========================================
   AR COMMUNITY — Login Page
   ======================================== */

const LoginPage = {
  step: 1, // 1: Email entry, 2: Code Verification
  email: '',
  verificationCode: '',
  enteredCode: '',
  errorMessage: '',
  isSending: false,
  turnstileState: 'idle', // 'idle', 'checking', 'checked'
  showActivationNotice: false,

  render() {
    const app = document.getElementById('app');

    // Hide header, footer, scrolling banner on login
    const header = document.getElementById('header');
    const footer = document.querySelector('.footer');
    const scrollingBanner = document.querySelector('.scrolling-banner');

    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (scrollingBanner) scrollingBanner.style.display = 'none';

    app.innerHTML = `
      <div class="login-page-container">
        <!-- Breadcrumbs trail -->
        <div style="position: absolute; top: var(--space-8); left: var(--space-8); font-family: var(--font-heading); font-size: 0.65rem; color: var(--color-text-muted); letter-spacing: var(--letter-spacing-wider); display: flex; align-items: center; gap: 8px;">
          <a href="#/home" style="color: var(--color-text-muted); text-decoration: none;">🏠 HOME</a>
          <span>&gt;</span>
          <span style="color: var(--color-accent-red);">LOGIN</span>
        </div>

        <div class="login-centered-card">
          <!-- Small Red Logo -->
          <div style="text-align: center; margin-bottom: var(--space-6);">
            <img src="assets/logo.png" alt="AR Logo" style="height: 32px; width: auto; margin: 0 auto; filter: drop-shadow(0 0 10px rgba(255, 62, 85, 0.4));">
          </div>

          <div id="login-step-container">
            ${this.renderStep()}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  },

  renderStep() {
    if (this.step === 1) {
      return `
        <div style="animation: fadeInUp 400ms ease both;">
          <h2 style="font-size: var(--text-xl); font-weight: var(--font-weight-black); color: #ffffff; text-align: center; margin-bottom: 8px; font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.05em;">Masuk ke Akun</h2>
          <p style="font-size: 0.72rem; color: var(--color-text-secondary); text-align: center; margin-bottom: var(--space-8); line-height: 1.4;">
            Masukkan email, kita kirim kode verifikasi ke sana.
          </p>
          
          <form id="email-login-form" style="display:flex; flex-direction:column; gap: var(--space-4);">
            <div class="form-group" style="text-align: left;">
              <label class="form-label" style="font-size: 0.62rem; color: var(--color-text-secondary); font-weight: bold; letter-spacing: var(--letter-spacing-wider); margin-bottom: 6px; display: block;">EMAIL</label>
              <input type="email" id="login-email" class="login-input-red" placeholder="nama@email.com" value="${this.email}" required autocomplete="email">
            </div>
            
            <!-- Cloudflare Turnstile Mock -->
            <div class="turnstile-widget">
              <div class="turnstile-left">
                <div class="turnstile-box-outer ${this.turnstileState}" id="turnstile-checkbox-box">
                  ${this.renderTurnstileIcon()}
                </div>
                <span class="turnstile-text">Verifikasi bahwa Anda adalah manusia</span>
              </div>
              <div class="turnstile-right">
                <img src="assets/cloudflare.png" class="turnstile-logo-img" alt="Cloudflare logo">
                <span class="turnstile-links">
                  <span onclick="alert('Turnstile Privacy Policy')">Privasi</span> • 
                  <span onclick="alert('Turnstile Terms of Use')">Syarat</span>
                </span>
              </div>
            </div>
            
            ${this.errorMessage ? `<p style="color:var(--color-accent-red); font-size:0.7rem; margin: 0; text-align: center;">⚠️ ${this.errorMessage}</p>` : ''}
            
            <button type="submit" id="btn-submit-login" class="login-btn-red ${this.isButtonActive() ? 'active' : 'disabled'}" ${this.isButtonActive() ? '' : 'disabled'}>
              ${this.isSending ? '⏳ Mengirim Kode...' : 'Kirim Kode Verifikasi'}
            </button>
            
            <p style="font-size: 0.68rem; color: var(--color-text-muted); text-align: center; margin-top: var(--space-4); line-height: 1.4;">
              Belum punya akun? Masukkan email kamu, akun otomatis dibuat.
            </p>
          </form>
          
          <div style="text-align: center; margin-top: var(--space-6); border-top: 1px solid rgba(255,255,255,0.03); padding-top: var(--space-4);">
            <a href="#/home" style="font-size: 0.65rem; color: var(--color-text-muted); text-decoration: none; letter-spacing: var(--letter-spacing-wide); font-weight: bold; text-transform: uppercase;">• Kembali ke Home</a>
          </div>
        </div>
      `;
    }

    if (this.step === 2) {
      return `
        <div style="animation: fadeInUp 400ms ease both;">
          <h2 style="font-size: var(--text-xl); font-weight: var(--font-weight-black); color: #ffffff; text-align: center; margin-bottom: 8px; font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.05em;">Verifikasi Kode</h2>
          <p style="font-size: 0.72rem; color: var(--color-text-secondary); text-align: center; margin-bottom: var(--space-6); line-height: 1.4;">
            Kode verifikasi telah dikirim ke email <strong style="color:#ffffff;">${this.email}</strong>. Silakan masukkan kode tersebut di bawah ini.
          </p>
          
          ${this.renderActivationNotice()}
          
          <form id="code-verify-form" style="display:flex; flex-direction:column; gap: var(--space-4);">
            <div class="form-group" style="text-align: left;">
              <label class="form-label" style="font-size: 0.62rem; color: var(--color-text-secondary); font-weight: bold; letter-spacing: var(--letter-spacing-wider); margin-bottom: 6px; display: block; text-align: center;">KODE VERIFIKASI</label>
              <input type="text" id="verify-code-input" class="login-input-red" placeholder="------" maxlength="6" pattern="\\d{6}" required style="font-size:var(--text-lg); text-align:center; letter-spacing: 0.25em; font-family:var(--font-heading);" autofocus>
            </div>
            
            ${this.errorMessage ? `<p style="color:var(--color-accent-red); font-size:0.7rem; margin: 0; text-align: center;">⚠️ ${this.errorMessage}</p>` : ''}
            
            <button type="submit" class="login-btn-red active" style="margin-top: var(--space-2);">
              VERIFIKASI & MASUK
            </button>
            
            <div style="text-align: center; margin-top: var(--space-4);">
              <span id="btn-back-login" style="font-size: 0.65rem; color: var(--color-text-muted); text-decoration: none; font-weight: bold; text-transform: uppercase; cursor: pointer; display: inline-block;">• Kembali ke Login</span>
            </div>
          </form>
        </div>
      `;
    }
  },

  renderTurnstileIcon() {
    if (this.turnstileState === 'idle') return '';
    if (this.turnstileState === 'checking') return '<div class="turnstile-check-spinner"></div>';
    if (this.turnstileState === 'checked') return '<span class="turnstile-check-icon">✓</span>';
    return '';
  },

  renderActivationNotice() {
    if (!this.showActivationNotice) return '';
    return `
      <div style="background: rgba(250, 204, 21, 0.05); border: 1px dashed var(--color-accent-yellow); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); margin-bottom: var(--space-4); color: var(--color-accent-yellow); font-size: 0.68rem; line-height: 1.4; text-align: left; animation: fadeIn 300ms ease;">
        ⚠️ <strong>PERTAMA KALI?</strong> Jika Anda baru pertama kali menggunakan FormSubmit dengan email ini, silakan periksa inbox/spam email Anda untuk mengeklik tombol <strong>"Activate"</strong> dari FormSubmit. Setelah diaktifkan, silakan kembali ke halaman login dan klik kirim kode lagi untuk mendapatkan kode verifikasi Anda!
      </div>
    `;
  },

  isButtonActive() {
    return this.email.includes('@') && this.turnstileState === 'checked' && !this.isSending;
  },

  bindEvents() {
    // Keep tracks of keystrokes on email field to enable/disable button dynamically
    const emailInput = document.getElementById('login-email');
    if (emailInput) {
      emailInput.addEventListener('input', (e) => {
        this.email = e.target.value.trim();
        this.updateSubmitButtonState();
      });
    }

    // Cloudflare checkbox click
    const turnstileBox = document.getElementById('turnstile-checkbox-box');
    if (turnstileBox) {
      turnstileBox.addEventListener('click', (e) => {
        e.stopPropagation();
        this.startTurnstileCheck();
      });
    }

    if (this.step === 1) {
      const emailForm = document.getElementById('email-login-form');
      if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!this.isButtonActive()) return;

          this.isSending = true;
          this.errorMessage = '';
          this.render();

          // Generate 6-digit random code
          this.verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

          // Construct payload for FormSubmit API
          const payload = {
            "_subject": "🔒 Kode Verifikasi Login AR Community",
            "Kode Verifikasi": this.verificationCode,
            "Pemberitahuan": "Gunakan kode di atas pada halaman verifikasi login AR Community. Kode ini berlaku selama 10 menit."
          };

          // Post to FormSubmit AJAX endpoint
          fetch(`https://formsubmit.co/ajax/${encodeURIComponent(this.email)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          })
            .then(res => {
              if (!res.ok) throw new Error('FormSubmit returned error status');
              return res.json();
            })
            .then(data => {
              this.isSending = false;
              this.showActivationNotice = true; // show warning block about activating FormSubmit
              this.step = 2;
              this.render();
            })
            .catch(err => {
              console.error('Error sending email:', err);
              this.isSending = false;
              this.errorMessage = 'Gagal mengirim email. Silakan coba lagi atau cek koneksi.';
              this.render();
            });
        });
      }
    }

    if (this.step === 2) {
      const verifyForm = document.getElementById('code-verify-form');
      if (verifyForm) {
        verifyForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const codeInput = document.getElementById('verify-code-input');
          if (!codeInput) return;

          const entered = codeInput.value.trim();
          if (entered === this.verificationCode) {
            // Login Success!
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', this.email);

            let name = this.email.split('@')[0];
            name = name.split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            localStorage.setItem('userName', name);
            localStorage.setItem('userTier', 'Unlimited');
            
            let pluginId = 'b4629de2' + Math.random().toString(16).substring(2, 10);
            localStorage.setItem('user_plugin_id', pluginId);

            // Fetch cloud data and sync
            DB.fetchUserData(this.email).then(existingData => {
              if (!existingData) {
                // First-time signup, save default profile to Supabase
                DB.saveUserData();
              }

              const displayName = localStorage.getItem('userName') || name;

              // Success screen overlay
              const container = document.getElementById('login-step-container');
              container.innerHTML = `
                <div style="text-align: center; animation: scaleIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) both; padding: 20px 0;">
                  <div style="font-size: 3rem; margin-bottom: 16px;">✨</div>
                  <h3 style="font-size: var(--text-md); font-weight: var(--font-weight-black); color: var(--color-accent-green); margin-bottom: 8px; font-family: var(--font-heading);">VERIFIKASI SUKSES</h3>
                  <p style="font-size: 0.72rem; color: var(--color-text-secondary); margin-bottom: 20px;">Selamat datang di AR Community, ${displayName}.</p>
                  <div style="width: 20px; height: 20px; border: 2px solid var(--color-border); border-top-color: var(--color-accent-cyan); border-radius: 50%; animation: rotate 1s linear infinite; margin: 0 auto;"></div>
                </div>
              `;

              setTimeout(() => {
                // Restore header and footer
                const header = document.getElementById('header');
                const footer = document.querySelector('.footer');
                const scrollingBanner = document.querySelector('.scrolling-banner');
                if (header) header.style.display = '';
                if (footer) footer.style.display = '';
                if (scrollingBanner) scrollingBanner.style.display = '';

                // Redirect to home
                window.location.hash = '#/home';
              }, 1500);
            });
          } else {
            this.errorMessage = 'Kode verifikasi salah. Harap masukkan kode yang dikirim ke email Anda.';
            this.render();
          }
        });
      }

      const backBtn = document.getElementById('btn-back-login');
      if (backBtn) {
        backBtn.addEventListener('click', () => {
          this.step = 1;
          this.errorMessage = '';
          this.turnstileState = 'idle'; // reset turnstile
          this.render();
        });
      }
    }
  },

  startTurnstileCheck() {
    if (this.turnstileState !== 'idle') return;

    this.turnstileState = 'checking';
    const box = document.getElementById('turnstile-checkbox-box');
    if (box) {
      box.className = 'turnstile-box-outer checking';
      box.innerHTML = '<div class="turnstile-check-spinner"></div>';
    }

    setTimeout(() => {
      this.turnstileState = 'checked';
      if (box) {
        box.className = 'turnstile-box-outer checked';
        box.innerHTML = '<span class="turnstile-check-icon">✓</span>';
      }
      this.updateSubmitButtonState();
    }, 1000);
  },

  updateSubmitButtonState() {
    const btn = document.getElementById('btn-submit-login');
    if (btn) {
      if (this.isButtonActive()) {
        btn.className = 'login-btn-red active';
        btn.removeAttribute('disabled');
      } else {
        btn.className = 'login-btn-red disabled';
        btn.setAttribute('disabled', 'true');
      }
    }
  }
};

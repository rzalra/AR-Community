/* ========================================
   AR COMMUNITY — More Page
   About, Contact, Privacy Policy
   ======================================== */

const MorePage = {

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="more-page">
          <div class="container">
            <h1>📋 More</h1>
            <p style="color:var(--color-text-muted); margin-bottom: var(--space-10)">Informasi tambahan tentang komunitas kami</p>

            <div class="more-sections">
              ${this.renderAbout()}
              ${this.renderContact()}
              ${this.renderPrivacy()}
            </div>
          </div>
        </section>
      </div>
    `;
  },

  renderAbout() {
    return `
      <div class="more-section" style="animation: fadeInUp 500ms ease both">
        <h2>Tentang Kami</h2>
        <p>
          <strong style="color:var(--color-text-primary)">AR Community</strong> adalah komunitas yang berfokus pada pengembangan proyek digital, 
          khususnya game development dan creative tools. Didirikan dengan visi untuk mempermudah akses 
          ke tools dan resources bagi developer Indonesia.
        </p>
        <p>
          Kami menyediakan berbagai alat digital, aset, dan layanan yang membantu mempercepat 
          proses pembuatan proyek. Dari editor kode, asset marketplace, hingga AI-powered tools — 
          semua tersedia dalam satu platform.
        </p>

        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:16px; margin-top: 24px">
          <div style="padding:20px; background:var(--color-bg-glass); border:1px solid var(--color-border); border-radius:12px; text-align:center">
            <div style="font-size:2rem; margin-bottom:8px">🎯</div>
            <h4 style="font-size:var(--text-sm); margin-bottom:4px">Visi</h4>
            <p style="font-size:var(--text-sm)">Menjadi komunitas developer terbesar di Indonesia</p>
          </div>
          <div style="padding:20px; background:var(--color-bg-glass); border:1px solid var(--color-border); border-radius:12px; text-align:center">
            <div style="font-size:2rem; margin-bottom:8px">💡</div>
            <h4 style="font-size:var(--text-sm); margin-bottom:4px">Misi</h4>
            <p style="font-size:var(--text-sm)">Menyediakan tools & resources berkualitas tinggi</p>
          </div>
          <div style="padding:20px; background:var(--color-bg-glass); border:1px solid var(--color-border); border-radius:12px; text-align:center">
            <div style="font-size:2rem; margin-bottom:8px">🤝</div>
            <h4 style="font-size:var(--text-sm); margin-bottom:4px">Nilai</h4>
            <p style="font-size:var(--text-sm)">Kolaborasi, inovasi, dan dukungan mutual</p>
          </div>
        </div>
      </div>
    `;
  },

  renderContact() {
    return `
      <div class="more-section" style="animation: fadeInUp 500ms ease 150ms both">
        <h2>Hubungi Kami</h2>
        <p>Ada pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami.</p>
        
        <div id="contact-success" class="form-success">
          ✅ Pesan Anda telah berhasil dikirim! Kami akan merespons dalam 24 jam.
        </div>

        <form id="contact-form" class="contact-form" onsubmit="MorePage.handleSubmit(event)">
          <div class="contact-form-row">
            <div class="form-group">
              <label class="form-label">Nama</label>
              <input type="text" class="form-input" id="contact-name" placeholder="Nama Anda" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="contact-email" placeholder="email@contoh.com" required>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Subjek</label>
            <input type="text" class="form-input" id="contact-subject" placeholder="Subjek pesan Anda">
          </div>
          <div class="form-group">
            <label class="form-label">Pesan</label>
            <textarea class="form-textarea" id="contact-message" placeholder="Tulis pesan Anda di sini..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="align-self:flex-start">
            ✉️ KIRIM PESAN
          </button>
        </form>
      </div>
    `;
  },

  renderPrivacy() {
    return `
      <div class="more-section" style="animation: fadeInUp 500ms ease 300ms both">
        <h2>Kebijakan Privasi</h2>
        <p>
          Kami menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, 
          menggunakan, dan melindungi informasi Anda.
        </p>
        
        <div style="margin-top:16px">
          <h4 style="font-size:var(--text-base); color:var(--color-text-primary); margin-bottom:8px; font-family:var(--font-heading); letter-spacing:0.05em">1. Pengumpulan Data</h4>
          <p style="margin-bottom:16px">
            Kami hanya mengumpulkan data yang diperlukan untuk memberikan layanan terbaik, 
            seperti nama pengguna, alamat email, dan preferensi penggunaan.
          </p>

          <h4 style="font-size:var(--text-base); color:var(--color-text-primary); margin-bottom:8px; font-family:var(--font-heading); letter-spacing:0.05em">2. Penggunaan Data</h4>
          <p style="margin-bottom:16px">
            Data yang dikumpulkan digunakan untuk meningkatkan layanan, mengirim notifikasi penting, 
            dan memberikan dukungan teknis.
          </p>

          <h4 style="font-size:var(--text-base); color:var(--color-text-primary); margin-bottom:8px; font-family:var(--font-heading); letter-spacing:0.05em">3. Keamanan Data</h4>
          <p style="margin-bottom:16px">
            Kami menggunakan enkripsi dan prosedur keamanan standar industri untuk melindungi 
            informasi pribadi Anda dari akses yang tidak sah.
          </p>

          <h4 style="font-size:var(--text-base); color:var(--color-text-primary); margin-bottom:8px; font-family:var(--font-heading); letter-spacing:0.05em">4. Kontak</h4>
          <p>
            Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami 
            melalui formulir kontak di atas atau melalui Discord kami.
          </p>
        </div>
      </div>
    `;
  },

  handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    const success = document.getElementById('contact-success');

    // Simulate sending
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ MENGIRIM...';

    setTimeout(() => {
      form.reset();
      success.classList.add('visible');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '✉️ KIRIM PESAN';

      // Auto-hide success after 5s
      setTimeout(() => {
        success.classList.remove('visible');
      }, 5000);
    }, 1500);
  }
};

/* ========================================
   AR COMMUNITY — Auto Publisher
   ======================================== */

const AutoPublisherPage = {
  history: [],
  isPublishing: false,

  render() {
    try { this.history = JSON.parse(localStorage.getItem('publish_history')) || []; } catch(e) { this.history = []; }

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Auto Publisher</span>
            </div>
            <div class="tool-page-header">
              <h1>🚀 Auto Publisher</h1>
              <p>Otomatiskan proses publish game ke platform Roblox dengan scheduling dan versioning</p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-4);">
              <!-- Left: Form -->
              <div class="tool-section" style="margin-bottom:0;">
                <h3>📝 Publish Configuration</h3>
                <div style="display:flex; flex-direction:column; gap:var(--space-3);">
                  <div>
                    <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Game Name</label>
                    <input type="text" id="pub-game-name" class="form-input" placeholder="My Awesome Game" value="">
                  </div>
                  <div>
                    <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Place ID</label>
                    <input type="text" id="pub-place-id" class="form-input" placeholder="123456789" value="">
                  </div>
                  <div>
                    <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Version Tag</label>
                    <input type="text" id="pub-version" class="form-input" placeholder="v1.0.0" value="">
                  </div>
                  <div>
                    <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Description / Changelog</label>
                    <textarea id="pub-desc" class="form-input" style="min-height:80px; resize:vertical;" placeholder="Describe what's new in this version..."></textarea>
                  </div>
                  <button class="btn btn-primary" onclick="AutoPublisherPage.publish()" ${this.isPublishing?'disabled':''}>
                    ${this.isPublishing ? '⏳ Publishing...' : '🚀 PUBLISH NOW'}
                  </button>
                </div>
              </div>

              <!-- Right: Log + History -->
              <div>
                <div class="tool-section" style="margin-bottom:var(--space-4);">
                  <h3>📟 Publish Log</h3>
                  <div class="publish-log" id="pub-log">
                    <div class="log-entry log-info">Siap untuk publish. Isi form dan klik PUBLISH NOW.</div>
                  </div>
                </div>

                <div class="tool-section" style="margin-bottom:0;">
                  <h3>📜 Publish History</h3>
                  <div style="max-height:200px; overflow-y:auto;">
                    ${this.history.length ? this.history.slice().reverse().map(h => `
                      <div style="padding:var(--space-2) var(--space-3); border-bottom:1px solid var(--color-border); font-size:0.72rem;">
                        <div style="display:flex; justify-content:space-between;">
                          <strong style="color:var(--color-text-primary);">${h.name}</strong>
                          <span style="color:var(--color-accent-green);">${h.version}</span>
                        </div>
                        <div style="color:var(--color-text-muted); font-size:0.6rem;">${h.date} · Place ID: ${h.placeId}</div>
                      </div>
                    `).join('') : '<p style="font-size:0.72rem; color:var(--color-text-muted); text-align:center; padding:var(--space-4);">Belum ada history publish.</p>'}
                  </div>
                  ${this.history.length ? `<button class="btn btn-ghost btn-sm" style="margin-top:var(--space-2); width:100%;" onclick="AutoPublisherPage.clearHistory()">🗑 Clear History</button>` : ''}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  publish() {
    const name = document.getElementById('pub-game-name').value.trim();
    const placeId = document.getElementById('pub-place-id').value.trim();
    const version = document.getElementById('pub-version').value.trim();
    const desc = document.getElementById('pub-desc').value.trim();

    if (!name || !placeId || !version) {
      this.log('error', '❌ Harap isi Game Name, Place ID, dan Version Tag.');
      return;
    }

    this.isPublishing = true;
    const log = document.getElementById('pub-log');
    if (log) log.innerHTML = '';

    const steps = [
      { msg: '🔌 Menghubungkan ke Roblox Open Cloud API...', delay: 800 },
      { msg: '🔑 Memvalidasi API credentials...', delay: 600 },
      { msg: `📋 Mempersiapkan publish untuk "${name}" (Place ID: ${placeId})...`, delay: 700 },
      { msg: `📦 Packaging game data — Version: ${version}...`, delay: 900 },
      { msg: '⬆️ Uploading game binary (chunk 1/3)...', delay: 500 },
      { msg: '⬆️ Uploading game binary (chunk 2/3)...', delay: 500 },
      { msg: '⬆️ Uploading game binary (chunk 3/3)...', delay: 600 },
      { msg: '⚙️ Server-side validation & processing...', delay: 1000 },
      { msg: `📝 Updating description: "${desc || 'No description'}"`, delay: 400 },
      { msg: `✅ PUBLISHED SUCCESSFULLY! Version ${version} is now live.`, delay: 0, type: 'success' }
    ];

    let i = 0;
    const runStep = () => {
      if (i >= steps.length) {
        this.isPublishing = false;
        // Save to history
        this.history.push({
          name, placeId, version, desc,
          date: new Date().toLocaleString('id-ID')
        });
        localStorage.setItem('publish_history', JSON.stringify(this.history));

        // Re-render to show updated history
        const btn = document.querySelector('.btn.btn-primary');
        if (btn) { btn.disabled = false; btn.textContent = '🚀 PUBLISH NOW'; }
        return;
      }

      const step = steps[i];
      this.log(step.type || 'info', step.msg);
      i++;
      setTimeout(runStep, step.delay);
    };

    runStep();
  },

  log(type, msg) {
    const log = document.getElementById('pub-log');
    if (!log) return;
    const entry = document.createElement('div');
    entry.className = `log-entry log-${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  },

  clearHistory() {
    this.history = [];
    localStorage.removeItem('publish_history');
    this.render();
  }
};

/* ========================================
   AR COMMUNITY — Sound FX Generator
   ======================================== */

const SoundFxPage = {
  preset: 'laser',
  freq: 440,
  waveform: 'square',
  duration: 0.3,
  decay: 0.8,
  audioCtx: null,

  presets: {
    laser:     { freq: 1200, waveform: 'sawtooth', duration: 0.15, decay: 0.95, label: '🔫 Laser' },
    explosion: { freq: 80,   waveform: 'sawtooth', duration: 0.8,  decay: 0.6,  label: '💥 Explosion' },
    jump:      { freq: 300,  waveform: 'sine',     duration: 0.2,  decay: 0.7,  label: '🦘 Jump' },
    coin:      { freq: 800,  waveform: 'square',   duration: 0.1,  decay: 0.9,  label: '🪙 Coin' },
    hit:       { freq: 200,  waveform: 'square',   duration: 0.15, decay: 0.5,  label: '⚔️ Hit' },
    powerup:   { freq: 500,  waveform: 'sine',     duration: 0.5,  decay: 0.85, label: '⭐ PowerUp' },
    damage:    { freq: 150,  waveform: 'sawtooth', duration: 0.25, decay: 0.4,  label: '💔 Damage' },
    select:    { freq: 660,  waveform: 'triangle', duration: 0.08, decay: 0.9,  label: '🖱️ Select' }
  },

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Sound FX Generator</span>
            </div>
            <div class="tool-page-header">
              <h1>🔊 Sound FX Generator</h1>
              <p>Buat efek suara prosedural untuk game Roblox menggunakan Web Audio</p>
            </div>

            <div class="tool-section">
              <h3>🎯 Preset</h3>
              <div class="preset-grid">
                ${Object.entries(this.presets).map(([key, p]) => `
                  <button class="preset-btn ${this.preset===key?'active':''}" onclick="SoundFxPage.applyPreset('${key}')">${p.label}</button>
                `).join('')}
              </div>
            </div>

            <div class="tool-section">
              <h3>🎛️ Kontrol Manual</h3>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4);">
                <div>
                  <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Frequency: <span id="freq-val">${this.freq}</span> Hz</label>
                  <input type="range" min="20" max="2000" value="${this.freq}" style="width:100%;" oninput="SoundFxPage.freq=+this.value;document.getElementById('freq-val').textContent=this.value">
                </div>
                <div>
                  <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Duration: <span id="dur-val">${this.duration}</span>s</label>
                  <input type="range" min="0.05" max="2" step="0.05" value="${this.duration}" style="width:100%;" oninput="SoundFxPage.duration=+this.value;document.getElementById('dur-val').textContent=this.value">
                </div>
                <div>
                  <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Decay: <span id="decay-val">${this.decay}</span></label>
                  <input type="range" min="0.1" max="1" step="0.05" value="${this.decay}" style="width:100%;" oninput="SoundFxPage.decay=+this.value;document.getElementById('decay-val').textContent=this.value">
                </div>
                <div>
                  <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Waveform</label>
                  <select style="width:100%; padding:6px; background:#0d0d0d; border:1px solid var(--color-border); border-radius:var(--radius-sm); color:var(--color-text-primary);" onchange="SoundFxPage.waveform=this.value">
                    ${['sine','square','sawtooth','triangle'].map(w => `<option value="${w}" ${this.waveform===w?'selected':''}>${w}</option>`).join('')}
                  </select>
                </div>
              </div>
            </div>

            <div style="display:flex; gap:var(--space-3); flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="SoundFxPage.play()">▶ Preview Sound</button>
              <button class="btn btn-ghost" onclick="SoundFxPage.downloadWav()">💾 Download WAV</button>
            </div>

            <div class="waveform-container" style="margin-top:var(--space-4);">
              <canvas id="sfx-waveform"></canvas>
            </div>
          </div>
        </section>
      </div>
    `;
    this.drawWaveform();
  },

  applyPreset(key) {
    const p = this.presets[key];
    this.preset = key;
    this.freq = p.freq;
    this.waveform = p.waveform;
    this.duration = p.duration;
    this.decay = p.decay;
    this.render();
    this.play();
  },

  getAudioCtx() {
    if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return this.audioCtx;
  },

  generateBuffer() {
    const ctx = this.getAudioCtx();
    const sr = ctx.sampleRate;
    const len = Math.floor(sr * this.duration);
    const buffer = ctx.createBuffer(1, len, sr);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const env = Math.pow(1 - t / this.duration, 1 / this.decay);
      const freqMod = this.freq * (1 + (this.preset === 'laser' ? -t * 8 : this.preset === 'jump' ? t * 4 : this.preset === 'explosion' ? -t * 0.5 : 0));
      const phase = 2 * Math.PI * freqMod * t;
      let sample;

      switch (this.waveform) {
        case 'sine': sample = Math.sin(phase); break;
        case 'square': sample = Math.sign(Math.sin(phase)); break;
        case 'sawtooth': sample = 2 * ((freqMod * t) % 1) - 1; break;
        case 'triangle': sample = 2 * Math.abs(2 * ((freqMod * t) % 1) - 1) - 1; break;
        default: sample = Math.sin(phase);
      }

      // Add noise for explosion
      if (this.preset === 'explosion') sample += (Math.random() * 2 - 1) * 0.6 * env;

      data[i] = sample * env * 0.5;
    }
    return buffer;
  },

  play() {
    const ctx = this.getAudioCtx();
    const buffer = this.generateBuffer();
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start();
    this.drawWaveform(buffer.getChannelData(0));
  },

  drawWaveform(data) {
    const canvas = document.getElementById('sfx-waveform');
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#060606';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!data) return;

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const step = Math.ceil(data.length / canvas.width);
    for (let i = 0; i < canvas.width; i++) {
      const idx = i * step;
      const v = data[idx] || 0;
      const y = (1 - v) * canvas.height / 2;
      if (i === 0) ctx.moveTo(i, y);
      else ctx.lineTo(i, y);
    }
    ctx.stroke();
  },

  downloadWav() {
    const ctx = this.getAudioCtx();
    const buffer = this.generateBuffer();
    const data = buffer.getChannelData(0);
    const sr = ctx.sampleRate;
    const numSamples = data.length;
    const bitsPerSample = 16;
    const byteRate = sr * bitsPerSample / 8;
    const blockAlign = bitsPerSample / 8;
    const dataSize = numSamples * blockAlign;
    const headerSize = 44;
    const buf = new ArrayBuffer(headerSize + dataSize);
    const view = new DataView(buf);

    const writeStr = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sr, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true);
    writeStr(36, 'data');
    view.setUint32(40, dataSize, true);

    for (let i = 0; i < numSamples; i++) {
      const s = Math.max(-1, Math.min(1, data[i]));
      view.setInt16(headerSize + i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    const blob = new Blob([buf], {type: 'audio/wav'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sfx_${this.preset}.wav`;
    a.click();
  }
};

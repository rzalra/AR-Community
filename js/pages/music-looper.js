/* ========================================
   AR COMMUNITY — Music Looper
   ======================================== */

const MusicLooperPage = {
  audioBuffer: null,
  audioCtx: null,
  fileName: '',
  loopStart: 0,
  loopEnd: 1,
  crossfade: 0.1,
  isPlaying: false,
  source: null,

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Music Looper</span>
            </div>
            <div class="tool-page-header">
              <h1>🎶 Music Looper</h1>
              <p>Buat seamless music loops dari track audio untuk background musik game Roblox</p>
            </div>

            <div class="tool-section">
              <h3>📂 Upload Audio</h3>
              <div style="border:2px dashed var(--color-border); border-radius:var(--radius-md); padding:var(--space-8); text-align:center; cursor:pointer;" onclick="document.getElementById('looper-file-input').click()">
                <input type="file" id="looper-file-input" accept="audio/*" style="display:none" onchange="MusicLooperPage.loadFile(this.files[0])">
                <div style="font-size:2rem; margin-bottom:var(--space-2);">🎵</div>
                <p style="font-size:0.78rem; color:var(--color-text-secondary);">${this.fileName || 'Klik atau drag file audio di sini'}</p>
              </div>
            </div>

            ${this.audioBuffer ? this.renderEditor() : ''}
          </div>
        </section>
      </div>
    `;

    if (this.audioBuffer) {
      this.drawWaveform();
    }
  },

  renderEditor() {
    const duration = this.audioBuffer.duration;
    return `
      <div class="tool-section">
        <h3>🔊 Waveform & Loop Points</h3>
        <div class="waveform-container" style="height:150px; margin-bottom:var(--space-4);">
          <canvas id="looper-waveform"></canvas>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:var(--space-4);">
          <div>
            <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Loop Start: <span id="ls-val">${(this.loopStart * duration).toFixed(2)}</span>s</label>
            <input type="range" min="0" max="1" step="0.001" value="${this.loopStart}" style="width:100%;" oninput="MusicLooperPage.setLoopStart(+this.value)">
          </div>
          <div>
            <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Loop End: <span id="le-val">${(this.loopEnd * duration).toFixed(2)}</span>s</label>
            <input type="range" min="0" max="1" step="0.001" value="${this.loopEnd}" style="width:100%;" oninput="MusicLooperPage.setLoopEnd(+this.value)">
          </div>
          <div>
            <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Crossfade: <span id="cf-val">${(this.crossfade * duration).toFixed(2)}</span>s</label>
            <input type="range" min="0" max="0.5" step="0.01" value="${this.crossfade}" style="width:100%;" oninput="MusicLooperPage.setCrossfade(+this.value)">
          </div>
        </div>
      </div>

      <div style="display:flex; gap:var(--space-3); flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="MusicLooperPage.togglePlay()">
          ${this.isPlaying ? '⏹ Stop' : '▶ Preview Loop'}
        </button>
        <button class="btn btn-ghost" onclick="MusicLooperPage.downloadLoop()">💾 Download Loop WAV</button>
        <span style="font-size:0.68rem; color:var(--color-text-muted); display:flex; align-items:center;">
          📊 Duration: ${duration.toFixed(2)}s · Loop: ${((this.loopEnd - this.loopStart) * duration).toFixed(2)}s · ${this.audioBuffer.sampleRate}Hz
        </span>
      </div>
    `;
  },

  loadFile(file) {
    if (!file) return;
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      const ctx = this.getCtx();
      ctx.decodeAudioData(e.target.result).then(buffer => {
        this.audioBuffer = buffer;
        this.loopStart = 0;
        this.loopEnd = 1;
        this.render();
      });
    };
    reader.readAsArrayBuffer(file);
  },

  getCtx() {
    if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return this.audioCtx;
  },

  setLoopStart(v) {
    this.loopStart = Math.min(v, this.loopEnd - 0.01);
    const d = this.audioBuffer.duration;
    document.getElementById('ls-val').textContent = (this.loopStart * d).toFixed(2);
    this.drawWaveform();
  },

  setLoopEnd(v) {
    this.loopEnd = Math.max(v, this.loopStart + 0.01);
    const d = this.audioBuffer.duration;
    document.getElementById('le-val').textContent = (this.loopEnd * d).toFixed(2);
    this.drawWaveform();
  },

  setCrossfade(v) {
    this.crossfade = v;
    const d = this.audioBuffer.duration;
    document.getElementById('cf-val').textContent = (this.crossfade * d).toFixed(2);
  },

  drawWaveform() {
    const canvas = document.getElementById('looper-waveform');
    if (!canvas || !this.audioBuffer) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext('2d');
    const data = this.audioBuffer.getChannelData(0);

    ctx.fillStyle = '#060606';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw loop region
    const startX = this.loopStart * canvas.width;
    const endX = this.loopEnd * canvas.width;
    ctx.fillStyle = 'rgba(239, 68, 68, 0.08)';
    ctx.fillRect(startX, 0, endX - startX, canvas.height);

    // Draw waveform
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const step = Math.ceil(data.length / canvas.width);
    for (let i = 0; i < canvas.width; i++) {
      const idx = i * step;
      const v = data[idx] || 0;
      const y = (1 - v) * canvas.height / 2;
      if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
    }
    ctx.stroke();

    // Draw loop markers
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(startX, 0); ctx.lineTo(startX, canvas.height); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(endX, 0); ctx.lineTo(endX, canvas.height); ctx.stroke();
    ctx.setLineDash([]);
  },

  togglePlay() {
    if (this.isPlaying) {
      this.stopPlay();
    } else {
      this.playLoop();
    }
  },

  playLoop() {
    const ctx = this.getCtx();
    const dur = this.audioBuffer.duration;
    const start = this.loopStart * dur;
    const end = this.loopEnd * dur;

    this.source = ctx.createBufferSource();
    this.source.buffer = this.audioBuffer;
    this.source.loop = true;
    this.source.loopStart = start;
    this.source.loopEnd = end;
    this.source.connect(ctx.destination);
    this.source.start(0, start);
    this.isPlaying = true;
    this.render();
  },

  stopPlay() {
    if (this.source) {
      this.source.stop();
      this.source = null;
    }
    this.isPlaying = false;
    this.render();
  },

  downloadLoop() {
    if (!this.audioBuffer) return;
    const sr = this.audioBuffer.sampleRate;
    const dur = this.audioBuffer.duration;
    const startSample = Math.floor(this.loopStart * dur * sr);
    const endSample = Math.floor(this.loopEnd * dur * sr);
    const loopLen = endSample - startSample;
    const channels = this.audioBuffer.numberOfChannels;

    // Create WAV
    const bitsPerSample = 16;
    const bytesPerSample = bitsPerSample / 8;
    const blockAlign = channels * bytesPerSample;
    const dataSize = loopLen * blockAlign;
    const buf = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buf);

    const w = (o, s) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); view.setUint32(4, 36 + dataSize, true); w(8, 'WAVE');
    w(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
    view.setUint16(22, channels, true); view.setUint32(24, sr, true);
    view.setUint32(28, sr * blockAlign, true); view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitsPerSample, true); w(36, 'data'); view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < loopLen; i++) {
      for (let ch = 0; ch < channels; ch++) {
        const s = this.audioBuffer.getChannelData(ch)[startSample + i] || 0;
        const clamped = Math.max(-1, Math.min(1, s));
        view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7FFF, true);
        offset += 2;
      }
    }

    const blob = new Blob([buf], {type: 'audio/wav'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'loop_' + this.fileName.replace(/\.[^.]+$/, '') + '.wav';
    a.click();
  }
};

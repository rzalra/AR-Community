/* ========================================
   AR COMMUNITY — Audio Converter Page
   ======================================== */

const AudioConverterPage = {
  activeTab: 'youtube', // 'youtube' or 'local'
  ytUrl: '',
  ytFormat: 'mp3',
  isYtConverting: false,
  ytLog: '',

  // Local Converter State
  localFile: null,
  localFormat: 'mp3',
  isLocalConverting: false,
  localLog: '',
  convertedUrl: null,
  convertedName: '',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${this.renderBreadcrumbs()}
            ${this.renderHeader()}
            
            <div class="tool-tabs" style="display:flex; gap:12px; margin-bottom:var(--space-6); border-bottom:1px solid var(--color-border); padding-bottom:12px;">
              <button onclick="AudioConverterPage.setTab('youtube')" class="tab-btn ${this.activeTab === 'youtube' ? 'active' : ''}" style="background:none; border:none; color:${this.activeTab === 'youtube' ? 'var(--color-accent-red)' : 'var(--color-text-muted)'}; font-family:var(--font-heading); font-weight:bold; font-size:var(--text-sm); cursor:pointer; padding:6px 12px; transition:color 0.2s;">✨ YouTube Downloader</button>
              <button onclick="AudioConverterPage.setTab('local')" class="tab-btn ${this.activeTab === 'local' ? 'active' : ''}" style="background:none; border:none; color:${this.activeTab === 'local' ? 'var(--color-accent-red)' : 'var(--color-text-muted)'}; font-family:var(--font-heading); font-weight:bold; font-size:var(--text-sm); cursor:pointer; padding:6px 12px; transition:color 0.2s;">📁 Local File Converter</button>
            </div>

            <div class="tool-content-card" style="background:var(--gradient-card); border:1px solid var(--color-border); border-radius:var(--radius-lg); padding:var(--space-6);">
              ${this.activeTab === 'youtube' ? this.renderYtConverter() : this.renderLocalConverter()}
            </div>
          </div>
        </section>
      </div>
    `;
  },

  renderBreadcrumbs() {
    return `
      <div class="tool-breadcrumbs" style="display: flex; align-items: center; gap: 8px; font-family: var(--font-heading); font-size: 0.65rem; color: var(--color-text-muted); margin-bottom: var(--space-4); letter-spacing: var(--letter-spacing-wider);">
        <a href="#/home">🏠 HOME</a>
        <span>&gt;</span>
        <a href="#/tools">TOOLS</a>
        <span>&gt;</span>
        <span class="active">AUDIO CONVERTER</span>
      </div>
    `;
  },

  renderHeader() {
    return `
      <div class="tool-header" style="margin-bottom: var(--space-6); display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-full); margin-bottom: var(--space-3);">
            <span style="font-size: 0.7rem; color: var(--color-accent-red); font-weight: bold; letter-spacing: 0.05em;">🎵 AUDIO UTILITY</span>
          </div>
          <h1 style="font-size: var(--text-4xl); font-weight: var(--font-weight-black); margin-bottom: var(--space-2); line-height: 1.1;">
            Audio <span class="text-gradient" style="background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Converter</span>
          </h1>
          <p style="color: var(--color-text-secondary); font-size: var(--text-sm); line-height: var(--line-height-relaxed);">
            Unduh musik langsung dari YouTube menjadi file MP3/WAV, atau konversi file audio lokal kamu ke format lain tanpa server.
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="window.showToolGuide('audio-converter')" style="border-radius: 8px; margin-top: 12px; font-weight: bold; flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;">
          💻 Panduan & Tips
        </button>
      </div>
    `;
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  // ═══════════════════════════════════════
  // YOUTUBE TO AUDIO CONVERTER
  // ═══════════════════════════════════════
  renderYtConverter() {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 12px 0;">
        <h3 style="font-size:1.1rem; font-weight:900; margin-bottom:6px; font-family:var(--font-heading);">YouTube to Audio Downloader</h3>
        <p style="font-size:0.75rem; color:var(--color-text-muted); line-height:1.4; margin-bottom:20px;">
          Tempel link video YouTube (atau Shorts) di bawah ini untuk mengekstrak audionya secara instan dan mengunduhnya ke perangkat Anda.
        </p>

        <div style="display:flex; flex-direction:column; gap:16px;">
          <div>
            <label style="font-size:0.62rem; font-weight:bold; color:var(--color-text-secondary); text-transform:uppercase; display:block; margin-bottom:6px; letter-spacing:0.05em;">Link Video YouTube</label>
            <input type="text" id="yt-url-input" class="form-input" 
              placeholder="https://www.youtube.com/watch?v=..." 
              value="${this.ytUrl}"
              style="padding:12px; font-size:0.78rem; border-radius:8px;">
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:0.62rem; font-weight:bold; color:var(--color-text-secondary); text-transform:uppercase; display:block; margin-bottom:6px; letter-spacing:0.05em;">Format Output</label>
              <select id="yt-format-select" class="form-input" style="padding:10px; font-size:0.75rem; border-radius:8px; background:var(--color-bg-secondary);">
                <option value="mp3" ${this.ytFormat === 'mp3' ? 'selected' : ''}>MP3 (320kbps - Ukuran Kecil)</option>
                <option value="wav" ${this.ytFormat === 'wav' ? 'selected' : ''}>WAV (16-bit Lossless - Ukuran Besar)</option>
                <option value="ogg" ${this.ytFormat === 'ogg' ? 'selected' : ''}>OGG (High Quality - Roblox Friendly)</option>
                <option value="m4a" ${this.ytFormat === 'm4a' ? 'selected' : ''}>M4A (AAC)</option>
              </select>
            </div>
            <div style="display:flex; align-items:flex-end;">
              <button onclick="AudioConverterPage.convertYoutube()" class="btn btn-primary" style="width:100%; border-radius:8px; padding:12px; font-weight:bold; font-size:0.75rem;" ${this.isYtConverting ? 'disabled' : ''}>
                ${this.isYtConverting ? '⏳ Memproses...' : '⚡ CONVERT & DOWNLOAD'}
              </button>
            </div>
          </div>
        </div>

        ${this.ytLog ? `
          <div style="margin-top:24px; background:rgba(0,0,0,0.3); border:1px solid var(--color-border); border-radius:8px; padding:14px; font-family:monospace; font-size:0.68rem; line-height:1.5;">
            <div style="color:var(--color-text-muted); font-weight:bold; margin-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:4px;">STATUS LOGGER:</div>
            <div style="color:white; white-space:pre-wrap;">${this.ytLog}</div>
          </div>
        ` : ''}
      </div>
    `;
  },

  async convertYoutube() {
    const urlInput = document.getElementById('yt-url-input');
    const formatSelect = document.getElementById('yt-format-select');
    if (!urlInput) return;

    this.ytUrl = urlInput.value.trim();
    this.ytFormat = formatSelect ? formatSelect.value : 'mp3';

    if (!this.ytUrl) {
      alert('Silakan masukkan link video YouTube terlebih dahulu.');
      return;
    }

    this.isYtConverting = true;
    this.ytLog = `[SYSTEM] Menginisialisasi request konversi...\n[PARAMS] Target Format: ${this.ytFormat.toUpperCase()}`;
    this.render();

    try {
      // Use Cobalt Public API
      const cobaltUrl = 'https://api.cobalt.tools/api/json';
      this.ytLog += `\nMengirim request ke API server Cobalt...\nURL: ${this.ytUrl}`;
      this.render();

      const response = await fetch(cobaltUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: this.ytUrl,
          isAudioOnly: true,
          audioFormat: this.ytFormat,
          audioBitrate: "320"
        })
      });

      if (!response.ok) {
        throw new Error(`API HTTP ${response.status} Error`);
      }

      const resData = await response.json();
      if (resData.status === 'error') {
        throw new Error(resData.text || 'Gagal mengekstrak audio dari link tersebut');
      }

      if (resData.url) {
        this.ytLog += `\n\n🎉 SUKSES! Audio berhasil diekstrak.\n[DOWNLOAD] URL: ${resData.url.substring(0, 60)}...\n\nMengunduh file secara otomatis ke browser Anda...`;
        this.render();

        // Create download tag to force download
        const a = document.createElement('a');
        a.href = resData.url;
        a.target = '_blank';
        a.download = `youtube_audio.${this.ytFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        throw new Error('API server tidak mengembalikan URL unduhan.');
      }
    } catch (err) {
      console.error(err);
      this.ytLog += `\n\n❌ ERROR: ${err.message}\n\nTips: Pastikan URL YouTube valid (contoh: https://www.youtube.com/watch?v=dQw4w9WgXcQ). Beberapa link regional mungkin dibatasi oleh API server.`;
    } finally {
      this.isYtConverting = false;
      this.render();
    }
  },

  // ═══════════════════════════════════════
  // LOCAL FILE CONVERTER
  // ═══════════════════════════════════════
  renderLocalConverter() {
    return `
      <div style="max-width: 600px; margin: 0 auto; padding: 12px 0;">
        <h3 style="font-size:1.1rem; font-weight:900; margin-bottom:6px; font-family:var(--font-heading);">Local File Converter</h3>
        <p style="font-size:0.75rem; color:var(--color-text-muted); line-height:1.4; margin-bottom:20px;">
          Pilih file audio lokal dari komputer kamu (WAV, MP3, OGG, FLAC, M4A) dan konversi formatnya secara instan di dalam browser secara offline.
        </p>

        <div style="border:2px dashed var(--color-border); border-radius:10px; padding:32px 16px; text-align:center; background:rgba(255,255,255,0.01); cursor:pointer; transition:all 0.2s; margin-bottom:20px;" 
          ondragover="event.preventDefault()" 
          ondrop="AudioConverterPage.handleLocalDrop(event)" 
          onclick="document.getElementById('local-audio-input').click()">
          <span style="font-size:2.5rem; display:block; margin-bottom:8px;">📁</span>
          <span style="font-size:0.78rem; font-weight:bold; color:white;" id="local-upload-text">
            ${this.localFile ? `📄 ${this.localFile.name} (${(this.localFile.size / 1048576).toFixed(2)} MB)` : 'Pilih File Audio'}
          </span>
          <span style="font-size:0.62rem; color:var(--color-text-muted); display:block; margin-top:4px;">
            ${this.localFile ? 'Klik untuk mengganti file' : 'Klik atau seret file audio di sini'}
          </span>
          <input type="file" id="local-audio-input" style="display:none;" accept="audio/*" onchange="AudioConverterPage.handleLocalFile(this.files)">
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:20px;">
          <div>
            <label style="font-size:0.62rem; font-weight:bold; color:var(--color-text-secondary); text-transform:uppercase; display:block; margin-bottom:6px; letter-spacing:0.05em;">Format Target</label>
            <select id="local-format-select" class="form-input" style="padding:10px; font-size:0.75rem; border-radius:8px; background:var(--color-bg-secondary);">
              <option value="mp3" ${this.localFormat === 'mp3' ? 'selected' : ''}>MP3 (Compressed - Ringan)</option>
              <option value="wav" ${this.localFormat === 'wav' ? 'selected' : ''}>WAV (Uncompressed PCM - Lossless)</option>
            </select>
          </div>
          <div style="display:flex; align-items:flex-end;">
            <button onclick="AudioConverterPage.convertLocalFile()" class="btn btn-primary" style="width:100%; border-radius:8px; padding:12px; font-weight:bold; font-size:0.75rem;" ${this.isLocalConverting || !this.localFile ? 'disabled' : ''}>
              ${this.isLocalConverting ? '⏳ Mengonversi...' : '⚡ KONVERSI SEKARANG'}
            </button>
          </div>
        </div>

        ${this.localLog ? `
          <div style="margin-top:24px; background:rgba(0,0,0,0.3); border:1px solid var(--color-border); border-radius:8px; padding:14px; font-family:monospace; font-size:0.68rem; line-height:1.5;">
            <div style="color:var(--color-text-muted); font-weight:bold; margin-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:4px;">STATUS LOGGER:</div>
            <div style="color:white; white-space:pre-wrap;">${this.localLog}</div>
          </div>
        ` : ''}

        ${this.convertedUrl ? `
          <div style="margin-top:20px; background:rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.15); border-radius:8px; padding:16px; text-align:center; animation:fadeInUp 300ms ease;">
            <div style="font-size:1.5rem; margin-bottom:6px;">🎉</div>
            <h4 style="font-size:0.78rem; font-weight:bold; color:var(--color-accent-green); margin-bottom:4px;">KONVERSI BERHASIL!</h4>
            <p style="font-size:0.65rem; color:var(--color-text-secondary); margin-bottom:12px;">File dikonversi ke format ${this.localFormat.toUpperCase()}</p>
            <div style="display:flex; justify-content:center; gap:8px;">
              <audio src="${this.convertedUrl}" controls style="height:32px; filter:invert(0.9) hue-rotate(180deg); outline:none;"></audio>
              <a href="${this.convertedUrl}" download="${this.convertedName}" class="btn btn-primary btn-sm" style="border-radius:4px; display:inline-flex; align-items:center;">📥 Download</a>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  handleLocalFile(files) {
    if (files.length > 0) {
      this.localFile = files[0];
      this.convertedUrl = null;
      this.convertedName = '';
      this.localLog = '';
      this.render();
    }
  },

  handleLocalDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      this.handleLocalFile(e.dataTransfer.files);
    }
  },

  async convertLocalFile() {
    if (!this.localFile) return;
    const formatSelect = document.getElementById('local-format-select');
    this.localFormat = formatSelect ? formatSelect.value : 'mp3';

    this.isLocalConverting = true;
    this.convertedUrl = null;
    this.convertedName = '';
    this.localLog = `[SYSTEM] Memulai pemrosesan file audio lokal...\n[FILE] Nama: ${this.localFile.name}\n[FILE] Ukuran: ${(this.localFile.size / 1048576).toFixed(2)} MB`;
    this.render();

    try {
      this.localLog += '\n[DECODE] Membaca data biner audio...';
      this.render();

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const arrayBuffer = await this.localFile.arrayBuffer();
      
      this.localLog += '\n[DECODE] Mendekode data audio ke saluran PCM...';
      this.render();
      const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      this.localLog += `\n[DECODE] Sukses: ${decodedBuffer.numberOfChannels} saluran, sample rate ${decodedBuffer.sampleRate}Hz, durasi ${decodedBuffer.duration.toFixed(1)}s`;
      this.localLog += `\n[ENCODE] Mulai konversi ke format ${this.localFormat.toUpperCase()}...`;
      this.render();

      let outputBlob;
      if (this.localFormat === 'mp3') {
        if (typeof lamejs === 'undefined') {
          throw new Error('Pustaka lamejs MP3 encoder tidak terunduh. Harap cek koneksi internet.');
        }
        outputBlob = this.bufferToMp3(decodedBuffer);
      } else {
        outputBlob = this.bufferToWav(decodedBuffer);
      }

      this.localLog += `\n[ENCODE] Sukses! File biner target selesai dibentuk.`;
      this.localLog += `\n[ENCODE] Ukuran baru: ${(outputBlob.size / 1048576).toFixed(2)} MB`;
      this.render();

      this.convertedUrl = URL.createObjectURL(outputBlob);
      this.convertedName = `converted_${this.localFile.name.replace(/\.[^/.]+$/, '')}.${this.localFormat}`;
      audioCtx.close();

    } catch (err) {
      console.error(err);
      this.localLog += `\n\n❌ ERROR: ${err.message}`;
    } finally {
      this.isLocalConverting = false;
      this.render();
    }
  },

  // ── Helpers ──
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

    const bufferLength = result.length * 2;
    const fileLength = bufferLength + 44;
    const arrayBuffer = new ArrayBuffer(fileLength);
    const view = new DataView(arrayBuffer);

    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + bufferLength, true);
    this.writeString(view, 8, 'WAVE');
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numOfChan, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numOfChan * (bitDepth / 8), true);
    view.setUint16(32, numOfChan * (bitDepth / 8), true);
    view.setUint16(34, bitDepth, true);
    this.writeString(view, 36, 'data');
    view.setUint32(40, bufferLength, true);

    this.floatTo16BitPCM(view, 44, result);

    return new Blob([view], { type: 'audio/wav' });
  },

  bufferToMp3(buffer, kbps = 128) {
    const numOfChan = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const mp3encoder = new lamejs.Mp3Encoder(numOfChan, sampleRate, kbps);
    const mp3Data = [];

    const floatTo16Bit = (float32Array) => {
      const len = float32Array.length;
      const int16Array = new Int16Array(len);
      for (let i = 0; i < len; i++) {
        let s = Math.max(-1, Math.min(1, float32Array[i]));
        int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
      return int16Array;
    };

    if (numOfChan === 2) {
      const leftPCM = floatTo16Bit(buffer.getChannelData(0));
      const rightPCM = floatTo16Bit(buffer.getChannelData(1));
      
      const sampleBlockSize = 1152;
      for (let i = 0; i < leftPCM.length; i += sampleBlockSize) {
        const leftChunk = leftPCM.subarray(i, i + sampleBlockSize);
        const rightChunk = rightPCM.subarray(i, i + sampleBlockSize);
        const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }
      }
    } else {
      const monoPCM = floatTo16Bit(buffer.getChannelData(0));
      const sampleBlockSize = 1152;
      for (let i = 0; i < monoPCM.length; i += sampleBlockSize) {
        const monoChunk = monoPCM.subarray(i, i + sampleBlockSize);
        const mp3buf = mp3encoder.encodeBuffer(monoChunk);
        if (mp3buf.length > 0) {
          mp3Data.push(mp3buf);
        }
      }
    }

    const mp3buf = mp3encoder.flush();
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }

    return new Blob(mp3Data, { type: 'audio/mp3' });
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
  }
};

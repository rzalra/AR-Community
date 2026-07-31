/* ========================================
   AR COMMUNITY — Video Converter & Compressor Page
   ======================================== */

const VideoConverterPage = {
  videoFile: null,
  targetResolution: '480p',
  targetQuality: 'medium', // 'low', 'medium', 'high'
  isCompressing: false,
  compressionProgress: 0,
  logText: '',
  compressedUrl: null,
  compressedName: '',
  compressedSize: 0,

  // Helper variables for processing
  videoEl: null,
  canvasEl: null,
  ctx: null,
  mediaRecorder: null,
  recordedChunks: [],
  animationId: null,

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page" style="padding: var(--space-10) 0;">
          <div class="container">
            ${this.renderBreadcrumbs()}
            ${this.renderHeader()}
            
            <div class="tool-content-card" style="background: var(--gradient-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6);">
              <div style="max-width: 600px; margin: 0 auto; padding: 12px 0;">
                <h3 style="font-size:1.1rem; font-weight:900; margin-bottom:6px; font-family:var(--font-heading);">Video Compressor Pro</h3>
                <p style="font-size:0.75rem; color:var(--color-text-muted); line-height:1.4; margin-bottom:20px;">
                  Perkecil ukuran file video Anda (MP4, WebM) secara instan. Tool ini melakukan kompresi resolusi dan bitrate langsung di dalam browser secara offline tanpa mengunggah file ke server.
                </p>

                <!-- File Uploader -->
                <div style="border:2px dashed var(--color-border); border-radius:10px; padding:32px 16px; text-align:center; background:rgba(255,255,255,0.01); cursor:pointer; transition:all 0.2s; margin-bottom:20px;" 
                  ondragover="event.preventDefault()" 
                  ondrop="VideoConverterPage.handleDrop(event)" 
                  onclick="document.getElementById('video-file-input').click()">
                  <span style="font-size:2.5rem; display:block; margin-bottom:8px;">📹</span>
                  <span style="font-size:0.78rem; font-weight:bold; color:white;" id="video-upload-text">
                    ${this.videoFile ? `📄 ${this.videoFile.name} (${(this.videoFile.size / 1048576).toFixed(2)} MB)` : 'Pilih File Video'}
                  </span>
                  <span style="font-size:0.62rem; color:var(--color-text-muted); display:block; margin-top:4px;">
                    ${this.videoFile ? 'Klik untuk mengganti video' : 'Klik atau seret file video ke sini'}
                  </span>
                  <input type="file" id="video-file-input" style="display:none;" accept="video/*" onchange="VideoConverterPage.handleFile(this.files)">
                </div>

                <!-- Parameters -->
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:20px;">
                  <div>
                    <label style="font-size:0.62rem; font-weight:bold; color:var(--color-text-secondary); text-transform:uppercase; display:block; margin-bottom:6px; letter-spacing:0.05em;">Resolusi Target</label>
                    <select id="vid-res-select" class="form-input" style="padding:10px; font-size:0.75rem; border-radius:8px; background:var(--color-bg-secondary);">
                      <option value="360p" ${this.targetResolution === '360p' ? 'selected' : ''}>360p (Ukuran Sangat Kecil)</option>
                      <option value="480p" ${this.targetResolution === '480p' ? 'selected' : ''}>480p (Rekomendasi Hemat Size)</option>
                      <option value="720p" ${this.targetResolution === '720p' ? 'selected' : ''}>720p (HD Ringan)</option>
                    </select>
                  </div>
                  <div>
                    <label style="font-size:0.62rem; font-weight:bold; color:var(--color-text-secondary); text-transform:uppercase; display:block; margin-bottom:6px; letter-spacing:0.05em;">Kualitas / Bitrate</label>
                    <select id="vid-quality-select" class="form-input" style="padding:10px; font-size:0.75rem; border-radius:8px; background:var(--color-bg-secondary);">
                      <option value="low" ${this.targetQuality === 'low' ? 'selected' : ''}>Rendah (~300kbps - Hemat Memori)</option>
                      <option value="medium" ${this.targetQuality === 'medium' ? 'selected' : ''}>Sedang (~800kbps - Rekomendasi)</option>
                      <option value="high" ${this.targetQuality === 'high' ? 'selected' : ''}>Tinggi (~1500kbps - Hasil Tajam)</option>
                    </select>
                  </div>
                </div>

                <button onclick="VideoConverterPage.startCompression()" class="btn btn-primary" style="width:100%; border-radius:8px; padding:12px; font-weight:bold; font-size:0.75rem; display:flex; justify-content:center; align-items:center; gap:8px;" ${this.isCompressing || !this.videoFile ? 'disabled' : ''}>
                  ${this.isCompressing ? '⏳ Sedang Mengompres...' : '⚡ KOMPRES VIDEO'}
                </button>

                <!-- Processing UI -->
                ${this.isCompressing ? `
                  <div style="margin-top:20px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:8px; padding:16px;">
                    <div style="display:flex; justify-content:space-between; font-size:0.7rem; font-weight:bold; margin-bottom:6px;">
                      <span>Progress Kompresi</span>
                      <span>${this.compressionProgress}%</span>
                    </div>
                    <div style="width:100%; height:6px; background:var(--color-border); border-radius:3px; overflow:hidden; margin-bottom:12px;">
                      <div style="width:${this.compressionProgress}%; height:100%; background:var(--color-accent-cyan); transition:width 0.2s; border-radius:3px;"></div>
                    </div>
                    <div style="font-size:0.6rem; color:var(--color-text-muted); text-align:center;">
                      * Harap jangan tutup tab ini selama proses kompresi berjalan.
                    </div>
                  </div>
                ` : ''}

                <!-- Status log -->
                ${this.logText ? `
                  <div style="margin-top:24px; background:rgba(0,0,0,0.3); border:1px solid var(--color-border); border-radius:8px; padding:14px; font-family:monospace; font-size:0.68rem; line-height:1.5;">
                    <div style="color:var(--color-text-muted); font-weight:bold; margin-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:4px;">STATUS LOGGER:</div>
                    <div style="color:white; white-space:pre-wrap;">${this.logText}</div>
                  </div>
                ` : ''}

                <!-- Compressed Output -->
                ${this.compressedUrl ? `
                  <div style="margin-top:20px; background:rgba(34,197,94,0.06); border:1px solid rgba(34,197,94,0.15); border-radius:8px; padding:16px; text-align:center; animation:fadeInUp 300ms ease;">
                    <div style="font-size:1.5rem; margin-bottom:6px;">🎉</div>
                    <h4 style="font-size:0.78rem; font-weight:bold; color:var(--color-accent-green); margin-bottom:4px;">KOMPRESI BERHASIL!</h4>
                    <p style="font-size:0.65rem; color:var(--color-text-secondary); margin-bottom:12px;">
                      Ukuran Asli: <strong>${(this.videoFile.size / 1048576).toFixed(2)} MB</strong> <br>
                      Ukuran Baru: <strong style="color:var(--color-accent-cyan);">${(this.compressedSize / 1048576).toFixed(2)} MB</strong> (Menghemat ${((1 - (this.compressedSize / this.videoFile.size)) * 100).toFixed(0)}%)
                    </p>
                    <div style="display:flex; flex-direction:column; align-items:center; gap:12px;">
                      <video src="${this.compressedUrl}" controls style="width:100%; max-width:400px; border-radius:8px; border:1px solid var(--color-border); background:black; outline:none;"></video>
                      <a href="${this.compressedUrl}" download="${this.compressedName}" class="btn btn-primary btn-sm" style="border-radius:4px; display:inline-flex; align-items:center; padding:8px 24px; font-weight:bold;">📥 Download Video Kompresi</a>
                    </div>
                  </div>
                ` : ''}
              </div>
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
        <span class="active">VIDEO CONVERTER & COMPRESSOR</span>
      </div>
    `;
  },

  renderHeader() {
    return `
      <div class="tool-header" style="margin-bottom: var(--space-6); display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
        <div>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: var(--radius-full); margin-bottom: var(--space-3);">
            <span style="font-size: 0.7rem; color: var(--color-accent-red); font-weight: bold; letter-spacing: 0.05em;">📹 VIDEO UTILITY</span>
          </div>
          <h1 style="font-size: var(--text-4xl); font-weight: var(--font-weight-black); margin-bottom: var(--space-2); line-height: 1.1;">
            Video <span class="text-gradient" style="background: linear-gradient(135deg, var(--color-accent-cyan), var(--color-accent-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Compressor</span>
          </h1>
          <p style="color: var(--color-text-secondary); font-size: var(--text-sm); line-height: var(--line-height-relaxed);">
            Kompres ukuran file video kamu agar lebih ringan untuk diunggah ke Discord, email, atau web portal lainnya.
          </p>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="window.showToolGuide('video-converter')" style="border-radius: 8px; margin-top: 12px; font-weight: bold; flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;">
          💻 Panduan & Tips
        </button>
      </div>
    `;
  },

  handleFile(files) {
    if (files.length > 0) {
      this.videoFile = files[0];
      this.compressedUrl = null;
      this.compressedName = '';
      this.compressedSize = 0;
      this.logText = '';
      this.compressionProgress = 0;
      this.render();
    }
  },

  handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      this.handleFile(e.dataTransfer.files);
    }
  },

  async startCompression() {
    if (!this.videoFile || this.isCompressing) return;

    this.targetResolution = document.getElementById('vid-res-select').value;
    this.targetQuality = document.getElementById('vid-quality-select').value;

    this.isCompressing = true;
    this.compressedUrl = null;
    this.compressedName = '';
    this.compressedSize = 0;
    this.compressionProgress = 0;
    this.logText = `[SYSTEM] Memulai proses kompresi video...\n[FILE] Nama: ${this.videoFile.name}\n[FILE] Ukuran awal: ${(this.videoFile.size / 1048576).toFixed(2)} MB`;
    this.render();

    try {
      // 1. Map target settings
      const resWidths = { '360p': 640, '480p': 854, '720p': 1280 };
      const resHeights = { '360p': 360, '480p': 480, '720p': 720 };
      const bitrates = { 'low': 300000, 'medium': 800000, 'high': 1500000 };

      const targetW = resWidths[this.targetResolution];
      const targetH = resHeights[this.targetResolution];
      const targetBitrate = bitrates[this.targetQuality];

      this.logText += `\n[TARGET] Resolusi: ${targetW}x${targetH}, Bitrate: ${(targetBitrate / 1000).toFixed(0)}kbps`;
      this.render();

      // 2. Load video in an offscreen video element
      this.logText += `\n[DECODE] Memuat file video ke memori...`;
      this.render();

      const videoUrl = URL.createObjectURL(this.videoFile);
      this.videoEl = document.createElement('video');
      this.videoEl.src = videoUrl;
      this.videoEl.muted = true; // necessary for auto-play triggers in some browsers
      this.videoEl.playsInline = true;

      await new Promise((resolve, reject) => {
        this.videoEl.onloadedmetadata = () => resolve();
        this.videoEl.onerror = (e) => reject(new Error('Gagal membaca metadata video.'));
      });

      this.logText += `\n[DECODE] Metadata termuat. Durasi video: ${this.videoEl.duration.toFixed(1)} detik. Dimensi asli: ${this.videoEl.videoWidth}x${this.videoEl.videoHeight}`;
      this.render();

      // 3. Create canvas and context
      this.canvasEl = document.createElement('canvas');
      this.canvasEl.width = targetW;
      this.canvasEl.height = targetH;
      this.ctx = this.canvasEl.getContext('2d');

      // 4. Capture Canvas stream and audio
      this.logText += `\n[STREAM] Membentuk stream perekaman canvas...`;
      this.render();

      const fps = 24;
      const canvasStream = this.canvasEl.captureStream(fps);

      // Extract Audio using AudioContext to pass audio along to compressed file
      this.logText += `\n[AUDIO] Mengekstrak jalur audio...`;
      this.render();
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaElementSource(this.videoEl);
        const dest = audioCtx.createMediaStreamDestination();
        source.connect(dest);
        source.connect(audioCtx.destination); // output audio to speakers as well during play
        
        const audioTrack = dest.stream.getAudioTracks()[0];
        if (audioTrack) {
          canvasStream.addTrack(audioTrack);
          this.logText += `\n[AUDIO] Jalur audio berhasil disematkan.`;
        }
      } catch (audioErr) {
        console.warn('Audio capture failed, video might not have audio or blocked by CORS:', audioErr);
        this.logText += `\n[AUDIO] Peringatan: Audio gagal disematkan (Video mungkin tidak bersuara).`;
      }
      this.render();

      // 5. Setup MediaRecorder
      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }

      this.logText += `\n[RECORDER] Menggunakan MimeType: ${mimeType}`;
      this.render();

      this.recordedChunks = [];
      this.mediaRecorder = new MediaRecorder(canvasStream, {
        mimeType: mimeType,
        videoBitsPerSecond: targetBitrate
      });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      // 6. Start drawing and playing
      this.mediaRecorder.start();
      
      // Speed up processing by setting playbackRate to 2.0 (compresses 2x faster!)
      this.videoEl.playbackRate = 2.0;
      this.videoEl.play();

      this.logText += `\n[PROCESS] Perekaman dimulai. Mengompresi frame (2x kecepatan)...`;
      this.render();

      const drawLoop = () => {
        if (this.videoEl.paused || this.videoEl.ended) return;

        // Draw resized frame
        this.ctx.drawImage(this.videoEl, 0, 0, targetW, targetH);

        // Update progress
        const currentProgress = Math.min(100, Math.floor((this.videoEl.currentTime / this.videoEl.duration) * 100));
        if (currentProgress !== this.compressionProgress) {
          this.compressionProgress = currentProgress;
          this.render();
        }

        this.animationId = requestAnimationFrame(drawLoop);
      };

      this.videoEl.onplay = () => {
        drawLoop();
      };

      // Wait for playback end
      await new Promise((resolve) => {
        this.videoEl.onended = () => {
          cancelAnimationFrame(this.animationId);
          this.mediaRecorder.stop();
          this.logText += `\n[RECORDER] Perekaman selesai. Memproses data biner...`;
          this.render();
          
          this.mediaRecorder.onstop = () => {
            resolve();
          };
        };
      });

      // 7. Output compressed blob
      const compressedBlob = new Blob(this.recordedChunks, { type: mimeType });
      this.compressedUrl = URL.createObjectURL(compressedBlob);
      this.compressedName = `compressed_${this.videoFile.name.replace(/\.[^/.]+$/, '')}.webm`;
      this.compressedSize = compressedBlob.size;

      this.logText += `\n[SUCCESS] Proses kompresi selesai!`;
      this.render();

      // Cleanup URL object
      URL.revokeObjectURL(videoUrl);

    } catch (err) {
      console.error(err);
      this.logText += `\n\n❌ ERROR: ${err.message}`;
    } finally {
      this.isCompressing = false;
      this.render();
    }
  }
};

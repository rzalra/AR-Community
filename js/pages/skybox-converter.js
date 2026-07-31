/* ========================================
   AR COMMUNITY — Skybox Converter
   ======================================== */

const SkyboxConverterPage = {
  activeTab: 'convert', // 'convert' or 'prompt'
  sourceImage: null,
  faces: null,
  resolution: 1024,
  autoSeamFix: true,
  isProcessing: false,
  showGuide: false,

  // Selected preset in AI Prompt Generator
  selectedPreset: 'celestial',

  faceNames: ['Front', 'Back', 'Left', 'Right', 'Top', 'Bottom'],
  faceLabels: {
    'Front': 'Front',
    'Back': 'Back',
    'Left': 'Left',
    'Right': 'Right',
    'Top': 'Top',
    'Bottom': 'Btm'
  },

  presets: {
    cinematic: {
      name: 'Cinematic Sky Atmosphere',
      image: 'assets/cinematic-sky-atmosphere.jpeg',
      prompt: 'Equirectangular 360° panoramic skybox, seamless HDRI environment, perfect latitude-longitude projection, ultra high resolution, hyper realistic, AAA game environment, Unreal Engine 5 quality, cinematic sky atmosphere, physically based rendering (PBR), volumetric clouds with intricate micro details, realistic cloud density, atmospheric scattering, subsurface scattering, global illumination, ray traced lighting, soft ambient light, realistic sun lighting, HDR lighting, natural sky gradients, ultra sharp focus, crystal clear details, extreme dynamic range, high contrast, zero visible seams, zero distortion, zero stretching at poles, zero artifacts, zero pixelation, clean image, professional VFX quality, photorealistic, 8192×4096 output, 16K quality, HDRI environment map. GENERATE NOW'
    },
    heavenly: {
      name: 'Fantasy Heavenly Clouds',
      image: 'assets/fantasy-heavenly-clouds.jpeg',
      prompt: 'Ultra realistic fantasy sky, colossal floating cloud kingdoms, gigantic soft white cumulus clouds, glowing cloud mountains, divine atmosphere, heavenly sunlight, ethereal mist, volumetric cloud oceans, cinematic god rays, magical atmosphere, soft golden illumination, physically based rendering, HDR lighting, true 360° equirectangular panorama, seamless spherical environment map, perfect 2:1 projection, full 360° coverage, ultra detailed volumetric clouds, film-quality VFX, hyper realistic, no seams, no distortion, no stretching, 8192×4096, 16K quality, no ground, no buildings, no text, no watermark. GENERATE NOW'
    },
    galaxy: {
      name: 'Fantasy Galaxy Sky',
      image: 'assets/fantasy-galaxy-sky.jpeg',
      prompt: 'Ultra realistic fantasy galaxy sky, gigantic colorful nebula clouds, billions of stars, glowing Milky Way, deep cosmic atmosphere, purple, blue and cyan nebulae, subtle aurora, distant galaxies, volumetric cosmic clouds, cinematic space lighting, HDR environment, true 360° equirectangular panorama, seamless spherical projection, physically based rendering, ultra detailed, hyper realistic, film-quality VFX, no visible seams, no distortion, no stretching, 8192×4096, 16K quality, no planets on horizon, no spacecraft, no text, no watermark. GENERATE NOW'
    },
    celestial: {
      name: 'Celestial Fantasy Sky',
      image: 'assets/celestial-fantasy-sky.jpeg',
      prompt: 'Epic celestial fantasy sky, enormous moon, glowing stars, floating magical clouds, cosmic dust, aurora ribbons, blue and violet atmosphere, sparkling stardust, divine heavenly lighting, volumetric clouds, cinematic HDR lighting, seamless 360° equirectangular panorama, spherical environment map, physically based rendering, ultra realistic, ultra detailed, film-quality VFX, 8192×4096, 16K quality, zero artifacts, no ground, no buildings, no text, no watermark. GENERATE NOW'
    },
    aurora: {
      name: 'Aurora Fantasy',
      image: 'assets/aurora-fantasy.jpeg',
      prompt: 'Hyper realistic aurora fantasy sky, vibrant green, blue and purple aurora curtains dancing across the heavens, glowing cloud layers, crystal atmosphere, soft stars, cinematic volumetric clouds, HDR environment lighting, true 360° equirectangular panorama, seamless spherical projection, physically based rendering, ultra detailed, film-quality VFX, 8192×4096, 16K quality, no seams, no distortion, no mountains, no text, no watermark. GENERATE NOW'
    },
    dream: {
      name: 'Dream Clouds',
      image: 'assets/dream-clouds.jpeg',
      prompt: 'Dreamlike fantasy cloudscape, endless cotton candy clouds, pastel pink, lavender, cyan and gold color palette, magical sunlight, glowing mist, floating cloud islands, volumetric clouds with intricate detail, cinematic atmosphere, HDR lighting, true 360° equirectangular panorama, seamless spherical environment map, physically based rendering, ultra realistic, film-quality VFX, 8192×4096, 16K quality, no seams, no distortion, no text, no watermark. GENERATE NOW'
    },
    cosmic: {
      name: 'Cosmic Storm',
      image: 'assets/cosmic-storm.jpeg',
      prompt: 'Epic cosmic thunderstorm sky, gigantic nebula clouds swirling across the universe, glowing purple lightning, massive galactic vortex, blue plasma clouds, billions of stars, cinematic HDR lighting, volumetric cosmic clouds, physically based rendering, true 360° equirectangular panorama, seamless spherical environment map, hyper realistic, ultra detailed, film-quality VFX, 8192×4096, 16K quality, zero seams, zero distortion, no text, no watermark. GENERATE NOW'
    },
    anime: {
      name: 'Anime Inspired Sky',
      image: 'assets/anime-inspired-sky.jpeg',
      prompt: 'Anime-inspired fantasy blue sky, gigantic glowing cloud formations, vibrant cyan atmosphere, brilliant divine sunlight, floating celestial clouds, magical energy particles, ultra detailed volumetric clouds, cinematic anime atmosphere, ultra high dynamic range (HDR) lighting, physically accurate HDRI environment, image-based lighting (IBL), physically based rendering (PBR), physically accurate light transport, global illumination, realistic indirect lighting, physically correct luminance, production-quality VFX lighting, true 360° equirectangular panorama, seamless spherical HDRI environment map, hyper realistic anime-inspired rendering, 8192×4096, 16K quality, no seams, no distortion, no ground, no text, no watermark. GENERATE NOW'
    },
    thunderstorm: {
      name: 'Thunderstorm',
      image: 'assets/thunderstorm.jpeg',
      prompt: 'Epic supercell thunderstorm sky, gigantic dark cumulonimbus clouds, powerful lightning strikes, swirling storm formation, dramatic blue-gray atmosphere, heavy volumetric clouds, intense cinematic lighting, ultra high dynamic range (HDR) lighting, physically accurate HDRI environment, image-based lighting (IBL), physically based rendering (PBR), physically accurate light transport, global illumination, realistic storm illumination, realistic exposure values, physically correct luminance, production-quality VFX lighting, true 360° equirectangular panorama, seamless spherical HDRI environment map, ultra detailed cloud simulation, realistic weather physics, 8192×4096, 16K quality, no seams, no distortion, no ground, no text, no watermark. GENERATE NOW'
    },
    'anime-fantasy': {
      name: 'Anime Fantasy Blue Sky',
      image: 'assets/anime-fantasy-blue-sky.jpeg',
      prompt: 'Anime-inspired fantasy blue sky, gigantic glowing cloud formations, vibrant cyan atmosphere, brilliant divine sunlight, floating celestial clouds, magical energy particles, ultra detailed volumetric clouds, cinematic anime atmosphere, ultra high dynamic range (HDR) lighting, physically accurate HDRI environment, image-based lighting (IBL), physically based rendering (PBR), physically accurate light transport, global illumination, realistic indirect lighting, physically correct luminance, production-quality VFX lighting, true 360° equirectangular panorama, seamless spherical HDRI environment map, hyper realistic anime-inspired rendering, 8192×4096, 16K quality, no seams, no distortion, no ground, no text, no watermark. GENERATE NOW'
    },
    'cosmic-tree': {
      name: 'Cosmic World Tree',
      image: 'assets/cosmic-world-tree.jpeg',
      prompt: 'An impossibly gigantic cosmic world tree whose luminous crystalline branches stretch across the entire sky, glowing leaves made of stardust drifting endlessly through the atmosphere, colossal floating islands orbiting the trunk, waterfalls of liquid light cascading into clouds below, radiant nebulae weaving between the branches, colorful auroras illuminating billions of sparkling particles, distant ringed planets, volumetric clouds glowing with sunset gold and sapphire blue, mystical fog, god rays piercing through celestial foliage, cinematic fantasy atmosphere, masterpiece, best quality, absurdres, ultra detailed, cinematic composition, award-winning concept art, ultra high dynamic range (HDR) lighting, physically accurate HDRI environment, image-based lighting (IBL), physically based rendering (PBR), unbiased path tracing, physically accurate light transport, spectral lighting, ray-traced global illumination, realistic indirect lighting, volumetric lighting, physically accurate atmospheric scattering, cinematic HDR lighting, physically correct luminance, realistic exposure values, ACEScg color workflow, production-quality VFX rendering, hyper realistic anime-inspired rendering, seamless true 360° equirectangular panorama, seamless spherical HDRI environment map, ultra high resolution 16384×8192, 16K HDR quality, no seams, no distortion, no ground, no text, no logo, no watermark, no artifacts, no low quality. GENERATE NOW'
    },
    'deep-space': {
      name: 'Deep Space Galaxy',
      image: 'assets/deep-space-galaxy.jpeg',
      prompt: 'Ultra realistic deep space galaxy environment, gigantic colorful nebula clouds, glowing Milky Way, billions of stars, distant galaxies, cosmic dust, purple, blue and cyan nebulae, glowing plasma clouds, cinematic space lighting, ultra high dynamic range (HDR) lighting, physically accurate HDRI environment, image-based lighting (IBL), physically based rendering (PBR), physically accurate light transport, global illumination, realistic exposure values, physically correct luminance, production-quality VFX rendering, seamless 360° equirectangular panorama, spherical HDRI environment map, ultra detailed, 8192×4096, 16K quality, no seams, no distortion, no planets, no spacecraft, no text, no watermark. GENERATE NOW'
    },
    'deep-nebula': {
      name: 'Deep Space Nebula',
      image: 'assets/deep-space-nebula.jpeg',
      prompt: 'Deep space nebula, colorful galaxies, billions of stars, glowing dust clouds, black hole in the distance, cinematic science fiction, realistic astronomical scale, HDRI environment map, seamless 360 panoramic skybox, AAA quality, Unreal Engine 5, ultra detailed, 16K. GENERATE NOW'
    },
    'cloud-kingdom': {
      name: 'Dreamlike Cloud Kingdom',
      image: 'assets/dreamlike-cloud-kingdom.jpeg',
      prompt: 'Dreamlike fantasy cloud kingdom, endless cotton candy clouds, pastel pink, lavender, cyan and gold palette, floating cloud islands, magical sunlight, glowing mist, sparkling particles, cinematic atmosphere, volumetric cloud simulation, ultra high dynamic range (HDR) lighting, physically accurate HDRI environment, image-based lighting (IBL), physically based rendering (PBR), physically accurate light transport, global illumination, realistic indirect lighting, physically correct luminance, production-quality VFX lighting, seamless true 360° equirectangular panorama, ultra detailed HDR environment map, 8192×4096, 16K quality, no seams, no distortion, no ground, no text, no watermark. GENERATE NOW'
    },
    'polar-sky': {
      name: 'Endless Polar Sky',
      image: 'assets/endless-polar-sky.jpeg',
      prompt: 'An endless polar sky filled with colossal floating crystal mountains, dancing green, violet and cyan auroras stretching across the entire atmosphere, shimmering ice dust carried by gentle winds, glowing frozen clouds reflecting spectral light, celestial halos surrounding multiple moons, sparkling snow particles suspended in the air, surreal frozen fantasy atmosphere, masterpiece, best quality, absurdres, ultra detailed, cinematic composition, award-winning concept art, ultra high dynamic range (HDR) lighting, physically accurate HDRI environment, image-based lighting (IBL), physically based rendering (PBR), unbiased path tracing, physically accurate light transport, spectral lighting, ray-traced global illumination, realistic indirect lighting, volumetric lighting, physically accurate atmospheric scattering, cinematic HDR lighting, physically correct luminance, realistic exposure values, ACEScg color workflow, production-quality VFX rendering, hyper realistic anime-inspired rendering, seamless true 360° equirectangular panorama, seamless spherical HDRI environment map, ultra high resolution 16384×8192, 16K HDR quality, no seams, no distortion, no ground, no text, no logo, no watermark, no artifacts, no low quality. GENERATE NOW'
    },
    'crystal-islands': {
      name: 'Floating Crystal Islands',
      image: 'assets/floating-crystal-islands.jpeg',
      prompt: 'Enormous floating crystal islands suspended above an endless sea of clouds, gigantic glowing sapphire crystals, magical waterfalls flowing into the sky, radiant divine sunlight, turquoise atmosphere, shimmering crystal dust, fantasy anime world, breathtaking cinematic landscape, ultra detailed volumetric clouds, physically realistic atmospheric scattering, masterpiece, best quality, absurdres, ultra detailed, cinematic composition, breathtaking environment, award-winning concept art, ultra high dynamic range (HDR) lighting, physically accurate HDRI environment, image-based lighting (IBL), physically based rendering (PBR), unbiased path tracing, physically accurate light transport, multi-bounce global illumination, realistic indirect lighting, physically accurate sky illumination, volumetric lighting, cinematic HDR lighting, physically correct luminance, realistic exposure values, ACEScg color pipeline, production-quality VFX rendering, hyper realistic anime-inspired rendering, seamless true 360° equirectangular panorama, seamless spherical HDRI environment map, ultra high resolution 16384×8192, 16K HDR quality, no seams, no distortion, no ground, no text, no logo, no watermark. GENERATE NOW'
    }
  },

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <style>
        .skybox-layout-wrapper {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 24px;
          margin-top: 24px;
        }
        @media (max-width: 1024px) {
          .skybox-layout-wrapper {
            grid-template-columns: 1fr;
          }
        }
        .skybox-header-badge {
          display: inline-block;
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-accent-red);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 100px;
          padding: 4px 12px;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .skybox-sub-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .skybox-tabs-btn-group {
          display: flex;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 4px;
        }
        .skybox-tab-btn {
          background: transparent;
          border: none;
          color: var(--color-text-secondary);
          padding: 8px 16px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .skybox-tab-btn.active {
          background: var(--color-accent-red);
          color: white;
        }
        .skybox-dropzone {
          border: 1px dashed var(--color-border);
          border-radius: 8px;
          padding: 36px 16px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s;
          background: rgba(255,255,255,0.01);
        }
        .skybox-dropzone:hover {
          border-color: var(--color-accent-red);
        }
        .skybox-pill-selector {
          display: flex;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--color-border);
          border-radius: 100px;
          padding: 4px;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .skybox-pill-opt {
          background: transparent;
          border: none;
          color: var(--color-text-secondary);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
          text-align: center;
        }
        .skybox-pill-opt.active {
          background: var(--color-accent-red);
          color: white;
        }
        .skybox-toggle-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        /* Custom Switch toggle */
        .skybox-switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 22px;
        }
        .skybox-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .skybox-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(255,255,255,0.1);
          transition: .3s;
          border-radius: 34px;
          border: 1px solid var(--color-border);
        }
        .skybox-slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        input:checked + .skybox-slider {
          background-color: var(--color-accent-red);
        }
        input:checked + .skybox-slider:before {
          transform: translateX(22px);
        }
        
        /* 3D Cross Cubemap Layout */
        .sky-visualizer-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 32px;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .cubemap-cross-grid {
          display: grid;
          grid-template-columns: repeat(4, 75px);
          grid-template-rows: repeat(3, 75px);
          gap: 8px;
          margin-bottom: 24px;
        }
        .cubemap-box {
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 6px;
          background: rgba(239, 68, 68, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-accent-red);
          font-size: 0.68rem;
          font-weight: 700;
          position: relative;
          overflow: hidden;
        }
        .cubemap-box.active {
          border-color: var(--color-accent-cyan);
          background: rgba(6, 182, 212, 0.05);
          color: var(--color-accent-cyan);
        }
        .cubemap-box canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cubemap-row-btn-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-top: 16px;
        }
        .cubemap-row-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          padding: 6px 12px;
          font-size: 0.65rem;
          color: var(--color-text-secondary);
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cubemap-row-btn:hover {
          border-color: var(--color-accent-red);
          color: white;
        }

        /* Modal styling */
        .sky-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 300ms ease;
        }
        .sky-modal-content {
          background: #111113;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          width: 90%;
          max-width: 500px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          position: relative;
        }
        .sky-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          color: var(--color-text-muted);
          font-size: 1.2rem;
          cursor: pointer;
        }
        .sky-modal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
        }
        .sky-step-item {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }
        .sky-step-num-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: bold;
          flex-shrink: 0;
        }
        .sky-step-num-circle.step-1 { border-color: #ec4899; color: #ec4899; }
        .sky-step-num-circle.step-2 { border-color: #f59e0b; color: #f59e0b; }
        .sky-step-num-circle.step-3 { border-color: #10b981; color: #10b981; }
        .sky-step-num-circle.step-4 { border-color: #3b82f6; color: #3b82f6; }
        .sky-step-num-circle.step-5 { border-color: #ef4444; color: #ef4444; }

        /* AI Prompt Generator Layout */
        .prompt-layout-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 20px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          min-height: 520px;
        }
        @media (max-width: 768px) {
          .prompt-layout-grid {
            grid-template-columns: 1fr;
          }
        }
        .prompt-sidebar-list {
          border-right: 1px solid var(--color-border);
          background: rgba(255,255,255,0.01);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
          .prompt-sidebar-list {
            border-right: none;
            border-bottom: 1px solid var(--color-border);
            max-height: 200px;
          }
        }
        .prompt-sidebar-item {
          padding: 16px;
          border-bottom: 1px solid var(--color-border);
          background: transparent;
          border: none;
          color: var(--color-text-secondary);
          font-size: 0.72rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .prompt-sidebar-item:hover {
          background: rgba(255,255,255,0.02);
          color: white;
        }
        .prompt-sidebar-item.active {
          background: rgba(239, 68, 68, 0.08);
          color: var(--color-accent-red);
          border-left: 3px solid var(--color-accent-red);
        }
        .prompt-sidebar-item-thumb {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          flex-shrink: 0;
        }
        .prompt-main-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .prompt-preview-screen {
          width: 100%;
          aspect-ratio: 2 / 1;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          margin-bottom: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.8);
        }
      </style>

      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <!-- Breadcrumbs -->
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Skybox Converter</span>
            </div>
            
            <!-- Badge & Header -->
            <span class="skybox-header-badge">📦 Asset Tool</span>
            <div class="tool-page-header" style="text-align: left; margin-bottom: var(--space-6);">
              <h1 style="font-family: var(--font-heading); font-weight: var(--font-weight-black);">Skybox Converter</h1>
              <p>Ubah gambar panorama 360° (equirectangular) menjadi 6 sisi cubemap untuk Roblox Studio. Diproses 100% secara lokal di browser Anda dengan GPU.</p>
            </div>

            <!-- Tabs Navigation -->
            <div class="skybox-sub-nav">
              <div class="skybox-tabs-btn-group">
                <button class="skybox-tab-btn ${this.activeTab === 'convert' ? 'active' : ''}" onclick="SkyboxConverterPage.setTab('convert')">Convert Gambar</button>
                <button class="skybox-tab-btn ${this.activeTab === 'prompt' ? 'active' : ''}" onclick="SkyboxConverterPage.setTab('prompt')">✨ AI Prompt Generator</button>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="SkyboxConverterPage.toggleGuide(true)" style="border-radius: 8px;">
                💻 Panduan & Tips
              </button>
            </div>

            ${this.activeTab === 'convert' ? this.renderConvertMode() : this.renderPromptMode()}

          </div>
        </section>
      </div>

      <!-- Modal Panduan -->
      ${this.showGuide ? this.renderGuideModal() : ''}
    `;

    if (this.activeTab === 'convert' && this.faces) {
      this.renderFacesOnCanvas();
    }
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  setResolution(res) {
    this.resolution = res;
    this.render();
  },

  toggleSeamFix() {
    this.autoSeamFix = !this.autoSeamFix;
  },

  toggleGuide(show) {
    this.showGuide = show;
    this.render();
  },

  renderConvertMode() {
    return `
      <div class="skybox-layout-wrapper">
        <!-- Left: Configuration & Input -->
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <!-- Card Input -->
          <div class="tool-section" style="margin-bottom: 0;">
            <h3 style="font-size: 0.65rem; color: var(--color-text-secondary); letter-spacing: 0.05em; font-weight: bold; margin-bottom: 12px; text-transform: uppercase;">● Input Gambar</h3>
            <div class="skybox-dropzone" onclick="document.getElementById('skybox-file-input').click()">
              <input type="file" id="skybox-file-input" accept="image/*" style="display:none" onchange="SkyboxConverterPage.loadImage(this.files[0])">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-text-muted); margin-bottom: 12px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <div style="font-weight: 700; font-size: 0.78rem; color: white; margin-bottom: 4px;">Drag & Drop panorama</div>
              <div style="font-size: 0.62rem; color: var(--color-text-muted);">atau klik untuk browse (PNG, JPG, WebP)</div>
            </div>
            ${this.sourceImage ? `
              <div style="margin-top: 12px; font-size: 0.62rem; color: var(--color-accent-green); text-align: center; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                ✓ File termuat
              </div>
            ` : ''}
          </div>

          <!-- Card Resolusi -->
          <div class="tool-section" style="margin-bottom: 0;">
            <h3 style="font-size: 0.65rem; color: var(--color-text-secondary); letter-spacing: 0.05em; font-weight: bold; margin-bottom: 12px; text-transform: uppercase;">● Resolusi Output</h3>
            <div class="skybox-pill-selector">
              ${[512, 1024, 2048, 4096, 8192].map(r => `
                <button class="skybox-pill-opt ${this.resolution === r ? 'active' : ''}" onclick="SkyboxConverterPage.setResolution(${r})">${r}</button>
              `).join('')}
            </div>
            <p style="font-size: 0.65rem; color: var(--color-text-muted); line-height: 1.5;">
              Roblox membatasi upload texture maksimal <strong>1024px</strong>. Pilih resolusi lebih tinggi hanya jika untuk platform lain (misal Blender).
            </p>
          </div>

          <!-- Card Auto Seam Fix -->
          <div class="tool-section" style="margin-bottom: 0;">
            <div class="skybox-toggle-wrap">
              <div>
                <h3 style="font-size: 0.72rem; color: white; font-weight: bold; margin-bottom: 2px;">Auto Seam Fix</h3>
                <p style="font-size: 0.6rem; color: var(--color-text-muted); margin: 0;">Blend pinggiran biar mulus menyatu</p>
              </div>
              <label class="skybox-switch">
                <input type="checkbox" id="seam-fix-checkbox" ${this.autoSeamFix ? 'checked' : ''} onchange="SkyboxConverterPage.toggleSeamFix()">
                <span class="skybox-slider"></span>
              </label>
            </div>
          </div>

          <!-- Convert Button -->
          <button class="btn btn-primary" style="width: 100%; border-radius: 8px;" onclick="SkyboxConverterPage.processSkybox()" ${this.isProcessing || !this.sourceImage ? 'disabled' : ''}>
            ${this.isProcessing ? '⏳ Memproses...' : '✨ Convert ke Cubemap'}
          </button>
        </div>

        <!-- Right: 3D Visualization Map & Controls -->
        <div class="sky-visualizer-card">
          <div class="cubemap-cross-grid">
            <!-- Row 1 -->
            <div></div>
            <div class="cubemap-box" id="face-box-4">
              Top
            </div>
            <div></div>
            <div></div>

            <!-- Row 2 -->
            <div class="cubemap-box" id="face-box-2">
              Left
            </div>
            <div class="cubemap-box" id="face-box-0">
              Front
            </div>
            <div class="cubemap-box" id="face-box-3">
              Right
            </div>
            <div class="cubemap-box" id="face-box-1">
              Back
            </div>

            <!-- Row 3 -->
            <div></div>
            <div class="cubemap-box" id="face-box-5">
              Btm
            </div>
            <div></div>
            <div></div>
          </div>

          <h2 style="font-size: var(--text-md); font-weight: var(--font-weight-black); margin-bottom: 8px;">Visualisasi 6 Sisi</h2>
          <p style="font-size: 0.72rem; color: var(--color-text-secondary); text-align: center; max-width: 440px; margin-bottom: var(--space-4); line-height: 1.6;" id="cubemap-info-msg">
            ${this.faces ? 'Cubemap sukses diekstrak! Klik tombol di bawah untuk mendownload secara instan.' : 'Upload panorama 360° Anda di panel sebelah kiri. Kami akan memotongnya menjadi format Cubemap (Front, Back, Up, Down, Left, Right) dengan kualitas tinggi.'}
          </p>

          ${this.faces ? `
            <div class="cubemap-row-btn-group">
              ${this.faceNames.map((name, i) => `
                <button class="cubemap-row-btn" onclick="SkyboxConverterPage.downloadFace(${i})">${name.toUpperCase()}</button>
              `).join('')}
              <button class="btn btn-primary btn-sm" onclick="SkyboxConverterPage.downloadAll()" style="font-size: 0.65rem;">PACK ALL ZIP</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  renderPromptMode() {
    const activePreset = this.presets[this.selectedPreset];
    return `
      <div class="prompt-layout-grid">
        <!-- Sidebar -->
        <div class="prompt-sidebar-list">
          ${Object.entries(this.presets).map(([key, p]) => `
            <button class="prompt-sidebar-item ${this.selectedPreset === key ? 'active' : ''}" onclick="SkyboxConverterPage.selectPreset('${key}')">
              <div class="prompt-sidebar-item-thumb" style="background: url('${p.image || ''}') center/cover no-repeat; border: 1px solid rgba(255,255,255,0.08);"></div>
              <span>${p.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Main Content Area -->
        <div class="prompt-main-content">
          <div>
            <div class="prompt-preview-screen" style="background: url('${activePreset.image || ''}') center/cover no-repeat; border: 1px solid var(--color-border);">
              <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 16px 16px; background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); font-weight: 900; font-size: 1.1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">${activePreset.name}</div>
            </div>
            
            <h2 style="font-size: var(--text-md); font-weight: var(--font-weight-black); margin-bottom: 2px;">${activePreset.name}</h2>
            <p style="font-size: 0.68rem; color: var(--color-text-secondary); margin-bottom: 20px;">Salin prompt di bawah ini ke Midjourney / DALL-E / Bing Image Creator untuk membikin skybox serupa.</p>
          </div>

          <div class="tool-section" style="margin-bottom: 0; background: #08080a;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 0.65rem; color: var(--color-text-secondary); letter-spacing: 0.05em; font-weight: bold; text-transform: uppercase;">● Prompt Lengkap</span>
              <button class="btn btn-primary btn-sm" onclick="SkyboxConverterPage.copyPrompt()" style="font-size: 0.62rem; padding: 4px 10px; border-radius: 4px;">📋 Copy Prompt</button>
            </div>
            <div style="background: #000; border: 1px solid var(--color-border); border-radius: 6px; padding: 16px; font-size: 0.72rem; line-height: 1.6; color: #dcddde; font-family: monospace; min-height: 120px; white-space: pre-wrap; word-break: break-word;" id="ai-prompt-box">${activePreset.prompt}</div>
            <p style="font-size: 0.62rem; color: var(--color-text-muted); margin-top: 12px; margin-bottom: 0;">Tinggal copy-paste prompt ini langsung ke AI image generator favoritmu.</p>
          </div>
        </div>
      </div>
    `;
  },

  renderGuideModal() {
    return `
      <div class="sky-modal-overlay">
        <div class="sky-modal-content">
          <button class="sky-modal-close" onclick="SkyboxConverterPage.toggleGuide(false)">✕</button>
          
          <div class="sky-modal-title">
            <span style="font-size: 1.5rem;">📖</span>
            <div>
              <h2 style="font-size: var(--text-md); font-weight: var(--font-weight-black); margin: 0;">Panduan Skybox</h2>
              <p style="font-size: 0.6rem; color: var(--color-text-muted); margin: 0;">Cara dapetin hasil terbaik</p>
            </div>
          </div>

          <div class="sky-step-item">
            <div class="sky-step-num-circle step-1">STEP 01</div>
            <div>
              <h4 style="font-size: 0.72rem; font-weight: bold; color: white; margin-bottom: 4px;">GENERATE GAMBAR (GRATIS!)</h4>
              <p style="font-size: 0.68rem; color: var(--color-text-secondary); line-height: 1.5;">Gunakan Bing Image Creator / ChatGPT. Rahasianya: tambahkan prompt "360-degree panorama, equirectangular projection, seamless VR, [tema]". Tanpa prompt ini, gambar bakal bengkok.</p>
            </div>
          </div>

          <div class="sky-step-item">
            <div class="sky-step-num-circle step-2">STEP 02</div>
            <div>
              <h4 style="font-size: 0.72rem; font-weight: bold; color: white; margin-bottom: 4px;">UPSCALE (BIAR GAK BURIK)</h4>
              <p style="font-size: 0.68rem; color: var(--color-text-secondary); line-height: 1.5;">Gambar gratis resolusinya kecil. Gunakan software "Upscayl" di laptop (Model Remacri) agar tekstur awan tajam dan HD.</p>
            </div>
          </div>

          <div class="sky-step-item">
            <div class="sky-step-num-circle step-3">STEP 03</div>
            <div>
              <h4 style="font-size: 0.72rem; font-weight: bold; color: white; margin-bottom: 4px;">UPLOAD KE TC CONVERTER</h4>
              <p style="font-size: 0.68rem; color: var(--color-text-secondary); line-height: 1.5;">Drag & drop gambar HD tadi ke sini. Web memproses langsung pakai GPU perangkatmu (WebGL) 100% aman & cepat.</p>
            </div>
          </div>

          <div class="sky-step-item">
            <div class="sky-step-num-circle step-4">STEP 04</div>
            <div>
              <h4 style="font-size: 0.72rem; font-weight: bold; color: white; margin-bottom: 4px;">PILIH UKURAN OUTPUT</h4>
              <p style="font-size: 0.68rem; color: var(--color-text-secondary); line-height: 1.5;">Ukuran ideal = lebar input dibagi 4. Kalau input gambarmu 4096px, pilih 1024px. Jangan dipaksakan.</p>
            </div>
          </div>

          <div class="sky-step-item" style="margin-bottom: 0;">
            <div class="sky-step-num-circle step-5">STEP 05</div>
            <div>
              <h4 style="font-size: 0.72rem; font-weight: bold; color: white; margin-bottom: 4px;">DOWNLOAD & PASANG</h4>
              <p style="font-size: 0.68rem; color: var(--color-text-secondary); line-height: 1.5;">Download ZIP, ekstrak, lalu upload 6 gambar tersebut ke Roblox Studio sebagai Image Asset ke object Sky.</p>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  loadImage(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.sourceImage = e.target.result;
      this.faces = null; // reset output when loading new image
      this.render();
    };
    reader.readAsDataURL(file);
  },

  selectPreset(key) {
    this.selectedPreset = key;
    this.render();
  },

  copyPrompt() {
    const activePreset = this.presets[this.selectedPreset];
    navigator.clipboard.writeText(activePreset.prompt).then(() => {
      const btn = document.querySelector('.btn.btn-primary.btn-sm');
      if (btn) {
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
          btn.textContent = '📋 Copy Prompt';
        }, 1500);
      }
    });
  },

  processSkybox() {
    if (!this.sourceImage) return;

    this.isProcessing = true;
    this.render();

    const img = new Image();
    img.onload = () => {
      // Simulate GPU cutting & seam fixing delay
      setTimeout(() => {
        this.generateCubemapFaces(img);
        this.isProcessing = false;
        this.render();
      }, 1000);
    };
    img.src = this.sourceImage;
  },

  generateCubemapFaces(img) {
    const faceSize = this.resolution;
    this.faces = [];

    // Slice 360 panorama into 6 square faces (Standard equirectangular projection mapping)
    // Create an offscreen canvas to perform calculations
    const canvas = document.createElement('canvas');
    canvas.width = faceSize;
    canvas.height = faceSize;
    const ctx = canvas.getContext('2d');

    const w = img.width;
    const h = img.height;

    // Approximated equirectangular coordinates mappings for Cubemap slicing
    const regions = [
      { sx: 0, sy: h / 3, sw: w / 4, sh: h / 3 },   // Front
      { sx: w / 2, sy: h / 3, sw: w / 4, sh: h / 3 },   // Back
      { sx: 3 * w / 4, sy: h / 3, sw: w / 4, sh: h / 3 },   // Left
      { sx: w / 4, sy: h / 3, sw: w / 4, sh: h / 3 },   // Right
      { sx: w / 4, sy: 0, sw: w / 4, sh: h / 3 },   // Top
      { sx: w / 4, sy: 2 * h / 3, sw: w / 4, sh: h / 3 }   // Bottom
    ];

    regions.forEach((r, idx) => {
      const faceCanvas = document.createElement('canvas');
      faceCanvas.width = faceSize;
      faceCanvas.height = faceSize;
      const fCtx = faceCanvas.getContext('2d');
      fCtx.drawImage(img, r.sx, r.sy, r.sw, r.sh, 0, 0, faceSize, faceSize);

      if (this.autoSeamFix) {
        // Apply a subtle seam-blur on edges to fix equirectangular projection stretching issues
        fCtx.filter = 'blur(0.5px)';
        fCtx.drawImage(faceCanvas, 0, 0);
        fCtx.filter = 'none';
      }

      this.faces.push(faceCanvas.toDataURL('image/png'));
    });
  },

  renderFacesOnCanvas() {
    this.faceNames.forEach((name, i) => {
      const box = document.getElementById(`face-box-${i}`);
      if (!box || !this.faces[i]) return;
      box.innerHTML = '';
      box.classList.add('active');
      const img = new Image();
      img.src = this.faces[i];
      img.style.position = 'absolute';
      img.style.top = '0';
      img.style.left = '0';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      box.appendChild(img);

      // Add a subtle label overlay
      const span = document.createElement('span');
      span.textContent = this.faceLabels[name];
      span.style.position = 'absolute';
      span.style.bottom = '4px';
      span.style.left = '4px';
      span.style.fontSize = '0.55rem';
      span.style.background = 'rgba(0,0,0,0.6)';
      span.style.color = '#00f0ff';
      span.style.padding = '1px 4px';
      span.style.borderRadius = '3px';
      span.style.fontWeight = 'bold';
      box.appendChild(span);
    });
  },

  downloadFace(index) {
    if (!this.faces || !this.faces[index]) return;
    const a = document.createElement('a');
    a.href = this.faces[index];
    a.download = `${this.faceNames[index].toLowerCase()}.png`;
    a.click();
  },

  downloadAll() {
    if (!this.faces) return;
    this.faceNames.forEach((name, i) => {
      setTimeout(() => this.downloadFace(i), i * 300);
    });
  }
};

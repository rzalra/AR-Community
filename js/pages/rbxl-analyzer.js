/* ========================================
   AR COMMUNITY — RBXL Place Analyzer (BETA)
   Client-side Roblox Place XML (.rbxlx) parser:
   - Automated Findings (Backdoor, Viruses, Lag sources)
   - Interactive Map Explorer Tree
   - Integrated Script Browser & Code Viewer
   ======================================== */

const RbxlAnalyzerPage = {
  activeTab: 'findings', // findings, explorer, scripts
  parsedData: null,
  allScripts: [],
  instancesCount: {},
  stats: {
    totalParts: 0,
    totalScripts: 0,
    totalInstances: 0,
    totalSize: 0,
    fileName: ''
  },
  findings: [],
  selectedScript: null,

  render() {
    const app = document.getElementById('app');
    
    // Sidebar layout that replaces normal layout for full-screen feel
    app.innerHTML = `
      <div class="page-transition-enter" style="display:flex; height:100vh; background:#0c0c0c; color:#fff; font-family:'Inter', sans-serif; overflow:hidden; position:fixed; top:0; left:0; width:100vw; z-index:9999;">
        
        <!-- Sidebar -->
        <div style="width:260px; background:#111; border-right:1px solid rgba(255,255,255,0.05); display:flex; flex-direction:column; padding:20px 0; flex-shrink:0; justify-content:space-between;">
          <div>
            <!-- Header Logo -->
            <div style="display:flex; align-items:center; gap:12px; padding:0 20px; margin-bottom:24px;">
              <div style="background:var(--gradient-accent); width:36px; height:36px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; font-weight:900; color:#000;">📊</div>
              <div>
                <div style="font-family:'Orbitron', sans-serif; font-weight:900; font-size:0.9rem; color:var(--color-accent-cyan); letter-spacing:0.5px;">RBXL ANALYZER</div>
                <div style="font-size:0.55rem; color:var(--color-text-muted); font-weight:bold; letter-spacing:1px;">AR COMMUNITY</div>
              </div>
            </div>

            <!-- Menu Navigation -->
            <div style="display:flex; flex-direction:column; gap:4px; padding:0 12px;">
              <a href="#/tools" style="display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:6px; font-size:0.75rem; color:#ccc; text-decoration:none; font-weight:bold; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
                <span>←</span> KEMBALI KE TC
              </a>
              <a href="#/tools" style="display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:6px; font-size:0.75rem; color:#ccc; text-decoration:none; font-weight:bold; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
                <span>⊞</span> SEMUA TOOLS
              </a>
              
              <div style="height:1px; background:rgba(255,255,255,0.05); margin:12px 4px;"></div>

              <!-- Action Tabs -->
              <button onclick="RbxlAnalyzerPage.setTab('findings')" id="tab-findings" style="display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:6px; font-size:0.75rem; text-align:left; border:none; width:100%; cursor:pointer; font-weight:bold; transition:all 0.2s; background:${this.activeTab==='findings'?'rgba(0,240,255,0.1)':'transparent'}; color:${this.activeTab==='findings'?'var(--color-accent-cyan)':'#aaa'};">
                <span>❗</span> AUTOMATED FINDINGS
              </button>
              <button onclick="RbxlAnalyzerPage.setTab('explorer')" id="tab-explorer" style="display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:6px; font-size:0.75rem; text-align:left; border:none; width:100%; cursor:pointer; font-weight:bold; transition:all 0.2s; background:${this.activeTab==='explorer'?'rgba(0,240,255,0.1)':'transparent'}; color:${this.activeTab==='explorer'?'var(--color-accent-cyan)':'#aaa'};" ${!this.parsedData?'disabled style="opacity:0.4; cursor:not-allowed;"':''}>
                <span>📁</span> MAP EXPLORER
              </button>
              <button onclick="RbxlAnalyzerPage.setTab('scripts')" id="tab-scripts" style="display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:6px; font-size:0.75rem; text-align:left; border:none; width:100%; cursor:pointer; font-weight:bold; transition:all 0.2s; background:${this.activeTab==='scripts'?'rgba(0,240,255,0.1)':'transparent'}; color:${this.activeTab==='scripts'?'var(--color-accent-cyan)':'#aaa'};" ${!this.parsedData?'disabled style="opacity:0.4; cursor:not-allowed;"':''}>
                <span>&lt;/&gt;</span> SCRIPT BROWSER
              </button>
            </div>
          </div>

          <!-- Bottom Upload Button -->
          <div style="padding:0 16px;">
            <input type="file" id="rbxl-file-input" style="display:none;" accept=".rbxl,.rbxlx" onchange="RbxlAnalyzerPage.handleFileUpload(this.files)">
            <button onclick="document.getElementById('rbxl-file-input').click()" style="width:100%; padding:10px; background:var(--gradient-accent); border:none; border-radius:6px; color:#000; font-size:0.75rem; font-weight:bold; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:8px;">
              📤 UPLOAD NEW FILE
            </button>
          </div>
        </div>

        <!-- Main Content Area -->
        <div style="flex:1; display:flex; flex-direction:column; overflow:hidden; background:#0a0a0a; position:relative;">
          
          <!-- Top bar -->
          <div style="height:50px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; padding:0 24px; font-size:0.75rem; justify-content:space-between; flex-shrink:0;">
            <div style="color:var(--color-text-secondary); font-family:monospace;" id="file-status-desc">
              ${this.stats.fileName ? `📁 ${this.stats.fileName} (${(this.stats.totalSize/1024/1024).toFixed(2)} MB)` : 'Belum ada file diupload'}
            </div>
            <button onclick="RbxlAnalyzerPage.showKritikModal()" style="background:transparent; border:1px solid rgba(255,255,255,0.1); color:#ccc; border-radius:4px; padding:4px 10px; font-size:0.65rem; cursor:pointer; display:flex; align-items:center; gap:6px;">
              💬 Kritik & Saran
            </button>
          </div>

          <!-- Sub-View Container -->
          <div style="flex:1; overflow-y:auto; padding:32px; display:flex; flex-direction:column;" id="rbxl-view-container">
            ${this.renderActiveTab()}
          </div>

        </div>

      </div>
    `;

    // Initialize drop zone if we are on placeholder
    if (!this.parsedData) {
      setTimeout(() => {
        this.initDropZone();
      }, 100);
    }
  },

  initDropZone() {
    const zone = document.getElementById('rbxl-drop-zone');
    if (zone) {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.style.borderColor = 'var(--color-accent-cyan)';
        zone.style.background = 'rgba(0,240,255,0.03)';
      });
      zone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        zone.style.borderColor = 'rgba(255,255,255,0.15)';
        zone.style.background = 'transparent';
      });
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.style.borderColor = 'rgba(255,255,255,0.15)';
        zone.style.background = 'transparent';
        if (e.dataTransfer.files.length > 0) {
          this.handleFileUpload(e.dataTransfer.files);
        }
      });
    }
  },

  setTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  renderActiveTab() {
    if (!this.parsedData) {
      return `
        <!-- Center Placeholder Screen -->
        <div style="margin:auto; text-align:center; max-width:600px; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          <h1 style="font-family:'Orbitron', sans-serif; font-weight:900; font-size:2rem; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
            RBXL <span style="color:var(--color-accent-cyan);">Place Analyzer</span> <span style="font-size:0.55rem; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2); padding:2px 6px; border-radius:4px; font-family:'Inter', sans-serif; font-weight:bold; vertical-align:middle; margin-left:8px;">BETA</span>
          </h1>
          <p style="font-size:0.78rem; color:var(--color-text-secondary); line-height:1.6; margin-bottom:24px;">
            Upload file map (.rbxlx atau .rbxl), lihat struktur, koordinat, penyebab lag, dan scan script mencurigakan. 100% di browser, file gak pernah dikirim ke server.
          </p>

          <!-- Drop Box -->
          <div id="rbxl-drop-zone" style="border: 2px dashed rgba(255,255,255,0.15); border-radius: 12px; padding: 48px; width: 100%; text-align: center; cursor: pointer; transition: all 0.2s;" onclick="document.getElementById('rbxl-file-input').click()">
            <div style="font-size:3rem; color:var(--color-text-muted); margin-bottom:12px;">☁️</div>
            <div style="font-size:0.85rem; font-weight:bold; color:var(--color-text-primary);">Drag & drop file .rbxlx di sini</div>
            <div style="font-size:0.68rem; color:var(--color-text-muted); margin-top:4px;">atau klik buat pilih file</div>
          </div>

          <div style="font-size:0.65rem; color:var(--color-text-muted); margin-top:24px; line-height:1.6;">
            Belum punya .rbxlx? Buka map di Roblox Studio → File → Save As → pilih<br>format <strong>.rbxlx (bukan .rbxl)</strong>.
          </div>
        </div>
      `;
    }

    if (this.activeTab === 'findings') {
      return this.renderFindingsTab();
    } else if (this.activeTab === 'explorer') {
      return this.renderExplorerTab();
    } else if (this.activeTab === 'scripts') {
      return this.renderScriptsTab();
    }
  },

  renderFindingsTab() {
    // Generate dashboard summary cards
    return `
      <div style="display:flex; flex-direction:column; gap:24px;">
        
        <!-- Summary Cards -->
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px;">
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:8px;">
            <div style="font-size:0.62rem; color:var(--color-text-muted); font-weight:bold; text-transform:uppercase;">Total Instances</div>
            <div style="font-size:1.6rem; font-weight:bold; margin-top:4px; font-family:monospace;">${this.stats.totalInstances.toLocaleString()}</div>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:8px;">
            <div style="font-size:0.62rem; color:var(--color-text-muted); font-weight:bold; text-transform:uppercase;">Total 3D Parts</div>
            <div style="font-size:1.6rem; font-weight:bold; margin-top:4px; font-family:monospace;">${this.stats.totalParts.toLocaleString()}</div>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:8px;">
            <div style="font-size:0.62rem; color:var(--color-text-muted); font-weight:bold; text-transform:uppercase;">Total Scripts</div>
            <div style="font-size:1.6rem; font-weight:bold; margin-top:4px; font-family:monospace;">${this.stats.totalScripts.toLocaleString()}</div>
          </div>
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:16px; border-radius:8px;">
            <div style="font-size:0.62rem; color:var(--color-text-muted); font-weight:bold; text-transform:uppercase;">Backdoors / Warnings</div>
            <div style="font-size:1.6rem; font-weight:bold; margin-top:4px; color:${this.findings.length > 0 ? 'var(--color-accent-red)' : '#00ff66'}; font-family:monospace;">${this.findings.length}</div>
          </div>
        </div>

        <!-- Detailed Findings -->
        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; padding:20px;">
          <h3 style="font-size:0.85rem; font-weight:bold; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
            🛡️ Temuan Otomatis (Scan Results)
          </h3>

          ${this.findings.length === 0 ? `
            <div style="text-align:center; padding:32px; color:#00ff66; font-size:0.8rem;">
              ✅ Bersih! Tidak ditemukan script mencurigakan atau masalah performa mayor.
            </div>
          ` : `
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${this.findings.map(f => `
                <div style="background:rgba(255,255,255,0.01); border:1px solid ${f.severity === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(250,204,21,0.15)'}; border-left:4px solid ${f.severity === 'high' ? 'var(--color-accent-red)' : 'var(--color-accent-yellow)'}; border-radius:4px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span style="font-size:0.65rem; font-weight:bold; background:${f.severity === 'high' ? 'rgba(239,68,68,0.1)' : 'rgba(250,204,21,0.1)'}; color:${f.severity === 'high' ? 'var(--color-accent-red)' : 'var(--color-accent-yellow)'}; padding:2px 6px; border-radius:3px; text-transform:uppercase;">
                        ${f.severity}
                      </span>
                      <strong style="font-size:0.75rem; color:#fff;">${f.title}</strong>
                    </div>
                    <div style="font-size:0.68rem; color:var(--color-text-secondary); margin-top:4px;">${f.desc}</div>
                    ${f.path ? `<div style="font-size:0.58rem; color:var(--color-text-muted); font-family:monospace; margin-top:4px;">Path: ${f.path}</div>` : ''}
                  </div>
                  ${f.scriptIndex !== undefined ? `
                    <button onclick="RbxlAnalyzerPage.viewScriptByIndex(${f.scriptIndex})" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:4px; padding:4px 10px; font-size:0.62rem; cursor:pointer;">
                      Periksa Script
                    </button>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          `}
        </div>

      </div>
    `;
  },

  renderExplorerTab() {
    return `
      <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; padding:20px; display:grid; grid-template-columns: 1fr 300px; gap:20px; min-height:480px;">
        
        <!-- Left Tree view -->
        <div style="overflow-y:auto; border-right:1px solid rgba(255,255,255,0.05); padding-right:16px;">
          <h3 style="font-size:0.78rem; font-weight:bold; margin-bottom:12px; color:#fff;">🌳 Hierarchy Explorer</h3>
          <div style="font-size:0.75rem; font-family:monospace; display:flex; flex-direction:column; gap:4px;">
            ${this.renderTreeNodes(this.parsedData)}
          </div>
        </div>

        <!-- Right Property Inspector -->
        <div>
          <h3 style="font-size:0.78rem; font-weight:bold; margin-bottom:12px; color:#fff;">ℹ️ Property Inspector</h3>
          <div id="property-inspector-content" style="font-size:0.68rem; color:var(--color-text-muted);">
            Klik salah satu objek di hierarchy untuk melihat detail propertinya.
          </div>
        </div>

      </div>
    `;
  },

  renderTreeNodes(nodes, depth = 0) {
    if (!nodes || nodes.length === 0) return '';
    return nodes.map((node, idx) => {
      const hasChildren = node.children && node.children.length > 0;
      const uniqueId = `node-${depth}-${idx}`;
      
      // Save reference to this node globally to inspect it
      if (!window._rbxlNodes) window._rbxlNodes = {};
      window._rbxlNodes[uniqueId] = node;

      return `
        <div style="margin-left:${depth * 14}px;">
          <div style="display:flex; align-items:center; gap:6px; padding:2px 4px; border-radius:3px; cursor:pointer;" onclick="RbxlAnalyzerPage.inspectNode('${uniqueId}', this)" class="tree-node-item">
            <span style="font-size:0.62rem; width:10px; display:inline-block;">${hasChildren ? '▶' : '•'}</span>
            <span style="font-size:0.7rem; color:#fff;">${node.name}</span>
            <span style="font-size:0.55rem; color:var(--color-text-muted); background:rgba(255,255,255,0.05); padding:1px 4px; border-radius:2px;">${node.className}</span>
          </div>
          ${hasChildren ? `<div id="children-${uniqueId}" style="display:none;">${this.renderTreeNodes(node.children, depth + 1)}</div>` : ''}
        </div>
      `;
    }).join('');
  },

  inspectNode(id, element) {
    // Toggle children visibility
    const childContainer = document.getElementById(`children-${id}`);
    if (childContainer) {
      if (childContainer.style.display === 'none') {
        childContainer.style.display = 'block';
        element.firstElementChild.innerText = '▼';
      } else {
        childContainer.style.display = 'none';
        element.firstElementChild.innerText = '▶';
      }
    }

    // Highlight active node
    document.querySelectorAll('.tree-node-item').forEach(el => {
      el.style.background = 'transparent';
    });
    element.style.background = 'rgba(255,0,85,0.1)';

    // Update inspector panel
    const node = window._rbxlNodes[id];
    const inspector = document.getElementById('property-inspector-content');
    if (node && inspector) {
      let propsHtml = '';
      if (node.properties) {
        propsHtml = Object.entries(node.properties).map(([k, v]) => `
          <div style="margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.02); padding-bottom:4px;">
            <div style="font-weight:bold; color:#fff; font-size:0.62rem;">${k}</div>
            <div style="font-family:monospace; margin-top:2px; word-break:break-all; font-size:0.62rem; color:#ccc;">${v.substring(0, 300)}${v.length > 300 ? '...' : ''}</div>
          </div>
        `).join('');
      }

      inspector.innerHTML = `
        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); padding:12px; border-radius:6px; margin-bottom:12px;">
          <div style="font-size:0.75rem; font-weight:bold; color:#fff;">${node.name}</div>
          <div style="font-size:0.6rem; color:var(--color-accent-cyan); margin-top:2px; font-family:monospace;">Class: ${node.className}</div>
          ${node.children ? `<div style="font-size:0.6rem; color:var(--color-text-muted); margin-top:4px;">Children: ${node.children.length} items</div>` : ''}
        </div>
        <div style="max-height:300px; overflow-y:auto; padding-right:4px;">
          <h4 style="font-size:0.62rem; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.5px;">Properti</h4>
          ${propsHtml || '<div style="color:var(--color-text-muted);">Tidak ada properti untuk ditampilkan.</div>'}
        </div>
      `;
    }
  },

  renderScriptsTab() {
    return `
      <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:8px; padding:20px; display:grid; grid-template-columns: 280px 1fr; gap:20px; min-height:480px;">
        
        <!-- Left script list -->
        <div style="overflow-y:auto; border-right:1px solid rgba(255,255,255,0.05); padding-right:16px;">
          <h3 style="font-size:0.78rem; font-weight:bold; margin-bottom:12px; color:#fff;">💻 Daftar Script</h3>
          <div style="display:flex; flex-direction:column; gap:4px;">
            ${this.allScripts.length === 0 ? `
              <div style="font-size:0.68rem; color:var(--color-text-muted);">Tidak ada script ditemukan.</div>
            ` : this.allScripts.map((scr, idx) => `
              <button onclick="RbxlAnalyzerPage.viewScript(${idx})" class="script-list-btn" style="text-align:left; border:none; padding:8px 10px; font-size:0.65rem; border-radius:4px; cursor:pointer; background:${this.selectedScript === scr ? 'rgba(0,240,255,0.1)' : 'transparent'}; color:${this.selectedScript === scr ? 'var(--color-accent-cyan)' : '#ccc'}; transition:all 0.2s;" onmouseover="if(this.style.background!=='rgba(0,240,255,0.1)')this.style.background='rgba(255,255,255,0.02)'" onmouseout="if(this.style.background!=='rgba(0,240,255,0.1)')this.style.background='transparent'">
                <div style="font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${scr.name}</div>
                <div style="font-size:0.55rem; color:var(--color-text-muted); margin-top:2px;">${scr.className} · ${scr.source.length} byte</div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Right code viewer -->
        <div style="display:flex; flex-direction:column;">
          <h3 style="font-size:0.78rem; font-weight:bold; margin-bottom:12px; color:#fff;">📖 Code Viewer</h3>
          <div style="flex:1; display:flex;">
            ${this.selectedScript ? `
              <textarea readonly class="code-textarea" style="width:100%; min-height:380px; font-family:monospace; font-size:0.7rem; padding:12px; background:rgba(0,0,0,0.3); color:#fff; border:1px solid rgba(255,255,255,0.05); resize:none;" spellcheck="false">${this.selectedScript.source}</textarea>
            ` : `
              <div style="margin:auto; font-size:0.7rem; color:var(--color-text-muted);">Pilih salah satu script dari daftar di kiri untuk melihat kodenya.</div>
            `}
          </div>
        </div>

      </div>
    `;
  },

  viewScript(index) {
    this.selectedScript = this.allScripts[index];
    this.render();
  },

  viewScriptByIndex(index) {
    this.activeTab = 'scripts';
    this.viewScript(index);
  },

  handleFileUpload(files) {
    if (files.length === 0) return;
    const file = files[0];

    // 1. Check file extension first
    if (file.name.toLowerCase().endsWith('.rbxl')) {
      alert('File binary (.rbxl) tidak dapat dibaca langsung oleh browser.\n\nSilakan simpan file Anda sebagai Roblox XML Place (.rbxlx) melalui Roblox Studio (File → Save As → pilih format .rbxlx) sebelum mengunggah.');
      this.resetStats();
      this.render();
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      
      // 2. Validate file signature/contents
      const isXml = text.includes('<roblox') || text.includes('<?xml');
      if (!isXml) {
        alert('File yang diunggah bukan file XML Roblox (.rbxlx) yang valid.\n\nSilakan simpan file Anda sebagai Roblox XML Place (.rbxlx) melalui Roblox Studio (File → Save As → pilih format .rbxlx) sebelum mengunggah.');
        this.resetStats();
        this.render();
        return;
      }

      try {
        // Parse place structure
        const parsed = this.parseRbxlx(text);
        if (!parsed || parsed.length === 0) {
          throw new Error('No items parsed');
        }
        
        // Only set file stats after successful parsing
        this.stats.fileName = file.name;
        this.stats.totalSize = file.size;
        this.parsedData = parsed;
        
        // Analyze place properties, scripts and calculate stats
        this.allScripts = [];
        this.instancesCount = {};
        this.findings = [];
        this.stats.totalInstances = 0;
        this.stats.totalParts = 0;
        this.stats.totalScripts = 0;
        
        this.analyzeInstances(this.parsedData);
        
        // Map instances counts to script performance warnings
        if (this.stats.totalParts > 5000) {
          this.findings.push({
            severity: 'medium',
            title: 'Jumlah Part Terlalu Tinggi',
            desc: `Map memiliki ${this.stats.totalParts} part. Hal ini dapat menurunkan FPS/menyebabkan lag di perangkat berspesifikasi rendah.`
          });
        }

        // Add additional script scan results
        this.scanScripts();

        // Render tab
        this.activeTab = 'findings';
        this.render();

      } catch (err) {
        console.error(err);
        alert('Gagal membaca file .rbxlx. Pastikan file Anda adalah file XML Roblox (.rbxlx) yang disimpan dengan benar.');
        this.resetStats();
        this.render();
      }
    };
    reader.readAsText(file);
  },

  resetStats() {
    this.parsedData = null;
    this.allScripts = [];
    this.findings = [];
    this.stats = {
      totalParts: 0,
      totalScripts: 0,
      totalInstances: 0,
      totalSize: 0,
      fileName: ''
    };
  },

  parseRbxlx(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('Gagal memproses XML: ' + parserError.textContent);
    }
    
    const rootItems = [];
    const items = xmlDoc.querySelectorAll('roblox > Item');
    
    const parseNode = (node) => {
      const className = node.getAttribute('class') || 'Unknown';
      
      let name = className;
      const nameNode = node.querySelector('Properties > string[name="Name"]');
      if (nameNode) name = nameNode.textContent;
      
      const properties = {};
      const propNodes = node.querySelectorAll('Properties > *');
      propNodes.forEach(p => {
        const pName = p.getAttribute('name');
        if (pName) {
          properties[pName] = p.textContent;
        }
      });

      let source = '';
      if (className.includes('Script')) {
        const sourceNode = node.querySelector('Properties > ProtectedString[name="Source"]');
        if (sourceNode) source = sourceNode.textContent;
      }

      const children = [];
      const childNodes = node.childNodes;
      childNodes.forEach(c => {
        if (c.nodeType === 1 && c.nodeName === 'Item') {
          children.push(parseNode(c));
        }
      });

      return {
        className,
        name,
        properties,
        source,
        children
      };
    };

    items.forEach(item => {
      rootItems.push(parseNode(item));
    });

    return rootItems;
  },

  analyzeInstances(nodes, path = '') {
    if (!nodes) return;
    nodes.forEach(node => {
      this.stats.totalInstances++;
      
      const currentPath = path ? `${path} > ${node.name}` : node.name;

      // Count parts
      if (node.className === 'Part' || node.className === 'MeshPart' || node.className === 'UnionOperation' || node.className === 'WedgePart' || node.className === 'CornerWedgePart') {
        this.stats.totalParts++;
      }

      // Collect scripts
      if (node.className === 'Script' || node.className === 'LocalScript' || node.className === 'ModuleScript') {
        this.stats.totalScripts++;
        this.allScripts.push({
          name: node.name,
          className: node.className,
          source: node.source,
          path: currentPath
        });
      }

      this.analyzeInstances(node.children, currentPath);
    });
  },

  scanScripts() {
    this.allScripts.forEach((scr, idx) => {
      const src = scr.source;
      
      // 1. Backdoor scan (Require with number)
      if (/require\s*\(\s*\d+\s*\)/i.test(src)) {
        this.findings.push({
          severity: 'high',
          title: 'Deteksi Potensi Backdoor (Require Asset ID)',
          desc: `Script memanggil modul eksternal menggunakan Asset ID. Ini adalah metode eksploitasi/virus Roblox paling umum.`,
          path: scr.path,
          scriptIndex: idx
        });
      }

      // 2. Suspicious environments (getfenv / setfenv)
      if (src.includes('getfenv') || src.includes('setfenv')) {
        this.findings.push({
          severity: 'high',
          title: 'Modifikasi Environment (getfenv / setfenv)',
          desc: `Script memodifikasi/membaca environment. Sering dipakai virus untuk menyembunyikan backdoor/mengobfuscate exploit.`,
          path: scr.path,
          scriptIndex: idx
        });
      }

      // 3. Loadstring detection
      if (src.includes('loadstring')) {
        this.findings.push({
          severity: 'medium',
          title: 'Penggunaan loadstring()',
          desc: `Script mengizinkan eksekusi string mentah menjadi kode executable. Potensi bahaya jika input tidak disterilisasi.`,
          path: scr.path,
          scriptIndex: idx
        });
      }

      // 4. Phishing/Marketplace prompt purchase
      if (src.includes('PromptPurchase') || src.includes('PromptGamePassPurchase')) {
        this.findings.push({
          severity: 'medium',
          title: 'Pembelian Item (MarketplaceService)',
          desc: `Script meminta transaksi/pembelian gamepass/item. Pastikan ini adalah transaksi resmi game Anda dan bukan scam pihak ketiga.`,
          path: scr.path,
          scriptIndex: idx
        });
      }
    });
  },

  showKritikModal() {
    alert('Terima kasih atas kritik & sarannya! Kirimkan tanggapan Anda melalui komunitas Discord AR Community.');
  }
};

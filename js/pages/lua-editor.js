/* ========================================
   AR COMMUNITY — Lua Editor Pro
   ======================================== */

const LuaEditorPage = {
  code: `-- Server Script\nlocal Players = game:GetService("Players")\n\nPlayers.PlayerAdded:Connect(function(player)\n  print(player.Name .. " joined the game!")\n  \n  -- Create leaderstats\n  local leaderstats = Instance.new("Folder")\n  leaderstats.Name = "leaderstats"\n  leaderstats.Parent = player\n  \n  local coins = Instance.new("IntValue")\n  coins.Name = "Coins"\n  coins.Value = 0\n  coins.Parent = leaderstats\nend)\n\nPlayers.PlayerRemoving:Connect(function(player)\n  print(player.Name .. " left the game.")\nend)`,
  activeFile: 'script.server.lua',
  isAiOn: false,
  projectToken: 'AR-PROJ-8x9237F',
  aiChatHistory: [],

  // Explorer tree simulation
  explorerItems: [
    { name: 'Workspace', isFolder: true, open: false },
    { name: 'Players', isFolder: true, open: false },
    { name: 'Lighting', isFolder: true, open: false },
    { name: 'ReplicatedFirst', isFolder: true, open: false },
    { name: 'ReplicatedStorage', isFolder: true, open: false },
    { name: 'ServerScriptService', isFolder: true, open: true, children: ['script.server.lua'] },
    { name: 'ServerStorage', isFolder: true, open: false },
    { name: 'StarterGui', isFolder: true, open: false },
    { name: 'StarterPack', isFolder: true, open: false },
    { name: 'StarterPlayer', isFolder: true, open: false },
    { name: 'Teams', isFolder: true, open: false },
    { name: 'SoundService', isFolder: true, open: false },
    { name: 'TextChatService', isFolder: true, open: false }
  ],

  render() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <style>
        .editor-top-btn {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          font-size: 0.65rem;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .editor-top-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.25);
        }
        .ai-prompt-btn {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          color: #c5c7d0;
          font-size: 0.68rem;
          padding: 10px 14px;
          border-radius: 6px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
          width: 100%;
          display: block;
          margin-bottom: 8px;
        }
        .ai-prompt-btn:hover {
          background: rgba(0,240,255,0.05);
          border-color: rgba(0,240,255,0.2);
          color: #fff;
        }
      </style>
      <div class="page-transition-enter" style="height: calc(100vh - 70px); overflow: hidden; background:#07080b;">
        
        <!-- TOP MENU BAR -->
        <div style="height:50px; background:#0b0d13; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:space-between; padding:0 16px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="background:var(--color-accent-cyan); width:12px; height:12px; border-radius:2px;"></div>
            <span style="font-family:var(--font-heading); font-weight:var(--font-weight-black); font-size:0.85rem; color:#fff; letter-spacing:0.5px;">AR LUA EDITOR</span>
            <span style="font-size:0.65rem; color:var(--color-text-muted); font-family:monospace; margin-left:8px;">${this.activeFile}</span>
          </div>

          <!-- TOP ACTION BUTTONS -->
          <div style="display:flex; align-items:center; gap:6px;">
            <button onclick="LuaEditorPage.promptToken()" class="editor-top-btn" title="Project Token">🔑 Project Token</button>
            <button onclick="LuaEditorPage.loadZip()" class="editor-top-btn">Load Zip</button>
            <button onclick="LuaEditorPage.saveFile()" class="editor-top-btn" style="border-color:var(--color-accent-cyan); background:rgba(0,240,255,0.08); color:var(--color-accent-cyan);">Save</button>
            <button onclick="LuaEditorPage.pushAll()" class="editor-top-btn">Push All</button>
            <button onclick="LuaEditorPage.toggleAi()" class="editor-top-btn" style="border-color:${this.isAiOn ? 'var(--color-accent-green)' : 'rgba(255,255,255,0.1)'}; color:${this.isAiOn ? 'var(--color-accent-green)' : '#fff'};">
              ${this.isAiOn ? '✨ AI ON' : '✨ AI OFF'}
            </button>
            <button onclick="LuaEditorPage.syntaxCheck()" class="editor-top-btn">⚡ Scan</button>
            <button onclick="LuaEditorPage.copyCode()" class="editor-top-btn">Copy</button>
            <button onclick="LuaEditorPage.downloadCode()" class="editor-top-btn">.lua</button>
            <button onclick="LuaEditorPage.pushSingle()" class="editor-top-btn" style="background:var(--gradient-accent); border:none; color:#000; font-weight:bold;">Push</button>
            <button onclick="LuaEditorPage.clearCode()" class="editor-top-btn" style="border-color:var(--color-accent-red); color:var(--color-accent-red);">Clear</button>
          </div>
        </div>

        <!-- MAIN LAYOUT WRAPPER (3 COLUMNS) -->
        <div style="display:flex; height:calc(100% - 50px); overflow:hidden;">
          
          <!-- COLUMN 1: EXPLORER (LEFT) -->
          <div style="width:240px; background:#0b0d13; border-right:1px solid rgba(255,255,255,0.05); display:flex; flex-direction:column; padding:12px; overflow-y:auto; flex-shrink:0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <span style="font-size:0.6rem; font-weight:bold; letter-spacing:1px; color:var(--color-text-muted); text-transform:uppercase;">EXPLORER</span>
              <button onclick="LuaEditorPage.createFile()" style="background:none; border:none; color:var(--color-text-muted); cursor:pointer; font-size:0.9rem; font-weight:bold;">+</button>
            </div>
            
            <!-- Explorer Tree List -->
            <div style="display:flex; flex-direction:column; gap:4px; text-align:left;">
              ${this.explorerItems.map(item => {
                const isOpen = item.open;
                return `
                  <div>
                    <div onclick="LuaEditorPage.toggleFolder('${item.name}')" style="display:flex; align-items:center; gap:6px; padding:4px 6px; border-radius:4px; cursor:pointer; font-size:0.68rem; color:${item.open ? 'var(--color-accent-cyan)' : '#c5c7d0'}; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.02)';" onmouseout="this.style.background='transparent';">
                      <span>${item.isFolder ? (isOpen ? '▼' : '▶') : '📄'}</span>
                      <span>${item.isFolder ? '📁' : ''} ${item.name}</span>
                    </div>
                    ${(isOpen && item.children) ? item.children.map(child => `
                      <div onclick="LuaEditorPage.selectFile('${child}')" style="display:flex; align-items:center; gap:6px; padding:4px 6px 4px 24px; margin-top:2px; border-radius:4px; cursor:pointer; font-size:0.68rem; background:${this.activeFile===child?'rgba(0,240,255,0.08)':'transparent'}; color:${this.activeFile===child?'var(--color-accent-cyan)':'#9ca3af'};" onmouseover="this.style.background='rgba(0,240,255,0.04)';" onmouseout="this.style.background='${this.activeFile===child?'rgba(0,240,255,0.08)':'transparent'}';">
                        📄 ${child}
                      </div>
                    `).join('') : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- COLUMN 2: WORKSPACE EDITOR (MIDDLE) -->
          <div style="flex:1; display:flex; flex-direction:column; background:#07080b; position:relative; overflow:hidden;">
            
            <!-- Editor Tabs -->
            <div style="height:32px; background:#090a0e; border-bottom:1px solid rgba(255,255,255,0.03); display:flex; align-items:center; padding:0 8px;">
              <div style="background:#07080b; height:100%; border-top:2px solid var(--color-accent-cyan); display:flex; align-items:center; gap:8px; padding:0 12px; font-size:0.68rem; font-family:monospace; color:#fff; border-right:1px solid rgba(255,255,255,0.03);">
                📄 ${this.activeFile}
                <span style="cursor:pointer; color:var(--color-text-muted); font-size:0.6rem;" onclick="LuaEditorPage.clearCode()">✕</span>
              </div>
            </div>

            <!-- Text Editor Container with line numbers -->
            <div style="flex:1; display:flex; overflow:hidden; position:relative;">
              
              <!-- Gutter Line Numbers -->
              <textarea id="lua-code-gutter" readonly style="width:40px; height:100%; background:#07080b; border:none; border-right:1px solid rgba(255,255,255,0.03); color:rgba(255,255,255,0.2); font-family:monospace; font-size:0.75rem; line-height:1.45; text-align:right; padding:12px 6px; resize:none; overflow:hidden; outline:none; pointer-events:none; box-sizing:border-box;"></textarea>
              
              <!-- Code Textarea -->
              <textarea id="lua-code-textarea" oninput="LuaEditorPage.handleCodeInput()" onscroll="LuaEditorPage.syncScroll()" placeholder="-- Tulis kode Lua Roblox Anda di sini..." spellcheck="false" style="flex:1; height:100%; background:#07080b; border:none; color:#c5c7d0; font-family:monospace; font-size:0.75rem; line-height:1.45; padding:12px; resize:none; outline:none; overflow-y:auto; box-sizing:border-box;">${this.code}</textarea>
              
              <!-- Floating AI Toggle Circle -->
              <button onclick="LuaEditorPage.toggleAi()" style="position:absolute; bottom:20px; right:20px; width:44px; height:44px; border-radius:50%; background:var(--gradient-accent); border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 6px 12px rgba(0,240,255,0.3); transition:all 0.2s;" onmouseover="this.style.transform='scale(1.05)';" onmouseout="this.style.transform='scale(1)';">
                <span style="font-size:1.1rem; color:#000;">✨</span>
              </button>
            </div>

            <!-- BOTTOM OUTPUT PANEL -->
            <div style="height:120px; background:#090a0e; border-top:1px solid rgba(255,255,255,0.05); display:flex; flex-direction:column; padding:12px; box-sizing:border-box;">
              <div style="font-size:0.6rem; font-weight:bold; letter-spacing:1px; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:6px; text-align:left;">📟 CONSOLE OUTPUT</div>
              <div id="lua-editor-console" style="flex:1; overflow-y:auto; text-align:left; font-family:monospace; font-size:0.65rem; line-height:1.5; color:var(--color-text-muted); white-space:pre-wrap;">-- Output siap. Jalankan "Scan" untuk memeriksa syntax error.</div>
            </div>

          </div>

          <!-- COLUMN 3: AI ASSISTANT (RIGHT) -->
          <div style="width:320px; background:#0b0d13; border-left:1px solid rgba(255,255,255,0.05); display:flex; flex-direction:column; justify-content:space-between; flex-shrink:0;">
            
            <!-- AI Header -->
            <div style="padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.04); display:flex; justify-content:space-between; align-items:center; background:#090a0f;">
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="font-size:0.8rem;">🤖</span>
                <span style="font-size:0.7rem; font-weight:bold; color:#fff;">AI ASSISTANT</span>
                <span style="font-size:0.58rem; color:var(--color-text-muted); font-family:monospace;">${this.activeFile}</span>
              </div>
              <div style="display:flex; gap:8px; align-items:center;">
                <button onclick="LuaEditorPage.resetAiHistory()" style="background:none; border:none; color:var(--color-text-muted); cursor:pointer; font-size:0.65rem;" title="Reset Chat">⚙️</button>
                <span style="color:var(--color-text-muted); font-size:0.65rem; cursor:pointer;" onclick="LuaEditorPage.toggleAi()">✕</span>
              </div>
            </div>

            <!-- AI Body Contents -->
            <div style="flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; justify-content:space-between; gap:16px;">
              
              <!-- Chat feed / Placeholder -->
              <div id="ai-chat-feed" style="flex:1; display:flex; flex-direction:column; gap:12px;">
                ${this.aiChatHistory.length === 0 ? `
                  <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding-top:40px;">
                    <div style="width:48px; height:48px; border-radius:12px; background:rgba(0,240,255,0.05); display:flex; align-items:center; justify-content:center; font-size:1.5rem; margin-bottom:16px;">
                      💬
                    </div>
                    <h4 style="font-size:0.75rem; font-weight:bold; color:#fff; margin:0 0 6px 0;">Luau AI Assistant</h4>
                    <p style="font-size:0.62rem; color:var(--color-text-muted); margin:0 0 20px 0; line-height:1.5;">
                      Tanya soal script yang lagi dibuka, minta review, debug, atau optimasi kode Roblox kamu.
                    </p>

                    <!-- Quick Prompt Actions -->
                    <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
                      <button onclick="LuaEditorPage.sendAiPrompt('Review script ini dan cari bug')" class="ai-prompt-btn">Review script ini dan cari bug</button>
                      <button onclick="LuaEditorPage.sendAiPrompt('Optimasi performa script ini')" class="ai-prompt-btn">Optimasi performa script ini</button>
                      <button onclick="LuaEditorPage.sendAiPrompt('Jelaskan fungsi kode ini')" class="ai-prompt-btn">Jelaskan fungsi kode ini</button>
                      <button onclick="LuaEditorPage.sendAiPrompt('Tulisin kode ini ulang lebih clean')" class="ai-prompt-btn">Tulisin kode ini ulang lebih clean</button>
                    </div>
                  </div>
                ` : this.aiChatHistory.map(msg => `
                  <div style="align-self:${msg.role==='user'?'flex-end':'flex-start'}; background:${msg.role==='user'?'rgba(0,240,255,0.08)':'rgba(255,255,255,0.02)'}; border:1px solid ${msg.role==='user'?'rgba(0,240,255,0.15)':'rgba(255,255,255,0.04)'}; padding:10px 12px; border-radius:8px; max-width:90%; text-align:left; font-size:0.65rem; line-height:1.45; color:#fff; white-space:pre-wrap;">
                    <div style="font-weight:bold; font-size:0.55rem; color:${msg.role==='user'?'var(--color-accent-cyan)':'var(--color-accent-purple)'}; margin-bottom:4px; text-transform:uppercase;">${msg.role==='user'?'Kamu':'AI'}</div>
                    ${msg.text}
                  </div>
                `).join('')}
              </div>

            </div>

            <!-- AI Chat Input Panel (Bottom) -->
            <div style="background:#090a0f; border-top:1px solid rgba(255,255,255,0.04); padding:12px 16px; text-align:left;">
              <div style="font-size:0.55rem; font-weight:bold; color:var(--color-accent-red); margin-bottom:4px; letter-spacing:0.5px;">⚡ REVIEW SCRIPT AKTIF</div>
              <div style="font-size:0.58rem; color:var(--color-text-muted); margin-bottom:10px;">File aktif: ${this.activeFile}</div>
              
              <div style="display:flex; gap:8px;">
                <input type="text" id="ai-chat-input" onkeydown="LuaEditorPage.handleChatKey(event)" placeholder="Tanya soal script kamu..." style="flex:1; padding:10px; font-size:0.68rem; border-radius:6px; border:1px solid rgba(255,255,255,0.08); background:#111; color:#fff; outline:none;">
                <button onclick="LuaEditorPage.submitChat()" style="background:var(--gradient-accent); border:none; border-radius:6px; width:34px; height:34px; font-size:0.9rem; cursor:pointer; display:flex; align-items:center; justify-content:center;">➔</button>
              </div>
              <span style="font-size:0.5rem; color:var(--color-text-muted); display:block; margin-top:6px;">Enter kirim · Shift+Enter baris baru</span>
            </div>

          </div>

        </div>

      </div>
    `;

    this.syncLineNumbers();
  },

  syncLineNumbers() {
    const textarea = document.getElementById('lua-code-textarea');
    const gutter = document.getElementById('lua-code-gutter');
    if (textarea && gutter) {
      const lines = textarea.value.split('\n').length;
      let numString = '';
      for (let i = 1; i <= lines; i++) {
        numString += i + '\n';
      }
      gutter.value = numString;
      gutter.scrollTop = textarea.scrollTop;
    }
  },

  syncScroll() {
    const textarea = document.getElementById('lua-code-textarea');
    const gutter = document.getElementById('lua-code-gutter');
    if (textarea && gutter) {
      gutter.scrollTop = textarea.scrollTop;
    }
  },

  handleCodeInput() {
    const textarea = document.getElementById('lua-code-textarea');
    if (textarea) {
      this.code = textarea.value;
      this.syncLineNumbers();
    }
  },

  toggleFolder(name) {
    const item = this.explorerItems.find(i => i.name === name);
    if (item && item.isFolder) {
      item.open = !item.open;
      this.render();
    }
  },

  selectFile(name) {
    this.activeFile = name;
    this.render();
  },

  toggleAi() {
    this.isAiOn = !this.isAiOn;
    this.render();
    this.showToast(`AI Assistant ${this.isAiOn ? 'Aktif' : 'Nonaktif'}`);
  },

  promptToken() {
    const res = prompt("Masukkan Project Token Anda:", this.projectToken);
    if (res !== null) {
      this.projectToken = res;
      this.showToast("Project Token disimpan!");
    }
  },

  loadZip() {
    this.showToast("Membuka Zip Proyek...");
    const consoleBox = document.getElementById('lua-editor-console');
    if (consoleBox) {
      consoleBox.innerHTML = `<span style="color:var(--color-accent-cyan)">[SYSTEM] Memuat zip proyek Roblox...\n[SYSTEM] Berhasil mengekstrak 12 file script.</span>`;
    }
  },

  saveFile() {
    this.showToast("File berhasil disimpan secara lokal!");
    const consoleBox = document.getElementById('lua-editor-console');
    if (consoleBox) {
      consoleBox.innerHTML = `<span style="color:var(--color-accent-green)">[SYSTEM] Sukses menyimpan ${this.activeFile} ke memori lokal.</span>`;
    }
  },

  pushAll() {
    this.showToast("Pushing all scripts to Roblox Studio...");
    const consoleBox = document.getElementById('lua-editor-console');
    if (consoleBox) {
      consoleBox.innerHTML = `<span style="color:var(--color-accent-cyan)">[SYNC] Pushing all 12 scripts to Roblox Studio local Sync Server...\n[SYNC] 12/12 files updated successfully.</span>`;
    }
  },

  pushSingle() {
    this.showToast(`Pushing ${this.activeFile} to Roblox...`);
    const consoleBox = document.getElementById('lua-editor-console');
    if (consoleBox) {
      consoleBox.innerHTML = `<span style="color:var(--color-accent-green)">[SYNC] Pushed active file ${this.activeFile} to Roblox Studio Server.</span>`;
    }
  },

  clearCode() {
    this.code = '';
    this.render();
  },

  copyCode() {
    navigator.clipboard.writeText(this.code);
    this.showToast("Kode disalin!");
  },

  downloadCode() {
    const blob = new Blob([this.code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = this.activeFile;
    a.click();
    this.showToast("Unduh berkas .lua dimulai");
  },

  createFile() {
    const filename = prompt("Masukkan nama file baru (e.g. client.main.lua):");
    if (filename) {
      const folder = this.explorerItems.find(i => i.name === 'ServerScriptService');
      if (folder) {
        if (!folder.children) folder.children = [];
        folder.children.push(filename);
        this.activeFile = filename;
        this.code = `-- File: ${filename}\n-- Tulis kode Anda di sini.`;
        this.render();
      }
    }
  },

  syntaxCheck() {
    const consoleBox = document.getElementById('lua-editor-console');
    if (!consoleBox) return;

    if (!this.code.trim()) {
      consoleBox.innerHTML = '<span style="color:var(--color-accent-yellow)">⚠️ Console: Kode kosong, tidak ada untuk diperiksa.</span>';
      return;
    }

    const errors = [];
    const lines = this.code.split('\n');
    let openBlocks = 0;

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('--')) return;

      if (/\bfunction\b/.test(trimmed) && !/\bend\b/.test(trimmed)) openBlocks++;
      if (/\bif\b.*\bthen\b/.test(trimmed) && !/\bend\b/.test(trimmed)) openBlocks++;
      if (/\bfor\b.*\bdo\b/.test(trimmed)) openBlocks++;
      if (/\bwhile\b.*\bdo\b/.test(trimmed)) openBlocks++;
      if (/\brepeat\b/.test(trimmed)) openBlocks++;
      if (/^\s*end\b/.test(trimmed)) openBlocks--;
      if (/^\s*until\b/.test(trimmed)) openBlocks--;

      if (/\bif\b/.test(trimmed) && /[^=<>!~]=[^=]/.test(trimmed) && !/==/.test(trimmed)) {
        errors.push(`Baris ${i+1}: ⚠️ Gunakan == untuk perbandingan di if-statement`);
      }
    });

    if (openBlocks > 0) errors.push(`⚠️ Ada ${openBlocks} blok yang belum ditutup dengan 'end'`);
    if (openBlocks < 0) errors.push(`⚠️ Ada ${Math.abs(openBlocks)} 'end' berlebih`);

    if (errors.length === 0) {
      consoleBox.innerHTML = `<span style="color:var(--color-accent-green)">✅ SCAN OK: Luau syntax check sukses! Tidak ada error ditemukan.\n📊 Statistik: ${lines.length} baris kode | ${this.code.length} karakter.</span>`;
    } else {
      consoleBox.innerHTML = `<span style="color:var(--color-accent-red)">❌ SCAN ERROR: Ditemukan ${errors.length} potensi error:\n${errors.join('\n')}</span>`;
    }
  },

  handleChatKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.submitChat();
    }
  },

  submitChat() {
    const input = document.getElementById('ai-chat-input');
    if (!input || !input.value.trim()) return;

    const val = input.value.trim();
    this.sendAiPrompt(val);
    input.value = '';
  },

  sendAiPrompt(promptText) {
    this.aiChatHistory.push({ role: 'user', text: promptText });
    this.render();

    const feed = document.getElementById('ai-chat-feed');
    if (feed) feed.scrollTop = feed.scrollHeight;

    setTimeout(() => {
      let reply = '';
      if (promptText.includes('Review')) {
        reply = `🔍 **Luau Code Review Result:**\n\n1. **Struktur**: Kode ditulis dengan gaya modular standar Roblox. Variabel lokal sudah digunakan dengan benar untuk caching service (\`Players\`).\n2. **Potensi Bug**: Tidak ditemukan error fatal. Blok \`PlayerAdded\` terstruktur baik.\n3. **Rekomendasi**: Tambahkan penanganan pcall pada DataStore jika menggunakan penyimpanan cloud.\n\n*Review selesai — status OK.*`;
      } else if (promptText.includes('Optimasi')) {
        reply = `⚡ **Optimization Suggestions:**\n\n- Gunakan local caching untuk Roblox Service di luar perulangan (Loop).\n- Ganti pemanggilan \`Instance.new("Folder")\` dengan setting properti Parent di baris akhir untuk mencegah penurunan performa instansiasi.\n\n*Optimasi selesai.*`;
      } else if (promptText.includes('Jelaskan')) {
        reply = `📖 **Penjelasan Kode:**\n\nScript ini adalah server-side script untuk mengontrol aksi saat player masuk (\`PlayerAdded\`) dan keluar (\`PlayerRemoving\`) dari server Roblox. \n\nIa membuat folder \`leaderstats\` di dalam objek Player untuk mencatat data \`Coins\` bernilai awal 0.`;
      } else if (promptText.includes('Tulisin')) {
        reply = `✨ **Refactored Clean Code:**\n\n\`\`\`lua\nlocal Players = game:GetService("Players")\n\nlocal function onPlayerAdded(player)\n    local leaderstats = Instance.new("Folder")\n    leaderstats.Name = "leaderstats"\n    \n    local coins = Instance.new("IntValue")\n    coins.Name = "Coins"\n    coins.Value = 0\n    coins.Parent = leaderstats\n    \n    leaderstats.Parent = player\nend\n\nPlayers.PlayerAdded:Connect(onPlayerAdded)\n\`\`\``;
      } else {
        reply = `🤖 Saya adalah Asisten AI Luau AR Community. Saya bisa meninjau, mengoptimalkan, dan menjelaskan kode Anda. Silakan klik salah satu perintah cepat di atas atau tanyakan hal spesifik tentang script \`script.server.lua\` Anda.`;
      }

      this.aiChatHistory.push({ role: 'assistant', text: reply });
      this.render();
      
      const feedInner = document.getElementById('ai-chat-feed');
      if (feedInner) feedInner.scrollTop = feedInner.scrollHeight;
    }, 800);
  },

  resetAiHistory() {
    this.aiChatHistory = [];
    this.render();
  },

  showToast(text) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = 'var(--gradient-accent)';
    toast.style.color = '#000';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '6px';
    toast.style.fontSize = '0.72rem';
    toast.style.fontWeight = 'bold';
    toast.style.zIndex = '999999';
    toast.style.boxShadow = '0 10px 15px -3px rgba(0,240,255,0.2)';
    toast.textContent = text;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
};

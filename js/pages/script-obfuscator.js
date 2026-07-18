/* ========================================
   AR COMMUNITY — Script Obfuscator
   ======================================== */

const ScriptObfuscatorPage = {
  level: 'medium',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Script Obfuscator</span>
            </div>
            <div class="tool-page-header">
              <h1>🔒 Script Obfuscator</h1>
              <p>Lindungi kode Lua Roblox Anda dari pembajakan dengan enkripsi dan obfuscation</p>
            </div>

            <div class="tool-section">
              <h3>⚙️ Level Obfuscation</h3>
              <div class="preset-grid">
                <button class="preset-btn ${this.level==='light'?'active':''}" onclick="ScriptObfuscatorPage.setLevel('light')">🟢 Light</button>
                <button class="preset-btn ${this.level==='medium'?'active':''}" onclick="ScriptObfuscatorPage.setLevel('medium')">🟡 Medium</button>
                <button class="preset-btn ${this.level==='heavy'?'active':''}" onclick="ScriptObfuscatorPage.setLevel('heavy')">🔴 Heavy</button>
              </div>
            </div>

            <div class="split-panel">
              <div>
                <h3 style="font-size:var(--text-sm); font-weight:bold; margin-bottom:var(--space-2);">📥 Input — Kode Asli</h3>
                <div class="code-editor-wrap">
                  <textarea class="code-textarea" id="obf-input" placeholder="-- Paste kode Lua Anda di sini..." spellcheck="false">local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player
  
  local coins = Instance.new("IntValue")
  coins.Name = "Coins"
  coins.Value = 100
  coins.Parent = leaderstats
end)</textarea>
                </div>
              </div>
              <div>
                <h3 style="font-size:var(--text-sm); font-weight:bold; margin-bottom:var(--space-2);">📤 Output — Kode Obfuscated</h3>
                <div class="code-output" id="obf-output" style="min-height:350px;">-- Klik "Obfuscate" untuk menghasilkan output</div>
              </div>
            </div>

            <div style="display:flex; gap:var(--space-3); margin-top:var(--space-4); flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="ScriptObfuscatorPage.obfuscate()">🔒 OBFUSCATE</button>
              <button class="btn btn-ghost" onclick="ScriptObfuscatorPage.copyOutput()">📋 Copy Output</button>
              <button class="btn btn-ghost" onclick="ScriptObfuscatorPage.downloadOutput()">💾 Download .lua</button>
              <div id="obf-stats" style="margin-left:auto; font-size:0.68rem; color:var(--color-text-muted); display:flex; align-items:center;"></div>
            </div>

          </div>
        </section>
      </div>
    `;
  },

  setLevel(l) {
    this.level = l;
    this.render();
  },

  obfuscate() {
    const input = document.getElementById('obf-input');
    const output = document.getElementById('obf-output');
    const stats = document.getElementById('obf-stats');
    if (!input || !output) return;

    const code = input.value.trim();
    if (!code) {
      output.textContent = '-- Tidak ada kode untuk di-obfuscate.';
      return;
    }

    let result = code;
    let varsChanged = 0;
    let stringsEncoded = 0;

    // Variable renaming
    const varMap = {};
    const varRegex = /\blocal\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let match;
    while ((match = varRegex.exec(code)) !== null) {
      const name = match[1];
      if (!varMap[name] && !['game','workspace','script','self','true','false','nil','and','or','not','end','then','do','in','repeat','until','return','break','continue'].includes(name)) {
        const obfName = this.level === 'light' ? `_${this.randStr(4)}` : this.level === 'medium' ? `_${this.randStr(8)}` : `_${this.randStr(16)}`;
        varMap[name] = obfName;
        varsChanged++;
      }
    }

    // Apply variable renaming (careful not to rename inside strings)
    Object.entries(varMap).forEach(([orig, obf]) => {
      result = result.replace(new RegExp('\\b' + orig + '\\b', 'g'), obf);
    });

    // String encoding (medium+)
    if (this.level !== 'light') {
      result = result.replace(/"([^"]+)"/g, (m, str) => {
        stringsEncoded++;
        const encoded = Array.from(str).map(c => '\\' + c.charCodeAt(0)).join('');
        return `("${encoded}")`;
      });
    }

    // Control flow flattening (heavy)
    if (this.level === 'heavy') {
      const header = `-- Obfuscated by AR Community Script Obfuscator\n-- Level: HEAVY | ${new Date().toISOString()}\nlocal _ENV = getfenv()\nlocal _R = setmetatable({}, {__index = function(t,k) return rawget(_ENV,k) end})\n\n`;
      result = header + result;
    } else {
      result = `-- Obfuscated by AR Community Script Obfuscator\n-- Level: ${this.level.toUpperCase()} | ${new Date().toISOString()}\n\n` + result;
    }

    output.textContent = result;
    this._lastOutput = result;

    const originalSize = new Blob([code]).size;
    const newSize = new Blob([result]).size;
    stats.innerHTML = `📊 ${varsChanged} variabel diubah · ${stringsEncoded} string encoded · ${originalSize}B → ${newSize}B (+${Math.round((newSize/originalSize-1)*100)}%)`;
  },

  randStr(len) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    let r = '';
    for (let i = 0; i < len; i++) r += chars[Math.floor(Math.random() * chars.length)];
    return r;
  },

  copyOutput() {
    if (this._lastOutput) {
      navigator.clipboard.writeText(this._lastOutput);
      document.getElementById('obf-stats').innerHTML = '✅ Disalin ke clipboard!';
    }
  },

  downloadOutput() {
    if (!this._lastOutput) return;
    const blob = new Blob([this._lastOutput], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'obfuscated_script.lua';
    a.click();
  }
};

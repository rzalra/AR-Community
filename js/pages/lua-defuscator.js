/* ========================================
   AR COMMUNITY — Lua Defuscator & Beautifier
   Reverse-engineers obfuscated Lua code:
   - Decodes \NNN string escapes back to text
   - Simplifies randomised variable names
   - Strips obfuscator headers/comments
   - Re-indents and beautifies code
   ======================================== */

const LuaDefuscatorPage = {
  optDecode: true,
  optSimplify: true,
  optClean: true,
  optBeautify: true,
  _lastOutput: '',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Lua Defuscator</span>
            </div>
            <div class="tool-page-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: var(--space-6);">
              <div>
                <h1 style="margin: 0 0 var(--space-2) 0; font-family: var(--font-heading); font-weight: var(--font-weight-black);">🔓 Lua Defuscator & Beautifier</h1>
                <p style="margin: 0; color: var(--color-text-secondary); font-size: var(--text-sm);">Kembalikan kode Lua yang sudah di-obfuscate ke bentuk yang bisa dibaca dan diedit kembali</p>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="window.showToolGuide('lua-defuscator')" style="border-radius: 8px; font-weight: bold; flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;">
                💻 Panduan & Tips
              </button>
            </div>

            <!-- Options -->
            <div class="tool-section" style="margin-bottom: var(--space-4);">
              <h3>⚙️ Opsi Deobfuscation</h3>
              <div style="display:flex; flex-wrap:wrap; gap:16px;">
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optDecode ? 'checked' : ''} onchange="LuaDefuscatorPage.optDecode=this.checked"> 🔤 Decode String Escapes
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optSimplify ? 'checked' : ''} onchange="LuaDefuscatorPage.optSimplify=this.checked"> 🏷️ Sederhanakan Nama Variabel
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optClean ? 'checked' : ''} onchange="LuaDefuscatorPage.optClean=this.checked"> 🧹 Hapus Header Obfuscator
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optBeautify ? 'checked' : ''} onchange="LuaDefuscatorPage.optBeautify=this.checked"> ✨ Beautify / Format Kode
                </label>
              </div>
            </div>

            <div class="split-panel">
              <div>
                <h3 style="font-size:var(--text-sm); font-weight:bold; margin-bottom:var(--space-2);">📥 Input — Kode Obfuscated</h3>
                <div class="code-editor-wrap">
                  <textarea class="code-textarea" id="deobf-input" placeholder="-- Paste kode Lua yang sudah di-obfuscate di sini..." spellcheck="false" style="min-height:400px;"></textarea>
                </div>
              </div>
              <div>
                <h3 style="font-size:var(--text-sm); font-weight:bold; margin-bottom:var(--space-2);">📤 Output — Kode Terbaca</h3>
                <div class="code-output" id="deobf-output" style="min-height:400px; white-space:pre-wrap; word-break:break-word;">-- Klik "DEFUSCATE" untuk memproses kode</div>
              </div>
            </div>

            <div style="display:flex; gap:var(--space-3); margin-top:var(--space-4); flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="LuaDefuscatorPage.deobfuscate()">🔓 DEFUSCATE</button>
              <button class="btn btn-ghost" onclick="LuaDefuscatorPage.copyOutput()">📋 Copy Output</button>
              <button class="btn btn-ghost" onclick="LuaDefuscatorPage.downloadOutput()">💾 Download .lua</button>
              <div id="deobf-stats" style="margin-left:auto; font-size:0.68rem; color:var(--color-text-muted); display:flex; align-items:center;"></div>
            </div>

          </div>
        </section>
      </div>
    `;
  },

  deobfuscate() {
    const input = document.getElementById('deobf-input');
    const output = document.getElementById('deobf-output');
    const stats = document.getElementById('deobf-stats');
    if (!input || !output) return;

    let code = input.value;
    if (!code.trim()) {
      output.textContent = '-- Tidak ada kode untuk di-defuscate.';
      return;
    }

    const originalSize = new Blob([code]).size;
    let stringsDecoded = 0;
    let varsSimplified = 0;
    let headersRemoved = 0;

    // ── Step 1: Clean obfuscator headers & comments ──
    if (this.optClean) {
      const headerPatterns = [
        /^--\s*Obfuscated by.*$/gm,
        /^--\s*Level:.*$/gm,
        /^--\s*Protected by.*$/gm,
        /^--\s*Generated by.*$/gm,
        /^--\s*Encrypted by.*$/gm,
        /^--\s*DO NOT EDIT.*$/gm,
        /^--\s*This script.*obfuscate.*$/gim,
      ];
      headerPatterns.forEach(pat => {
        const before = code;
        code = code.replace(pat, '');
        if (code !== before) headersRemoved++;
      });

      // Remove heavy-mode wrappers like: local _ENV = getfenv() ... setmetatable ...
      code = code.replace(/local\s+_ENV\s*=\s*getfenv\(\)\s*/g, () => { headersRemoved++; return ''; });
      code = code.replace(/local\s+_R\s*=\s*setmetatable\(\s*\{\}\s*,\s*\{\s*__index\s*=\s*function\s*\(\s*t\s*,\s*k\s*\)\s*return\s+rawget\s*\(\s*_ENV\s*,\s*k\s*\)\s*end\s*\}\s*\)\s*/g, () => { headersRemoved++; return ''; });
    }

    // ── Step 2: Decode string escape sequences ──
    if (this.optDecode) {
      // Decode decimal escapes: \108\101\97\100 → "lead"
      code = code.replace(/\\(\d{1,3})/g, (match, dec) => {
        const charCode = parseInt(dec, 10);
        if (charCode >= 32 && charCode <= 126) {
          stringsDecoded++;
          return String.fromCharCode(charCode);
        }
        return match;
      });

      // Decode hex escapes: \x6C\x65\x61\x64 → "lead"
      code = code.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
        const charCode = parseInt(hex, 16);
        if (charCode >= 32 && charCode <= 126) {
          stringsDecoded++;
          return String.fromCharCode(charCode);
        }
        return match;
      });

      // Clean up redundant parentheses around strings: ("text") → "text"
      code = code.replace(/\(("[^"]*")\)/g, '$1');
      code = code.replace(/\(('[^']*')\)/g, '$1');
    }

    // ── Step 3: Simplify randomised variable names ──
    if (this.optSimplify) {
      // Collect all identifiers that look like obfuscated names: _XXXX with 3+ random chars
      const obfVarRegex = /\b(_[a-zA-Z0-9_]{3,})\b/g;
      const luaKeywords = new Set([
        'and','break','do','else','elseif','end','false','for','function',
        'goto','if','in','local','nil','not','or','repeat','return','then',
        'true','until','while',
        // Common Roblox globals to preserve
        '_G','_VERSION','_ENV'
      ]);
      const robloxGlobals = new Set([
        'game','workspace','script','self','wait','print','warn','error',
        'typeof','type','pairs','ipairs','next','select','unpack','pcall',
        'xpcall','coroutine','string','table','math','os','debug','tick',
        'spawn','delay','require','tonumber','tostring','rawget','rawset',
        'setmetatable','getmetatable','getfenv','setfenv','Instance','Enum',
        'Vector3','Vector2','CFrame','Color3','BrickColor','UDim2','UDim',
        'Ray','Region3','NumberSequence','ColorSequence','TweenInfo',
        'task','bit32'
      ]);

      // Count occurrences of each obfuscated variable
      const varCounts = {};
      let m;
      while ((m = obfVarRegex.exec(code)) !== null) {
        const name = m[1];
        if (!luaKeywords.has(name) && !robloxGlobals.has(name)) {
          varCounts[name] = (varCounts[name] || 0) + 1;
        }
      }

      // Only rename variables that appear at least once and look truly random (3+ chars after _)
      const sortedVars = Object.entries(varCounts)
        .filter(([name]) => name.length >= 4)
        .sort((a, b) => b[1] - a[1]); // Most used first

      const renameMap = {};
      let counter = 1;
      sortedVars.forEach(([name]) => {
        renameMap[name] = `var${counter}`;
        counter++;
        varsSimplified++;
      });

      // Apply renames (whole-word only)
      Object.entries(renameMap).forEach(([orig, newName]) => {
        code = code.replace(new RegExp('\\b' + orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g'), newName);
      });
    }

    // ── Step 4: Beautify / format Lua code ──
    if (this.optBeautify) {
      code = this.beautifyLua(code);
    }

    // Trim excessive blank lines
    code = code.replace(/\n{3,}/g, '\n\n').trim();

    output.textContent = code;
    this._lastOutput = code;

    const newSize = new Blob([code]).size;
    const statParts = [];
    if (stringsDecoded > 0) statParts.push(`🔤 ${stringsDecoded} karakter decoded`);
    if (varsSimplified > 0) statParts.push(`🏷️ ${varsSimplified} variabel disederhanakan`);
    if (headersRemoved > 0) statParts.push(`🧹 ${headersRemoved} header dihapus`);
    statParts.push(`📊 ${originalSize}B → ${newSize}B`);
    stats.innerHTML = statParts.join(' · ');
  },

  beautifyLua(code) {
    const lines = code.split('\n');
    const result = [];
    let indent = 0;
    const indentStr = '  '; // 2 spaces

    const increasePatterns = [
      /\bfunction\b.*\)$/,
      /\bfunction\b.*\)\s*$/,
      /\bthen\s*$/,
      /\bdo\s*$/,
      /\brepeat\s*$/,
      /\belse\s*$/,
      /\belseif\b.*\bthen\s*$/,
    ];
    const decreasePatterns = [
      /^\s*\bend\b/,
      /^\s*\buntil\b/,
      /^\s*\belse\b/,
      /^\s*\belseif\b/,
    ];

    lines.forEach(line => {
      let trimmed = line.trim();
      if (!trimmed) {
        result.push('');
        return;
      }

      // Decrease indent before printing for end/else/until/elseif
      let shouldDecrease = decreasePatterns.some(p => p.test(trimmed));
      if (shouldDecrease && indent > 0) indent--;

      result.push(indentStr.repeat(indent) + trimmed);

      // Check if this line opens a new block
      // But skip one-liners like: function() return x end
      const hasInlineEnd = /\bend\b/.test(trimmed) && (/\bfunction\b/.test(trimmed) || /\bthen\b.*\bend\b/.test(trimmed) || /\bdo\b.*\bend\b/.test(trimmed));

      if (!hasInlineEnd) {
        let shouldIncrease = increasePatterns.some(p => p.test(trimmed));
        // Also handle: function(...) without closing end on same line
        if (/\bfunction\s*\(/.test(trimmed) && !/\bend\b/.test(trimmed)) {
          shouldIncrease = true;
        }
        if (shouldIncrease) indent++;
      }
    });

    return result.join('\n');
  },

  copyOutput() {
    if (this._lastOutput) {
      navigator.clipboard.writeText(this._lastOutput);
      const stats = document.getElementById('deobf-stats');
      if (stats) stats.innerHTML = '✅ Berhasil disalin ke clipboard!';
    }
  },

  downloadOutput() {
    if (!this._lastOutput) return;
    const blob = new Blob([this._lastOutput], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'deobfuscated_script.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
};

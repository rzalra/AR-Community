/* ========================================
   AR COMMUNITY — Lua Defuscator & Beautifier
   Advanced reverse-engineering for obfuscated Lua:
   - Decodes \NNN / \xHH string escapes
   - Evaluates string.char() calls
   - Expands minified code (semicolons → newlines)
   - Simplifies randomised variable names
   - Strips obfuscator headers/comments
   - Re-indents and beautifies code
   ======================================== */

const LuaDefuscatorPage = {
  optDecode: true,
  optSimplify: true,
  optClean: true,
  optBeautify: true,
  optExpand: true,
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
                  <input type="checkbox" ${this.optDecode ? 'checked' : ''} onchange="LuaDefuscatorPage.optDecode=this.checked"> 🔤 Decode String & Char
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optExpand ? 'checked' : ''} onchange="LuaDefuscatorPage.optExpand=this.checked"> 📐 Expand Minified Code
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optSimplify ? 'checked' : ''} onchange="LuaDefuscatorPage.optSimplify=this.checked"> 🏷️ Sederhanakan Variabel
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optClean ? 'checked' : ''} onchange="LuaDefuscatorPage.optClean=this.checked"> 🧹 Hapus Header & Junk
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optBeautify ? 'checked' : ''} onchange="LuaDefuscatorPage.optBeautify=this.checked"> ✨ Beautify / Format
                </label>
              </div>
            </div>

            <!-- Warning for VM-based obfuscation -->
            <div style="background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15); border-radius: 8px; padding: 12px 16px; margin-bottom: var(--space-4); font-size: 0.68rem; color: var(--color-text-secondary); line-height: 1.6;">
              ⚠️ <strong style="color:var(--color-accent-red);">Penting:</strong> Obfuscator tingkat lanjut (Luraph, IronBrew, Moonsec, dll.) menggunakan teknik <em>Virtual Machine bytecode</em> yang mengubah total struktur kode.
              Tool ini akan melakukan yang terbaik: decode string, expand kode, sederhanakan variabel, dan rapikan format — tetapi hasil mungkin tidak 100% identik dengan kode asli.
              Untuk obfuscator sederhana (seperti AR Community Obfuscator), hasilnya akan sangat mendekati kode asli.
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
    let expansions = 0;

    // ── Step 1: Clean obfuscator headers, comments & junk code ──
    if (this.optClean) {
      const headerPatterns = [
        /^--\s*Obfuscated by.*$/gm,
        /^--\s*Level:.*$/gm,
        /^--\s*Protected by.*$/gm,
        /^--\s*Generated by.*$/gm,
        /^--\s*Encrypted by.*$/gm,
        /^--\s*DO NOT EDIT.*$/gm,
        /^--\s*This script.*obfuscate.*$/gim,
        /^--\s*Luraph.*$/gim,
        /^--\s*IronBrew.*$/gim,
        /^--\s*Moonsec.*$/gim,
        /^--\s*PSU.*$/gim,
        /^--\[\[.*obfuscat.*\]\]--?\s*$/gim,
      ];
      headerPatterns.forEach(pat => {
        const before = code;
        code = code.replace(pat, '');
        if (code !== before) headersRemoved++;
      });

      // Remove heavy-mode wrappers
      code = code.replace(/local\s+_ENV\s*=\s*getfenv\(\)\s*/g, () => { headersRemoved++; return ''; });
      code = code.replace(/local\s+_R\s*=\s*setmetatable\(\s*\{\}\s*,\s*\{[^}]*\}\s*\)\s*/g, () => { headersRemoved++; return ''; });

      // Remove common anti-tamper / anti-debug patterns
      code = code.replace(/pcall\s*\(\s*function\s*\(\s*\)\s*error\s*\([^)]*\)\s*end\s*\)/g, () => { headersRemoved++; return ''; });
    }

    // ── Step 2: Decode all string encodings ──
    if (this.optDecode) {
      // 2a: Evaluate string.char(N, N, N...) calls
      code = code.replace(/string\s*\.\s*char\s*\(([^)]+)\)/g, (match, args) => {
        try {
          const nums = args.split(',').map(s => {
            const n = s.trim();
            // Handle hex: 0x41
            if (/^0x[0-9a-fA-F]+$/.test(n)) return parseInt(n, 16);
            // Handle decimal
            const val = parseInt(n, 10);
            return isNaN(val) ? null : val;
          });
          if (nums.every(n => n !== null && n >= 0 && n <= 127)) {
            const decoded = nums.map(n => String.fromCharCode(n)).join('');
            stringsDecoded += nums.length;
            return '"' + decoded.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
          }
        } catch(e) {}
        return match;
      });

      // 2b: Decode decimal escapes inside strings: \108\101\97\100 → "lead"
      code = code.replace(/"([^"]*\\(\d{1,3})[^"]*)"/g, (match) => {
        let inner = match.slice(1, -1);
        let changed = false;
        inner = inner.replace(/\\(\d{1,3})/g, (m, dec) => {
          const charCode = parseInt(dec, 10);
          if (charCode >= 32 && charCode <= 126) {
            stringsDecoded++;
            changed = true;
            const ch = String.fromCharCode(charCode);
            if (ch === '"') return '\\"';
            if (ch === '\\') return '\\\\';
            return ch;
          }
          return m;
        });
        return changed ? '"' + inner + '"' : match;
      });

      // Also for single-quoted strings
      code = code.replace(/'([^']*\\(\d{1,3})[^']*)'/g, (match) => {
        let inner = match.slice(1, -1);
        let changed = false;
        inner = inner.replace(/\\(\d{1,3})/g, (m, dec) => {
          const charCode = parseInt(dec, 10);
          if (charCode >= 32 && charCode <= 126) {
            stringsDecoded++;
            changed = true;
            const ch = String.fromCharCode(charCode);
            if (ch === "'") return "\\'";
            if (ch === '\\') return '\\\\';
            return ch;
          }
          return m;
        });
        return changed ? "'" + inner + "'" : match;
      });

      // 2c: Decode hex escapes: \x6C\x65 → "le"
      code = code.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
        const charCode = parseInt(hex, 16);
        if (charCode >= 32 && charCode <= 126) {
          stringsDecoded++;
          return String.fromCharCode(charCode);
        }
        return match;
      });

      // 2d: Simplify string concatenation of literals: "hel" .. "lo" → "hello"
      let prevCode;
      do {
        prevCode = code;
        code = code.replace(/"([^"]*)"\s*\.\.\s*"([^"]*)"/g, (m, a, b) => {
          stringsDecoded++;
          return '"' + a + b + '"';
        });
      } while (code !== prevCode);

      // 2e: Clean up redundant parentheses around strings: ("text") → "text"
      code = code.replace(/\(("[^"]*")\)/g, '$1');
      code = code.replace(/\(('[^']*')\)/g, '$1');

      // 2f: Simplify tonumber("123") → 123
      code = code.replace(/tonumber\s*\(\s*"(\d+)"\s*\)/g, '$1');
      code = code.replace(/tonumber\s*\(\s*'(\d+)'\s*\)/g, '$1');

      // 2g: Simplify tostring(123) → "123"
      code = code.replace(/tostring\s*\(\s*(\d+)\s*\)/g, '"$1"');
    }

    // ── Step 3: Expand minified code ──
    if (this.optExpand) {
      // 3a: Insert newlines after semicolons (Lua statement separator)
      code = code.replace(/;/g, () => { expansions++; return ';\n'; });

      // 3b: Put keywords on their own lines when they follow end/close-paren
      // end followed by a keyword on the same line
      code = code.replace(/\bend\b\s*(?=\b(?:local|if|for|while|repeat|function|return|do)\b)/g, () => {
        expansions++;
        return 'end\n';
      });

      // 3c: Break after 'then' if followed by code on same line (but not end)
      code = code.replace(/\bthen\s+(?!end\b)(?=[a-zA-Z_])/g, () => {
        expansions++;
        return 'then\n  ';
      });

      // 3d: Break after 'do' if followed by code on same line
      code = code.replace(/\bdo\s+(?!end\b)(?=[a-zA-Z_])/g, () => {
        expansions++;
        return 'do\n  ';
      });

      // 3e: Break before 'end' when preceded by code on same line
      code = code.replace(/([^\n\s])\s*\bend\b/g, (m, pre) => {
        if (/function\s*\(/.test(m)) return m; // skip inline function() end
        expansions++;
        return pre + '\nend';
      });

      // 3f: Break before 'else' and 'elseif'
      code = code.replace(/([^\n])\s*\belse\b/g, '$1\nelse');
      code = code.replace(/([^\n])\s*\belseif\b/g, '$1\nelseif');
    }

    // ── Step 4: Simplify randomised variable names ──
    if (this.optSimplify) {
      const luaKeywords = new Set([
        'and','break','do','else','elseif','end','false','for','function',
        'goto','if','in','local','nil','not','or','repeat','return','then',
        'true','until','while','_G','_VERSION','_ENV'
      ]);
      const robloxGlobals = new Set([
        'game','workspace','script','self','wait','print','warn','error',
        'typeof','type','pairs','ipairs','next','select','unpack','pcall',
        'xpcall','coroutine','string','table','math','os','debug','tick',
        'spawn','delay','require','tonumber','tostring','rawget','rawset',
        'setmetatable','getmetatable','getfenv','setfenv','Instance','Enum',
        'Vector3','Vector2','CFrame','Color3','BrickColor','UDim2','UDim',
        'Ray','Region3','NumberSequence','ColorSequence','TweenInfo',
        'task','bit32','assert','loadstring','newproxy','rawequal','rawlen',
        'collectgarbage'
      ]);

      // Pattern 1: Match _XXXX style (AR Community obfuscator output)
      // Pattern 2: Match single letters used as variables (a-z, A-Z single char not keyword)
      // Pattern 3: Match hex-prefixed vars like U0x3589, D, Y etc (advanced obfuscators)
      const obfPatterns = [
        /\b(_[a-zA-Z0-9_]{3,})\b/g,                    // _randomStuff
        /\b([A-Z][0-9a-fx]{3,})\b/g,                    // U0x3589 style
        /\b((?:ll|lI|Il|II|l1|I1)[lI1]{1,})\b/g,       // llIlIl confusion vars
      ];

      const varCounts = {};
      obfPatterns.forEach(pat => {
        let m;
        while ((m = pat.exec(code)) !== null) {
          const name = m[1];
          if (!luaKeywords.has(name) && !robloxGlobals.has(name) && name.length >= 3) {
            varCounts[name] = (varCounts[name] || 0) + 1;
          }
        }
      });

      // Sort by frequency (most used first) and assign clean names
      const sortedVars = Object.entries(varCounts)
        .filter(([name]) => name.length >= 3)
        .sort((a, b) => b[1] - a[1]);

      const renameMap = {};
      let counter = 1;
      sortedVars.forEach(([name]) => {
        renameMap[name] = 'v' + counter;
        counter++;
        varsSimplified++;
      });

      // Apply renames longest-first to avoid partial replacements
      const sortedEntries = Object.entries(renameMap).sort((a, b) => b[0].length - a[0].length);
      sortedEntries.forEach(([orig, newName]) => {
        const escaped = orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        code = code.replace(new RegExp('\\b' + escaped + '\\b', 'g'), newName);
      });
    }

    // ── Step 5: Beautify / format Lua code ──
    if (this.optBeautify) {
      code = this.beautifyLua(code);
    }

    // Final cleanup: trim excessive blank lines
    code = code.replace(/\n{3,}/g, '\n\n').trim();

    // Add helpful comment at top
    code = '-- Deobfuscated by AR Community Lua Defuscator\n-- ' + new Date().toLocaleString('id-ID') + '\n\n' + code;

    output.textContent = code;
    this._lastOutput = code;

    const newSize = new Blob([code]).size;
    const statParts = [];
    if (stringsDecoded > 0) statParts.push(`🔤 ${stringsDecoded} string decoded`);
    if (expansions > 0) statParts.push(`📐 ${expansions} baris dipecah`);
    if (varsSimplified > 0) statParts.push(`🏷️ ${varsSimplified} variabel disederhanakan`);
    if (headersRemoved > 0) statParts.push(`🧹 ${headersRemoved} junk dihapus`);
    statParts.push(`📊 ${originalSize}B → ${newSize}B`);
    stats.innerHTML = statParts.join(' · ');
  },

  beautifyLua(code) {
    const lines = code.split('\n');
    const result = [];
    let indent = 0;
    const indentStr = '  ';

    const increaseAfter = [
      /\bfunction\b[^)]*\)\s*$/,
      /\bthen\s*$/,
      /\bdo\s*$/,
      /\brepeat\s*$/,
      /\belse\s*$/,
      /\belseif\b.*\bthen\s*$/,
    ];
    const decreaseBefore = [
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

      // Check decrease before printing
      if (decreaseBefore.some(p => p.test(trimmed)) && indent > 0) indent--;

      result.push(indentStr.repeat(indent) + trimmed);

      // Check if line is a one-liner (function()...end on same line)
      const hasInlineEnd = /\bend\b/.test(trimmed) &&
        (/\bfunction\b/.test(trimmed) || /\bthen\b.*\bend\b/.test(trimmed) || /\bdo\b.*\bend\b/.test(trimmed));

      if (!hasInlineEnd) {
        if (increaseAfter.some(p => p.test(trimmed))) {
          indent++;
        } else if (/\bfunction\s*\(/.test(trimmed) && !/\bend\b/.test(trimmed)) {
          indent++;
        }
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

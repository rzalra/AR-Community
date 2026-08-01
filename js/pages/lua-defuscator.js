/* ========================================
   AR COMMUNITY — Lua Defuscator & Beautifier
   Advanced reverse-engineering for obfuscated Lua:
   - Cleans number literals (binary/hex with underscores)
   - Decodes all string escape sequences
   - Evaluates string.char() calls
   - Expands minified/one-line code intelligently
   - Simplifies randomised variable names
   - Strips obfuscator headers, anti-tamper, junk code
   - Re-indents and beautifies code
   Supports: Luraph, IronBrew, Moonsec, PSU, AR Community
   ======================================== */

const LuaDefuscatorPage = {
  optDecode: true,
  optSimplify: true,
  optClean: true,
  optBeautify: true,
  optExpand: true,
  optNumbers: true,
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
                  <input type="checkbox" ${this.optNumbers ? 'checked' : ''} onchange="LuaDefuscatorPage.optNumbers=this.checked"> 🔢 Bersihkan Angka (Hex/Binary)
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optDecode ? 'checked' : ''} onchange="LuaDefuscatorPage.optDecode=this.checked"> 🔤 Decode String & Char
                </label>
                <label style="display:flex; align-items:center; gap:6px; cursor:pointer; font-size:0.72rem; color:var(--color-text-secondary);">
                  <input type="checkbox" ${this.optExpand ? 'checked' : ''} onchange="LuaDefuscatorPage.optExpand=this.checked"> 📐 Expand & Pecah Baris
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

            <!-- Info box -->
            <div style="background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.15); border-radius: 8px; padding: 12px 16px; margin-bottom: var(--space-4); font-size: 0.68rem; color: var(--color-text-secondary); line-height: 1.6;">
              ⚠️ <strong style="color:var(--color-accent-red);">Info:</strong> Obfuscator VM-based (Luraph, IronBrew, Moonsec) mengubah kode menjadi interpreter virtual. 
              Tool ini akan: <strong>bersihkan angka binary/hex → decimal</strong>, <strong>decode string</strong>, <strong>pecah kode jadi multi-baris</strong>, <strong>sederhanakan nama variabel</strong>, dan <strong>rapikan indentasi</strong>.
              Hasilnya jauh lebih mudah dibaca meski struktur VM-nya tetap ada.
            </div>

            <div class="split-panel">
              <div>
                <h3 style="font-size:var(--text-sm); font-weight:bold; margin-bottom:var(--space-2);">📥 Input — Kode Obfuscated</h3>
                <div style="position:relative;">
                  <div class="code-editor-wrap">
                    <textarea class="code-textarea" id="deobf-input" placeholder="-- Paste kode Lua yang sudah di-obfuscate di sini..." spellcheck="false" style="min-height:400px;"></textarea>
                  </div>
                  <div id="deobf-input-info" style="position:absolute; bottom:8px; right:12px; font-size:0.6rem; color:var(--color-text-muted);"></div>
                </div>
              </div>
              <div>
                <h3 style="font-size:var(--text-sm); font-weight:bold; margin-bottom:var(--space-2);">📤 Output — Kode Terbaca</h3>
                <div class="code-output" id="deobf-output" style="min-height:400px; white-space:pre-wrap; word-break:break-word; overflow-y:auto; max-height:600px;">-- Klik "DEFUSCATE" untuk memproses kode</div>
              </div>
            </div>

            <div style="display:flex; gap:var(--space-3); margin-top:var(--space-4); flex-wrap:wrap; align-items:center;">
              <button class="btn btn-primary" onclick="LuaDefuscatorPage.deobfuscate()">🔓 DEFUSCATE</button>
              <button class="btn btn-ghost" onclick="LuaDefuscatorPage.copyOutput()">📋 Copy Output</button>
              <button class="btn btn-ghost" onclick="LuaDefuscatorPage.downloadOutput()">💾 Download .lua</button>
              <div id="deobf-stats" style="margin-left:auto; font-size:0.68rem; color:var(--color-text-muted); display:flex; align-items:center; flex-wrap:wrap; gap:8px;"></div>
            </div>

          </div>
        </section>
      </div>
    `;

    // Show input size info on typing
    const inp = document.getElementById('deobf-input');
    if (inp) {
      inp.addEventListener('input', () => {
        const info = document.getElementById('deobf-input-info');
        if (info) {
          const size = new Blob([inp.value]).size;
          const lines = inp.value.split('\n').length;
          info.textContent = `${lines} baris · ${(size/1024).toFixed(1)} KB`;
        }
      });
    }
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
    let numbersFixed = 0;

    // ── Step 0: AR Community Unwrapper (Automatic detection and reversal) ──
    const arUnwrapped = this.reverseARCommunityObfuscator(code);
    code = arUnwrapped.code;
    const arStats = arUnwrapped.stats;

    // ══════════════════════════════════════════
    // Step 1: Clean obfuscator headers & junk
    // ══════════════════════════════════════════
    if (this.optClean) {
      const headerPatterns = [
        /^--\s*This file was protected using.*$/gm,
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
        /^--\[\[.*?(?:obfuscat|protect|encrypt).*?\]\]--?\s*$/gim,
      ];
      headerPatterns.forEach(pat => {
        const before = code;
        code = code.replace(pat, '');
        if (code !== before) headersRemoved++;
      });

      // Remove heavy-mode wrappers
      code = code.replace(/local\s+_ENV\s*=\s*getfenv\(\)\s*/g, () => { headersRemoved++; return ''; });
      code = code.replace(/local\s+_R\s*=\s*setmetatable\(\s*\{\}\s*,\s*\{[^}]*\}\s*\)\s*/g, () => { headersRemoved++; return ''; });
    }

    // ══════════════════════════════════════════
    // Step 2: Normalize number literals
    // ══════════════════════════════════════════
    if (this.optNumbers) {
      // 2a: Clean underscores from ALL number literals first
      // Lua 5.x doesn't actually support underscores, obfuscators insert them to confuse parsers
      // Match hex with underscores: 0x78A1__ or 0X001011__ or 0x0_0_1e etc.
      code = code.replace(/0[xX][0-9a-fA-F_]+/g, (match) => {
        const cleaned = match.replace(/_/g, '');
        // Convert to decimal for readability
        try {
          const val = parseInt(cleaned, 16);
          if (!isNaN(val) && val >= 0) {
            numbersFixed++;
            // Keep small hex as decimal, large ones as clean hex
            if (val <= 65535) return String(val);
            return '0x' + val.toString(16).toUpperCase();
          }
        } catch(e) {}
        return cleaned;
      });

      // 2b: Convert binary literals: 0B11010, 0b001011__ etc.
      code = code.replace(/0[bB][01_]+/g, (match) => {
        const cleaned = match.replace(/_/g, '');
        try {
          const val = parseInt(cleaned.slice(2), 2);
          if (!isNaN(val) && val >= 0) {
            numbersFixed++;
            return String(val);
          }
        } catch(e) {}
        return cleaned;
      });
    }

    // ══════════════════════════════════════════
    // Step 3: Decode all string encodings
    // ══════════════════════════════════════════
    if (this.optDecode) {
      // 3a: Evaluate string.char(N, N, N...) calls
      code = code.replace(/string\s*\.\s*char\s*\(([^)]+)\)/g, (match, args) => {
        try {
          const nums = args.split(',').map(s => {
            const n = s.trim();
            if (/^0x[0-9a-fA-F]+$/i.test(n)) return parseInt(n, 16);
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

      // 3b: Decode decimal escapes inside strings: \108\101\97\100
      const decodeEscapesInString = (str, quote) => {
        let changed = false;
        const inner = str.slice(1, -1).replace(/\\(\d{1,3})/g, (m, dec) => {
          const c = parseInt(dec, 10);
          if (c >= 32 && c <= 126) {
            stringsDecoded++;
            changed = true;
            const ch = String.fromCharCode(c);
            if (ch === quote) return '\\' + quote;
            if (ch === '\\') return '\\\\';
            return ch;
          }
          return m;
        });
        return changed ? quote + inner + quote : str;
      };

      code = code.replace(/"[^"]*\\(\d{1,3})[^"]*"/g, m => decodeEscapesInString(m, '"'));
      code = code.replace(/'[^']*\\(\d{1,3})[^']*'/g, m => decodeEscapesInString(m, "'"));

      // 3c: Decode hex escapes: \x6C\x65
      code = code.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
        const c = parseInt(hex, 16);
        if (c >= 32 && c <= 126) { stringsDecoded++; return String.fromCharCode(c); }
        return match;
      });

      // 3d: Decode \\u{XXXX} unicode escapes
      code = code.replace(/\\u\{([0-9a-fA-F]+)\}/g, (match, hex) => {
        const c = parseInt(hex, 16);
        if (c >= 32 && c <= 126) { stringsDecoded++; return String.fromCharCode(c); }
        if (c === 0) { stringsDecoded++; return '\\0'; }
        return match;
      });

      // 3e: Simplify string concatenation: "hel" .. "lo" → "hello"
      let prevCode;
      do {
        prevCode = code;
        code = code.replace(/"([^"]*)"\s*\.\.\s*"([^"]*)"/g, (m, a, b) => { stringsDecoded++; return '"' + a + b + '"'; });
      } while (code !== prevCode);

      // 3f: Clean redundant parentheses around strings: ("text") → "text"
      code = code.replace(/\(("[^"]*")\)/g, '$1');
      code = code.replace(/\(('[^']*')\)/g, '$1');

      // 3g: Simplify tonumber("123") → 123
      code = code.replace(/tonumber\s*\(\s*"(\d+)"\s*\)/g, '$1');
      code = code.replace(/tonumber\s*\(\s*'(\d+)'\s*\)/g, '$1');
    }

    // ══════════════════════════════════════════
    // Step 4: Expand minified code into multi-line
    // ══════════════════════════════════════════
    if (this.optExpand) {
      // We need to be careful not to break strings. 
      // Process outside of strings only.
      code = this.expandCode(code);
      expansions = (code.match(/\n/g) || []).length;
    }

    // ══════════════════════════════════════════
    // Step 5: Simplify variable names
    // ══════════════════════════════════════════
    if (this.optSimplify) {
      code = this.simplifyVars(code);
      // Count how many were simplified (approximate)
      varsSimplified = (code.match(/\bv\d+\b/g) || []).length;
    }

    // ══════════════════════════════════════════
    // Step 6: Beautify / format Lua code
    // ══════════════════════════════════════════
    if (this.optBeautify) {
      code = this.beautifyLua(code);
    }

    // Final cleanup
    code = code.replace(/\n{3,}/g, '\n\n').trim();
    code = '-- Deobfuscated by AR Community Lua Defuscator\n-- ' + new Date().toLocaleString('id-ID') + '\n\n' + code;

    output.textContent = code;
    this._lastOutput = code;

    const newSize = new Blob([code]).size;
    const newLines = code.split('\n').length;
    const statParts = [];
    
    // Add AR Community Restoration details if detected
    if (arStats.xorDecrypted) statParts.push('🔓 Decrypted XOR Layer');
    if (arStats.vmUnwrapped) statParts.push('📦 Unwrapped VM');
    if (arStats.stringTableRestored) statParts.push('🔤 Restored String Table');
    if (arStats.controlFlowUnflattened) statParts.push('📐 Unflattened Control Flow');

    if (numbersFixed > 0) statParts.push(`🔢 ${numbersFixed} angka dibersihkan`);
    if (stringsDecoded > 0) statParts.push(`🔤 ${stringsDecoded} string decoded`);
    if (expansions > 0) statParts.push(`📐 ${expansions} baris`);
    if (varsSimplified > 0) statParts.push(`🏷️ ~${varsSimplified} variabel`);
    if (headersRemoved > 0) statParts.push(`🧹 ${headersRemoved} junk dihapus`);
    statParts.push(`📊 ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${newLines} baris)`);
    stats.innerHTML = statParts.join(' · ');
  },

  /**
   * Expand minified Lua code into multi-line.
   * Carefully avoids breaking string literals.
   */
  expandCode(code) {
    // Tokenize: separate strings from code
    const tokens = [];
    let i = 0;
    while (i < code.length) {
      // Check for long string [[...]]
      if (code[i] === '[' && (code[i+1] === '[' || code[i+1] === '=')) {
        let eqCount = 0;
        let j = i + 1;
        while (code[j] === '=') { eqCount++; j++; }
        if (code[j] === '[') {
          const closer = ']' + '='.repeat(eqCount) + ']';
          const endIdx = code.indexOf(closer, j + 1);
          if (endIdx !== -1) {
            tokens.push({ type: 'string', value: code.slice(i, endIdx + closer.length) });
            i = endIdx + closer.length;
            continue;
          }
        }
      }

      // Check for string literals
      if (code[i] === '"' || code[i] === "'") {
        const quote = code[i];
        let j = i + 1;
        while (j < code.length && code[j] !== quote) {
          if (code[j] === '\\') j++; // skip escaped char
          j++;
        }
        tokens.push({ type: 'string', value: code.slice(i, j + 1) });
        i = j + 1;
        continue;
      }

      // Check for comments
      if (code[i] === '-' && code[i+1] === '-') {
        // Long comment --[[ ... ]]
        if (code[i+2] === '[' && code[i+3] === '[') {
          const endIdx = code.indexOf(']]', i + 4);
          if (endIdx !== -1) {
            tokens.push({ type: 'comment', value: code.slice(i, endIdx + 2) });
            i = endIdx + 2;
            continue;
          }
        }
        // Short comment
        let j = i + 2;
        while (j < code.length && code[j] !== '\n') j++;
        tokens.push({ type: 'comment', value: code.slice(i, j) });
        i = j;
        continue;
      }

      // Regular code character
      let j = i;
      while (j < code.length && code[j] !== '"' && code[j] !== "'" && !(code[j] === '-' && code[j+1] === '-') && !(code[j] === '[' && (code[j+1] === '[' || code[j+1] === '='))) {
        j++;
      }
      if (j > i) {
        tokens.push({ type: 'code', value: code.slice(i, j) });
      }
      i = j;
      if (i === j && j < code.length && tokens.length > 0 && tokens[tokens.length-1].type === 'code') {
        // Prevent infinite loop
        tokens.push({ type: 'code', value: code[i] });
        i++;
      } else if (i === j && j < code.length) {
        i++; // safety
      }
    }

    // Process only code tokens
    for (let t = 0; t < tokens.length; t++) {
      if (tokens[t].type !== 'code') continue;
      let c = tokens[t].value;

      // Insert newlines at strategic points
      // After semicolons
      c = c.replace(/;/g, ';\n');

      // Before keywords when they follow closing constructs
      c = c.replace(/\bend\b\s*(?=\b(?:local|if|for|while|repeat|function|return|do|end)\b)/g, 'end\n');

      // After 'then' if followed by non-end code
      c = c.replace(/\bthen\s+(?!end\b|else\b|elseif\b)(?=[a-zA-Z_(])/g, 'then\n');

      // After 'do' if followed by non-end code
      c = c.replace(/\bdo\s+(?!end\b)(?=[a-zA-Z_(])/g, 'do\n');

      // Before 'end' when preceded by code
      c = c.replace(/([^;\n\s])\s*\bend\b/g, (m, pre) => {
        // Don't break inline functions: function() ... end
        return pre + '\nend';
      });

      // Before 'else' and 'elseif'
      c = c.replace(/([^;\n])\s*\belse\b/g, '$1\nelse');
      c = c.replace(/([^;\n])\s*\belseif\b/g, '$1\nelseif');

      // Before 'local' when preceded by code (not at start of line)
      c = c.replace(/([^;\n\s{(,])\s*\blocal\b/g, '$1\nlocal');

      // Before 'for' when preceded by code
      c = c.replace(/([^;\n\s])\s*\bfor\b/g, '$1\nfor');

      // Before 'while' when preceded by code
      c = c.replace(/([^;\n\s])\s*\bwhile\b/g, '$1\nwhile');

      // Before 'if' when preceded by code (but not 'elseif')
      c = c.replace(/([^;\n\s])\s*\bif\b(?!\s*not|\s*O|\s*D)/g, (m, pre) => {
        if (/elseif$/.test(pre)) return m;
        return pre + '\nif';
      });

      // Before 'return' when preceded by code
      c = c.replace(/([^;\n\s])\s*\breturn\b/g, '$1\nreturn');

      // Before 'repeat' when preceded by code
      c = c.replace(/([^;\n\s])\s*\brepeat\b/g, '$1\nrepeat');

      // After 'end;' or 'end,' 
      c = c.replace(/\bend\b([;,])/g, 'end$1\n');

      tokens[t].value = c;
    }

    return tokens.map(t => t.value).join('');
  },

  /**
   * Simplify randomised/obfuscated variable names
   */
  simplifyVars(code) {
    const luaKeywords = new Set([
      'and','break','do','else','elseif','end','false','for','function',
      'goto','if','in','local','nil','not','or','repeat','return','then',
      'true','until','while','_G','_VERSION','_ENV','self'
    ]);
    const robloxGlobals = new Set([
      'game','workspace','script','wait','print','warn','error',
      'typeof','type','pairs','ipairs','next','select','unpack','pcall',
      'xpcall','coroutine','string','table','math','os','debug','tick',
      'spawn','delay','require','tonumber','tostring','rawget','rawset',
      'setmetatable','getmetatable','getfenv','setfenv','Instance','Enum',
      'Vector3','Vector2','CFrame','Color3','BrickColor','UDim2','UDim',
      'Ray','Region3','NumberSequence','ColorSequence','TweenInfo',
      'task','bit32','assert','loadstring','newproxy','rawequal','rawlen',
      'collectgarbage','bit32'
    ]);

    // Collect obfuscated variable names
    const varCounts = {};
    const patterns = [
      /\b(_[a-zA-Z0-9_]{3,})\b/g,                     // _randomStuff
      /\b((?:ll|lI|Il|II|l1|I1)[lI1]{1,})\b/g,        // llIlIl confusion
    ];

    patterns.forEach(pat => {
      let m;
      while ((m = pat.exec(code)) !== null) {
        const name = m[1];
        if (!luaKeywords.has(name) && !robloxGlobals.has(name)) {
          varCounts[name] = (varCounts[name] || 0) + 1;
        }
      }
    });

    // Sort by frequency and assign clean names
    const sorted = Object.entries(varCounts)
      .filter(([name]) => name.length >= 4)
      .sort((a, b) => b[1] - a[1]);

    const renameMap = {};
    let counter = 1;
    sorted.forEach(([name]) => {
      renameMap[name] = 'v' + counter;
      counter++;
    });

    // Apply renames (longest first to avoid partial matches)
    const entries = Object.entries(renameMap).sort((a, b) => b[0].length - a[0].length);
    entries.forEach(([orig, newName]) => {
      const escaped = orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      code = code.replace(new RegExp('\\b' + escaped + '\\b', 'g'), newName);
    });

    return code;
  },

  /**
   * Beautify Lua code with proper indentation
   */
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
        if (result.length > 0 && result[result.length-1] !== '') {
          result.push('');
        }
        return;
      }

      // Decrease indent before this line
      if (decreaseBefore.some(p => p.test(trimmed)) && indent > 0) indent--;

      result.push(indentStr.repeat(indent) + trimmed);

      // Check for one-liner (function()...end on same line)
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
  },

  reverseARCommunityObfuscator(code) {
    let stats = {
      xorDecrypted: false,
      vmUnwrapped: false,
      stringTableRestored: false,
      controlFlowUnflattened: false
    };

    // 1. Reversing XOR encryption wrapper (Extreme level)
    const keyMatch = code.match(/local\s+([a-zA-Z0-9_1]+)\s*=\s*(0[xX][0-9a-fA-F_]+|0[bB][01_]+|[0-9_]+)/);
    const payloadMatch = code.match(/local\s+[a-zA-Z0-9_1]+\s*=\s*[a-zA-Z0-9_1]+\s*\(\s*"((?:\\[0-9]+)+)"\s*\)/);
    
    if (keyMatch && payloadMatch) {
      let keyValStr = keyMatch[2].replace(/_/g, '');
      let key = 0;
      if (keyValStr.toUpperCase().startsWith('0X')) {
        key = parseInt(keyValStr, 16);
      } else if (keyValStr.toUpperCase().startsWith('0B')) {
        key = parseInt(keyValStr.slice(2), 2);
      } else {
        key = parseInt(keyValStr, 10);
      }
      
      const payloadEscaped = payloadMatch[1];
      const bytes = [];
      const byteRegex = /\\(\d{1,3})/g;
      let m;
      while ((m = byteRegex.exec(payloadEscaped)) !== null) {
        bytes.push(parseInt(m[1], 10));
      }
      
      if (bytes.length > 0 && !isNaN(key)) {
        const decryptedChars = bytes.map(b => String.fromCharCode(b ^ key));
        const decryptedCode = decryptedChars.join('');
        if (decryptedCode.includes('function') || decryptedCode.includes('local') || decryptedCode.includes('return') || decryptedCode.includes('while')) {
          code = decryptedCode;
          stats.xorDecrypted = true;
        }
      }
    }

    // 2. VM unwrapping (Heavy & Extreme levels)
    const vmMatch = code.match(/return\s+\(\s*function\s*\(\s*\.\.\.\s*\)([\s\S]+?)end\s*\)\s*\(\s*\.\.\.\s*\)/);
    if (vmMatch) {
      code = vmMatch[1].trim();
      stats.vmUnwrapped = true;
    }

    // 3. String Table Restoration (Heavy & Extreme levels)
    const stringTableMatch = code.match(/local\s+([a-zA-Z0-9_1]+)\s*=\s*\{([\s\S]*?)\}/);
    if (stringTableMatch) {
      const tableVar = stringTableMatch[1];
      const tableContent = stringTableMatch[2];
      
      const rawElements = tableContent.split(',');
      const stringTable = [];
      
      rawElements.forEach(elem => {
        let clean = elem.trim();
        if (clean.startsWith('(') && clean.endsWith(')')) {
          clean = clean.slice(1, -1).trim();
        }
        if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
          let strVal = clean.slice(1, -1);
          strVal = strVal.replace(/\\(\d{1,3})/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)));
          strVal = strVal.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
          stringTable.push(strVal);
        } else {
          stringTable.push('');
        }
      });
      
      if (stringTable.length > 0) {
        let tempCode = code;
        let replacedAny = false;
        
        stringTable.forEach((val, idx) => {
          const indexNum = idx + 1;
          const tableAccessRegex = new RegExp('\\b' + tableVar + '\\s*\\[\\s*' + indexNum + '\\s*\\]', 'g');
          const escapedVal = '"' + val.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
          const newTemp = tempCode.replace(tableAccessRegex, escapedVal);
          if (newTemp !== tempCode) {
            tempCode = newTemp;
            replacedAny = true;
          }
        });
        
        if (replacedAny) {
          code = tempCode.replace(/local\s+[a-zA-Z0-9_1]+\s*=\s*\{[\s\S]*?\}\s*;?\n?/, '');
          stats.stringTableRestored = true;
        }
      }
    }

    // 4. Control Flow Unflattening (Heavy & Extreme levels)
    const stateVarMatch = code.match(/local\s+([a-zA-Z0-9_1]+)\s*=\s*(\d+)/);
    if (stateVarMatch) {
      const stateVar = stateVarMatch[1];
      const initialState = parseInt(stateVarMatch[2], 10);
      
      const loopMatch = code.match(/while\s+true\s+do\s+([\s\S]+?)\s*end\s*$/) || code.match(/while\s+true\s+do\s+([\s\S]+?)\s*end\s*;?\s*$/);
      if (loopMatch) {
        const loopBody = loopMatch[1];
        
        const branches = {};
        const branchRegex = /(?:if|elseif)\s+([a-zA-Z0-9_1]+)\s*==\s*(\d+)\s+then\s*([\s\S]+?)(?=\s*elseif\b|\s*else\b|\s*end\b)/g;
        let bMatch;
        while ((bMatch = branchRegex.exec(loopBody)) !== null) {
          if (bMatch[1] === stateVar) {
            const stateNum = parseInt(bMatch[2], 10);
            const branchBody = bMatch[3].trim();
            branches[stateNum] = branchBody;
          }
        }
        
        if (Object.keys(branches).length > 0 && branches[initialState]) {
          let currentState = initialState;
          const sequence = [];
          const visited = new Set();
          
          while (currentState && !visited.has(currentState)) {
            visited.add(currentState);
            let branchCode = branches[currentState];
            if (!branchCode) break;
            
            let nextState = null;
            let isBreak = false;
            
            const nextStateMatch = branchCode.match(new RegExp('\\b' + stateVar + '\\s*=\\s*(\\d+)'));
            if (nextStateMatch) {
              nextState = parseInt(nextStateMatch[1], 10);
              branchCode = branchCode.replace(new RegExp('\\b' + stateVar + '\\s*=\\s*\\d+\\s*;?\\n?'), '').trim();
            } else if (/\bbreak\b/.test(branchCode)) {
              isBreak = true;
              branchCode = branchCode.replace(/\bbreak\b\s*;?\n?/, '').trim();
            }
            
            sequence.push(branchCode);
            
            if (isBreak) break;
            currentState = nextState;
          }
          
          if (sequence.length > 0) {
            const reconstructed = sequence.join('\n');
            let newCode = code.replace(/local\s+[a-zA-Z0-9_1]+\s*=\s*\d+\s*;?\n?/, '');
            newCode = newCode.replace(/while\s+true\s+do[\s\S]+?end\s*$/, reconstructed);
            code = newCode;
            stats.controlFlowUnflattened = true;
          }
        }
      }
    }

    return { code, stats };
  }
};

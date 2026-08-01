/* ========================================
   AR COMMUNITY — Advanced Script Obfuscator
   Luraph-style Lua code obfuscation engine:
   
   LIGHT:
   - Variable renaming (l/I confusion chars)
   - Comment stripping
   - Whitespace minification
   
   MEDIUM (+ Light):
   - String encoding (decimal escape sequences)
   - Number encoding (hex/binary with underscores)
   - Control flow wrapping
   - Dead code injection
   
   HEAVY (+ Medium):
   - Virtual Machine bytecode-style wrapper
   - String table extraction + encoded lookup
   - Opaque predicates
   - Anti-tamper checks
   - Multi-layer encoding
   - Code flattening (single-line)
   
   EXTREME (new):
   - Full VM dispatcher simulation
   - XOR-encrypted string table
   - Math-based constant encoding
   - Maximum confusion variable names
   - Fake control flow branches
   ======================================== */

const ScriptObfuscatorPage = {
  level: 'medium',
  _lastOutput: '',

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Script Obfuscator</span>
            </div>
            <div class="tool-page-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: var(--space-6);">
              <div>
                <h1 style="margin: 0 0 var(--space-2) 0; font-family: var(--font-heading); font-weight: var(--font-weight-black);">🔒 Script Obfuscator</h1>
                <p style="margin: 0; color: var(--color-text-secondary); font-size: var(--text-sm);">Lindungi kode Lua/Roblox Anda dengan teknik obfuscation tingkat lanjut mirip Luraph</p>
              </div>
              <button class="btn btn-ghost btn-sm" onclick="window.showToolGuide('script-obfuscator')" style="border-radius: 8px; font-weight: bold; flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;">
                💻 Panduan & Tips
              </button>
            </div>

            <!-- Protection Level -->
            <div class="tool-section" style="margin-bottom: var(--space-4);">
              <h3>🛡️ Level Proteksi</h3>
              <div class="preset-grid" style="grid-template-columns: repeat(4, 1fr);">
                <button class="preset-btn ${this.level==='light'?'active':''}" onclick="ScriptObfuscatorPage.setLevel('light')">
                  <div style="font-size:1.2rem;">🟢</div>
                  <div style="font-weight:700; font-size:0.75rem;">LIGHT</div>
                  <div style="font-size:0.55rem; color:var(--color-text-muted); margin-top:2px;">Rename + Minify</div>
                </button>
                <button class="preset-btn ${this.level==='medium'?'active':''}" onclick="ScriptObfuscatorPage.setLevel('medium')">
                  <div style="font-size:1.2rem;">🟡</div>
                  <div style="font-weight:700; font-size:0.75rem;">MEDIUM</div>
                  <div style="font-size:0.55rem; color:var(--color-text-muted); margin-top:2px;">+ String Encode + Dead Code</div>
                </button>
                <button class="preset-btn ${this.level==='heavy'?'active':''}" onclick="ScriptObfuscatorPage.setLevel('heavy')">
                  <div style="font-size:1.2rem;">🔴</div>
                  <div style="font-weight:700; font-size:0.75rem;">HEAVY</div>
                  <div style="font-size:0.55rem; color:var(--color-text-muted); margin-top:2px;">+ VM Wrapper + String Table</div>
                </button>
                <button class="preset-btn ${this.level==='extreme'?'active':''}" onclick="ScriptObfuscatorPage.setLevel('extreme')">
                  <div style="font-size:1.2rem;">💀</div>
                  <div style="font-weight:700; font-size:0.75rem;">EXTREME</div>
                  <div style="font-size:0.55rem; color:var(--color-text-muted); margin-top:2px;">+ XOR Encrypt + Full VM</div>
                </button>
              </div>
            </div>

            <!-- Level Info -->
            <div id="obf-level-info" style="background: rgba(0,240,255,0.04); border: 1px solid rgba(0,240,255,0.1); border-radius: 8px; padding: 10px 14px; margin-bottom: var(--space-4); font-size: 0.65rem; color: var(--color-text-secondary); line-height: 1.5;">
              ${this.getLevelInfo()}
            </div>

            <div class="split-panel">
              <div>
                <h3 style="font-size:var(--text-sm); font-weight:bold; margin-bottom:var(--space-2);">📥 Input — Kode Asli</h3>
                <div style="position:relative;">
                  <div class="code-editor-wrap">
                    <textarea class="code-textarea" id="obf-input" placeholder="-- Paste kode Lua Anda di sini..." spellcheck="false" style="min-height:400px;">local Players = game:GetService("Players")

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
                  <div id="obf-input-info" style="position:absolute; bottom:8px; right:12px; font-size:0.6rem; color:var(--color-text-muted);"></div>
                </div>
              </div>
              <div>
                <h3 style="font-size:var(--text-sm); font-weight:bold; margin-bottom:var(--space-2);">📤 Output — Kode Obfuscated</h3>
                <div class="code-output" id="obf-output" style="min-height:400px; white-space:pre-wrap; word-break:break-word; overflow-y:auto; max-height:600px;">-- Klik "OBFUSCATE" untuk menghasilkan output</div>
              </div>
            </div>

            <div style="display:flex; gap:var(--space-3); margin-top:var(--space-4); flex-wrap:wrap; align-items:center;">
              <button class="btn btn-primary" onclick="ScriptObfuscatorPage.obfuscate()">🔒 OBFUSCATE</button>
              <button class="btn btn-ghost" onclick="ScriptObfuscatorPage.copyOutput()">📋 Copy Output</button>
              <button class="btn btn-ghost" onclick="ScriptObfuscatorPage.downloadOutput()">💾 Download .lua</button>
              <div id="obf-stats" style="margin-left:auto; font-size:0.68rem; color:var(--color-text-muted); display:flex; align-items:center; flex-wrap:wrap; gap:8px;"></div>
            </div>

          </div>
        </section>
      </div>
    `;

    // Show input size info
    const inp = document.getElementById('obf-input');
    if (inp) {
      const updateInfo = () => {
        const info = document.getElementById('obf-input-info');
        if (info) {
          const size = new Blob([inp.value]).size;
          info.textContent = `${(size/1024).toFixed(1)} KB`;
        }
      };
      inp.addEventListener('input', updateInfo);
      updateInfo();
    }
  },

  getLevelInfo() {
    const infos = {
      light: '🟢 <strong>LIGHT</strong> — Rename variabel + strip komentar + minifikasi whitespace. Kode tetap berjalan sama, tapi nama variabel diganti menjadi karakter l/I yang membingungkan.',
      medium: '🟡 <strong>MEDIUM</strong> — Semua fitur Light + encode string ke escape sequence (\\NNN) + encode angka ke hex/binary + injeksi dead code palsu yang tidak akan dieksekusi.',
      heavy: '🔴 <strong>HEAVY</strong> — Semua fitur Medium + wrapper Virtual Machine + string table terenkripsi + opaque predicates + anti-tamper check + code flattening ke satu baris.',
      extreme: '💀 <strong>EXTREME</strong> — Proteksi maksimum. Semua fitur Heavy + XOR-encrypted string table + math-based constant encoding + full VM dispatcher + multi-layer wrapping. Output akan sangat besar tapi sangat sulit dibaca.'
    };
    return infos[this.level] || '';
  },

  setLevel(l) {
    this.level = l;
    this.render();
  },

  // ══════════════════════════════════════════
  // MAIN OBFUSCATION ENGINE
  // ══════════════════════════════════════════
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

    const originalSize = new Blob([code]).size;
    let result = code;
    let varsChanged = 0;
    let stringsEncoded = 0;
    let numbersEncoded = 0;
    let deadCodeInjected = 0;

    // ── Step 1: Strip comments ──
    result = this.stripComments(result);

    // ── Step 2: Variable renaming ──
    const varData = this.renameVariables(result);
    result = varData.code;
    varsChanged = varData.count;

    // ── Step 3: String encoding (Medium+) ──
    if (this.level !== 'light') {
      const strData = this.encodeStrings(result);
      result = strData.code;
      stringsEncoded = strData.count;
    }

    // ── Step 4: Number encoding (Medium+) ──
    if (this.level !== 'light') {
      const numData = this.encodeNumbers(result);
      result = numData.code;
      numbersEncoded = numData.count;
    }

    // ── Step 5: Dead code injection (Medium+) ──
    if (this.level !== 'light') {
      const deadData = this.injectDeadCode(result);
      result = deadData.code;
      deadCodeInjected = deadData.count;
    }

    // ── Step 6: Control flow wrapping (Heavy+) ──
    if (this.level === 'heavy' || this.level === 'extreme') {
      result = this.wrapControlFlow(result);
    }

    // ── Step 7: String table extraction (Heavy+) ──
    if (this.level === 'heavy' || this.level === 'extreme') {
      result = this.extractStringTable(result);
    }

    // ── Step 8: VM Wrapper (Heavy+) ──
    if (this.level === 'heavy' || this.level === 'extreme') {
      result = this.wrapVM(result);
    }

    // ── Step 9: XOR encryption layer (Extreme) ──
    if (this.level === 'extreme') {
      result = this.xorEncryptLayer(result);
    }

    // ── Step 10: Minification ──
    if (this.level !== 'light') {
      result = this.minify(result);
    }

    // ── Add header ──
    const header = `-- Protected by AR Community Obfuscator v2.0\n-- Level: ${this.level.toUpperCase()} | ${new Date().toISOString()}\n-- https://arcommunity.vercel.app\n\n`;
    result = header + result;

    output.textContent = result;
    this._lastOutput = result;

    const newSize = new Blob([result]).size;
    const statParts = [];
    statParts.push(`🔒 ${this.level.toUpperCase()}`);
    if (varsChanged > 0) statParts.push(`🏷️ ${varsChanged} var`);
    if (stringsEncoded > 0) statParts.push(`🔤 ${stringsEncoded} str`);
    if (numbersEncoded > 0) statParts.push(`🔢 ${numbersEncoded} num`);
    if (deadCodeInjected > 0) statParts.push(`💀 ${deadCodeInjected} dead`);
    statParts.push(`📊 ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (+${Math.round((newSize/originalSize-1)*100)}%)`);
    stats.innerHTML = statParts.join(' · ');
  },

  // ══════════════════════════════════════════
  // OBFUSCATION TECHNIQUES
  // ══════════════════════════════════════════

  /**
   * Strip all comments from Lua code
   */
  stripComments(code) {
    // Remove long comments --[[ ... ]]
    code = code.replace(/--\[\[[\s\S]*?\]\]/g, '');
    // Remove single-line comments
    code = code.replace(/--[^\n]*/g, '');
    return code;
  },

  /**
   * Rename variables using l/I/1 confusion characters (Luraph-style)
   */
  renameVariables(code) {
    const reserved = new Set([
      'and','break','do','else','elseif','end','false','for','function',
      'goto','if','in','local','nil','not','or','repeat','return','then',
      'true','until','while',
      'game','workspace','script','self','wait','print','warn','error',
      'type','typeof','pairs','ipairs','next','select','unpack','pcall',
      'xpcall','require','tonumber','tostring','rawget','rawset','rawequal',
      'setmetatable','getmetatable','getfenv','setfenv',
      'Instance','Enum','Vector3','Vector2','CFrame','Color3','BrickColor',
      'UDim2','UDim','Ray','Region3','TweenInfo','task','bit32',
      'string','table','math','os','debug','coroutine',
      'spawn','delay','tick','loadstring','newproxy','assert',
      'collectgarbage','_G','_VERSION','_ENV',
      'NumberSequence','ColorSequence'
    ]);

    // Find all local variable declarations
    const varMap = {};
    const varRegex = /\blocal\s+([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let match;
    let count = 0;
    while ((match = varRegex.exec(code)) !== null) {
      const name = match[1];
      if (!varMap[name] && !reserved.has(name)) {
        varMap[name] = this.genConfusionName(count);
        count++;
      }
    }

    // Also find function parameters
    const paramRegex = /function\s*\(([^)]*)\)/g;
    while ((match = paramRegex.exec(code)) !== null) {
      const params = match[1].split(',').map(p => p.trim()).filter(p => p);
      params.forEach(p => {
        if (!varMap[p] && !reserved.has(p)) {
          varMap[p] = this.genConfusionName(count);
          count++;
        }
      });
    }

    // Apply renames (longest-name-first to avoid partial matches)
    let result = code;
    const sorted = Object.entries(varMap).sort((a, b) => b[0].length - a[0].length);
    sorted.forEach(([orig, obf]) => {
      result = result.replace(new RegExp('\\b' + orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'g'), obf);
    });

    return { code: result, count };
  },

  /**
   * Generate l/I/1 confusion variable names (like Luraph/IronBrew)
   * These are extremely hard to read because l, I, and 1 look almost identical
   */
  genConfusionName(index) {
    const chars = ['l', 'I', 'l', 'I', 'l', 'I'];
    // Use index to generate unique combination
    let name = '';
    let n = index + 1;
    // First char must be letter (l or I)
    name += (n % 2 === 0) ? 'I' : 'l';
    n = Math.floor(n / 2) + 1;
    // Generate 4-8 more chars
    const len = 4 + (index % 5);
    for (let i = 0; i < len; i++) {
      const r = (n + i * 7 + index * 3) % 6;
      name += chars[r];
      if (this.level === 'heavy' || this.level === 'extreme') {
        // Add '1' occasionally to make it even more confusing
        if ((n + i) % 4 === 0) name += '1';
      }
    }
    // Ensure uniqueness with a suffix
    name += '_' + index.toString(36);
    return name;
  },

  /**
   * Encode string literals using escape sequences
   */
  encodeStrings(code) {
    let count = 0;
    const encoded = code.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, str) => {
      if (str.length === 0) return match;
      count++;
      if (this.level === 'extreme') {
        // Use mixed encoding: hex + decimal + unicode escapes
        const chars = Array.from(str).map(c => {
          const code = c.charCodeAt(0);
          const r = Math.random();
          if (r < 0.33) return '\\' + code; // decimal
          if (r < 0.66) return '\\x' + code.toString(16).padStart(2, '0'); // hex
          return '\\u{' + code.toString(16) + '}'; // unicode
        });
        return '("' + chars.join('') + '")';
      } else if (this.level === 'heavy') {
        // Use hex escapes
        const chars = Array.from(str).map(c => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0'));
        return '("' + chars.join('') + '")';
      } else {
        // Medium: decimal escapes
        const chars = Array.from(str).map(c => '\\' + c.charCodeAt(0));
        return '("' + chars.join('') + '")';
      }
    });
    return { code: encoded, count };
  },

  /**
   * Encode number literals using hex/binary with underscores
   */
  encodeNumbers(code) {
    let count = 0;
    // Match standalone numbers (not inside strings or as part of identifiers)
    const encoded = code.replace(/(?<![a-zA-Z0-9_."\\])(\d+)(?![a-zA-Z0-9_])/g, (match, numStr) => {
      const num = parseInt(numStr, 10);
      if (isNaN(num) || num < 0) return match;
      count++;
      const r = Math.random();
      if (this.level === 'extreme') {
        // Use math expressions: (a + b * c) that evaluate to the number
        const a = Math.floor(Math.random() * 100);
        const b = num - a;
        if (b >= 0) {
          return `(${this.toObfuscatedNum(a)}+${this.toObfuscatedNum(b)})`;
        }
        return this.toObfuscatedNum(num);
      } else if (r < 0.4) {
        // Binary with underscores
        let bin = num.toString(2);
        bin = this.insertUnderscores(bin);
        return '0B' + bin;
      } else if (r < 0.8) {
        // Hex with underscores
        let hex = num.toString(16).toUpperCase();
        hex = this.insertUnderscores(hex);
        return '0X' + hex;
      } else {
        return match; // Keep some as-is for variety
      }
    });
    return { code: encoded, count };
  },

  /**
   * Convert a number to an obfuscated representation
   */
  toObfuscatedNum(num) {
    const r = Math.random();
    if (r < 0.5) {
      let hex = num.toString(16).toUpperCase();
      return '0X' + this.insertUnderscores(hex);
    } else {
      let bin = num.toString(2);
      return '0B' + this.insertUnderscores(bin);
    }
  },

  /**
   * Insert random underscores into a number string (Luraph-style)
   */
  insertUnderscores(str) {
    if (str.length <= 2) return str;
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += str[i];
      if (i < str.length - 1 && Math.random() < 0.3) {
        result += '_';
        if (Math.random() < 0.3) result += '_';
      }
    }
    return result;
  },

  /**
   * Inject dead code (unreachable branches) throughout the code
   */
  injectDeadCode(code) {
    const deadSnippets = [
      'if false then local _=error("") end',
      'if nil then local _=0/0 end',
      'do local _=nil;if _ then _=not _ end end',
      'if true~=true then return end',
      'if type(nil)=="number" then error() end',
      'while false do break end',
      'if not true then local _=rawget({},0) end',
      'repeat if true then break end until true',
    ];

    let count = 0;
    const lines = code.split('\n');
    const result = [];

    lines.forEach((line, i) => {
      result.push(line);
      // Inject dead code every few lines
      if (i % 3 === 1 && line.trim() && !line.trim().startsWith('end') && !line.trim().startsWith('else')) {
        const snippet = deadSnippets[Math.floor(Math.random() * deadSnippets.length)];
        // Rename dead code vars to confusion names
        const obfSnippet = snippet.replace(/_/g, this.genConfusionName(1000 + count));
        result.push(obfSnippet);
        count++;
      }
    });

    return { code: result.join('\n'), count };
  },

  /**
   * Wrap code in control flow obfuscation (state machine style)
   */
  wrapControlFlow(code) {
    const stateVar = this.genConfusionName(900);
    const loopVar = this.genConfusionName(901);
    
    // Wrap the entire code in a state machine dispatcher
    const states = [];
    const lines = code.split('\n').filter(l => l.trim());
    
    // Group lines into chunks of 2-4
    let chunk = [];
    let stateIndex = 1;
    const stateOrder = [];
    
    for (let i = 0; i < lines.length; i++) {
      chunk.push(lines[i]);
      if (chunk.length >= 2 + Math.floor(Math.random() * 3) || i === lines.length - 1) {
        const stateNum = stateIndex * 7 + 3; // Non-sequential state numbers
        states.push({ num: stateNum, code: chunk.join('\n') });
        stateOrder.push(stateNum);
        chunk = [];
        stateIndex++;
      }
    }

    // Build the state machine
    let result = `local ${stateVar}=${stateOrder[0]}\n`;
    result += `while true do\n`;
    
    states.forEach((state, idx) => {
      const prefix = idx === 0 ? 'if' : 'elseif';
      result += `${prefix} ${stateVar}==${state.num} then\n`;
      result += state.code + '\n';
      if (idx < states.length - 1) {
        result += `${stateVar}=${stateOrder[idx + 1]}\n`;
      } else {
        result += 'break\n';
      }
    });
    
    result += 'end\nend\n';
    return result;
  },

  /**
   * Extract all strings into a lookup table (Luraph-style)
   */
  extractStringTable(code) {
    const strings = [];
    const tableVar = this.genConfusionName(800);
    
    // Collect all string literals
    let result = code.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, str) => {
      strings.push(match); // Keep the encoded version
      return `${tableVar}[${strings.length}]`;
    });

    if (strings.length === 0) return code;

    // Build the string table
    const tableDecl = `local ${tableVar}={${strings.join(',')}}\n`;
    return tableDecl + result;
  },

  /**
   * Wrap code in a Virtual Machine-style structure
   */
  wrapVM(code) {
    const vmFunc = this.genConfusionName(700);
    const envVar = this.genConfusionName(701);
    const execVar = this.genConfusionName(702);
    const dataVar = this.genConfusionName(703);
    const checkVar = this.genConfusionName(704);

    // Anti-tamper check
    const antiTamper = `local ${checkVar}=function()\n` +
      `local ${this.genConfusionName(710)}=pcall(function() end)\n` +
      `if not ${this.genConfusionName(710)} then error("") end\n` +
      `end\n${checkVar}()\n`;

    // Environment capture
    const envCapture = `local ${envVar}=getfenv and getfenv() or _ENV or {}\n`;
    
    // Opaque predicates (always true/false conditions that look complex)
    const opaque1 = `local ${this.genConfusionName(720)}=(type("")=="string" and true or false)\n`;
    const opaque2 = `local ${this.genConfusionName(721)}=(type(0)~="string")\n`;

    // Wrap in self-executing function
    const wrapper = `${antiTamper}${envCapture}${opaque1}${opaque2}` +
      `local ${vmFunc}=(function()\n` +
      `local ${execVar}=function(${dataVar})\n` +
      `return (function(...)\n${code}\nend)(...)\n` +
      `end\n` +
      `return ${execVar}\n` +
      `end)()\n` +
      `${vmFunc}()\n`;

    return wrapper;
  },

  /**
   * XOR encryption layer (Extreme only)
   */
  xorEncryptLayer(code) {
    const key = Math.floor(Math.random() * 200) + 50;
    const keyVar = this.genConfusionName(600);
    const decVar = this.genConfusionName(601);
    const encVar = this.genConfusionName(602);
    const resultVar = this.genConfusionName(603);
    const charVar = this.genConfusionName(604);
    const byteVar = this.genConfusionName(605);
    
    // XOR-encode the entire code as a string
    const encoded = Array.from(code).map(c => {
      const xored = c.charCodeAt(0) ^ key;
      return '\\' + xored;
    }).join('');

    // Build decoder
    const decoder = `local ${keyVar}=${this.toObfuscatedNum(key)}\n` +
      `local ${decVar}=function(${encVar})\n` +
      `local ${resultVar}=""\n` +
      `for ${charVar} in ${encVar}:gmatch(".") do\n` +
      `local ${byteVar}=string.byte(${charVar})\n` +
      `${resultVar}=${resultVar}..string.char(bit32 and bit32.bxor(${byteVar},${keyVar}) or (${byteVar}~=${keyVar} and ${byteVar} or ${byteVar}))\n` +
      `end\n` +
      `return ${resultVar}\n` +
      `end\n` +
      `local ${this.genConfusionName(606)}=${decVar}("${encoded}")\n` +
      `local ${this.genConfusionName(607)}=loadstring or load\n` +
      `${this.genConfusionName(607)}(${this.genConfusionName(606)})()\n`;

    return decoder;
  },

  /**
   * Minify code by compressing whitespace
   */
  minify(code) {
    // Remove empty lines
    code = code.replace(/^\s*[\r\n]/gm, '');
    // Collapse multiple spaces to one
    code = code.replace(/  +/g, ' ');
    // Remove spaces around operators (carefully)
    code = code.replace(/\s*([=<>~+\-*\/,;{}()\[\]])\s*/g, '$1');
    // Restore necessary spaces around keywords
    code = code.replace(/\b(local|function|return|if|then|else|elseif|end|do|for|while|repeat|until|in|and|or|not|break)\b/g, ' $1 ');
    // Clean up double spaces
    code = code.replace(/  +/g, ' ');
    // Remove leading/trailing spaces per line
    code = code.split('\n').map(l => l.trim()).filter(l => l).join('\n');

    // For heavy/extreme: flatten to fewer lines
    if (this.level === 'heavy' || this.level === 'extreme') {
      code = code.replace(/\n/g, ';');
      // Clean up double semicolons
      code = code.replace(/;+/g, ';');
      code = code.replace(/^;|;$/g, '');
    }

    return code;
  },

  // ══════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ══════════════════════════════════════════

  randStr(len) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
    let r = '';
    for (let i = 0; i < len; i++) r += chars[Math.floor(Math.random() * chars.length)];
    return r;
  },

  copyOutput() {
    if (this._lastOutput) {
      navigator.clipboard.writeText(this._lastOutput);
      const stats = document.getElementById('obf-stats');
      if (stats) stats.innerHTML = '✅ Berhasil disalin ke clipboard!';
    }
  },

  downloadOutput() {
    if (!this._lastOutput) return;
    const blob = new Blob([this._lastOutput], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'obfuscated_script.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
};

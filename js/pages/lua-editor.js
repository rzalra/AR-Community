/* ========================================
   AR COMMUNITY — Lua Editor Pro
   ======================================== */

const LuaEditorPage = {
  code: '',
  activeTemplate: null,

  templates: {
    'Server Script': `-- Server Script\nlocal Players = game:GetService("Players")\n\nPlayers.PlayerAdded:Connect(function(player)\n  print(player.Name .. " joined the game!")\n  \n  -- Create leaderstats\n  local leaderstats = Instance.new("Folder")\n  leaderstats.Name = "leaderstats"\n  leaderstats.Parent = player\n  \n  local coins = Instance.new("IntValue")\n  coins.Name = "Coins"\n  coins.Value = 0\n  coins.Parent = leaderstats\nend)\n\nPlayers.PlayerRemoving:Connect(function(player)\n  print(player.Name .. " left the game.")\nend)`,

    'Local Script': `-- Local Script\nlocal Players = game:GetService("Players")\nlocal UserInputService = game:GetService("UserInputService")\nlocal player = Players.LocalPlayer\n\n-- Handle keyboard input\nUserInputService.InputBegan:Connect(function(input, gameProcessed)\n  if gameProcessed then return end\n  \n  if input.KeyCode == Enum.KeyCode.E then\n    print("E key pressed!")\n    -- Add interaction logic here\n  end\nend)\n\n-- Update loop\nlocal RunService = game:GetService("RunService")\nRunService.RenderStepped:Connect(function(dt)\n  -- Frame update logic\nend)`,

    'Module Script': `-- Module Script\nlocal Module = {}\n\nfunction Module.new(name, health)\n  local self = {\n    Name = name,\n    Health = health or 100,\n    MaxHealth = health or 100,\n    IsAlive = true\n  }\n  \n  function self:TakeDamage(amount)\n    self.Health = math.max(0, self.Health - amount)\n    if self.Health <= 0 then\n      self.IsAlive = false\n      print(self.Name .. " has been defeated!")\n    end\n  end\n  \n  function self:Heal(amount)\n    self.Health = math.min(self.MaxHealth, self.Health + amount)\n  end\n  \n  return self\nend\n\nreturn Module`,

    'Data Store': `-- DataStore Service\nlocal DataStoreService = game:GetService("DataStoreService")\nlocal playerData = DataStoreService:GetDataStore("PlayerData")\n\nlocal function saveData(player)\n  local key = "Player_" .. player.UserId\n  local data = {\n    Coins = player.leaderstats.Coins.Value,\n    Level = player.leaderstats.Level.Value\n  }\n  \n  local success, err = pcall(function()\n    playerData:SetAsync(key, data)\n  end)\n  \n  if success then\n    print("Data saved for " .. player.Name)\n  else\n    warn("Failed to save data: " .. err)\n  end\nend\n\nlocal function loadData(player)\n  local key = "Player_" .. player.UserId\n  \n  local success, data = pcall(function()\n    return playerData:GetAsync(key)\n  end)\n  \n  if success and data then\n    player.leaderstats.Coins.Value = data.Coins or 0\n    player.leaderstats.Level.Value = data.Level or 1\n  end\nend`,

    'GUI Handler': `-- GUI Handler (Local Script)\nlocal Players = game:GetService("Players")\nlocal player = Players.LocalPlayer\nlocal playerGui = player:WaitForChild("PlayerGui")\n\n-- Get UI elements\nlocal screenGui = playerGui:WaitForChild("MainGui")\nlocal frame = screenGui:WaitForChild("MainFrame")\nlocal closeBtn = frame:WaitForChild("CloseButton")\nlocal openBtn = screenGui:WaitForChild("OpenButton")\n\n-- Toggle visibility with tween\nlocal TweenService = game:GetService("TweenService")\n\nlocal function toggleFrame(visible)\n  local goal = visible and {Position = UDim2.new(0.5, 0, 0.5, 0)} or {Position = UDim2.new(0.5, 0, -1, 0)}\n  local tween = TweenService:Create(frame, TweenInfo.new(0.3, Enum.EasingStyle.Back), goal)\n  tween:Play()\nend\n\nopenBtn.MouseButton1Click:Connect(function()\n  toggleFrame(true)\nend)\n\ncloseBtn.MouseButton1Click:Connect(function()\n  toggleFrame(false)\nend)`
  },

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Lua Editor Pro</span>
            </div>
            <div class="tool-page-header">
              <h1>📝 Lua Editor Pro</h1>
              <p>Editor Lua canggih dengan syntax highlighting dan template Roblox siap pakai</p>
            </div>

            <div class="tool-section">
              <h3>📋 Template Roblox</h3>
              <div class="preset-grid" id="template-grid">
                ${Object.keys(this.templates).map(name => `
                  <button class="preset-btn ${this.activeTemplate === name ? 'active' : ''}" onclick="LuaEditorPage.loadTemplate('${name}')">${name}</button>
                `).join('')}
              </div>
            </div>

            <div class="code-editor-wrap">
              <div class="code-editor-toolbar">
                <button class="btn btn-primary btn-sm" onclick="LuaEditorPage.syntaxCheck()">▶ Syntax Check</button>
                <button class="btn btn-ghost btn-sm" onclick="LuaEditorPage.copyCode()">📋 Copy</button>
                <button class="btn btn-ghost btn-sm" onclick="LuaEditorPage.clearCode()">🗑 Clear</button>
                <button class="btn btn-ghost btn-sm" onclick="LuaEditorPage.downloadCode()">💾 Download .lua</button>
                <span style="margin-left:auto; font-size:0.6rem; color:var(--color-text-muted);" id="char-count">0 chars</span>
              </div>
              <textarea class="code-textarea" id="lua-code-input" placeholder="-- Tulis kode Lua Anda di sini...\n-- Atau pilih template di atas untuk memulai" spellcheck="false" oninput="LuaEditorPage.updateCount()">${this.code}</textarea>
            </div>

            <div style="margin-top: var(--space-4);">
              <h3 style="font-size: var(--text-sm); font-weight: bold; margin-bottom: var(--space-2);">📟 Output</h3>
              <div class="code-output" id="lua-output">-- Output akan muncul di sini setelah Syntax Check</div>
            </div>

          </div>
        </section>
      </div>
    `;
    this.updateCount();
  },

  loadTemplate(name) {
    this.activeTemplate = name;
    this.code = this.templates[name];
    this.render();
  },

  updateCount() {
    const textarea = document.getElementById('lua-code-input');
    const counter = document.getElementById('char-count');
    if (textarea && counter) {
      this.code = textarea.value;
      const lines = textarea.value.split('\n').length;
      counter.textContent = `${textarea.value.length} chars · ${lines} lines`;
    }
  },

  syntaxCheck() {
    const textarea = document.getElementById('lua-code-input');
    const output = document.getElementById('lua-output');
    if (!textarea || !output) return;

    const code = textarea.value.trim();
    if (!code) {
      output.innerHTML = '<span style="color:var(--color-accent-yellow)">⚠️ Tidak ada kode untuk diperiksa.</span>';
      return;
    }

    const errors = [];
    const lines = code.split('\n');

    // Basic Lua syntax checks
    let openBlocks = 0;
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('--')) return; // skip comments

      // Check for common mistakes
      if (/\bfunction\b/.test(trimmed) && !/\bend\b/.test(trimmed)) openBlocks++;
      if (/\bif\b.*\bthen\b/.test(trimmed) && !/\bend\b/.test(trimmed)) openBlocks++;
      if (/\bfor\b.*\bdo\b/.test(trimmed)) openBlocks++;
      if (/\bwhile\b.*\bdo\b/.test(trimmed)) openBlocks++;
      if (/\brepeat\b/.test(trimmed)) openBlocks++;
      if (/^\s*end\b/.test(trimmed)) openBlocks--;
      if (/^\s*until\b/.test(trimmed)) openBlocks--;

      // Check for = vs == in if
      if (/\bif\b/.test(trimmed) && /[^=<>!~]=[^=]/.test(trimmed) && !/==/.test(trimmed)) {
        errors.push(`Line ${i+1}: ⚠️ Kemungkinan assignment di dalam if-statement (gunakan == untuk perbandingan)`);
      }

      // Check unclosed strings
      const singleQuotes = (trimmed.match(/'/g) || []).length;
      const doubleQuotes = (trimmed.match(/"/g) || []).length;
      if (singleQuotes % 2 !== 0) errors.push(`Line ${i+1}: ⚠️ String dengan kutip tunggal tidak tertutup`);
      if (doubleQuotes % 2 !== 0) errors.push(`Line ${i+1}: ⚠️ String dengan kutip ganda tidak tertutup`);
    });

    if (openBlocks > 0) errors.push(`⚠️ Ada ${openBlocks} blok yang belum ditutup dengan 'end'`);
    if (openBlocks < 0) errors.push(`⚠️ Ada ${Math.abs(openBlocks)} 'end' berlebih`);

    if (errors.length === 0) {
      output.innerHTML = `<span style="color:var(--color-accent-green)">✅ Syntax check berhasil! Tidak ditemukan error.\n\n📊 Statistik:\n   • ${lines.length} baris kode\n   • ${code.length} karakter\n   • ${(code.match(/function/g) || []).length} fungsi ditemukan\n   • ${(code.match(/local/g) || []).length} variabel lokal</span>`;
    } else {
      output.innerHTML = `<span style="color:var(--color-accent-red)">❌ Ditemukan ${errors.length} potensi masalah:\n\n${errors.join('\n')}</span>`;
    }
  },

  copyCode() {
    const textarea = document.getElementById('lua-code-input');
    if (textarea && textarea.value) {
      navigator.clipboard.writeText(textarea.value);
      const output = document.getElementById('lua-output');
      if (output) output.innerHTML = '<span style="color:var(--color-accent-green)">✅ Kode berhasil disalin ke clipboard!</span>';
    }
  },

  clearCode() {
    this.code = '';
    this.activeTemplate = null;
    this.render();
  },

  downloadCode() {
    const textarea = document.getElementById('lua-code-input');
    if (!textarea || !textarea.value) return;
    const blob = new Blob([textarea.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (this.activeTemplate || 'script').replace(/\s+/g, '_') + '.lua';
    a.click();
    URL.revokeObjectURL(url);
  }
};

/* ========================================
   AR COMMUNITY — Roblox Studio Helper
   ======================================== */

const StudioHelperPage = {
  activeCategory: 'terrain',
  activeTemplate: null,

  categories: {
    terrain: { label: '🏔️ Terrain Generator', templates: {
      'Flat Terrain': { params: { size: 512, material: 'Grass', height: 0 }, code: (p) => `-- Terrain Generator: Flat\nlocal terrain = workspace.Terrain\nterrain:FillBlock(CFrame.new(0, -${p.height/2}, 0), Vector3.new(${p.size}, ${p.height || 10}, ${p.size}), Enum.Material.${p.material})` },
      'Hills': { params: { size: 512, amplitude: 40, frequency: 0.01 }, code: (p) => `-- Terrain Generator: Hills\nlocal terrain = workspace.Terrain\nfor x = -${p.size/2}, ${p.size/2}, 4 do\n  for z = -${p.size/2}, ${p.size/2}, 4 do\n    local height = math.sin(x * ${p.frequency}) * math.cos(z * ${p.frequency}) * ${p.amplitude}\n    terrain:FillBlock(CFrame.new(x, height/2, z), Vector3.new(4, math.abs(height) + 4, 4), Enum.Material.Grass)\n  end\nend` },
      'Island': { params: { radius: 200, height: 30 }, code: (p) => `-- Terrain Generator: Island\nlocal terrain = workspace.Terrain\nfor x = -${p.radius}, ${p.radius}, 4 do\n  for z = -${p.radius}, ${p.radius}, 4 do\n    local dist = math.sqrt(x*x + z*z)\n    if dist < ${p.radius} then\n      local h = (1 - dist/${p.radius}) * ${p.height}\n      terrain:FillBlock(CFrame.new(x, h/2, z), Vector3.new(4, h + 4, 4), Enum.Material.Grass)\n    end\n  end\nend\n-- Add water\nterrain:FillBlock(CFrame.new(0, -2, 0), Vector3.new(${p.radius*3}, 4, ${p.radius*3}), Enum.Material.Water)` }
    }},
    ui: { label: '🖼️ UI Builder', templates: {
      'Health Bar': { params: { width: 200, height: 20, color: 'Red' }, code: (p) => `-- UI Builder: Health Bar\nlocal player = game.Players.LocalPlayer\nlocal gui = Instance.new("ScreenGui", player.PlayerGui)\nlocal frame = Instance.new("Frame", gui)\nframe.Size = UDim2.new(0, ${p.width}, 0, ${p.height})\nframe.Position = UDim2.new(0.5, -${p.width/2}, 0.9, 0)\nframe.BackgroundColor3 = Color3.fromRGB(40, 40, 40)\nframe.BorderSizePixel = 0\n\nlocal bar = Instance.new("Frame", frame)\nbar.Name = "HealthBar"\nbar.Size = UDim2.new(1, 0, 1, 0)\nbar.BackgroundColor3 = BrickColor.new("${p.color}").Color\nbar.BorderSizePixel = 0\n\nlocal corner = Instance.new("UICorner", frame)\ncorner.CornerRadius = UDim.new(0, 4)\nlocal corner2 = Instance.new("UICorner", bar)\ncorner2.CornerRadius = UDim.new(0, 4)` },
      'Shop GUI': { params: { columns: 3, itemSize: 80 }, code: (p) => `-- UI Builder: Shop GUI\nlocal player = game.Players.LocalPlayer\nlocal gui = Instance.new("ScreenGui", player.PlayerGui)\nlocal main = Instance.new("Frame", gui)\nmain.Size = UDim2.new(0.6, 0, 0.7, 0)\nmain.Position = UDim2.new(0.2, 0, 0.15, 0)\nmain.BackgroundColor3 = Color3.fromRGB(25, 25, 25)\nmain.BorderSizePixel = 0\nInstance.new("UICorner", main).CornerRadius = UDim.new(0, 12)\n\n-- Title\nlocal title = Instance.new("TextLabel", main)\ntitle.Size = UDim2.new(1, 0, 0, 40)\ntitle.Text = "SHOP"\ntitle.TextColor3 = Color3.new(1,1,1)\ntitle.BackgroundTransparency = 1\ntitle.Font = Enum.Font.GothamBold\ntitle.TextSize = 20\n\n-- Grid\nlocal grid = Instance.new("Frame", main)\ngrid.Size = UDim2.new(1, -20, 1, -60)\ngrid.Position = UDim2.new(0, 10, 0, 50)\ngrid.BackgroundTransparency = 1\nlocal layout = Instance.new("UIGridLayout", grid)\nlayout.CellSize = UDim2.new(0, ${p.itemSize}, 0, ${p.itemSize})\nlayout.CellPadding = UDim2.new(0, 8, 0, 8)` },
      'Notification': { params: { duration: 3, text: 'Hello!' }, code: (p) => `-- UI Builder: Notification System\nlocal function notify(text, duration)\n  local player = game.Players.LocalPlayer\n  local gui = player.PlayerGui:FindFirstChild("NotifGui") or Instance.new("ScreenGui", player.PlayerGui)\n  gui.Name = "NotifGui"\n  \n  local label = Instance.new("TextLabel", gui)\n  label.Size = UDim2.new(0.3, 0, 0, 36)\n  label.Position = UDim2.new(0.35, 0, 0, -40)\n  label.Text = text\n  label.TextColor3 = Color3.new(1,1,1)\n  label.BackgroundColor3 = Color3.fromRGB(30, 30, 30)\n  label.BorderSizePixel = 0\n  label.Font = Enum.Font.Gotham\n  label.TextSize = 14\n  Instance.new("UICorner", label).CornerRadius = UDim.new(0, 6)\n  \n  label:TweenPosition(UDim2.new(0.35, 0, 0, 10), "Out", "Back", 0.3)\n  task.delay(duration or ${p.duration}, function()\n    label:TweenPosition(UDim2.new(0.35, 0, 0, -40), "In", "Back", 0.3)\n    task.delay(0.3, function() label:Destroy() end)\n  end)\nend\n\nnotify("${p.text}", ${p.duration})` }
    }},
    animation: { label: '🎬 Animation Toolkit', templates: {
      'Tween Part': { params: { duration: 2, easing: 'Sine' }, code: (p) => `-- Animation: Tween Part\nlocal TweenService = game:GetService("TweenService")\nlocal part = workspace:FindFirstChild("TweenPart") or Instance.new("Part", workspace)\npart.Name = "TweenPart"\npart.Position = Vector3.new(0, 5, 0)\npart.Anchored = true\npart.BrickColor = BrickColor.Random()\n\nlocal tweenInfo = TweenInfo.new(\n  ${p.duration},\n  Enum.EasingStyle.${p.easing},\n  Enum.EasingDirection.InOut,\n  -1, -- repeat forever\n  true -- reverse\n)\n\nlocal tween = TweenService:Create(part, tweenInfo, {\n  Position = Vector3.new(20, 10, 0),\n  Size = Vector3.new(6, 6, 6),\n  Color = Color3.fromRGB(255, 0, 100)\n})\n\ntween:Play()` },
      'Spin Part': { params: { speed: 2 }, code: (p) => `-- Animation: Spin Part\nlocal RunService = game:GetService("RunService")\nlocal part = workspace:FindFirstChild("SpinPart") or Instance.new("Part", workspace)\npart.Name = "SpinPart"\npart.Anchored = true\npart.Position = Vector3.new(0, 5, 0)\n\nRunService.Heartbeat:Connect(function(dt)\n  part.CFrame = part.CFrame * CFrame.Angles(0, math.rad(${p.speed} * 60 * dt), 0)\nend)` }
    }},
    lighting: { label: '💡 Lighting Setup', templates: {
      'Day/Night Cycle': { params: { cycleTime: 120 }, code: (p) => `-- Lighting: Day/Night Cycle\nlocal Lighting = game:GetService("Lighting")\nlocal RunService = game:GetService("RunService")\n\nlocal cycleTime = ${p.cycleTime} -- seconds for full cycle\nlocal startTime = tick()\n\nRunService.Heartbeat:Connect(function()\n  local elapsed = tick() - startTime\n  local timeOfDay = (elapsed / cycleTime) % 1\n  Lighting.ClockTime = timeOfDay * 24\n  \n  -- Adjust ambient based on time\n  if Lighting.ClockTime > 6 and Lighting.ClockTime < 18 then\n    Lighting.Ambient = Color3.fromRGB(120, 120, 120)\n  else\n    Lighting.Ambient = Color3.fromRGB(20, 20, 40)\n  end\nend)` },
      'Neon Atmosphere': { params: {}, code: (p) => `-- Lighting: Neon Atmosphere\nlocal Lighting = game:GetService("Lighting")\nLighting.ClockTime = 0\nLighting.Ambient = Color3.fromRGB(0, 0, 20)\nLighting.OutdoorAmbient = Color3.fromRGB(10, 0, 30)\nLighting.Brightness = 0\nLighting.FogEnd = 500\nLighting.FogColor = Color3.fromRGB(5, 0, 15)\n\nlocal bloom = Instance.new("BloomEffect", Lighting)\nbloom.Intensity = 0.8\nbloom.Size = 30\nbloom.Threshold = 0.8\n\nlocal cc = Instance.new("ColorCorrectionEffect", Lighting)\ncc.Saturation = 0.3\ncc.Contrast = 0.2\ncc.TintColor = Color3.fromRGB(200, 180, 255)` }
    }}
  },

  render() {
    const app = document.getElementById('app');
    const cats = this.categories;
    const activeCat = cats[this.activeCategory];

    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Roblox Studio Helper</span>
            </div>
            <div class="tool-page-header">
              <h1>🎮 Roblox Studio Helper</h1>
              <p>Generator script Roblox Studio siap pakai — pilih template, konfigurasi, copy ke Command Bar</p>
            </div>

            <div class="tool-section">
              <h3>📂 Kategori</h3>
              <div class="preset-grid">
                ${Object.entries(cats).map(([key, cat]) => `
                  <button class="preset-btn ${this.activeCategory===key?'active':''}" onclick="StudioHelperPage.setCategory('${key}')">${cat.label}</button>
                `).join('')}
              </div>
            </div>

            <div class="tool-section">
              <h3>${activeCat.label} — Template</h3>
              <div class="preset-grid">
                ${Object.keys(activeCat.templates).map(name => `
                  <button class="preset-btn ${this.activeTemplate===name?'active':''}" onclick="StudioHelperPage.selectTemplate('${name}')">${name}</button>
                `).join('')}
              </div>
            </div>

            <div class="code-output" id="studio-code" style="min-height:250px; margin-top:var(--space-4);">-- Pilih kategori dan template di atas untuk generate kode Roblox Studio</div>

            <div style="display:flex; gap:var(--space-3); margin-top:var(--space-4);">
              <button class="btn btn-primary" onclick="StudioHelperPage.copyCode()">📋 Copy ke Clipboard</button>
              <button class="btn btn-ghost" onclick="StudioHelperPage.downloadLua()">💾 Download .lua</button>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  setCategory(cat) {
    this.activeCategory = cat;
    this.activeTemplate = null;
    this.render();
  },

  selectTemplate(name) {
    this.activeTemplate = name;
    const cat = this.categories[this.activeCategory];
    const tmpl = cat.templates[name];
    const code = tmpl.code(tmpl.params);
    this._lastCode = code;
    const output = document.getElementById('studio-code');
    if (output) output.textContent = code;
  },

  copyCode() {
    if (this._lastCode) {
      navigator.clipboard.writeText(this._lastCode);
      const output = document.getElementById('studio-code');
      if (output) output.textContent = '✅ Kode berhasil disalin ke clipboard!\n\nBuka Roblox Studio → View → Command Bar → Paste & Enter';
    }
  },

  downloadLua() {
    if (!this._lastCode) return;
    const blob = new Blob([this._lastCode], {type:'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${(this.activeTemplate || 'script').replace(/\s+/g,'_').toLowerCase()}.lua`;
    a.click();
  }
};

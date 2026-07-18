/* ========================================
   AR COMMUNITY — AI Assistant
   ======================================== */

const AiAssistantPage = {
  messages: [],
  isTyping: false,

  knowledge: {
    'leaderboard': {
      q: 'Bagaimana cara membuat leaderboard di Roblox?',
      a: `Untuk membuat leaderboard di Roblox, kamu perlu membuat **leaderstats** folder di setiap player. Berikut contoh scriptnya:

\`\`\`lua
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  local leaderstats = Instance.new("Folder")
  leaderstats.Name = "leaderstats"
  leaderstats.Parent = player

  local coins = Instance.new("IntValue")
  coins.Name = "Coins"
  coins.Value = 0
  coins.Parent = leaderstats

  local wins = Instance.new("IntValue")
  wins.Name = "Wins"
  wins.Value = 0
  wins.Parent = leaderstats
end)
\`\`\`

Letakkan script ini di **ServerScriptService** sebagai **Script** (bukan LocalScript). Leaderboard akan otomatis muncul di pojok kanan atas game.`
    },
    'datastore': {
      q: 'Bagaimana cara menyimpan data player?',
      a: `Gunakan **DataStoreService** untuk menyimpan data player secara persisten. Berikut contohnya:

\`\`\`lua
local DataStoreService = game:GetService("DataStoreService")
local dataStore = DataStoreService:GetDataStore("PlayerData")
local Players = game:GetService("Players")

Players.PlayerAdded:Connect(function(player)
  local key = "Player_" .. player.UserId
  
  local success, data = pcall(function()
    return dataStore:GetAsync(key)
  end)
  
  if success and data then
    -- Load data ke leaderstats
    player.leaderstats.Coins.Value = data.Coins or 0
  end
end)

Players.PlayerRemoving:Connect(function(player)
  local key = "Player_" .. player.UserId
  local data = {
    Coins = player.leaderstats.Coins.Value
  }
  
  pcall(function()
    dataStore:SetAsync(key, data)
  end)
end)
\`\`\`

⚠️ **Penting**: DataStore hanya bisa digunakan di **Server Script**, dan harus enable **API Services** di Game Settings.`
    },
    'shop': {
      q: 'Bagaimana cara membuat shop GUI?',
      a: `Untuk membuat Shop GUI, kamu perlu membuat ScreenGui dengan ScrollingFrame dan tombol beli. Berikut contoh scriptnya:

\`\`\`lua
-- LocalScript di StarterPlayerScripts
local player = game.Players.LocalPlayer
local gui = player.PlayerGui:WaitForChild("ShopGui")
local shopFrame = gui:WaitForChild("ShopFrame")
local buyEvent = game.ReplicatedStorage:WaitForChild("BuyItem")

-- Toggle shop
local openBtn = gui:WaitForChild("OpenButton")
openBtn.MouseButton1Click:Connect(function()
  shopFrame.Visible = not shopFrame.Visible
end)

-- Handle buy button clicks
for _, item in shopFrame.ItemList:GetChildren() do
  if item:IsA("Frame") then
    local buyBtn = item:FindFirstChild("BuyButton")
    if buyBtn then
      buyBtn.MouseButton1Click:Connect(function()
        buyEvent:FireServer(item.Name, item.Price.Value)
      end)
    end
  end
end
\`\`\`

Di sisi server, handle RemoteEvent untuk memproses pembelian dan mengurangi coins player.`
    },
    'tween': {
      q: 'Bagaimana cara menggunakan TweenService?',
      a: `**TweenService** digunakan untuk animasi smooth di Roblox. Berikut contoh penggunaannya:

\`\`\`lua
local TweenService = game:GetService("TweenService")
local part = workspace.MyPart

-- Konfigurasi tween
local tweenInfo = TweenInfo.new(
  2,                           -- Durasi (detik)
  Enum.EasingStyle.Quad,       -- Style
  Enum.EasingDirection.InOut,  -- Direction
  0,                           -- Repeat count (0 = sekali)
  false,                       -- Reverse?
  0                            -- Delay
)

-- Target properties
local goal = {
  Position = Vector3.new(10, 20, 0),
  Color = Color3.fromRGB(255, 0, 0),
  Size = Vector3.new(5, 5, 5)
}

local tween = TweenService:Create(part, tweenInfo, goal)
tween:Play()

-- Event ketika tween selesai
tween.Completed:Connect(function()
  print("Tween selesai!")
end)
\`\`\`

TweenService bisa animate hampir semua property numerik: Position, Size, Color, Transparency, dll.`
    },
    'remote': {
      q: 'Bagaimana cara menggunakan RemoteEvents?',
      a: `**RemoteEvents** digunakan untuk komunikasi antara Client (LocalScript) dan Server (Script):

\`\`\`lua
-- Di ReplicatedStorage, buat RemoteEvent bernama "MyEvent"

-- SERVER SCRIPT (ServerScriptService)
local event = game.ReplicatedStorage:WaitForChild("MyEvent")

event.OnServerEvent:Connect(function(player, data)
  print(player.Name .. " sent: " .. tostring(data))
  -- Kirim balik ke client
  event:FireClient(player, "Server received!")
end)

-- LOCAL SCRIPT (StarterPlayerScripts)
local event = game.ReplicatedStorage:WaitForChild("MyEvent")

-- Kirim ke server
event:FireServer("Hello from client!")

-- Terima dari server
event.OnClientEvent:Connect(function(message)
  print("Server says: " .. message)
end)
\`\`\`

⚠️ **Keamanan**: Selalu validasi data dari client di server! Jangan pernah percaya input client.`
    },
    'raycast': {
      q: 'Bagaimana cara menggunakan Raycast?',
      a: `**Raycast** digunakan untuk mendeteksi objek sepanjang garis lurus (misal: menembak, deteksi ground):

\`\`\`lua
local origin = Vector3.new(0, 50, 0)
local direction = Vector3.new(0, -100, 0) -- ke bawah

-- Parameter filter
local params = RaycastParams.new()
params.FilterType = Enum.RaycastFilterType.Exclude
params.FilterDescendantsInstances = {game.Players.LocalPlayer.Character}

local result = workspace:Raycast(origin, direction, params)

if result then
  print("Hit:", result.Instance.Name)
  print("Position:", result.Position)
  print("Normal:", result.Normal)
  print("Material:", result.Material)
else
  print("Tidak mengenai apa-apa")
end
\`\`\`

Raycast sangat berguna untuk sistem senjata, deteksi tanah, dan interaksi objek.`
    }
  },

  render() {
    const app = document.getElementById('app');
    const quickQuestions = Object.values(this.knowledge).map(k => k.q);

    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">AI Assistant</span>
            </div>
            <div class="tool-page-header">
              <h1>🤖 AI Assistant</h1>
              <p>Asisten AI untuk membantu scripting Roblox — tanya apa saja tentang Lua dan Roblox Studio</p>
            </div>

            <div class="tool-section" style="margin-bottom:var(--space-4);">
              <h3>💡 Pertanyaan Cepat</h3>
              <div class="preset-grid">
                ${quickQuestions.map(q => `
                  <button class="preset-btn" onclick="AiAssistantPage.ask('${q.replace(/'/g, "\\'")}')" style="font-size:0.62rem; text-align:left;">${q}</button>
                `).join('')}
              </div>
            </div>

            <div class="chat-container" id="chat-container">
              <div class="chat-messages" id="chat-messages">
                <div class="chat-bubble bot">
                  👋 Halo! Saya AI Assistant AR Community. Tanyakan apa saja tentang scripting Roblox Lua, dan saya akan membantu dengan contoh kode dan penjelasan. Gunakan pertanyaan cepat di atas atau ketik langsung!
                </div>
                ${this.messages.map(m => `<div class="chat-bubble ${m.role}">${m.content}</div>`).join('')}
                ${this.isTyping ? '<div class="chat-bubble bot" style="opacity:0.6;">⏳ Sedang mengetik...</div>' : ''}
              </div>
              <div class="chat-input-bar">
                <input type="text" id="chat-input" placeholder="Tanya tentang Roblox scripting..." onkeydown="if(event.key==='Enter')AiAssistantPage.sendMessage()">
                <button class="btn btn-primary btn-sm" onclick="AiAssistantPage.sendMessage()">Kirim</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    this.scrollToBottom();
  },

  ask(question) {
    const input = document.getElementById('chat-input');
    if (input) input.value = question;
    this.sendMessage();
  },

  sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    this.messages.push({ role: 'user', content: text });
    input.value = '';
    this.isTyping = true;
    this.render();

    // Find matching answer
    setTimeout(() => {
      const answer = this.findAnswer(text);
      this.messages.push({ role: 'bot', content: answer });
      this.isTyping = false;
      this.render();
    }, 800 + Math.random() * 700);
  },

  findAnswer(question) {
    const q = question.toLowerCase();

    // Search in knowledge base
    for (const [key, entry] of Object.entries(this.knowledge)) {
      const keywords = key.split('_');
      if (keywords.some(kw => q.includes(kw)) || q.includes(entry.q.toLowerCase().substring(0, 20))) {
        return this.formatAnswer(entry.a);
      }
    }

    // Keyword-based fallback
    if (q.includes('leaderboard') || q.includes('leaderstats') || q.includes('skor')) return this.formatAnswer(this.knowledge.leaderboard.a);
    if (q.includes('data') || q.includes('save') || q.includes('simpan')) return this.formatAnswer(this.knowledge.datastore.a);
    if (q.includes('shop') || q.includes('toko') || q.includes('gui') || q.includes('beli')) return this.formatAnswer(this.knowledge.shop.a);
    if (q.includes('tween') || q.includes('animasi') || q.includes('animation')) return this.formatAnswer(this.knowledge.tween.a);
    if (q.includes('remote') || q.includes('event') || q.includes('server') || q.includes('client')) return this.formatAnswer(this.knowledge.remote.a);
    if (q.includes('raycast') || q.includes('ray') || q.includes('tembak') || q.includes('shoot')) return this.formatAnswer(this.knowledge.raycast.a);

    // Generic fallback
    return `🤔 Saya belum memiliki jawaban spesifik untuk pertanyaan itu. Coba tanyakan tentang topik berikut:\n\n• Leaderboard & Score\n• DataStore & Save Data\n• Shop GUI\n• TweenService & Animation\n• RemoteEvents\n• Raycasting\n\nAtau gunakan tombol pertanyaan cepat di atas!`;
  },

  formatAnswer(text) {
    // Convert markdown code blocks to HTML
    return text
      .replace(/```lua\n([\s\S]*?)```/g, '<pre>$1</pre>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  },

  scrollToBottom() {
    const msgs = document.getElementById('chat-messages');
    if (msgs) setTimeout(() => msgs.scrollTop = msgs.scrollHeight, 100);
  }
};

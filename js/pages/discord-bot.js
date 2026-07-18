/* ========================================
   AR COMMUNITY — Discord Bot Builder
   ======================================== */

const DiscordBotPage = {
  commands: [],
  editingCommand: null,

  render() {
    try { this.commands = JSON.parse(localStorage.getItem('discord_bot_commands')) || []; } catch(e) { this.commands = []; }

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="page-transition-enter">
        <section class="tool-page">
          <div class="container">
            <div class="tool-breadcrumbs">
              <a href="#/tools">🔧 Tools</a> <span>&gt;</span> <span class="active">Discord Bot Builder</span>
            </div>
            <div class="tool-page-header">
              <h1>🤖 Discord Bot Builder</h1>
              <p>Platform visual untuk membuat bot Discord tanpa coding — buat command, preview, dan generate kode</p>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-4);">
              <!-- Left: Command Builder -->
              <div>
                <div class="tool-section" style="margin-bottom:var(--space-4);">
                  <h3>➕ Tambah Command</h3>
                  <div style="display:flex; flex-direction:column; gap:var(--space-3);">
                    <div>
                      <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Command Name (dengan prefix !)</label>
                      <input type="text" id="cmd-name" class="form-input" placeholder="!help" value="">
                    </div>
                    <div>
                      <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Response Text</label>
                      <textarea id="cmd-response" class="form-input" style="min-height:60px;" placeholder="Bot akan membalas dengan pesan ini..."></textarea>
                    </div>
                    <div>
                      <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Embed Color</label>
                      <input type="color" id="cmd-color" value="#5865f2" style="width:100%; height:28px; border:1px solid var(--color-border); border-radius:var(--radius-sm); background:transparent; cursor:pointer;">
                    </div>
                    <div>
                      <label style="font-size:0.68rem; color:var(--color-text-secondary); display:block; margin-bottom:4px;">Template</label>
                      <div class="preset-grid">
                        <button class="preset-btn" onclick="DiscordBotPage.applyTemplate('welcome')">👋 Welcome</button>
                        <button class="preset-btn" onclick="DiscordBotPage.applyTemplate('rules')">📜 Rules</button>
                        <button class="preset-btn" onclick="DiscordBotPage.applyTemplate('help')">❓ Help</button>
                        <button class="preset-btn" onclick="DiscordBotPage.applyTemplate('ping')">🏓 Ping</button>
                      </div>
                    </div>
                    <button class="btn btn-primary" onclick="DiscordBotPage.addCommand()">➕ Tambah Command</button>
                  </div>
                </div>

                <div class="tool-section" style="margin-bottom:0;">
                  <h3>📋 Command List (${this.commands.length})</h3>
                  <div style="max-height:200px; overflow-y:auto;">
                    ${this.commands.length ? this.commands.map((cmd, i) => `
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--space-2); border-bottom:1px solid var(--color-border);">
                        <span style="font-size:0.78rem; color:var(--color-accent-cyan); font-family:monospace;">${cmd.name}</span>
                        <button class="btn btn-ghost btn-sm" style="font-size:0.6rem; color:var(--color-accent-red);" onclick="DiscordBotPage.removeCommand(${i})">✕</button>
                      </div>
                    `).join('') : '<p style="font-size:0.72rem; color:var(--color-text-muted); text-align:center; padding:var(--space-3);">Belum ada command.</p>'}
                  </div>
                </div>
              </div>

              <!-- Right: Preview & Code -->
              <div>
                <div class="tool-section" style="margin-bottom:var(--space-4);">
                  <h3>👀 Discord Preview</h3>
                  <div style="background:#36393f; border-radius:8px; padding:var(--space-4);">
                    <div style="display:flex; gap:var(--space-3); margin-bottom:var(--space-3);">
                      <div style="width:32px; height:32px; border-radius:50%; background:#5865f2; display:flex; align-items:center; justify-content:center; font-size:0.8rem;">🤖</div>
                      <div>
                        <span style="font-weight:bold; color:#5865f2; font-size:0.78rem;">AR Bot</span>
                        <span style="font-size:0.6rem; color:#72767d; margin-left:6px;">Today at ${new Date().toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit'})}</span>
                      </div>
                    </div>
                    <div id="discord-preview-embed" class="discord-embed-preview">
                      <div class="embed-title">Preview</div>
                      <div class="embed-desc">Tambahkan command untuk melihat preview di sini</div>
                    </div>
                  </div>
                </div>

                <div class="tool-section" style="margin-bottom:0;">
                  <h3>💻 Generated Code (Discord.js)</h3>
                  <div class="code-output" id="bot-code" style="min-height:200px;">${this.generateCode()}</div>
                  <div style="display:flex; gap:var(--space-2); margin-top:var(--space-2);">
                    <button class="btn btn-primary btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('bot-code').textContent)">📋 Copy Code</button>
                    <button class="btn btn-ghost btn-sm" onclick="DiscordBotPage.downloadCode()">💾 Download .js</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    this.updatePreview();
  },

  applyTemplate(type) {
    const nameEl = document.getElementById('cmd-name');
    const respEl = document.getElementById('cmd-response');
    const colorEl = document.getElementById('cmd-color');

    const templates = {
      welcome: { name: '!welcome', response: 'Selamat datang di server kami! 🎉 Pastikan untuk membaca rules di #rules.', color: '#57f287' },
      rules: { name: '!rules', response: '📜 **Server Rules:**\n1. Jangan spam\n2. Hormati sesama member\n3. Tidak boleh NSFW\n4. Gunakan channel sesuai fungsinya', color: '#fee75c' },
      help: { name: '!help', response: '❓ **Daftar Command:**\n!help - Tampilkan bantuan\n!welcome - Pesan selamat datang\n!rules - Lihat peraturan\n!ping - Cek latensi bot', color: '#5865f2' },
      ping: { name: '!ping', response: '🏓 Pong! Latency: ${Date.now()}ms', color: '#ed4245' }
    };

    const t = templates[type];
    if (nameEl) nameEl.value = t.name;
    if (respEl) respEl.value = t.response;
    if (colorEl) colorEl.value = t.color;
    this.updatePreview();
  },

  addCommand() {
    const name = document.getElementById('cmd-name').value.trim();
    const response = document.getElementById('cmd-response').value.trim();
    const color = document.getElementById('cmd-color').value;

    if (!name || !response) return;

    this.commands.push({ name, response, color });
    localStorage.setItem('discord_bot_commands', JSON.stringify(this.commands));
    this.render();
  },

  removeCommand(index) {
    this.commands.splice(index, 1);
    localStorage.setItem('discord_bot_commands', JSON.stringify(this.commands));
    this.render();
  },

  updatePreview() {
    const embed = document.getElementById('discord-preview-embed');
    if (!embed) return;

    const name = (document.getElementById('cmd-name')?.value || 'Preview').trim();
    const response = (document.getElementById('cmd-response')?.value || 'Tambahkan command untuk preview').trim();
    const color = document.getElementById('cmd-color')?.value || '#5865f2';

    embed.style.borderLeftColor = color;
    embed.innerHTML = `
      <div class="embed-title">${name}</div>
      <div class="embed-desc">${response.replace(/\n/g, '<br>')}</div>
    `;
  },

  generateCode() {
    if (!this.commands.length) return '// Tambahkan command untuk generate kode bot Discord.js';

    let code = `const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');\nconst client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });\n\nclient.on('ready', () => {\n  console.log(\`Bot online: \${client.user.tag}\`);\n});\n\nclient.on('messageCreate', (message) => {\n  if (message.author.bot) return;\n\n`;

    this.commands.forEach(cmd => {
      code += `  if (message.content === '${cmd.name}') {\n    const embed = new EmbedBuilder()\n      .setTitle('${cmd.name}')\n      .setDescription(\`${cmd.response.replace(/`/g, "'")}\`)\n      .setColor('${cmd.color}');\n    message.reply({ embeds: [embed] });\n  }\n\n`;
    });

    code += `});\n\nclient.login('YOUR_BOT_TOKEN_HERE');`;
    return code;
  },

  downloadCode() {
    const code = this.generateCode();
    const blob = new Blob([code], {type:'text/javascript'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'discord_bot.js';
    a.click();
  }
};

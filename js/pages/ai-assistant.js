/* ========================================
   AR COMMUNITY — AI Assistant (Lua Assistant)
   ======================================== */

const AiAssistantPage = {
  messages: [],
  isTyping: false,
  showSettings: false,
  showModelPicker: false,
  attachedFiles: [],

  // Current selection
  currentProvider: null,
  currentModel: null,

  // API keys (loaded from localStorage)
  apiKeys: {
    anthropic: '',
    openai: '',
    google: '',
    groq: '',
    openrouter: ''
  },

  // Model definitions
  models: {
    anthropic: {
      label: 'ANTHROPIC',
      color: '#e17b4f',
      models: [
        { id: 'claude-opus-4-8', label: 'Claude Opus 4.8' },
        { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6' },
        { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5' }
      ]
    },
    openai: {
      label: 'OPENAI',
      color: '#10a37f',
      models: [
        { id: 'gpt-4.1', label: 'GPT-4.1' },
        { id: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
        { id: 'gpt-4o', label: 'GPT-4o' },
        { id: 'gpt-4o-mini', label: 'GPT-4o Mini' },
        { id: 'o3-mini', label: 'o3 Mini' }
      ]
    },
    google: {
      label: 'GOOGLE',
      color: '#4285f4',
      models: [
        { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
        { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
        { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash Lite' }
      ]
    },
    groq: {
      label: 'GROQ',
      color: '#f55036',
      models: [
        { id: 'llama-4-scout-17b-16e-instruct', label: 'Llama 4 Scout' },
        { id: 'meta-llama/llama-4-maverick-17b-128e-instruct', label: 'Llama 4 Maverick' },
        { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
        { id: 'gemma2-9b-it', label: 'Gemma 2 9B' }
      ]
    },
    openrouter: {
      label: 'OPENROUTER',
      color: '#8b5cf6',
      models: [
        { id: 'anthropic/claude-opus-4', label: 'Claude Opus 4' },
        { id: 'anthropic/claude-sonnet-4-5', label: 'Claude Sonnet 4.5' },
        { id: 'openai/gpt-4o', label: 'GPT-4o' },
        { id: 'google/gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
        { id: 'google/gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
        { id: 'x-ai/grok-3', label: 'Grok 3' },
        { id: 'x-ai/grok-3-mini', label: 'Grok 3 Mini' },
        { id: 'meta-llama/llama-4-scout', label: 'Llama 4 Scout' },
        { id: 'meta-llama/llama-4-maverick', label: 'Llama 4 Maverick' },
        { id: 'deepseek/deepseek-chat-v3-0324', label: 'DeepSeek V3' },
        { id: 'deepseek/deepseek-r1', label: 'DeepSeek R1' },
        { id: 'deepseek/deepseek-r1-0528', label: 'DeepSeek R1 0528' }
      ]
    }
  },

  init() {
    // Load API keys from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('ai_api_keys') || '{}');
      this.apiKeys = { ...this.apiKeys, ...stored };
    } catch(e) {}

    // Load current selection
    const storedProvider = localStorage.getItem('ai_provider');
    const storedModel = localStorage.getItem('ai_model');
    if (storedProvider && this.models[storedProvider]) {
      this.currentProvider = storedProvider;
      const mdl = this.models[storedProvider].models.find(m => m.id === storedModel);
      this.currentModel = mdl || this.models[storedProvider].models[0];
    }

    // Load chat history
    try {
      this.messages = JSON.parse(localStorage.getItem('ai_chat_history') || '[]');
    } catch(e) { this.messages = []; }
  },

  getCurrentLabel() {
    if (!this.currentProvider || !this.currentModel) return null;
    return `${this.models[this.currentProvider].label}: ${this.currentModel.label}`;
  },

  render() {
    this.init();
    const app = document.getElementById('app');
    const currentLabel = this.getCurrentLabel();

    app.innerHTML = `
      <style>
        .lua-ai-wrapper {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 60px);
          background: #080808;
        }
        .lua-ai-topbar {
          flex-shrink: 0;
          padding: 14px 24px;
          border-bottom: 1px solid var(--color-border);
          background: rgba(10,10,10,0.95);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .lua-ai-badge {
          width: 28px; height: 28px;
          background: var(--color-accent-red);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; font-weight: 900; color: white;
          flex-shrink: 0;
        }
        .lua-ai-title { font-size: var(--text-sm); font-weight: var(--font-weight-black); }
        .lua-ai-subtitle { font-size: 0.6rem; color: var(--color-text-muted); }
        .lua-settings-btn {
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: 8px;
          color: var(--color-text-secondary);
          font-size: 0.68rem;
          font-weight: bold;
          padding: 6px 14px;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .lua-settings-btn:hover { border-color: var(--color-accent-red); color: white; }

        /* Model selector bar */
        .lua-model-bar {
          flex-shrink: 0;
          padding: 8px 24px;
          background: rgba(255,255,255,0.01);
          border-bottom: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.65rem;
        }
        .lua-model-bar-provider {
          color: ${currentLabel ? this.models[this.currentProvider]?.color || 'var(--color-accent-cyan)' : 'var(--color-text-muted)'};
          font-weight: 900;
          letter-spacing: 0.03em;
          font-size: 0.6rem;
        }
        .lua-model-bar-name {
          color: var(--color-text-primary);
          font-weight: bold;
        }
        .lua-model-bar-btn {
          background: transparent;
          border: none;
          color: var(--color-text-muted);
          font-size: 0.6rem;
          cursor: pointer;
          padding: 3px 8px;
          border-radius: 4px;
          transition: all 0.15s;
          display: flex; align-items: center; gap: 4px;
        }
        .lua-model-bar-btn:hover { color: white; background: rgba(255,255,255,0.05); }
        .lua-files-badge {
          background: rgba(255, 204, 0, 0.1);
          border: 1px solid rgba(255, 204, 0, 0.2);
          color: #ffd700;
          font-size: 0.58rem;
          font-weight: bold;
          padding: 2px 8px;
          border-radius: 4px;
          cursor: pointer;
          margin-left: auto;
        }
        .lua-files-badge:hover { background: rgba(255,204,0,0.15); }

        /* Model picker panel */
        .lua-model-picker {
          flex-shrink: 0;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          margin: 0 24px;
          padding: 16px;
          background: rgba(15,15,15,0.95);
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: flex-start;
        }
        .lua-provider-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          width: 100%;
        }
        .lua-provider-label {
          font-size: 0.55rem;
          font-weight: 900;
          letter-spacing: 0.07em;
          min-width: 72px;
          padding-top: 4px;
          flex-shrink: 0;
        }
        .lua-model-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .lua-model-chip {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--color-border);
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 0.65rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .lua-model-chip:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.25);
          color: white;
        }
        .lua-model-chip.active {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.4);
          color: white;
        }

        /* Chat area */
        .lua-chat-area {
          flex: 1;
          overflow-y: auto;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .lua-chat-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          color: var(--color-text-muted);
        }
        .lua-chat-empty-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 16px;
          opacity: 0.3;
        }
        .lua-chat-empty p {
          font-size: 0.72rem;
          text-align: center;
          line-height: 1.6;
          max-width: 340px;
          color: var(--color-text-muted);
        }

        .lua-msg-user {
          align-self: flex-end;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px 12px 2px 12px;
          padding: 10px 14px;
          max-width: 75%;
          font-size: 0.75rem;
          line-height: 1.6;
          word-break: break-word;
        }
        .lua-msg-ai {
          align-self: flex-start;
          max-width: 80%;
          font-size: 0.75rem;
          line-height: 1.7;
          word-break: break-word;
        }
        .lua-msg-ai-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          font-size: 0.6rem;
          color: var(--color-text-muted);
        }
        .lua-msg-ai-icon {
          width: 22px; height: 22px;
          background: var(--color-accent-red);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.55rem; font-weight: 900; color: white; flex-shrink: 0;
        }
        .lua-msg-ai-body {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 2px 12px 12px 12px;
          padding: 12px 16px;
        }
        .lua-msg-ai-body pre {
          background: #0a0a0a;
          border: 1px solid var(--color-border);
          border-radius: 6px;
          padding: 12px;
          margin: 8px 0;
          font-family: monospace;
          font-size: 0.7rem;
          overflow-x: auto;
          white-space: pre;
        }
        .lua-typing {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 2px 12px 12px 12px;
          width: fit-content;
        }
        .lua-typing span {
          width: 6px; height: 6px;
          background: var(--color-text-muted);
          border-radius: 50%;
          animation: luaTypingBounce 1.2s infinite ease-in-out;
        }
        .lua-typing span:nth-child(1) { animation-delay: 0s; }
        .lua-typing span:nth-child(2) { animation-delay: 0.2s; }
        .lua-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes luaTypingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        /* Bottom input bar */
        .lua-input-bar {
          flex-shrink: 0;
          padding: 12px 24px 8px;
          border-top: 1px solid var(--color-border);
          background: rgba(8,8,8,0.98);
        }
        .lua-input-inner {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 10px 12px;
          transition: border-color 0.2s;
        }
        .lua-input-inner:focus-within {
          border-color: rgba(255,255,255,0.2);
        }
        .lua-input-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--color-text-primary);
          font-size: 0.78rem;
          resize: none;
          min-height: 22px;
          max-height: 200px;
          line-height: 1.5;
          font-family: inherit;
        }
        .lua-input-textarea::placeholder { color: var(--color-text-muted); }
        .lua-input-send {
          width: 32px; height: 32px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--color-text-secondary);
          transition: all 0.2s;
          flex-shrink: 0;
          font-size: 0.7rem;
        }
        .lua-input-send:hover, .lua-input-send.ready {
          background: var(--color-accent-red);
          border-color: var(--color-accent-red);
          color: white;
        }
        .lua-input-send.ready {
          background: white;
          color: black;
        }
        .lua-input-footer {
          font-size: 0.58rem;
          color: var(--color-text-muted);
          text-align: center;
          margin-top: 8px;
        }
        .lua-input-attach {
          background: transparent;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          font-size: 0.9rem;
          padding: 2px;
          transition: color 0.2s;
        }
        .lua-input-attach:hover { color: white; }

        /* Settings modal */
        .lua-settings-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
          animation: fadeIn 200ms ease;
        }
        .lua-settings-card {
          background: #111113;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          width: 90%;
          max-width: 480px;
          padding: 28px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.6);
          position: relative;
        }
        .lua-settings-title {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-black);
          margin-bottom: 4px;
        }
        .lua-settings-sub {
          font-size: 0.62rem;
          color: var(--color-text-muted);
          margin-bottom: 24px;
        }
        .lua-settings-field { margin-bottom: 18px; }
        .lua-settings-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .lua-settings-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.72rem;
          color: white;
          outline: none;
          box-sizing: border-box;
          font-family: monospace;
          transition: border-color 0.2s;
        }
        .lua-settings-input:focus { border-color: rgba(255,255,255,0.2); }
        .lua-settings-input::placeholder { color: rgba(255,255,255,0.2); }
        .lua-settings-footer {
          display: flex;
          gap: 10px;
          margin-top: 24px;
        }
        .lua-btn-save {
          flex: 1;
          background: #2a2a40;
          color: #9090ff;
          border: none;
          border-radius: 10px;
          padding: 11px;
          font-size: 0.78rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }
        .lua-btn-save:hover { background: #33334f; }
        .lua-btn-cancel {
          background: transparent;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 11px 20px;
          font-size: 0.78rem;
          font-weight: bold;
          cursor: pointer;
        }
        .lua-btn-cancel:hover { color: white; }
      </style>

      <div class="lua-ai-wrapper">

        <!-- Top bar -->
        <div class="lua-ai-topbar">
          <div style="display:flex; align-items:center; gap:12px;">
            <a href="#/tools" style="font-size:0.62rem; color:var(--color-text-muted); text-decoration:none;">🏠 Home</a>
            <span style="font-size:0.62rem; color:var(--color-text-muted);">›</span>
            <a href="#/tools" style="font-size:0.62rem; color:var(--color-text-muted); text-decoration:none;">Tools</a>
            <span style="font-size:0.62rem; color:var(--color-text-muted);">›</span>
            <span style="font-size:0.62rem; color:var(--color-accent-red); font-weight:bold; text-transform:uppercase; letter-spacing:0.04em;">AI Assistant</span>
          </div>
          <button class="lua-settings-btn" onclick="AiAssistantPage.openSettings()">⚙ Settings</button>
        </div>

        <!-- Title row -->
        <div style="padding: 16px 24px 12px; border-bottom: 1px solid var(--color-border); background: rgba(10,10,10,0.5);">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:4px;">
            <div class="lua-ai-badge">AI</div>
            <h1 class="lua-ai-title">Lua Assistant</h1>
          </div>
          <p class="lua-ai-subtitle">Powered by API key kamu sendiri, data tidak disimpan di server</p>
        </div>

        <!-- Model bar -->
        <div class="lua-model-bar">
          ${currentLabel ? `
            <span class="lua-model-bar-provider">${this.models[this.currentProvider].label}:</span>
            <span class="lua-model-bar-name">${this.currentModel.label}</span>
            <span style="color:var(--color-border);">|</span>
          ` : `
            <span style="color:var(--color-text-muted); font-size:0.62rem;">Belum ada model dipilih</span>
            <span style="color:var(--color-border);">|</span>
          `}
          <button class="lua-model-bar-btn" onclick="AiAssistantPage.toggleModelPicker()">
            ↑ ganti model
          </button>
          <div class="lua-files-badge" onclick="document.getElementById('lua-file-attach').click()">
            📁 ${this.attachedFiles.length} files
          </div>
          <input type="file" id="lua-file-attach" style="display:none" accept=".lua,.txt,.json" multiple onchange="AiAssistantPage.attachFile(this.files)">
        </div>

        <!-- Model picker (collapsible) -->
        ${this.showModelPicker ? `
          <div class="lua-model-picker">
            ${Object.entries(this.models).map(([provKey, prov]) => `
              <div class="lua-provider-row">
                <span class="lua-provider-label" style="color: ${prov.color};">${prov.label}</span>
                <div class="lua-model-chips">
                  ${prov.models.map(m => `
                    <button class="lua-model-chip ${this.currentProvider === provKey && this.currentModel?.id === m.id ? 'active' : ''}"
                      onclick="AiAssistantPage.selectModel('${provKey}', '${m.id}')">
                      ${m.label}
                    </button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Chat area -->
        <div class="lua-chat-area" id="lua-chat-area">
          ${this.messages.length === 0 ? `
            <div class="lua-chat-empty">
              <svg class="lua-chat-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
              <p>Tanya apa saja soal Roblox scripting.<br>Kalau sync token diisi, AI bisa baca scripts project kamu.</p>
            </div>
          ` : this.messages.map(m => this.renderMessage(m)).join('')}
          ${this.isTyping ? `
            <div class="lua-msg-ai">
              <div class="lua-msg-ai-header">
                <div class="lua-msg-ai-icon">AI</div>
                <span>${currentLabel || 'AI Assistant'}</span>
              </div>
              <div class="lua-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Input bar -->
        <div class="lua-input-bar">
          <div class="lua-input-inner">
            <button class="lua-input-attach" title="Attach file" onclick="document.getElementById('lua-file-attach').click()">📎</button>
            <textarea class="lua-input-textarea"
              id="lua-chat-input"
              placeholder="Tanya soal scripting... (Enter kirim, Shift+Enter baris baru)"
              rows="1"
              onkeydown="AiAssistantPage.onKeyDown(event)"
              oninput="AiAssistantPage.autoResize(this)"></textarea>
            <button class="lua-input-send" id="lua-send-btn" onclick="AiAssistantPage.sendMessage()">
              ↑
            </button>
          </div>
          <div class="lua-input-footer">API key disimpan di browser kamu (localStorage), tidak dikirim ke server AR Community</div>
        </div>

      </div>

      <!-- Settings Modal -->
      ${this.showSettings ? this.renderSettingsModal() : ''}
    `;

    this.scrollToBottom();
  },

  renderMessage(msg) {
    if (msg.role === 'user') {
      return `<div class="lua-msg-user">${this.escapeHtml(msg.content).replace(/\n/g, '<br>')}</div>`;
    }
    const label = this.getCurrentLabel() || 'AI Assistant';
    return `
      <div class="lua-msg-ai">
        <div class="lua-msg-ai-header">
          <div class="lua-msg-ai-icon">AI</div>
          <span>${label}</span>
        </div>
        <div class="lua-msg-ai-body">${this.formatAIResponse(msg.content)}</div>
      </div>
    `;
  },

  formatAIResponse(text) {
    return text
      .replace(/```lua\n?([\s\S]*?)```/g, '<pre>$1</pre>')
      .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre>$2</pre>')
      .replace(/`([^`]+)`/g, '<code style="background:#1a1a1a;padding:1px 5px;border-radius:3px;font-family:monospace;font-size:0.7rem;">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  },

  escapeHtml(text) {
    return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  },

  renderSettingsModal() {
    return `
      <div class="lua-settings-overlay" onclick="if(event.target===this)AiAssistantPage.closeSettings()">
        <div class="lua-settings-card">
          <div class="lua-settings-title">API Keys</div>
          <div class="lua-settings-sub">Disimpan di localStorage browser kamu. Tidak dikirim ke server AR Community.</div>

          <div class="lua-settings-field">
            <label class="lua-settings-label" style="color:#e17b4f;">Anthropic</label>
            <input class="lua-settings-input" id="key-anthropic" type="password" placeholder="sk-ant-..." value="${this.apiKeys.anthropic}">
          </div>
          <div class="lua-settings-field">
            <label class="lua-settings-label" style="color:#10a37f;">OpenAI</label>
            <input class="lua-settings-input" id="key-openai" type="password" placeholder="sk-..." value="${this.apiKeys.openai}">
          </div>
          <div class="lua-settings-field">
            <label class="lua-settings-label" style="color:#4285f4;">Google</label>
            <input class="lua-settings-input" id="key-google" type="password" placeholder="AIza..." value="${this.apiKeys.google}">
          </div>
          <div class="lua-settings-field">
            <label class="lua-settings-label" style="color:#f55036;">Groq</label>
            <input class="lua-settings-input" id="key-groq" type="password" placeholder="gsk-..." value="${this.apiKeys.groq}">
          </div>
          <div class="lua-settings-field" style="margin-bottom: 0;">
            <label class="lua-settings-label" style="color:#8b5cf6;">OpenRouter</label>
            <input class="lua-settings-input" id="key-openrouter" type="password" placeholder="sk-or-v1-..." value="${this.apiKeys.openrouter}">
          </div>

          <div class="lua-settings-footer">
            <button class="lua-btn-save" onclick="AiAssistantPage.saveSettings()">Simpan</button>
            <button class="lua-btn-cancel" onclick="AiAssistantPage.closeSettings()">Batal</button>
          </div>
        </div>
      </div>
    `;
  },

  openSettings() {
    this.showSettings = true;
    this.render();
  },

  closeSettings() {
    this.showSettings = false;
    this.render();
  },

  saveSettings() {
    this.apiKeys = {
      anthropic:   document.getElementById('key-anthropic')?.value || '',
      openai:      document.getElementById('key-openai')?.value || '',
      google:      document.getElementById('key-google')?.value || '',
      groq:        document.getElementById('key-groq')?.value || '',
      openrouter:  document.getElementById('key-openrouter')?.value || ''
    };
    localStorage.setItem('ai_api_keys', JSON.stringify(this.apiKeys));
    this.showSettings = false;
    this.render();
  },

  toggleModelPicker() {
    this.showModelPicker = !this.showModelPicker;
    this.render();
  },

  selectModel(provider, modelId) {
    this.currentProvider = provider;
    const model = this.models[provider].models.find(m => m.id === modelId);
    this.currentModel = model || null;
    this.showModelPicker = false;
    localStorage.setItem('ai_provider', provider);
    localStorage.setItem('ai_model', modelId);
    this.render();
  },

  attachFile(files) {
    Array.from(files).forEach(f => {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.attachedFiles.push({ name: f.name, content: e.target.result });
        const badge = document.querySelector('.lua-files-badge');
        if (badge) badge.textContent = `📁 ${this.attachedFiles.length} files`;
      };
      reader.readAsText(f);
    });
  },

  onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  },

  autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  },

  async sendMessage() {
    const input = document.getElementById('lua-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    // Check if provider/model selected
    if (!this.currentProvider || !this.currentModel) {
      this.messages.push({ role: 'user', content: text });
      this.messages.push({ role: 'assistant', content: '⚠️ Silakan pilih model terlebih dahulu dengan klik **↑ ganti model** di atas, lalu pilih provider dan model yang tersedia.' });
      this.saveHistory();
      input.value = '';
      this.render();
      return;
    }

    // Check API key
    const key = this.apiKeys[this.currentProvider];
    if (!key) {
      this.messages.push({ role: 'user', content: text });
      this.messages.push({ role: 'assistant', content: `⚠️ API key untuk **${this.models[this.currentProvider].label}** belum diisi. Klik tombol **⚙ Settings** di pojok kanan atas untuk mengisi API key kamu.` });
      this.saveHistory();
      input.value = '';
      this.render();
      return;
    }

    this.messages.push({ role: 'user', content: text });
    input.value = '';
    input.style.height = 'auto';
    this.isTyping = true;
    this.render();

    try {
      const systemPrompt = `Kamu adalah Lua Assistant untuk AR Community, asisten AI yang ahli dalam Roblox Lua scripting. Jawab dalam bahasa Indonesia yang natural dan teknikal. Berikan contoh kode yang lengkap dan bisa langsung dipakai di Roblox Studio. Formatkan kode dalam code block lua.${this.attachedFiles.length > 0 ? '\n\nFile yang di-attach:\n' + this.attachedFiles.map(f => `--- ${f.name} ---\n${f.content}`).join('\n\n') : ''}`;

      const response = await this.callAI(this.currentProvider, this.currentModel.id, key, systemPrompt, text);
      this.messages.push({ role: 'assistant', content: response });
    } catch (err) {
      this.messages.push({ role: 'assistant', content: `❌ Error: ${err.message}\n\nPastikan API key kamu sudah benar dan tidak expired.` });
    }

    this.isTyping = false;
    this.saveHistory();
    this.render();
  },

  async callAI(provider, modelId, key, systemPrompt, userText) {
    const history = this.messages.slice(-10).map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content
    }));

    if (provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'anthropic-dangerous-direct-browser-calls': 'true'
        },
        body: JSON.stringify({
          model: modelId.replace(/-(\d+\.\d+)/, '-$1'),
          max_tokens: 4096,
          system: systemPrompt,
          messages: history
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Anthropic API error');
      return data.content[0].text;

    } else if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: 'system', content: systemPrompt }, ...history]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'OpenAI API error');
      return data.choices[0].message.content;

    } else if (provider === 'google') {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: history.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Google API error');
      return data.candidates[0].content.parts[0].text;

    } else if (provider === 'groq') {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: 'system', content: systemPrompt }, ...history]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Groq API error');
      return data.choices[0].message.content;

    } else if (provider === 'openrouter') {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'AR Community Lua Assistant'
        },
        body: JSON.stringify({
          model: modelId,
          messages: [{ role: 'system', content: systemPrompt }, ...history]
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'OpenRouter API error');
      return data.choices[0].message.content;
    }

    throw new Error('Provider tidak dikenal');
  },

  saveHistory() {
    // Only keep last 50 messages to avoid localStorage bloat
    const trimmed = this.messages.slice(-50);
    localStorage.setItem('ai_chat_history', JSON.stringify(trimmed));
  },

  scrollToBottom() {
    const area = document.getElementById('lua-chat-area');
    if (area) setTimeout(() => area.scrollTop = area.scrollHeight, 80);
  }
};

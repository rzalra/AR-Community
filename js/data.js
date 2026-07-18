/* ========================================
   AR COMMUNITY — Mock Data
   Tools, Store Items, Maps, Stats
   ======================================== */

const APP_DATA = {

  // ── Community Stats ──
  stats: [
    {
      icon: '👥',
      value: '50+',
      label: 'Member Aktif',
      description: 'Komunitas yang terus berkembang'
    },
    {
      icon: '🔧',
      value: '30+',
      label: 'Tools Update Rutin',
      description: 'Alat selalu diperbaharui'
    },
    {
      icon: '⚡',
      value: '24/7',
      label: 'Admin Fast Response',
      description: 'Dukungan cepat kapan saja'
    }
  ],

  // ── Tool Categories ──
  toolCategories: [
    { id: 'all', name: 'Semua', icon: '🔥' },
    { id: 'plugins', name: 'Plugins & EXE', icon: '🧩' },
    { id: 'editor', name: 'Editor', icon: '✏️' },
    { id: 'social', name: 'Sosial', icon: '💬' },
    { id: 'asset', name: 'Asset', icon: '🎨' },
    { id: 'roblox', name: 'Roblox', icon: '🎮' },
    { id: 'audio', name: 'Audio', icon: '🎵' },
    { id: 'ai', name: 'AI Tools', icon: '🤖' }
  ],

  // ── Tools ──
  tools: [
    {
      id: 1,
      name: 'Lua Editor Pro',
      description: 'Editor Lua canggih dengan syntax highlighting, auto-complete, dan debugging tools untuk pengembangan game Roblox.',
      category: 'editor',
      icon: '📝',
      tags: ['Editor', 'Lua', 'Roblox'],
      link: '#/tools/lua-editor',
      docLink: '#',
      featured: true
    },
    {
      id: 2,
      name: 'Skybox Converter',
      description: 'Konversi gambar panorama menjadi skybox 6-sisi yang siap digunakan di game engine manapun.',
      category: 'asset',
      icon: '🌌',
      tags: ['Asset', '3D', 'Skybox'],
      link: '#/tools/skybox-converter',
      docLink: '#',
      featured: true
    },
    {
      id: 3,
      name: 'AI Assistant',
      description: 'Asisten AI berbasis GPT untuk membantu menulis kode, debugging, dan brainstorming ide proyek.',
      category: 'ai',
      icon: '🤖',
      tags: ['AI', 'Assistant', 'Code'],
      link: '#/tools/ai-assistant',
      docLink: '#',
      featured: true
    },
    {
      id: 4,
      name: 'Sound FX Generator',
      description: 'Buat efek suara prosedural untuk game. Mendukung ekspor WAV dan OGG.',
      category: 'audio',
      icon: '🔊',
      tags: ['Audio', 'SFX', 'Generator'],
      link: '#/tools/sound-fx',
      docLink: '#',
      featured: false
    },
    {
      id: 5,
      name: 'Roblox Studio Helper',
      description: 'Plugin lengkap untuk Roblox Studio: terrain generator, UI builder, dan animation toolkit.',
      category: 'roblox',
      icon: '🎮',
      tags: ['Roblox', 'Plugin', 'Studio'],
      link: '#/tools/studio-helper',
      docLink: '#',
      featured: true
    },
    {
      id: 6,
      name: 'Discord Bot Builder',
      description: 'Platform visual untuk membuat bot Discord tanpa coding. Drag & drop command builder.',
      category: 'social',
      icon: '🤖',
      tags: ['Discord', 'Bot', 'No-Code'],
      link: '#/tools/discord-bot',
      docLink: '#',
      featured: false
    },
    {
      id: 7,
      name: 'Texture Pack Studio',
      description: 'Buat dan edit texture pack untuk game. Mendukung PBR materials dan tileable textures.',
      category: 'asset',
      icon: '🎨',
      tags: ['Asset', 'Texture', 'PBR'],
      link: '#/tools/texture-studio',
      docLink: '#',
      featured: false
    },
    {
      id: 8,
      name: 'Script Obfuscator',
      description: 'Lindungi kode Lua Anda dari pembajakan dengan enkripsi dan obfuscation tingkat lanjut.',
      category: 'plugins',
      icon: '🔒',
      tags: ['Security', 'Lua', 'Plugin'],
      link: '#/tools/script-obfuscator',
      docLink: '#',
      featured: false
    },
    {
      id: 9,
      name: 'Map Layout Planner',
      description: 'Tool perencanaan layout map/level 2D. Ekspor ke format yang kompatibel dengan game engine.',
      category: 'editor',
      icon: '🗺️',
      tags: ['Editor', 'Map', 'Planning'],
      link: '#/tools/map-planner',
      docLink: '#',
      featured: true
    },
    {
      id: 10,
      name: 'Auto Publisher',
      description: 'Otomatiskan proses publish game ke platform Roblox. Scheduling dan versioning.',
      category: 'roblox',
      icon: '🚀',
      tags: ['Roblox', 'Automation', 'Deploy'],
      link: '#/tools/auto-publisher',
      docLink: '#',
      featured: false
    },
    {
      id: 11,
      name: 'Music Looper',
      description: 'Tool untuk membuat seamless music loops dari track audio. Perfect untuk background musik game.',
      category: 'audio',
      icon: '🎶',
      tags: ['Audio', 'Music', 'Loop'],
      link: '#/tools/music-looper',
      docLink: '#',
      featured: false
    },
    {
      id: 12,
      name: 'AI Image Generator',
      description: 'Generate asset gambar menggunakan AI. Buat karakter, environment, dan UI elements.',
      category: 'ai',
      icon: '🖼️',
      tags: ['AI', 'Image', 'Generator'],
      link: '#/tools/ai-image-gen',
      docLink: '#',
      featured: true
    },
    {
      id: 13,
      name: 'Bypass Music Copyright',
      description: 'Metode Speed atau Pitch, upload langsung ke Roblox, auto-split, dan Command Bar script otomatis.',
      category: 'audio',
      icon: '🎵',
      tags: ['Audio', 'Music', 'Bypass'],
      link: '#/tools/bypass-music',
      docLink: '#',
      featured: true
    }
  ],

  // ── Store Categories ──
  storeCategories: [
    { id: 'all', name: 'Semua' },
    { id: '3d', name: 'Aset 3D' },
    { id: 'script', name: 'Skrip Lua' },
    { id: 'design', name: 'Layanan Desain' },
    { id: 'template', name: 'Template' },
    { id: 'audio', name: 'Audio Pack' }
  ],

  // ── Store Items ──
  storeItems: [
    {
      id: 1,
      name: 'Medieval Castle Pack',
      description: 'Paket lengkap aset 3D kastil medieval. Termasuk 50+ model, tekstur, dan material siap pakai.',
      category: '3d',
      price: 150000,
      originalPrice: 250000,
      rating: 4.8,
      reviews: 24,
      image: null,
      tags: ['3D', 'Medieval', 'Building'],
      featured: true
    },
    {
      id: 2,
      name: 'Combat System Script',
      description: 'Sistem pertarungan lengkap untuk Roblox: melee, ranged, combo system, dan damage calculation.',
      category: 'script',
      price: 85000,
      originalPrice: null,
      rating: 4.9,
      reviews: 42,
      image: null,
      tags: ['Script', 'Combat', 'Roblox'],
      featured: true
    },
    {
      id: 3,
      name: 'Custom Logo Design',
      description: 'Layanan desain logo custom untuk game atau komunitas Anda. Termasuk 3 revisi.',
      category: 'design',
      price: 200000,
      originalPrice: null,
      rating: 5.0,
      reviews: 18,
      image: null,
      tags: ['Design', 'Logo', 'Custom'],
      featured: false
    },
    {
      id: 4,
      name: 'Sci-Fi Environment Kit',
      description: 'Kit environment sci-fi: panel, koridor, pintu otomatis, lampu neon, dan efek partikel.',
      category: '3d',
      price: 175000,
      originalPrice: 300000,
      rating: 4.7,
      reviews: 31,
      image: null,
      tags: ['3D', 'Sci-Fi', 'Environment'],
      featured: true
    },
    {
      id: 5,
      name: 'Inventory System',
      description: 'Sistem inventory drag-and-drop lengkap. Hotbar, crafting, dan data persistence.',
      category: 'script',
      price: 120000,
      originalPrice: null,
      rating: 4.6,
      reviews: 15,
      image: null,
      tags: ['Script', 'UI', 'System'],
      featured: false
    },
    {
      id: 6,
      name: 'Game UI Template Pack',
      description: 'Paket template UI game: main menu, HUD, settings panel, loading screen. 10+ desain.',
      category: 'template',
      price: 95000,
      originalPrice: 150000,
      rating: 4.5,
      reviews: 28,
      image: null,
      tags: ['Template', 'UI', 'Game'],
      featured: true
    },
    {
      id: 7,
      name: 'Epic Music Collection',
      description: 'Koleksi 20+ musik epik untuk game. Genre: orchestral, electronic, ambient. Royalty-free.',
      category: 'audio',
      price: 65000,
      originalPrice: null,
      rating: 4.8,
      reviews: 22,
      image: null,
      tags: ['Audio', 'Music', 'Royalty-Free'],
      featured: false
    },
    {
      id: 8,
      name: 'Character Animation Pack',
      description: 'Paket 30+ animasi karakter: idle, walk, run, jump, attack, death. Format R15/R6.',
      category: '3d',
      price: 130000,
      originalPrice: 200000,
      rating: 4.9,
      reviews: 35,
      image: null,
      tags: ['3D', 'Animation', 'Character'],
      featured: true
    }
  ],

  // ── Map Status ──
  mapStatuses: [
    { id: 'all', name: 'Semua' },
    { id: 'public', name: 'Public' },
    { id: 'development', name: 'Development' },
    { id: 'archived', name: 'Archived' }
  ],

  // ── Maps ──
  maps: [
    {
      id: 1,
      name: 'Neon City Arena',
      description: 'Arena PvP berlatar kota neon cyberpunk. Fitur: multi-level combat zones, destructible environment, dan dynamic lighting system.',
      status: 'public',
      visits: 15420,
      rating: 4.8,
      version: '2.3.1',
      image: null,
      builders: [
        { name: 'NexGen', role: 'Builder' },
        { name: 'ScriptMaster', role: 'Scripter' },
        { name: 'LightFX', role: 'Lighting' }
      ],
      assets: ['Neon Pack v3', 'Urban Kit', 'Particle FX'],
      lastUpdate: '2026-07-08',
      editorLink: '#'
    },
    {
      id: 2,
      name: 'Fantasy Forest',
      description: 'Hutan fantasi magical dengan pohon raksasa, kristal bercahaya, sungai mengalir, dan creature AI. Perfect untuk RPG adventure.',
      status: 'public',
      visits: 23150,
      rating: 4.9,
      version: '3.1.0',
      image: null,
      builders: [
        { name: 'TreeArts', role: 'Builder' },
        { name: 'NatureFX', role: 'VFX' },
        { name: 'CodeWiz', role: 'Scripter' }
      ],
      assets: ['Nature Pack Pro', 'Crystal Set', 'Water System'],
      lastUpdate: '2026-07-05',
      editorLink: '#'
    },
    {
      id: 3,
      name: 'Space Station Alpha',
      description: 'Stasiun luar angkasa modular dengan area: command center, lab riset, hangar, dan airlock. Gravity system included.',
      status: 'development',
      visits: 8930,
      rating: 4.5,
      version: '1.7.0-beta',
      image: null,
      builders: [
        { name: 'SpaceBuilder', role: 'Builder' },
        { name: 'AstroScript', role: 'Scripter' }
      ],
      assets: ['Sci-Fi Kit', 'Metal Textures', 'Hologram FX'],
      lastUpdate: '2026-07-10',
      editorLink: '#'
    },
    {
      id: 4,
      name: 'Desert Oasis Race Track',
      description: 'Sirkuit balap di padang gurun dengan oasis, piramida, dan terowongan bawah tanah. Time trial mode included.',
      status: 'public',
      visits: 19800,
      rating: 4.7,
      version: '2.0.0',
      image: null,
      builders: [
        { name: 'TrackMaker', role: 'Builder' },
        { name: 'VRoom', role: 'Vehicle Scripter' },
        { name: 'SandFX', role: 'Terrain' }
      ],
      assets: ['Desert Pack', 'Vehicle System', 'Sand Particles'],
      lastUpdate: '2026-07-01',
      editorLink: '#'
    },
    {
      id: 5,
      name: 'Underwater Temple',
      description: 'Kuil bawah laut kuno dengan puzzle, traps, dan boss room. Underwater movement & oxygen system.',
      status: 'development',
      visits: 5670,
      rating: 4.3,
      version: '0.9.5-alpha',
      image: null,
      builders: [
        { name: 'DeepSea', role: 'Builder' },
        { name: 'PuzzleMind', role: 'Scripter' }
      ],
      assets: ['Ocean Kit', 'Ancient Textures', 'Caustics FX'],
      lastUpdate: '2026-07-09',
      editorLink: '#'
    },
    {
      id: 6,
      name: 'Old Town Village',
      description: 'Desa klasik Eropa dengan pasar, gereja, perumahan, dan ladang. NPC system dengan daily routine.',
      status: 'archived',
      visits: 34200,
      rating: 4.6,
      version: '4.0.0',
      image: null,
      builders: [
        { name: 'VillageCraft', role: 'Builder' },
        { name: 'NPC-Pro', role: 'Scripter' },
        { name: 'RetroArt', role: 'Artist' }
      ],
      assets: ['Medieval Village Pack', 'NPC System v2', 'Weather FX'],
      lastUpdate: '2026-03-15',
      editorLink: '#'
    }
  ],

  // ── Banner Items ──
  bannerItems: [
    'JASA WEBSITE',
    'MOBILE APP',
    'DEMO TERSEDIA',
    'FAST RESPONSE',
    'CUSTOM DEVELOPMENT',
    'ROBLOX SCRIPTING',
    'UI/UX DESIGN',
    'GAME ASSETS',
    'DISCORD BOT',
    '24/7 SUPPORT'
  ]
};

// Freeze data to prevent accidental mutation
Object.freeze(APP_DATA);

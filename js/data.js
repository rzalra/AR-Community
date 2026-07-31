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
    },
    {
      id: 14,
      name: 'Audio Converter',
      description: 'Konversi link YouTube menjadi MP3/WAV, atau konversi file audio lokal ke berbagai format pilihan.',
      category: 'audio',
      icon: '🎧',
      tags: ['Audio', 'Converter', 'YouTube'],
      link: '#/tools/audio-converter',
      docLink: '#',
      featured: true
    },
    {
      id: 15,
      name: 'Video Converter & Compressor',
      description: 'Perkecil ukuran file video (compress) atau ubah format video lokal secara langsung di browser.',
      category: 'asset',
      icon: '📹',
      tags: ['Video', 'Converter', 'Compressor'],
      link: '#/tools/video-converter',
      docLink: '#',
      featured: true
    },
    {
      id: 16,
      name: 'Lua Cleaner',
      description: 'Bersihkan dan rapikan script Lua kamu, hapus comment yang tidak perlu, dan perkecil ukuran file script.',
      category: 'editor',
      icon: '🧹',
      tags: ['Editor', 'Lua', 'Format'],
      link: '#/tools/lua-cleaner',
      docLink: '#',
      featured: false
    },
    {
      id: 17,
      name: 'GUI Builder',
      description: 'Rancang UI Roblox secara visual, lalu ekspor desain menjadi format Roblox XML atau kode script Lua.',
      category: 'editor',
      icon: '📐',
      tags: ['Editor', 'UI', 'Design'],
      link: '#/tools/gui-builder',
      docLink: '#',
      featured: true
    },
    {
      id: 18,
      name: 'Bio Link',
      description: 'Buat halaman link bio profil custom premium untuk membagikan semua link media sosial dan portofoliomu.',
      category: 'social',
      icon: '🔗',
      tags: ['Social', 'Profile', 'Bio'],
      link: '#/tools/bio-link',
      docLink: '#',
      featured: false
    },
    {
      id: 19,
      name: 'Discord Channel Styler',
      description: 'Rancang nama channel Discord yang estetik menggunakan font khusus, simbol, dan pembatas teks unik.',
      category: 'social',
      icon: '💬',
      tags: ['Social', 'Discord', 'Style'],
      link: '#/tools/discord-styler',
      docLink: '#',
      featured: false
    },
    {
      id: 20,
      name: 'Skybox Assembler',
      description: 'Gabungkan 6 file gambar sisi terpisah (front, back, up, dll) menjadi satu gambar panorama skybox cubemap.',
      category: 'asset',
      icon: '🧩',
      tags: ['Asset', '3D', 'Skybox'],
      link: '#/tools/skybox-assembler',
      docLink: '#',
      featured: false
    },
    {
      id: 21,
      name: 'Image Uploader',
      description: 'Unggah file gambar kamu secara anonim dan instan, lalu dapatkan link direct hosting secara gratis.',
      category: 'asset',
      icon: '☁️',
      tags: ['Asset', 'Image', 'Upload'],
      link: '#/tools/image-uploader',
      docLink: '#',
      featured: false
    },
    {
      id: 22,
      name: 'Sprite Sheet Generator',
      description: 'Satukan sekumpulan gambar frame terpisah menjadi satu file sprite sheet koordinat atlas.',
      category: 'asset',
      icon: '🎞️',
      tags: ['Asset', '2D', 'Sprite'],
      link: '#/tools/sprite-sheet',
      docLink: '#',
      featured: false
    },
    {
      id: 23,
      name: 'Material Generator',
      description: 'Buat material PBR (Normal Map, Roughness, Height) dari satu file gambar diffuse secara instan.',
      category: 'asset',
      icon: '🧱',
      tags: ['Asset', '3D', 'PBR'],
      link: '#/tools/material-generator',
      docLink: '#',
      featured: true
    },
    {
      id: 24,
      name: 'Font Preview',
      description: 'Uji coba dan lihat pratinjau berbagai Google Fonts populer dengan modifikasi style dan salin kode CSS.',
      category: 'asset',
      icon: '🔤',
      tags: ['Asset', 'Font', 'Preview'],
      link: '#/tools/font-preview',
      docLink: '#',
      featured: false
    },
    {
      id: 25,
      name: 'Color Palette',
      description: 'Rancang skema dan palet warna yang harmonis dari roda warna, lalu ekspor ke HEX, RGB, atau CSS.',
      category: 'asset',
      icon: '🎨',
      tags: ['Asset', 'Color', 'Palette'],
      link: '#/tools/color-palette',
      docLink: '#',
      featured: false
    },
    {
      id: 26,
      name: 'Seamless Maker',
      description: 'Ubah gambar biasa menjadi texture tileable (seamless) yang dapat di-loop tanpa batas sambungan.',
      category: 'asset',
      icon: '🔄',
      tags: ['Asset', 'Texture', 'Seamless'],
      link: '#/tools/seamless-maker',
      docLink: '#',
      featured: false
    },
    {
      id: 27,
      name: 'OBJ Inspector',
      description: 'Unggah file model 3D berekstensi .obj dan lihat pratinjau wireframe secara interaktif di browser.',
      category: 'asset',
      icon: '📦',
      tags: ['Asset', '3D', 'Viewer'],
      link: '#/tools/obj-inspector',
      docLink: '#',
      featured: false
    },
    {
      id: 28,
      name: 'Mesh Decimator',
      description: 'Hitung dan optimalkan jumlah polygon (triangle count) mesh Roblox kamu agar performa game lancar.',
      category: 'asset',
      icon: '📐',
      tags: ['Asset', 'Mesh', 'Optimizer'],
      link: '#/tools/mesh-decimator',
      docLink: '#',
      featured: false
    },
    {
      id: 29,
      name: 'Anim Converter',
      description: 'Konversi data keyframe animasi Roblox ke berbagai format, atau ubah struktur script animasinya.',
      category: 'asset',
      icon: '🏃',
      tags: ['Asset', 'Roblox', 'Animation'],
      link: '#/tools/anim-converter',
      docLink: '#',
      featured: false
    },
    {
      id: 30,
      name: 'Auto Spoof Animasi',
      description: 'Generate script khusus untuk mem-bypass dan mem-publish ulang ID animasi Roblox agar bisa dipakai di game lain.',
      category: 'asset',
      icon: '🎭',
      tags: ['Asset', 'Roblox', 'Animation'],
      link: '#/tools/auto-spoof',
      docLink: '#',
      featured: false
    },
    {
      id: 31,
      name: 'Audio Optimizer',
      description: 'Optimalkan noise latar belakang atau atur sample rate audio kamu agar ukuran file berkurang drastis.',
      category: 'audio',
      icon: '🎧',
      tags: ['Audio', 'Sound', 'Optimize'],
      link: '#/tools/audio-optimizer',
      docLink: '#',
      featured: false
    },
    {
      id: 32,
      name: 'Audio Alter',
      description: 'Ubah pitch, bass boost, atau gunakan equalizer pada audio kamu secara real-time di browser.',
      category: 'audio',
      icon: '🎛️',
      tags: ['Audio', 'Sound', 'Effect'],
      link: '#/tools/audio-alter',
      docLink: '#',
      featured: false
    },
    {
      id: 33,
      name: 'Roblox Info',
      description: 'Cari informasi detail profil Roblox seorang pengguna: status akun, tanggal pembuatan, dan avatar.',
      category: 'roblox',
      icon: 'ℹ️',
      tags: ['Roblox', 'Info', 'User'],
      link: '#/tools/roblox-info',
      docLink: '#',
      featured: false
    },
    {
      id: 34,
      name: 'Game Info',
      description: 'Periksa statistik publik sebuah game Roblox: jumlah kunjungan, favorit, tanggal update, dan pencipta.',
      category: 'roblox',
      icon: '🎮',
      tags: ['Roblox', 'Info', 'Game'],
      link: '#/tools/game-info',
      docLink: '#',
      featured: false
    },
    {
      id: 35,
      name: 'Group Info',
      description: 'Lihat data lengkap grup Roblox: jumlah member, daftar role, dan deskripsi.',
      category: 'roblox',
      icon: '👥',
      tags: ['Roblox', 'Info', 'Group'],
      link: '#/tools/group-info',
      docLink: '#',
      featured: false
    },
    {
      id: 36,
      name: 'Username History',
      description: 'Periksa riwayat pergantian nama pengguna (username) masa lalu sebuah akun Roblox.',
      category: 'roblox',
      icon: '📜',
      tags: ['Roblox', 'Info', 'User'],
      link: '#/tools/username-history',
      docLink: '#',
      featured: false
    },
    {
      id: 37,
      name: 'Server Status',
      description: 'Pantau status server Roblox secara berkala dan uji ping koneksi kamu ke server region regional.',
      category: 'roblox',
      icon: '🖥️',
      tags: ['Roblox', 'Server', 'Ping'],
      link: '#/tools/server-status',
      docLink: '#',
      featured: false
    },
    {
      id: 38,
      name: 'Upscale Image',
      description: 'Perbesar resolusi gambar kamu (Super Resolution) menggunakan filter AI secara tajam.',
      category: 'ai',
      icon: '🔍',
      tags: ['AI', 'Image', 'Upscale'],
      link: '#/tools/upscale-image',
      docLink: '#',
      featured: false
    },
    {
      id: 39,
      name: 'Robux Tax Calculator',
      description: 'Hitung potongan pajak 30% dari penjualan gamepass atau baju di Roblox secara instan.',
      category: 'social',
      icon: '🪙',
      tags: ['Social', 'Robux', 'Tax'],
      link: '#/tools/robux-tax',
      docLink: '#',
      featured: true
    },
    {
      id: 40,
      name: 'Snippet Share',
      description: 'Bagikan potongan kode script kamu ke sesama developer secara instan dan rapi.',
      category: 'editor',
      icon: '✂️',
      tags: ['Editor', 'Share', 'Code'],
      link: '#/tools/snippet-share',
      docLink: '#',
      featured: false
    },
    {
      id: 41,
      name: 'Localization Table Generator',
      description: 'Buat dan susun tabel lokalisasi bahasa game Roblox kamu dalam format CSV yang kompatibel.',
      category: 'roblox',
      icon: '🌐',
      tags: ['Roblox', 'Translation', 'CSV'],
      link: '#/tools/localization',
      docLink: '#',
      featured: false
    },
    {
      id: 42,
      name: 'DS Manager',
      description: 'Kelola data simpanan (DataStore) game Roblox kamu secara visual menggunakan API key Open Cloud.',
      category: 'roblox',
      icon: '🗄️',
      tags: ['Roblox', 'DataStore', 'Manage'],
      link: '#/tools/ds-manager',
      docLink: '#',
      featured: false
    },
    {
      id: 43,
      name: 'DS Key Gen',
      description: 'Generate kunci enkripsi DataStore yang aman untuk mengamankan data pengguna di dalam game.',
      category: 'roblox',
      icon: '🔑',
      tags: ['Roblox', 'DataStore', 'Security'],
      link: '#/tools/ds-keygen',
      docLink: '#',
      featured: false
    },
    {
      id: 44,
      name: 'RBXL Analyzer',
      description: 'Menganalisis file game .rbxl untuk melihat statistik ukuran, jumlah instance part, dan baris kode.',
      category: 'roblox',
      icon: '📊',
      tags: ['Roblox', 'File', 'Analyze'],
      link: '#/tools/rbxl-analyzer',
      docLink: '#',
      featured: false
    },
    {
      id: 45,
      name: 'Script Sync',
      description: 'Sinkronisasikan script game kamu dari editor eksternal (seperti VS Code) langsung ke Roblox Studio.',
      category: 'roblox',
      icon: '🔄',
      tags: ['Roblox', 'Sync', 'Script'],
      link: '#/tools/script-sync',
      docLink: '#',
      featured: false
    },
    {
      id: 46,
      name: 'Script Reference',
      description: 'Daftar dokumentasi API script lengkap dan fungsi bawaan Roblox Lua yang sering digunakan.',
      category: 'editor',
      icon: '📖',
      tags: ['Editor', 'Lua', 'Documentation'],
      link: '#/tools/script-reference',
      docLink: '#',
      featured: false
    },
    {
      id: 47,
      name: 'Image Converter',
      description: 'Konversi format gambar (PNG, JPG, WEBP) secara massal langsung di browser Anda.',
      category: 'asset',
      icon: '🖼️',
      tags: ['Asset', 'Image', 'Converter'],
      link: '#/tools/image-converter',
      docLink: '#',
      featured: true
    }
  ],

  // ── Store Categories ──
  storeCategories: [
    { id: 'all', name: 'Semua' },
    { id: 'kit', name: 'Kit & System' },
    { id: 'animation', name: 'Animasi' },
    { id: 'system', name: 'Sistem' }
  ],

  // ── Store Items ──
  storeItems: [
    {
      id: 1,
      name: 'Club Kit',
      description: 'Paket lengkap Club Kit untuk game Roblox kamu. Termasuk UI, sistem DJ, lighting, efek partikel, dan semua tools club.',
      category: 'kit',
      price: 600000,
      originalPrice: null,
      rating: 4.9,
      reviews: 38,
      image: null,
      tags: ['Kit', 'Club', 'Roblox'],
      featured: true,
      features: ['Full Club UI System', 'DJ Booth & Music Player', 'Dynamic Lighting & VFX', 'Admin Panel & Tools', 'Anti-exploit Protection']
    },
    {
      id: 2,
      name: 'Summit Kit',
      description: 'Kit summit/hangout premium. Lengkap dengan furniture, dekorasi, sistem interaksi, dan custom map template.',
      category: 'kit',
      price: 300000,
      originalPrice: null,
      rating: 4.8,
      reviews: 25,
      image: null,
      tags: ['Kit', 'Summit', 'Hangout'],
      featured: true,
      features: ['Premium Furniture Set', 'Interactive Objects', 'Custom Map Template', 'Ambient Sound System', 'Mobile Optimized']
    },
    {
      id: 3,
      name: 'Saweria System',
      description: 'Sistem integrasi Saweria untuk game Roblox. Terima donasi langsung di dalam game dengan notifikasi real-time.',
      category: 'system',
      price: 100000,
      originalPrice: null,
      rating: 4.7,
      reviews: 19,
      image: null,
      tags: ['System', 'Saweria', 'Donasi'],
      featured: true,
      features: ['Real-time Donation Alert', 'Custom Overlay UI', 'Webhook Integration', 'Top Donator Leaderboard', 'Easy Setup Guide']
    },
    {
      id: 4,
      name: 'Dance Wut Wut',
      description: 'Paket animasi dance lengkap untuk Roblox. 20+ gerakan dance trendy siap pakai di game kamu.',
      category: 'animation',
      price: 100000,
      originalPrice: null,
      rating: 4.6,
      reviews: 31,
      image: null,
      tags: ['Animation', 'Dance', 'Emote'],
      featured: true,
      features: ['20+ Dance Animations', 'R15 & R6 Support', 'Smooth Transitions', 'Emote Wheel UI', 'Easy Import Script']
    },
    {
      id: 5,
      name: 'Overhead System',
      description: 'Sistem overhead/nametag custom untuk Roblox. Tag nama, role, rank, dan badge di atas karakter.',
      category: 'system',
      price: 80000,
      originalPrice: null,
      rating: 4.8,
      reviews: 44,
      image: null,
      tags: ['System', 'Overhead', 'UI'],
      featured: true,
      features: ['Custom Nametag Design', 'Role & Rank Display', 'Badge System', 'Color Gradient Support', 'Admin Configurable']
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
      name: 'District 404',
      description: 'Underground cyberpunk club tersembunyi di bawah kota. No Signal. No Rules. Only Us. Bunker Access Level-4 — tempat berkumpulnya warga kota yang tak ingin dilupakan.',
      status: 'public',
      visits: 968,
      rating: 80,
      version: '1.0.0',
      image: 'assets/map_district404.png',
      robloxLink: '#',
      builders: [
        { name: 'JeyaaChuu', role: 'Owner' },
        { name: 'YuuVanMeijr', role: 'Developer' },
      ],
      assets: ['Neon Sign Pack', 'Cyberpunk Decor Kit', 'Underground Tunnel', 'Rain FX'],
      lastUpdate: '2026-07-15',
      editorLink: '#'
    },
    {
      id: 2,
      name: "D'Konser",
      description: "Satu Konser, Satu Semangat! Stadion konser spektakuler dengan tribun penonton, panggung megah, dan sistem kembang api real-time. Nilai-nilai: Solidaritas, Kebersamaan, Semangat, Respect.",
      status: 'public',
      visits: 415,
      rating: 100,
      version: '1.0.0',
      image: 'assets/map_dkonser.png',
      robloxLink: '#',
      builders: [
        { name: 'JeyaaChuu', role: 'Owner' },
        { name: 'YuuVanMeijr', role: 'Developer' },
      ],
      assets: ['Stadium Mega Pack', 'Crowd System', 'Fireworks FX', 'Lighting Rig'],
      lastUpdate: '2026-07-18',
      editorLink: '#'
    },
    {
      id: 3,
      name: 'Mount Chillyard',
      description: 'Petualangan pendakian gunung fantasi. Checkpoint 20 menanti di puncak. Lanskap oriental yang memukau dengan kuil-kuil kuno, lentera bercahaya, dan pemandangan matahari terbenam yang epik.',
      status: 'Public',
      visits: 4000,
      rating: 80,
      version: '1.0.0',
      image: 'assets/map_chillyard.png',
      robloxLink: '#',
      builders: [
        { name: 'JeyaaChuu', role: 'Owner' },
        { name: 'YuuVanMeijr', role: 'Developer' },
      ],
      assets: ['Oriental Architecture Pack', 'Lantern Set', 'Mountain Terrain', 'Sunset FX'],
      lastUpdate: '2026-07-19',
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

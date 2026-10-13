/**
 * GENERATE INTERACTIVE "COLORS OF THE WORLD" GALLERY HTML
 * Beautiful, responsive, interactive standalone web gallery showcasing all 120 colors
 * with live SVG vector swatch rendering, hex codes, IPA, speech audio, and unit filters.
 */

const fs = require('fs');
const path = require('path');
const { COLOR_CATEGORIES, COLOR_VOCABULARY } = require('./colors_of_the_world_data.js');

const publicColorsDir = path.resolve(__dirname, '../client/public/icons/colors');
const outputHtmlPath = path.resolve(__dirname, '../client/public/colors_gallery.html');

console.log('Generating interactive colors gallery HTML...');

// Prepare words data with embedded SVG
const wordsWithSvg = COLOR_VOCABULARY.map(w => {
  const slug = w.word.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
  const svgPath = path.join(publicColorsDir, `${slug}.svg`);
  let svgContent = '';
  if (fs.existsSync(svgPath)) {
    svgContent = fs.readFileSync(svgPath, 'utf8');
  }
  return {
    ...w,
    svg: svgContent
  };
});

const html = `<!DOCTYPE html>
<html lang="vi" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bách Khoa Sắc Màu Toàn Cầu (Colors of the World) - 120 Sắc Thái & Vector SVG Siêu Chi Tiết</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .svg-container svg {
      width: 100%;
      height: 100%;
      display: block;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .color-card:hover .svg-container svg {
      transform: scale(1.12) rotate(3deg);
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
    .glow-ambient {
      animation: pulseGlow 6s ease-in-out infinite;
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen selection:bg-fuchsia-500 selection:text-white">

  <!-- Ambient background glow lights -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl glow-ambient"></div>
    <div class="absolute top-1/3 -right-40 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl glow-ambient" style="animation-delay: 2s;"></div>
    <div class="absolute -bottom-40 left-1/3 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl glow-ambient" style="animation-delay: 4s;"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

    <!-- HEADER HERO -->
    <header class="relative rounded-3xl border border-fuchsia-500/40 bg-gradient-to-r from-slate-900/90 via-purple-950/40 to-slate-900/90 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl text-center space-y-4">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/50 text-fuchsia-300 text-xs font-black uppercase tracking-wider shadow-sm">
        <span>🎨 CHUYÊN ĐỀ ĐẶC BIỆT • 120 SẮC MÀU THẾ GIỚI • 100% VECTOR SVG CHUẨN XÁC</span>
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
        BÁCH KHOA SẮC MÀU TOÀN CẦU
        <span class="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-rose-400 to-amber-300">
          COLORS OF THE WORLD
        </span>
      </h1>

      <p class="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
        Khám phá bộ sưu tập bách khoa 120 sắc màu toàn diện nhất thế giới: từ đỏ thẫm ruby quý phái, xanh biển sapphire sâu thẳm, ngọc lục bảo emerald, vàng hoàng kim, tử đinh hương, đất nung terracotta, đến các hiện tượng quang học tán sắc ngũ sắc iridescent & neon rực rỡ!
      </p>

      <!-- Stat Badges -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <span class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
          📚 10 Chủ Đề Chuyên Sâu
        </span>
        <span class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
          🎨 120 Sắc Thái Mã Màu HEX
        </span>
        <span class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
          💎 120 Minh Họa Vector Bespoke
        </span>
        <span class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
          🔊 Phát Âm Bản Ngữ 100%
        </span>
      </div>
    </header>

    <!-- CONTROLS & FILTER BAR -->
    <div class="sticky top-4 z-30 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl space-y-3">
      <div class="flex flex-col sm:flex-row items-center gap-3 justify-between">
        <!-- Live Search -->
        <div class="relative w-full sm:w-80">
          <input
            id="searchInput"
            type="text"
            placeholder="🔍 Tìm kiếm sắc màu (crimson, đỏ, #DC143C)..."
            class="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-fuchsia-400 focus:outline-none"
          />
        </div>

        <div class="text-xs font-bold text-slate-400">
          Hiển thị: <span id="counter" class="text-fuchsia-300 font-black">120 / 120</span> Sắc màu
        </div>
      </div>

      <!-- Unit Filter Tabs -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none" id="tabsContainer">
        <button onclick="filterUnit('all')" class="tab-btn px-3 py-1.5 rounded-xl border border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-200 shrink-0 cursor-pointer" data-unit="all">
          🌟 Tất Cả (120)
        </button>
        ${COLOR_CATEGORIES.map(c => `
          <button onclick="filterUnit('${c.id}')" class="tab-btn px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white shrink-0 cursor-pointer transition" data-unit="${c.id}">
            ${c.icon} ${c.name.split(' (')[0]}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- CARDS GRID -->
    <div id="cardsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <!-- Injected by JS -->
    </div>

  </div>

  <!-- TOAST NOTIFICATION -->
  <div id="toast" class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 pointer-events-none px-4 py-2.5 rounded-xl bg-slate-900 border border-fuchsia-500 text-white text-xs font-bold shadow-2xl flex items-center gap-2">
    <span>✅</span>
    <span id="toastMsg">Đã sao chép mã màu!</span>
  </div>

  <script>
    const allWords = ${JSON.stringify(wordsWithSvg)};
    let activeUnit = 'all';
    let searchQuery = '';

    function showToast(msg) {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toastMsg');
      toastMsg.innerText = msg;
      toast.classList.remove('translate-y-20', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 2000);
    }

    function copyHex(hex) {
      navigator.clipboard.writeText(hex);
      showToast('Đã copy mã HEX: ' + hex);
    }

    function speakWord(word) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(word);
        u.lang = 'en-US';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
      }
    }

    function renderCards() {
      const grid = document.getElementById('cardsGrid');
      const query = searchQuery.toLowerCase().trim();

      const filtered = allWords.filter(item => {
        const matchesUnit = activeUnit === 'all' || item.category === activeUnit;
        const matchesQuery = !query || 
          item.word.toLowerCase().includes(query) ||
          item.meaning.toLowerCase().includes(query) ||
          item.hex.toLowerCase().includes(query) ||
          item.ipa.toLowerCase().includes(query);
        return matchesUnit && matchesQuery;
      });

      document.getElementById('counter').innerText = \`\${filtered.length} / \${allWords.length}\`;

      grid.innerHTML = filtered.map(item => \`
        <div class="color-card group relative rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all duration-200 hover:border-slate-600 hover:bg-slate-900 shadow-lg flex flex-col justify-between backdrop-blur-md">
          <!-- Top Row: Category Badge & Speak Button -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
              \${item.category} • \${item.type}
            </span>
            <button onclick="speakWord('\${item.word}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-fuchsia-600 text-slate-300 hover:text-white transition cursor-pointer" title="Nghe phát âm chuẩn">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
            </button>
          </div>

          <!-- Center: Bespoke Vector SVG Icon -->
          <div class="flex flex-col items-center justify-center my-2">
            <div class="svg-container w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center relative cursor-pointer" onclick="speakWord('\${item.word}')">
              \${item.svg}
            </div>
            
            <h3 class="mt-2 text-lg font-black text-white capitalize tracking-tight flex items-center gap-1.5">
              \${item.word}
            </h3>
            
            <div class="text-xs font-mono text-cyan-400 font-semibold">
              \${item.ipa}
            </div>
            
            <div class="text-[11px] font-bold text-slate-400 mt-0.5">
              \${item.vietnamesePhonetic}
            </div>
          </div>

          <!-- Color Swatch & Meaning -->
          <div class="space-y-2 pt-2 border-t border-slate-800/80 mt-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-200">
                \${item.meaning}
              </span>
              <!-- Clickable Hex Badge -->
              <button onclick="copyHex('\${item.hex}')" class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-black border transition cursor-pointer" style="background-color: \${item.hex}22; border-color: \${item.hex}; color: \${item.hex};" title="Click để copy mã HEX">
                <span class="w-2.5 h-2.5 rounded-full inline-block shadow-sm" style="background-color: \${item.hex};"></span>
                \${item.hex}
              </button>
            </div>

            <!-- Example Sentence -->
            <div class="p-2 rounded-xl bg-slate-950/70 border border-slate-800/60 text-[11px] space-y-1">
              <p class="text-slate-300 italic font-medium leading-relaxed">
                "\${item.example}"
              </p>
              <p class="text-slate-400 font-normal">
                \${item.exampleVi}
              </p>
            </div>
          </div>
        </div>
      \`).join('');
    }

    function filterUnit(unitId) {
      activeUnit = unitId;
      document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-unit') === unitId) {
          btn.className = 'tab-btn px-3 py-1.5 rounded-xl border border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-200 shrink-0 cursor-pointer';
        } else {
          btn.className = 'tab-btn px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white shrink-0 cursor-pointer transition';
        }
      });
      renderCards();
    }

    document.getElementById('searchInput').addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderCards();
    });

    renderCards();
  </script>
</body>
</html>
`;

fs.writeFileSync(outputHtmlPath, html, 'utf8');
console.log(`✅ Successfully generated interactive gallery at ${outputHtmlPath}`);

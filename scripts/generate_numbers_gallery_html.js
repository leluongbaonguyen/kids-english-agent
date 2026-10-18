/**
 * GENERATE INTERACTIVE "NUMBERS & ORDINALS OF THE WORLD" GALLERY HTML
 * Beautiful, responsive, interactive standalone web gallery showcasing all 120 numbers & ordinals
 * with live SVG vector rendering, mathematical symbols, IPA, speech audio, and unit filters.
 */

const fs = require('fs');
const path = require('path');
const { NUMBER_CATEGORIES, NUMBER_VOCABULARY } = require('./numbers_of_the_world_data.js');

const publicNumbersDir = path.resolve(__dirname, '../client/public/icons/numbers');
const outputHtmlPath = path.resolve(__dirname, '../client/public/numbers_gallery.html');

console.log('Generating interactive numbers gallery HTML...');

// Prepare words data with embedded SVG
const wordsWithSvg = NUMBER_VOCABULARY.map(w => {
  const slug = w.word.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
  const svgPath = path.join(publicNumbersDir, `${slug}.svg`);
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
  <title>Bách Khoa Số Đếm & Số Thứ Tự Toàn Cầu (Numbers & Ordinals of the World) - 120 Khái Niệm & Vector SVG Siêu Chi Tiết</title>
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
    .number-card:hover .svg-container svg {
      transform: scale(1.12) rotate(2deg);
    }
    @keyframes pulseGlow {
      0%, 100% { opacity: 0.35; }
      50% { opacity: 0.75; }
    }
    .glow-ambient {
      animation: pulseGlow 6s ease-in-out infinite;
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen selection:bg-amber-500 selection:text-slate-950">

  <!-- Ambient background glow lights -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl glow-ambient"></div>
    <div class="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl glow-ambient" style="animation-delay: 2s;"></div>
    <div class="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl glow-ambient" style="animation-delay: 4s;"></div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

    <!-- HEADER HERO -->
    <header class="relative rounded-3xl border border-amber-500/40 bg-gradient-to-r from-slate-900/90 via-amber-950/30 to-slate-900/90 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl text-center space-y-4">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider shadow-sm">
        <span>🔢 CHUYÊN ĐỀ ĐẶC BIỆT • 120 SỐ ĐẾM & SỐ THỨ TỰ TOÀN CẦU • 100% VECTOR SVG CHUẨN XÁC</span>
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
        BÁCH KHOA SỐ ĐẾM & SỐ THỨ TỰ
        <span class="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400">
          NUMBERS & ORDINALS OF THE WORLD
        </span>
      </h1>

      <p class="max-w-3xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
        Hệ thống bách khoa toàn thư số học 120 từ vựng tiếng Anh chuyên sâu: từ số đếm cơ bản 0–11, tuổi teen 12–20, hàng chục & đại số vô cực (million, billion, trillion, infinity), số thứ tự 1st–12th & 13th–100th, phân số & tỷ lệ (half, quarter, ratio), bội số (single, double, triple), đơn vị đếm tập hợp (dozen, score, gross, century) đến hệ chữ số La Mã cổ điển (I, V, X, L, C, D, M)!
      </p>

      <!-- Stat Badges -->
      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <span class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
          📚 10 Chủ Đề Chuyên Sâu
        </span>
        <span class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
          🔢 120 Khái Niệm Ký Số & Ký Hiệu
        </span>
        <span class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
          💎 120 Minh Họa Vector Bespoke
        </span>
        <span class="px-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-bold">
          🔊 Phát Âm Bản Ngữ (Web Speech)
        </span>
      </div>
    </header>

    <!-- SEARCH & CONTROLS -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
      <div class="relative w-full sm:w-96">
        <input type="text" id="searchInput" placeholder="Tìm kiếm theo từ, nghĩa, IPA, ký hiệu (vd: third, tỷ, 1st, 1/2)..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition" />
        <svg class="w-5 h-5 absolute left-3 top-3 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <div class="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <span>Hiển thị:</span>
        <span id="resultCount" class="text-amber-400 font-bold font-mono">120</span>
        <span>/ 120 khái niệm số học</span>
      </div>
    </div>

    <!-- CATEGORY FILTER TABS -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin text-xs font-bold">
      <button onclick="filterUnit('ALL')" data-unit="ALL" class="tab-btn px-4 py-2 rounded-xl border border-amber-400 bg-amber-500/20 text-amber-200 shrink-0 cursor-pointer shadow-sm">
        🌟 Tất Cả (120 Số Học)
      </button>
      ${NUMBER_CATEGORIES.map(c => `
      <button onclick="filterUnit('${c.id}')" data-unit="${c.id}" class="tab-btn px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white shrink-0 cursor-pointer transition">
        ${c.icon} Unit ${c.unit}: ${c.name.split(' (')[0]}
      </button>
      `).join('')}
    </div>

    <!-- NUMBERS GRID -->
    <div id="numbersGrid" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <!-- Cards rendered via JS -->
    </div>

    <!-- FOOTER -->
    <footer class="pt-8 pb-12 border-t border-slate-800 text-center text-xs text-slate-400 space-y-2">
      <p class="font-bold text-slate-300">
        Hệ Thống Bách Khoa Toàn Thư Tiếng Anh Trẻ Em & Tiểu Học - Kids English Agent
      </p>
      <p>
        1,402 Từ Vựng Hệ Thống Chuẩn Quốc Tế • Phân Hệ Số Đếm & Số Thứ Tự Toàn Cầu (Level NUM)
      </p>
    </footer>

  </div>

  <script>
    const numbersData = ${JSON.stringify(wordsWithSvg)};
    let activeUnit = 'ALL';
    let searchQuery = '';

    function speakWord(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    }

    function renderCards() {
      const container = document.getElementById('numbersGrid');
      const q = searchQuery.toLowerCase().trim();

      const filtered = numbersData.filter(item => {
        const matchesUnit = (activeUnit === 'ALL' || item.category === activeUnit);
        const matchesQuery = !q || 
          item.word.toLowerCase().includes(q) || 
          item.meaning.toLowerCase().includes(q) || 
          item.ipa.toLowerCase().includes(q) ||
          item.vietnamesePhonetic.toLowerCase().includes(q) ||
          (item.symbol && item.symbol.toLowerCase().includes(q));
        return matchesUnit && matchesQuery;
      });

      document.getElementById('resultCount').textContent = filtered.length;

      if (filtered.length === 0) {
        container.innerHTML = \`
          <div class="col-span-full py-16 text-center text-slate-400 space-y-3">
            <div class="text-5xl">🔍</div>
            <p class="text-base font-bold text-slate-300">Không tìm thấy khái niệm số học phù hợp.</p>
            <p class="text-xs text-slate-400">Hãy thử nhập từ khác như "first", "million", "half", "dozen", "roman"...</p>
          </div>
        \`;
        return;
      }

      container.innerHTML = filtered.map(item => \`
        <div class="number-card group relative rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-400/70 p-4 transition duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-950/30">
          
          <!-- Top Row: Category Badge & Speak Button -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
              \${item.category} • \${item.type}
            </span>
            <button onclick="speakWord('\${item.word}')" class="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 transition cursor-pointer" title="Nghe phát âm chuẩn">
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

          <!-- Symbol Badge & Meaning -->
          <div class="space-y-2 pt-2 border-t border-slate-800/80 mt-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-200">
                \${item.meaning}
              </span>
              <!-- Symbol Badge -->
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-black border border-amber-500/50 bg-amber-500/10 text-amber-300 shadow-sm" title="Ký hiệu số học">
                \${item.symbol || '🔢'}
              </span>
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
          btn.className = 'tab-btn px-4 py-2 rounded-xl border border-amber-400 bg-amber-500/20 text-amber-200 shrink-0 cursor-pointer shadow-sm';
        } else {
          btn.className = 'tab-btn px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-white shrink-0 cursor-pointer transition';
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

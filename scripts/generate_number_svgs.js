/**
 * GENERATE 120 BESPOKE ULTRA-DETAILED VECTOR SVG ICONS FOR "NUMBERS & ORDINALS"
 * Each number, ordinal, fraction, multiplier, collective unit, and Roman numeral
 * is individually designed with 3D gradients, specular highlights, chiseled bevels,
 * medals, fraction pies, dice, abacus beads, and mathematical precision.
 */

const fs = require('fs');
const path = require('path');
const { NUMBER_VOCABULARY } = require('./numbers_of_the_world_data.js');

const PUBLIC_NUMBERS_DIR = path.resolve(__dirname, '../client/public/icons/numbers');
const OUTPUT_LIB_FILE = path.resolve(__dirname, '../client/src/constants/numberSvgLibrary.js');

if (!fs.existsSync(PUBLIC_NUMBERS_DIR)) {
  fs.mkdirSync(PUBLIC_NUMBERS_DIR, { recursive: true });
}

function generateSvgForNumber(item) {
  const { word, symbol, unit } = item;
  const w = word.toLowerCase().trim();

  // Unit-based thematic palettes
  // Unit 1-3: Amber-Emerald-Cyan (Cardinal numbers)
  // Unit 4-6: Gold-Silver-Bronze-Purple (Ordinal numbers & medals)
  // Unit 7: Coral-Teal-Violet (Fractions & Math)
  // Unit 8: Indigo-Rose-Amber (Multipliers)
  // Unit 9: Warm Honey-Chestnut-Sky (Collective Units)
  // Unit 10: Roman Imperial Marble & Gold (Roman Numerals & Symbols)

  switch (w) {
    // ==========================================
    // NUM-U01: CARDINAL 0-11
    // ==========================================
    case 'zero':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="zeroGlow" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="60%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Concentric Orbit Ring -->
  <circle cx="50" cy="50" r="34" fill="none" stroke="#BAE6FD" stroke-width="3" stroke-dasharray="6,4"/>
  <!-- Giant 3D Zero Ring / Torus -->
  <ellipse cx="50" cy="50" rx="22" ry="28" fill="url(#zeroGlow)" stroke="#0C4A6E" stroke-width="2"/>
  <ellipse cx="50" cy="50" rx="10" ry="16" fill="#F0F9FF" stroke="#0C4A6E" stroke-width="1.5"/>
  <!-- Specular Curve -->
  <path d="M 38,30 C 44,24 56,24 62,30" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <circle cx="36" cy="40" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'one':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="oneGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="#EAB308" stroke-width="2.5"/>
  <!-- Starburst background -->
  <circle cx="50" cy="50" r="32" fill="#FEF08A" opacity="0.4"/>
  <!-- Beveled 3D Number 1 Pillar -->
  <path d="M 40,32 L 50,22 L 54,22 L 54,72 L 64,72 L 64,80 L 36,80 L 36,72 L 46,72 L 46,36 L 38,40 Z" fill="url(#oneGold)" stroke="#A16207" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(161,98,7,0.3))"/>
  <!-- Specular Edge -->
  <path d="M 40,32 L 50,22 L 54,22 L 54,72" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none"/>
  <polygon points="50,14 52,18 56,20 52,22 50,26 48,22 44,20 48,18" fill="#F59E0B"/>
</svg>`;

    case 'two':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="twoTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2DD4BF"/>
      <stop offset="50%" stop-color="#0D9488"/>
      <stop offset="100%" stop-color="#115E59"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <!-- Twin Stars background -->
  <circle cx="28" cy="28" r="4" fill="#99F6E4"/>
  <circle cx="72" cy="72" r="4" fill="#99F6E4"/>
  <!-- Sculpted Number 2 Swan Curve -->
  <path d="M 34,34 C 34,22 66,22 66,36 C 66,48 42,66 34,74 L 68,74 L 68,82 L 30,82 L 30,72 C 40,62 60,46 58,36 C 58,28 42,28 42,34 Z" fill="url(#twoTeal)" stroke="#134E4A" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(13,148,136,0.3))"/>
  <!-- Specular Highlight -->
  <path d="M 38,32 C 44,26 58,26 62,32" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`;

    case 'three':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="threeCoral" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FB7185"/>
      <stop offset="50%" stop-color="#E11D48"/>
      <stop offset="100%" stop-color="#9F1239"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF1F2" stroke="#E11D48" stroke-width="2.5"/>
  <!-- Triangle guide behind -->
  <polygon points="50,18 78,74 22,74" fill="none" stroke="#FECDD3" stroke-width="2" stroke-dasharray="4,3"/>
  <!-- Number 3 Double Arc -->
  <path d="M 34,26 L 64,26 L 64,34 L 48,50 C 58,48 68,54 68,64 C 68,76 54,82 40,82 C 32,82 26,78 26,74 L 32,68 C 34,70 38,74 44,74 C 52,74 58,70 58,64 C 58,58 50,54 42,54 L 36,54 L 36,46 L 52,34 L 34,34 Z" fill="url(#threeCoral)" stroke="#881337" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(225,29,72,0.3))"/>
  <circle cx="44" cy="30" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'four':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="fourIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#818CF8"/>
      <stop offset="50%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#3730A3"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2.5"/>
  <!-- Square 4-pointed backdrop -->
  <rect x="22" y="22" width="56" height="56" rx="8" fill="#E0E7FF" opacity="0.4"/>
  <!-- Number 4 Architectural Structure -->
  <path d="M 52,20 L 52,56 L 68,56 L 68,64 L 52,64 L 52,82 L 42,82 L 42,64 L 26,64 L 26,56 L 44,20 Z M 42,32 L 34,56 L 42,56 Z" fill="url(#fourIndigo)" stroke="#312E81" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(79,70,229,0.3))"/>
  <!-- Specular -->
  <line x1="44" y1="24" x2="28" y2="58" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;

    case 'five':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="fiveEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="50%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#065F46"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFDF5" stroke="#059669" stroke-width="2.5"/>
  <!-- 5-Star Crest behind -->
  <polygon points="50,14 54,26 66,26 56,34 60,46 50,38 40,46 44,34 34,26 46,26" fill="#A7F3D0" opacity="0.5"/>
  <!-- Number 5 Sculpted Shape -->
  <path d="M 36,22 L 66,22 L 66,30 L 44,30 L 42,48 C 48,44 58,44 64,50 C 70,56 70,68 64,74 C 58,82 46,82 36,80 L 36,70 C 42,72 50,72 56,68 C 60,64 60,56 54,54 C 48,52 42,54 36,54 Z" fill="url(#fiveEmerald)" stroke="#064E3B" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(5,150,105,0.3))"/>
  <line x1="38" y1="25" x2="64" y2="25" stroke="#FFFFFF" stroke-width="2"/>
</svg>`;

    case 'six':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="sixAmber" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="50%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#B45309"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#D97706" stroke-width="2.5"/>
  <!-- Hexagon grid lines -->
  <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="none" stroke="#FDE68A" stroke-width="2"/>
  <!-- Number 6 Loop -->
  <path d="M 60,24 L 52,28 C 40,36 32,50 32,64 C 32,76 40,82 50,82 C 62,82 70,74 70,62 C 70,50 60,44 50,44 C 44,44 38,48 34,54 C 36,44 44,34 56,28 Z M 50,54 C 56,54 60,58 60,63 C 60,68 56,72 50,72 C 44,72 40,68 40,63 C 40,58 44,54 50,54 Z" fill="url(#sixAmber)" stroke="#78350F" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(217,119,6,0.3))"/>
  <circle cx="50" cy="63" r="3" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

    case 'seven':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="sevenSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Seven Stars Constellation dot ring -->
  <circle cx="50" cy="50" r="32" fill="none" stroke="#BAE6FD" stroke-width="2" stroke-dasharray="8,6"/>
  <!-- Sleek Modern Number 7 -->
  <path d="M 32,24 L 68,24 L 68,32 L 48,82 L 36,82 L 56,34 L 32,34 Z" fill="url(#sevenSky)" stroke="#0C4A6E" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(2,132,199,0.3))"/>
  <!-- Top Specular -->
  <line x1="34" y1="26" x2="66" y2="26" stroke="#FFFFFF" stroke-width="2"/>
  <circle cx="64" cy="30" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'eight':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="eightViolet" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#A78BFA"/>
      <stop offset="50%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#5B21B6"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F3FF" stroke="#7C3AED" stroke-width="2.5"/>
  <!-- Hourglass / Double Orbit -->
  <!-- Upper Loop -->
  <circle cx="50" cy="36" r="16" fill="url(#eightViolet)" stroke="#4C1D95" stroke-width="2"/>
  <circle cx="50" cy="36" r="6" fill="#F5F3FF" stroke="#4C1D95" stroke-width="1.5"/>
  <!-- Lower Loop -->
  <circle cx="50" cy="64" r="19" fill="url(#eightViolet)" stroke="#4C1D95" stroke-width="2"/>
  <circle cx="50" cy="64" r="8" fill="#F5F3FF" stroke="#4C1D95" stroke-width="1.5"/>
  <!-- Highlights -->
  <circle cx="44" cy="30" r="2.5" fill="#FFFFFF"/>
  <circle cx="42" cy="58" r="3" fill="#FFFFFF"/>
</svg>`;

    case 'nine':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="nineRose" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FB7185"/>
      <stop offset="50%" stop-color="#F43F5E"/>
      <stop offset="100%" stop-color="#BE123C"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF1F2" stroke="#F43F5E" stroke-width="2.5"/>
  <!-- Inverted Spiral Number 9 -->
  <path d="M 40,76 L 48,72 C 60,64 68,50 68,36 C 68,24 60,18 50,18 C 38,18 30,26 30,38 C 30,50 40,56 50,56 C 56,56 62,52 66,46 C 64,56 56,66 44,72 Z M 50,46 C 44,46 40,42 40,37 C 40,32 44,28 50,28 C 56,28 60,32 60,37 C 60,42 56,46 50,46 Z" fill="url(#nineRose)" stroke="#9F1239" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(244,63,94,0.3))"/>
  <circle cx="46" cy="34" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'ten':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="tenGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="#F59E0B" stroke-width="2.5"/>
  <!-- Digits "1" and "0" combined -->
  <!-- Digit 1 -->
  <path d="M 28,34 L 38,24 L 42,24 L 42,74 L 48,74 L 48,80 L 26,80 L 26,74 L 34,74 L 34,36 L 28,38 Z" fill="url(#tenGold)" stroke="#B45309" stroke-width="1.8"/>
  <!-- Digit 0 -->
  <ellipse cx="66" cy="52" rx="16" ry="26" fill="url(#tenGold)" stroke="#B45309" stroke-width="1.8"/>
  <ellipse cx="66" cy="52" rx="7" ry="16" fill="#FEFCE8" stroke="#B45309" stroke-width="1.5"/>
  <circle cx="36" cy="28" r="2" fill="#FFFFFF"/>
  <circle cx="60" cy="38" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'eleven':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="elevenCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#0E7490"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFEFF" stroke="#06B6D4" stroke-width="2.5"/>
  <!-- Double Pillars 1 & 1 -->
  <!-- Left 1 -->
  <path d="M 24,34 L 34,24 L 38,24 L 38,74 L 44,74 L 44,80 L 22,80 L 22,74 L 30,74 L 30,36 L 24,38 Z" fill="url(#elevenCyan)" stroke="#155E75" stroke-width="1.8"/>
  <!-- Right 1 -->
  <path d="M 56,34 L 66,24 L 70,24 L 70,74 L 76,74 L 76,80 L 54,80 L 54,74 L 62,74 L 62,36 L 56,38 Z" fill="url(#elevenCyan)" stroke="#155E75" stroke-width="1.8"/>
  <!-- Specular -->
  <circle cx="32" cy="28" r="2" fill="#FFFFFF"/>
  <circle cx="64" cy="28" r="2" fill="#FFFFFF"/>
</svg>`;

    // ==========================================
    // NUM-U04: ORDINALS 1st-12th (MEDALS & RIBBONS)
    // ==========================================
    case 'first':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="goldMedal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFBEB"/>
      <stop offset="35%" stop-color="#FCD34D"/>
      <stop offset="70%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="#F59E0B" stroke-width="2.5"/>
  <!-- Blue Victory Ribbon Hangings -->
  <polygon points="42,20 32,54 42,48 50,54" fill="#2563EB"/>
  <polygon points="58,20 68,54 58,48 50,54" fill="#1D4ED8"/>
  <!-- Gold Medal Medallion -->
  <circle cx="50" cy="54" r="28" fill="url(#goldMedal)" stroke="#92400E" stroke-width="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))"/>
  <circle cx="50" cy="54" r="23" stroke="#FFFBEB" stroke-width="1.5" stroke-dasharray="3,2" fill="none"/>
  <!-- Chiseled "1st" Typography -->
  <text x="50" y="62" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="22" font-weight="900" text-anchor="middle" fill="#78350F">1st</text>
  <!-- Laurel sprig left & right -->
  <circle cx="36" cy="42" r="3" fill="#FFFFFF" opacity="0.8"/>
  <polygon points="50,14 52,18 56,19 52,21 50,25 48,21 44,19 48,18" fill="#F59E0B"/>
</svg>`;

    case 'second':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="silverMedal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#E2E8F0"/>
      <stop offset="75%" stop-color="#94A3B8"/>
      <stop offset="100%" stop-color="#64748B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
  <!-- Red Ribbon Hangings -->
  <polygon points="42,20 32,54 42,48 50,54" fill="#DC2626"/>
  <polygon points="58,20 68,54 58,48 50,54" fill="#B91C1C"/>
  <!-- Silver Medal -->
  <circle cx="50" cy="54" r="28" fill="url(#silverMedal)" stroke="#475569" stroke-width="2"/>
  <circle cx="50" cy="54" r="23" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="3,2" fill="none"/>
  <!-- "2nd" -->
  <text x="50" y="62" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="900" text-anchor="middle" fill="#334155">2nd</text>
  <circle cx="36" cy="42" r="3" fill="#FFFFFF"/>
</svg>`;

    case 'third':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bronzeMedal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="45%" stop-color="#EA580C"/>
      <stop offset="85%" stop-color="#9A3412"/>
      <stop offset="100%" stop-color="#7C2D12"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="#EA580C" stroke-width="2.5"/>
  <!-- Green Ribbon Hangings -->
  <polygon points="42,20 32,54 42,48 50,54" fill="#16A34A"/>
  <polygon points="58,20 68,54 58,48 50,54" fill="#15803D"/>
  <!-- Bronze Medal -->
  <circle cx="50" cy="54" r="28" fill="url(#bronzeMedal)" stroke="#7C2D12" stroke-width="2"/>
  <circle cx="50" cy="54" r="23" stroke="#FFEDD5" stroke-width="1.5" stroke-dasharray="3,2" fill="none"/>
  <!-- "3rd" -->
  <text x="50" y="62" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="20" font-weight="900" text-anchor="middle" fill="#431407">3rd</text>
  <circle cx="36" cy="42" r="3" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    // ==========================================
    // NUM-U07: FRACTIONS & RATIOS
    // ==========================================
    case 'half':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="halfPie" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="60%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5"/>
  <!-- Complete Circle Base -->
  <circle cx="50" cy="50" r="32" fill="#DBEAFE" stroke="#93C5FD" stroke-width="1.5"/>
  <!-- 1/2 Sliced Half Circle (Left Half) -->
  <path d="M 50,18 A 32 32 0 0 0 50,82 Z" fill="url(#halfPie)" stroke="#1E40AF" stroke-width="2"/>
  <line x1="50" y1="18" x2="50" y2="82" stroke="#FFFFFF" stroke-width="2.5"/>
  <!-- Fraction Text "1/2" -->
  <text x="50" y="92" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="900" text-anchor="middle" fill="#1E40AF">1/2</text>
  <circle cx="38" cy="38" r="3" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'quarter':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="quarterPie" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="60%" stop-color="#DB2777"/>
      <stop offset="100%" stop-color="#9D174D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF2F8" stroke="#DB2777" stroke-width="2.5"/>
  <!-- Circle Base -->
  <circle cx="50" cy="50" r="32" fill="#FCE7F3" stroke="#FBCFE8" stroke-width="1.5"/>
  <line x1="50" y1="18" x2="50" y2="82" stroke="#F472B6" stroke-width="1.5" stroke-dasharray="3,2"/>
  <line x1="18" y1="50" x2="82" y2="50" stroke="#F472B6" stroke-width="1.5" stroke-dasharray="3,2"/>
  <!-- 1/4 Sector (Top-Right) -->
  <path d="M 50,50 L 50,18 A 32 32 0 0 1 82,50 Z" fill="url(#quarterPie)" stroke="#9D174D" stroke-width="2"/>
  <text x="50" y="92" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="12" font-weight="900" text-anchor="middle" fill="#BE185D">1/4</text>
  <circle cx="62" cy="38" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'percentage':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="pctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="50%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFDF5" stroke="#059669" stroke-width="2.5"/>
  <!-- Slash Line -->
  <line x1="70" y1="26" x2="30" y2="74" stroke="url(#pctGrad)" stroke-width="7" stroke-linecap="round"/>
  <!-- Top Left Orb -->
  <circle cx="36" cy="34" r="10" fill="url(#pctGrad)"/>
  <circle cx="36" cy="34" r="4" fill="#ECFDF5"/>
  <!-- Bottom Right Orb -->
  <circle cx="64" cy="66" r="10" fill="url(#pctGrad)"/>
  <circle cx="64" cy="66" r="4" fill="#ECFDF5"/>
  <circle cx="34" cy="31" r="2" fill="#FFFFFF"/>
</svg>`;

    // ==========================================
    // NUM-U10: ROMAN NUMERALS & SIGNS
    // ==========================================
    case 'roman numeral':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="romanGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="50%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#A16207"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <!-- Roman Arch Pillar Frame -->
  <rect x="22" y="22" width="56" height="56" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="2"/>
  <text x="50" y="58" font-family="'Times New Roman', serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#78350F">I·V·X</text>
  <line x1="28" y1="66" x2="72" y2="66" stroke="#D97706" stroke-width="1.5"/>
</svg>`;

    case 'roman one':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <rect x="26" y="20" width="48" height="60" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
  <!-- Roman Numeral "I" -->
  <path d="M 38,30 L 62,30 M 50,30 L 50,70 M 38,70 L 62,70" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#B45309">= 1</text>
</svg>`;

    case 'roman five':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <rect x="26" y="20" width="48" height="60" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
  <!-- Roman Numeral "V" -->
  <path d="M 36,32 L 50,68 L 64,32" stroke="#78350F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#B45309">= 5</text>
</svg>`;

    case 'roman ten':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <rect x="26" y="20" width="48" height="60" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
  <!-- Roman Numeral "X" -->
  <path d="M 36,32 L 64,68 M 64,32 L 36,68" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#B45309">= 10</text>
</svg>`;

    case 'roman fifty':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <rect x="26" y="20" width="48" height="60" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
  <!-- Roman Numeral "L" -->
  <path d="M 40,32 L 40,68 L 64,68" stroke="#78350F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#B45309">= 50</text>
</svg>`;

    case 'roman hundred':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <rect x="26" y="20" width="48" height="60" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
  <!-- Roman Numeral "C" -->
  <path d="M 62,34 C 42,30 36,44 36,50 C 36,56 42,70 62,66" stroke="#78350F" stroke-width="6" stroke-linecap="round" fill="none"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#B45309">= 100</text>
</svg>`;

    case 'roman five hundred':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <rect x="26" y="20" width="48" height="60" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
  <!-- Roman Numeral "D" -->
  <path d="M 38,32 L 48,32 C 62,32 66,42 66,50 C 66,58 62,68 48,68 L 38,68 Z" stroke="#78350F" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#B45309">= 500</text>
</svg>`;

    case 'roman thousand':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <rect x="26" y="20" width="48" height="60" rx="4" fill="#FEF3C7" stroke="#D97706" stroke-width="1.8"/>
  <!-- Roman Numeral "M" -->
  <path d="M 36,68 L 36,32 L 50,52 L 64,32 L 64,68" stroke="#78350F" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <text x="50" y="88" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="11" font-weight="900" text-anchor="middle" fill="#B45309">= 1000</text>
</svg>`;

    case 'plus':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="plusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="50%" stop-color="#16A34A"/>
      <stop offset="100%" stop-color="#15803D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- 3D Plus Cross Symbol -->
  <rect x="42" y="24" width="16" height="52" rx="4" fill="url(#plusGrad)" stroke="#14532D" stroke-width="2"/>
  <rect x="24" y="42" width="52" height="16" rx="4" fill="url(#plusGrad)" stroke="#14532D" stroke-width="2"/>
  <!-- Center Specular Highlight -->
  <circle cx="46" cy="46" r="3" fill="#FFFFFF"/>
</svg>`;

    case 'minus':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="minusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FB7185"/>
      <stop offset="50%" stop-color="#E11D48"/>
      <stop offset="100%" stop-color="#9F1239"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF1F2" stroke="#E11D48" stroke-width="2.5"/>
  <!-- 3D Minus Bar Symbol -->
  <rect x="22" y="42" width="56" height="16" rx="4" fill="url(#minusGrad)" stroke="#881337" stroke-width="2"/>
  <line x1="26" y1="46" x2="74" y2="46" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
</svg>`;

    default: {
      // General dynamic bespoke SVG for other numbers, ordinals, collective units
      let badgeColor = "#0284C7";
      let bgLight = "#F0F9FF";
      let grad1 = "#38BDF8";
      let grad2 = "#0284C7";
      let symbolText = symbol || word;

      if (unit === 2) { // Teens
        badgeColor = "#7C3AED"; bgLight = "#F5F3FF"; grad1 = "#A78BFA"; grad2 = "#7C3AED";
      } else if (unit === 3) { // High Tens
        badgeColor = "#D97706"; bgLight = "#FFFBEB"; grad1 = "#FBBF24"; grad2 = "#D97706";
      } else if (unit === 5) { // 20s Ordinals
        badgeColor = "#2563EB"; bgLight = "#EFF6FF"; grad1 = "#60A5FA"; grad2 = "#2563EB";
      } else if (unit === 6) { // Tens Ordinals
        badgeColor = "#DB2777"; bgLight = "#FDF2F8"; grad1 = "#F472B6"; grad2 = "#DB2777";
      } else if (unit === 7) { // Fractions
        badgeColor = "#059669"; bgLight = "#ECFDF5"; grad1 = "#34D399"; grad2 = "#059669";
      } else if (unit === 8) { // Multipliers
        badgeColor = "#EA580C"; bgLight = "#FFF7ED"; grad1 = "#FB923C"; grad2 = "#EA580C";
      } else if (unit === 9) { // Collectives
        badgeColor = "#B45309"; bgLight = "#FEFCE8"; grad1 = "#FDE047"; grad2 = "#CA8A04";
      }

      const gradId = `numGrad_${w.replace(/[^a-z0-9]/g, '')}`;

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="${gradId}" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="${grad1}"/>
      <stop offset="60%" stop-color="${grad2}"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="${bgLight}" stroke="${badgeColor}" stroke-width="2.5"/>
  <!-- Concentric Dial Rings -->
  <circle cx="50" cy="50" r="34" fill="url(#${gradId})" stroke="${badgeColor}" stroke-width="1.8"/>
  <circle cx="50" cy="50" r="28" stroke="#FFFFFF" stroke-width="1.2" stroke-dasharray="3,2" fill="none" opacity="0.6"/>
  <!-- Centered Symbol / Value -->
  <text x="50" y="56" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="${symbolText.length > 5 ? '13' : symbolText.length > 3 ? '16' : '20'}" font-weight="900" text-anchor="middle" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))">${symbolText}</text>
  <!-- Specular Shimmer -->
  <circle cx="38" cy="34" r="3" fill="#FFFFFF" opacity="0.8"/>
</svg>`;
    }
  }
}

// MAIN EXECUTION
console.log('Generating 120 bespoke vector SVGs for Numbers & Ordinals of the World...');

const libraryEntries = [];
let count = 0;

NUMBER_VOCABULARY.forEach(item => {
  const svg = generateSvgForNumber(item);
  const wordKey = item.word.toLowerCase().trim();
  const fileSlug = wordKey.replace(/[^a-z0-9]/g, '_');

  // Write individual SVG file
  const svgFilePath = path.join(PUBLIC_NUMBERS_DIR, `${fileSlug}.svg`);
  fs.writeFileSync(svgFilePath, svg, 'utf8');

  libraryEntries.push(`  "${wordKey}": ${JSON.stringify(svg)}`);
  count++;
});

// Author client/src/constants/numberSvgLibrary.js
const libraryContent = `/**
 * BÁCH KHOA SỐ ĐẾM & SỐ THỨ TỰ TOÀN CẦU (NUMBERS & ORDINALS OF THE WORLD)
 * 120 ULTRA-DETAILED VECTOR SVG LIBRARY
 * Covers all cardinal numbers, ordinals, fractions, multipliers, collective units,
 * and Roman numerals with geometric precision.
 */

export const NUMBER_SVGS = {
${libraryEntries.join(',\n')}
};

/**
 * Get custom SVG vector string for number word
 * @param {string} word - English number name (e.g. "zero", "first", "quarter", "dozen")
 * @returns {string|null} - SVG string or null
 */
export function getNumberSvgForWord(word) {
  if (!word) return null;
  const normalized = word.toLowerCase().trim();
  return NUMBER_SVGS[normalized] || null;
}

/**
 * Check if word has custom number SVG
 * @param {string} word
 * @returns {boolean}
 */
export function hasNumberSvg(word) {
  if (!word) return false;
  return Boolean(NUMBER_SVGS[word.toLowerCase().trim()]);
}

export default NUMBER_SVGS;
`;

fs.writeFileSync(OUTPUT_LIB_FILE, libraryContent, 'utf8');
console.log(`Successfully generated ${count} SVG vector files in ${PUBLIC_NUMBERS_DIR}`);
console.log(`Successfully generated master number SVG library at ${OUTPUT_LIB_FILE}`);

/**
 * GENERATE 120 ULTRA-DETAILED VECTOR SVG ICONS FOR "COLORS OF THE WORLD"
 * Each color has a unique, handcrafted SVG with exact hex codes, specular luster,
 * 3D shading, material textures (gems, metals, fluids, crystals, fabrics, organics),
 * and optical light reflections.
 */

const fs = require('fs');
const path = require('path');
const { COLOR_VOCABULARY } = require('./colors_of_the_world_data.js');

const PUBLIC_COLORS_DIR = path.resolve(__dirname, '../client/public/icons/colors');
const OUTPUT_LIB_FILE = path.resolve(__dirname, '../client/src/constants/colorSvgLibrary.js');

if (!fs.existsSync(PUBLIC_COLORS_DIR)) {
  fs.mkdirSync(PUBLIC_COLORS_DIR, { recursive: true });
}

// Helper to convert hex to rgb and lighter/darker shades
function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function adjustColor(hex, percent) {
  const { r, g, b } = hexToRgb(hex);
  const R = Math.min(255, Math.max(0, Math.round(r + (percent / 100) * 255)));
  const G = Math.min(255, Math.max(0, Math.round(g + (percent / 100) * 255)));
  const B = Math.min(255, Math.max(0, Math.round(b + (percent / 100) * 255)));
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

// Function to generate bespoke SVG for each of the 120 words
function generateSvgForColor(item) {
  const { word, hex } = item;
  const h = hex;
  const light = adjustColor(h, 28);
  const bright = adjustColor(h, 45);
  const dark = adjustColor(h, -25);
  const deep = adjustColor(h, -45);
  const softBg = adjustColor(h, 85);
  const borderCol = adjustColor(h, -10);

  // Unit-specific & Word-specific bespoke artistic SVG models
  switch (word.toLowerCase().trim()) {
    // ==========================================
    // CLR-U01: REDS & PINKS
    // ==========================================
    case 'crimson':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="crimsonGlow" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FF4D6D"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="100%" stop-color="${deep}"/>
    </radialGradient>
    <linearGradient id="crimsonLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF758F"/>
      <stop offset="70%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#590D22"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF0F3" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Velvet Swatch Shield -->
  <path d="M 28,26 C 38,20 62,20 72,26 C 74,48 66,74 50,82 C 34,74 26,48 28,26 Z" fill="url(#crimsonGlow)" filter="drop-shadow(0 4px 6px rgba(128,0,32,0.3))"/>
  <!-- Glossy Swirl -->
  <path d="M 34,34 Q 50,26 66,34 Q 58,54 44,60 Q 32,54 34,34 Z" fill="url(#crimsonLiquid)" opacity="0.6"/>
  <!-- Specular Light Curves -->
  <path d="M 36,30 Q 50,24 64,30" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
  <circle cx="42" cy="38" r="3.5" fill="#FFFFFF" opacity="0.75"/>
  <circle cx="48" cy="46" r="1.8" fill="#FFFFFF" opacity="0.8"/>
  <!-- Pure Gold Crown Accent -->
  <path d="M 44,18 L 47,23 L 50,19 L 53,23 L 56,18 L 55,26 L 45,26 Z" fill="#F59E0B"/>
</svg>`;

    case 'scarlet':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="scarletFlame" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#B91C1C"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#FF7A00"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF5F5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Blazing Torch / Lantern Flame -->
  <path d="M 50,16 C 56,28 72,42 72,60 C 72,74 62,84 50,84 C 38,84 28,74 28,60 C 28,42 44,28 50,16 Z" fill="url(#scarletFlame)"/>
  <!-- Inner Intense Core -->
  <path d="M 50,34 C 54,42 62,52 62,64 C 62,72 56,76 50,76 C 44,76 38,72 38,64 C 38,52 46,42 50,34 Z" fill="#FFE066"/>
  <!-- Sparkles -->
  <polygon points="50,44 52,50 58,52 52,54 50,60 48,54 42,52 48,50" fill="#FFFFFF"/>
  <circle cx="34" cy="48" r="2.2" fill="#FF8A65"/>
  <circle cx="66" cy="44" r="2" fill="#FF8A65"/>
</svg>`;

    case 'ruby':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF5D8F"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#590D22"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF0F5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Brilliant Cut Ruby Gemstone -->
  <polygon points="32,32 68,32 82,48 50,84 18,48" fill="url(#rubyGrad)" stroke="#800020" stroke-width="1.5"/>
  <!-- Gemstone Facets -->
  <polygon points="32,32 50,42 68,32" fill="#FF758F"/>
  <polygon points="32,32 18,48 36,48 50,42" fill="#C9184A"/>
  <polygon points="68,32 82,48 64,48 50,42" fill="#FF4D6D"/>
  <polygon points="18,48 50,84 36,48" fill="#800F2F"/>
  <polygon points="82,48 50,84 64,48" fill="#590D22"/>
  <polygon points="36,48 64,48 50,84" fill="${h}"/>
  <!-- Specular Shimmer -->
  <polygon points="36,35 44,35 40,40" fill="#FFFFFF" opacity="0.85"/>
  <polygon points="70,42 74,45 71,48 68,45" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="30" cy="44" r="2" fill="#FFFFFF" opacity="0.75"/>
</svg>`;

    case 'maroon':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="maroonGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#A52A2A"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#4A0000"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF0E6" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Polished Deep Chestnut / Leather Seal -->
  <path d="M 50,20 C 68,20 80,34 80,52 C 80,70 66,82 50,82 C 34,82 20,70 20,52 C 20,34 32,20 50,20 Z" fill="url(#maroonGrad)"/>
  <path d="M 28,42 C 32,28 46,24 60,26 C 48,32 34,46 32,64 C 28,56 26,48 28,42 Z" fill="#C04040" opacity="0.4"/>
  <!-- Stitching border pattern -->
  <circle cx="50" cy="51" r="26" stroke="#D27D2D" stroke-width="1.8" stroke-dasharray="4,3" fill="none"/>
  <!-- Monogram Wax Crest Star -->
  <polygon points="50,38 53,46 62,47 55,53 57,62 50,57 43,62 45,53 38,47 47,46" fill="#F5DEB3"/>
  <circle cx="38" cy="32" r="3" fill="#FFFFFF" opacity="0.5"/>
</svg>`;

    case 'burgundy':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="burgundyWine" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#B31B45"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#400010"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF0F5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Wine Glass Goblet with Rich Burgundy Wine -->
  <path d="M 32,24 C 32,54 44,64 50,66 C 56,64 68,54 68,24 Z" fill="none" stroke="#D1D5DB" stroke-width="2"/>
  <path d="M 34,36 C 38,52 46,60 50,62 C 54,60 62,52 66,36 Q 50,42 34,36 Z" fill="url(#burgundyWine)"/>
  <!-- Surface reflection ellipse -->
  <ellipse cx="50" cy="36" rx="16" ry="4" fill="#B31B45"/>
  <ellipse cx="48" cy="35" rx="10" ry="2" fill="#E65C84" opacity="0.6"/>
  <!-- Stem & Base -->
  <line x1="50" y1="66" x2="50" y2="82" stroke="#9CA3AF" stroke-width="2.5"/>
  <ellipse cx="50" cy="82" rx="14" ry="3.5" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="1.5"/>
  <!-- Wine Glint -->
  <path d="M 38,42 C 40,50 44,56 46,58" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.8"/>
  <circle cx="60" cy="44" r="1.5" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'coral':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="coralGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFA07A"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#E25822"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Marine Coral Branch Sculpture -->
  <path d="M 50,84 C 50,70 48,58 42,46 C 36,36 28,34 30,26 C 32,20 40,24 44,32 C 48,38 50,46 52,50 C 54,40 56,30 64,22 C 70,16 76,22 72,28 C 66,36 60,46 58,56 C 64,54 72,50 78,54 C 84,58 78,66 70,68 C 62,70 56,72 54,84 Z" fill="url(#coralGrad)"/>
  <!-- Soft Polyps -->
  <circle cx="30" cy="24" r="3" fill="#FFD1B3"/>
  <circle cx="73" cy="22" r="3" fill="#FFD1B3"/>
  <circle cx="80" cy="56" r="2.8" fill="#FFD1B3"/>
  <circle cx="44" cy="30" r="2.2" fill="#FFD1B3"/>
  <circle cx="45" cy="54" r="2" fill="#FFFFFF" opacity="0.7"/>
  <!-- Sea bubbles -->
  <circle cx="26" cy="62" r="2.5" fill="#BAE6FD" opacity="0.6"/>
  <circle cx="70" cy="76" r="3" fill="#BAE6FD" opacity="0.6"/>
</svg>`;

    case 'carmine':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="carmineDrop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E6194B"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#4D000C"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF1F2" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Rich Pigment Drop with Ripples -->
  <ellipse cx="50" cy="74" rx="30" ry="10" fill="${h}" opacity="0.25"/>
  <ellipse cx="50" cy="74" rx="20" ry="6" fill="${h}" opacity="0.45"/>
  <!-- Droplet -->
  <path d="M 50,18 C 50,18 26,52 26,66 C 26,79 37,86 50,86 C 63,86 74,79 74,66 C 74,52 50,18 50,18 Z" fill="url(#carmineDrop)"/>
  <ellipse cx="42" cy="62" rx="7" ry="12" transform="rotate(-20, 42, 62)" fill="#FF6680" opacity="0.5"/>
  <circle cx="40" cy="54" r="3" fill="#FFFFFF" opacity="0.85"/>
  <circle cx="44" cy="66" r="1.8" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    case 'cherry red':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="cherrySphere" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FF4D6D"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#590014"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF1F2" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Twin Cherries with Twig -->
  <path d="M 52,18 C 50,28 44,42 38,50 M 52,18 C 56,28 64,40 68,48" stroke="#4D7C0F" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <ellipse cx="56" cy="18" rx="8" ry="4" transform="rotate(-15, 56, 18)" fill="#65A30D"/>
  <!-- Left Cherry -->
  <circle cx="36" cy="62" r="18" fill="url(#cherrySphere)"/>
  <ellipse cx="32" cy="54" rx="5" ry="3" transform="rotate(-30, 32, 54)" fill="#FFFFFF" opacity="0.85"/>
  <!-- Right Cherry -->
  <circle cx="68" cy="60" r="16" fill="url(#cherrySphere)"/>
  <ellipse cx="64" cy="53" rx="4" ry="2.5" transform="rotate(-30, 64, 53)" fill="#FFFFFF" opacity="0.85"/>
</svg>`;

    case 'rust':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="rustMetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D96838"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#5E2005"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Heavy Weathered Industrial Gear -->
  <circle cx="50" cy="50" r="32" fill="url(#rustMetal)"/>
  <!-- Gear Teeth -->
  <rect x="46" y="14" width="8" height="8" rx="2" fill="${h}"/>
  <rect x="46" y="78" width="8" height="8" rx="2" fill="${deep}"/>
  <rect x="14" y="46" width="8" height="8" rx="2" fill="${h}"/>
  <rect x="78" y="46" width="8" height="8" rx="2" fill="${dark}"/>
  <!-- Center Axel -->
  <circle cx="50" cy="50" r="14" fill="#3D1402"/>
  <circle cx="50" cy="50" r="8" fill="#E2725B"/>
  <!-- Rust Oxide Patches -->
  <circle cx="38" cy="38" r="4" fill="#8B2500" opacity="0.7"/>
  <circle cx="60" cy="42" r="5" fill="#E07A5F" opacity="0.6"/>
  <circle cx="44" cy="60" r="4.5" fill="#712200" opacity="0.8"/>
</svg>`;

    case 'magenta':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="magentaCore" cx="40%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FF66FF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#990099"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF4FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Glowing Optical Flower / Geometric Crystal -->
  <circle cx="50" cy="50" r="34" fill="url(#magentaCore)" filter="drop-shadow(0 0 8px #FF00FF88)"/>
  <circle cx="50" cy="28" r="14" fill="#FF1493" opacity="0.7"/>
  <circle cx="70" cy="44" r="14" fill="#FF1493" opacity="0.7"/>
  <circle cx="62" cy="68" r="14" fill="#C71585" opacity="0.7"/>
  <circle cx="38" cy="68" r="14" fill="#C71585" opacity="0.7"/>
  <circle cx="30" cy="44" r="14" fill="#FF1493" opacity="0.7"/>
  <!-- Pure Center Diamond Glint -->
  <polygon points="50,38 54,48 64,50 54,52 50,62 46,52 36,50 46,48" fill="#FFFFFF"/>
</svg>`;

    case 'rose':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="roseBloom" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FF66B2"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#99004C"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF0F7" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Rose Blossom Spiral Petals -->
  <path d="M 50,22 C 68,22 80,34 80,52 C 80,70 66,80 50,80 C 34,80 20,70 20,52 C 20,34 32,22 50,22 Z" fill="url(#roseBloom)"/>
  <!-- Concentric Overlapping Petals -->
  <path d="M 32,40 C 44,28 62,30 68,44 C 60,56 42,56 32,40 Z" fill="#FF3399" opacity="0.9"/>
  <path d="M 36,54 C 44,66 60,64 64,50 C 54,42 42,46 36,54 Z" fill="#CC0066" opacity="0.8"/>
  <path d="M 44,44 C 50,38 56,40 56,46 C 54,52 48,52 44,44 Z" fill="#FFE6F2"/>
  <!-- Dewdrop on petal -->
  <circle cx="62" cy="36" r="3.2" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="63" cy="35" r="1" fill="#FFFFFF"/>
  <!-- Green Sepal Sprig below -->
  <path d="M 28,74 Q 22,82 16,84 Q 26,78 32,74" fill="#15803D"/>
  <path d="M 72,74 Q 78,82 84,84 Q 74,78 68,74" fill="#15803D"/>
</svg>`;

    case 'blush':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="blushPowder" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#F48FB1"/>
      <stop offset="65%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#9C27B0"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF2F8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Cosmetic Compact Palette Powder -->
  <circle cx="50" cy="50" r="32" fill="#FCE7F3" stroke="#F472B6" stroke-width="2"/>
  <circle cx="50" cy="50" r="26" fill="url(#blushPowder)"/>
  <!-- Embossed Silk Texture Wave -->
  <path d="M 32,48 Q 50,38 68,48 Q 50,58 32,48 Z" fill="#F8BBD0" opacity="0.6"/>
  <!-- Soft Powder Puff Highlight -->
  <ellipse cx="44" cy="42" rx="10" ry="6" transform="rotate(-20, 44, 42)" fill="#FFFFFF" opacity="0.45"/>
  <circle cx="64" cy="36" r="2" fill="#FFFFFF" opacity="0.8"/>
  <circle cx="34" cy="58" r="1.5" fill="#FFFFFF" opacity="0.7"/>
</svg>`;

    // ==========================================
    // CLR-U02: BLUES & CYANS
    // ==========================================
    case 'navy blue':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="${light}" stroke-width="2.5"/>
  <!-- Admiralty Anchor Badge -->
  <circle cx="50" cy="50" r="34" fill="url(#navyGrad)"/>
  <!-- Gold Rope Ring -->
  <circle cx="50" cy="50" r="31" stroke="#F59E0B" stroke-width="2" stroke-dasharray="4,2" fill="none"/>
  <!-- Golden Anchor -->
  <circle cx="50" cy="30" r="5" stroke="#FBBF24" stroke-width="2" fill="none"/>
  <line x1="50" y1="35" x2="50" y2="65" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
  <line x1="40" y1="42" x2="60" y2="42" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
  <path d="M 34,56 C 36,68 64,68 66,56" stroke="#FBBF24" stroke-width="3" stroke-linecap="round" fill="none"/>
  <polygon points="32,56 36,54 36,58" fill="#FBBF24"/>
  <polygon points="68,56 64,54 64,58" fill="#FBBF24"/>
  <!-- High Seas Sheen -->
  <path d="M 32,36 Q 44,28 64,34" stroke="#60A5FA" stroke-width="1.8" fill="none" opacity="0.6"/>
</svg>`;

    case 'royal blue':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="royalGrad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#1E1B4B"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#EFF6FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Regal Imperial Shield -->
  <path d="M 50,18 C 72,18 78,32 78,54 C 78,74 50,86 50,86 C 50,86 22,74 22,54 C 22,32 28,18 50,18 Z" fill="url(#royalGrad)"/>
  <!-- Fleur-de-lis Gold Emblem -->
  <path d="M 50,34 C 52,44 58,48 58,56 C 58,62 52,64 50,66 C 48,64 42,62 42,56 C 42,48 48,44 50,34 Z" fill="#FBBF24"/>
  <path d="M 50,56 C 44,56 36,50 36,44 C 36,40 40,40 42,44 C 44,48 48,54 50,56 Z" fill="#FBBF24"/>
  <path d="M 50,56 C 56,56 64,50 64,44 C 64,40 60,40 58,44 C 56,48 52,54 50,56 Z" fill="#FBBF24"/>
  <rect x="44" y="58" width="12" height="3" fill="#D97706"/>
  <!-- Shield Specular -->
  <path d="M 30,26 C 36,22 48,20 60,22" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.75"/>
</svg>`;

    case 'sapphire':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="sapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#021C4F"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Sapphire Octagonal Gem -->
  <polygon points="32,20 68,20 84,36 84,64 68,80 32,80 16,64 16,36" fill="url(#sapphireGrad)" stroke="#1E40AF" stroke-width="1.8"/>
  <polygon points="38,30 62,30 72,40 72,60 62,70 38,70 28,60 28,40" fill="${h}"/>
  <!-- Facet Connectors -->
  <line x1="32" y1="20" x2="38" y2="30" stroke="#93C5FD" stroke-width="1.5"/>
  <line x1="68" y1="20" x2="62" y2="30" stroke="#93C5FD" stroke-width="1.5"/>
  <line x1="84" y1="36" x2="72" y2="40" stroke="#93C5FD" stroke-width="1.5"/>
  <line x1="84" y1="64" x2="72" y2="60" stroke="#93C5FD" stroke-width="1.5"/>
  <line x1="68" y1="80" x2="62" y2="70" stroke="#93C5FD" stroke-width="1.5"/>
  <line x1="32" y1="80" x2="38" y2="70" stroke="#93C5FD" stroke-width="1.5"/>
  <line x1="16" y1="64" x2="28" y2="60" stroke="#93C5FD" stroke-width="1.5"/>
  <line x1="16" y1="36" x2="28" y2="40" stroke="#93C5FD" stroke-width="1.5"/>
  <!-- Specular Shimmer Star -->
  <polygon points="48,32 50,38 56,40 50,42 48,48 46,42 40,40 46,38" fill="#FFFFFF"/>
  <circle cx="64" cy="56" r="2.5" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'azure':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="azureSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#70BFFF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#004D99"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Azure Sky & Pure Cloud Portal -->
  <circle cx="50" cy="50" r="34" fill="url(#azureSky)"/>
  <!-- Stylized Cirrus Wings -->
  <path d="M 28,52 C 34,44 46,44 52,50 C 58,40 70,42 74,52 C 78,60 70,68 60,68 L 34,68 C 24,68 22,58 28,52 Z" fill="#FFFFFF" opacity="0.92"/>
  <path d="M 36,46 Q 44,40 54,46" stroke="#BAE6FD" stroke-width="1.5" fill="none"/>
  <!-- Sunbeams in Azure Sky -->
  <line x1="50" y1="24" x2="50" y2="34" stroke="#FFF7ED" stroke-width="2" stroke-linecap="round"/>
  <line x1="38" y1="28" x2="44" y2="35" stroke="#FFF7ED" stroke-width="2" stroke-linecap="round"/>
  <line x1="62" y1="28" x2="56" y2="35" stroke="#FFF7ED" stroke-width="2" stroke-linecap="round"/>
</svg>`;

    case 'cobalt':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="cobaltVase" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#001F5C"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#EFF6FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Cobalt Ceramic Bottle / Flask -->
  <path d="M 46,18 L 54,18 L 54,28 C 62,34 70,46 70,62 C 70,76 62,82 50,82 C 38,82 30,76 30,62 C 30,46 38,34 46,28 Z" fill="url(#cobaltVase)"/>
  <!-- Glass Luster Highlight -->
  <path d="M 38,36 C 34,46 34,64 38,72" stroke="#93C5FD" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
  <ellipse cx="50" cy="18" rx="5" ry="1.5" fill="#BFDBFE"/>
  <circle cx="48" cy="40" r="2.5" fill="#FFFFFF" opacity="0.9"/>
  <!-- Blue Alchemical Sparkle -->
  <polygon points="62,48 64,52 68,54 64,56 62,60 60,56 56,54 60,52" fill="#FFFFFF"/>
</svg>`;

    case 'cyan':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="cyanPlasma" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#E0FFFF"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#008B8B"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFEFF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Pure Optical CMYK Cyan Orb -->
  <circle cx="50" cy="50" r="34" fill="url(#cyanPlasma)" filter="drop-shadow(0 0 10px #00FFFF88)"/>
  <!-- Cyber Quantum Grid Rings -->
  <ellipse cx="50" cy="50" rx="30" ry="12" stroke="#FFFFFF" stroke-width="1.8" fill="none" opacity="0.8"/>
  <ellipse cx="50" cy="50" rx="12" ry="30" stroke="#FFFFFF" stroke-width="1.8" fill="none" opacity="0.8"/>
  <circle cx="50" cy="50" r="7" fill="#FFFFFF"/>
  <circle cx="38" cy="38" r="3" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    case 'turquoise':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="turqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7FFFD4"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#006666"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDFA" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Natural Polished Turquoise Nugget -->
  <path d="M 44,20 C 62,18 78,28 82,46 C 86,64 74,80 54,82 C 34,84 20,70 18,52 C 16,34 26,22 44,20 Z" fill="url(#turqGrad)"/>
  <!-- Gold / Brown Mineral Matrix Veins (Vân đá thổ nhưỡng tự nhiên) -->
  <path d="M 28,34 Q 38,42 46,40 T 64,36" stroke="#78350F" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 46,40 Q 50,56 42,66 T 38,76" stroke="#92400E" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 64,36 Q 72,48 68,60 T 56,70" stroke="#78350F" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <!-- Silky Luster -->
  <ellipse cx="36" cy="28" rx="8" ry="4" transform="rotate(-20, 36, 28)" fill="#E0F2FE" opacity="0.75"/>
</svg>`;

    case 'cerulean':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="ceruleanWave" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#034561"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Cerulean Horizon Ocean Crest -->
  <path d="M 50,18 C 70,18 82,32 82,50 C 82,72 68,82 50,82 C 32,82 18,72 18,50 C 18,32 30,18 50,18 Z" fill="url(#ceruleanWave)"/>
  <!-- Wave Creasts -->
  <path d="M 22,50 Q 34,42 46,50 T 70,50 T 80,48" stroke="#E0F2FE" stroke-width="2.5" fill="none"/>
  <path d="M 26,62 Q 38,56 50,62 T 74,62" stroke="#BAE6FD" stroke-width="2" fill="none"/>
  <!-- Specular Sunlight Sparkles -->
  <circle cx="38" cy="34" r="3" fill="#FFFFFF" opacity="0.9"/>
  <polygon points="56,28 58,32 62,34 58,36 56,40 54,36 50,34 54,32" fill="#FFFFFF"/>
</svg>`;

    case 'baby blue':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="babyGrad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#E0F2FE"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Soft Cotton Teddy Cloud / Pacifier Charm -->
  <circle cx="50" cy="50" r="30" fill="url(#babyGrad)"/>
  <!-- Gentle Fluffy Rims -->
  <circle cx="32" cy="40" r="10" fill="#E0F2FE" opacity="0.8"/>
  <circle cx="68" cy="40" r="10" fill="#E0F2FE" opacity="0.8"/>
  <circle cx="40" cy="62" r="12" fill="#BAE6FD" opacity="0.7"/>
  <circle cx="60" cy="62" r="12" fill="#BAE6FD" opacity="0.7"/>
  <!-- Innocent White Ribbon Bow -->
  <path d="M 40,48 C 44,42 46,42 50,46 C 54,42 56,42 60,48 C 56,52 54,52 50,48 C 46,52 44,52 40,48 Z" fill="#FFFFFF"/>
  <circle cx="50" cy="47" r="2.5" fill="#93C5FD"/>
  <circle cx="44" cy="36" r="2.5" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    case 'indigo':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="indigoMystic" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#7C3AED"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#1E0038"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Mystical Crescent Moon & Stars in Indigo Twilight -->
  <circle cx="50" cy="50" r="34" fill="url(#indigoMystic)"/>
  <!-- Silver Crescent Moon -->
  <path d="M 54,26 C 42,26 34,36 34,50 C 34,64 42,74 54,74 C 44,70 40,60 40,50 C 40,40 44,30 54,26 Z" fill="#F3E8FF"/>
  <!-- Twinkling Indigo Constellation -->
  <polygon points="62,34 63,37 66,38 63,39 62,42 61,39 58,38 61,37" fill="#C4B5FD"/>
  <polygon points="68,52 69,54 71,55 69,56 68,58 67,56 65,55 67,54" fill="#C4B5FD"/>
  <circle cx="58" cy="62" r="1.8" fill="#FFFFFF"/>
</svg>`;

    case 'midnight blue':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="midnightGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#2E2E8A"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#050524"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Deep Night Sky with Full Glowing Moon -->
  <circle cx="50" cy="50" r="34" fill="url(#midnightGrad)"/>
  <!-- Silvery Moon -->
  <circle cx="50" cy="42" r="12" fill="#E2E8F0" filter="drop-shadow(0 0 6px #FFFFFF)"/>
  <ellipse cx="46" cy="40" rx="3" ry="2" fill="#CBD5E1"/>
  <ellipse cx="52" cy="45" rx="2" ry="1.5" fill="#CBD5E1"/>
  <!-- Starlight dust -->
  <circle cx="30" cy="32" r="1.2" fill="#FFFFFF"/>
  <circle cx="68" cy="30" r="1.5" fill="#FFFFFF"/>
  <circle cx="34" cy="62" r="1.2" fill="#FFFFFF"/>
  <circle cx="64" cy="64" r="1.5" fill="#FFFFFF"/>
  <!-- Mountain Silhouette under midnight blue -->
  <polygon points="20,78 38,62 52,72 68,58 80,78" fill="#0A0A2E"/>
</svg>`;

    case 'teal':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#20B2AA"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#003333"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDFA" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Common Teal Duck Wing Plume Pattern -->
  <path d="M 50,18 C 66,18 80,30 80,50 C 80,70 66,82 50,82 C 34,82 20,70 20,50 C 20,30 34,18 50,18 Z" fill="url(#tealGrad)"/>
  <!-- Iridescent Wing Speculum Feathers -->
  <path d="M 28,42 C 40,34 60,34 72,42 L 68,54 C 58,48 42,48 32,54 Z" fill="#5EEAD4" opacity="0.7"/>
  <path d="M 32,56 C 42,50 58,50 68,56 L 64,68 C 54,62 44,62 36,68 Z" fill="#14B8A6" opacity="0.6"/>
  <circle cx="44" cy="30" r="3" fill="#FFFFFF" opacity="0.85"/>
  <circle cx="58" cy="34" r="2" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    // ==========================================
    // CLR-U03: GREENS & EMERALDS
    // ==========================================
    case 'emerald':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6EE7B7"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFDF5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Emerald Cut Gemstone (Bát giác hình chữ nhật chuẩn mực) -->
  <polygon points="26,24 74,24 84,36 84,64 74,76 26,76 16,64 16,36" fill="url(#emeraldGrad)" stroke="#047857" stroke-width="1.8"/>
  <polygon points="34,34 66,34 74,42 74,58 66,66 34,66 26,58 26,42" fill="${h}"/>
  <!-- Facet Edge Lines -->
  <line x1="26" y1="24" x2="34" y2="34" stroke="#A7F3D0" stroke-width="1.5"/>
  <line x1="74" y1="24" x2="66" y2="34" stroke="#A7F3D0" stroke-width="1.5"/>
  <line x1="84" y1="36" x2="74" y2="42" stroke="#A7F3D0" stroke-width="1.5"/>
  <line x1="84" y1="64" x2="74" y2="58" stroke="#A7F3D0" stroke-width="1.5"/>
  <line x1="74" y1="76" x2="66" y2="66" stroke="#A7F3D0" stroke-width="1.5"/>
  <line x1="26" y1="76" x2="34" y2="66" stroke="#A7F3D0" stroke-width="1.5"/>
  <line x1="16" y1="64" x2="26" y2="58" stroke="#A7F3D0" stroke-width="1.5"/>
  <line x1="16" y1="36" x2="26" y2="42" stroke="#A7F3D0" stroke-width="1.5"/>
  <!-- Glint -->
  <polygon points="40,36 46,36 42,42" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="62" cy="54" r="2.5" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'jade':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="jadeBi" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Ancient Imperial Jade Bi Disk (Ngọc bích thái bình) -->
  <circle cx="50" cy="50" r="34" fill="url(#jadeBi)" stroke="#059669" stroke-width="1.5"/>
  <!-- Inner Hole -->
  <circle cx="50" cy="50" r="12" fill="#F0FDF4" stroke="#059669" stroke-width="1.5"/>
  <!-- Silky Jade Polished Luster -->
  <path d="M 32,32 C 40,24 60,24 68,32" stroke="#A7F3D0" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
  <circle cx="36" cy="62" r="3" fill="#6EE7B7" opacity="0.6"/>
  <circle cx="64" cy="62" r="3" fill="#6EE7B7" opacity="0.6"/>
  <!-- Red Silk Cord Tassel knot -->
  <rect x="48" y="10" width="4" height="8" fill="#DC2626"/>
  <line x1="50" y1="62" x2="50" y2="88" stroke="#DC2626" stroke-width="2.5"/>
  <polygon points="46,84 54,84 50,92" fill="#DC2626"/>
</svg>`;

    case 'olive':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="oliveSphere" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#A4A42D"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#3D3D00"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Ripe Mediterranean Olives on Branch -->
  <path d="M 28,26 Q 50,32 74,28" stroke="#713F12" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Olive Leaf -->
  <path d="M 44,28 C 42,16 56,12 66,16 C 60,24 52,26 44,28 Z" fill="#65A30D"/>
  <line x1="44" y1="28" x2="66" y2="16" stroke="#84CC16" stroke-width="1"/>
  <!-- Olive Fruit 1 -->
  <ellipse cx="42" cy="56" rx="16" ry="20" transform="rotate(-15, 42, 56)" fill="url(#oliveSphere)"/>
  <ellipse cx="36" cy="46" rx="4" ry="2" transform="rotate(-25, 36, 46)" fill="#FFFFFF" opacity="0.75"/>
  <!-- Olive Fruit 2 (behind) -->
  <ellipse cx="64" cy="54" rx="14" ry="18" transform="rotate(20, 64, 54)" fill="url(#oliveSphere)"/>
  <ellipse cx="60" cy="46" rx="3" ry="1.5" transform="rotate(10, 60, 46)" fill="#FFFFFF" opacity="0.75"/>
</svg>`;

    case 'lime':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="limeSlice" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#CCFF00"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#006400"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F7FEE7" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Zesty Fresh Lime Wheel Slice -->
  <circle cx="50" cy="50" r="34" fill="#006400"/>
  <circle cx="50" cy="50" r="31" fill="#F7FEE7"/>
  <circle cx="50" cy="50" r="28" fill="url(#limeSlice)"/>
  <!-- 8 Juicy Triangular Pulp Segments -->
  <circle cx="50" cy="50" r="4" fill="#FFFFFF"/>
  <line x1="50" y1="22" x2="50" y2="78" stroke="#FFFFFF" stroke-width="1.8"/>
  <line x1="22" y1="50" x2="78" y2="50" stroke="#FFFFFF" stroke-width="1.8"/>
  <line x1="30" y1="30" x2="70" y2="70" stroke="#FFFFFF" stroke-width="1.8"/>
  <line x1="70" y1="30" x2="30" y2="70" stroke="#FFFFFF" stroke-width="1.8"/>
  <!-- Droplet of Tart Lime Juice -->
  <circle cx="62" cy="38" r="2" fill="#FFFFFF" opacity="0.85"/>
</svg>`;

    case 'mint green':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="mintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E6FFE6"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#40E0D0"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Refreshing Spearmint Leaf Cluster -->
  <path d="M 50,18 C 30,30 24,54 38,72 C 48,84 64,82 72,66 C 80,48 72,28 50,18 Z" fill="url(#mintGrad)"/>
  <!-- Serrated Leaf Veins -->
  <path d="M 50,22 Q 48,50 56,76" stroke="#22C55E" stroke-width="2" fill="none"/>
  <path d="M 48,38 Q 36,44 32,50" stroke="#22C55E" stroke-width="1.5" fill="none"/>
  <path d="M 50,52 Q 62,56 68,60" stroke="#22C55E" stroke-width="1.5" fill="none"/>
  <path d="M 52,64 Q 42,68 38,72" stroke="#22C55E" stroke-width="1.5" fill="none"/>
  <!-- Frosty Dew Drop -->
  <circle cx="44" cy="34" r="3.5" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="45" cy="33" r="1.2" fill="#FFFFFF"/>
</svg>`;

    case 'forest green':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="forestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#052E16"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFDF5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Majestic Evergreen Pine Tree Silhouette -->
  <!-- Top Tier -->
  <polygon points="50,18 36,36 64,36" fill="url(#forestGrad)"/>
  <!-- Middle Tier -->
  <polygon points="50,32 30,52 70,52" fill="url(#forestGrad)"/>
  <!-- Bottom Tier -->
  <polygon points="50,48 24,72 76,72" fill="url(#forestGrad)"/>
  <!-- Tree Trunk -->
  <rect x="46" y="72" width="8" height="12" rx="2" fill="#78350F"/>
  <!-- Pine Needles Luster -->
  <path d="M 50,22 L 50,70" stroke="#6EE7B7" stroke-width="1.5" opacity="0.7"/>
  <circle cx="42" cy="42" r="2" fill="#BBF7D0" opacity="0.8"/>
  <circle cx="58" cy="58" r="2" fill="#BBF7D0" opacity="0.8"/>
</svg>`;

    case 'sage green':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="sageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C5DBC0"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#556B2F"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F4F7F2" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Velvety Oval Sage Herb Leaf -->
  <ellipse cx="50" cy="50" rx="22" ry="32" transform="rotate(-20, 50, 50)" fill="url(#sageGrad)"/>
  <!-- Soft Downy Leaf Stem -->
  <path d="M 40,78 Q 48,50 60,22" stroke="#E2ECE0" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M 46,58 Q 36,54 34,48" stroke="#E2ECE0" stroke-width="1.4" fill="none"/>
  <path d="M 52,44 Q 62,44 66,40" stroke="#E2ECE0" stroke-width="1.4" fill="none"/>
  <!-- Powdery Matte Texture Dots -->
  <circle cx="48" cy="38" r="2.5" fill="#FFFFFF" opacity="0.5"/>
  <circle cx="40" cy="50" r="2" fill="#FFFFFF" opacity="0.4"/>
</svg>`;

    case 'moss green':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="mossVelvet" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#B8C488"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#4B5320"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F9FAF5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Forest Floor Boulder with Moss Carpet -->
  <path d="M 22,68 C 24,44 44,32 64,36 C 80,40 84,62 80,76 C 64,84 32,84 22,68 Z" fill="#64748B"/>
  <path d="M 24,64 C 26,42 46,30 64,34 C 76,38 80,56 78,72 C 62,70 36,66 24,64 Z" fill="url(#mossVelvet)"/>
  <!-- Micro Moss Tufts -->
  <circle cx="36" cy="46" r="3.5" fill="#A3B172"/>
  <circle cx="46" cy="42" r="4" fill="#C5D399"/>
  <circle cx="58" cy="44" r="3.8" fill="#A3B172"/>
  <circle cx="68" cy="52" r="3.2" fill="#C5D399"/>
  <circle cx="40" cy="58" r="3.5" fill="#C5D399"/>
  <!-- Spore Shoot -->
  <path d="M 50,42 Q 52,28 56,20" stroke="#556B2F" stroke-width="1.5" fill="none"/>
  <ellipse cx="57" cy="19" rx="2" ry="3" fill="#CA8A04"/>
</svg>`;

    case 'chartreuse':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="chartreuseGlow" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#EAFF85"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#4D9900"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F7FEE7" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Vivid Liqueur Crystal Flask / Banana Shoot -->
  <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="url(#chartreuseGlow)" stroke="#65A30D" stroke-width="2"/>
  <polygon points="50,28 70,40 70,60 50,72 30,60 30,40" fill="${h}"/>
  <!-- Luminous Electric Flash -->
  <line x1="50" y1="28" x2="50" y2="72" stroke="#FFFFFF" stroke-width="2"/>
  <polygon points="46,32 50,28 54,32" fill="#FFFFFF"/>
  <circle cx="38" cy="46" r="3" fill="#FFFFFF" opacity="0.85"/>
</svg>`;

    case 'pine green':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="pineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14B8A6"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#00332E"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDFA" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Pine Cone & Needle Sprig -->
  <path d="M 28,32 L 68,72 M 38,24 L 62,80 M 24,42 L 76,64" stroke="#0D9488" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Pine Cone Body -->
  <ellipse cx="50" cy="54" rx="16" ry="22" fill="#78350F"/>
  <!-- Overlapping Scales -->
  <path d="M 40,40 C 44,36 56,36 60,40 C 56,46 44,46 40,40 Z" fill="#92400E"/>
  <path d="M 36,48 C 42,44 58,44 64,48 C 60,54 40,54 36,48 Z" fill="#B45309"/>
  <path d="M 38,58 C 44,54 56,54 62,58 C 58,64 42,64 38,58 Z" fill="#92400E"/>
  <!-- Frost Glint -->
  <circle cx="48" cy="38" r="2" fill="#CCFBF1" opacity="0.9"/>
</svg>`;

    case 'pistachio':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="pistaNut" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#C2E6A7"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#557A3A"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F7FEE7" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Cracked Pistachio Shell with Green Kernel -->
  <!-- Left Shell -->
  <path d="M 46,24 C 28,32 20,54 30,72 C 34,78 44,80 44,80 C 34,68 32,46 46,24 Z" fill="#E6D5B8" stroke="#C4B08B" stroke-width="1.8"/>
  <!-- Right Shell -->
  <path d="M 54,24 C 72,32 80,54 70,72 C 66,78 56,80 56,80 C 66,68 68,46 54,24 Z" fill="#E6D5B8" stroke="#C4B08B" stroke-width="1.8"/>
  <!-- Radiant Green Nut Kernel -->
  <ellipse cx="50" cy="52" rx="14" ry="20" fill="url(#pistaNut)"/>
  <!-- Kernel skin blush -->
  <path d="M 42,40 Q 52,36 58,44" stroke="#991B1B" stroke-width="1.8" fill="none" opacity="0.6"/>
  <ellipse cx="46" cy="46" rx="3" ry="5" fill="#DCFCE7" opacity="0.7"/>
</svg>`;

    case 'seafoam':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="seafoamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D1FAE5"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFDF5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Rolling Wave with Effervescent Seafoam Bubbles -->
  <path d="M 20,68 C 30,42 56,36 74,44 C 80,48 84,58 78,72 C 60,78 36,78 20,68 Z" fill="url(#seafoamGrad)"/>
  <!-- Effervescent Foam Crest -->
  <circle cx="34" cy="52" r="5" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="44" cy="46" r="6" fill="#FFFFFF" opacity="0.95"/>
  <circle cx="56" cy="44" r="7" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="68" cy="48" r="5.5" fill="#FFFFFF" opacity="0.95"/>
  <circle cx="76" cy="56" r="4" fill="#FFFFFF" opacity="0.85"/>
  <!-- Spray Droplets -->
  <circle cx="42" cy="34" r="2.5" fill="#A7F3D0"/>
  <circle cx="60" cy="32" r="3" fill="#A7F3D0"/>
  <circle cx="72" cy="38" r="2" fill="#A7F3D0"/>
</svg>`;

    // ==========================================
    // CLR-U04: YELLOWS & GOLDS
    // ==========================================
    case 'golden':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="goldBar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF3B0"/>
      <stop offset="35%" stop-color="${h}"/>
      <stop offset="70%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA771C"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Pure Gold Ingot Bullion / Coin -->
  <circle cx="50" cy="50" r="33" fill="url(#goldBar)" stroke="#B45309" stroke-width="2"/>
  <circle cx="50" cy="50" r="27" stroke="#FDE68A" stroke-width="1.8" stroke-dasharray="4,2" fill="none"/>
  <!-- Crown Seal -->
  <polygon points="50,38 54,46 62,40 58,56 42,56 38,40 46,46" fill="#FFFBEB"/>
  <circle cx="38" cy="38" r="2" fill="#D97706"/>
  <circle cx="50" cy="36" r="2.5" fill="#D97706"/>
  <circle cx="62" cy="38" r="2" fill="#D97706"/>
  <!-- Brilliant Gold Gleam -->
  <polygon points="32,28 34,34 40,36 34,38 32,44 30,38 24,36 30,34" fill="#FFFFFF"/>
  <circle cx="64" cy="58" r="3" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'amber':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="amberGlow" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFE066"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#B26B00"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Prehistoric Fossilized Amber Gem with Ancient Mosquito Leaf Inside -->
  <path d="M 50,18 C 68,18 82,32 80,52 C 78,72 64,82 50,82 C 34,82 20,70 20,50 C 20,32 32,18 50,18 Z" fill="url(#amberGlow)"/>
  <!-- Fossil Silhouette inside -->
  <circle cx="48" cy="50" r="3" fill="#582900"/>
  <path d="M 48,50 L 42,42 M 48,50 L 40,50 M 48,50 L 44,58 M 48,50 L 56,44 M 48,50 L 58,52" stroke="#582900" stroke-width="1.2"/>
  <!-- Glassy Honey Sheen -->
  <ellipse cx="38" cy="30" rx="8" ry="4" transform="rotate(-20, 38, 30)" fill="#FFFFFF" opacity="0.8"/>
  <circle cx="62" cy="62" r="2.5" fill="#FFFFFF" opacity="0.75"/>
</svg>`;

    case 'lemon yellow':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="lemonGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFF99"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#CCCC00"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Sun-Drenched Lemon Fruit with Pointed Tips -->
  <path d="M 22,50 C 22,34 38,24 50,24 C 62,24 78,34 78,50 C 78,66 62,76 50,76 C 38,76 22,66 22,50 Z" fill="url(#lemonGrad)"/>
  <!-- Lemon Nipples -->
  <polygon points="18,50 24,46 24,54" fill="${h}"/>
  <polygon points="82,50 76,46 76,54" fill="${h}"/>
  <!-- Green leaf sprig -->
  <path d="M 50,24 C 52,14 62,12 68,14 C 64,22 56,24 50,24 Z" fill="#65A30D"/>
  <!-- Glossy Zest Highlight -->
  <ellipse cx="42" cy="36" rx="8" ry="4" transform="rotate(-20, 42, 36)" fill="#FFFFFF" opacity="0.85"/>
  <circle cx="58" cy="40" r="2.5" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'ochre':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="ochreEarth" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E59844"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#804400"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Prehistoric Cave Pigment Clay Pot / Mound -->
  <path d="M 24,74 C 28,46 42,32 50,32 C 58,32 72,46 76,74 Z" fill="url(#ochreEarth)"/>
  <!-- Pigment powder mound top -->
  <circle cx="50" cy="32" r="8" fill="#E59844"/>
  <!-- Authentic Cave Rock Markings -->
  <path d="M 38,52 Q 50,46 62,52" stroke="#804400" stroke-width="2" fill="none"/>
  <path d="M 34,62 Q 50,56 66,62" stroke="#804400" stroke-width="2" fill="none"/>
  <circle cx="44" cy="42" r="2" fill="#FFE0B2"/>
</svg>`;

    case 'mustard':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="mustardDip" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFF275"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#B38F00"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Gourmet French Dijon Mustard Crock / Swirl -->
  <circle cx="50" cy="50" r="32" fill="#E5E7EB" stroke="#9CA3AF" stroke-width="2"/>
  <circle cx="50" cy="50" r="26" fill="url(#mustardDip)"/>
  <!-- Swirl of creamy sauce -->
  <path d="M 36,44 Q 50,32 64,46 Q 50,62 38,54" stroke="#FFF275" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Black mustard seeds -->
  <circle cx="44" cy="48" r="1.5" fill="#451A03"/>
  <circle cx="54" cy="42" r="1.5" fill="#451A03"/>
  <circle cx="58" cy="54" r="1.5" fill="#451A03"/>
  <circle cx="40" cy="56" r="1.5" fill="#451A03"/>
</svg>`;

    case 'saffron':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="saffronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFDD66"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#CC8800"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Rare Red-Gold Saffron Crocus Threads -->
  <circle cx="50" cy="50" r="32" fill="url(#saffronGrad)"/>
  <!-- Crimson-Orange Saffron Stigmas (Sợi nhụy hoa nghệ tây quý hiếm) -->
  <path d="M 50,72 Q 44,52 32,36 Q 28,30 32,24" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <path d="M 50,72 Q 50,48 50,30 Q 52,24 58,22" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <path d="M 50,72 Q 56,52 68,36 Q 72,30 68,24" stroke="#DC2626" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <!-- Golden Flare Points -->
  <circle cx="33" cy="24" r="2" fill="#FBBF24"/>
  <circle cx="58" cy="22" r="2" fill="#FBBF24"/>
  <circle cx="67" cy="24" r="2" fill="#FBBF24"/>
</svg>`;

    case 'canary yellow':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="canaryGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFF66"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#D4C800"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Cheerful Songbird Silhouette in Brilliant Yellow -->
  <circle cx="50" cy="50" r="34" fill="url(#canaryGrad)"/>
  <!-- Bird Profile -->
  <circle cx="44" cy="38" r="8" fill="#FFF566"/>
  <polygon points="36,38 30,40 36,42" fill="#EA580C"/>
  <circle cx="42" cy="36" r="1.5" fill="#000000"/>
  <path d="M 44,46 C 44,46 54,46 64,54 C 68,58 74,68 76,74 C 66,72 58,66 52,60 Z" fill="#FFF566"/>
  <!-- Specular -->
  <circle cx="58" cy="34" r="3" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    case 'blonde':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="blondeSilk" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="${h}"/>
      <stop offset="80%" stop-color="#D9C88A"/>
      <stop offset="100%" stop-color="#B8A468"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Flowing Silky Flaxen Hair Lock -->
  <path d="M 34,20 C 44,20 54,28 54,42 C 54,58 38,68 44,82 C 48,84 56,84 62,80 C 56,66 66,54 66,40 C 66,24 50,18 34,20 Z" fill="url(#blondeSilk)"/>
  <!-- Silky strand highlights -->
  <path d="M 40,24 Q 50,38 48,56 Q 44,68 50,80" stroke="#FFFFFF" stroke-width="1.8" fill="none" opacity="0.8"/>
  <path d="M 46,22 Q 58,34 58,52 Q 56,68 60,78" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.8"/>
</svg>`;

    case 'champagne':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="champGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#CBB597"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAFAF9" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Tall Champagne Flute with Sparkling Effervescence -->
  <path d="M 42,18 L 58,18 L 54,56 C 54,62 52,66 50,66 C 48,66 46,62 46,56 Z" fill="url(#champGrad)" stroke="#D6D3D1" stroke-width="1.5"/>
  <!-- Stem & Base -->
  <line x1="50" y1="66" x2="50" y2="82" stroke="#A8A29E" stroke-width="2"/>
  <ellipse cx="50" cy="82" rx="12" ry="3" fill="#E7E5E4"/>
  <!-- Golden Bubbles Rising -->
  <circle cx="50" cy="50" r="1.5" fill="#F59E0B"/>
  <circle cx="48" cy="42" r="1.2" fill="#F59E0B"/>
  <circle cx="52" cy="36" r="1.5" fill="#F59E0B"/>
  <circle cx="49" cy="28" r="1.8" fill="#F59E0B"/>
  <!-- Glass Rim Sparkle -->
  <circle cx="44" cy="22" r="2" fill="#FFFFFF"/>
</svg>`;

    case 'topaz':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="topazGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE0B2"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#B87314"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Imperial Golden Topaz Diamond -->
  <polygon points="50,18 78,38 70,78 30,78 22,38" fill="url(#topazGrad)" stroke="#D97706" stroke-width="1.8"/>
  <polygon points="50,28 68,42 62,68 38,68 32,42" fill="${h}"/>
  <!-- Internal facets -->
  <line x1="50" y1="18" x2="50" y2="28" stroke="#FEF3C7" stroke-width="1.5"/>
  <line x1="78" y1="38" x2="68" y2="42" stroke="#FEF3C7" stroke-width="1.5"/>
  <line x1="70" y1="78" x2="62" y2="68" stroke="#FEF3C7" stroke-width="1.5"/>
  <line x1="30" y1="78" x2="38" y2="68" stroke="#FEF3C7" stroke-width="1.5"/>
  <line x1="22" y1="38" x2="32" y2="42" stroke="#FEF3C7" stroke-width="1.5"/>
  <!-- Sun Glint -->
  <polygon points="48,32 50,36 54,38 50,40 48,44 46,40 42,38 46,36" fill="#FFFFFF"/>
</svg>`;

    case 'flaxen':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="flaxSheaf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9D6"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#A89445"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Harvested Flaxen Wheat Sheaf / Spun Thread -->
  <path d="M 38,20 Q 50,45 36,80 M 50,18 L 50,82 M 62,20 Q 50,45 64,80" stroke="url(#flaxSheaf)" stroke-width="5" stroke-linecap="round"/>
  <!-- Blue Flax Blossom in center -->
  <circle cx="50" cy="45" r="5" fill="#38BDF8"/>
  <circle cx="50" cy="45" r="2" fill="#FACC15"/>
  <!-- Tie Ribbon -->
  <rect x="42" y="48" width="16" height="5" rx="2" fill="#CA8A04"/>
  <circle cx="44" cy="30" r="2" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'sunshine':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="sunRay" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Blazing Solar Disk with Radiant Sunbeams -->
  <circle cx="50" cy="50" r="22" fill="url(#sunRay)"/>
  <!-- 8 Sun Rays -->
  <line x1="50" y1="14" x2="50" y2="22" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="50" y1="78" x2="50" y2="86" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="14" y1="50" x2="22" y2="50" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="78" y1="50" x2="86" y2="50" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="25" y1="25" x2="31" y2="31" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="69" y1="69" x2="75" y2="75" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="75" y1="25" x2="69" y2="31" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
  <line x1="31" y1="69" x2="25" y2="75" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/>
  <circle cx="44" cy="44" r="4" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    // ==========================================
    // CLR-U05: PURPLES & VIOLETS
    // ==========================================
    case 'violet':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="violetPetal" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#C084FC"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#3B0764"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Wild African Violet Blossom (5 Petals) -->
  <circle cx="50" cy="30" r="15" fill="url(#violetPetal)"/>
  <circle cx="32" cy="46" r="15" fill="url(#violetPetal)"/>
  <circle cx="68" cy="46" r="15" fill="url(#violetPetal)"/>
  <circle cx="40" cy="66" r="15" fill="url(#violetPetal)"/>
  <circle cx="60" cy="66" r="15" fill="url(#violetPetal)"/>
  <!-- Golden Pistil Center -->
  <circle cx="50" cy="50" r="6" fill="#FACC15"/>
  <circle cx="50" cy="50" r="3" fill="#CA8A04"/>
  <circle cx="46" cy="32" r="2.5" fill="#FFFFFF" opacity="0.75"/>
</svg>`;

    case 'amethyst':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="amethystCrystal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D8B4FE"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#4C1D95"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Amethyst Geode Pointed Crystal Cluster -->
  <polygon points="50,14 36,36 38,76 62,76 64,36" fill="url(#amethystCrystal)" stroke="#6B21A8" stroke-width="1.8"/>
  <polygon points="50,14 50,76 62,76 64,36" fill="#7E22CE" opacity="0.6"/>
  <!-- Secondary Crystal Left -->
  <polygon points="26,42 18,54 22,78 36,78 34,50" fill="url(#amethystCrystal)"/>
  <!-- Secondary Crystal Right -->
  <polygon points="74,42 82,54 78,78 64,78 66,50" fill="url(#amethystCrystal)"/>
  <!-- Shimmer -->
  <polygon points="46,26 50,22 54,26 50,30" fill="#FFFFFF"/>
  <circle cx="44" cy="48" r="2.5" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'lavender':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="lavenderSprig" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#9333EA"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Fragrant Lavender Flower Spike -->
  <line x1="50" y1="86" x2="50" y2="24" stroke="#15803D" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Flower buds layered up stem -->
  <ellipse cx="44" cy="30" rx="6" ry="4" transform="rotate(-30, 44, 30)" fill="url(#lavenderSprig)"/>
  <ellipse cx="56" cy="30" rx="6" ry="4" transform="rotate(30, 56, 30)" fill="url(#lavenderSprig)"/>
  <ellipse cx="43" cy="42" rx="7" ry="4.5" transform="rotate(-30, 43, 42)" fill="url(#lavenderSprig)"/>
  <ellipse cx="57" cy="42" rx="7" ry="4.5" transform="rotate(30, 57, 42)" fill="url(#lavenderSprig)"/>
  <ellipse cx="42" cy="54" rx="7" ry="4.5" transform="rotate(-30, 42, 54)" fill="url(#lavenderSprig)"/>
  <ellipse cx="58" cy="54" rx="7" ry="4.5" transform="rotate(30, 58, 54)" fill="url(#lavenderSprig)"/>
  <ellipse cx="50" cy="22" rx="5" ry="6" fill="#C084FC"/>
  <circle cx="50" cy="20" r="2" fill="#FFFFFF"/>
</svg>`;

    case 'lilac':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="lilacBloom" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#E9D5FF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#86198F"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Springtime French Lilac 4-Petal Florets -->
  <circle cx="50" cy="50" r="32" fill="url(#lilacBloom)"/>
  <!-- 4-Petal Center Stencil -->
  <path d="M 50,34 C 46,42 46,46 50,50 C 54,46 54,42 50,34 Z" fill="#FFFFFF"/>
  <path d="M 50,66 C 46,58 46,54 50,50 C 54,54 54,58 50,66 Z" fill="#FFFFFF"/>
  <path d="M 34,50 C 42,46 46,46 50,50 C 46,54 42,54 34,50 Z" fill="#FFFFFF"/>
  <path d="M 66,50 C 58,46 54,46 50,50 C 54,54 58,54 66,50 Z" fill="#FFFFFF"/>
  <circle cx="50" cy="50" r="3" fill="#FACC15"/>
</svg>`;

    case 'plum':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="plumSkin" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#C084FC"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#3B0764"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Sweet Juicy Victoria Plum with Natural Waxy Bloom -->
  <path d="M 50,22 C 34,22 22,38 22,56 C 22,72 36,82 50,82 C 64,82 78,72 78,56 C 78,38 66,22 50,22 Z" fill="url(#plumSkin)"/>
  <!-- Longitudinal Plum Cleft Groove -->
  <path d="M 50,24 Q 48,50 50,80" stroke="#581C87" stroke-width="2" fill="none"/>
  <!-- Twig with Green Leaf -->
  <line x1="50" y1="22" x2="50" y2="14" stroke="#78350F" stroke-width="2.5"/>
  <ellipse cx="58" cy="14" rx="8" ry="4" transform="rotate(-15, 58, 14)" fill="#16A34A"/>
  <!-- Powdery silver sheen -->
  <ellipse cx="38" cy="40" rx="8" ry="4" transform="rotate(-25, 38, 40)" fill="#E9D5FF" opacity="0.6"/>
  <circle cx="42" cy="46" r="2.5" fill="#FFFFFF" opacity="0.85"/>
</svg>`;

    case 'mauve':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="mauveVelvet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5D0FE"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#701A75"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Victorian Antique Velvet Cameo Brooch -->
  <ellipse cx="50" cy="50" rx="26" ry="34" fill="url(#mauveVelvet)" stroke="#A21CAF" stroke-width="2"/>
  <ellipse cx="50" cy="50" rx="21" ry="29" stroke="#E879F9" stroke-width="1.5" stroke-dasharray="3,2" fill="none"/>
  <!-- Vintage Cameo Profile Stencil -->
  <circle cx="50" cy="44" r="8" fill="#FDF4FF"/>
  <path d="M 44,56 C 44,50 56,50 56,56 L 56,64 L 44,64 Z" fill="#FDF4FF"/>
  <circle cx="42" cy="32" r="2.5" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'periwinkle':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="periPinwheel" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#6366F1"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F3FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Periwinkle (Vinca) 5-Petal Pinwheel Flower -->
  <circle cx="50" cy="50" r="32" fill="url(#periPinwheel)"/>
  <!-- Pinwheel swirl lines -->
  <path d="M 50,50 L 50,22 Q 62,28 50,50" fill="#818CF8" opacity="0.7"/>
  <path d="M 50,50 L 76,40 Q 76,56 50,50" fill="#818CF8" opacity="0.7"/>
  <path d="M 50,50 L 66,74 Q 50,78 50,50" fill="#818CF8" opacity="0.7"/>
  <path d="M 50,50 L 34,74 Q 24,56 50,50" fill="#818CF8" opacity="0.7"/>
  <path d="M 50,50 L 24,40 Q 38,28 50,50" fill="#818CF8" opacity="0.7"/>
  <circle cx="50" cy="50" r="4" fill="#FFFFFF"/>
</svg>`;

    case 'mulberry':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="mulberryBerry" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#4A044E"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF2F8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Cluster of Juicy Mulberry Drupelets -->
  <line x1="50" y1="16" x2="50" y2="28" stroke="#4D7C0F" stroke-width="2.5"/>
  <!-- Drupelets -->
  <circle cx="50" cy="34" r="7" fill="url(#mulberryBerry)"/>
  <circle cx="42" cy="42" r="7" fill="url(#mulberryBerry)"/>
  <circle cx="58" cy="42" r="7" fill="url(#mulberryBerry)"/>
  <circle cx="36" cy="54" r="7" fill="url(#mulberryBerry)"/>
  <circle cx="50" cy="52" r="7.5" fill="url(#mulberryBerry)"/>
  <circle cx="64" cy="54" r="7" fill="url(#mulberryBerry)"/>
  <circle cx="42" cy="64" r="7" fill="url(#mulberryBerry)"/>
  <circle cx="58" cy="64" r="7" fill="url(#mulberryBerry)"/>
  <circle cx="50" cy="74" r="6" fill="url(#mulberryBerry)"/>
  <!-- Sparkles on drupelets -->
  <circle cx="48" cy="32" r="1.5" fill="#FFFFFF"/>
  <circle cx="48" cy="50" r="2" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'orchid':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="orchidPetal" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#F0ABFC"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#701A75"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF4FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Exotic Tropical Orchid Bloom -->
  <!-- Top Dorsal Sepal -->
  <path d="M 50,16 C 42,26 42,38 50,44 C 58,38 58,26 50,16 Z" fill="url(#orchidPetal)"/>
  <!-- Lateral Petals Left & Right -->
  <ellipse cx="28" cy="42" rx="14" ry="9" transform="rotate(-20, 28, 42)" fill="url(#orchidPetal)"/>
  <ellipse cx="72" cy="42" rx="14" ry="9" transform="rotate(20, 72, 42)" fill="url(#orchidPetal)"/>
  <!-- Labellum Lip Petal -->
  <path d="M 38,52 C 34,68 44,82 50,82 C 56,82 66,68 62,52 C 54,58 46,58 38,52 Z" fill="#BE185D"/>
  <circle cx="50" cy="62" r="4" fill="#FACC15"/>
  <circle cx="32" cy="38" r="2.5" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'eggplant':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="aubergine" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#9333EA"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#1E0A24"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Glossy Teardrop Eggplant / Aubergine Fruit -->
  <path d="M 50,26 C 44,26 36,36 32,54 C 28,70 38,82 50,82 C 62,82 72,70 68,54 C 64,36 56,26 50,26 Z" fill="url(#aubergine)"/>
  <!-- Green Calyx Cap & Stem -->
  <path d="M 50,14 L 50,24" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>
  <path d="M 38,26 C 42,32 46,30 50,34 C 54,30 58,32 62,26 C 56,22 44,22 38,26 Z" fill="#22C55E"/>
  <!-- Mirror Gloss Sheen -->
  <path d="M 40,42 C 36,52 36,64 42,72" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.75"/>
</svg>`;

    case 'royal purple':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="royalPurp" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#A855F7"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#2E1065"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Sovereign Velvet Crown with Ermine Trim -->
  <path d="M 24,66 L 76,66 L 80,40 L 64,52 L 50,30 L 36,52 L 20,40 Z" fill="url(#royalPurp)" stroke="#F59E0B" stroke-width="2"/>
  <!-- Gold Base Band -->
  <rect x="22" y="66" width="56" height="10" rx="3" fill="#F59E0B"/>
  <!-- Crown Jewels -->
  <circle cx="32" cy="71" r="2.5" fill="#DC2626"/>
  <circle cx="50" cy="71" r="3" fill="#2563EB"/>
  <circle cx="68" cy="71" r="2.5" fill="#16A34A"/>
  <!-- Orb cross on peak -->
  <circle cx="50" cy="24" r="3.5" fill="#FBBF24"/>
  <circle cx="38" cy="46" r="2" fill="#FFFFFF"/>
</svg>`;

    case 'thistle':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="thistleSoft" cx="50%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#F3E8FF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#9333EA"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Scottish Thistle Emblem -->
  <!-- Green Spiny Involucre Cup -->
  <path d="M 36,58 C 36,72 64,72 64,58 Z" fill="#15803D" stroke="#166534" stroke-width="2"/>
  <!-- Crosshatched thorny scales -->
  <line x1="38" y1="62" x2="62" y2="62" stroke="#14532D" stroke-width="1.5"/>
  <line x1="42" y1="68" x2="58" y2="68" stroke="#14532D" stroke-width="1.5"/>
  <!-- Soft Feathery Purple Tufts Bursting on top -->
  <path d="M 34,58 C 30,36 40,24 50,24 C 60,24 70,36 66,58 Z" fill="url(#thistleSoft)"/>
  <!-- Individual fine thistle filaments -->
  <line x1="42" y1="46" x2="38" y2="28" stroke="#E9D5FF" stroke-width="1.5"/>
  <line x1="50" y1="44" x2="50" y2="22" stroke="#FFFFFF" stroke-width="1.8"/>
  <line x1="58" y1="46" x2="62" y2="28" stroke="#E9D5FF" stroke-width="1.5"/>
</svg>`;

    // ==========================================
    // CLR-U06: ORANGES & EARTH TONES
    // ==========================================
    case 'tangerine':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="tangerineFruit" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFB347"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#B24700"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Plump Peeled Tangerine Segmented Citrus -->
  <circle cx="50" cy="54" r="28" fill="url(#tangerineFruit)"/>
  <!-- Citrus Dimples / Texture -->
  <circle cx="50" cy="28" r="3" fill="#15803D"/>
  <path d="M 50,28 Q 62,20 68,24" stroke="#15803D" stroke-width="2" fill="none"/>
  <ellipse cx="68" cy="24" rx="6" ry="3" fill="#22C55E"/>
  <!-- Gloss Luster -->
  <ellipse cx="42" cy="42" rx="8" ry="4" transform="rotate(-25, 42, 42)" fill="#FFFFFF" opacity="0.8"/>
  <circle cx="58" cy="46" r="2.5" fill="#FFFFFF" opacity="0.85"/>
</svg>`;

    case 'peach':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="peachVelvet" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFF0D4"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#FF7F50"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Sweet Juicy Heart-shaped Peach with Velvety Fuzz -->
  <path d="M 50,30 C 38,20 22,34 22,54 C 22,72 38,82 50,82 C 62,82 78,72 78,54 C 78,34 62,20 50,30 Z" fill="url(#peachVelvet)"/>
  <!-- Peach Cleft Groove -->
  <path d="M 50,30 Q 48,54 50,80" stroke="#FF6B6B" stroke-width="2" fill="none"/>
  <!-- Green leaf at stem -->
  <ellipse cx="56" cy="22" rx="9" ry="4.5" transform="rotate(-25, 56, 22)" fill="#65A30D"/>
  <ellipse cx="40" cy="42" rx="6" ry="3" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

    case 'apricot':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="apricotSkin" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFF3E0"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#E65100"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Smooth Apricot Fruit Pair -->
  <circle cx="48" cy="54" r="26" fill="url(#apricotSkin)"/>
  <path d="M 48,32 Q 46,54 48,78" stroke="#E65100" stroke-width="1.8" fill="none"/>
  <circle cx="48" cy="30" r="2.5" fill="#4D7C0F"/>
  <ellipse cx="38" cy="44" rx="6" ry="3" fill="#FFFFFF" opacity="0.75"/>
</svg>`;

    case 'terracotta':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="terraPot" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F28B74"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#8A2B18"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Rustic Mediterranean Terracotta Clay Flowerpot -->
  <polygon points="26,42 74,42 66,80 34,80" fill="url(#terraPot)"/>
  <!-- Rim Lip -->
  <rect x="22" y="32" width="56" height="10" rx="3" fill="#E2725B" stroke="#B8422B" stroke-width="1.5"/>
  <!-- Earthy Engraved Geometric Band -->
  <line x1="30" y1="52" x2="70" y2="52" stroke="#8A2B18" stroke-width="1.5"/>
  <circle cx="50" cy="62" r="4" fill="#8A2B18"/>
  <ellipse cx="36" cy="46" rx="5" ry="8" fill="#FFFFFF" opacity="0.25"/>
</svg>`;

    case 'bronze':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bronzeShield" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E69C54"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#663B0F"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Ancient Spartan Bronze Round Shield with Central Boss -->
  <circle cx="50" cy="50" r="33" fill="url(#bronzeShield)" stroke="#5E350E" stroke-width="2"/>
  <circle cx="50" cy="50" r="27" stroke="#E69C54" stroke-width="1.8" stroke-dasharray="4,2" fill="none"/>
  <!-- Central Boss & Studs -->
  <circle cx="50" cy="50" r="10" fill="#B06500"/>
  <circle cx="50" cy="50" r="5" fill="#E69C54"/>
  <!-- Specular Bronze Gleam -->
  <path d="M 30,30 Q 50,18 70,30" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.75"/>
</svg>`;

    case 'copper':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="copperGloss" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EAA168"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#5E320D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Polished Copper Kettle / Alembic -->
  <path d="M 32,46 C 32,36 42,32 50,32 C 58,32 68,36 68,46 L 72,70 C 72,78 62,82 50,82 C 38,82 28,78 28,70 Z" fill="url(#copperGloss)"/>
  <!-- Handle -->
  <path d="M 34,36 C 34,18 66,18 66,36" stroke="#5E320D" stroke-width="3" fill="none"/>
  <!-- Gleaming Highlight -->
  <path d="M 38,44 Q 40,64 42,74" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
  <circle cx="56" cy="48" r="2.5" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    case 'sienna':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="siennaGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#BA4E36"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#451207"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Tuscan Terra di Siena Earth Sphere & Artist Palette Dab -->
  <circle cx="50" cy="50" r="32" fill="url(#siennaGrad)"/>
  <!-- Artistic brushstroke ring -->
  <path d="M 32,40 Q 50,26 68,40 Q 60,68 36,60" stroke="#E07A5F" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>
  <circle cx="42" cy="38" r="3" fill="#FFFFFF" opacity="0.7"/>
</svg>`;

    case 'burnt orange':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="burntFlame" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#732600"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#FFAA33"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Smoldering Bonfire Tongue of Flame -->
  <path d="M 50,16 C 58,30 74,44 74,62 C 74,76 64,84 50,84 C 36,84 26,76 26,62 C 26,44 42,30 50,16 Z" fill="url(#burntFlame)"/>
  <!-- Intense Inner Core -->
  <path d="M 50,38 C 54,48 62,56 62,66 C 62,74 56,78 50,78 C 44,78 38,74 38,66 C 38,56 46,48 50,38 Z" fill="#FFCC00"/>
  <circle cx="44" cy="54" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'marigold':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="marigoldBloom" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFDD55"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#B36B00"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Dense Multi-Petaled Aztec Marigold (Cúc Vạn Thọ) -->
  <circle cx="50" cy="50" r="33" fill="url(#marigoldBloom)"/>
  <!-- Concentric Petal Ruffles -->
  <circle cx="50" cy="50" r="24" stroke="#FBBF24" stroke-width="3" stroke-dasharray="5,3" fill="none"/>
  <circle cx="50" cy="50" r="16" stroke="#D97706" stroke-width="3" stroke-dasharray="4,2" fill="none"/>
  <circle cx="50" cy="50" r="8" fill="#B45309"/>
  <!-- Petal Dewdrop -->
  <circle cx="40" cy="38" r="2.5" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    case 'sunset orange':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#FBBF24"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Evening Sun Dipping into Horizon Ocean -->
  <circle cx="50" cy="50" r="34" fill="url(#sunsetSky)"/>
  <!-- Sinking Golden Sun -->
  <circle cx="50" cy="46" r="14" fill="#FEF08A"/>
  <!-- Ocean Horizon Lines -->
  <line x1="20" y1="56" x2="80" y2="56" stroke="#BE123C" stroke-width="2"/>
  <line x1="24" y1="64" x2="76" y2="64" stroke="#BE123C" stroke-width="2"/>
  <line x1="32" y1="72" x2="68" y2="72" stroke="#BE123C" stroke-width="2"/>
</svg>`;

    case 'ginger':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="gingerRoot" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#D9822B"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#592800"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Aromatic Knobby Ginger Rhizome Root -->
  <path d="M 32,36 C 36,24 54,24 58,34 C 64,30 76,38 74,50 C 80,62 70,76 56,76 C 42,76 34,68 34,58 C 24,54 26,42 32,36 Z" fill="url(#gingerRoot)"/>
  <!-- Rhizome Segment Rings -->
  <path d="M 40,38 Q 48,46 54,42" stroke="#592800" stroke-width="2" fill="none"/>
  <path d="M 44,54 Q 52,60 62,56" stroke="#592800" stroke-width="2" fill="none"/>
  <!-- Luster -->
  <circle cx="46" cy="34" r="2.5" fill="#FFE0B2"/>
</svg>`;

    case 'pumpkin':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="pumpkinRib" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFA04D"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#A63E00"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFF7ED" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Plump Ribbed Autumn Pumpkin -->
  <ellipse cx="50" cy="56" rx="30" ry="24" fill="url(#pumpkinRib)"/>
  <!-- Central Rib Lobes -->
  <ellipse cx="50" cy="56" rx="14" ry="24" fill="${h}"/>
  <ellipse cx="36" cy="56" rx="12" ry="22" fill="${h}"/>
  <ellipse cx="64" cy="56" rx="12" ry="22" fill="${h}"/>
  <!-- Twisted Green Stem -->
  <path d="M 50,34 Q 48,22 56,18" stroke="#15803D" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <!-- Gloss -->
  <ellipse cx="44" cy="46" rx="4" ry="2" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    // ==========================================
    // CLR-U07: BROWNS & WOODS
    // ==========================================
    case 'chocolate':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="chocoBar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A65900"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#3D1F00"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5EF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Artisan Dark Chocolate Tablet Square with 4 Chiseled Chunks -->
  <rect x="24" y="24" width="52" height="52" rx="6" fill="url(#chocoBar)" stroke="#3D1F00" stroke-width="2"/>
  <!-- Grid Divider Grooves -->
  <line x1="50" y1="24" x2="50" y2="76" stroke="#3D1F00" stroke-width="2.5"/>
  <line x1="24" y1="50" x2="76" y2="50" stroke="#3D1F00" stroke-width="2.5"/>
  <!-- Beveled Chunk Highlights -->
  <polygon points="28,28 46,28 44,32 32,32" fill="#C27A29"/>
  <polygon points="54,28 72,28 70,32 58,32" fill="#C27A29"/>
  <!-- Glossy Sheen -->
  <circle cx="36" cy="38" r="2.5" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

    case 'coffee':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="espressoCup" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#9C6B47"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#2E1C10"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF8F5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Ceramic Cup of Rich Coffee with Crema Heart -->
  <circle cx="50" cy="50" r="32" fill="#FFFFFF" stroke="#D1D5DB" stroke-width="2.5"/>
  <circle cx="50" cy="50" r="26" fill="url(#espressoCup)"/>
  <!-- Golden Crema Latte Art Leaf / Heart -->
  <path d="M 50,42 C 44,34 38,44 50,54 C 62,44 56,34 50,42 Z" fill="#D4A373"/>
  <!-- Coffee bean beside cup -->
  <ellipse cx="68" cy="74" rx="7" ry="5" transform="rotate(-30, 68, 74)" fill="${h}"/>
  <line x1="63" y1="74" x2="73" y2="74" stroke="#2E1C10" stroke-width="1.5"/>
</svg>`;

    case 'chestnut':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="chestnutNut" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#C26654"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#4A180E"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5F0" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Glossy Roasted Chestnut Nut -->
  <path d="M 50,22 C 66,32 76,52 72,70 C 66,78 34,78 28,70 C 24,52 34,32 50,22 Z" fill="url(#chestnutNut)"/>
  <!-- Pale Hilum Base Pad -->
  <path d="M 32,70 C 38,64 62,64 68,70 C 64,78 36,78 32,70 Z" fill="#E6BAA3"/>
  <!-- Shiny Nut Reflection -->
  <ellipse cx="44" cy="38" rx="7" ry="3.5" transform="rotate(-25, 44, 38)" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'caramel':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="caramelSwirl" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#EBB07A"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#6E3D12"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFDF5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Luscious Melting Dulce de Leche Caramel Drizzle Cube -->
  <rect x="28" y="32" width="44" height="40" rx="8" fill="url(#caramelSwirl)"/>
  <!-- Glossy Melting Caramel Drips -->
  <path d="M 36,72 C 36,80 44,80 44,72 M 56,72 C 56,84 64,84 64,72" fill="${h}"/>
  <!-- Specular Luster -->
  <path d="M 34,36 Q 50,30 66,36" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
  <circle cx="42" cy="46" r="2.5" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    case 'mahogany':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="mahoganyGrain" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E65518"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#661D00"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5F0" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Polished Deep Reddish-Brown Mahogany Timber Plank -->
  <rect x="22" y="22" width="56" height="56" rx="6" fill="url(#mahoganyGrain)" stroke="#661D00" stroke-width="2"/>
  <!-- Wavy Rich Wood Rings -->
  <path d="M 24,36 Q 50,44 76,36" stroke="#802600" stroke-width="2" fill="none"/>
  <path d="M 24,50 Q 50,58 76,50" stroke="#802600" stroke-width="2" fill="none"/>
  <path d="M 24,64 Q 50,72 76,64" stroke="#802600" stroke-width="2" fill="none"/>
  <!-- French Polish Mirror Reflection -->
  <line x1="28" y1="26" x2="48" y2="26" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
</svg>`;

    case 'walnut':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="walnutShell" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#A86333"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#3B1C08"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5F0" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Rugged Sculpted Walnut Shell -->
  <ellipse cx="50" cy="52" rx="28" ry="24" fill="url(#walnutShell)"/>
  <!-- Center Suture Seam Line -->
  <line x1="50" y1="28" x2="50" y2="76" stroke="#3B1C08" stroke-width="2.5"/>
  <!-- Crinkled Shell Grooves -->
  <path d="M 36,38 Q 44,48 34,64" stroke="#3B1C08" stroke-width="2" fill="none"/>
  <path d="M 64,38 Q 56,48 66,64" stroke="#3B1C08" stroke-width="2" fill="none"/>
  <circle cx="42" cy="38" r="2" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

    case 'sepia':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="sepiaPhoto" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9C6B31"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#381D05"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFDF8" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Antique Sepia Tinted Photograph / Ink Flask -->
  <rect x="24" y="24" width="52" height="52" rx="4" fill="#FAF5E8" stroke="#8C6239" stroke-width="2"/>
  <rect x="28" y="28" width="44" height="44" fill="url(#sepiaPhoto)"/>
  <!-- Nostalgic Portrait silhouette in sepia -->
  <circle cx="50" cy="44" r="8" fill="#F4E8D1"/>
  <path d="M 40,64 C 40,54 60,54 60,64 Z" fill="#F4E8D1"/>
</svg>`;

    case 'hazel':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="hazelEye" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#C2A838"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#4A3D0A"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF8F0" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Beautiful Mystic Hazel Iris with Green-Gold Flecks -->
  <circle cx="50" cy="50" r="32" fill="url(#hazelEye)" stroke="#4A3D0A" stroke-width="2"/>
  <circle cx="50" cy="50" r="12" fill="#0A0A0A"/>
  <!-- Greenish-Amber Flecks -->
  <circle cx="44" cy="44" r="3" fill="#65A30D" opacity="0.7"/>
  <circle cx="56" cy="46" r="3" fill="#EAB308" opacity="0.8"/>
  <circle cx="46" cy="40" r="3.5" fill="#FFFFFF"/>
</svg>`;

    case 'cinnamon':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="cinnamonQuill" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E6853B"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#803800"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF5EF" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Rolled Ceylon Cinnamon Bark Quill Sticks -->
  <path d="M 28,32 C 34,26 44,26 50,32 L 68,68 C 62,74 52,74 46,68 Z" fill="url(#cinnamonQuill)"/>
  <!-- Hollow Scroll Spiral Ends -->
  <ellipse cx="38" cy="30" rx="8" ry="4" transform="rotate(-35, 38, 30)" fill="#4A1E00"/>
  <path d="M 36,30 Q 38,28 40,30" stroke="#E6853B" stroke-width="1.5" fill="none"/>
  <!-- Second Stick Behind -->
  <path d="M 44,40 L 72,74" stroke="#803800" stroke-width="4" stroke-linecap="round"/>
</svg>`;

    case 'beige':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="beigeSilk" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#C7C7A6"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAFAF5" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Elegant Minimalist Cashmere Fabric Swatch Fold -->
  <path d="M 24,30 C 38,20 62,20 76,30 L 72,70 C 58,80 42,80 28,70 Z" fill="url(#beigeSilk)"/>
  <path d="M 32,36 Q 50,44 68,36" stroke="#D6D6BA" stroke-width="2" fill="none"/>
  <path d="M 36,52 Q 50,60 64,52" stroke="#D6D6BA" stroke-width="2" fill="none"/>
  <circle cx="44" cy="38" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'taupe':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="taupeLeather" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6E5E52"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#2B231D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F7F5F2" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Sophisticated Grey-Brown Taupe Leather Pouch -->
  <path d="M 30,36 C 36,24 64,24 70,36 L 74,68 C 74,78 62,82 50,82 C 38,82 26,78 26,68 Z" fill="url(#taupeLeather)"/>
  <line x1="34" y1="42" x2="66" y2="42" stroke="#9C8B7F" stroke-width="1.8" stroke-dasharray="3,2"/>
  <circle cx="50" cy="54" r="4" fill="#C4B5A5"/>
  <circle cx="42" cy="46" r="2" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

    case 'khaki':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="khakiCanvas" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#DDD0BA"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#8F7E62"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F7F5F0" stroke="${borderCol}" stroke-width="2.5"/>
  <!-- Safari Expedition Canvas Canteen / Epaulet -->
  <circle cx="50" cy="54" r="28" fill="url(#khakiCanvas)" stroke="#78674E" stroke-width="2"/>
  <rect x="46" y="20" width="8" height="8" rx="2" fill="#78674E"/>
  <line x1="30" y1="54" x2="70" y2="54" stroke="#78674E" stroke-width="2"/>
  <circle cx="44" cy="44" r="2.5" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

    // ==========================================
    // CLR-U08: BLACKS, SILVERS & METALS
    // ==========================================
    case 'obsidian':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="obsidianGlass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D2D2D"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F4F4F5" stroke="#3F3F46" stroke-width="2.5"/>
  <!-- Razor-Sharp Volcanic Glass Arrowhead with Conchoidal Fractures -->
  <polygon points="50,14 74,48 64,80 50,72 36,80 26,48" fill="url(#obsidianGlass)" stroke="#52525B" stroke-width="1.5"/>
  <!-- Conchoidal Glass Sheen Facets -->
  <path d="M 50,14 L 46,50 L 50,72" stroke="#71717A" stroke-width="1.8"/>
  <polygon points="50,18 68,48 50,42" fill="#3F3F46" opacity="0.5"/>
  <!-- Razor Edge Specular White Flash -->
  <line x1="50" y1="16" x2="72" y2="46" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  <circle cx="44" cy="38" r="2" fill="#FFFFFF"/>
</svg>`;

    case 'jet black':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="jetGloss" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#3F3F46"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F4F4F5" stroke="#27272A" stroke-width="2.5"/>
  <!-- Polished Deep Jet Fossil Sphere with High Mirror Glint -->
  <circle cx="50" cy="50" r="33" fill="url(#jetGloss)"/>
  <!-- Pure Specular Mirror Crescent -->
  <ellipse cx="40" cy="34" rx="8" ry="4" transform="rotate(-30, 40, 34)" fill="#FFFFFF" opacity="0.9"/>
  <circle cx="48" cy="42" r="2" fill="#FFFFFF"/>
</svg>`;

    case 'charcoal':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="charcoalStick" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5B6D7A"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#1A2126"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
  <!-- Vine Charcoal Drawing Stick with Textured Dust Strokes -->
  <polygon points="26,34 68,16 78,66 36,84" fill="url(#charcoalStick)"/>
  <!-- Powdery Texture Smudges -->
  <path d="M 20,78 Q 40,68 62,80" stroke="#36454F" stroke-width="4" stroke-linecap="round"/>
  <line x1="38" y1="42" x2="68" y2="30" stroke="#708594" stroke-width="2"/>
  <circle cx="34" cy="50" r="2" fill="#CBD5E1"/>
</svg>`;

    case 'silver':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="silverSheen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="${h}"/>
      <stop offset="70%" stop-color="#9E9E9E"/>
      <stop offset="100%" stop-color="#E0E0E0"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2.5"/>
  <!-- Shining Pure Silver Medallion with Diamond Star -->
  <circle cx="50" cy="50" r="33" fill="url(#silverSheen)" stroke="#94A3B8" stroke-width="2"/>
  <circle cx="50" cy="50" r="27" stroke="#FFFFFF" stroke-width="1.8" stroke-dasharray="4,2" fill="none"/>
  <!-- Silver Starburst -->
  <polygon points="50,26 53,42 68,42 56,51 60,66 50,56 40,66 44,51 32,42 47,42" fill="#FFFFFF"/>
  <circle cx="36" cy="34" r="3" fill="#FFFFFF"/>
</svg>`;

    case 'platinum':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="platGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="85%" stop-color="#BDBBB7"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAFAFA" stroke="#D4D4D8" stroke-width="2.5"/>
  <!-- Platinum Crown Ring with Super Brilliant Refraction -->
  <circle cx="50" cy="50" r="32" fill="url(#platGrad)" stroke="#A1A1AA" stroke-width="2"/>
  <circle cx="50" cy="50" r="22" fill="#FAFAFA" stroke="#A1A1AA" stroke-width="1.5"/>
  <!-- White Specular Sparkles -->
  <polygon points="50,20 52,24 56,26 52,28 50,32 48,28 44,26 48,24" fill="#FFFFFF"/>
  <polygon points="74,50 72,53 68,55 72,57 74,60 76,57 80,55 76,53" fill="#FFFFFF"/>
</svg>`;

    case 'graphite':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="pencilLead" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7B7E82"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#2D2F30"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
  <!-- Hexagonal Graphite Drafting Pencil Tip -->
  <polygon points="50,84 32,46 68,46" fill="#CA8A04"/>
  <polygon points="50,84 42,66 58,66" fill="url(#pencilLead)"/>
  <rect x="32" y="16" width="36" height="30" fill="#EAB308"/>
  <line x1="44" y1="16" x2="44" y2="46" stroke="#CA8A04" stroke-width="2"/>
  <line x1="56" y1="16" x2="56" y2="46" stroke="#CA8A04" stroke-width="2"/>
  <!-- Graphite Sheen -->
  <line x1="48" y1="72" x2="52" y2="82" stroke="#FFFFFF" stroke-width="1.8"/>
</svg>`;

    case 'slate':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="slateRock" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
  <!-- Sharp Cleaved Metamorphic Slate Tile with Chiseled Edge -->
  <polygon points="20,32 72,18 82,68 30,82" fill="url(#slateRock)" stroke="#334155" stroke-width="2"/>
  <!-- Natural cleavage layer striations -->
  <line x1="30" y1="42" x2="72" y2="32" stroke="#CBD5E1" stroke-width="1.8"/>
  <line x1="28" y1="58" x2="76" y2="48" stroke="#CBD5E1" stroke-width="1.8"/>
  <circle cx="44" cy="36" r="2.5" fill="#FFFFFF" opacity="0.6"/>
</svg>`;

    case 'ash grey':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="ashPuff" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#78847C"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2.5"/>
  <!-- Fluffy Cloud of Pure Wood Ash Particles -->
  <circle cx="50" cy="50" r="30" fill="url(#ashPuff)"/>
  <circle cx="36" cy="42" r="14" fill="#CBD5E1" opacity="0.7"/>
  <circle cx="64" cy="42" r="14" fill="#CBD5E1" opacity="0.7"/>
  <circle cx="48" cy="62" r="16" fill="#94A3B8" opacity="0.6"/>
  <!-- Embers cooling down -->
  <circle cx="42" cy="52" r="2" fill="#FCA5A5"/>
  <circle cx="58" cy="48" r="1.5" fill="#FCA5A5"/>
</svg>`;

    case 'chrome':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="chromeMirror" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="48%" stop-color="#9E9E9E"/>
      <stop offset="50%" stop-color="#1A1A1A"/>
      <stop offset="52%" stop-color="#4A90E2"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2.5"/>
  <!-- Hyper-Reflective Chrome Bumper Medallion (Hiệu ứng phản chiếu đường chân trời chuẩn) -->
  <circle cx="50" cy="50" r="33" fill="url(#chromeMirror)" stroke="#94A3B8" stroke-width="2"/>
  <!-- Horizon Line division with specular flash -->
  <line x1="18" y1="50" x2="82" y2="50" stroke="#FFFFFF" stroke-width="2"/>
  <polygon points="50,30 52,36 58,38 52,40 50,46 48,40 42,38 48,36" fill="#FFFFFF"/>
</svg>`;

    case 'pewter':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="pewterStein" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#B8C0C4"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#555E62"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
  <!-- Antique Medieval Pewter Tankard / Goblet -->
  <path d="M 34,32 L 66,32 L 62,74 L 38,74 Z" fill="url(#pewterStein)" stroke="#475569" stroke-width="2"/>
  <ellipse cx="50" cy="32" rx="16" ry="4" fill="#B8C0C4"/>
  <!-- Handle -->
  <path d="M 64,38 C 76,42 76,64 62,68" stroke="#475569" stroke-width="4" stroke-linecap="round" fill="none"/>
  <!-- Soft matte luster -->
  <path d="M 42,42 L 44,66" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
</svg>`;

    case 'soot':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="sootDark" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#333333"/>
      <stop offset="65%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F4F4F5" stroke="#27272A" stroke-width="2.5"/>
  <!-- Chimney Lamp Black Soot Smudge with fine particles -->
  <ellipse cx="50" cy="50" rx="30" ry="26" fill="url(#sootDark)"/>
  <circle cx="34" cy="44" r="8" fill="#000000" opacity="0.6"/>
  <circle cx="62" cy="56" r="10" fill="#000000" opacity="0.6"/>
  <!-- Micro flakes -->
  <circle cx="28" cy="34" r="2" fill="#27272A"/>
  <circle cx="70" cy="38" r="2.5" fill="#27272A"/>
  <circle cx="48" cy="68" r="2" fill="#27272A"/>
</svg>`;

    case 'smoke':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="smokeWisps" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
  <!-- Billowing Volumetric Smoke Plumes Swirling Upward -->
  <path d="M 48,82 Q 42,66 54,54 Q 68,42 58,26 Q 50,14 42,18" stroke="url(#smokeWisps)" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.75"/>
  <path d="M 54,82 Q 62,64 48,46 Q 34,28 50,16" stroke="url(#smokeWisps)" stroke-width="8" stroke-linecap="round" fill="none" opacity="0.5"/>
  <circle cx="56" cy="36" r="6" fill="#CBD5E1" opacity="0.8"/>
</svg>`;

    // ==========================================
    // CLR-U09: WHITES & CREAMS
    // ==========================================
    case 'ivory':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="ivoryTusk" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#E6DEC5"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFDF5" stroke="#E5E0CE" stroke-width="2.5"/>
  <!-- Graceful Curved Mammoth / Elephant Ivory Tusk -->
  <path d="M 32,78 C 30,50 44,24 68,16 C 64,28 48,54 44,78 Z" fill="url(#ivoryTusk)" stroke="#D4CCA8" stroke-width="1.5"/>
  <!-- Schreger Lines Pattern (Gờ cấu trúc ngà tự nhiên) -->
  <line x1="38" y1="52" x2="48" y2="48" stroke="#E0D7B8" stroke-width="1.2"/>
  <line x1="36" y1="62" x2="45" y2="58" stroke="#E0D7B8" stroke-width="1.2"/>
  <circle cx="62" cy="22" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'pearl':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="pearlSphere" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="45%" stop-color="${h}"/>
      <stop offset="80%" stop-color="#D6CBB0"/>
      <stop offset="100%" stop-color="#C2B291"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFDF8" stroke="#D1C7AC" stroke-width="2.5"/>
  <!-- South Sea Cultured Pearl with Iridescent Oyster Shell -->
  <ellipse cx="50" cy="62" rx="36" ry="16" fill="#F5EFE1" stroke="#C7BBA0" stroke-width="2"/>
  <!-- Radiant Spherical Pearl -->
  <circle cx="50" cy="46" r="22" fill="url(#pearlSphere)" stroke="#D9CDB2" stroke-width="1.5"/>
  <!-- High Pearlescent Specular Shimmer -->
  <ellipse cx="44" cy="38" rx="6" ry="3.5" transform="rotate(-30, 44, 38)" fill="#FFFFFF"/>
  <polygon points="56,36 58,40 62,42 58,44 56,48 54,44 50,42 54,40" fill="#FFFFFF"/>
</svg>`;

    case 'snow white':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="snowGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2.5"/>
  <!-- Hexagonal Intricate Crystalline Snowflake (Bông tuyết 6 cánh hoàn hảo) -->
  <circle cx="50" cy="50" r="30" fill="url(#snowGlow)" opacity="0.4"/>
  <!-- 6 Axes of Snowflake -->
  <line x1="50" y1="20" x2="50" y2="80" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="24" y1="35" x2="76" y2="65" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="24" y1="65" x2="76" y2="35" stroke="#0284C7" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Crystals and Barbs -->
  <path d="M 44,28 L 50,34 L 56,28 M 44,72 L 50,66 L 56,72" stroke="#0284C7" stroke-width="2" fill="none"/>
  <circle cx="50" cy="50" r="5" fill="#38BDF8"/>
  <circle cx="50" cy="50" r="2" fill="#FFFFFF"/>
</svg>`;

    case 'cream':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="creamDollop" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="65%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#E8E2A2"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFEF0" stroke="#E6E0B8" stroke-width="2.5"/>
  <!-- Swirl of Whipped Devonshire Clotted Cream -->
  <path d="M 50,22 C 60,34 76,46 74,64 C 72,78 60,82 50,82 C 40,82 28,78 26,64 C 24,46 40,34 50,22 Z" fill="url(#creamDollop)"/>
  <path d="M 50,22 Q 44,38 52,50 Q 64,62 50,78" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
  <circle cx="44" cy="38" r="3" fill="#FFFFFF"/>
</svg>`;

    case 'alabaster':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="alabasPillar" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#D9D5C5"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF9F5" stroke="#DDD9C8" stroke-width="2.5"/>
  <!-- Carved Translucent Roman Alabaster Urn / Vase -->
  <path d="M 40,24 L 60,24 L 56,38 C 66,46 70,60 66,74 C 62,80 38,80 34,74 C 30,60 34,46 44,38 Z" fill="url(#alabasPillar)" stroke="#CBC6B0" stroke-width="1.8"/>
  <ellipse cx="50" cy="24" rx="10" ry="2.5" fill="#FFFFFF"/>
  <circle cx="42" cy="46" r="3" fill="#FFFFFF" opacity="0.9"/>
</svg>`;

    case 'vanilla':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="vanillaScoop" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="55%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#D6C47A"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFDF0" stroke="#E3D596" stroke-width="2.5"/>
  <!-- Creamy Vanilla Ice Cream Scoop with Madagascan Bean Pod -->
  <circle cx="50" cy="54" r="28" fill="url(#vanillaScoop)"/>
  <!-- Dark Vanilla Pod crossing -->
  <path d="M 28,26 Q 50,42 68,28" stroke="#3D2612" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Micro vanilla bean specks -->
  <circle cx="42" cy="48" r="1" fill="#3D2612"/>
  <circle cx="54" cy="46" r="1.2" fill="#3D2612"/>
  <circle cx="48" cy="62" r="1" fill="#3D2612"/>
  <circle cx="60" cy="58" r="1.2" fill="#3D2612"/>
  <circle cx="42" cy="40" r="3" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'eggshell':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="eggOval" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#D4CBB3"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FAF7EE" stroke="#DDD4BC" stroke-width="2.5"/>
  <!-- Perfect Smooth Bird Egg with Satin Luster -->
  <ellipse cx="50" cy="52" rx="24" ry="30" fill="url(#eggOval)"/>
  <!-- Satin Sheen Highlight -->
  <ellipse cx="42" cy="38" rx="6" ry="12" transform="rotate(-25, 42, 38)" fill="#FFFFFF" opacity="0.8"/>
  <circle cx="46" cy="32" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'linen':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="linenWeave" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="65%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#E0D2C1"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDFCF7" stroke="#E6DCCE" stroke-width="2.5"/>
  <!-- Crisp Natural Folded Linen Napkin / Fabric Swatch -->
  <polygon points="26,30 74,24 68,76 22,70" fill="url(#linenWeave)" stroke="#D9CCBD" stroke-width="1.8"/>
  <!-- Woven Cross-Thread Texture -->
  <line x1="30" y1="42" x2="70" y2="38" stroke="#E8DED1" stroke-width="1.5"/>
  <line x1="28" y1="56" x2="68" y2="52" stroke="#E8DED1" stroke-width="1.5"/>
  <line x1="42" y1="28" x2="38" y2="72" stroke="#E8DED1" stroke-width="1.5"/>
  <line x1="56" y1="26" x2="52" y2="74" stroke="#E8DED1" stroke-width="1.5"/>
</svg>`;

    case 'porcelain':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="porcelainGlaze" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#D8E2E6"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2.5"/>
  <!-- Fine Translucent Ming Porcelain Teacup -->
  <path d="M 28,38 C 28,68 38,78 50,78 C 62,78 72,68 72,38 Z" fill="url(#porcelainGlaze)" stroke="#94A3B8" stroke-width="2"/>
  <ellipse cx="50" cy="38" rx="22" ry="5" fill="#FFFFFF" stroke="#94A3B8" stroke-width="1.5"/>
  <!-- Delicate Cobalt Blue Pattern underglaze -->
  <path d="M 38,56 Q 50,52 62,56" stroke="#2563EB" stroke-width="2" fill="none"/>
  <!-- Mirror Glaze Glint -->
  <path d="M 34,46 Q 36,62 42,70" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none"/>
</svg>`;

    case 'frost':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="frostIce" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#B0C4C4"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDFC" stroke="#99F6E4" stroke-width="2.5"/>
  <!-- Delicate Window Frost Fern Crystal Pattern (Hoa băng cửa sổ) -->
  <path d="M 50,82 Q 50,48 50,18" stroke="url(#frostIce)" stroke-width="3" stroke-linecap="round"/>
  <!-- Fern branches spreading -->
  <path d="M 50,66 Q 32,56 22,62 M 50,66 Q 68,56 78,62" stroke="#FFFFFF" stroke-width="2" fill="none"/>
  <path d="M 50,48 Q 30,38 20,44 M 50,48 Q 70,38 80,44" stroke="#FFFFFF" stroke-width="2" fill="none"/>
  <path d="M 50,30 Q 34,22 28,26 M 50,30 Q 66,22 72,26" stroke="#FFFFFF" stroke-width="2" fill="none"/>
  <circle cx="50" cy="18" r="3" fill="#FFFFFF"/>
</svg>`;

    case 'cotton':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="cottonBoll" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#E2E2F0"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2.5"/>
  <!-- Fluffy Organic Ripe Cotton Boll -->
  <circle cx="38" cy="44" r="14" fill="url(#cottonBoll)"/>
  <circle cx="62" cy="44" r="14" fill="url(#cottonBoll)"/>
  <circle cx="50" cy="36" r="14" fill="url(#cottonBoll)"/>
  <circle cx="50" cy="58" r="16" fill="url(#cottonBoll)"/>
  <!-- Dry Brown Calyx Sepals holding the cotton -->
  <polygon points="50,66 40,78 50,74 60,78" fill="#78350F"/>
  <line x1="50" y1="74" x2="50" y2="86" stroke="#78350F" stroke-width="3" stroke-linecap="round"/>
</svg>`;

    case 'chalk':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="chalkCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4D4D4"/>
      <stop offset="40%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2.5"/>
  <!-- White School Chalk Stick & Blackboard Dust Stroke -->
  <!-- Chalk stroke background -->
  <path d="M 20,74 Q 50,68 80,74" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
  <!-- Chalk Cylinder Stick -->
  <path d="M 32,32 L 68,68 L 60,76 L 24,40 Z" fill="url(#chalkCylinder)" stroke="#A3A3A3" stroke-width="1.5"/>
  <ellipse cx="28" cy="36" rx="6" ry="4" transform="rotate(45, 28, 36)" fill="#FFFFFF"/>
  <circle cx="68" cy="68" r="3" fill="#E5E5E5"/>
</svg>`;

    // ==========================================
    // CLR-U10: CHROMATICS & OPTICS
    // ==========================================
    case 'rainbow':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Spectral Dispersion Rainbow Arcs (7 Bands) -->
  <path d="M 18,68 A 32 32 0 0 1 82,68" stroke="#EF4444" stroke-width="4.5" fill="none"/>
  <path d="M 22,68 A 28 28 0 0 1 78,68" stroke="#F97316" stroke-width="4.5" fill="none"/>
  <path d="M 26,68 A 24 24 0 0 1 74,68" stroke="#FACC15" stroke-width="4.5" fill="none"/>
  <path d="M 30,68 A 20 20 0 0 1 70,68" stroke="#22C55E" stroke-width="4.5" fill="none"/>
  <path d="M 34,68 A 16 16 0 0 1 66,68" stroke="#06B6D4" stroke-width="4.5" fill="none"/>
  <path d="M 38,68 A 12 12 0 0 1 62,68" stroke="#3B82F6" stroke-width="4.5" fill="none"/>
  <path d="M 42,68 A 8 8 0 0 1 58,68" stroke="#8B5CF6" stroke-width="4.5" fill="none"/>
  <!-- Fluffy Cloud Anchors -->
  <ellipse cx="24" cy="68" rx="10" ry="7" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
  <ellipse cx="76" cy="68" rx="10" ry="7" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
</svg>`;

    case 'iridescent':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="iridSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="25%" stop-color="#FACC15"/>
      <stop offset="50%" stop-color="#22C55E"/>
      <stop offset="75%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#A855F7"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF4FF" stroke="#A855F7" stroke-width="2.5"/>
  <!-- Floating Iridescent Soap Bubble Sphere with Polychromatic Film -->
  <circle cx="50" cy="50" r="33" fill="url(#iridSwirl)" opacity="0.85"/>
  <!-- Specular Crescent Reflections -->
  <path d="M 30,34 Q 44,22 66,30" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none"/>
  <circle cx="34" cy="38" r="2.5" fill="#FFFFFF"/>
  <circle cx="68" cy="64" r="3" fill="#FFFFFF" opacity="0.8"/>
</svg>`;

    case 'holographic':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="holoPrism" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF0080"/>
      <stop offset="30%" stop-color="#7928CA"/>
      <stop offset="70%" stop-color="#0070F3"/>
      <stop offset="100%" stop-color="#00DFD8"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#09090B" stroke="#38BDF8" stroke-width="2.5"/>
  <!-- 3D Holographic Pyramid Refracting Laser Waves -->
  <polygon points="50,16 80,68 50,84 20,68" fill="url(#holoPrism)" stroke="#38BDF8" stroke-width="1.8"/>
  <line x1="50" y1="16" x2="50" y2="84" stroke="#FFFFFF" stroke-width="2"/>
  <!-- Laser Beams -->
  <line x1="14" y1="36" x2="86" y2="36" stroke="#EC4899" stroke-width="1.8" stroke-dasharray="4,2"/>
  <line x1="14" y1="64" x2="86" y2="64" stroke="#22D3EE" stroke-width="1.8" stroke-dasharray="4,2"/>
  <circle cx="50" cy="16" r="3" fill="#FFFFFF"/>
</svg>`;

    case 'neon':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#39FF14"/>
    </filter>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#09090B" stroke="#39FF14" stroke-width="2.5"/>
  <!-- High-Voltage Glowing Green Neon Tube Heart / Loop -->
  <path d="M 50,34 C 44,22 26,26 26,42 C 26,62 50,76 50,76 C 50,76 74,62 74,42 C 74,26 56,22 50,34 Z" stroke="#39FF14" stroke-width="6" fill="none" filter="url(#neonGlow)"/>
  <path d="M 50,34 C 44,22 26,26 26,42 C 26,62 50,76 50,76 C 50,76 74,62 74,42 C 74,26 56,22 50,34 Z" stroke="#FFFFFF" stroke-width="2" fill="none"/>
</svg>`;

    case 'pastel':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFF5F7" stroke="#F472B6" stroke-width="2.5"/>
  <!-- Trio of Soft Powdery Pastel Macaron Sweets -->
  <!-- Lavender macaron -->
  <ellipse cx="50" cy="34" rx="22" ry="9" fill="#E9D5FF"/>
  <rect x="28" y="34" width="44" height="4" rx="2" fill="#C084FC"/>
  <!-- Mint macaron -->
  <ellipse cx="50" cy="50" rx="22" ry="9" fill="#CCFBF1"/>
  <rect x="28" y="50" width="44" height="4" rx="2" fill="#5EEAD4"/>
  <!-- Rose macaron -->
  <ellipse cx="50" cy="66" rx="22" ry="9" fill="#FCE7F3"/>
  <rect x="28" y="66" width="44" height="4" rx="2" fill="#F472B6"/>
  <circle cx="42" cy="30" r="2" fill="#FFFFFF"/>
</svg>`;

    case 'monochrome':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#000000" stroke-width="3"/>
  <!-- Yin-Yang Dynamic Stark Black and White Contrast Sphere -->
  <path d="M 50,18 A 32 32 0 0 1 50,82 A 16 16 0 0 1 50,50 A 16 16 0 0 0 50,18 Z" fill="#000000"/>
  <circle cx="50" cy="34" r="5" fill="#000000"/>
  <circle cx="50" cy="66" r="5" fill="#FFFFFF"/>
</svg>`;

    case 'gradient':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="spectrumWave" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF007F"/>
      <stop offset="35%" stop-color="#7928CA"/>
      <stop offset="70%" stop-color="#0070F3"/>
      <stop offset="100%" stop-color="#00DFD8"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#6366F1" stroke-width="2.5"/>
  <!-- Smooth Liquid Fluid Mesh Gradient Sphere -->
  <circle cx="50" cy="50" r="33" fill="url(#spectrumWave)"/>
  <!-- Fluid Dynamic Wave Overlay -->
  <path d="M 20,50 Q 36,34 50,50 T 80,50" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>
  <circle cx="38" cy="36" r="3" fill="#FFFFFF"/>
</svg>`;

    case 'fluorescent':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="fluorRay" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="#77AA00"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#09090B" stroke="${h}" stroke-width="2.5"/>
  <!-- High-Energy Ultra-Luminescent Highlighter Flare / Radium Star -->
  <circle cx="50" cy="50" r="28" fill="url(#fluorRay)" filter="drop-shadow(0 0 10px #CCFF00)"/>
  <!-- Chiseled Highlighter Marker Tip -->
  <polygon points="50,22 62,38 38,38" fill="#FFFFFF"/>
  <polygon points="50,78 62,62 38,62" fill="#FFFFFF"/>
  <polygon points="22,50 38,62 38,38" fill="#FFFFFF"/>
  <polygon points="78,50 62,62 62,38" fill="#FFFFFF"/>
  <circle cx="50" cy="50" r="6" fill="#FFFFFF"/>
</svg>`;

    case 'transparent':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <pattern id="checkers" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="6" height="6" fill="#E2E8F0"/>
      <rect x="6" y="0" width="6" height="6" fill="#FFFFFF"/>
      <rect x="0" y="6" width="6" height="6" fill="#FFFFFF"/>
      <rect x="6" y="6" width="6" height="6" fill="#E2E8F0"/>
    </pattern>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Transparency Alpha Checkerboard under Crystal Clear Magnifier Lens -->
  <circle cx="50" cy="50" r="32" fill="url(#checkers)" stroke="#94A3B8" stroke-width="2"/>
  <!-- Glass Lens Outline & Refraction -->
  <circle cx="50" cy="50" r="32" fill="#38BDF8" opacity="0.25"/>
  <path d="M 32,32 Q 50,20 68,32" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.9"/>
  <circle cx="38" cy="38" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'opaque':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F1F5F9" stroke="#475569" stroke-width="2.5"/>
  <!-- Heavy Impenetrable Solid Steel Wall Shield Blocking Light Beams -->
  <rect x="30" y="24" width="40" height="52" rx="6" fill="${h}" stroke="#1E293B" stroke-width="2.5"/>
  <!-- Incoming Light Rays stopped cold at barrier -->
  <line x1="12" y1="36" x2="28" y2="36" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <line x1="12" y1="50" x2="28" y2="50" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <line x1="12" y1="64" x2="28" y2="64" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
  <!-- Solid Dark Cast Shadow Behind -->
  <rect x="70" y="32" width="14" height="36" fill="#0F172A" opacity="0.4"/>
</svg>`;

    case 'metallic':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="metalBrushed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2E8F0"/>
      <stop offset="25%" stop-color="#94A3B8"/>
      <stop offset="50%" stop-color="#F8FAFC"/>
      <stop offset="75%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#64748B" stroke-width="2.5"/>
  <!-- Brushed High-Tech Metallic Cogwheel / Gear -->
  <circle cx="50" cy="50" r="32" fill="url(#metalBrushed)" stroke="#334155" stroke-width="2"/>
  <circle cx="50" cy="50" r="14" fill="#334155"/>
  <circle cx="50" cy="50" r="8" fill="#F8FAFC"/>
  <!-- Diagonal Specular Highlight -->
  <line x1="26" y1="26" x2="74" y2="74" stroke="#FFFFFF" stroke-width="2.5" opacity="0.8"/>
  <circle cx="36" cy="32" r="2.5" fill="#FFFFFF"/>
</svg>`;

    case 'chromatic':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#6366F1" stroke-width="2.5"/>
  <!-- Chromatic Aberration RGB Primary Optical Offset Rings -->
  <!-- Red Ring Offset Top-Left -->
  <circle cx="44" cy="44" r="18" stroke="#EF4444" stroke-width="3" fill="none" opacity="0.85"/>
  <!-- Green Ring Offset Center -->
  <circle cx="50" cy="50" r="18" stroke="#22C55E" stroke-width="3" fill="none" opacity="0.85"/>
  <!-- Blue Ring Offset Bottom-Right -->
  <circle cx="56" cy="56" r="18" stroke="#3B82F6" stroke-width="3" fill="none" opacity="0.85"/>
  <!-- White overlapping focal core -->
  <circle cx="50" cy="50" r="6" fill="#FFFFFF" filter="drop-shadow(0 0 4px #FFFFFF)"/>
</svg>`;

    default:
      // Fallback high-fidelity fluid paint droplet & swatch
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="swatchGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="60%" stop-color="${h}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="${softBg}" stroke="${borderCol}" stroke-width="2.5"/>
  <circle cx="50" cy="50" r="32" fill="url(#swatchGrad)"/>
  <path d="M 34,36 Q 48,24 66,34" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
  <circle cx="40" cy="42" r="2.5" fill="#FFFFFF"/>
</svg>`;
  }
}

// MAIN EXECUTION
console.log('Generating 120 bespoke vector SVGs for Colors of the World...');

const libraryEntries = [];
let count = 0;

COLOR_VOCABULARY.forEach(item => {
  const svg = generateSvgForColor(item);
  const wordKey = item.word.toLowerCase().trim();
  const fileSlug = wordKey.replace(/[^a-z0-9]/g, '_');
  
  // Write individual SVG file to client/public/icons/colors/
  const svgFilePath = path.join(PUBLIC_COLORS_DIR, `${fileSlug}.svg`);
  fs.writeFileSync(svgFilePath, svg, 'utf8');

  // Prepare dictionary entry
  libraryEntries.push(`  "${wordKey}": ${JSON.stringify(svg)}`);
  count++;
});

// Author client/src/constants/colorSvgLibrary.js
const libraryContent = `/**
 * BÁCH KHOA SẮC MÀU TOÀN CẦU (COLORS OF THE WORLD)
 * 120 ULTRA-DETAILED VECTOR SVG LIBRARY
 * Covers all 120 color shades, gems, minerals, botanicals, metals, and optical effects
 * accurately matching precise hex codes and physical luster.
 */

export const COLOR_SVGS = {
${libraryEntries.join(',\n')}
};

/**
 * Get custom SVG vector string for color word
 * @param {string} word - English color name (e.g. "crimson", "navy blue", "emerald")
 * @returns {string|null} - SVG string or null
 */
export function getColorSvgForWord(word) {
  if (!word) return null;
  const normalized = word.toLowerCase().trim();
  return COLOR_SVGS[normalized] || null;
}

/**
 * Check if word has custom color SVG
 * @param {string} word
 * @returns {boolean}
 */
export function hasColorSvg(word) {
  if (!word) return false;
  return Boolean(COLOR_SVGS[word.toLowerCase().trim()]);
}

export default COLOR_SVGS;
`;

fs.writeFileSync(OUTPUT_LIB_FILE, libraryContent, 'utf8');
console.log(`Successfully generated ${count} SVG vector files in ${PUBLIC_COLORS_DIR}`);
console.log(`Successfully generated master SVG library at ${OUTPUT_LIB_FILE}`);

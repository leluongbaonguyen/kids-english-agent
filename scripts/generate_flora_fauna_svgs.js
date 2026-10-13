/**
 * GENERATE ULTRA-DETAILED FLORA & FAUNA VECTOR SVG ICONS
 * Generates custom, anatomically accurate, beautifully styled vector SVG icons
 * for all 58+ vocabulary words requiring custom illustration based on the review report.
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../client/public/icons/flora_fauna');
fs.mkdirSync(publicDir, { recursive: true });

// Registry of ultra-detailed custom SVG illustrations (viewBox 0 0 100 100)
const SVG_REGISTRY = {
  // =========================================================================
  // BIO-U01: THÚ THẢO NGUYÊN (SAVANNAH)
  // =========================================================================
  cheetah: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="cheetahGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="cheetahEar" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
  </defs>
  <!-- Background Badge Glow -->
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2.5"/>
  <!-- Head base -->
  <path d="M 30,38 C 22,46 24,66 32,74 C 40,82 60,82 68,74 C 76,66 78,46 70,38 C 65,30 35,30 30,38 Z" fill="url(#cheetahGold)"/>
  <!-- Ears -->
  <circle cx="28" cy="30" r="9" fill="url(#cheetahEar)"/>
  <circle cx="28" cy="30" r="5" fill="#FDE68A"/>
  <circle cx="72" cy="30" r="9" fill="url(#cheetahEar)"/>
  <circle cx="72" cy="30" r="5" fill="#FDE68A"/>
  <!-- White Muzzle -->
  <ellipse cx="50" cy="67" rx="14" ry="11" fill="#FFFBEB"/>
  <ellipse cx="50" cy="62" rx="5.5" ry="3.5" fill="#18181B"/>
  <path d="M 50,65 L 50,71 M 44,70 C 47,73 53,73 56,70" stroke="#18181B" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Golden Eyes with Round Pupils -->
  <ellipse cx="38" cy="48" rx="6" ry="5" fill="#FBBF24"/>
  <ellipse cx="62" cy="48" rx="6" ry="5" fill="#FBBF24"/>
  <circle cx="38" cy="48" r="3.2" fill="#09090B"/>
  <circle cx="62" cy="48" r="3.2" fill="#09090B"/>
  <circle cx="36" cy="46" r="1.2" fill="#FFFFFF"/>
  <circle cx="60" cy="46" r="1.2" fill="#FFFFFF"/>
  <!-- SIGNATURE TEAR STRIPES (Vệt đen nước mắt từ khóe mắt đến khóe miệng) -->
  <path d="M 40,51 Q 42,60 44,69" stroke="#000000" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M 60,51 Q 58,60 56,69" stroke="#000000" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Solid Round Cheetah Spots (Đốm đen tròn đặc trưng) -->
  <circle cx="50" cy="34" r="2.2" fill="#18181B"/>
  <circle cx="44" cy="37" r="2" fill="#18181B"/>
  <circle cx="56" cy="37" r="2" fill="#18181B"/>
  <circle cx="32" cy="50" r="2.2" fill="#18181B"/>
  <circle cx="68" cy="50" r="2.2" fill="#18181B"/>
  <circle cx="30" cy="60" r="2.5" fill="#18181B"/>
  <circle cx="70" cy="60" r="2.5" fill="#18181B"/>
  <circle cx="35" cy="68" r="2.2" fill="#18181B"/>
  <circle cx="65" cy="68" r="2.2" fill="#18181B"/>
</svg>`,

  hyena: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="hyenaBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A16207"/>
      <stop offset="50%" stop-color="#78350F"/>
      <stop offset="100%" stop-color="#451A03"/>
    </linearGradient>
    <linearGradient id="hyenaEars" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#451A03"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F5F4" stroke="#78350F" stroke-width="2.5"/>
  <!-- Massive High Shoulders & Sloping Silhouette -->
  <path d="M 20,82 C 22,58 32,42 50,42 C 68,42 78,58 80,82 Z" fill="#B45309"/>
  <!-- Head Profile -->
  <ellipse cx="50" cy="52" rx="22" ry="20" fill="url(#hyenaBody)"/>
  <!-- Large Round Broad Ears (Tai tròn to) -->
  <circle cx="26" cy="32" r="12" fill="url(#hyenaEars)"/>
  <circle cx="26" cy="32" r="7" fill="#CA8A04"/>
  <circle cx="74" cy="32" r="12" fill="url(#hyenaEars)"/>
  <circle cx="74" cy="32" r="7" fill="#CA8A04"/>
  <!-- Coarse Erect Neck Mane (Bờm dựng đứng gáy) -->
  <path d="M 45,26 L 47,36 M 50,23 L 50,34 M 55,26 L 53,36" stroke="#292524" stroke-width="3" stroke-linecap="round"/>
  <!-- Heavy Dark Muzzle (Mõm to đen quai hàm khỏe) -->
  <ellipse cx="50" cy="64" rx="13" ry="10" fill="#1C1917"/>
  <ellipse cx="50" cy="58" rx="6" ry="3.5" fill="#000000"/>
  <!-- Laughing/Smirking mouth with fangs -->
  <path d="M 42,67 Q 50,72 58,67" stroke="#E7E5E4" stroke-width="2" fill="none"/>
  <polygon points="44,67 46,71 48,67" fill="#FFFFFF"/>
  <polygon points="56,67 54,71 52,67" fill="#FFFFFF"/>
  <!-- Cunning Amber Eyes -->
  <circle cx="39" cy="48" r="4.5" fill="#EAB308"/>
  <circle cx="61" cy="48" r="4.5" fill="#EAB308"/>
  <circle cx="39" cy="48" r="2.5" fill="#000000"/>
  <circle cx="61" cy="48" r="2.5" fill="#000000"/>
  <!-- Irregular Spotted Body Marks (Đốm nâu đen) -->
  <circle cx="28" cy="68" r="3" fill="#292524"/>
  <circle cx="72" cy="68" r="3" fill="#292524"/>
  <circle cx="32" cy="78" r="3.5" fill="#292524"/>
  <circle cx="68" cy="78" r="3.5" fill="#292524"/>
  <circle cx="50" cy="80" r="3" fill="#292524"/>
</svg>`,

  antelope: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="antelopeCoat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <linearGradient id="hornGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#18181B"/>
      <stop offset="100%" stop-color="#52525B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <!-- Slender Head Profile -->
  <path d="M 38,40 Q 32,58 42,75 Q 50,82 58,75 Q 68,58 62,40 Z" fill="url(#antelopeCoat)"/>
  <!-- Slender Pointed Ears -->
  <ellipse cx="26" cy="38" rx="10" ry="4.5" transform="rotate(-35, 26, 38)" fill="url(#antelopeCoat)"/>
  <ellipse cx="26" cy="38" rx="7" ry="2.5" transform="rotate(-35, 26, 38)" fill="#FEF08A"/>
  <ellipse cx="74" cy="38" rx="10" ry="4.5" transform="rotate(35, 74, 38)" fill="url(#antelopeCoat)"/>
  <ellipse cx="74" cy="38" rx="7" ry="2.5" transform="rotate(35, 74, 38)" fill="#FEF08A"/>
  <!-- DISTINCTIVE SLENDER RIDGED HORNS (Sừng linh dương dài cong vuốt nhọn, không phải gạc) -->
  <path d="M 42,40 C 40,24 35,16 38,10 C 41,16 45,26 44,40 Z" fill="url(#hornGrad)"/>
  <path d="M 58,40 C 60,24 65,16 62,10 C 59,16 55,26 56,40 Z" fill="url(#hornGrad)"/>
  <!-- Ring ridges on horns -->
  <line x1="39" y1="20" x2="43" y2="21" stroke="#A1A1AA" stroke-width="1.2"/>
  <line x1="38" y1="26" x2="43" y2="27" stroke="#A1A1AA" stroke-width="1.2"/>
  <line x1="37" y1="32" x2="44" y2="33" stroke="#A1A1AA" stroke-width="1.2"/>
  <line x1="61" y1="20" x2="57" y2="21" stroke="#A1A1AA" stroke-width="1.2"/>
  <line x1="62" y1="26" x2="57" y2="27" stroke="#A1A1AA" stroke-width="1.2"/>
  <line x1="63" y1="32" x2="56" y2="33" stroke="#A1A1AA" stroke-width="1.2"/>
  <!-- Facial Markings (Sọc đen trắng thanh nhã) -->
  <path d="M 40,50 L 44,68" stroke="#18181B" stroke-width="1.8"/>
  <path d="M 60,50 L 56,68" stroke="#18181B" stroke-width="1.8"/>
  <ellipse cx="50" cy="74" rx="7" ry="5" fill="#FFFFFF"/>
  <ellipse cx="50" cy="72" rx="3.5" ry="2" fill="#18181B"/>
  <!-- Large Gentle Dark Eyes -->
  <circle cx="36" cy="52" r="4.5" fill="#18181B"/>
  <circle cx="64" cy="52" r="4.5" fill="#18181B"/>
  <circle cx="35" cy="50" r="1.5" fill="#FFFFFF"/>
  <circle cx="63" cy="50" r="1.5" fill="#FFFFFF"/>
</svg>`,

  warthog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="wartCoat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78716C"/>
      <stop offset="100%" stop-color="#44403C"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F5F4" stroke="#57534E" stroke-width="2.5"/>
  <!-- Head -->
  <ellipse cx="50" cy="54" rx="24" ry="22" fill="url(#wartCoat)"/>
  <!-- Pointed Tufted Ears -->
  <polygon points="26,38 18,22 32,32" fill="#44403C"/>
  <polygon points="74,38 82,22 68,32" fill="#44403C"/>
  <!-- Coarse Dorsal Bristles (Bờm lông cứng trên đầu) -->
  <path d="M 42,26 L 44,34 M 47,22 L 48,34 M 53,22 L 52,34 M 58,26 L 56,34" stroke="#1C1917" stroke-width="3" stroke-linecap="round"/>
  <!-- Broad Flat Pig Snout -->
  <ellipse cx="50" cy="62" rx="12" ry="9" fill="#292524"/>
  <ellipse cx="46" cy="62" rx="3" ry="4" fill="#0C0A09"/>
  <ellipse cx="54" cy="62" rx="3" ry="4" fill="#0C0A09"/>
  <!-- 4 PROMINENT FACIAL WARTS (4 nốt sần bướu trên mặt) -->
  <circle cx="33" cy="52" r="4.5" fill="#78716C" stroke="#292524" stroke-width="1.5"/>
  <circle cx="67" cy="52" r="4.5" fill="#78716C" stroke="#292524" stroke-width="1.5"/>
  <circle cx="36" cy="65" r="3.5" fill="#78716C" stroke="#292524" stroke-width="1.5"/>
  <circle cx="64" cy="65" r="3.5" fill="#78716C" stroke="#292524" stroke-width="1.5"/>
  <!-- MASSIVE CURVED IVORY TUSKS (Cặp nanh cong vút lên trên) -->
  <path d="M 38,68 C 22,68 18,48 24,42 C 24,48 28,62 38,65 Z" fill="#F5F5F4" stroke="#D6D3D1" stroke-width="1"/>
  <path d="M 62,68 C 78,68 82,48 76,42 C 76,48 72,62 62,65 Z" fill="#F5F5F4" stroke="#D6D3D1" stroke-width="1"/>
  <!-- Small Sharp Eyes -->
  <circle cx="41" cy="46" r="3" fill="#0C0A09"/>
  <circle cx="59" cy="46" r="3" fill="#0C0A09"/>
  <circle cx="40" cy="45" r="1" fill="#FFFFFF"/>
  <circle cx="58" cy="45" r="1" fill="#FFFFFF"/>
</svg>`,

  meerkat: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="meerkatBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="50%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <!-- Long slender tripod tail supporting body -->
  <path d="M 38,82 Q 22,85 16,90 Q 22,80 40,76 Z" fill="#78350F"/>
  <!-- UPRIGHT STANDING BODY SENTINEL (Dáng đứng thẳng canh gác) -->
  <path d="M 40,38 C 38,50 36,75 42,86 C 48,87 56,87 62,86 C 66,75 64,50 62,38 Z" fill="url(#meerkatBody)"/>
  <!-- Pale belly patch -->
  <ellipse cx="51" cy="64" rx="7" ry="14" fill="#FEF9C3"/>
  <!-- Alert Little Paws folded on chest -->
  <ellipse cx="44" cy="56" rx="4" ry="2.5" transform="rotate(25, 44, 56)" fill="#78350F"/>
  <ellipse cx="58" cy="56" rx="4" ry="2.5" transform="rotate(-25, 58, 56)" fill="#78350F"/>
  <!-- Slender Head with pointed snout -->
  <ellipse cx="51" cy="30" rx="13" ry="11" fill="url(#meerkatBody)"/>
  <!-- Small Crescent Black Ears -->
  <circle cx="39" cy="24" r="3.5" fill="#1C1917"/>
  <circle cx="63" cy="24" r="3.5" fill="#1C1917"/>
  <!-- SIGNATURE BLACK EYE PATCHES (Viền mắt đen như kính râm) -->
  <ellipse cx="45" cy="29" rx="4.5" ry="3.5" fill="#1C1917"/>
  <ellipse cx="57" cy="29" rx="4.5" ry="3.5" fill="#1C1917"/>
  <!-- Bright Inquisitive Eyes -->
  <circle cx="45" cy="29" r="2.2" fill="#F59E0B"/>
  <circle cx="57" cy="29" r="2.2" fill="#F59E0B"/>
  <circle cx="45" cy="29" r="1.3" fill="#000000"/>
  <circle cx="57" cy="29" r="1.3" fill="#000000"/>
  <circle cx="44.3" cy="28.3" r="0.6" fill="#FFFFFF"/>
  <circle cx="56.3" cy="28.3" r="0.6" fill="#FFFFFF"/>
  <!-- Snout & Nose tip -->
  <ellipse cx="51" cy="36" rx="4" ry="3" fill="#FEF08A"/>
  <circle cx="51" cy="35" r="1.8" fill="#18181B"/>
  <!-- Back stripes -->
  <line x1="44" y1="46" x2="58" y2="46" stroke="#78350F" stroke-width="1.8" stroke-linecap="round"/>
  <line x1="43" y1="50" x2="59" y2="50" stroke="#78350F" stroke-width="1.8" stroke-linecap="round"/>
</svg>`,

  wildebeest: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gnuCoat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#57534E"/>
      <stop offset="100%" stop-color="#292524"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#E7E5E4" stroke="#44403C" stroke-width="2.5"/>
  <!-- Heavy Elongated Head -->
  <path d="M 38,36 L 62,36 L 58,74 L 42,74 Z" fill="url(#gnuCoat)"/>
  <!-- Broad Flat Horn Boss & CURVED SIDEWAYS HORNS (Cặp sừng uốn ngang rồi quặp nhọn) -->
  <path d="M 38,36 C 22,34 16,42 18,30 C 20,24 30,22 42,32 Z" fill="#1C1917"/>
  <path d="M 62,36 C 78,34 84,42 82,30 C 80,24 70,22 58,32 Z" fill="#1C1917"/>
  <rect x="36" y="32" width="28" height="6" rx="3" fill="#1C1917"/>
  <!-- Ears below horns -->
  <ellipse cx="26" cy="42" rx="7" ry="3.5" transform="rotate(-15, 26, 42)" fill="#44403C"/>
  <ellipse cx="74" cy="42" rx="7" ry="3.5" transform="rotate(15, 74, 42)" fill="#44403C"/>
  <!-- ERECT DORSAL MANE (Bờm đen dựng đứng sau gáy) -->
  <path d="M 40,24 L 42,32 M 45,20 L 46,32 M 50,18 L 50,32 M 55,20 L 54,32 M 60,24 L 58,32" stroke="#0C0A09" stroke-width="3" stroke-linecap="round"/>
  <!-- Long Snout & Broad Muzzle -->
  <rect x="42" y="66" width="16" height="12" rx="4" fill="#0C0A09"/>
  <circle cx="46" cy="72" r="2" fill="#44403C"/>
  <circle cx="54" cy="72" r="2" fill="#44403C"/>
  <!-- LONG SHAGGY BEARD UNDER CHIN (Chòm râu dài dưới cằm) -->
  <path d="M 44,78 C 42,88 46,92 50,92 C 54,92 58,88 56,78 Z" fill="#0C0A09"/>
  <!-- Eyes with prominent lateral ridge -->
  <circle cx="36" cy="46" r="3.5" fill="#0C0A09"/>
  <circle cx="64" cy="46" r="3.5" fill="#0C0A09"/>
  <circle cx="35" cy="45" r="1" fill="#FFFFFF"/>
  <circle cx="63" cy="45" r="1" fill="#FFFFFF"/>
</svg>`,

  // =========================================================================
  // BIO-U02: ĐỘNG VẬT RỪNG NHIỆT ĐỚI (JUNGLE)
  // =========================================================================
  jaguar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="jaguarGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#B45309" stroke-width="2.5"/>
  <!-- Heavy Muscular Jaguar Head (Đầu to vạm vỡ, hàm khỏe) -->
  <ellipse cx="50" cy="52" rx="27" ry="24" fill="url(#jaguarGold)"/>
  <!-- Rounded Ears with black backs and light centers -->
  <circle cx="28" cy="32" r="10" fill="#18181B"/>
  <circle cx="28" cy="32" r="6" fill="#FDE68A"/>
  <circle cx="72" cy="32" r="10" fill="#18181B"/>
  <circle cx="72" cy="32" r="6" fill="#FDE68A"/>
  <!-- Broad Muzzle -->
  <ellipse cx="50" cy="66" rx="14" ry="11" fill="#FFFBEB"/>
  <polygon points="50,60 44,56 56,56" fill="#BE123C"/>
  <path d="M 50,60 L 50,67 M 43,67 Q 50,71 57,67" stroke="#18181B" stroke-width="2" fill="none"/>
  <!-- Amber-Green Intense Eyes -->
  <ellipse cx="38" cy="48" rx="5.5" ry="4.5" fill="#84CC16"/>
  <ellipse cx="62" cy="48" rx="5.5" ry="4.5" fill="#84CC16"/>
  <circle cx="38" cy="48" r="2.8" fill="#000000"/>
  <circle cx="62" cy="48" r="2.8" fill="#000000"/>
  <circle cx="36.5" cy="46.5" r="1" fill="#FFFFFF"/>
  <circle cx="60.5" cy="46.5" r="1" fill="#FFFFFF"/>
  <!-- SIGNATURE JAGUAR ROSETTES WITH CENTRAL BLACK SPOTS (Đốm hoa có chấm đen ở giữa) -->
  <!-- Rosette 1 (trán) -->
  <path d="M 48,34 Q 50,32 52,34 M 53,37 Q 52,40 50,39 M 47,38 Q 48,35 48,34" stroke="#18181B" stroke-width="1.8" fill="none"/>
  <circle cx="50" cy="36" r="1" fill="#18181B"/>
  <!-- Rosette 2 (má trái) -->
  <circle cx="30" cy="54" r="4.5" stroke="#18181B" stroke-width="2" stroke-dasharray="3,2" fill="none"/>
  <circle cx="30" cy="54" r="1.3" fill="#18181B"/>
  <!-- Rosette 3 (má phải) -->
  <circle cx="70" cy="54" r="4.5" stroke="#18181B" stroke-width="2" stroke-dasharray="3,2" fill="none"/>
  <circle cx="70" cy="54" r="1.3" fill="#18181B"/>
  <!-- Rosette 4 (hàm dưới trái) -->
  <circle cx="32" cy="66" r="4" stroke="#18181B" stroke-width="2" stroke-dasharray="3,2" fill="none"/>
  <circle cx="32" cy="66" r="1.2" fill="#18181B"/>
  <!-- Rosette 5 (hàm dưới phải) -->
  <circle cx="68" cy="66" r="4" stroke="#18181B" stroke-width="2" stroke-dasharray="3,2" fill="none"/>
  <circle cx="68" cy="66" r="1.2" fill="#18181B"/>
</svg>`,

  tapir: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="tapirDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3F3F46"/>
      <stop offset="100%" stop-color="#18181B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F4F4F5" stroke="#27272A" stroke-width="2.5"/>
  <!-- Round Robust Body Silhouette -->
  <path d="M 22,78 C 22,50 36,44 50,44 C 68,44 78,50 78,78 Z" fill="url(#tapirDark)"/>
  <!-- Head with Downward Curving Snout -->
  <ellipse cx="50" cy="50" rx="18" ry="16" fill="url(#tapirDark)"/>
  <!-- DISTINCTIVE FLEXIBLE SHORT PROBOSCIS TRUNK (Mũi kéo dài thành chiếc vòi ngắn) -->
  <path d="M 44,54 C 42,66 45,74 50,78 C 55,74 58,66 56,54 Z" fill="#27272A"/>
  <ellipse cx="50" cy="76" rx="4" ry="2.5" fill="#09090B"/>
  <circle cx="48.5" cy="76" r="1" fill="#71717A"/>
  <circle cx="51.5" cy="76" r="1" fill="#71717A"/>
  <!-- Small Oval Ears with crisp white rims (Tai viền trắng đặc trưng) -->
  <ellipse cx="32" cy="36" rx="6" ry="8" transform="rotate(-20, 32, 36)" fill="#18181B" stroke="#FFFFFF" stroke-width="1.8"/>
  <ellipse cx="68" cy="36" rx="6" ry="8" transform="rotate(20, 68, 36)" fill="#18181B" stroke="#FFFFFF" stroke-width="1.8"/>
  <!-- Gentle Small Dark Eyes -->
  <circle cx="39" cy="46" r="3" fill="#000000"/>
  <circle cx="61" cy="46" r="3" fill="#000000"/>
  <circle cx="38" cy="45" r="1" fill="#FFFFFF"/>
  <circle cx="60" cy="45" r="1" fill="#FFFFFF"/>
  <!-- White saddle/belly contrast (Đặc trưng heo vòi Malayan) -->
  <path d="M 34,70 Q 50,62 66,70 L 66,82 L 34,82 Z" fill="#E4E4E7"/>
</svg>`,

  capybara: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="capyFur" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A16207"/>
      <stop offset="50%" stop-color="#854D0E"/>
      <stop offset="100%" stop-color="#713F12"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#854D0E" stroke-width="2.5"/>
  <!-- Zen Peaceful Capybara Profile with Flat Top & BLUNT SQUARE MUZZLE (Mõm vuông đặc trưng) -->
  <path d="M 32,40 C 32,32 68,32 68,40 L 72,58 C 72,72 64,76 50,76 C 36,76 28,72 28,58 Z" fill="url(#capyFur)"/>
  <!-- Small Round High-set Ears on Top of Head -->
  <circle cx="32" cy="34" r="5.5" fill="#451A03"/>
  <circle cx="68" cy="34" r="5.5" fill="#451A03"/>
  <circle cx="32" cy="34" r="3" fill="#A16207"/>
  <circle cx="68" cy="34" r="3" fill="#A16207"/>
  <!-- Relaxed, Half-closed Zen Eyes (Mắt khép hờ thư thái) -->
  <path d="M 34,44 Q 40,42 44,46" stroke="#1C1917" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M 66,44 Q 60,42 56,46" stroke="#1C1917" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Broad Square Snout with slit nostrils -->
  <path d="M 40,60 L 60,60 L 58,70 L 42,70 Z" fill="#451A03"/>
  <ellipse cx="46" cy="64" rx="2" ry="1.2" fill="#1C1917"/>
  <ellipse cx="54" cy="64" rx="2" ry="1.2" fill="#1C1917"/>
  <line x1="50" y1="65" x2="50" y2="70" stroke="#1C1917" stroke-width="1.8"/>
  <!-- Little Yuzu orange or green leaf on head (iconic capybara vibe) -->
  <ellipse cx="50" cy="28" rx="6" ry="5.5" fill="#F97316"/>
  <circle cx="50" cy="24" r="1.2" fill="#65A30D"/>
  <path d="M 50,23 Q 54,20 56,22" stroke="#65A30D" stroke-width="1.5" fill="none"/>
</svg>`,

  pangolin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="scaleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="50%" stop-color="#B45309"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F5F4" stroke="#78350F" stroke-width="2.5"/>
  <!-- OVERLAPPING KERATIN ARMOR SCALES (Thân phủ vảy sừng xếp lớp như mái ngói) -->
  <!-- Layer 1 (chóp lưng) -->
  <path d="M 40,32 C 40,24 60,24 60,32 C 60,38 40,38 40,32 Z" fill="url(#scaleGrad)"/>
  <!-- Layer 2 -->
  <path d="M 30,42 C 30,34 46,34 46,44 C 46,48 30,48 30,42 Z" fill="url(#scaleGrad)"/>
  <path d="M 44,40 C 44,32 56,32 56,42 C 56,48 44,48 44,40 Z" fill="url(#scaleGrad)"/>
  <path d="M 54,42 C 54,34 70,34 70,44 C 70,48 54,48 54,42 Z" fill="url(#scaleGrad)"/>
  <!-- Layer 3 -->
  <path d="M 24,56 C 24,46 42,46 42,58 C 42,64 24,64 24,56 Z" fill="url(#scaleGrad)"/>
  <path d="M 40,54 C 40,44 60,44 60,56 C 60,64 40,64 40,54 Z" fill="url(#scaleGrad)"/>
  <path d="M 58,56 C 58,46 76,46 76,58 C 76,64 58,64 58,56 Z" fill="url(#scaleGrad)"/>
  <!-- Layer 4 -->
  <path d="M 32,68 C 32,58 50,58 50,70 C 50,76 32,76 32,68 Z" fill="url(#scaleGrad)"/>
  <path d="M 50,68 C 50,58 68,58 68,70 C 68,76 50,76 50,68 Z" fill="url(#scaleGrad)"/>
  <!-- Pointed Cone Snout (Mõm nhọn thuôn dài) -->
  <polygon points="50,22 42,34 58,34" fill="#A8A29E"/>
  <circle cx="50" cy="22" r="2" fill="#1C1917"/>
  <!-- Little Beady Eyes -->
  <circle cx="45" cy="28" r="1.5" fill="#000000"/>
  <circle cx="55" cy="28" r="1.5" fill="#000000"/>
  <!-- Curled Scaly Tail -->
  <path d="M 50,76 Q 50,86 42,90 Q 34,88 36,80" stroke="#78350F" stroke-width="5" stroke-linecap="round" fill="none"/>
</svg>`,

  lemur: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="lemurFace" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E4E4E7"/>
      <stop offset="100%" stop-color="#A1A1AA"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#15803D" stroke-width="2.5"/>
  <!-- ICONIC BLACK-AND-WHITE RINGED TAIL (Đuôi vòng sọc đen trắng uốn cong vút) -->
  <path d="M 70,68 C 88,60 90,32 78,18 C 72,12 64,16 66,24 C 72,34 68,54 58,66" stroke="#18181B" stroke-width="8" stroke-linecap="round" fill="none"/>
  <!-- White stripes overlaid on tail -->
  <path d="M 76,58 L 81,56 M 82,46 L 86,43 M 84,34 L 87,30 M 80,24 L 82,20" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Triangular Mask Head -->
  <polygon points="50,74 26,42 74,42" fill="url(#lemurFace)"/>
  <!-- Large Tufted White Ears -->
  <circle cx="28" cy="34" r="9" fill="#FFFFFF"/>
  <circle cx="28" cy="34" r="5" fill="#71717A"/>
  <circle cx="72" cy="34" r="9" fill="#FFFFFF"/>
  <circle cx="72" cy="34" r="5" fill="#71717A"/>
  <!-- Black Mask Surrounding Eyes -->
  <circle cx="39" cy="48" r="8" fill="#18181B"/>
  <circle cx="61" cy="48" r="8" fill="#18181B"/>
  <!-- LUMINOUS GOLDEN/AMBER EYES (Mắt to tròn màu hổ phách/vàng rực rỡ) -->
  <circle cx="39" cy="48" r="5.5" fill="#F59E0B"/>
  <circle cx="61" cy="48" r="5.5" fill="#F59E0B"/>
  <circle cx="39" cy="48" r="3" fill="#000000"/>
  <circle cx="61" cy="48" r="3" fill="#000000"/>
  <circle cx="37.5" cy="46.5" r="1.3" fill="#FFFFFF"/>
  <circle cx="59.5" cy="46.5" r="1.3" fill="#FFFFFF"/>
  <!-- Black Snout -->
  <polygon points="50,72 44,62 56,62" fill="#18181B"/>
  <circle cx="50" cy="65" r="2" fill="#000000"/>
</svg>`,

  anteater: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="anteaterFur" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78716C"/>
      <stop offset="100%" stop-color="#44403C"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#78716C" stroke-width="2.5"/>
  <!-- GIANT BUSHY FEATHER-DUSTER TAIL (Đuôi rậm xù như cây chổi lớn) -->
  <path d="M 36,66 C 14,64 8,44 14,32 C 22,34 26,44 38,56 Z" fill="#292524"/>
  <path d="M 12,38 C 16,30 24,34 30,44" stroke="#78716C" stroke-width="3" fill="none"/>
  <!-- Body with iconic DIAGONAL CHEST STRIPE (Dải sọc đen viền trắng chéo qua ngực) -->
  <ellipse cx="50" cy="64" rx="22" ry="14" fill="url(#anteaterFur)"/>
  <path d="M 44,54 L 62,72" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"/>
  <path d="M 45,55 L 61,71" stroke="#18181B" stroke-width="2.5" stroke-linecap="round"/>
  <!-- DISTINCTIVE LONG TUBULAR SNOUT (Mõm dài cong hình ống) -->
  <path d="M 58,54 C 68,52 82,54 88,60 C 82,64 70,64 58,62 Z" fill="#A8A29E"/>
  <circle cx="87" cy="60" r="1.8" fill="#18181B"/>
  <!-- Tiny Sticky Wormlike Tongue (Lưỡi dính thò ra bắt kiến) -->
  <path d="M 88,61 Q 93,64 96,62" stroke="#F43F5E" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <!-- Tiny Eye & Ear -->
  <circle cx="64" cy="54" r="1.8" fill="#000000"/>
  <circle cx="58" cy="48" r="2.5" fill="#44403C"/>
  <!-- Strong Curved Foreclaw -->
  <path d="M 68,74 Q 72,82 68,86" stroke="#18181B" stroke-width="2.5" stroke-linecap="round" fill="none"/>
</svg>`,

  // =========================================================================
  // BIO-U03: CHIM MUÔNG TOÀN CẦU (BIRDS)
  // =========================================================================
  falcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="falconWing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- HIGH SPEED DIVING FALCON SILHOUETTE (Dáng chim ưng lao bổ nhào tốc độ) -->
  <!-- Aerodynamic Long Pointed Sickle Wings (Đôi cánh dài nhọn hình lưỡi liềm) -->
  <path d="M 50,44 C 34,22 14,18 12,28 C 16,42 32,56 46,60 Z" fill="url(#falconWing)"/>
  <path d="M 50,44 C 66,22 86,18 88,28 C 84,42 68,56 54,60 Z" fill="url(#falconWing)"/>
  <!-- Head & Torpedo Body -->
  <ellipse cx="50" cy="52" rx="11" ry="17" fill="#F8FAFC"/>
  <circle cx="50" cy="40" r="10" fill="#334155"/>
  <!-- Sharp Hooked Beak with Tomial Tooth -->
  <polygon points="50,44 46,47 50,54 54,47" fill="#F59E0B"/>
  <polygon points="50,48 48,50 50,54" fill="#0F172A"/>
  <!-- Falcon "Moustache" Stripe under eye (Vệt ria đen dưới mắt) -->
  <path d="M 44,42 L 42,48 M 56,42 L 58,48" stroke="#0F172A" stroke-width="2" stroke-linecap="round"/>
  <!-- Piercing Dark Eyes with Yellow Orbital Ring -->
  <circle cx="45" cy="38" r="3.2" fill="#FBBF24"/>
  <circle cx="55" cy="38" r="3.2" fill="#FBBF24"/>
  <circle cx="45" cy="38" r="2" fill="#000000"/>
  <circle cx="55" cy="38" r="2" fill="#000000"/>
  <!-- Barred Breast Feathers -->
  <line x1="45" y1="56" x2="55" y2="56" stroke="#475569" stroke-width="1.5"/>
  <line x1="44" y1="60" x2="56" y2="60" stroke="#475569" stroke-width="1.5"/>
  <line x1="46" y1="64" x2="54" y2="64" stroke="#475569" stroke-width="1.5"/>
</svg>`,

  toucan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="beakRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FACC15"/>
      <stop offset="35%" stop-color="#FB923C"/>
      <stop offset="70%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFDF5" stroke="#059669" stroke-width="2.5"/>
  <!-- Black Glossy Body & Perch -->
  <ellipse cx="36" cy="62" rx="16" ry="20" fill="#09090B"/>
  <!-- Bright Yellow/White Throat Bib -->
  <path d="M 32,44 C 42,44 48,50 48,64 C 38,68 28,64 28,52 Z" fill="#FEF08A"/>
  <!-- Red under-tail covert -->
  <path d="M 24,76 C 28,82 34,80 36,74 Z" fill="#EF4444"/>
  <!-- Head with Blue Eye Ring -->
  <circle cx="36" cy="42" r="11" fill="#09090B"/>
  <circle cx="36" cy="40" r="5.5" fill="#38BDF8"/>
  <circle cx="36" cy="40" r="2.8" fill="#000000"/>
  <circle cx="35" cy="39" r="1" fill="#FFFFFF"/>
  <!-- ENORMOUS MULTI-COLORED RAINBOW BEAK (Mỏ cầu vồng cực lớn) -->
  <path d="M 44,36 C 60,32 78,36 86,48 C 76,58 56,56 44,52 Z" fill="url(#beakRainbow)"/>
  <!-- Black tip of beak -->
  <path d="M 80,44 C 84,47 86,48 86,48 C 82,53 78,54 78,54 Z" fill="#09090B"/>
  <!-- Serrated beak tomia -->
  <line x1="44" y1="44" x2="80" y2="48" stroke="#18181B" stroke-width="1.5"/>
</svg>`,

  hummingbird: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="iridescent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF4FF" stroke="#A855F7" stroke-width="2.5"/>
  <!-- Flower to the right -->
  <path d="M 84,60 C 88,52 92,52 96,56 C 94,64 88,66 84,60 Z" fill="#EC4899"/>
  <path d="M 86,56 C 90,48 94,48 96,52" fill="#F43F5E"/>
  <line x1="88" y1="62" x2="94" y2="78" stroke="#10B981" stroke-width="2"/>
  <!-- RAPID HOVERING WING MOTION BLUR (Đôi cánh bay lơ lửng vỗ cực nhanh) -->
  <path d="M 44,48 C 42,28 32,18 24,18 C 24,30 34,44 44,48 Z" fill="#A855F7" opacity="0.45"/>
  <path d="M 44,48 C 48,26 40,16 32,14 C 30,26 38,42 44,48 Z" fill="#06B6D4" opacity="0.75"/>
  <path d="M 44,48 C 56,32 54,20 46,18 C 40,26 42,40 44,48 Z" fill="url(#iridescent)"/>
  <!-- Sleek Emerald Iridescent Body -->
  <ellipse cx="48" cy="56" rx="9" ry="14" transform="rotate(-30, 48, 56)" fill="url(#iridescent)"/>
  <!-- Ruby Gorget on throat (Họng đỏ ngọc bích lấp lánh) -->
  <ellipse cx="54" cy="50" rx="4" ry="5" fill="#E11D48"/>
  <!-- LONG NEEDLE-LIKE BILL (Mỏ dài thanh mảnh hút mật hoa) -->
  <line x1="58" y1="46" x2="86" y2="56" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
  <!-- Tiny Head & Eye -->
  <circle cx="54" cy="46" r="5" fill="#047857"/>
  <circle cx="54" cy="45" r="1.6" fill="#000000"/>
  <circle cx="53.5" cy="44.5" r="0.6" fill="#FFFFFF"/>
  <!-- Forked tail feathers -->
  <polygon points="34,68 24,76 36,72" fill="#1E1B4B"/>
</svg>`,

  woodpecker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="treeBark" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="100%" stop-color="#451A03"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF2F2" stroke="#DC2626" stroke-width="2.5"/>
  <!-- TREE TRUNK ON THE RIGHT (Thân cây thẳng đứng bám vào) -->
  <rect x="76" y="10" width="18" height="80" rx="3" fill="url(#treeBark)"/>
  <line x1="82" y1="20" x2="82" y2="80" stroke="#292524" stroke-width="1.8"/>
  <line x1="88" y1="30" x2="88" y2="70" stroke="#292524" stroke-width="1.5"/>
  <!-- CLINGING POSTURE: STIFF PROPPED TAIL (Đuôi cứng chống vào thân cây) -->
  <polygon points="62,72 76,82 66,84" fill="#09090B"/>
  <!-- Gripping Zygodactyl Feet (Chân bám chắc vào vỏ cây) -->
  <line x1="62" y1="64" x2="76" y2="60" stroke="#9CA3AF" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Body leaning forward -->
  <ellipse cx="50" cy="54" rx="14" ry="18" transform="rotate(25, 50, 54)" fill="#09090B"/>
  <!-- White Zebra wing bars -->
  <path d="M 44,52 L 58,62 M 42,58 L 56,68 M 40,64 L 52,72" stroke="#FFFFFF" stroke-width="2.5"/>
  <!-- White facial stripes -->
  <ellipse cx="44" cy="38" rx="8" ry="10" fill="#FFFFFF"/>
  <line x1="38" y1="38" x2="52" y2="44" stroke="#09090B" stroke-width="2"/>
  <!-- FIERY RED CREST (Mào đỏ rực trên đỉnh đầu) -->
  <path d="M 38,30 C 38,20 48,18 52,28 Z" fill="#EF4444"/>
  <!-- CHISEL-LIKE DRILLING BEAK (Mỏ thẳng nhọn gõ vào vỏ gỗ) -->
  <polygon points="46,38 76,42 46,42" fill="#6B7280"/>
  <!-- Drilling impact shockwave (Tia gõ nhịp) -->
  <path d="M 78,38 L 81,42 L 78,46" stroke="#F59E0B" stroke-width="1.8" fill="none"/>
  <!-- Keen Eye -->
  <circle cx="44" cy="36" r="1.8" fill="#000000"/>
</svg>`,

  ostrich: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="ostrichPlumes" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#18181B"/>
      <stop offset="100%" stop-color="#09090B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5"/>
  <!-- TALL POWERFUL TWO-TOED RUNNING LEGS (Hai chân dài khỏe khoắn) -->
  <line x1="44" y1="68" x2="40" y2="88" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
  <line x1="40" y1="88" x2="48" y2="88" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
  <line x1="56" y1="68" x2="60" y2="88" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
  <line x1="60" y1="88" x2="68" y2="88" stroke="#FBBF24" stroke-width="3" stroke-linecap="round"/>
  <!-- Plump Round Body with Black & White Shaggy Plumes (Thân tròn lông xù) -->
  <ellipse cx="50" cy="58" rx="20" ry="16" fill="url(#ostrichPlumes)"/>
  <!-- Fluffy White Wing & Tail Plumes -->
  <ellipse cx="34" cy="58" rx="8" ry="6" fill="#F8FAFC"/>
  <ellipse cx="64" cy="58" rx="8" ry="6" fill="#F8FAFC"/>
  <!-- VERY LONG BARE PINKISH NECK (Chiếc cổ dài thanh mảnh) -->
  <path d="M 52,48 C 50,34 56,26 56,20" stroke="#FCA5A5" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <!-- Small Head with Big Eyelashed Eye -->
  <ellipse cx="58" cy="18" rx="6" ry="4.5" fill="#FCA5A5"/>
  <!-- Broad Flat Bill -->
  <polygon points="63,18 70,19 63,21" fill="#F59E0B"/>
  <!-- Big Eye with prominent lash -->
  <circle cx="58" cy="17" r="2.2" fill="#18181B"/>
  <path d="M 56,15 L 59,15" stroke="#18181B" stroke-width="1"/>
</svg>`,

  // =========================================================================
  // BIO-U04: SINH VẬT BIỂN & ĐẠI DƯƠNG SÂU (MARINE)
  // =========================================================================
  "blue whale": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="whaleBlue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5"/>
  <!-- STREAMLINED IMMENSE BLUE BODY (Thân xanh lam thon dài khổng lồ) -->
  <path d="M 12,46 C 24,36 60,34 82,46 C 88,50 82,56 74,56 C 54,58 32,64 16,58 C 10,54 10,50 12,46 Z" fill="url(#whaleBlue)"/>
  <!-- Broad Tail Flukes (Đuôi xòe ngang hùng vĩ) -->
  <polygon points="82,46 94,36 90,48 94,60" fill="url(#whaleBlue)"/>
  <!-- Ventral Pleats / Grooves (Rãnh bụng xếp nếp chạy dọc họng) -->
  <path d="M 16,56 Q 32,60 48,58 M 18,53 Q 34,57 52,55 M 20,50 Q 36,54 54,52" stroke="#BAE6FD" stroke-width="1.3" fill="none"/>
  <!-- Tiny Dorsal Fin set far back -->
  <polygon points="70,44 74,40 76,45" fill="#0369A1"/>
  <!-- Pectoral Flipper -->
  <ellipse cx="40" cy="56" rx="10" ry="3.5" transform="rotate(25, 40, 56)" fill="#0369A1"/>
  <!-- Peaceful Whale Eye & Blowhole spout -->
  <circle cx="24" cy="48" r="1.8" fill="#082F49"/>
  <!-- Water spout -->
  <path d="M 30,36 C 30,26 26,22 24,20 M 30,26 C 32,22 36,20 38,20" stroke="#38BDF8" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`,

  "killer whale": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="orcaGloss" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#09090B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- TALL TOWERING DORSAL FIN (Vây lưng cao vút thẳng đứng như cánh buồm) -->
  <path d="M 44,46 L 50,14 L 56,46 Z" fill="#09090B"/>
  <!-- Jet Black Body Profile -->
  <path d="M 14,54 C 20,40 60,40 80,50 C 86,54 82,60 74,60 C 56,62 34,68 18,64 Z" fill="url(#orcaGloss)"/>
  <!-- Tail Flukes -->
  <polygon points="80,50 92,42 88,52 92,62" fill="#09090B"/>
  <!-- SNOW-WHITE EYE PATCH (Đốm mắt trắng đặc trưng) -->
  <ellipse cx="28" cy="48" rx="5" ry="3" transform="rotate(-15, 28, 48)" fill="#FFFFFF"/>
  <circle cx="23" cy="52" r="1.5" fill="#000000"/>
  <!-- Snow-white belly & throat saddle -->
  <path d="M 18,62 C 26,60 42,60 52,64 C 42,68 28,68 18,62 Z" fill="#FFFFFF"/>
  <!-- Broad Paddle-like Flipper -->
  <ellipse cx="38" cy="62" rx="8" ry="4" transform="rotate(30, 38, 62)" fill="#09090B"/>
</svg>`,

  "sea turtle": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="turtleCarapace" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#15803D"/>
      <stop offset="50%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#14532D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFDF5" stroke="#059669" stroke-width="2.5"/>
  <!-- WING-LIKE FRONT FLIPPERS (Hai chân trước biến thành mái chèo lớn) -->
  <path d="M 42,42 C 30,28 12,28 10,34 C 12,46 32,50 42,48 Z" fill="#15803D"/>
  <path d="M 58,42 C 70,28 88,28 90,34 C 88,46 68,50 58,48 Z" fill="#15803D"/>
  <!-- Rear Flippers & Short Tail -->
  <ellipse cx="38" cy="74" rx="6" ry="4" transform="rotate(35, 38, 74)" fill="#15803D"/>
  <ellipse cx="62" cy="74" rx="6" ry="4" transform="rotate(-35, 62, 74)" fill="#15803D"/>
  <polygon points="48,74 50,80 52,74" fill="#15803D"/>
  <!-- STREAMLINED HYDRODYNAMIC SHELL (Mai dẹt khí động học) -->
  <ellipse cx="50" cy="56" rx="18" ry="22" fill="url(#turtleCarapace)" stroke="#A7F3D0" stroke-width="1.8"/>
  <!-- Geometric Scute Pattern -->
  <polygon points="50,42 44,48 44,56 50,62 56,56 56,48" fill="#065F46" stroke="#A7F3D0" stroke-width="1"/>
  <polygon points="50,62 44,68 44,74 50,76 56,74 56,68" fill="#065F46" stroke="#A7F3D0" stroke-width="1"/>
  <!-- Non-retractile Head -->
  <ellipse cx="50" cy="32" rx="7" ry="8" fill="#15803D"/>
  <circle cx="46" cy="30" r="1.5" fill="#000000"/>
  <circle cx="54" cy="30" r="1.5" fill="#000000"/>
</svg>`,

  "giant squid": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="squidRuby" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="50%" stop-color="#E11D48"/>
      <stop offset="100%" stop-color="#881337"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#E11D48" stroke-width="2.5"/>
  <!-- Torpedo Mantle & Lateral Fins -->
  <polygon points="50,8 38,24 62,24" fill="url(#squidRuby)"/>
  <path d="M 38,22 C 38,36 42,48 50,48 C 58,48 62,36 62,22 Z" fill="url(#squidRuby)"/>
  <!-- GIANT DINNER-PLATE EYE (Mắt cực lớn đáy biển sâu) -->
  <circle cx="43" cy="50" r="5" fill="#FEF08A"/>
  <circle cx="57" cy="50" r="5" fill="#FEF08A"/>
  <circle cx="43" cy="50" r="2.8" fill="#000000"/>
  <circle cx="57" cy="50" r="2.8" fill="#000000"/>
  <!-- 8 Arms undulating -->
  <path d="M 44,54 Q 38,68 40,82" stroke="#E11D48" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M 47,54 Q 44,70 46,84" stroke="#BE123C" stroke-width="2.8" stroke-linecap="round" fill="none"/>
  <path d="M 53,54 Q 56,70 54,84" stroke="#BE123C" stroke-width="2.8" stroke-linecap="round" fill="none"/>
  <path d="M 56,54 Q 62,68 60,82" stroke="#E11D48" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- 2 ULTRA-LONG FEEDING TENTACLES WITH EXPANDED CLUBS (2 xúc tu săn mồi siêu dài) -->
  <path d="M 41,54 Q 28,72 32,92" stroke="#FB7185" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M 59,54 Q 72,72 68,92" stroke="#FB7185" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <ellipse cx="32" cy="92" rx="3.5" ry="2" fill="#F43F5E"/>
  <ellipse cx="68" cy="92" rx="3.5" ry="2" fill="#F43F5E"/>
</svg>`,

  seahorse: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="seahorseGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#EA580C"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2.5"/>
  <!-- Green seagrass to hold on to -->
  <path d="M 32,90 Q 28,60 34,30 Q 38,15 34,10" stroke="#10B981" stroke-width="4" stroke-linecap="round" fill="none"/>
  <!-- UPRIGHT HORSE-LIKE HEAD WITH CORONET (Đầu ngựa có vương miện gai) -->
  <polygon points="54,20 52,14 56,16 58,12 60,16" fill="#F59E0B"/>
  <circle cx="56" cy="24" r="9" fill="url(#seahorseGold)"/>
  <!-- Tubular Snout -->
  <polygon points="50,26 38,30 40,34 50,30" fill="url(#seahorseGold)"/>
  <!-- Intelligent Little Eye -->
  <circle cx="55" cy="24" r="2.2" fill="#000000"/>
  <circle cx="54" cy="23" r="0.8" fill="#FFFFFF"/>
  <!-- Plump Segmented Belly -->
  <path d="M 56,32 C 64,40 64,54 56,62 C 52,56 50,42 56,32 Z" fill="url(#seahorseGold)"/>
  <!-- Segment ridges on belly -->
  <line x1="53" y1="38" x2="62" y2="40" stroke="#B45309" stroke-width="1.5"/>
  <line x1="52" y1="44" x2="63" y2="46" stroke="#B45309" stroke-width="1.5"/>
  <line x1="52" y1="50" x2="62" y2="52" stroke="#B45309" stroke-width="1.5"/>
  <!-- Delicate Dorsal Fin -->
  <path d="M 62,42 C 68,44 68,50 62,52 Z" fill="#93C5FD" opacity="0.8"/>
  <!-- PREHENSILE SPIRAL COILED TAIL (Đuôi cuộn xoắn bám chặt vào cỏ biển) -->
  <path d="M 56,62 C 52,70 42,74 38,72 C 34,70 34,64 38,64 C 42,64 42,68 40,68" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" fill="none"/>
</svg>`,

  stingray: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="raySlate" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#64748B"/>
      <stop offset="50%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- FLAT RHOMBOID WIDE WINGED DISC (Thân dẹt hình thoi cánh rộng uốn lượn) -->
  <path d="M 50,18 C 66,28 88,44 86,52 C 78,58 64,62 50,66 C 36,62 22,58 14,52 C 12,44 34,28 50,18 Z" fill="url(#raySlate)"/>
  <!-- Undulating Wingtip Highlights -->
  <path d="M 14,52 Q 24,50 34,54" stroke="#94A3B8" stroke-width="1.8" fill="none"/>
  <path d="M 86,52 Q 76,50 66,54" stroke="#94A3B8" stroke-width="1.8" fill="none"/>
  <!-- Raised Eyes & Spiracles on top of head -->
  <circle cx="45" cy="28" r="3" fill="#0F172A"/>
  <circle cx="55" cy="28" r="3" fill="#0F172A"/>
  <circle cx="45" cy="27" r="1" fill="#FFFFFF"/>
  <circle cx="55" cy="27" r="1" fill="#FFFFFF"/>
  <!-- LONG WHIP-LIKE TAIL WITH BARB (Đuôi dài mảnh như cây roi) -->
  <path d="M 50,66 Q 50,82 54,92" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Toxic Barb -->
  <polygon points="50,74 52,70 52,76" fill="#F8FAFC"/>
  <!-- Pale Blue Spots (Đốm xanh ngọc như cá đuối hoa) -->
  <circle cx="42" cy="40" r="2" fill="#38BDF8"/>
  <circle cx="58" cy="40" r="2" fill="#38BDF8"/>
  <circle cx="34" cy="48" r="2.2" fill="#38BDF8"/>
  <circle cx="66" cy="48" r="2.2" fill="#38BDF8"/>
  <circle cx="50" cy="52" r="2" fill="#38BDF8"/>
</svg>`,

  "coral reef": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#0284C7" stroke="#0369A1" stroke-width="2.5"/>
  <!-- Sandy seabed -->
  <path d="M 6,78 Q 50,70 94,78 L 94,94 L 6,94 Z" fill="#FDE68A"/>
  <!-- Branching Staghorn Coral (San hô cành nai đỏ/cam) -->
  <path d="M 24,78 L 24,54 L 16,42 M 24,58 L 32,46 M 24,50 L 26,38" stroke="#F43F5E" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <!-- Brain Coral Dome (San hô não gợn sóng) -->
  <ellipse cx="50" cy="74" rx="14" ry="10" fill="#FACC15"/>
  <path d="M 42,70 Q 50,68 58,70 M 40,74 Q 50,72 60,74 M 44,78 Q 50,76 56,78" stroke="#CA8A04" stroke-width="1.5" fill="none"/>
  <!-- Purple Sea Fan / Anemone -->
  <path d="M 74,78 C 68,60 86,52 80,40 M 74,68 C 84,58 76,46 88,46" stroke="#C084FC" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <!-- Little Clownfish swimming -->
  <ellipse cx="64" cy="36" rx="7" ry="4" fill="#EA580C"/>
  <polygon points="70,36 76,32 76,40" fill="#EA580C"/>
  <path d="M 62,32 L 62,40 M 66,32 L 66,40" stroke="#FFFFFF" stroke-width="2"/>
  <circle cx="60" cy="35" r="1" fill="#000000"/>
  <!-- Air bubbles rising -->
  <circle cx="44" cy="30" r="2.5" fill="#BAE6FD" opacity="0.75"/>
  <circle cx="46" cy="22" r="1.8" fill="#BAE6FD" opacity="0.75"/>
  <circle cx="42" cy="16" r="1.2" fill="#BAE6FD" opacity="0.75"/>
</svg>`,

  // =========================================================================
  // BIO-U05: BÒ SÁT & LƯỠNG CƯ (REPTILES & AMPHIBIANS)
  // =========================================================================
  alligator: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gatorSkin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3F3F46"/>
      <stop offset="100%" stop-color="#18181B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F4F4F5" stroke="#27272A" stroke-width="2.5"/>
  <!-- BROAD U-SHAPED SNOUT HEAD (Mõm rộng hình chữ U đặc trưng) -->
  <path d="M 32,36 C 32,20 68,20 68,36 L 70,66 C 70,78 30,78 30,66 Z" fill="url(#gatorSkin)"/>
  <!-- Rounded U-tip -->
  <ellipse cx="50" cy="30" rx="16" ry="10" fill="url(#gatorSkin)"/>
  <!-- High Nostril Knobs on Snout Tip -->
  <circle cx="44" cy="24" r="2.5" fill="#09090B"/>
  <circle cx="56" cy="24" r="2.5" fill="#09090B"/>
  <!-- Bumpy Armor Ridges / Scutes on Neck -->
  <polygon points="36,66 40,60 44,66" fill="#52525B"/>
  <polygon points="48,66 50,58 52,66" fill="#52525B"/>
  <polygon points="56,66 60,60 64,66" fill="#52525B"/>
  <!-- Raised Eyes on top of head -->
  <ellipse cx="38" cy="46" rx="5" ry="4" fill="#EAB308"/>
  <ellipse cx="62" cy="46" rx="5" ry="4" fill="#EAB308"/>
  <circle cx="38" cy="46" r="2.2" fill="#000000"/>
  <circle cx="62" cy="46" r="2.2" fill="#000000"/>
  <!-- Upper Jaw Overlap Teeth (Khi ngậm miệng chỉ thấy răng hàm trên rủ xuống) -->
  <polygon points="34,44 32,49 36,47" fill="#FFFFFF"/>
  <polygon points="66,44 68,49 64,47" fill="#FFFFFF"/>
</svg>`,

  chameleon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="chameleonShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="50%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- Brown branch diagonally -->
  <path d="M 10,72 Q 50,68 90,72" stroke="#78350F" stroke-width="7" stroke-linecap="round"/>
  <!-- Head with Casque Crest (Mào đầu nhọn) -->
  <path d="M 44,48 C 36,36 42,26 50,26 C 60,26 64,36 58,48 Z" fill="url(#chameleonShimmer)"/>
  <!-- CONE-SHAPED TURRET EYE (Đôi mắt hình nón lồi xoay độc lập) -->
  <circle cx="48" cy="38" r="7.5" fill="#84CC16" stroke="#16A34A" stroke-width="1.5"/>
  <circle cx="48" cy="38" r="2" fill="#000000"/>
  <circle cx="47" cy="37" r="0.8" fill="#FFFFFF"/>
  <!-- Body arched over branch -->
  <ellipse cx="50" cy="56" rx="16" ry="12" fill="url(#chameleonShimmer)"/>
  <!-- Zygodactyl Gripping Feet (Chân kẹp cành cây) -->
  <ellipse cx="40" cy="68" rx="4" ry="3" fill="#16A34A"/>
  <ellipse cx="60" cy="68" rx="4" ry="3" fill="#16A34A"/>
  <!-- SIGNATURE PREHENSILE SPIRAL TAIL (Đuôi cuộn xoắn ốc) -->
  <path d="M 64,58 C 76,58 84,66 78,74 C 74,80 66,76 68,70 C 70,66 74,68 74,70" stroke="#22C55E" stroke-width="4.5" stroke-linecap="round" fill="none"/>
</svg>`,

  iguana: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="iguanaGreen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#84CC16"/>
      <stop offset="100%" stop-color="#4D7C0F"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F7FEE7" stroke="#65A30D" stroke-width="2.5"/>
  <!-- Head Profile -->
  <path d="M 36,44 Q 60,34 68,50 Q 64,66 40,66 Z" fill="url(#iguanaGreen)"/>
  <!-- SHARP SPINY DORSAL CREST (Mào gai nhọn chạy dọc từ gáy xuống lưng) -->
  <polygon points="36,40 38,30 42,42" fill="#65A30D"/>
  <polygon points="44,38 46,26 50,38" fill="#65A30D"/>
  <polygon points="52,36 54,24 58,36" fill="#65A30D"/>
  <polygon points="60,36 62,28 66,38" fill="#65A30D"/>
  <!-- PENDULOUS THROAT DEWLAP (Yếm cổ xòe rộng dưới cằm) -->
  <path d="M 44,64 C 44,78 56,80 58,66 Z" fill="#65A30D"/>
  <line x1="50" y1="66" x2="50" y2="76" stroke="#365314" stroke-width="1.5"/>
  <!-- Circular Subtympanic Shield (Vảy tròn lớn dưới tai) -->
  <circle cx="44" cy="56" r="4.5" fill="#E2E8F0" stroke="#65A30D" stroke-width="1.5"/>
  <!-- Orange/Golden Reptile Eye -->
  <circle cx="56" cy="46" r="4" fill="#F97316"/>
  <circle cx="56" cy="46" r="2" fill="#000000"/>
</svg>`,

  "komodo dragon": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="komodoSkin" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78716C"/>
      <stop offset="100%" stop-color="#44403C"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F5F4" stroke="#57534E" stroke-width="2.5"/>
  <!-- Powerful Low Heavy Head (Đầu to vạm vỡ, mõm bo tròn) -->
  <path d="M 30,52 C 30,38 66,38 72,52 C 74,66 32,68 30,52 Z" fill="url(#komodoSkin)"/>
  <!-- Rugged Chainmail Scaled Skin Texture -->
  <ellipse cx="50" cy="52" rx="18" ry="10" stroke="#292524" stroke-width="1.5" stroke-dasharray="2,3" fill="none"/>
  <!-- DEEPLY FORKED YELLOW TONGUE (Lưỡi chẻ màu vàng thò ra đánh hơi) -->
  <path d="M 72,54 L 84,54 L 90,50 M 84,54 L 90,58" stroke="#FACC15" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <!-- Keen Nostril & Heavy Brow -->
  <circle cx="68" cy="48" r="2" fill="#1C1917"/>
  <ellipse cx="44" cy="44" rx="4" ry="3" fill="#A8A29E"/>
  <circle cx="44" cy="44" r="1.8" fill="#000000"/>
  <!-- Muscular Neck & Heavy Claws -->
  <path d="M 32,58 C 24,66 22,78 30,82" stroke="#44403C" stroke-width="6" stroke-linecap="round" fill="none"/>
  <polygon points="26,80 22,86 28,84" fill="#1C1917"/>
</svg>`,

  python: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="pythonSkin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#CA8A04"/>
      <stop offset="50%" stop-color="#854D0E"/>
      <stop offset="100%" stop-color="#3F2D06"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="#CA8A04" stroke-width="2.5"/>
  <!-- MASSIVE COILED BODY (Thân trăn to dày cuộn tròn nhiều vòng) -->
  <!-- Outer coil -->
  <circle cx="50" cy="54" r="28" stroke="url(#pythonSkin)" stroke-width="12" fill="none"/>
  <!-- Diamond / Reticulated scale lattice -->
  <circle cx="50" cy="54" r="28" stroke="#FEF08A" stroke-width="2" stroke-dasharray="6,6" fill="none"/>
  <!-- Inner coil -->
  <circle cx="50" cy="54" r="14" stroke="url(#pythonSkin)" stroke-width="10" fill="none"/>
  <!-- Pear-shaped Head Resting on Top Coil -->
  <ellipse cx="50" cy="32" rx="11" ry="8" fill="url(#pythonSkin)"/>
  <!-- Heat-sensing pits on snout -->
  <circle cx="44" cy="30" r="1" fill="#18181B"/>
  <circle cx="56" cy="30" r="1" fill="#18181B"/>
  <!-- Cat-like Amber Eyes with Vertical Slit Pupil -->
  <ellipse cx="44" cy="32" rx="2.5" ry="2" fill="#EAB308"/>
  <ellipse cx="56" cy="32" rx="2.5" ry="2" fill="#EAB308"/>
  <line x1="44" y1="30.5" x2="44" y2="33.5" stroke="#000000" stroke-width="1"/>
  <line x1="56" y1="30.5" x2="56" y2="33.5" stroke="#000000" stroke-width="1"/>
</svg>`,

  cobra: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="cobraGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="100%" stop-color="#292524"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#B45309" stroke-width="2.5"/>
  <!-- EXPANDED SPOON-SHAPED HOOD (Cổ bạnh mang rộng uy nghiêm) -->
  <path d="M 50,26 C 24,30 20,54 36,66 L 64,66 C 80,54 76,30 50,26 Z" fill="url(#cobraGold)"/>
  <!-- Pale inner throat with black bars -->
  <ellipse cx="50" cy="52" rx="12" ry="14" fill="#FEF3C7"/>
  <line x1="42" y1="52" x2="58" y2="52" stroke="#292524" stroke-width="2"/>
  <line x1="44" y1="58" x2="56" y2="58" stroke="#292524" stroke-width="2"/>
  <!-- Cobra Head rising at top -->
  <ellipse cx="50" cy="28" rx="8" ry="7" fill="#451A03"/>
  <!-- Fierce Eyes -->
  <circle cx="46" cy="26" r="2" fill="#F59E0B"/>
  <circle cx="54" cy="26" r="2" fill="#F59E0B"/>
  <circle cx="46" cy="26" r="1" fill="#000000"/>
  <circle cx="54" cy="26" r="1" fill="#000000"/>
  <!-- Flicking Red Tongue -->
  <path d="M 50,34 L 50,42 L 46,45 M 50,42 L 54,45" stroke="#DC2626" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <!-- Upright Body Column rising from coil -->
  <path d="M 44,66 L 44,84 Q 50,88 56,84 L 56,66 Z" fill="#292524"/>
</svg>`,

  "tree frog": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- Lush green leaf background -->
  <path d="M 16,84 C 20,44 60,30 84,24 C 84,64 50,88 16,84 Z" fill="#22C55E"/>
  <!-- Vibrant Frog Body -->
  <ellipse cx="48" cy="56" rx="18" ry="14" fill="#4ADE80"/>
  <!-- BLUE/YELLOW FLANK STRIPES (Sọc xanh lam sườn bên) -->
  <ellipse cx="38" cy="58" rx="6" ry="3" fill="#0284C7"/>
  <ellipse cx="58" cy="58" rx="6" ry="3" fill="#0284C7"/>
  <!-- BULGING RUBY RED EYES WITH VERTICAL PUPIL (Mắt đỏ rực nổi bật) -->
  <circle cx="36" cy="38" r="10" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5"/>
  <circle cx="60" cy="38" r="10" fill="#EF4444" stroke="#B91C1C" stroke-width="1.5"/>
  <ellipse cx="36" cy="38" rx="2" ry="7" fill="#000000"/>
  <ellipse cx="60" cy="38" rx="2" ry="7" fill="#000000"/>
  <circle cx="34" cy="35" r="1.5" fill="#FFFFFF"/>
  <circle cx="58" cy="35" r="1.5" fill="#FFFFFF"/>
  <!-- ORANGE SUCTION TOE PADS (Đệm ngón tròn màu cam bám lá) -->
  <circle cx="24" cy="50" r="4" fill="#F97316"/>
  <circle cx="20" cy="58" r="4" fill="#F97316"/>
  <circle cx="72" cy="50" r="4" fill="#F97316"/>
  <circle cx="76" cy="58" r="4" fill="#F97316"/>
</svg>`,

  toad: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="toadWarty" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#A8A29E"/>
      <stop offset="50%" stop-color="#78716C"/>
      <stop offset="100%" stop-color="#57534E"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F5F4" stroke="#78716C" stroke-width="2.5"/>
  <!-- PLUMP WIDE SQUAT BODY (Thân mập béo, ngồi bệt) -->
  <ellipse cx="50" cy="62" rx="28" ry="20" fill="url(#toadWarty)"/>
  <!-- Parotoid Poison Glands Behind Eyes (Tuyến độc lớn mang tai) -->
  <ellipse cx="32" cy="42" rx="6" ry="10" transform="rotate(-20, 32, 42)" fill="#57534E"/>
  <ellipse cx="68" cy="42" rx="6" ry="10" transform="rotate(20, 68, 42)" fill="#57534E"/>
  <!-- Broad Flat Head -->
  <ellipse cx="50" cy="48" rx="20" ry="14" fill="url(#toadWarty)"/>
  <!-- Horizontal Slit Eyes -->
  <circle cx="36" cy="38" r="6.5" fill="#CA8A04"/>
  <circle cx="64" cy="38" r="6.5" fill="#CA8A04"/>
  <ellipse cx="36" cy="38" rx="4.5" ry="1.8" fill="#000000"/>
  <ellipse cx="64" cy="38" rx="4.5" ry="1.8" fill="#000000"/>
  <!-- NUMEROUS WARTY BUMPS (Vô số nốt mụn cóc sần sùi khắp da) -->
  <circle cx="44" cy="54" r="2.5" fill="#44403C"/>
  <circle cx="56" cy="54" r="2.2" fill="#44403C"/>
  <circle cx="34" cy="62" r="3" fill="#44403C"/>
  <circle cx="48" cy="66" r="3.2" fill="#44403C"/>
  <circle cx="62" cy="62" r="3" fill="#44403C"/>
  <circle cx="40" cy="72" r="2.5" fill="#44403C"/>
  <circle cx="58" cy="72" r="2.5" fill="#44403C"/>
  <!-- Short Ground Legs -->
  <ellipse cx="22" cy="70" rx="8" ry="4" fill="#57534E"/>
  <ellipse cx="78" cy="70" rx="8" ry="4" fill="#57534E"/>
</svg>`,

  salamander: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#0F172A" stroke-width="2.5"/>
  <!-- Wet mossy stone underbelly -->
  <ellipse cx="50" cy="78" rx="36" ry="10" fill="#334155"/>
  <!-- SLENDER SMOOTH LIZARD-LIKE BODY (Thân dài, da trơn bóng màu đen) -->
  <path d="M 32,32 Q 44,40 50,56 Q 56,72 64,86" stroke="#09090B" stroke-width="12" stroke-linecap="round" fill="none"/>
  <!-- Rounded Head with protruding snout -->
  <ellipse cx="30" cy="30" rx="8" ry="7" fill="#09090B"/>
  <circle cx="28" cy="27" r="1.8" fill="#FACC15"/>
  <!-- VIVID YELLOW/ORANGE FIRE SPOTS (Đốm vàng cam rực rỡ kỳ nhông lửa) -->
  <ellipse cx="30" cy="30" rx="3" ry="2" fill="#FACC15"/>
  <circle cx="36" cy="36" r="3" fill="#FACC15"/>
  <circle cx="42" cy="44" r="3.5" fill="#F59E0B"/>
  <circle cx="48" cy="52" r="3.2" fill="#FACC15"/>
  <circle cx="54" cy="64" r="3" fill="#F59E0B"/>
  <circle cx="60" cy="76" r="2.5" fill="#FACC15"/>
  <!-- 4 Splayed Legs with delicate toes -->
  <path d="M 28,36 Q 18,34 14,40" stroke="#09090B" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M 44,46 Q 54,42 60,46" stroke="#09090B" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M 46,60 Q 36,66 32,74" stroke="#09090B" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M 58,74 Q 68,76 72,82" stroke="#09090B" stroke-width="3" stroke-linecap="round" fill="none"/>
</svg>`,

  gecko: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="geckoSkin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2DD4BF"/>
      <stop offset="100%" stop-color="#0F766E"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <!-- EXPANDED ADHESIVE TOE PADS (Đầu ngón tay xòe rộng bám tường) -->
  <!-- Forefeet -->
  <circle cx="22" cy="28" r="3.2" fill="#14B8A6"/>
  <circle cx="26" cy="24" r="3.2" fill="#14B8A6"/>
  <circle cx="30" cy="28" r="3.2" fill="#14B8A6"/>
  <circle cx="70" cy="28" r="3.2" fill="#14B8A6"/>
  <circle cx="74" cy="24" r="3.2" fill="#14B8A6"/>
  <circle cx="78" cy="28" r="3.2" fill="#14B8A6"/>
  <!-- Hindfeet -->
  <circle cx="22" cy="74" r="3.2" fill="#14B8A6"/>
  <circle cx="26" cy="78" r="3.2" fill="#14B8A6"/>
  <circle cx="30" cy="74" r="3.2" fill="#14B8A6"/>
  <circle cx="70" cy="74" r="3.2" fill="#14B8A6"/>
  <circle cx="74" cy="78" r="3.2" fill="#14B8A6"/>
  <circle cx="78" cy="74" r="3.2" fill="#14B8A6"/>
  <!-- Body & Limbs climbing vertically -->
  <path d="M 32,34 L 44,44 M 68,34 L 56,44 M 32,70 L 44,60 M 68,70 L 56,60" stroke="url(#geckoSkin)" stroke-width="4.5" stroke-linecap="round"/>
  <!-- Torso & Head -->
  <ellipse cx="50" cy="52" rx="10" ry="18" fill="url(#geckoSkin)"/>
  <polygon points="50,22 40,36 60,36" fill="url(#geckoSkin)"/>
  <!-- Fat segmented tail -->
  <path d="M 50,68 C 50,78 54,88 52,94" stroke="url(#geckoSkin)" stroke-width="6" stroke-linecap="round"/>
  <!-- Big Eyes with Vertical Wavy Slit Pupil -->
  <circle cx="44" cy="28" r="3.5" fill="#FACC15"/>
  <circle cx="56" cy="28" r="3.5" fill="#FACC15"/>
  <line x1="44" y1="25" x2="44" y2="31" stroke="#000000" stroke-width="1.5"/>
  <line x1="56" y1="25" x2="56" y2="31" stroke="#000000" stroke-width="1.5"/>
</svg>`,

  tortoise: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="tortoiseDome" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="50%" stop-color="#92400E"/>
      <stop offset="100%" stop-color="#451A03"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#92400E" stroke-width="2.5"/>
  <!-- HEAVY HIGH-DOMED CARAPACE (Mai gồ cao hình vòm với vân sâu) -->
  <path d="M 18,66 C 18,34 82,34 82,66 Z" fill="url(#tortoiseDome)"/>
  <!-- Pyramidal Growth Rings (Vân vảy hình tháp) -->
  <polygon points="50,40 40,50 60,50" fill="#B45309" stroke="#FDE68A" stroke-width="1.5"/>
  <polygon points="36,52 26,62 46,62" fill="#B45309" stroke="#FDE68A" stroke-width="1.5"/>
  <polygon points="64,52 54,62 74,62" fill="#B45309" stroke="#FDE68A" stroke-width="1.5"/>
  <!-- ELEPHANTINE COLUMNAR LEGS (Bốn chân dầy hình trụ tròn như chân voi) -->
  <rect x="24" y="66" width="10" height="16" rx="3" fill="#78716C"/>
  <circle cx="26" cy="80" r="1.5" fill="#E2E8F0"/>
  <circle cx="29" cy="81" r="1.5" fill="#E2E8F0"/>
  <circle cx="32" cy="80" r="1.5" fill="#E2E8F0"/>
  <rect x="66" y="66" width="10" height="16" rx="3" fill="#78716C"/>
  <circle cx="68" cy="80" r="1.5" fill="#E2E8F0"/>
  <circle cx="71" cy="81" r="1.5" fill="#E2E8F0"/>
  <circle cx="74" cy="80" r="1.5" fill="#E2E8F0"/>
  <!-- Heavy Wrinkled Head & Neck -->
  <ellipse cx="84" cy="62" rx="9" ry="7" fill="#78716C"/>
  <circle cx="86" cy="60" r="1.8" fill="#000000"/>
</svg>`,

  // =========================================================================
  // BIO-U06: CÔN TRÙNG & CHÂN KHỚP (INSECTS)
  // =========================================================================
  dragonfly: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="dragonBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#0284C7"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDFA" stroke="#0891B2" stroke-width="2.5"/>
  <!-- FOUR HORIZONTAL CLEAR RETICULATED WINGS (Bốn cánh mỏng gân ren trong suốt) -->
  <ellipse cx="26" cy="42" rx="22" ry="5.5" transform="rotate(-10, 26, 42)" fill="#BAE6FD" opacity="0.65" stroke="#38BDF8" stroke-width="1"/>
  <ellipse cx="74" cy="42" rx="22" ry="5.5" transform="rotate(10, 74, 42)" fill="#BAE6FD" opacity="0.65" stroke="#38BDF8" stroke-width="1"/>
  <ellipse cx="28" cy="52" rx="19" ry="5" transform="rotate(5, 28, 52)" fill="#BAE6FD" opacity="0.65" stroke="#38BDF8" stroke-width="1"/>
  <ellipse cx="72" cy="52" rx="19" ry="5" transform="rotate(-5, 72, 52)" fill="#BAE6FD" opacity="0.65" stroke="#38BDF8" stroke-width="1"/>
  <!-- Wing veins -->
  <line x1="8" y1="39" x2="44" y2="44" stroke="#0284C7" stroke-width="0.8"/>
  <line x1="92" y1="39" x2="56" y2="44" stroke="#0284C7" stroke-width="0.8"/>
  <!-- VERY LONG SLENDER NEEDLE ABDOMEN (Thân rất dài hình cây kim) -->
  <rect x="48" y="38" width="4" height="48" rx="2" fill="url(#dragonBody)"/>
  <!-- Thorax -->
  <ellipse cx="50" cy="36" rx="4.5" ry="6" fill="#0891B2"/>
  <!-- HUGE WRAPAROUND COMPOUND EYES (Đôi mắt kép cực lớn) -->
  <circle cx="46" cy="26" r="4.5" fill="#10B981"/>
  <circle cx="54" cy="26" r="4.5" fill="#10B981"/>
  <circle cx="45" cy="25" r="1.5" fill="#FFFFFF"/>
  <circle cx="53" cy="25" r="1.5" fill="#FFFFFF"/>
</svg>`,

  grasshopper: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- MASSIVE CHEVRON JUMPING HIND LEGS (Chân sau cực to hình chữ V để bật nhảy) -->
  <polyline points="46,54 26,24 20,68" stroke="#15803D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <polyline points="54,54 74,24 80,68" stroke="#15803D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Long slender green body with folded wings -->
  <ellipse cx="50" cy="54" rx="10" ry="20" fill="#22C55E"/>
  <polygon points="46,38 50,30 54,38" fill="#15803D"/>
  <!-- Large Head & Compound Eye -->
  <circle cx="46" cy="34" r="2.5" fill="#A3E635"/>
  <circle cx="54" cy="34" r="2.5" fill="#A3E635"/>
  <circle cx="46" cy="34" r="1" fill="#000000"/>
  <circle cx="54" cy="34" r="1" fill="#000000"/>
  <!-- Threadlike Antennae -->
  <path d="M 46,30 Q 38,16 32,12" stroke="#15803D" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M 54,30 Q 62,16 68,12" stroke="#15803D" stroke-width="1.5" stroke-linecap="round" fill="none"/>
</svg>`,

  mantis: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="mantisGreen" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="100%" stop-color="#15803D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- Elongated Prothorax / Neck -->
  <line x1="50" y1="36" x2="50" y2="60" stroke="#15803D" stroke-width="5" stroke-linecap="round"/>
  <!-- RAPTORIAL FORELEGS HELD IN PRAYER POSE (Hai chân trước dạng lưỡi hái sắc nhọn) -->
  <polyline points="48,42 34,36 38,52" stroke="#16A34A" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <polyline points="52,42 66,36 62,52" stroke="#16A34A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
  <!-- Spines on grasping forelegs -->
  <line x1="36" y1="44" x2="33" y2="45" stroke="#DC2626" stroke-width="1.5"/>
  <line x1="64" y1="44" x2="67" y2="45" stroke="#DC2626" stroke-width="1.5"/>
  <!-- Slender Slanted Abdomen -->
  <ellipse cx="50" cy="72" rx="7" ry="16" fill="url(#mantisGreen)"/>
  <!-- TRIANGULAR HEAD (Đầu tam giác linh hoạt) -->
  <polygon points="50,34 38,24 62,24" fill="#22C55E"/>
  <!-- Large Prominent Bulging Compound Eyes -->
  <circle cx="38" cy="24" r="5" fill="#84CC16"/>
  <circle cx="62" cy="24" r="5" fill="#84CC16"/>
  <circle cx="38" cy="24" r="2" fill="#000000"/>
  <circle cx="62" cy="24" r="2" fill="#000000"/>
</svg>`,

  firefly: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="bioglow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FACC15"/>
      <stop offset="60%" stop-color="#A3E635"/>
      <stop offset="100%" stop-color="#A3E635" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#EAB308" stroke-width="2.5"/>
  <!-- RADIATING BIOLUMINESCENT GLOW (Ánh sáng huỳnh quang vàng xanh lung linh) -->
  <circle cx="50" cy="70" r="24" fill="url(#bioglow)"/>
  <!-- Glow rays -->
  <line x1="50" y1="62" x2="50" y2="92" stroke="#FEF08A" stroke-width="1.5" stroke-dasharray="2,2"/>
  <line x1="36" y1="70" x2="64" y2="70" stroke="#FEF08A" stroke-width="1.5" stroke-dasharray="2,2"/>
  <!-- GLOWING ABDOMEN LANTERN (Bụng phát sáng) -->
  <ellipse cx="50" cy="70" rx="8" ry="10" fill="#FACC15"/>
  <!-- Hard Dark Elytra Wing Covers Spread Open (Hai cánh mở nhẹ) -->
  <path d="M 48,46 C 42,48 24,56 22,68 C 32,68 44,56 48,46 Z" fill="#334155"/>
  <path d="M 52,46 C 58,48 76,56 78,68 C 68,68 56,56 52,46 Z" fill="#334155"/>
  <!-- Delicate flying wings underneath -->
  <ellipse cx="32" cy="54" rx="14" ry="4" transform="rotate(25, 32, 54)" fill="#BAE6FD" opacity="0.6"/>
  <ellipse cx="68" cy="54" rx="14" ry="4" transform="rotate(-25, 68, 54)" fill="#BAE6FD" opacity="0.6"/>
  <!-- Black Head with Reddish Pronotum Shield -->
  <ellipse cx="50" cy="42" rx="6" ry="4" fill="#EF4444"/>
  <circle cx="50" cy="34" r="4" fill="#09090B"/>
  <!-- Feathery antennae -->
  <path d="M 48,32 Q 40,24 38,20" stroke="#94A3B8" stroke-width="1.2" fill="none"/>
  <path d="M 52,32 Q 60,24 62,20" stroke="#94A3B8" stroke-width="1.2" fill="none"/>
</svg>`,

  cicada: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="cicadaBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#44403C"/>
      <stop offset="100%" stop-color="#1C1917"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#CA8A04" stroke-width="2.5"/>
  <!-- WIDE-SET EYES ON BROAD HEAD (Mắt to hai bên đầu rộng) -->
  <circle cx="30" cy="34" r="5.5" fill="#DC2626"/>
  <circle cx="70" cy="34" r="5.5" fill="#DC2626"/>
  <ellipse cx="50" cy="36" rx="16" ry="8" fill="url(#cicadaBody)"/>
  <!-- Stout Robust Thorax -->
  <polygon points="50,42 34,50 66,50" fill="#78350F"/>
  <!-- CLEAR TENT-LIKE FOLDED WINGS WITH PRONOUNCED VEINS (Cánh trong suốt xếp mái nhà) -->
  <path d="M 34,48 L 48,88 L 50,48 Z" fill="#BAE6FD" opacity="0.75" stroke="#38BDF8" stroke-width="1.2"/>
  <path d="M 66,48 L 52,88 L 50,48 Z" fill="#BAE6FD" opacity="0.75" stroke="#38BDF8" stroke-width="1.2"/>
  <line x1="38" y1="52" x2="48" y2="82" stroke="#0284C7" stroke-width="0.8"/>
  <line x1="62" y1="52" x2="52" y2="82" stroke="#0284C7" stroke-width="0.8"/>
  <!-- Short digging forelegs -->
  <line x1="32" y1="44" x2="22" y2="46" stroke="#44403C" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="68" y1="44" x2="78" y2="46" stroke="#44403C" stroke-width="2.5" stroke-linecap="round"/>
</svg>`,

  caterpillar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="100%" stop-color="#16A34A"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#22C55E" stroke-width="2.5"/>
  <!-- Fresh juicy green leaf with bite mark -->
  <path d="M 12,74 C 20,44 60,34 88,40 C 88,68 56,86 12,74 Z" fill="url(#leafGrad)"/>
  <path d="M 70,38 C 76,42 78,48 74,52" fill="#F0FDF4"/>
  <!-- MULTI-SEGMENTED ROUND BODY (Thân nhiều đốt tròn màu xanh non) -->
  <circle cx="26" cy="62" r="7.5" fill="#84CC16" stroke="#4D7C0F" stroke-width="1"/>
  <circle cx="36" cy="58" r="8" fill="#84CC16" stroke="#4D7C0F" stroke-width="1"/>
  <circle cx="48" cy="54" r="8" fill="#84CC16" stroke="#4D7C0F" stroke-width="1"/>
  <circle cx="60" cy="52" r="8" fill="#84CC16" stroke="#4D7C0F" stroke-width="1"/>
  <circle cx="72" cy="50" r="8.5" fill="#84CC16" stroke="#4D7C0F" stroke-width="1"/>
  <!-- Round Head with Cheerful Eye -->
  <circle cx="82" cy="46" r="8.5" fill="#EAB308" stroke="#CA8A04" stroke-width="1"/>
  <circle cx="84" cy="44" r="2.2" fill="#000000"/>
  <circle cx="83.5" cy="43.5" r="0.8" fill="#FFFFFF"/>
  <!-- Colorful dots / Spiracles on each segment -->
  <circle cx="26" cy="62" r="1.5" fill="#EF4444"/>
  <circle cx="36" cy="58" r="1.5" fill="#EF4444"/>
  <circle cx="48" cy="54" r="1.5" fill="#EF4444"/>
  <circle cx="60" cy="52" r="1.5" fill="#EF4444"/>
  <circle cx="72" cy="50" r="1.5" fill="#EF4444"/>
  <!-- True legs and prolegs holding leaf -->
  <line x1="36" y1="66" x2="36" y2="70" stroke="#4D7C0F" stroke-width="2" stroke-linecap="round"/>
  <line x1="48" y1="62" x2="48" y2="67" stroke="#4D7C0F" stroke-width="2" stroke-linecap="round"/>
  <line x1="60" y1="60" x2="60" y2="65" stroke="#4D7C0F" stroke-width="2" stroke-linecap="round"/>
</svg>`,

  // =========================================================================
  // BIO-U07: CÂY RỪNG, ĐẠI THỤ & CỔ THỰC VẬT (TREES & FOREST)
  // =========================================================================
  "oak tree": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="oakCanopy" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#15803D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="#15803D" stroke-width="2.5"/>
  <!-- Sturdy Gnarled Trunk (Thân to cành ngang gân guốc) -->
  <path d="M 44,84 L 46,58 L 38,48 M 46,58 L 54,58 L 62,48 M 54,58 L 56,84" stroke="#78350F" stroke-width="6" stroke-linecap="round" fill="none"/>
  <!-- Buttress Roots -->
  <line x1="44" y1="84" x2="36" y2="88" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
  <line x1="56" y1="84" x2="64" y2="88" stroke="#78350F" stroke-width="4" stroke-linecap="round"/>
  <!-- BROAD SPREADING CLOUD CANOPY (Tán cây vòm tròn rộng lớn) -->
  <circle cx="34" cy="42" r="15" fill="url(#oakCanopy)"/>
  <circle cx="66" cy="42" r="15" fill="url(#oakCanopy)"/>
  <circle cx="50" cy="32" r="18" fill="url(#oakCanopy)"/>
  <circle cx="38" cy="28" r="14" fill="#4ADE80"/>
  <circle cx="62" cy="28" r="14" fill="#4ADE80"/>
  <!-- CAPPED ACORN EMBLEM IN FOREGROUND (Quả sồi có mũ hạt) -->
  <ellipse cx="50" cy="84" rx="4.5" ry="5.5" fill="#92400E"/>
  <path d="M 45,80 C 45,76 55,76 55,80 Z" fill="#78350F"/>
  <line x1="50" y1="76" x2="50" y2="73" stroke="#78350F" stroke-width="1.2"/>
</svg>`,

  "pine tree": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#047857" stroke-width="2.5"/>
  <!-- Brown Trunk -->
  <rect x="46" y="74" width="8" height="14" fill="#78350F"/>
  <!-- LAYERED CONICAL EVERGREEN PAGODA TIERS (Tán hình nón tầng tầng lớp lớp) -->
  <polygon points="50,14 26,40 74,40" fill="#065F46"/>
  <polygon points="50,28 22,54 78,54" fill="#047857"/>
  <polygon points="50,42 16,74 84,74" fill="#064E3B"/>
  <!-- Needle branch tufts highlights -->
  <polygon points="50,18 32,38 68,38" fill="#10B981" opacity="0.4"/>
  <polygon points="50,32 28,52 72,52" fill="#10B981" opacity="0.4"/>
  <!-- Brown Pinecone hanging on branch -->
  <ellipse cx="64" cy="56" rx="3.5" ry="4.5" fill="#B45309"/>
  <ellipse cx="36" cy="56" rx="3.5" ry="4.5" fill="#B45309"/>
</svg>`,

  "maple tree": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="autumnFire" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FACC15"/>
      <stop offset="40%" stop-color="#F97316"/>
      <stop offset="100%" stop-color="#DC2626"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FFFBEB" stroke="#EA580C" stroke-width="2.5"/>
  <!-- Sturdy Trunk -->
  <rect x="46" y="68" width="8" height="20" rx="2" fill="#78350F"/>
  <!-- BLAZING SCARLET & ORANGE AUTUMN CANOPY (Tán lá phong đỏ rực mùa thu) -->
  <circle cx="34" cy="44" r="16" fill="url(#autumnFire)"/>
  <circle cx="66" cy="44" r="16" fill="url(#autumnFire)"/>
  <circle cx="50" cy="34" r="19" fill="url(#autumnFire)"/>
  <!-- DISTINCTIVE 5-LOBED PALMATE MAPLE LEAF IN CENTER (Chiếc lá phong xẻ 5 thùy) -->
  <path d="M 50,24 L 52,32 L 60,30 L 56,38 L 62,42 L 52,44 L 50,52 L 48,44 L 38,42 L 44,38 L 40,30 L 48,32 Z" fill="#FEF08A"/>
</svg>`,

  "willow tree": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDFA" stroke="#0D9488" stroke-width="2.5"/>
  <!-- Reflective Blue Pond Surface (Mặt nước hồ xanh biếc bên dưới) -->
  <ellipse cx="50" cy="84" rx="38" ry="8" fill="#38BDF8" opacity="0.65"/>
  <!-- Graceful Gnarled Trunk Leaning Over Water -->
  <path d="M 46,84 Q 54,64 50,44" stroke="#78350F" stroke-width="7" stroke-linecap="round" fill="none"/>
  <!-- LONG SWEEPING WEEPING BRANCHES CASCADING TO WATER (Cành liễu dài rủ xuống nước) -->
  <path d="M 50,44 Q 32,52 24,78" stroke="#16A34A" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M 50,44 Q 38,56 34,80" stroke="#22C55E" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 50,44 Q 46,58 44,82" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 50,44 Q 56,58 54,82" stroke="#4ADE80" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 50,44 Q 64,56 66,80" stroke="#22C55E" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 50,44 Q 70,52 76,78" stroke="#16A34A" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <!-- Water ripples -->
  <ellipse cx="34" cy="82" rx="4" ry="1.2" stroke="#BAE6FD" stroke-width="1" fill="none"/>
  <ellipse cx="66" cy="82" rx="4" ry="1.2" stroke="#BAE6FD" stroke-width="1" fill="none"/>
</svg>`,

  bamboo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#15803D" stroke-width="2.5"/>
  <!-- MULTIPLE UPRIGHT JOINTED CULMS (Bụi tre nhiều thân thẳng đứng phân đốt) -->
  <!-- Stem 1 -->
  <rect x="30" y="14" width="7" height="74" fill="#22C55E"/>
  <line x1="28" y1="32" x2="39" y2="32" stroke="#14532D" stroke-width="2.5"/>
  <line x1="28" y1="52" x2="39" y2="52" stroke="#14532D" stroke-width="2.5"/>
  <line x1="28" y1="72" x2="39" y2="72" stroke="#14532D" stroke-width="2.5"/>
  <!-- Stem 2 -->
  <rect x="46" y="10" width="8" height="78" fill="#16A34A"/>
  <line x1="44" y1="28" x2="56" y2="28" stroke="#14532D" stroke-width="2.5"/>
  <line x1="44" y1="48" x2="56" y2="48" stroke="#14532D" stroke-width="2.5"/>
  <line x1="44" y1="68" x2="56" y2="68" stroke="#14532D" stroke-width="2.5"/>
  <!-- Stem 3 -->
  <rect x="64" y="18" width="6" height="70" fill="#22C55E"/>
  <line x1="62" y1="36" x2="72" y2="36" stroke="#14532D" stroke-width="2.5"/>
  <line x1="62" y1="56" x2="72" y2="56" stroke="#14532D" stroke-width="2.5"/>
  <!-- LANCEOLATE POINTED BAMBOO LEAVES (Lá tre hình mũi mác rủ duyên dáng) -->
  <path d="M 37,32 C 46,30 52,36 50,42 C 44,40 38,36 37,32 Z" fill="#4ADE80"/>
  <path d="M 54,28 C 64,26 70,32 68,38 C 62,36 56,32 54,28 Z" fill="#4ADE80"/>
  <path d="M 46,48 C 36,46 30,52 32,58 C 38,56 44,52 46,48 Z" fill="#86EFAC"/>
  <path d="M 64,56 C 54,54 48,60 50,66 C 56,64 62,60 64,56 Z" fill="#86EFAC"/>
</svg>`,

  baobab: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="baobabBark" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78716C"/>
      <stop offset="50%" stop-color="#A8A29E"/>
      <stop offset="100%" stop-color="#57534E"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#B45309" stroke-width="2.5"/>
  <!-- Ground horizon -->
  <rect x="10" y="82" width="80" height="8" rx="2" fill="#D97706"/>
  <!-- MASSIVE BOTTLE-SHAPED SWOLLEN TRUNK (Thân gỗ khổng lồ phình to như bình nước) -->
  <path d="M 32,84 C 28,64 36,52 42,42 L 58,42 C 64,52 72,64 68,84 Z" fill="url(#baobabBark)"/>
  <!-- Bark vertical fissures -->
  <line x1="44" y1="50" x2="42" y2="80" stroke="#44403C" stroke-width="1.8"/>
  <line x1="50" y1="46" x2="50" y2="82" stroke="#44403C" stroke-width="1.8"/>
  <line x1="56" y1="50" x2="58" y2="80" stroke="#44403C" stroke-width="1.8"/>
  <!-- SPARSE ROOT-LIKE ROOTED BRANCHES AT TOP (Cành khẳng khiu trên ngọn như rễ chỉ trời) -->
  <path d="M 44,42 L 32,24 M 40,34 L 24,34 M 50,42 L 50,20 M 56,42 L 68,24 M 60,34 L 76,34" stroke="#57534E" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Sparse green leaf tufts -->
  <circle cx="32" cy="24" r="3" fill="#15803D"/>
  <circle cx="24" cy="34" r="3" fill="#15803D"/>
  <circle cx="50" cy="20" r="3.5" fill="#15803D"/>
  <circle cx="68" cy="24" r="3" fill="#15803D"/>
  <circle cx="76" cy="34" r="3" fill="#15803D"/>
</svg>`,

  redwood: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="redwoodBark" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#991B1B"/>
      <stop offset="50%" stop-color="#B91C1C"/>
      <stop offset="100%" stop-color="#7F1D1D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#991B1B" stroke-width="2.5"/>
  <!-- Mountain misty clouds at base -->
  <ellipse cx="28" cy="74" rx="16" ry="6" fill="#E2E8F0" opacity="0.75"/>
  <ellipse cx="72" cy="74" rx="16" ry="6" fill="#E2E8F0" opacity="0.75"/>
  <!-- TOWERING GIGANTIC RED-BARKED TRUNK (Thân cây thẳng tắp cực cao vỏ nâu đỏ) -->
  <path d="M 44,92 L 47,12 L 53,12 L 56,92 Z" fill="url(#redwoodBark)"/>
  <!-- Deep vertical bark furrows -->
  <line x1="48" y1="14" x2="47" y2="90" stroke="#450A0A" stroke-width="1.5"/>
  <line x1="52" y1="14" x2="53" y2="90" stroke="#450A0A" stroke-width="1.5"/>
  <!-- Buttress flared base -->
  <polygon points="44,92 36,94 48,84" fill="#7F1D1D"/>
  <polygon points="56,92 64,94 52,84" fill="#7F1D1D"/>
  <!-- Dense Conifer Foliage High Up in the Clouds -->
  <polygon points="50,10 38,26 62,26" fill="#14532D"/>
  <polygon points="50,22 34,38 66,38" fill="#166534"/>
  <polygon points="50,34 32,50 68,50" fill="#15803D"/>
  <!-- Human scale silhouette comparison for scale (người tí hon đứng cạnh thân khổng lồ) -->
  <circle cx="38" cy="84" r="1.5" fill="#3B82F6"/>
  <line x1="38" y1="85.5" x2="38" y2="90" stroke="#3B82F6" stroke-width="1"/>
</svg>`,

  mangrove: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#ECFEFF" stroke="#0891B2" stroke-width="2.5"/>
  <!-- Tidal Water Level (Mặt nước biển thủy triều) -->
  <rect x="6" y="68" width="88" height="24" fill="#0284C7" opacity="0.5"/>
  <line x1="6" y1="68" x2="94" y2="68" stroke="#38BDF8" stroke-width="2"/>
  <!-- SPIDER-LIKE ARCHED STILT ROOTS (Hệ thống rễ chống cong vòm nhô lên khỏi nước) -->
  <path d="M 50,48 Q 32,60 22,86" stroke="#78350F" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M 50,48 Q 42,62 38,88" stroke="#78350F" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M 50,48 Q 58,62 62,88" stroke="#78350F" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M 50,48 Q 68,60 78,86" stroke="#78350F" stroke-width="5" stroke-linecap="round" fill="none"/>
  <!-- Trunk above root arch -->
  <rect x="46" y="34" width="8" height="16" fill="#78350F"/>
  <!-- Dense Rounded Canopy Above (Tán lá xanh mướt phía trên) -->
  <ellipse cx="50" cy="28" rx="24" ry="14" fill="#15803D"/>
  <circle cx="34" cy="24" r="12" fill="#22C55E"/>
  <circle cx="66" cy="24" r="12" fill="#22C55E"/>
  <circle cx="50" cy="20" r="12" fill="#4ADE80"/>
</svg>`,

  cypress: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="cypressSpire" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#064E3B"/>
      <stop offset="50%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#064E3B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="#047857" stroke-width="2.5"/>
  <!-- Sunny Rolling Mediterranean Hill -->
  <path d="M 6,86 Q 50,78 94,86 L 94,94 L 6,94 Z" fill="#FACC15"/>
  <!-- Trunk Base -->
  <rect x="48" y="78" width="4" height="10" fill="#78350F"/>
  <!-- SLENDER COLUMNAR SPIRE (Tán hẹp thon dài vuốt nhọn hình ngọn tháp/cột) -->
  <path d="M 50,10 C 44,24 40,58 43,80 L 57,80 C 60,58 56,24 50,10 Z" fill="url(#cypressSpire)"/>
  <!-- Feathered flame-like scale texture -->
  <path d="M 50,16 Q 46,30 50,38" stroke="#10B981" stroke-width="1.5" fill="none"/>
  <path d="M 50,34 Q 44,48 50,56" stroke="#10B981" stroke-width="1.5" fill="none"/>
  <path d="M 50,52 Q 44,66 50,74" stroke="#10B981" stroke-width="1.5" fill="none"/>
</svg>`,

  "birch tree": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#475569" stroke-width="2.5"/>
  <!-- CLEAN WHITE BARK TRUNK (Thân cây màu trắng bạc sạch sẽ) -->
  <rect x="44" y="20" width="12" height="72" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1"/>
  <!-- DISTINCTIVE HORIZONTAL BLACK LENTICELS & SCARS (Các vết sẹo và nứt ngang đen đặc trưng) -->
  <line x1="44" y1="30" x2="51" y2="30" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="50" y1="40" x2="56" y2="40" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round"/>
  <polygon points="44,50 49,48 49,52" fill="#0F172A"/>
  <line x1="44" y1="62" x2="53" y2="62" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="48" y1="74" x2="56" y2="74" stroke="#0F172A" stroke-width="2.2" stroke-linecap="round"/>
  <!-- Dainty Triangular Birch Leaves fluttering -->
  <path d="M 38,24 Q 30,22 28,30 Q 36,32 38,24 Z" fill="#84CC16"/>
  <path d="M 62,28 Q 70,26 72,34 Q 64,36 62,28 Z" fill="#84CC16"/>
  <path d="M 34,42 Q 24,40 22,48 Q 32,50 34,42 Z" fill="#65A30D"/>
  <path d="M 66,48 Q 76,46 78,54 Q 68,56 66,48 Z" fill="#65A30D"/>
</svg>`,

  fern: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- PINNATE FRONDS WITH FEATHERY LEAFLETS (Lá dương xỉ xẻ thùy lông chim nhiều tầng) -->
  <path d="M 22,88 Q 36,54 68,20" stroke="#15803D" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- Leaflets paired -->
  <polygon points="46,38 36,32 44,44" fill="#22C55E"/>
  <polygon points="48,36 56,30 52,42" fill="#22C55E"/>
  <polygon points="40,50 28,44 38,56" fill="#16A34A"/>
  <polygon points="44,48 54,42 48,54" fill="#16A34A"/>
  <polygon points="34,64 20,58 32,70" fill="#15803D"/>
  <polygon points="38,62 50,56 42,68" fill="#15803D"/>
  <!-- SPIRAL UNFURLING FIDDLEHEAD CROZIER (Chồi non cuộn xoắn đầu đàn violon) -->
  <path d="M 52,88 Q 62,70 66,58 C 68,52 74,52 74,56 C 74,60 70,62 68,60" stroke="#4ADE80" stroke-width="3.5" stroke-linecap="round" fill="none"/>
</svg>`,

  // =========================================================================
  // BIO-U08: CÁC LOÀI HOA (FLOWERS)
  // =========================================================================
  "water lily": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Calming blue pond water -->
  <ellipse cx="50" cy="74" rx="42" ry="14" fill="#38BDF8" opacity="0.4"/>
  <!-- ROUND LILY PAD WITH DISTINCT V-SLIT NOTCH (Phiến lá tròn có khe khuyết chữ V) -->
  <path d="M 50,74 L 66,66 A 26,14 0 1,0 62,82 Z" fill="#15803D"/>
  <!-- Dewdrop on lily pad -->
  <ellipse cx="36" cy="72" rx="2.5" ry="1.8" fill="#FFFFFF" opacity="0.8"/>
  <!-- MULTILAYERED STARBURST WATER LILY PETALS (Đóa hoa súng nở trên mặt nước) -->
  <polygon points="50,32 44,48 50,46" fill="#F472B6"/>
  <polygon points="50,32 56,48 50,46" fill="#F472B6"/>
  <polygon points="40,38 42,52 48,50" fill="#FB7185"/>
  <polygon points="60,38 58,52 52,50" fill="#FB7185"/>
  <polygon points="32,48 42,56 46,52" fill="#FDA4AF"/>
  <polygon points="68,48 58,56 54,52" fill="#FDA4AF"/>
  <!-- Pure White / Pink Inner Core -->
  <polygon points="46,44 50,36 54,44" fill="#FFFFFF"/>
  <polygon points="42,50 50,40 58,50" fill="#FFF1F2"/>
  <circle cx="50" cy="48" r="3.5" fill="#FACC15"/>
</svg>`,

  orchid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FAF5FF" stroke="#A855F7" stroke-width="2.5"/>
  <!-- Upper Dorsal Sepal -->
  <ellipse cx="50" cy="28" rx="8" ry="14" fill="#E9D5FF" stroke="#C084FC" stroke-width="1.2"/>
  <!-- Two Lateral Petals -->
  <ellipse cx="28" cy="44" rx="14" ry="11" transform="rotate(-20, 28, 44)" fill="#F3E8FF" stroke="#C084FC" stroke-width="1.2"/>
  <ellipse cx="72" cy="44" rx="14" ry="11" transform="rotate(20, 72, 44)" fill="#F3E8FF" stroke="#C084FC" stroke-width="1.2"/>
  <!-- Lower Lateral Sepals -->
  <ellipse cx="36" cy="66" rx="9" ry="14" transform="rotate(25, 36, 66)" fill="#E9D5FF" stroke="#C084FC" stroke-width="1.2"/>
  <ellipse cx="64" cy="66" rx="9" ry="14" transform="rotate(-25, 64, 66)" fill="#E9D5FF" stroke="#C084FC" stroke-width="1.2"/>
  <!-- PROMINENT RUFFLED LABELLUM / LIP (Cánh môi nổi bật kiêu sa ở trung tâm) -->
  <path d="M 50,48 C 38,50 36,70 50,76 C 64,70 62,50 50,48 Z" fill="#A855F7"/>
  <circle cx="50" cy="62" r="5" fill="#FACC15"/>
  <circle cx="50" cy="62" r="2" fill="#E11D48"/>
</svg>`,

  jasmine: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- Glossy dark green leaves -->
  <ellipse cx="28" cy="54" rx="16" ry="8" transform="rotate(-30, 28, 54)" fill="#15803D"/>
  <ellipse cx="72" cy="54" rx="16" ry="8" transform="rotate(30, 72, 54)" fill="#15803D"/>
  <ellipse cx="50" cy="74" rx="16" ry="8" fill="#166534"/>
  <!-- PURE WHITE 5-PETALED STAR BLOSSOMS (Hoa nhài trắng tinh khiết 5 cánh hình sao) -->
  <ellipse cx="50" cy="30" rx="6" ry="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
  <ellipse cx="66" cy="42" rx="6" ry="12" transform="rotate(72, 66, 42)" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
  <ellipse cx="60" cy="60" rx="6" ry="12" transform="rotate(144, 60, 60)" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
  <ellipse cx="40" cy="60" rx="6" ry="12" transform="rotate(216, 40, 60)" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
  <ellipse cx="34" cy="42" rx="6" ry="12" transform="rotate(288, 34, 42)" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
  <!-- Yellow Fragrant Center -->
  <circle cx="50" cy="48" r="3.5" fill="#FDE047"/>
</svg>`,

  "cherry blossom": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FFF1F2" stroke="#F43F5E" stroke-width="2.5"/>
  <!-- 5 NOTCHED V-TIP PINK SAKURA PETALS (5 cánh hoa anh đào có vết khuyết chữ V) -->
  <!-- Petal 1 (top) -->
  <path d="M 50,50 C 44,32 40,22 46,18 L 50,22 L 54,18 C 60,22 56,32 50,50 Z" fill="#FDA4AF"/>
  <!-- Petal 2 -->
  <path d="M 50,50 C 66,42 76,36 80,42 L 76,46 L 82,48 C 80,54 70,56 50,50 Z" fill="#FDA4AF"/>
  <!-- Petal 3 -->
  <path d="M 50,50 C 60,66 66,74 62,80 L 58,76 L 56,82 C 50,80 48,70 50,50 Z" fill="#FB7185"/>
  <!-- Petal 4 -->
  <path d="M 50,50 C 40,70 34,80 28,78 L 30,72 L 24,72 C 24,66 32,60 50,50 Z" fill="#FB7185"/>
  <!-- Petal 5 -->
  <path d="M 50,50 C 30,54 20,54 18,48 L 24,46 L 20,42 C 24,36 34,42 50,50 Z" fill="#FDA4AF"/>
  <!-- Inner Star Pistil & Stamens with Golden Tips -->
  <circle cx="50" cy="50" r="4.5" fill="#E11D48"/>
  <line x1="50" y1="50" x2="50" y2="40" stroke="#CA8A04" stroke-width="1.2"/>
  <circle cx="50" cy="40" r="1.2" fill="#FACC15"/>
  <line x1="50" y1="50" x2="58" y2="46" stroke="#CA8A04" stroke-width="1.2"/>
  <circle cx="58" cy="46" r="1.2" fill="#FACC15"/>
  <line x1="50" y1="50" x2="56" y2="58" stroke="#CA8A04" stroke-width="1.2"/>
  <circle cx="56" cy="58" r="1.2" fill="#FACC15"/>
</svg>`,

  dandelion: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Slender Stem -->
  <path d="M 44,90 Q 48,70 48,50" stroke="#65A30D" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- SPHERICAL BLOWBALL PUFF OF PARACHUTE SEEDS (Quả cầu hạt trắng xốp bồ công anh) -->
  <circle cx="48" cy="48" r="4" fill="#A16207"/>
  <!-- Radial seed rays -->
  <line x1="48" y1="48" x2="48" y2="22" stroke="#E2E8F0" stroke-width="1.2"/>
  <line x1="48" y1="48" x2="30" y2="30" stroke="#E2E8F0" stroke-width="1.2"/>
  <line x1="48" y1="48" x2="22" y2="48" stroke="#E2E8F0" stroke-width="1.2"/>
  <line x1="48" y1="48" x2="30" y2="66" stroke="#E2E8F0" stroke-width="1.2"/>
  <line x1="48" y1="48" x2="66" y2="30" stroke="#E2E8F0" stroke-width="1.2"/>
  <line x1="48" y1="48" x2="74" y2="48" stroke="#E2E8F0" stroke-width="1.2"/>
  <!-- Silky fluffy puffs on ray tips -->
  <circle cx="48" cy="22" r="3.5" fill="#FFFFFF"/>
  <circle cx="30" cy="30" r="3.5" fill="#FFFFFF"/>
  <circle cx="22" cy="48" r="3.5" fill="#FFFFFF"/>
  <circle cx="30" cy="66" r="3.5" fill="#FFFFFF"/>
  <circle cx="66" cy="30" r="3.5" fill="#FFFFFF"/>
  <circle cx="74" cy="48" r="3.5" fill="#FFFFFF"/>
  <!-- Parachute seeds drifting away in the breeze (Hạt bay theo gió) -->
  <path d="M 76,24 L 84,18 M 84,18 L 86,14 M 84,18 L 88,18" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="76" cy="24" r="1.2" fill="#78350F"/>
  <path d="M 82,34 L 90,28" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="82" cy="34" r="1.2" fill="#78350F"/>
</svg>`,

  // =========================================================================
  // BIO-U09: NẤM, RÊU, CỎ & THỰC VẬT ĐẶC BIỆT
  // =========================================================================
  succulent: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="succulentLeaf" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="25%" stop-color="#2DD4BF"/>
      <stop offset="100%" stop-color="#0F766E"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF2F8" stroke="#DB2777" stroke-width="2.5"/>
  <!-- Little terracotta pot at bottom -->
  <polygon points="34,74 66,74 62,90 38,90" fill="#EA580C"/>
  <rect x="32" y="70" width="36" height="5" rx="2" fill="#C2410C"/>
  <!-- ROSETTE OF THICK PLUMP FLESHY LEAVES (Lá sen đá dày mọng nước xếp tròn hoa thị) -->
  <!-- Outer ring leaves -->
  <ellipse cx="32" cy="58" rx="10" ry="6" transform="rotate(-30, 32, 58)" fill="url(#succulentLeaf)"/>
  <ellipse cx="68" cy="58" rx="10" ry="6" transform="rotate(30, 68, 58)" fill="url(#succulentLeaf)"/>
  <ellipse cx="28" cy="46" rx="10" ry="6" transform="rotate(-60, 28, 46)" fill="url(#succulentLeaf)"/>
  <ellipse cx="72" cy="46" rx="10" ry="6" transform="rotate(60, 72, 46)" fill="url(#succulentLeaf)"/>
  <!-- Middle ring -->
  <ellipse cx="38" cy="38" rx="9" ry="6" transform="rotate(-40, 38, 38)" fill="url(#succulentLeaf)"/>
  <ellipse cx="62" cy="38" rx="9" ry="6" transform="rotate(40, 62, 38)" fill="url(#succulentLeaf)"/>
  <ellipse cx="50" cy="32" rx="6" ry="9" fill="url(#succulentLeaf)"/>
  <!-- Inner tight bud rosette -->
  <ellipse cx="44" cy="46" rx="6" ry="4" transform="rotate(-20, 44, 46)" fill="#F472B6"/>
  <ellipse cx="56" cy="46" rx="6" ry="4" transform="rotate(20, 56, 46)" fill="#F472B6"/>
  <ellipse cx="50" cy="42" rx="4" ry="5" fill="#FBCFE8"/>
</svg>`,

  moss: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#15803D" stroke-width="2.5"/>
  <!-- Damp forest boulder (Tảng đá ẩm rừng) -->
  <path d="M 12,74 C 18,48 42,42 64,48 C 84,54 88,72 84,84 C 64,90 24,90 12,74 Z" fill="#64748B"/>
  <!-- DENSE VELVETY SOFT EMERALD MOSS CARPET (Thảm rêu xanh mịn như nhung) -->
  <path d="M 16,70 C 20,44 46,38 66,44 C 74,48 82,60 80,76 C 62,72 36,66 16,70 Z" fill="#22C55E"/>
  <!-- Micro moss tufts & shoots (Các chồi rêu nhung li ti) -->
  <circle cx="28" cy="56" r="3.5" fill="#4ADE80"/>
  <circle cx="36" cy="50" r="4" fill="#86EFAC"/>
  <circle cx="46" cy="46" r="4.5" fill="#4ADE80"/>
  <circle cx="56" cy="48" r="4" fill="#86EFAC"/>
  <circle cx="66" cy="54" r="3.5" fill="#4ADE80"/>
  <circle cx="74" cy="62" r="3" fill="#86EFAC"/>
  <!-- SLENDER SPOROPHYTE SPORE CAPSULES (Cuống bào tử mảnh cao vươn lên) -->
  <path d="M 38,48 Q 40,32 44,24" stroke="#15803D" stroke-width="1.5" fill="none"/>
  <ellipse cx="45" cy="23" rx="2" ry="3" transform="rotate(25, 45, 23)" fill="#CA8A04"/>
  <path d="M 52,44 Q 54,28 58,20" stroke="#15803D" stroke-width="1.5" fill="none"/>
  <ellipse cx="59" cy="19" rx="2" ry="3" transform="rotate(25, 59, 19)" fill="#CA8A04"/>
</svg>`,

  lichen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#475569" stroke-width="2.5"/>
  <!-- Granite Rock Surface with deep cracks -->
  <rect x="14" y="14" width="72" height="72" rx="10" fill="#64748B"/>
  <line x1="20" y1="36" x2="42" y2="48" stroke="#334155" stroke-width="2"/>
  <line x1="42" y1="48" x2="80" y2="44" stroke="#334155" stroke-width="2"/>
  <!-- CRUSTOSE / FOLIOSE LICHEN CRUSTS (Mảng vảy địa y xám xanh & vàng chanh bám chặt đá) -->
  <!-- Patch 1: Mint-grey lichen with ruffled margins -->
  <path d="M 32,32 C 22,34 20,52 30,58 C 42,62 52,54 48,40 C 46,30 38,30 32,32 Z" fill="#99F6E4" stroke="#2DD4BF" stroke-width="1.8"/>
  <circle cx="34" cy="44" r="3" fill="#5EEAD4"/>
  <circle cx="40" cy="50" r="2.5" fill="#5EEAD4"/>
  <!-- Patch 2: Xanthoria yellow-orange lichen -->
  <path d="M 56,48 C 50,54 52,68 64,72 C 76,74 80,60 74,52 C 68,46 60,46 56,48 Z" fill="#FDE047" stroke="#EAB308" stroke-width="1.8"/>
  <circle cx="64" cy="60" r="3.5" fill="#FACC15"/>
  <circle cx="70" cy="64" r="2.5" fill="#FACC15"/>
</svg>`,

  clover: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="cloverLeaf" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="100%" stop-color="#16A34A"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- Graceful Central Stem -->
  <path d="M 50,52 Q 52,78 44,90" stroke="#15803D" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- TRUE THREE-LEAF SHAMROCK (Cỏ ba lá chuẩn ☘️, 3 lá hình trái tim) -->
  <!-- Top Leaflet -->
  <path d="M 50,48 C 38,32 36,18 46,18 C 50,18 50,22 50,22 C 50,22 50,18 54,18 C 64,18 62,32 50,48 Z" fill="url(#cloverLeaf)"/>
  <path d="M 46,26 Q 50,24 54,26" stroke="#BBF7D0" stroke-width="1.5" fill="none"/>
  <!-- Bottom-Left Leaflet -->
  <path d="M 48,50 C 32,44 20,52 24,62 C 26,66 30,64 30,64 C 30,64 28,68 32,70 C 42,76 48,64 48,50 Z" fill="url(#cloverLeaf)"/>
  <!-- Bottom-Right Leaflet -->
  <path d="M 52,50 C 68,44 80,52 76,62 C 74,66 70,64 70,64 C 70,64 72,68 68,70 C 58,76 52,64 52,50 Z" fill="url(#cloverLeaf)"/>
</svg>`,

  vine: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#15803D" stroke-width="2.5"/>
  <!-- Support Wooden Pole (Cột gỗ/thân cây cho dây leo quấn) -->
  <rect x="44" y="10" width="12" height="80" rx="3" fill="#78350F"/>
  <!-- SPIRAL TWINING VINE STEM (Thân dây leo xanh xoắn ốc quanh cột) -->
  <path d="M 40,84 C 48,80 56,76 60,70 C 66,62 36,60 40,50 C 44,40 64,40 60,30 C 56,22 40,24 44,14" stroke="#22C55E" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <!-- CURLING TENDRILS (Tua cuốn xoăn tít bám rễ) -->
  <path d="M 40,50 C 32,48 28,52 32,56 C 34,58 36,56 34,54" stroke="#4ADE80" stroke-width="1.8" fill="none"/>
  <path d="M 60,30 C 68,28 72,32 68,36 C 66,38 64,36 66,34" stroke="#4ADE80" stroke-width="1.8" fill="none"/>
  <!-- Heart-shaped green leaves sprouting along vine -->
  <path d="M 38,72 Q 26,70 26,78 Q 38,82 38,72 Z" fill="#15803D"/>
  <path d="M 62,54 Q 74,52 74,60 Q 62,64 62,54 Z" fill="#16A34A"/>
  <path d="M 38,36 Q 24,34 26,42 Q 38,44 38,36 Z" fill="#15803D"/>
  <path d="M 62,20 Q 74,18 72,26 Q 62,28 62,20 Z" fill="#16A34A"/>
</svg>`,

  algae: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <radialGradient id="algaeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="70%" stop-color="#16A34A"/>
      <stop offset="100%" stop-color="#15803D"/>
    </radialGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#ECFEFF" stroke="#06B6D4" stroke-width="2.5"/>
  <!-- Pure Water Droplet Shape -->
  <path d="M 50,14 C 30,38 20,54 20,68 C 20,84 34,92 50,92 C 66,92 80,84 80,68 C 80,54 70,38 50,14 Z" fill="#A5F3FC" opacity="0.4"/>
  <!-- MICROSCOPIC GREEN CELLULAR ALGAE SPHERES (Tế bào vi tảo lục tròn) -->
  <circle cx="44" cy="52" r="9" fill="url(#algaeGlow)"/>
  <circle cx="41" cy="49" r="2.5" fill="#BBF7D0"/>
  <circle cx="58" cy="58" r="8" fill="url(#algaeGlow)"/>
  <circle cx="55" cy="55" r="2" fill="#BBF7D0"/>
  <circle cx="50" cy="68" r="7.5" fill="url(#algaeGlow)"/>
  <circle cx="48" cy="65" r="2" fill="#BBF7D0"/>
  <!-- Filamentous Algae Strands (Sợi tảo lục uốn lượn sản sinh oxy) -->
  <path d="M 30,62 Q 36,44 32,32" stroke="#22C55E" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 64,68 Q 68,48 62,38" stroke="#22C55E" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Tiny Oxygen bubbles (Bọt oxy tinh khiết) -->
  <circle cx="48" cy="38" r="2" fill="#FFFFFF"/>
  <circle cx="58" cy="42" r="1.5" fill="#FFFFFF"/>
  <circle cx="38" cy="42" r="1.5" fill="#FFFFFF"/>
</svg>`,

  seaweed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#0369A1" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Seabed Holdfast Stone -->
  <ellipse cx="50" cy="88" rx="28" ry="6" fill="#334155"/>
  <!-- WAVING KELP / SEAWEED BLADES (Rong biển dải lá bẹ dài mềm mại dập dờn) -->
  <!-- Blade 1 -->
  <path d="M 38,88 Q 28,68 36,48 Q 44,28 32,14" stroke="#15803D" stroke-width="5.5" stroke-linecap="round" fill="none"/>
  <!-- Blade 2 (center) -->
  <path d="M 50,88 Q 60,64 48,42 Q 38,24 52,12" stroke="#22C55E" stroke-width="6" stroke-linecap="round" fill="none"/>
  <!-- Blade 3 -->
  <path d="M 62,88 Q 72,66 64,46 Q 56,28 68,16" stroke="#16A34A" stroke-width="5.5" stroke-linecap="round" fill="none"/>
  <!-- Gas Bladders (Pneumatocysts bóng khí nổi) -->
  <circle cx="34" cy="52" r="2.5" fill="#86EFAC"/>
  <circle cx="52" cy="44" r="2.8" fill="#86EFAC"/>
  <circle cx="66" cy="50" r="2.5" fill="#86EFAC"/>
</svg>`,

  reed: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- Waterline at marsh bank -->
  <ellipse cx="50" cy="84" rx="40" ry="8" fill="#38BDF8" opacity="0.5"/>
  <!-- SLENDER JOINTED MARSH STEMS (Khóm thân sậy cao thanh mảnh mọc ven hồ) -->
  <path d="M 38,88 L 38,28" stroke="#65A30D" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 50,88 L 50,18" stroke="#4D7C0F" stroke-width="3" stroke-linecap="round"/>
  <path d="M 62,88 L 64,28" stroke="#65A30D" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Narrow Reed Leaves -->
  <path d="M 38,58 Q 24,52 20,62" stroke="#65A30D" stroke-width="2" fill="none"/>
  <path d="M 50,50 Q 64,44 70,54" stroke="#4D7C0F" stroke-width="2" fill="none"/>
  <!-- FEATHERY PLUMOSE FLOWER PLUMES (Bông cờ lông mềm phất phơ ở ngọn) -->
  <!-- Reed head 1 -->
  <ellipse cx="38" cy="22" rx="4.5" ry="9" transform="rotate(-15, 38, 22)" fill="#A16207"/>
  <!-- Center Reed head -->
  <ellipse cx="50" cy="14" rx="5" ry="10" fill="#78350F"/>
  <!-- Reed head 3 -->
  <ellipse cx="65" cy="22" rx="4.5" ry="9" transform="rotate(15, 65, 22)" fill="#A16207"/>
</svg>`,

  "pitcher plant": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="pitcherBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="50%" stop-color="#84CC16"/>
      <stop offset="100%" stop-color="#4D7C0F"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#15803D" stroke-width="2.5"/>
  <!-- Vine tendril suspending pitcher -->
  <path d="M 30,12 Q 36,26 44,36" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- VASE-SHAPED PITCHER TRAP (Chiếc bình bắt mồi hình phễu) -->
  <path d="M 44,38 C 38,44 38,68 44,82 C 48,88 56,88 60,82 C 66,68 64,44 58,38 Z" fill="url(#pitcherBody)"/>
  <!-- Smooth Slippery Peristome Rim (Vành miệng trơn trượt) -->
  <ellipse cx="51" cy="38" rx="8" ry="3.5" fill="#DC2626" stroke="#991B1B" stroke-width="1.2"/>
  <!-- OVERHANGING OPERCULUM HOOD LID (Nắp che phía trên) -->
  <path d="M 42,32 C 42,24 60,24 60,32 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="1.2"/>
  <!-- Curious tiny ant walking towards trap -->
  <circle cx="56" cy="36" r="1.2" fill="#000000"/>
</svg>`,

  "venus flytrap": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- Stem -->
  <path d="M 50,88 Q 50,68 50,56" stroke="#15803D" stroke-width="5" stroke-linecap="round"/>
  <!-- TWO HINGED CLAM-SHELL LOBES (Hai thùy lá như hàm kẹp) -->
  <!-- Left Lobe with Interlocking Cilia Spikes -->
  <path d="M 50,56 C 30,54 22,34 36,24 C 44,28 48,42 50,56 Z" fill="#22C55E"/>
  <path d="M 36,28 C 30,36 34,48 46,52 Z" fill="#EF4444"/>
  <!-- Right Lobe -->
  <path d="M 50,56 C 70,54 78,34 64,24 C 56,28 52,42 50,56 Z" fill="#22C55E"/>
  <path d="M 64,28 C 70,36 66,48 54,52 Z" fill="#EF4444"/>
  <!-- INTERLOCKING MARGINAL TEETH / SPIKES (Hàng gai nhọn đan cài ở rìa) -->
  <line x1="36" y1="24" x2="33" y2="18" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
  <line x1="30" y1="30" x2="25" y2="25" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
  <line x1="26" y1="38" x2="20" y2="35" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
  <line x1="64" y1="24" x2="67" y2="18" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
  <line x1="70" y1="30" x2="75" y2="25" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
  <line x1="74" y1="38" x2="80" y2="35" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
  <!-- Sensitive Trigger Hairs (Lông cảm ứng nhạy bén bên trong) -->
  <line x1="42" y1="40" x2="40" y2="35" stroke="#991B1B" stroke-width="1"/>
  <line x1="58" y1="40" x2="60" y2="35" stroke="#991B1B" stroke-width="1"/>
</svg>`,

  // =========================================================================
  // BIO-U10: GIẢI PHẪU & SINH THÁI ĐỘNG THỰC VẬT (ANATOMY)
  // =========================================================================
  scale: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="scaleRainbow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#2DD4BF"/>
      <stop offset="100%" stop-color="#A855F7"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0F9FF" stroke="#0284C7" stroke-width="2.5"/>
  <!-- MACRO CLOSE-UP OF OVERLAPPING TILED ANIMAL SCALES (Cận cảnh các lớp vảy xếp chồng) -->
  <!-- Row 1 (top) -->
  <path d="M 24,20 C 24,34 44,34 44,20 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <path d="M 44,20 C 44,34 64,34 64,20 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <path d="M 64,20 C 64,34 84,34 84,20 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <!-- Row 2 -->
  <path d="M 14,36 C 14,50 34,50 34,36 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <path d="M 34,36 C 34,50 54,50 54,36 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <path d="M 54,36 C 54,50 74,50 74,36 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <!-- Row 3 -->
  <path d="M 24,52 C 24,66 44,66 44,52 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <path d="M 44,52 C 44,66 64,66 64,52 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <path d="M 64,52 C 64,66 84,66 84,52 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <!-- Row 4 -->
  <path d="M 34,68 C 34,82 54,82 54,68 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
  <path d="M 54,68 C 54,82 74,82 74,68 Z" fill="url(#scaleRainbow)" stroke="#FFFFFF" stroke-width="1.5"/>
</svg>`,

  fur: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="warmFur" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="50%" stop-color="#B45309"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#B45309" stroke-width="2.5"/>
  <!-- CLOSE-UP TUFT OF LUSH SILKY ANIMAL FUR FIBERS (Cận cảnh một chùm lông thú mềm mại) -->
  <!-- Base pelt layer -->
  <path d="M 24,30 C 38,20 62,20 76,30 L 72,70 C 58,80 42,80 28,70 Z" fill="url(#warmFur)"/>
  <!-- Individual silky guard hair strands -->
  <path d="M 30,30 Q 36,54 38,76" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 38,26 Q 44,50 46,78" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M 46,24 Q 52,48 54,80" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 54,26 Q 60,50 62,78" stroke="#FDE68A" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M 62,30 Q 68,54 70,76" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round" fill="none"/>
  <!-- Underfur soft wavy details -->
  <path d="M 34,42 Q 42,46 50,42 Q 58,46 66,42" stroke="#78350F" stroke-width="1.8" fill="none"/>
  <path d="M 34,56 Q 42,60 50,56 Q 58,60 66,56" stroke="#78350F" stroke-width="1.8" fill="none"/>
</svg>`,

  paw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FDF2F8" stroke="#DB2777" stroke-width="2.5"/>
  <!-- Furry Paw Outline -->
  <ellipse cx="50" cy="54" rx="26" ry="24" fill="#F5F5F4" stroke="#E7E5E4" stroke-width="2"/>
  <!-- LARGE MAIN HEART-SHAPED METACARPAL PAD (Đệm chính lớn hình trái tim) -->
  <path d="M 50,50 C 42,46 32,54 36,66 C 40,74 50,80 50,80 C 50,80 60,74 64,66 C 68,54 58,46 50,50 Z" fill="#F472B6"/>
  <!-- FOUR ROUNDED DIGITAL TOE PADS (Bốn đệm ngón nhỏ hồng hào) -->
  <ellipse cx="30" cy="40" rx="5.5" ry="7" transform="rotate(-30, 30, 40)" fill="#F472B6"/>
  <ellipse cx="44" cy="32" rx="5.5" ry="7.5" transform="rotate(-10, 44, 32)" fill="#F472B6"/>
  <ellipse cx="56" cy="32" rx="5.5" ry="7.5" transform="rotate(10, 56, 32)" fill="#F472B6"/>
  <ellipse cx="70" cy="40" rx="5.5" ry="7" transform="rotate(30, 70, 40)" fill="#F472B6"/>
</svg>`,

  claw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="clawKeratin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#52525B"/>
      <stop offset="70%" stop-color="#18181B"/>
      <stop offset="100%" stop-color="#09090B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF2F2" stroke="#DC2626" stroke-width="2.5"/>
  <!-- Wood Branch Claw is Gripping into with fresh slash marks -->
  <rect x="18" y="72" width="64" height="18" rx="3" fill="#78350F"/>
  <line x1="42" y1="76" x2="36" y2="84" stroke="#451A03" stroke-width="2"/>
  <line x1="56" y1="76" x2="50" y2="84" stroke="#451A03" stroke-width="2"/>
  <!-- Muscular Scaled Toe Digit -->
  <path d="M 28,24 C 36,24 44,32 44,44 L 40,54 L 28,50 Z" fill="#EAB308"/>
  <circle cx="36" cy="36" r="2" fill="#CA8A04"/>
  <!-- SHARP HOOKED CURVED TALON CLAW (Móng vuốt cong sắc nhọn găm chặt) -->
  <path d="M 42,42 C 60,42 74,54 76,74 C 64,74 54,64 38,52 Z" fill="url(#clawKeratin)"/>
  <!-- Razor sharp tip highlight -->
  <path d="M 72,66 L 76,74 L 68,73" stroke="#FFFFFF" stroke-width="1.5" fill="none"/>
</svg>`,

  horn: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="hornRing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#78716C"/>
      <stop offset="50%" stop-color="#44403C"/>
      <stop offset="100%" stop-color="#1C1917"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F5F4" stroke="#78716C" stroke-width="2.5"/>
  <!-- PAIR OF SPIRAL RIDGED WILD ANIMAL HORNS (Cặp sừng xoắn chắc khỏe có gờ) -->
  <!-- Left Horn -->
  <path d="M 38,76 C 20,70 14,44 26,24 C 36,40 38,56 42,74 Z" fill="url(#hornRing)"/>
  <!-- Ridges on left horn -->
  <line x1="22" y1="48" x2="34" y2="52" stroke="#A8A29E" stroke-width="2"/>
  <line x1="22" y1="58" x2="36" y2="62" stroke="#A8A29E" stroke-width="2"/>
  <line x1="28" y1="68" x2="40" y2="70" stroke="#A8A29E" stroke-width="2"/>
  <!-- Right Horn -->
  <path d="M 62,76 C 80,70 86,44 74,24 C 64,40 62,56 58,74 Z" fill="url(#hornRing)"/>
  <!-- Ridges on right horn -->
  <line x1="78" y1="48" x2="66" y2="52" stroke="#A8A29E" stroke-width="2"/>
  <line x1="78" y1="58" x2="64" y2="62" stroke="#A8A29E" stroke-width="2"/>
  <line x1="72" y1="68" x2="60" y2="70" stroke="#A8A29E" stroke-width="2"/>
  <!-- Skull base connect -->
  <rect x="38" y="74" width="24" height="8" rx="3" fill="#D6D3D1"/>
</svg>`,

  beak: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="beakGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2.5"/>
  <!-- Avian Head base on left -->
  <path d="M 20,24 C 36,24 44,32 46,44 L 46,68 C 36,76 20,74 20,74 Z" fill="#0284C7"/>
  <!-- CLOSE-UP SHARP HOOKED BEAK (Cận cảnh chiếc mỏ chim sắc nhọn) -->
  <!-- Upper mandible -->
  <path d="M 46,38 C 64,36 82,46 84,62 C 80,62 72,56 46,52 Z" fill="url(#beakGold)"/>
  <!-- Lower mandible closing tight -->
  <path d="M 46,52 C 64,54 74,58 78,60 C 66,66 52,66 46,64 Z" fill="#F59E0B"/>
  <!-- Cutting edge line -->
  <line x1="46" y1="52" x2="80" y2="58" stroke="#78350F" stroke-width="1.8"/>
  <!-- Nostril nares slot near base -->
  <ellipse cx="50" cy="43" rx="2.5" ry="1.2" transform="rotate(-15, 50, 43)" fill="#78350F"/>
</svg>`,

  petal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="petalSilk" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F472B6"/>
      <stop offset="50%" stop-color="#EC4899"/>
      <stop offset="100%" stop-color="#BE185D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#FDF2F8" stroke="#DB2777" stroke-width="2.5"/>
  <!-- SINGLE DETACHED SILKY FLOWER PETAL (Một cánh hoa đơn lẻ mềm mại) -->
  <path d="M 50,18 C 28,26 22,58 38,74 C 48,84 62,82 72,68 C 84,52 72,24 50,18 Z" fill="url(#petalSilk)"/>
  <!-- Delicate Vein Network (Gân mịn màng) -->
  <path d="M 50,22 Q 48,50 56,76" stroke="#FBCFE8" stroke-width="1.5" fill="none"/>
  <path d="M 48,42 Q 38,48 34,54" stroke="#FBCFE8" stroke-width="1.2" fill="none"/>
  <path d="M 52,56 Q 64,60 68,66" stroke="#FBCFE8" stroke-width="1.2" fill="none"/>
  <!-- SPARKLING MORNING DEWDROP (Giọt sương mai long lanh đọng mép cánh) -->
  <ellipse cx="64" cy="46" rx="4.5" ry="3.5" fill="#FFFFFF" opacity="0.85"/>
  <circle cx="63" cy="45" r="1.2" fill="#FFFFFF"/>
</svg>`,

  root: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="46" fill="#FEFCE8" stroke="#78350F" stroke-width="2.5"/>
  <!-- Soil horizon ground line -->
  <rect x="8" y="24" width="84" height="66" rx="4" fill="#78350F"/>
  <line x1="8" y1="24" x2="92" y2="24" stroke="#22C55E" stroke-width="4"/>
  <!-- Young green shoot rising above -->
  <path d="M 50,24 Q 48,14 42,10" stroke="#16A34A" stroke-width="2.5" fill="none"/>
  <ellipse cx="40" cy="10" rx="4" ry="2.5" transform="rotate(-30, 40, 10)" fill="#22C55E"/>
  <!-- EXTENSIVE BRANCHING TAPROOT & LATERAL ROOT SYSTEM (Bộ rễ cọc và rễ chùm phân nhánh) -->
  <!-- Primary Taproot -->
  <path d="M 50,24 Q 48,52 52,86" stroke="#FDE68A" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <!-- Lateral Root Branches -->
  <path d="M 49,36 Q 34,44 22,54" stroke="#FEF08A" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M 28,48 Q 22,56 16,62" stroke="#FEF08A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M 50,44 Q 66,50 78,58" stroke="#FEF08A" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M 68,52 Q 74,62 82,68" stroke="#FEF08A" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M 51,60 Q 38,70 32,80" stroke="#FEF08A" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 51,68 Q 62,76 68,82" stroke="#FEF08A" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`,

  trunk: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="trunkWood" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#78350F"/>
      <stop offset="50%" stop-color="#92400E"/>
      <stop offset="100%" stop-color="#451A03"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#78350F" stroke-width="2.5"/>
  <!-- MASSIVE UPRIGHT TIMBER TRUNK WITH BRANCH FORKS (Thân cây gỗ đồ sộ dựng đứng) -->
  <!-- Base roots anchoring into ground -->
  <path d="M 32,88 Q 42,76 42,54 L 30,22 M 58,54 L 70,22 M 58,54 Q 58,76 68,88" stroke="url(#trunkWood)" stroke-width="12" stroke-linecap="round" fill="none"/>
  <!-- Middle solid trunk fill -->
  <polygon points="40,54 60,54 64,88 36,88" fill="url(#trunkWood)"/>
  <!-- Natural Rugged Bark Lines -->
  <line x1="46" y1="36" x2="44" y2="84" stroke="#292524" stroke-width="2"/>
  <line x1="52" y1="30" x2="52" y2="86" stroke="#292524" stroke-width="2.2"/>
  <line x1="58" y1="36" x2="60" y2="84" stroke="#292524" stroke-width="2"/>
  <!-- Little green sprig sprouting from side -->
  <path d="M 38,62 Q 28,60 26,54" stroke="#22C55E" stroke-width="2" fill="none"/>
  <ellipse cx="26" cy="54" rx="3" ry="1.8" transform="rotate(-25, 26, 54)" fill="#4ADE80"/>
</svg>`,

  bark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="barkMacro" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#57534E"/>
      <stop offset="50%" stop-color="#78716C"/>
      <stop offset="100%" stop-color="#44403C"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F5F5F4" stroke="#78716C" stroke-width="2.5"/>
  <!-- MACRO CLOSE-UP OF RUGGED CRACKED WOOD BARK (Cận cảnh vỏ cây nứt dọc sần sùi) -->
  <rect x="14" y="14" width="72" height="72" rx="10" fill="url(#barkMacro)"/>
  <!-- Deep Longitudinal Fissures / Cracks (Các rãnh nứt dọc sâu) -->
  <path d="M 28,14 Q 32,36 28,52 Q 34,70 30,86" stroke="#1C1917" stroke-width="4" stroke-linecap="round" fill="none"/>
  <path d="M 48,14 Q 44,32 50,50 Q 46,68 48,86" stroke="#1C1917" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M 68,14 Q 72,34 66,54 Q 70,72 68,86" stroke="#1C1917" stroke-width="4" stroke-linecap="round" fill="none"/>
  <!-- Natural moss/lichen patches on bark -->
  <ellipse cx="38" cy="42" rx="4" ry="7" fill="#84CC16" opacity="0.8"/>
  <ellipse cx="58" cy="62" rx="5" ry="6" fill="#65A30D" opacity="0.8"/>
</svg>`,

  camouflage: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="camoLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ADE80"/>
      <stop offset="50%" stop-color="#22C55E"/>
      <stop offset="100%" stop-color="#15803D"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5"/>
  <!-- Giant Background Leaf with Veins -->
  <path d="M 16,84 C 18,40 56,20 86,16 C 82,60 60,82 16,84 Z" fill="url(#camoLeaf)"/>
  <line x1="16" y1="84" x2="86" y2="16" stroke="#14532D" stroke-width="2.5"/>
  <line x1="38" y1="62" x2="30" y2="52" stroke="#14532D" stroke-width="1.8"/>
  <line x1="56" y1="44" x2="48" y2="34" stroke="#14532D" stroke-width="1.8"/>
  <line x1="56" y1="44" x2="68" y2="52" stroke="#14532D" stroke-width="1.8"/>
  <!-- CRYPTIC CAMOUFLAGED GECKO / INSECT SEAMLESSLY BLENDING IN (Con vật hòa màu hoàn toàn vào gân lá) -->
  <path d="M 40,64 Q 54,46 62,38" stroke="#16A34A" stroke-width="7" stroke-linecap="round" fill="none"/>
  <!-- Matching Body & Disguised Eyes -->
  <ellipse cx="58" cy="42" rx="5" ry="4" transform="rotate(-40, 58, 42)" fill="#22C55E"/>
  <!-- Only subtle eye gives away camouflage -->
  <circle cx="56" cy="40" r="1.5" fill="#FACC15"/>
  <circle cx="56" cy="40" r="0.8" fill="#000000"/>
  <!-- Camouflaged legs matching leaf lateral veins -->
  <path d="M 46,54 Q 38,50 36,44" stroke="#16A34A" stroke-width="2" fill="none"/>
  <path d="M 52,48 Q 62,48 66,54" stroke="#16A34A" stroke-width="2" fill="none"/>
</svg>`
};

console.log('🔄 Exporting SVG files to client/public/icons/flora_fauna/...');

let count = 0;
for (const [key, svgString] of Object.entries(SVG_REGISTRY)) {
  const fileName = `${key.replace(/ /g, '_')}.svg`;
  const filePath = path.join(publicDir, fileName);
  fs.writeFileSync(filePath, svgString.trim(), 'utf8');
  count++;
}

console.log(`✅ Successfully generated ${count} ultra-detailed standalone SVG files!`);

// Generate client/src/constants/floraFaunaSvgLibrary.js
const libPath = path.join(__dirname, '../client/src/constants/floraFaunaSvgLibrary.js');
const libContent = `/**
 * FLORA & FAUNA ULTRA-DETAILED VECTOR SVG LIBRARY
 * 58+ custom-illustrated SVGs accurately matching biological morphology and user audit report.
 */

export const FLORA_FAUNA_SVGS = ${JSON.stringify(SVG_REGISTRY, null, 2)};

export function getCustomSvgForWord(word) {
  if (!word) return null;
  const normalized = word.toLowerCase().trim();
  return FLORA_FAUNA_SVGS[normalized] || null;
}

export function hasCustomSvg(word) {
  if (!word) return false;
  return Boolean(FLORA_FAUNA_SVGS[word.toLowerCase().trim()]);
}

export default FLORA_FAUNA_SVGS;
`;

fs.writeFileSync(libPath, libContent, 'utf8');
console.log(`✅ Created ${libPath} with all ${count} SVG vector components!`);

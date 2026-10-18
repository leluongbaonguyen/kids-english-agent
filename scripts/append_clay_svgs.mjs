import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '../client/src/constants/clay3dSvgLibrary.js');
let content = fs.readFileSync(targetFile, 'utf8');

const svgs = {
  "police station": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="psWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="50%" stop-color="#1D4ED8"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </linearGradient>
    <linearGradient id="psRoof" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <radialGradient id="sirenRed" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FCA5A5"/>
      <stop offset="40%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#7F1D1D"/>
    </radialGradient>
    <radialGradient id="sirenBlue" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#93C5FD"/>
      <stop offset="40%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </radialGradient>
    <linearGradient id="goldBadge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="60%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="22" y="46" width="76" height="58" rx="8" fill="url(#psWall)"/>
  <rect x="18" y="38" width="84" height="12" rx="4" fill="url(#psRoof)"/>
  <rect x="46" y="68" width="28" height="36" rx="4" fill="#0F172A"/>
  <rect x="49" y="72" width="10" height="32" rx="2" fill="#67E8F9" opacity="0.85"/>
  <rect x="61" y="72" width="10" height="32" rx="2" fill="#67E8F9" opacity="0.85"/>
  <polygon points="60,48 63,55 70,55 64,59 66,66 60,62 54,66 56,59 50,55 57,55" fill="url(#goldBadge)"/>
  <rect x="48" y="32" width="24" height="6" rx="2" fill="#1E293B"/>
  <rect x="48" y="24" width="10" height="8" rx="3" fill="url(#sirenRed)"/>
  <rect x="62" y="24" width="10" height="8" rx="3" fill="url(#sirenBlue)"/>
  <circle cx="53" cy="28" r="7" fill="#EF4444" opacity="0.35"/>
  <circle cx="67" cy="28" r="7" fill="#3B82F6" opacity="0.35"/>
</svg>`,

  "fire station": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="fsBrick" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="50%" stop-color="#DC2626"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <linearGradient id="garageDoor" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#EAB308"/>
      <stop offset="100%" stop-color="#CA8A04"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="22" y="42" width="76" height="62" rx="8" fill="url(#fsBrick)"/>
  <rect x="18" y="34" width="84" height="12" rx="4" fill="#78350F"/>
  <path d="M 38,104 L 38,62 Q 60,50 82,62 L 82,104 Z" fill="#1E293B"/>
  <rect x="42" y="64" width="36" height="40" rx="3" fill="url(#garageDoor)"/>
  <line x1="42" y1="72" x2="78" y2="72" stroke="#854D0E" stroke-width="2"/>
  <line x1="42" y1="82" x2="78" y2="82" stroke="#854D0E" stroke-width="2"/>
  <line x1="42" y1="92" x2="78" y2="92" stroke="#854D0E" stroke-width="2"/>
  <rect x="54" y="22" width="12" height="12" rx="6" fill="#F59E0B"/>
  <circle cx="60" cy="20" r="3" fill="#FDE047"/>
  <rect x="88" y="88" width="8" height="14" rx="3" fill="#DC2626"/>
  <circle cx="92" cy="86" r="4" fill="#EF4444"/>
  <circle cx="92" cy="92" r="2" fill="#FDE047"/>
</svg>`,

  "bakery": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bakeryWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FEF3C7"/>
      <stop offset="50%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
    <linearGradient id="croissantGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24"/>
      <stop offset="60%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="24" y="46" width="72" height="58" rx="8" fill="url(#bakeryWall)"/>
  <path d="M 18,48 L 24,34 L 96,34 L 102,48 Q 60,54 18,48 Z" fill="#DC2626"/>
  <path d="M 32,34 L 30,49 Q 45,51 45,34 Z" fill="#FFFFFF"/>
  <path d="M 60,34 L 60,51 Q 75,51 75,34 Z" fill="#FFFFFF"/>
  <rect x="30" y="60" width="38" height="32" rx="4" fill="#78350F"/>
  <rect x="32" y="62" width="34" height="28" rx="3" fill="#FEF08A" opacity="0.9"/>
  <g transform="translate(48, 14)">
    <ellipse cx="12" cy="10" rx="14" ry="7" fill="url(#croissantGold)"/>
    <path d="M 0,10 Q 12,2 24,10" stroke="#FEF3C7" stroke-width="2" fill="none"/>
  </g>
  <rect x="74" y="64" width="16" height="38" rx="3" fill="#92400E"/>
  <rect x="76" y="68" width="12" height="14" rx="2" fill="#FEF08A" opacity="0.75"/>
</svg>`,

  "museum": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="marbleCol" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F1F5F9"/>
      <stop offset="40%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="50" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="18" y="98" width="84" height="7" rx="3" fill="#CBD5E1"/>
  <rect x="22" y="92" width="76" height="7" rx="2" fill="#E2E8F0"/>
  <rect x="26" y="48" width="68" height="46" rx="4" fill="#1E293B"/>
  <rect x="48" y="58" width="24" height="28" rx="3" fill="#F59E0B"/>
  <rect x="51" y="61" width="18" height="22" rx="2" fill="#0284C7"/>
  <ellipse cx="60" cy="72" rx="5" ry="6" fill="#FED7AA"/>
  <rect x="28" y="48" width="8" height="44" rx="2" fill="url(#marbleCol)"/>
  <rect x="44" y="48" width="8" height="44" rx="2" fill="url(#marbleCol)"/>
  <rect x="68" y="48" width="8" height="44" rx="2" fill="url(#marbleCol)"/>
  <rect x="84" y="48" width="8" height="44" rx="2" fill="url(#marbleCol)"/>
  <rect x="22" y="42" width="76" height="7" rx="2" fill="#E2E8F0"/>
  <polygon points="60,20 16,42 104,42" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  <circle cx="60" cy="33" r="5" fill="#F59E0B"/>
</svg>`,

  "market": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="crateWood" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#78350F"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="48" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="24" y="64" width="72" height="40" rx="6" fill="url(#crateWood)"/>
  <line x1="24" y1="76" x2="96" y2="76" stroke="#451A03" stroke-width="2"/>
  <line x1="24" y1="88" x2="96" y2="88" stroke="#451A03" stroke-width="2"/>
  <rect x="28" y="58" width="28" height="14" rx="3" fill="#B45309"/>
  <circle cx="35" cy="56" r="4.5" fill="#EF4444"/>
  <circle cx="42" cy="55" r="4.5" fill="#DC2626"/>
  <circle cx="49" cy="56" r="4.5" fill="#EF4444"/>
  <rect x="64" y="58" width="28" height="14" rx="3" fill="#B45309"/>
  <circle cx="71" cy="56" r="4.5" fill="#FACC15"/>
  <circle cx="78" cy="55" r="4.5" fill="#EAB308"/>
  <circle cx="85" cy="56" r="4.5" fill="#FACC15"/>
  <rect x="26" y="32" width="4" height="36" fill="#78350F"/>
  <rect x="90" y="32" width="4" height="36" fill="#78350F"/>
  <polygon points="60,18 16,36 104,36" fill="#EF4444"/>
  <polygon points="45,24 35,36 55,36" fill="#FFFFFF"/>
  <polygon points="75,24 65,36 85,36" fill="#FFFFFF"/>
</svg>`,

  "egg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="eggGloss" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#FEF3C7"/>
      <stop offset="70%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#D97706"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="104" rx="40" ry="8" fill="rgba(0,0,0,0.22)"/>
  <ellipse cx="60" cy="92" rx="44" ry="14" fill="#B45309"/>
  <path d="M 20,92 Q 60,105 100,92" stroke="#F59E0B" stroke-width="4" fill="none"/>
  <path d="M 24,88 Q 60,98 96,88" stroke="#FCD34D" stroke-width="3" fill="none"/>
  <path d="M 60,18 C 82,18 90,62 90,78 C 90,94 76,100 60,100 C 44,100 30,94 30,78 C 30,62 38,18 60,18 Z" fill="url(#eggGloss)"/>
  <ellipse cx="50" cy="38" rx="8" ry="12" fill="#FFFFFF" opacity="0.75" transform="rotate(-15 50 38)"/>
</svg>`,

  "thirsty": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="glassDrink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#0369A1"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="36" ry="7" fill="rgba(0,0,0,0.22)"/>
  <path d="M 40,36 L 46,102 Q 60,106 74,102 L 80,36 Z" fill="rgba(224,242,254,0.3)" stroke="#BAE6FD" stroke-width="2.5"/>
  <path d="M 42,50 L 46,100 Q 60,104 74,100 L 78,50 Z" fill="url(#glassDrink)" opacity="0.9"/>
  <rect x="50" y="54" width="12" height="12" rx="2" fill="#FFFFFF" opacity="0.7"/>
  <rect x="62" y="64" width="11" height="11" rx="2" fill="#FFFFFF" opacity="0.7"/>
  <path d="M 56,86 L 68,26 L 82,14" stroke="#EF4444" stroke-width="5" stroke-linecap="round" fill="none"/>
  <path d="M 56,86 L 68,26 L 82,14" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-dasharray="6 6" fill="none"/>
  <circle cx="38" cy="36" r="12" fill="#FACC15" stroke="#FEF08A" stroke-width="2"/>
  <circle cx="38" cy="36" r="9" fill="#FEF08A"/>
</svg>`,

  "nurse": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="nurseHead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FED7AA"/>
      <stop offset="60%" stop-color="#FDBA74"/>
      <stop offset="100%" stop-color="#FB923C"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="36" ry="6" fill="rgba(0,0,0,0.2)"/>
  <path d="M 38,76 Q 60,68 82,76 L 86,106 Q 60,110 34,106 Z" fill="#0D9488"/>
  <circle cx="60" cy="52" r="22" fill="url(#nurseHead)"/>
  <circle cx="52" cy="52" r="2.5" fill="#1E293B"/>
  <circle cx="68" cy="52" r="2.5" fill="#1E293B"/>
  <path d="M 54,60 Q 60,66 66,60" stroke="#C2410C" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M 42,34 Q 60,26 78,34 L 74,44 L 46,44 Z" fill="#FFFFFF"/>
  <rect x="58" y="32" width="4" height="10" fill="#EF4444"/>
  <rect x="55" y="35" width="10" height="4" fill="#EF4444"/>
  <path d="M 46,68 Q 60,90 74,68" stroke="#38BDF8" stroke-width="3" fill="none"/>
  <circle cx="60" cy="82" r="4.5" fill="#CBD5E1" stroke="#0284C7" stroke-width="1.5"/>
</svg>`,

  "gardening": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="potTerra" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FB923C"/>
      <stop offset="50%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#9A3412"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="40" ry="7" fill="rgba(0,0,0,0.22)"/>
  <polygon points="40,70 80,70 74,104 46,104" fill="url(#potTerra)"/>
  <rect x="36" y="64" width="48" height="8" rx="3" fill="#C2410C"/>
  <ellipse cx="60" cy="66" rx="20" ry="4" fill="#451A03"/>
  <line x1="60" y1="66" x2="60" y2="38" stroke="#16A34A" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="52" cy="52" rx="6" ry="3" fill="#22C55E" transform="rotate(-20 52 52)"/>
  <ellipse cx="68" cy="48" rx="6" ry="3" fill="#22C55E" transform="rotate(20 68 48)"/>
  <circle cx="60" cy="32" r="10" fill="#78350F" stroke="#FACC15" stroke-width="6"/>
  <g transform="translate(80, 68) rotate(25)">
    <rect x="0" y="0" width="4" height="16" rx="2" fill="#F59E0B"/>
    <path d="M -3,14 L 7,14 L 2,26 Z" fill="#94A3B8"/>
  </g>
</svg>`,

  "energy": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="battCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#06B6D4"/>
      <stop offset="100%" stop-color="#0891B2"/>
    </linearGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="38" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="36" y="32" width="48" height="72" rx="14" fill="#0F172A" stroke="#38BDF8" stroke-width="3"/>
  <rect x="52" y="24" width="16" height="8" rx="4" fill="#F59E0B"/>
  <rect x="42" y="46" width="36" height="52" rx="8" fill="url(#battCyan)"/>
  <polygon points="64,48 50,68 62,68 56,88 72,64 60,64" fill="#FEF08A" stroke="#F59E0B" stroke-width="1.5"/>
  <circle cx="60" cy="68" r="32" stroke="#22D3EE" stroke-width="2" fill="none" stroke-dasharray="6 6" opacity="0.6"/>
</svg>`,

  "gravity": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="gravApple" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FCA5A5"/>
      <stop offset="40%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="44" ry="7" fill="rgba(0,0,0,0.25)"/>
  <path d="M 10,22 Q 50,30 90,20" stroke="#78350F" stroke-width="7" stroke-linecap="round" fill="none"/>
  <circle cx="35" cy="24" r="6" fill="#22C55E"/>
  <circle cx="45" cy="20" r="5" fill="#16A34A"/>
  <path d="M 60,40 L 60,70" stroke="#38BDF8" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round"/>
  <polygon points="60,82 54,72 66,72" fill="#0284C7"/>
  <ellipse cx="60" cy="88" rx="15" ry="14" fill="url(#gravApple)"/>
  <path d="M 60,76 Q 63,70 66,68" stroke="#78350F" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <ellipse cx="65" cy="70" rx="4" ry="2" fill="#22C55E" transform="rotate(-30 65 70)"/>
  <ellipse cx="60" cy="104" rx="24" ry="4" stroke="#38BDF8" stroke-width="1.5" fill="none" opacity="0.7"/>
</svg>`,

  "future": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <radialGradient id="botHead" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="108" rx="36" ry="7" fill="rgba(0,0,0,0.25)"/>
  <rect x="34" y="32" width="52" height="44" rx="18" fill="url(#botHead)" stroke="#CBD5E1" stroke-width="2"/>
  <rect x="40" y="42" width="40" height="16" rx="8" fill="#0F172A"/>
  <circle cx="48" cy="50" r="3.5" fill="#22D3EE"/>
  <circle cx="72" cy="50" r="3.5" fill="#22D3EE"/>
  <rect x="58" y="18" width="4" height="14" fill="#64748B"/>
  <circle cx="60" cy="16" r="4.5" fill="#F59E0B"/>
  <rect x="44" y="78" width="32" height="22" rx="8" fill="#475569"/>
  <ellipse cx="60" cy="100" rx="12" ry="4" fill="#38BDF8" opacity="0.8"/>
</svg>`
};

let insertText = '';
for (const [key, svg] of Object.entries(svgs)) {
  if (!content.includes(`"${key}":`)) {
    insertText += `  "${key}": \`${svg}\`,\n\n`;
  }
}

const lastBrace = content.lastIndexOf('};');
if (lastBrace !== -1 && insertText) {
  content = content.slice(0, lastBrace) + insertText + content.slice(lastBrace);
  fs.writeFileSync(targetFile, content, 'utf8');
  console.log('✅ Successfully added 12 new 3D Clay Diorama SVGs to clay3dSvgLibrary.js!');
} else {
  console.log('ℹ️ SVGs already present or closing brace not found.');
}

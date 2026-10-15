import fs from 'fs';
import { EXACT_ICON_CORRECTIONS } from './build_full_redesign_map.js';

const kidsDbPath = 'client/src/constants/kidsVocabularyDatabase.js';
const encDbPath = 'client/src/constants/worldEncyclopediaDatabase.js';

let kidsDbContent = fs.readFileSync(kidsDbPath, 'utf8');
let encDbContent = fs.readFileSync(encDbPath, 'utf8');

console.log('--- APPLYING 100% ACCURATE ICONS TO SYSTEM DATABASES ---');

let kidsCount = 0;
let encCount = 0;
let notFound = [];

// Apply each correction
for (const [id, newIcon] of Object.entries(EXACT_ICON_CORRECTIONS)) {
  let replaced = false;

  // Pattern in kidsVocabularyDatabase
  const kidsRegex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"image":\\s*")[^"]*(")`);
  if (kidsRegex.test(kidsDbContent)) {
    kidsDbContent = kidsDbContent.replace(kidsRegex, `$1${newIcon}$2`);
    kidsCount++;
    replaced = true;
  }

  // Pattern in worldEncyclopediaDatabase
  const encRegex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"image":\\s*")[^"]*(")`);
  if (encRegex.test(encDbContent)) {
    encDbContent = encDbContent.replace(encRegex, `$1${newIcon}$2`);
    encCount++;
    replaced = true;
  }

  if (!replaced) {
    notFound.push(id);
  }
}

// Update category icons in VOCAB_CATEGORIES
// 1. L6-U13 should be 🎓
kidsDbContent = kidsDbContent.replace(
  /"id":\s*"L6-U13",\s*"name":\s*"L6 • 13\. IELTS \/ TOEFL Từ Vựng \(Academic Vocabulary\)",\s*"icon":\s*"[^"]*",\s*"level":\s*"L6"/,
  `"id":"L6-U13","name":"L6 • 13. IELTS / TOEFL Từ Vựng (Academic Vocabulary)","icon":"🎓","level":"L6"`
);

// 2. ENC-U09 should be 🏎️ (Super Machines)
encDbContent = encDbContent.replace(
  /"id":\s*"ENC-U09",\s*"name":\s*"ENC • 09\. Siêu Xe, Tàu Thủy, Máy Bay & Máy Cơ Giới \(Super Machines\)",\s*"icon":\s*"[^"]*"/,
  `"id": "ENC-U09",\n    "name": "ENC • 09. Siêu Xe, Tàu Thủy, Máy Bay & Máy Cơ Giới (Super Machines)",\n    "icon": "🏎️"`
);

console.log(`Updated ${kidsCount} word icons in ${kidsDbPath}`);
console.log(`Updated ${encCount} word icons in ${encDbPath}`);
if (notFound.length > 0) {
  console.log(`Warning: ${notFound.length} IDs not found:`, notFound);
}

fs.writeFileSync(kidsDbPath, kidsDbContent, 'utf8');
fs.writeFileSync(encDbPath, encDbContent, 'utf8');
console.log('Successfully written updated database files!');

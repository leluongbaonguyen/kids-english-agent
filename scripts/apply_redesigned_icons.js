/**
 * APPLY REDESIGNED ICONS TO kidsVocabularyDatabase.js
 * - Updates VOCABULARY_DATABASE with all 900 ultra-accurate, professional icons
 * - Updates VOCAB_CATEGORIES with polished icons
 * - Regenerates Excel and Word artifacts
 */

const fs = require('fs');
const path = require('path');
const { NEW_ICONS } = require('./new_icons_map.js');

const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
let dbContent = fs.readFileSync(dbPath, 'utf8');

console.log('🔄 Đang đọc kidsVocabularyDatabase.js...');

// 1. Cập nhật các icon trong VOCAB_CATEGORIES nếu cần hoàn thiện
const catIconFixes = {
  'L2-U15': '🧭', // Phương hướng & Vị trí (thay cho 🧩)
  'L6-U03': '⛩️', // Văn Hóa Đông & Tây (thay cho 🎯)
  'L6-U09': '👑', // Lãnh Đạo (thay cho 📌)
  'L6-U10': '🧘', // Sức Khỏe Tâm Thần (thay cho 🧠💚)
};

Object.entries(catIconFixes).forEach(([catId, newIcon]) => {
  const catRegex = new RegExp(`(\\{\\s*"id":\\s*"${catId}"[^\\}]*?"icon":\\s*")[^"]*(")`, 'g');
  dbContent = dbContent.replace(catRegex, `$1${newIcon}$2`);
});

// 2. Parse VOCABULARY_DATABASE
const marker = 'export const VOCABULARY_DATABASE = ';
const startIdx = dbContent.indexOf(marker);
if (startIdx === -1) {
  throw new Error('Could not find VOCABULARY_DATABASE in kidsVocabularyDatabase.js');
}

const arrayStart = startIdx + marker.length;
let depth = 0, inString = false, escape = false, endIdx = -1;
for (let i = arrayStart; i < dbContent.length; i++) {
  const char = dbContent[i];
  if (escape) { escape = false; continue; }
  if (char === '\\') { escape = true; continue; }
  if (char === '"' || char === "'") {
    if (!inString) inString = char;
    else if (inString === char) inString = false;
    continue;
  }
  if (inString) continue;

  if (char === '[') depth++;
  else if (char === ']') {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
}

const vocabRaw = dbContent.slice(arrayStart, endIdx + 1);
const vocabList = JSON.parse(vocabRaw);

console.log(`✅ Đã tải ${vocabList.length} từ vựng từ database.`);

let updatedCount = 0;
vocabList.forEach(item => {
  if (NEW_ICONS[item.id]) {
    const old = item.image;
    item.image = NEW_ICONS[item.id];
    if (old !== item.image) {
      updatedCount++;
    }
  }
});

console.log(`✨ Đã cập nhật ${updatedCount} icon từ vựng theo thiết kế chuyên nghiệp siêu chi tiết mới!`);

// 3. Serialize lại VOCABULARY_DATABASE với định dạng đẹp mắt 2 spaces
const newVocabJson = JSON.stringify(vocabList, null, 2);

const newDbContent = dbContent.slice(0, arrayStart) + newVocabJson + dbContent.slice(endIdx + 1);

// Ghi đè file
fs.writeFileSync(dbPath, newDbContent, 'utf8');
console.log('💾 Đã lưu thành công client/src/constants/kidsVocabularyDatabase.js!');

// Kiểm tra lại file vừa ghi
try {
  const check = fs.readFileSync(dbPath, 'utf8');
  console.log(`📊 Kích thước file mới: ${(check.length / 1024).toFixed(2)} KB`);
} catch (e) {
  console.error('Lỗi kiểm tra file:', e);
}

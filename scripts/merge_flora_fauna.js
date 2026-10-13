/**
 * MERGE FLORA & FAUNA DATASET INTO kidsVocabularyDatabase.js
 * Safely appends:
 * 1. FLORA_FAUNA_LEVEL to COURSE_LEVELS
 * 2. FLORA_FAUNA_CATEGORIES to VOCAB_CATEGORIES
 * 3. FLORA_FAUNA_VOCABULARY to VOCABULARY_DATABASE
 */

const fs = require('fs');
const path = require('path');
const {
  FLORA_FAUNA_LEVEL,
  FLORA_FAUNA_CATEGORIES,
  FLORA_FAUNA_VOCABULARY
} = require('./flora_fauna_data.js');

const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
let content = fs.readFileSync(dbPath, 'utf8');

console.log('🔄 Checking current database status...');

// 1. Check if BIO level already exists
if (content.includes('id: "BIO"') || content.includes('"id": "BIO"')) {
  console.log('⚠️ BIO level already exists in kidsVocabularyDatabase.js. Skipping COURSE_LEVELS merge.');
} else {
  // Find where COURSE_LEVELS array closes (before export const VOCAB_CATEGORIES)
  const marker = 'export const VOCAB_CATEGORIES = [';
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('Could not find VOCAB_CATEGORIES marker!');
  }

  // Find the last '];' before markerIdx
  const lastBracketIdx = content.lastIndexOf('];', markerIdx);
  if (lastBracketIdx === -1) {
    throw new Error('Could not find COURSE_LEVELS closing bracket!');
  }

  const levelJson = JSON.stringify(FLORA_FAUNA_LEVEL, null, 2)
    .split('\n')
    .map((l, i) => i === 0 ? `  ${l}` : `  ${l}`)
    .join('\n');

  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newLevelsPart = `${before}${needsComma ? ',' : ''}\n${levelJson}\n];\n\n`;
  content = newLevelsPart + content.slice(markerIdx);
  console.log('✅ Appended BIO level to COURSE_LEVELS.');
}

// 2. Check if BIO categories already exist
if (content.includes('BIO-U01')) {
  console.log('⚠️ BIO categories already exist in kidsVocabularyDatabase.js. Skipping VOCAB_CATEGORIES merge.');
} else {
  // Find where VOCAB_CATEGORIES array closes (before export const VOCABULARY_DATABASE)
  const marker = 'export const VOCABULARY_DATABASE = [';
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('Could not find VOCABULARY_DATABASE marker!');
  }

  const lastBracketIdx = content.lastIndexOf('];', markerIdx);
  if (lastBracketIdx === -1) {
    throw new Error('Could not find VOCAB_CATEGORIES closing bracket!');
  }

  const catsString = FLORA_FAUNA_CATEGORIES.map(c => `  ${JSON.stringify(c)}`).join(',\n');
  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newCatsPart = `${before}${needsComma ? ',' : ''}\n${catsString}\n];\n\n`;
  content = newCatsPart + content.slice(markerIdx);
  console.log('✅ Appended 10 BIO units to VOCAB_CATEGORIES.');
}

// 3. Check if BIO vocabulary already exists
if (content.includes('vocab-BIO-U01-W01')) {
  console.log('⚠️ BIO vocabulary already exists in kidsVocabularyDatabase.js. Skipping VOCABULARY_DATABASE merge.');
} else {
  // Find where VOCABULARY_DATABASE array closes (before const CUSTOM_VOCAB_DETAILS)
  const marker = 'const CUSTOM_VOCAB_DETAILS = {';
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('Could not find CUSTOM_VOCAB_DETAILS marker!');
  }

  const lastBracketIdx = content.lastIndexOf('];', markerIdx);
  if (lastBracketIdx === -1) {
    throw new Error('Could not find VOCABULARY_DATABASE closing bracket!');
  }

  const vocabFormatted = FLORA_FAUNA_VOCABULARY.map(v => {
    return '  ' + JSON.stringify(v, null, 2).split('\n').join('\n  ');
  }).join(',\n');

  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newVocabPart = `${before}${needsComma ? ',' : ''}\n${vocabFormatted}\n];\n\n`;
  content = newVocabPart + content.slice(markerIdx);
  console.log('✅ Appended 120 BIO words to VOCABULARY_DATABASE.');
}

// 4. Ensure activeCategories excludes BIO so 18 illustrated poster pages for L1-L6 remain clean
if (content.includes("const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all');")) {
  content = content.replace(
    "const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all');",
    "const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all' && c.level !== 'BIO');"
  );
  console.log('✅ Updated activeCategories to preserve poster page layout.');
}

// Save back to file
fs.writeFileSync(dbPath, content, 'utf8');
console.log('🎉 Successfully merged Flora & Fauna data into kidsVocabularyDatabase.js!');

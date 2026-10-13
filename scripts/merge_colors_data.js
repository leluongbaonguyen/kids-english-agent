/**
 * MERGE COLORS OF THE WORLD DATASET INTO kidsVocabularyDatabase.js
 * Safely appends:
 * 1. COLOR_LEVEL to COURSE_LEVELS
 * 2. COLOR_CATEGORIES to VOCAB_CATEGORIES
 * 3. COLOR_VOCABULARY to VOCABULARY_DATABASE
 * 4. Ensures activeCategories excludes COLOR to preserve 18 poster pages
 */

const fs = require('fs');
const path = require('path');
const {
  COLOR_LEVEL,
  COLOR_CATEGORIES,
  COLOR_VOCABULARY
} = require('./colors_of_the_world_data.js');

const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
let content = fs.readFileSync(dbPath, 'utf8');

console.log('🔄 Checking database for Color merge status...');

// 1. Check if COLOR level already exists
if (content.includes('id: "COLOR"') || content.includes('"id": "COLOR"') || content.includes("id: 'COLOR'")) {
  console.log('⚠️ COLOR level already exists in kidsVocabularyDatabase.js. Skipping COURSE_LEVELS merge.');
} else {
  const marker = 'export const VOCAB_CATEGORIES = [';
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('Could not find VOCAB_CATEGORIES marker!');
  }

  const lastBracketIdx = content.lastIndexOf('];', markerIdx);
  if (lastBracketIdx === -1) {
    throw new Error('Could not find COURSE_LEVELS closing bracket!');
  }

  const levelJson = JSON.stringify(COLOR_LEVEL, null, 2)
    .split('\n')
    .map(l => `  ${l}`)
    .join('\n');

  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newLevelsPart = `${before}${needsComma ? ',' : ''}\n${levelJson}\n];\n\n`;
  content = newLevelsPart + content.slice(markerIdx);
  console.log('✅ Appended COLOR level to COURSE_LEVELS.');
}

// 2. Check if CLR-U01 category already exists
if (content.includes('CLR-U01')) {
  console.log('⚠️ COLOR categories already exist in kidsVocabularyDatabase.js. Skipping VOCAB_CATEGORIES merge.');
} else {
  const marker = 'export const VOCABULARY_DATABASE = [';
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('Could not find VOCABULARY_DATABASE marker!');
  }

  const lastBracketIdx = content.lastIndexOf('];', markerIdx);
  if (lastBracketIdx === -1) {
    throw new Error('Could not find VOCAB_CATEGORIES closing bracket!');
  }

  const catsString = COLOR_CATEGORIES.map(c => `  ${JSON.stringify(c)}`).join(',\n');
  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newCatsPart = `${before}${needsComma ? ',' : ''}\n${catsString}\n];\n\n`;
  content = newCatsPart + content.slice(markerIdx);
  console.log('✅ Appended 10 COLOR units to VOCAB_CATEGORIES.');
}

// 3. Check if CLR vocabulary already exists
if (content.includes('vocab-CLR-U01-W01')) {
  console.log('⚠️ COLOR vocabulary already exists in kidsVocabularyDatabase.js. Skipping VOCABULARY_DATABASE merge.');
} else {
  const marker = 'const CUSTOM_VOCAB_DETAILS = {';
  const markerIdx = content.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error('Could not find CUSTOM_VOCAB_DETAILS marker!');
  }

  const lastBracketIdx = content.lastIndexOf('];', markerIdx);
  if (lastBracketIdx === -1) {
    throw new Error('Could not find VOCABULARY_DATABASE closing bracket!');
  }

  const vocabFormatted = COLOR_VOCABULARY.map(v => {
    return '  ' + JSON.stringify(v, null, 2).split('\n').join('\n  ');
  }).join(',\n');

  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newVocabPart = `${before}${needsComma ? ',' : ''}\n${vocabFormatted}\n];\n\n`;
  content = newVocabPart + content.slice(markerIdx);
  console.log('✅ Appended 120 COLOR words to VOCABULARY_DATABASE.');
}

// 4. Update activeCategories to exclude both BIO and COLOR
if (content.includes("const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all' && c.level !== 'BIO');")) {
  content = content.replace(
    "const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all' && c.level !== 'BIO');",
    "const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all' && c.level !== 'BIO' && c.level !== 'COLOR');"
  );
  console.log('✅ Updated activeCategories to exclude COLOR.');
}

fs.writeFileSync(dbPath, content, 'utf8');
console.log('🎉 Successfully merged Colors of the World into kidsVocabularyDatabase.js!');

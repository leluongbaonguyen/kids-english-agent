/**
 * MERGE NUMBERS & ORDINALS DATASET INTO kidsVocabularyDatabase.js
 * Safely appends:
 * 1. NUMBER_LEVEL to COURSE_LEVELS
 * 2. NUMBER_CATEGORIES to VOCAB_CATEGORIES
 * 3. NUMBER_VOCABULARY to VOCABULARY_DATABASE
 * 4. Ensures activeCategories excludes NUM to preserve 18 poster pages
 */

const fs = require('fs');
const path = require('path');
const {
  NUMBER_LEVEL,
  NUMBER_CATEGORIES,
  NUMBER_VOCABULARY
} = require('./numbers_of_the_world_data.js');

const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
let content = fs.readFileSync(dbPath, 'utf8');

console.log('🔄 Checking database for Number merge status...');

// 1. Check if NUM level already exists
if (content.includes('id: "NUM"') || content.includes('"id": "NUM"') || content.includes("id: 'NUM'")) {
  console.log('⚠️ NUM level already exists in kidsVocabularyDatabase.js. Skipping COURSE_LEVELS merge.');
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

  const levelJson = JSON.stringify(NUMBER_LEVEL, null, 2)
    .split('\n')
    .map(l => `  ${l}`)
    .join('\n');

  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newLevelsPart = `${before}${needsComma ? ',' : ''}\n${levelJson}\n];\n\n`;
  content = newLevelsPart + content.slice(markerIdx);
  console.log('✅ Appended NUM level to COURSE_LEVELS.');
}

// 2. Check if NUM-U01 category already exists
if (content.includes('NUM-U01')) {
  console.log('⚠️ NUM categories already exist in kidsVocabularyDatabase.js. Skipping VOCAB_CATEGORIES merge.');
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

  const catsString = NUMBER_CATEGORIES.map(c => `  ${JSON.stringify(c)}`).join(',\n');
  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newCatsPart = `${before}${needsComma ? ',' : ''}\n${catsString}\n];\n\n`;
  content = newCatsPart + content.slice(markerIdx);
  console.log('✅ Appended 10 NUM units to VOCAB_CATEGORIES.');
}

// 3. Check if NUM vocabulary already exists
if (content.includes('vocab-NUM-U01-W01')) {
  console.log('⚠️ NUM vocabulary already exists in kidsVocabularyDatabase.js. Skipping VOCABULARY_DATABASE merge.');
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

  const vocabFormatted = NUMBER_VOCABULARY.map(v => {
    return '  ' + JSON.stringify(v, null, 2).split('\n').join('\n  ');
  }).join(',\n');

  const before = content.slice(0, lastBracketIdx).trimEnd();
  const needsComma = !before.trim().endsWith(',');
  const newVocabPart = `${before}${needsComma ? ',' : ''}\n${vocabFormatted}\n];\n\n`;
  content = newVocabPart + content.slice(markerIdx);
  console.log('✅ Appended 120 NUM words to VOCABULARY_DATABASE.');
}

// 4. Update activeCategories to exclude NUM
if (content.includes("const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all' && c.level !== 'BIO' && c.level !== 'COLOR');")) {
  content = content.replace(
    "const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all' && c.level !== 'BIO' && c.level !== 'COLOR');",
    "const activeCategories = VOCAB_CATEGORIES.filter(c => c.id !== 'all' && c.level !== 'BIO' && c.level !== 'COLOR' && c.level !== 'NUM');"
  );
  console.log('✅ Updated activeCategories to exclude NUM.');
}

fs.writeFileSync(dbPath, content, 'utf8');
console.log('🎉 Successfully merged Numbers & Ordinals into kidsVocabularyDatabase.js!');

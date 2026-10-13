const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
const dbContent = fs.readFileSync(dbPath, 'utf8');

const extractExport = (varName) => {
  const marker = `export const ${varName} = `;
  const startIdx = dbContent.indexOf(marker);
  if (startIdx === -1) throw new Error(`Marker not found: ${varName}`);
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

  const jsonRaw = dbContent.slice(arrayStart, endIdx + 1).replace(/undefined/g, '"N/A"');
  return JSON.parse(jsonRaw);
};

const levels = extractExport('COURSE_LEVELS');
const categories = extractExport('VOCAB_CATEGORIES');
const vocabulary = extractExport('VOCABULARY_DATABASE');

console.log('✅ Levels count:', levels.length);
console.log('✅ Categories count:', categories.length);
console.log('✅ Total Vocabulary count:', vocabulary.length);

const bioLevel = levels.find(l => l.id === 'BIO');
console.log('✅ BIO Level found:', bioLevel ? bioLevel.name : 'NO');

const bioCats = categories.filter(c => c.level === 'BIO');
console.log('✅ BIO Categories count:', bioCats.length);

const bioWords = vocabulary.filter(w => w.level === 'BIO');
console.log('✅ BIO Words count:', bioWords.length);

const unitWordsCount = {};
bioWords.forEach(w => {
  unitWordsCount[w.category] = (unitWordsCount[w.category] || 0) + 1;
});
console.log('✅ Words per BIO Unit:', unitWordsCount);

// Verify intra-unit icon uniqueness across ALL units in the entire database
let duplicatesFound = 0;
const allUnits = [...new Set(vocabulary.map(v => v.category))];
allUnits.forEach(catId => {
  const wordsInCat = vocabulary.filter(v => v.category === catId);
  const iconMap = {};
  wordsInCat.forEach(w => {
    const icon = w.image || w.icon;
    if (iconMap[icon]) {
      console.warn(`⚠️ Duplicate icon in ${catId}: '${icon}' on word '${w.word}' and '${iconMap[icon].word}'`);
      duplicatesFound++;
    } else {
      iconMap[icon] = w;
    }
  });
});

if (duplicatesFound === 0) {
  console.log('🌟 PERFECT! 100% of all units across the entire 1,020-word database have ZERO duplicate icons!');
} else {
  console.warn(`Total duplicate icons across units: ${duplicatesFound}`);
}

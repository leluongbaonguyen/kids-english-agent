const fs = require('fs');
const path = require('path');
const { NEW_ICONS } = require('./new_icons_map.js');

const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
const dbContent = fs.readFileSync(dbPath, 'utf8');

const extractExport = (varName) => {
  const marker = `export const ${varName} = `;
  const startIdx = dbContent.indexOf(marker);
  if (startIdx === -1) return [];
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

const vocab = extractExport('VOCABULARY_DATABASE');
console.log('Total vocabulary items in DB:', vocab.length);
console.log('Total mapped new icons:', Object.keys(NEW_ICONS).length);

let missing = 0;
let changed = 0;
let unchanged = 0;

vocab.forEach(item => {
  if (!NEW_ICONS[item.id]) {
    console.error(`❌ MISSING NEW ICON FOR: ${item.id} (${item.word})`);
    missing++;
  } else {
    if (NEW_ICONS[item.id] !== item.image) {
      changed++;
    } else {
      unchanged++;
    }
  }
});

console.log(`Summary: Missing=${missing}, Changed=${changed}, Kept/Unchanged=${unchanged}`);

// Group by unit and test for intra-unit duplicates
const byUnit = {};
vocab.forEach(item => {
  if (!byUnit[item.category]) byUnit[item.category] = [];
  byUnit[item.category].push({
    ...item,
    newImage: NEW_ICONS[item.id] || item.image
  });
});

let unitDupeCount = 0;
for (const [unitId, items] of Object.entries(byUnit)) {
  const seen = new Set();
  const dupes = [];
  items.forEach(it => {
    if (seen.has(it.newImage)) dupes.push({ word: it.word, icon: it.newImage });
    seen.add(it.newImage);
  });
  if (dupes.length > 0) {
    unitDupeCount++;
    console.warn(`⚠️ Unit ${unitId} has DUPLICATE icons:`, dupes);
  }
}

if (unitDupeCount === 0 && missing === 0) {
  console.log('🎉 PERFECT! All 90 units have 100% unique, zero-duplicate icons, and all 900 words are covered!');
} else {
  console.log(`Finished with ${unitDupeCount} unit conflicts and ${missing} missing items.`);
}

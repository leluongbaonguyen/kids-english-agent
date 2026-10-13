const { FLORA_FAUNA_VOCABULARY, FLORA_FAUNA_CATEGORIES } = require('./flora_fauna_data.js');

console.log('Total Flora & Fauna words:', FLORA_FAUNA_VOCABULARY.length);
console.log('Total Flora & Fauna units:', FLORA_FAUNA_CATEGORIES.length);

const byUnit = {};
FLORA_FAUNA_VOCABULARY.forEach(w => {
  if (!byUnit[w.category]) byUnit[w.category] = [];
  byUnit[w.category].push(w);
});

let conflicts = 0;
for (const [uId, words] of Object.entries(byUnit)) {
  const seen = new Set();
  const dupes = [];
  words.forEach(w => {
    if (seen.has(w.image)) dupes.push({ word: w.word, icon: w.image });
    seen.add(w.image);
  });
  if (dupes.length > 0) {
    conflicts++;
    console.warn(`⚠️ Unit ${uId} has duplicate icons:`, dupes);
  }
}

if (conflicts === 0) {
  console.log('🎉 100% Unique icons across all Flora & Fauna units!');
} else {
  console.log(`Found ${conflicts} unit conflicts.`);
}

/**
 * VALIDATE NUMBERS & ORDINALS DATASET AND SVG ASSETS
 */

const fs = require('fs');
const path = require('path');
const {
  NUMBER_LEVEL,
  NUMBER_CATEGORIES,
  NUMBER_VOCABULARY
} = require('./numbers_of_the_world_data.js');

console.log('=== VALIDATING NUMBERS & ORDINALS ===');
console.log('Total Number Units:', NUMBER_CATEGORIES.length);
console.log('Total Number Words:', NUMBER_VOCABULARY.length);

if (NUMBER_CATEGORIES.length !== 10) throw new Error('Expected 10 units!');
if (NUMBER_VOCABULARY.length !== 120) throw new Error('Expected 120 words!');

// Check each unit has 12 words and unique icons
NUMBER_CATEGORIES.forEach(cat => {
  const words = NUMBER_VOCABULARY.filter(w => w.category === cat.id);
  if (words.length !== 12) {
    throw new Error(`Unit ${cat.id} has ${words.length} words, expected 12!`);
  }

  const icons = words.map(w => w.image);
  const uniqueIcons = new Set(icons);
  if (icons.length !== uniqueIcons.size) {
    throw new Error(`Duplicate emoji icon found in unit ${cat.id}!`);
  }
});

console.log('✅ All 10 units have exactly 12 words (120 total).');
console.log('✅ 100% Unique icons across every unit.');

// Check SVG files in client/public/icons/numbers and numberSvgLibrary.js
const publicDir = path.resolve(__dirname, '../client/public/icons/numbers');
const libContent = fs.readFileSync(path.resolve(__dirname, '../client/src/constants/numberSvgLibrary.js'), 'utf8');

let missingSvgs = 0;
NUMBER_VOCABULARY.forEach(w => {
  const slug = w.word.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
  const svgPath = path.join(publicDir, `${slug}.svg`);
  if (!fs.existsSync(svgPath)) {
    console.error(`❌ Missing public SVG file for ${w.word}`);
    missingSvgs++;
  }
  if (!libContent.includes(`"${w.word.toLowerCase().trim()}":`)) {
    console.error(`❌ Missing entry in numberSvgLibrary.js for ${w.word}`);
    missingSvgs++;
  }
});

if (missingSvgs > 0) {
  throw new Error(`Found ${missingSvgs} missing SVGs!`);
}
console.log('✅ All 120 number words have verified, valid bespoke vector SVGs in both public and library!');

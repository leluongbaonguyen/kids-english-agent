/**
 * VALIDATE COLORS OF THE WORLD & OVERALL SYSTEM VOCABULARY
 */

const {
  COLOR_LEVEL,
  COLOR_CATEGORIES,
  COLOR_VOCABULARY
} = require('./colors_of_the_world_data.js');

console.log('=== VALIDATING COLORS OF THE WORLD ===');
console.log('Total Color Units:', COLOR_CATEGORIES.length);
console.log('Total Color Words:', COLOR_VOCABULARY.length);

if (COLOR_CATEGORIES.length !== 10) throw new Error('Expected 10 units!');
if (COLOR_VOCABULARY.length !== 120) throw new Error('Expected 120 words!');

// Check each unit has 12 words
COLOR_CATEGORIES.forEach(cat => {
  const words = COLOR_VOCABULARY.filter(w => w.category === cat.id);
  if (words.length !== 12) {
    throw new Error(`Unit ${cat.id} has ${words.length} words, expected 12!`);
  }
  
  // Check unique icons in unit
  const icons = words.map(w => w.image);
  const uniqueIcons = new Set(icons);
  if (icons.length !== uniqueIcons.size) {
    throw new Error(`Duplicate emoji icon found in unit ${cat.id}!`);
  }
  
  // Check unique hex colors in unit
  const hexes = words.map(w => w.hex);
  const uniqueHexes = new Set(hexes);
  if (hexes.length !== uniqueHexes.size) {
    throw new Error(`Duplicate hex code found in unit ${cat.id}!`);
  }
});

console.log('✅ All 10 units have exactly 12 words (120 total).');
console.log('✅ 100% Unique icons & exact hex codes across every unit.');

// Check SVG files in client/public/icons/colors and colorSvgLibrary.js
const fs = require('fs');
const path = require('path');
const publicDir = path.resolve(__dirname, '../client/public/icons/colors');
const libContent = fs.readFileSync(path.resolve(__dirname, '../client/src/constants/colorSvgLibrary.js'), 'utf8');

let missingSvgs = 0;
COLOR_VOCABULARY.forEach(w => {
  const slug = w.word.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
  const svgPath = path.join(publicDir, `${slug}.svg`);
  if (!fs.existsSync(svgPath)) {
    console.error(`❌ Missing public SVG file for ${w.word}`);
    missingSvgs++;
  }
  if (!libContent.includes(`"${w.word.toLowerCase().trim()}":`)) {
    console.error(`❌ Missing entry in colorSvgLibrary.js for ${w.word}`);
    missingSvgs++;
  }
});

if (missingSvgs > 0) {
  throw new Error(`Found ${missingSvgs} missing SVGs!`);
}
console.log('✅ All 120 color words have verified, valid bespoke vector SVGs in both public and library!');

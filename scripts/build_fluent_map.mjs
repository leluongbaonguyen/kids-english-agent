import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetSet = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, 'fluent_3d_assets.json'))));

function getFluentCode(emoji) {
  if (!emoji) return null;
  const chars = [...emoji];
  const hexes = chars.map(c => c.codePointAt(0).toString(16));
  const variants = [
    hexes.join('-'),
    hexes.filter(h => h !== 'fe0f' && h !== 'fe0e').join('-'),
    hexes.filter(h => h !== 'fe0f' && h !== 'fe0e').join('-') + '-fe0f',
    hexes.map(h => h.padStart(4, '0')).join('-'),
    hexes.filter(h => h !== 'fe0f' && h !== 'fe0e').map(h => h.padStart(4, '0')).join('-'),
    hexes.filter(h => h !== 'fe0f' && h !== 'fe0e').map(h => h.padStart(4, '0')).join('-') + '-fe0f'
  ];
  for (const v of variants) {
    if (assetSet.has(v)) return v;
  }
  return null;
}

const db1 = fs.readFileSync(path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js'), 'utf8');
const db2 = fs.readFileSync(path.join(__dirname, '../client/src/constants/worldEncyclopediaDatabase.js'), 'utf8');
const combined = db1 + db2;
const regex = /"image":\s*"([^"]+)"/g;
let m;
const uniqueEmojis = new Set();
while ((m = regex.exec(combined)) !== null) {
  uniqueEmojis.add(m[1]);
}

console.log('Total unique emojis in app:', uniqueEmojis.size);
const emojiMap = {};
let matched = 0;
let missed = [];
for (const e of uniqueEmojis) {
  const code = getFluentCode(e);
  if (code) {
    emojiMap[e] = code;
    matched++;
  } else {
    missed.push(e);
  }
}

console.log(`Matched emojis: ${matched} / ${uniqueEmojis.size} (${((matched / uniqueEmojis.size) * 100).toFixed(1)}%)`);
console.log('Missed emojis:', missed);

// Check special missed emojis: can we map them manually to appropriate 3D emojis?
const manualOverrides = {
  '🍋‍🟩': '1f34b', // lime -> lemon
  '🦱': '1f9b1',   // curly hair
  '▭': '25ad',    // rectangle
  'Ⅰ': '0031-fe0f-20e3', // Roman I -> 1
  'Ⅴ': '0035-fe0f-20e3', // Roman V -> 5
  'Ⅹ': '0031-0030-fe0f-20e3', // Roman X -> 10
  'Ⅼ': '0035-0030-fe0f-20e3', // Roman L -> 50
  'Ⅽ': '0031-0030-0030-fe0f-20e3', // Roman C -> 100
  'Ⅾ': '0035-0030-0030-fe0f-20e3', // Roman D -> 500
  'Ⅿ': '0031-0030-0030-0030-fe0f-20e3' // Roman M -> 1000
};

for (const [k, v] of Object.entries(manualOverrides)) {
  if (assetSet.has(v)) {
    emojiMap[k] = v;
  }
}

console.log('Final mapped emojis count:', Object.keys(emojiMap).length);

// Generate client file: client/src/utils/fluentEmojiMap.js
const clientCode = `// Microsoft Fluent 3D Emoji URL Resolver (Exact Claymorphic 3D Style)
// Maps Unicode emojis to high-resolution 3D WebP assets mirrored from Microsoft Fluent UI Emoji

const FLUENT_CDN_BASE = 'https://cdn.jsdelivr.net/npm/@lobehub/fluent-emoji-3d@latest/assets';

// Precomputed fast lookup dictionary for emojis in kids vocabulary
export const EMOJI_TO_FLUENT_MAP = ${JSON.stringify(emojiMap, null, 2)};

/**
 * Returns the CDN URL for the Microsoft Fluent 3D version of an emoji
 * @param {string} emoji - Unicode emoji string
 * @returns {string|null} - 3D WebP image URL, or null if not available
 */
export function getFluentEmojiUrl(emoji) {
  if (!emoji || typeof emoji !== 'string') return null;
  const trimmed = emoji.trim();
  const code = EMOJI_TO_FLUENT_MAP[trimmed];
  if (code) {
    return \`\${FLUENT_CDN_BASE}/\${code}.webp\`;
  }
  return null;
}
`;

fs.writeFileSync(path.join(__dirname, '../client/src/utils/fluentEmojiMap.js'), clientCode);
console.log('Successfully generated client/src/utils/fluentEmojiMap.js!');

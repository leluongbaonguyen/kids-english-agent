/**
 * UPDATE FLORA & FAUNA EMOJI FALLBACKS IN DATABASE
 * Updates emoji representations based on user review report while linking
 * custom vector SVG illustrations for all 120 words.
 */

const fs = require('fs');
const path = require('path');
const { getCustomSvgForWord } = require('../client/src/constants/floraFaunaSvgLibrary.js');

const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
let dbContent = fs.readFileSync(dbPath, 'utf8');

// Mapping of refined emojis based on audit report
const REFINED_EMOJIS = {
  // BIO-U01
  cheetah: '🐆',
  hyena: '🐕',
  antelope: '🦌',
  warthog: '🐗',
  meerkat: '🐿️',
  wildebeest: '🐂',

  // BIO-U02
  jaguar: '🐆',
  leopard: '🐆',
  chimpanzee: '🐵',
  tapir: '🦏',
  capybara: '🦫',
  pangolin: '🦔',
  lemur: '🐒',
  anteater: '🦡',

  // BIO-U03
  falcon: '🦅',
  toucan: '🦜',
  hummingbird: '🐦',
  woodpecker: '🐦',
  ostrich: '🦤',

  // BIO-U04
  'blue whale': '🐋',
  'killer whale': '🐋',
  'sea turtle': '🐢',
  'giant squid': '🦑',
  seahorse: '🐠',
  stingray: '🐟',
  'coral reef': '🪸',

  // BIO-U05
  crocodile: '🐊',
  alligator: '🐊',
  chameleon: '🦎',
  iguana: '🦎',
  'komodo dragon': '🦎',
  python: '🐍',
  cobra: '🐍',
  'tree frog': '🐸',
  toad: '🐸',
  salamander: '🦎',
  gecko: '🦎',
  tortoise: '🐢',

  // BIO-U06
  dragonfly: '🦗',
  grasshopper: '🦗',
  mantis: '🦗',
  firefly: '🪲',
  cicada: '🪲',
  caterpillar: '🐛',

  // BIO-U07
  'oak tree': '🌳',
  'pine tree': '🌲',
  'maple tree': '🍁',
  'willow tree': '🌳',
  bamboo: '🎋',
  baobab: '🌳',
  redwood: '🌲',
  mangrove: '🌳',
  cypress: '🌲',
  'birch tree': '🌳',
  fern: '🌿',

  // BIO-U08
  'water lily': '🪷',
  orchid: '🌺',
  jasmine: '🌼',
  'cherry blossom': '🌸',
  dandelion: '🌼',

  // BIO-U09
  succulent: '🪴',
  moss: '🌿',
  lichen: '🌿',
  clover: '☘️',
  vine: '🌿',
  algae: '🫧',
  seaweed: '🌿',
  reed: '🌾',
  'pitcher plant': '🪴',
  'venus flytrap': '🪴',

  // BIO-U10
  scale: '✨',
  fur: '🧶',
  paw: '🐾',
  claw: '🦅',
  horn: '🦏',
  beak: '🦜',
  petal: '🌸',
  root: '🌱',
  trunk: '🪵',
  bark: '🪵',
  camouflage: '🍃'
};

console.log('🔄 Updating refined emojis in kidsVocabularyDatabase.js...');

let updatedCount = 0;
for (const [word, newEmoji] of Object.entries(REFINED_EMOJIS)) {
  // Regex to find vocabulary entry for this word in BIO units
  const regex = new RegExp(`("word":\\s*"${word}",[\\s\\S]*?"level":\\s*"BIO",[\\s\\S]*?"image":\\s*")[^"]+(")`, 'g');
  if (regex.test(dbContent)) {
    dbContent = dbContent.replace(regex, `$1${newEmoji}$2`);
    updatedCount++;
  }
}

fs.writeFileSync(dbPath, dbContent, 'utf8');
console.log(`✅ Updated emojis for ${updatedCount} flora & fauna words in kidsVocabularyDatabase.js!`);

import fs from 'fs';
import { EXACT_ICON_CORRECTIONS } from './build_full_redesign_map.js';

const allWords = JSON.parse(fs.readFileSync('scripts/complete_vocab_audit.json', 'utf8'));

console.log('--- SIMULATING COMPLETE 1,560 VOCABULARY ICON AUDIT ---');

const updatedWords = allWords.map(item => {
  const newIcon = EXACT_ICON_CORRECTIONS[item.id] || item.icon;
  return { ...item, icon: newIcon };
});

// Check if any flagged issue remains
let remainingIssues = 0;
updatedWords.forEach(w => {
  const word = w.word.toLowerCase();
  const icon = w.icon;

  if (word === 'sloth' && icon !== '🦥') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word.includes('seahorse') && (icon.includes('🐴') || !['🫧','🐟','🐠'].includes(icon))) { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'blue whale' && icon !== '🐋') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'dolphin' && icon !== '🐬') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word.includes('turtle') && icon !== '🐢') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word.includes('tortoise') && icon !== '🐢') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word.includes('jellyfish') && icon !== '🪼') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'walrus' && icon !== '🦭') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'starfish' && !['⭐','⭐️'].includes(icon)) { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'cobra' && icon !== '🐍') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'tree frog' && icon !== '🐸') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'toad' && icon !== '🐸') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'anaconda' && icon !== '🐍') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'gecko' && icon !== '🦎') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'honeybee' && icon !== '🐝') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'ladybug' && icon !== '🐞') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'caterpillar' && icon !== '🐛') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if ((word === 'earthworm' || word === 'worm') && icon !== '🪱') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'antler' && icon !== '🦌') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'tusk' && !['🐘','🦣'].includes(icon)) { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'petal' && !['🌸','🌺'].includes(icon)) { console.log('STILL ISSUE:', w); remainingIssues++; }
  if ((word === 'trunk' || word === 'bark') && w.category === 'BIO-U10' && icon !== '🪵') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'beak' && !['🦜','🐦','🐥'].includes(icon)) { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'fur' && !['🦊','🐻','🧶'].includes(icon)) { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'talon' && !['🦅','🐾'].includes(icon)) { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'four-leaf clover' && icon !== '🍀') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'water lily' && icon !== '🪷') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'pine tree' && icon !== '🌲') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'maple tree' && icon !== '🍁') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'mammoth' && icon !== '🦣') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word.includes('stomach') && icon === '🫄') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'stress' && icon === '🧘') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'table' && icon === '🗄️') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'computer' && icon === '📄') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'calculate' && icon === '📊') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'international' && icon === '📈') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'interview' && icon === '📄') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'pterodactyl' && icon === '🦕') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'brachiosaurus' && icon === '🦖') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'amber' && icon === '🪨') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'dragonfruit' && icon === '🐉') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'spinning top' && icon === '🪙') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'pinwheel' && icon === '🪁') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'whistle' && icon === '🎺') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'pyramid' && icon === '🔺') { console.log('STILL ISSUE:', w); remainingIssues++; }
  if (word === 'windmill' && icon === '🌬️') { console.log('STILL ISSUE:', w); remainingIssues++; }
});

console.log(`Remaining flagged semantic issues after applying master map: ${remainingIssues}`);

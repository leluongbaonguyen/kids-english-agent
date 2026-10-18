import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
  const m = await import(pathToFileURL(dbPath).href);

  const db = m.VOCABULARY_DATABASE || [];
  const levels = m.COURSE_LEVELS || [];
  const categories = m.VOCAB_CATEGORIES || [];

  console.log(`TOTAL DATABASE WORDS: ${db.length}`);

  const levelStats = levels.map(lvl => {
    const words = db.filter(w => w.level === lvl.id);
    const unitList = categories.filter(c => c.level === lvl.id && c.id !== 'all');
    return {
      id: lvl.id,
      name: lvl.name,
      icon: lvl.icon,
      oldTarget: lvl.targetWords,
      actualWords: words.length,
      unitCount: unitList.length,
      units: unitList.map(u => ({
        id: u.id,
        name: u.name,
        icon: u.icon,
        count: db.filter(w => w.category === u.id).length
      }))
    };
  });

  console.log('\n=== STATS BY LEVEL ===');
  let sumWords = 0;
  levelStats.forEach(l => {
    sumWords += l.actualWords;
    console.log(`[${l.id}] ${l.name}: ${l.actualWords} từ (trước đây: ${l.oldTarget} từ) - ${l.unitCount} chủ đề`);
  });
  console.log(`Sum of all levels: ${sumWords}`);

  // Part of speech stats
  const posStats = {};
  db.forEach(w => {
    const t = w.type || 'Chưa phân loại';
    posStats[t] = (posStats[t] || 0) + 1;
  });
  console.log('\n=== STATS BY PART OF SPEECH (Từ loại) ===');
  Object.entries(posStats).sort((a,b) => b[1] - a[1]).forEach(([t, c]) => {
    console.log(` - ${t}: ${c} từ (${((c/db.length)*100).toFixed(1)}%)`);
  });

  fs.writeFileSync(path.join(__dirname, 'detailed_system_stats.json'), JSON.stringify({
    totalWords: db.length,
    levelStats,
    posStats
  }, null, 2));

  console.log('\nSaved report to scripts/detailed_system_stats.json');
}

run();

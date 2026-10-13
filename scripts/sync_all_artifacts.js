const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../client/src/constants/kidsVocabularyDatabase.js');
const dbContent = fs.readFileSync(dbPath, 'utf8');

const marker = 'export const VOCABULARY_DATABASE = ';
const startIdx = dbContent.indexOf(marker);
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

const jsonRaw = dbContent.slice(arrayStart, endIdx + 1);
const vocab = JSON.parse(jsonRaw);

// 1. Sync to server/data/master_vocabulary_900.json
const serverJsonPath = path.join(__dirname, '../server/data/master_vocabulary_900.json');
fs.writeFileSync(serverJsonPath, JSON.stringify(vocab, null, 2), 'utf8');
console.log(`✅ Synced ${vocab.length} items to server/data/master_vocabulary_900.json`);

// 2. Sync Excel to client/public and server/data
const excelSource = path.join(__dirname, '../Kids_English_Vocabulary_Full_Database.xlsx');
if (fs.existsSync(excelSource)) {
  const publicDest = path.join(__dirname, '../client/public/Kids_English_Vocabulary_Full_Database.xlsx');
  const serverDest = path.join(__dirname, '../server/data/Kids_English_Vocabulary_Full_Database.xlsx');
  fs.copyFileSync(excelSource, publicDest);
  fs.copyFileSync(excelSource, serverDest);
  console.log('✅ Synced Excel file to client/public/ and server/data/');
}

// 3. Sync Word to client/public and server/data
const wordSource = path.join(__dirname, '../Kids_English_V6_Full_Vocab_Exercises.docx');
if (fs.existsSync(wordSource)) {
  const publicDest = path.join(__dirname, '../client/public/Kids_English_V6_Full_Vocab_Exercises.docx');
  const serverDest = path.join(__dirname, '../server/data/Kids_English_V6_Full_Vocab_Exercises.docx');
  fs.copyFileSync(wordSource, publicDest);
  fs.copyFileSync(wordSource, serverDest);
  console.log('✅ Synced Word file to client/public/ and server/data/');
}

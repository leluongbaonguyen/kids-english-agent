/**
 * EXPORT FULL VOCABULARY DATABASE TO EXCEL (.XLSX)
 * - Xuất toàn bộ 900 từ vựng hệ thống Kids English Agent ra file Excel chuẩn
 * - Gồm Sheet Tổng hợp 900 từ, 6 Sheet riêng cho từng Level (L1 - L6), và 1 Sheet Danh mục Cấp độ & Chủ đề
 * - Đầy đủ: STT, Mã ID, Cấp độ, Unit, Chủ đề, Từ vựng, Phiên âm IPA, Phát âm TV, Nghĩa TV, Từ loại, Câu ví dụ, Dịch nghĩa ví dụ, Icon
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// 1. Đọc và parse dữ liệu từ kidsVocabularyDatabase.js
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

console.log('🔄 Đang trích xuất dữ liệu từ kidsVocabularyDatabase.js...');
const levels = extractExport('COURSE_LEVELS');
const categories = extractExport('VOCAB_CATEGORIES');
const vocabulary = extractExport('VOCABULARY_DATABASE');

console.log(`✅ Đã tải: ${levels.length} Cấp độ, ${categories.length} Chủ đề, ${vocabulary.length} Từ vựng.`);

// Tạo bản đồ tra cứu nhanh Cấp độ và Chủ đề
const levelMap = {};
levels.forEach(lvl => {
  levelMap[lvl.id] = lvl;
});

const categoryMap = {};
categories.forEach(cat => {
  categoryMap[cat.id] = cat;
});

// Định nghĩa cột chuẩn cho bảng từ vựng
const mapVocabRow = (item, index) => {
  const levelInfo = levelMap[item.level] || {};
  const catInfo = categoryMap[item.category] || {};

  return {
    'STT': index + 1,
    'Mã ID': item.id || '',
    'Cấp Độ': item.level || '',
    'Tên Cấp Độ': levelInfo.name || `Cấp độ ${item.level}`,
    'Unit': item.unit ? `Unit ${item.unit}` : '',
    'Mã Chủ Đề': item.category || '',
    'Tên Chủ Đề': catInfo.name || item.category || '',
    'Từ Vựng (English)': item.word || '',
    'Phiên Âm IPA': item.ipa || '',
    'Phát Âm Tiếng Việt': item.vietnamesePhonetic || '',
    'Nghĩa Tiếng Việt': item.meaning || '',
    'Từ Loại': item.type || 'Danh từ',
    'Câu Ví Dụ (English)': item.example || '',
    'Dịch Câu Ví Dụ (Tiếng Việt)': item.exampleVi || '',
    'Icon / Minh Họa': item.image || ''
  };
};

// Độ rộng tối ưu cho các cột dữ liệu
const vocabColWidths = [
  { wch: 6 },   // STT
  { wch: 18 },  // Mã ID
  { wch: 10 },  // Cấp Độ
  { wch: 30 },  // Tên Cấp Độ
  { wch: 10 },  // Unit
  { wch: 12 },  // Mã Chủ Đề
  { wch: 36 },  // Tên Chủ Đề
  { wch: 22 },  // Từ Vựng (English)
  { wch: 18 },  // Phiên Âm IPA
  { wch: 18 },  // Phát Âm Tiếng Việt
  { wch: 26 },  // Nghĩa Tiếng Việt
  { wch: 14 },  // Từ Loại
  { wch: 45 },  // Câu Ví Dụ
  { wch: 45 },  // Dịch Câu Ví Dụ
  { wch: 14 }   // Icon
];

// Khởi tạo Workbook
const wb = XLSX.utils.book_new();

// -------------------------------------------------------------
// SHEET 1: TOÀN BỘ 900 TỪ VỰNG HỆ THỐNG
// -------------------------------------------------------------
console.log('📑 Đang tạo Sheet 1: Toàn Bộ 900 Từ Vựng...');
const allVocabRows = vocabulary.map((v, idx) => mapVocabRow(v, idx));
const wsAll = XLSX.utils.json_to_sheet(allVocabRows);
wsAll['!cols'] = vocabColWidths;
if (wsAll['!ref']) {
  wsAll['!autofilter'] = { ref: wsAll['!ref'] };
}
wsAll['!views'] = [{ state: 'frozen', ySplit: 1, activeCell: 'A2' }];
XLSX.utils.book_append_sheet(wb, wsAll, 'Toàn Bộ Từ Vựng');

// -------------------------------------------------------------
// SHEETS 2 - 8: CHI TIẾT TỪNG CẤP ĐỘ L1 - L6 VÀ BIO
// -------------------------------------------------------------
const levelSheetNames = {
  'L1': 'Level 1 - Khởi Động',
  'L2': 'Level 2 - Cơ Bản',
  'L3': 'Level 3 - Mở Rộng',
  'L4': 'Level 4 - Nâng Cao',
  'L5': 'Level 5 - Tiên Phong',
  'L6': 'Level 6 - Quốc Tế',
  'BIO': 'Bách Khoa Động Thực Vật',
  'COLOR': 'Bách Khoa Sắc Màu',
  'NUM': 'Bách Khoa Số Đếm'
};

levels.forEach(lvl => {
  const lvlId = lvl.id;
  const sheetName = levelSheetNames[lvlId] || `Level ${lvlId}`;
  console.log(`📑 Đang tạo Sheet: ${sheetName}...`);

  const lvlVocab = vocabulary.filter(v => v.level === lvlId);
  const lvlRows = lvlVocab.map((v, idx) => mapVocabRow(v, idx));
  const wsLvl = XLSX.utils.json_to_sheet(lvlRows);
  wsLvl['!cols'] = vocabColWidths;
  if (wsLvl['!ref']) {
    wsLvl['!autofilter'] = { ref: wsLvl['!ref'] };
  }
  wsLvl['!views'] = [{ state: 'frozen', ySplit: 1, activeCell: 'A2' }];
  XLSX.utils.book_append_sheet(wb, wsLvl, sheetName);
});

// -------------------------------------------------------------
// SHEET 8: DANH MỤC CẤP ĐỘ & 90 CHỦ ĐỀ
// -------------------------------------------------------------
console.log('📑 Đang tạo Sheet: Cấu Trúc Khóa Học & Chủ Đề...');

// 1. Thống kê theo cấp độ
const levelSummaryRows = levels.map((lvl, idx) => {
  const count = vocabulary.filter(v => v.level === lvl.id).length;
  return {
    'STT': idx + 1,
    'Mã Cấp Độ': lvl.id,
    'Tên Cấp Độ': lvl.name,
    'Biểu Tượng': lvl.icon,
    'Huy Hiệu': lvl.badge,
    'Mục Tiêu Số Từ': lvl.targetWords,
    'Số Từ Thực Tế': count,
    'Mô Tả Chương Trình': lvl.description
  };
});

const wsLevels = XLSX.utils.json_to_sheet(levelSummaryRows);
wsLevels['!cols'] = [
  { wch: 6 },
  { wch: 12 },
  { wch: 35 },
  { wch: 12 },
  { wch: 30 },
  { wch: 16 },
  { wch: 16 },
  { wch: 70 }
];
if (wsLevels['!ref']) {
  wsLevels['!autofilter'] = { ref: wsLevels['!ref'] };
}
wsLevels['!views'] = [{ state: 'frozen', ySplit: 1, activeCell: 'A2' }];
XLSX.utils.book_append_sheet(wb, wsLevels, 'Danh Mục Cấp Độ');

// 2. Danh mục Chủ đề
const unitCategories = categories.filter(c => c.id !== 'all');
const topicRows = unitCategories.map((cat, idx) => {
  const count = vocabulary.filter(v => v.category === cat.id).length;
  const lvlInfo = levelMap[cat.level] || {};
  return {
    'STT': idx + 1,
    'Mã Chủ Đề': cat.id,
    'Cấp Độ': cat.level,
    'Tên Cấp Độ': lvlInfo.name || '',
    'Tên Chủ Đề': cat.name,
    'Biểu Tượng': cat.icon,
    'Số Từ Vựng': count
  };
});

const wsTopics = XLSX.utils.json_to_sheet(topicRows);
wsTopics['!cols'] = [
  { wch: 6 },
  { wch: 14 },
  { wch: 10 },
  { wch: 32 },
  { wch: 40 },
  { wch: 12 },
  { wch: 14 }
];
if (wsTopics['!ref']) {
  wsTopics['!autofilter'] = { ref: wsTopics['!ref'] };
}
wsTopics['!views'] = [{ state: 'frozen', ySplit: 1, activeCell: 'A2' }];
XLSX.utils.book_append_sheet(wb, wsTopics, 'Danh Mục Chủ Đề');

// -------------------------------------------------------------
// GHI RA FILE EXCEL
// -------------------------------------------------------------
const outputFileName = 'Kids_English_Vocabulary_Full_Database.xlsx';
const outputPath = path.join(__dirname, '../', outputFileName);

console.log(`💾 Đang ghi file: ${outputPath}...`);
XLSX.writeFile(wb, outputPath);

// Kiểm tra kích thước file
const stats = fs.statSync(outputPath);
console.log(`✨ XUẤT THÀNH CÔNG!`);
console.log(`📂 Tên file: ${outputFileName}`);
console.log(`📊 Kích thước: ${(stats.size / 1024).toFixed(2)} KB`);
console.log(`🎯 Tổng cộng ${wb.SheetNames.length} sheets:`);
wb.SheetNames.forEach((sName, i) => {
  console.log(`   ${i + 1}. ${sName}`);
});

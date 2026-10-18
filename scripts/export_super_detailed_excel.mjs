import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import vocabulary database
import {
  COURSE_LEVELS,
  VOCAB_CATEGORIES,
  VOCABULARY_DATABASE,
  getSuperDetailedVocabInfo
} from '../client/src/constants/kidsVocabularyDatabase.js';

console.log('🚀 Đang khởi động tiến trình xuất Excel Siêu Chi Tiết 1,560 Từ Vựng & Icon...');
console.log(`📊 Tổng số Cấp độ: ${COURSE_LEVELS.length}`);
console.log(`📚 Tổng số Chủ đề: ${VOCAB_CATEGORIES.length}`);
console.log(`🔤 Tổng số Từ vựng: ${VOCABULARY_DATABASE.length}`);

// Tạo bản đồ tra cứu nhanh
const levelMap = new Map();
COURSE_LEVELS.forEach(lvl => levelMap.set(lvl.id, lvl));

const categoryMap = new Map();
VOCAB_CATEGORIES.forEach(cat => categoryMap.set(cat.id, cat));

// Bảng màu chủ đạo cho từng Sheet
const LEVEL_THEMES = {
  ALL: { name: 'Toàn Bộ Hệ Thống', primary: '1E3A8A', secondary: 'DBEAFE', text: 'FFFFFF', accent: '2563EB' },
  L1: { name: 'Level 1 - Khởi Động', primary: 'B45309', secondary: 'FEF3C7', text: 'FFFFFF', accent: 'D97706' },
  L2: { name: 'Level 2 - Cơ Bản', primary: '1D4ED8', secondary: 'DBEAFE', text: 'FFFFFF', accent: '2563EB' },
  L3: { name: 'Level 3 - Mở Rộng', primary: '047857', secondary: 'D1FAE5', text: 'FFFFFF', accent: '059669' },
  L4: { name: 'Level 4 - Nâng Cao', primary: '6D28D9', secondary: 'EDE9FE', text: 'FFFFFF', accent: '7C3AED' },
  L5: { name: 'Level 5 - Tiên Phong', primary: 'B91C1C', secondary: 'FEE2E2', text: 'FFFFFF', accent: 'DC2626' },
  L6: { name: 'Level 6 - Quốc Tế', primary: '0E7490', secondary: 'CFFAFE', text: 'FFFFFF', accent: '0891B2' },
  BIO: { name: 'Bách Khoa Động Thực Vật', primary: '15803D', secondary: 'DCFCE7', text: 'FFFFFF', accent: '16A34A' },
  COLOR: { name: 'Bách Khoa Sắc Màu', primary: 'A21CAF', secondary: 'FAE8FF', text: 'FFFFFF', accent: 'C026D3' },
  NUM: { name: 'Bách Khoa Số Đếm', primary: 'C2410C', secondary: 'FFEDD5', text: 'FFFFFF', accent: 'EA580C' },
  ENC: { name: 'Bách Khoa Thế Giới', primary: '334155', secondary: 'E2E8F0', text: 'FFFFFF', accent: '475569' },
  SUMMARY: { name: 'Tổng Hợp Cấp Độ', primary: '312E81', secondary: 'E0E7FF', text: 'FFFFFF', accent: '4338CA' },
  TOPICS: { name: 'Danh Mục 140 Chủ Đề', primary: '0369A1', secondary: 'E0F2FE', text: 'FFFFFF', accent: '0284C7' },
  ICONS: { name: 'Bảng Tra Cứu Icon', primary: '4C1D95', secondary: 'F3E8FF', text: 'FFFFFF', accent: '6D28D9' }
};

// Định nghĩa cột chuẩn siêu chi tiết (20 cột)
const VOCAB_COLUMNS = [
  { header: 'STT', key: 'stt', width: 8, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Mã ID', key: 'id', width: 22, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Icon / Biểu Tượng', key: 'icon', width: 18, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Từ Vựng (English)', key: 'word', width: 24, alignment: { horizontal: 'left', vertical: 'middle' } },
  { header: 'Từ Loại', key: 'type', width: 14, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Phiên Âm IPA', key: 'ipa', width: 20, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Phát Âm Tiếng Việt', key: 'vietnamesePhonetic', width: 22, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Nghĩa Tiếng Việt', key: 'meaning', width: 30, alignment: { horizontal: 'left', vertical: 'middle' } },
  { header: 'Đánh Vần Âm Tiết', key: 'syllables', width: 26, alignment: { horizontal: 'left', vertical: 'middle' } },
  { header: 'Câu Ví Dụ (English)', key: 'example', width: 44, alignment: { horizontal: 'left', vertical: 'middle', wrapText: true } },
  { header: 'Dịch Nghĩa Ví Dụ (Tiếng Việt)', key: 'exampleVi', width: 44, alignment: { horizontal: 'left', vertical: 'middle', wrapText: true } },
  { header: 'Mẹo Ghi Nhớ Siêu Dễ Thuộc', key: 'memoryTip', width: 52, alignment: { horizontal: 'left', vertical: 'middle', wrapText: true } },
  { header: 'Mẫu Câu Giao Tiếp Hằng Ngày', key: 'dailyPhrase', width: 50, alignment: { horizontal: 'left', vertical: 'middle', wrapText: true } },
  { header: 'Sự Thật Thú Vị & Mở Rộng', key: 'funFact', width: 52, alignment: { horizontal: 'left', vertical: 'middle', wrapText: true } },
  { header: 'Cấp Độ', key: 'level', width: 12, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Tên Cấp Độ', key: 'levelName', width: 32, alignment: { horizontal: 'left', vertical: 'middle' } },
  { header: 'Mã Unit', key: 'category', width: 14, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Tên Chủ Đề (Unit Topic)', key: 'categoryName', width: 38, alignment: { horizontal: 'left', vertical: 'middle' } },
  { header: 'Icon Unit', key: 'categoryIcon', width: 12, alignment: { horizontal: 'center', vertical: 'middle' } },
  { header: 'Thuộc Tính Bổ Sung', key: 'extra', width: 22, alignment: { horizontal: 'center', vertical: 'middle' } }
];

// Khởi tạo Workbook
const workbook = new ExcelJS.Workbook();
workbook.creator = 'Kids English Learning Agent';
workbook.lastModifiedBy = 'Kids English Agent Platform';
workbook.created = new Date();
workbook.modified = new Date();

// Helper chuẩn bị dữ liệu 1 dòng từ vựng
function prepareVocabRow(item, index) {
  const detailed = getSuperDetailedVocabInfo(item);
  const lvl = levelMap.get(item.level) || {};
  const cat = categoryMap.get(item.category) || {};

  // Thuộc tính bổ sung: HEX cho COLOR, Symbol cho NUM, Unit number...
  let extraInfo = '';
  if (item.hex) {
    extraInfo = `Mã Màu: ${item.hex}`;
  } else if (item.symbol) {
    extraInfo = `Ký Số: ${item.symbol}`;
  } else if (item.unit) {
    extraInfo = `Bài học Unit ${item.unit}`;
  }

  return {
    stt: index + 1,
    id: item.id || '',
    icon: item.image || item.icon || '⭐',
    word: item.word || '',
    type: detailed.typeLabel || item.type || 'Danh từ',
    ipa: item.ipa || '',
    vietnamesePhonetic: detailed.vietnamesePhoneticDisplay || item.vietnamesePhonetic || '',
    meaning: item.meaning || '',
    syllables: detailed.syllableBreakdown || item.word?.toUpperCase() || '',
    example: item.example || '',
    exampleVi: item.exampleVi || '',
    memoryTip: detailed.memoryTip || '',
    dailyPhrase: detailed.dailyPhrase || '',
    funFact: detailed.funFact || '',
    level: item.level || '',
    levelName: lvl.name || `Cấp độ ${item.level}`,
    category: item.category || '',
    categoryName: cat.name || item.category || '',
    categoryIcon: cat.icon || '📚',
    extra: extraInfo
  };
}

// Hàm format và tạo sheet từ vựng chuẩn
function createVocabSheet(sheetName, titleText, subtitleText, wordsList, themeKey) {
  console.log(`📑 Đang tạo Sheet: ${sheetName} (${wordsList.length} từ)...`);
  const theme = LEVEL_THEMES[themeKey] || LEVEL_THEMES.ALL;
  const worksheet = workbook.addWorksheet(sheetName, {
    views: [{ state: 'frozen', xSplit: 4, ySplit: 4, activeCell: 'E5' }],
    properties: { tabColor: { argb: 'FF' + theme.primary } }
  });

  // Hàng 1: Banner Tiêu đề Lớn
  worksheet.mergeCells('A1:T1');
  const titleCell = worksheet.getCell('A1');
  titleCell.value = titleText;
  titleCell.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + theme.primary } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.getRow(1).height = 40;

  // Hàng 2: Phụ đề & Thống kê
  worksheet.mergeCells('A2:T2');
  const subCell = worksheet.getCell('A2');
  subCell.value = subtitleText;
  subCell.font = { name: 'Segoe UI', size: 11, italic: true, color: { argb: 'FF' + theme.primary } };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + theme.secondary } };
  subCell.alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.getRow(2).height = 24;

  // Hàng 3: Khoảng cách nhẹ
  worksheet.getRow(3).height = 6;

  // Hàng 4: Tiêu đề các Cột
  const headerRow = worksheet.getRow(4);
  headerRow.height = 34;

  VOCAB_COLUMNS.forEach((col, idx) => {
    const cell = headerRow.getCell(idx + 1);
    cell.value = col.header;
    cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + theme.primary } };
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    cell.border = {
      top: { style: 'medium', color: { argb: 'FF' + theme.primary } },
      left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
      bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
      right: { style: 'thin', color: { argb: 'FFFFFFFF' } }
    };
    worksheet.getColumn(idx + 1).width = col.width;
  });

  // Đổ dữ liệu từ hàng 5
  wordsList.forEach((w, idx) => {
    const rowData = prepareVocabRow(w, idx);
    const rowNum = idx + 5;
    const row = worksheet.getRow(rowNum);
    row.height = 30; // Chiều cao tối ưu cho emoji to rõ và text thoáng đãng

    const isEven = idx % 2 === 0;
    const bgArgb = isEven ? 'FFFFFFFF' : 'FFF8FAFC'; // Zebra striping nhẹ nhàng

    VOCAB_COLUMNS.forEach((col, colIdx) => {
      const cell = row.getCell(colIdx + 1);
      cell.value = rowData[col.key];
      cell.alignment = col.alignment;
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgArgb } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
      };

      // Định dạng chuyên biệt từng loại nội dung
      if (col.key === 'stt') {
        cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF64748B' } };
      } else if (col.key === 'id') {
        cell.font = { name: 'Consolas', size: 9, color: { argb: 'FF475569' } };
      } else if (col.key === 'icon') {
        cell.font = { name: 'Segoe UI Emoji', size: 16 }; // Emoji siêu to rõ nét!
      } else if (col.key === 'word') {
        cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FF' + theme.accent } };
      } else if (col.key === 'type') {
        cell.font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: 'FF475569' } };
      } else if (col.key === 'ipa') {
        cell.font = { name: 'Segoe UI', size: 10, italic: true, color: { argb: 'FF64748B' } };
      } else if (col.key === 'vietnamesePhonetic') {
        cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0284C7' } };
      } else if (col.key === 'meaning') {
        cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FF0F172A' } };
      } else if (col.key === 'syllables') {
        cell.font = { name: 'Segoe UI', size: 10, color: { argb: 'FF334155' } };
      } else if (col.key === 'memoryTip') {
        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF9A3412' } }; // Màu ấm cho mẹo nhớ
      } else if (col.key === 'dailyPhrase') {
        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF1E40AF' } }; // Xanh dương cho câu hội thoại
      } else if (col.key === 'funFact') {
        cell.font = { name: 'Segoe UI', size: 9.5, color: { argb: 'FF065F46' } }; // Xanh lục ngọc cho Fun Fact
      } else {
        cell.font = { name: 'Segoe UI', size: 10, color: { argb: 'FF334155' } };
      }
    });
  });

  // Auto-filter từ hàng 4 đến hết
  worksheet.autoFilter = {
    from: { row: 4, column: 1 },
    to: { row: wordsList.length + 4, column: VOCAB_COLUMNS.length }
  };
}

// ============================================================================
// SHEET 1: MASTER SHEET - TOÀN BỘ TỪ VỰNG ĐỘC BẢN & ICON
// ============================================================================
createVocabSheet(
  `Toàn Bộ ${VOCABULARY_DATABASE.length} Từ Vựng`,
  `🌟 KIDS ENGLISH AGENT - TỔNG HỢP TOÀN BỘ ${VOCABULARY_DATABASE.length} TỪ VỰNG ĐỘC BẢN & ICON SIÊU CHI TIẾT`,
  `Bộ cơ sở dữ liệu từ vựng tiếng Anh chuẩn quốc tế toàn diện: 10 Cấp Độ • 140 Chủ Đề • ${VOCABULARY_DATABASE.length} Từ Vựng 100% Độc Bản Không Trùng Lặp • 100% Exact Icon Emoji • Phiên Âm IPA & Bồi • Câu Ví Dụ • Mẹo Nhớ • Fun Fact`,
  VOCABULARY_DATABASE,
  'ALL'
);

// ============================================================================
// SHEETS 2 - 11: CHI TIẾT TỪNG CẤP ĐỘ
// ============================================================================
const levelConfigs = [
  {
    id: 'L1',
    sheetName: 'Level 1 - Khởi Động',
    title: '🐣 LEVEL 1: KHỞI ĐỘNG (4–5 TUỔI) - 150 TỪ VỰNG CỐT LÕI (15 CHỦ ĐỀ)',
    sub: 'Từ đơn căn bản, nhận biết hình ảnh, phản xạ nghe - chọn: Màu sắc, số đếm, hình dạng, gia đình, cơ thể, đồ ăn, đồ chơi, động vật...'
  },
  {
    id: 'L2',
    sheetName: 'Level 2 - Cơ Bản',
    title: '🦁 LEVEL 2: CƠ BẢN (5–7 TUỔI) - 150 TỪ VỰNG MỞ RỘNG (15 CHỦ ĐỀ)',
    sub: 'Cụm từ & câu ngắn, sinh hoạt thường nhật: Ngôi nhà, trang phục, thói quen sinh hoạt, thời tiết, giao thông, sinh vật biển...'
  },
  {
    id: 'L3',
    sheetName: 'Level 3 - Mở Rộng',
    title: '🚀 LEVEL 3: MỞ RỘNG (7–9 TUỔI) - 150 TỪ VỰNG GIAO TIẾP (15 CHỦ ĐỀ)',
    sub: 'Giao tiếp thực tế, xã hội và tự nhiên: Thiên nhiên, sức khỏe, mua sắm, du lịch, công nghệ máy tính, nhà hàng, nghề nghiệp...'
  },
  {
    id: 'L4',
    sheetName: 'Level 4 - Nâng Cao',
    title: '👑 LEVEL 4: NÂNG CAO (8–10 TUỔI) - 150 TỪ VỰNG HỌC THUẬT (15 CHỦ ĐỀ)',
    sub: 'Khoa học cơ bản, tư duy & khám phá: Vũ trụ & không gian, thể thao Olympic, âm nhạc, hội họa, kiến trúc, đại dương...'
  },
  {
    id: 'L5',
    sheetName: 'Level 5 - Tiên Phong',
    title: '🌟 LEVEL 5: TIÊN PHONG (10–12 TUỔI) - 150 TỪ VỰNG CHUYÊN SÂU (15 CHỦ ĐỀ)',
    sub: 'Đọc hiểu học thuật, viết văn và thuyết trình: Lịch sử, sinh học tế bào, hóa học, vật lý năng lượng, lập trình máy tính...'
  },
  {
    id: 'L6',
    sheetName: 'Level 6 - Quốc Tế',
    title: '🌎 LEVEL 6: HỘI NHẬP QUỐC TẾ (12+ TUỔI) - 150 TỪ VỰNG IELTS/TOEFL (15 CHỦ ĐỀ)',
    sub: 'Tiếng Anh học thuật quốc tế, tranh biện & hội nhập: Giao tiếp ưu việt, xã hội học, từ vựng IELTS, thành ngữ Idioms, tư duy hệ thống...'
  },
  {
    id: 'BIO',
    sheetName: 'Bách Khoa Động Thực Vật',
    title: '🌿 CHUYÊN ĐỀ: BÁCH KHOA ĐỘNG THỰC VẬT TOÀN CẦU (FLORA & FAUNA) - 120 TỪ VỰNG (10 CHỦ ĐỀ)',
    sub: 'Khám phá thế giới sinh học diệu kỳ: Thú thảo nguyên, thú săn mồi, chim muông, sinh vật biển sâu, bò sát lưỡng cư, côn trùng, cổ thụ, muôn hoa...'
  },
  {
    id: 'COLOR',
    sheetName: 'Bách Khoa Sắc Màu',
    title: '🎨 CHUYÊN ĐỀ: BÁCH KHOA SẮC MÀU TOÀN CẦU (COLORS OF THE WORLD) - 120 SẮC THÁI MÀU (10 CHỦ ĐỀ)',
    sub: 'Thế giới màu sắc chuẩn mỹ thuật & quang phổ: Sắc đỏ thắm, lam đại dương, lục ngọc bích, hoàng kim hổ phách, tím hoàng gia, cam đất nung, bạch kim & ngũ sắc...'
  },
  {
    id: 'NUM',
    sheetName: 'Bách Khoa Số Đếm',
    title: '🔢 CHUYÊN ĐỀ: BÁCH KHOA SỐ ĐẾM & SỐ HỌC TOÀN CẦU (NUMBERS OF THE WORLD) - 120 KHÁI NIỆM (10 CHỦ ĐỀ)',
    sub: 'Bách khoa toàn diện về số đếm, số thứ tự, phân số, bội số, đơn vị đếm tập hợp và ký số La Mã trong tiếng Anh chuẩn quốc tế.'
  },
  {
    id: 'ENC',
    sheetName: 'Bách Khoa Thế Giới',
    title: '🌍 BÁCH KHOA TOÀN THƯ THẾ GIỚI CHO BÉ (WORLD ENCYCLOPEDIA) - 300 TỪ VỰNG ĐẶC SẮC (20 CHỦ ĐỀ)',
    sub: 'Khủng long tiền sử, hệ mặt trời, kỳ quan thế giới, cơ thể người, đại dương sâu thẳm, siêu cỗ máy, thời tiết cực đoan, khoáng sản đá quý...'
  }
];

levelConfigs.forEach(cfg => {
  const wordsInLevel = VOCABULARY_DATABASE.filter(w => w.level === cfg.id);
  createVocabSheet(cfg.sheetName, cfg.title, cfg.sub, wordsInLevel, cfg.id);
});

// ============================================================================
// SHEET 12: TỔNG HỢP CẤU TRÚC 10 CẤP ĐỘ
// ============================================================================
console.log('📑 Đang tạo Sheet: Cấu Trúc Khóa Học & 10 Cấp Độ...');
const wsLevels = workbook.addWorksheet('Tổng Hợp 10 Cấp Độ', {
  views: [{ state: 'frozen', xSplit: 0, ySplit: 4, activeCell: 'A5' }],
  properties: { tabColor: { argb: 'FF312E81' } }
});

// Banner
wsLevels.mergeCells('A1:I1');
const lTitle = wsLevels.getCell('A1');
lTitle.value = '🏆 KHUNG CHƯƠNG TRÌNH & CẤU TRÚC 10 CẤP ĐỘ KIDS ENGLISH AGENT';
lTitle.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
lTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF312E81' } };
lTitle.alignment = { horizontal: 'center', vertical: 'middle' };
wsLevels.getRow(1).height = 40;

wsLevels.mergeCells('A2:I2');
const lSub = wsLevels.getCell('A2');
lSub.value = 'Hệ thống học tập phân tầng khoa học từ Mầm non (4 tuổi) đến Hội nhập Quốc tế (12+ tuổi) & Các Chuyên đề Bách khoa tri thức';
lSub.font = { name: 'Segoe UI', size: 11, italic: true, color: { argb: 'FF312E81' } };
lSub.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0E7FF' } };
lSub.alignment = { horizontal: 'center', vertical: 'middle' };
wsLevels.getRow(2).height = 24;
wsLevels.getRow(3).height = 6;

const levelCols = [
  { header: 'STT', width: 8, key: 'stt' },
  { header: 'Mã Cấp Độ', width: 14, key: 'id' },
  { header: 'Biểu Tượng', width: 14, key: 'icon' },
  { header: 'Tên Chương Trình / Cấp Độ', width: 42, key: 'name' },
  { header: 'Huy Hiệu Cấp Độ', width: 34, key: 'badge' },
  { header: 'Số Lượng Unit', width: 16, key: 'unitCount' },
  { header: 'Mục Tiêu Số Từ', width: 16, key: 'targetWords' },
  { header: 'Số Từ Thực Tế', width: 16, key: 'actualWords' },
  { header: 'Mô Tả Mục Tiêu & Kiến Thức Trọng Tâm', width: 70, key: 'desc' }
];

const lHeaderRow = wsLevels.getRow(4);
lHeaderRow.height = 34;
levelCols.forEach((col, idx) => {
  const cell = lHeaderRow.getCell(idx + 1);
  cell.value = col.header;
  cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF312E81' } };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
  cell.border = {
    top: { style: 'medium', color: { argb: 'FF312E81' } },
    left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
    bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
    right: { style: 'thin', color: { argb: 'FFFFFFFF' } }
  };
  wsLevels.getColumn(idx + 1).width = col.width;
});

COURSE_LEVELS.forEach((lvl, idx) => {
  const actualCount = VOCABULARY_DATABASE.filter(w => w.level === lvl.id).length;
  const catsInLvl = VOCAB_CATEGORIES.filter(c => c.level === lvl.id && c.id !== 'all').length;
  const rowNum = idx + 5;
  const row = wsLevels.getRow(rowNum);
  row.height = 36;

  const rowData = {
    stt: idx + 1,
    id: lvl.id,
    icon: lvl.icon,
    name: lvl.name,
    badge: lvl.badge,
    unitCount: catsInLvl || lvl.unitCount || (actualCount / 10),
    targetWords: lvl.targetWords,
    actualWords: actualCount,
    desc: lvl.description
  };

  const isEven = idx % 2 === 0;
  const bgArgb = isEven ? 'FFFFFFFF' : 'FFF8FAFC';

  [
    { val: rowData.stt, align: 'center', bold: true, color: 'FF64748B' },
    { val: rowData.id, align: 'center', bold: true, color: 'FF312E81' },
    { val: rowData.icon, align: 'center', size: 18 },
    { val: rowData.name, align: 'left', bold: true, color: 'FF0F172A' },
    { val: rowData.badge, align: 'left', color: 'FF475569' },
    { val: rowData.unitCount, align: 'center', bold: true, color: 'FF0284C7' },
    { val: rowData.targetWords, align: 'center', color: 'FF64748B' },
    { val: rowData.actualWords, align: 'center', bold: true, color: 'FF16A34A' },
    { val: rowData.desc, align: 'left', wrap: true, color: 'FF334155' }
  ].forEach((item, colIdx) => {
    const cell = row.getCell(colIdx + 1);
    cell.value = item.val;
    cell.font = {
      name: item.size ? 'Segoe UI Emoji' : 'Segoe UI',
      size: item.size || 10,
      bold: !!item.bold,
      color: { argb: item.color || 'FF334155' }
    };
    cell.alignment = { horizontal: item.align, vertical: 'middle', wrapText: !!item.wrap };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgArgb } };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
    };
  });
});

// Thêm dòng Tổng kết
const totalRowIdx = COURSE_LEVELS.length + 5;
const totalRow = wsLevels.getRow(totalRowIdx);
totalRow.height = 36;
wsLevels.mergeCells(`A${totalRowIdx}:E${totalRowIdx}`);
const totalLabelCell = totalRow.getCell(1);
totalLabelCell.value = '🎉 TỔNG CỘNG TOÀN BỘ HỆ THỐNG:';
totalLabelCell.font = { name: 'Segoe UI', size: 12, bold: true, color: { argb: 'FF1E3A8A' } };
totalLabelCell.alignment = { horizontal: 'right', vertical: 'middle' };
totalLabelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDBEAFE' } };

const totalUnits = VOCAB_CATEGORIES.filter(c => c.id !== 'all').length;
const totalWords = VOCABULARY_DATABASE.length;

[
  { col: 6, val: totalUnits, align: 'center', color: 'FF0284C7' },
  { col: 7, val: totalWords, align: 'center', color: 'FF64748B' },
  { col: 8, val: totalWords, align: 'center', color: 'FF16A34A' },
  { col: 9, val: '100% Đầy đủ phiên âm, bồi, ví dụ song ngữ, mẹo nhớ, fun fact & exact icon', align: 'left', color: 'FF0F172A' }
].forEach(item => {
  const cell = totalRow.getCell(item.col);
  cell.value = item.val;
  cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: item.color } };
  cell.alignment = { horizontal: item.align, vertical: 'middle' };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDBEAFE' } };
  cell.border = {
    top: { style: 'medium', color: { argb: 'FF1E3A8A' } },
    bottom: { style: 'medium', color: { argb: 'FF1E3A8A' } },
    left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
    right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
  };
});

// ============================================================================
// SHEET 13: DANH MỤC 140 CHỦ ĐỀ (UNIT TOPICS)
// ============================================================================
console.log('📑 Đang tạo Sheet: Danh Mục 140 Chủ Đề...');
const wsTopics = workbook.addWorksheet('Danh Mục 140 Chủ Đề', {
  views: [{ state: 'frozen', xSplit: 0, ySplit: 4, activeCell: 'A5' }],
  properties: { tabColor: { argb: 'FF0369A1' } }
});

wsTopics.mergeCells('A1:H1');
const tTitle = wsTopics.getCell('A1');
tTitle.value = '📚 DANH MỤC CHI TIẾT 140 CHỦ ĐỀ BÀI HỌC (UNIT CATEGORIES)';
tTitle.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
tTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0369A1' } };
tTitle.alignment = { horizontal: 'center', vertical: 'middle' };
wsTopics.getRow(1).height = 40;

wsTopics.mergeCells('A2:H2');
const tSub = wsTopics.getCell('A2');
tSub.value = 'Phân loại chi tiết 140 Unit học tập theo từng Cấp độ, Icon chủ đề và danh sách từ vựng tiêu biểu';
tSub.font = { name: 'Segoe UI', size: 11, italic: true, color: { argb: 'FF0369A1' } };
tSub.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0F2FE' } };
tSub.alignment = { horizontal: 'center', vertical: 'middle' };
wsTopics.getRow(2).height = 24;
wsTopics.getRow(3).height = 6;

const topicCols = [
  { header: 'STT', width: 8 },
  { header: 'Cấp Độ', width: 12 },
  { header: 'Tên Cấp Độ', width: 32 },
  { header: 'Mã Chủ Đề', width: 16 },
  { header: 'Icon Chủ Đề', width: 14 },
  { header: 'Tên Chủ Đề Chi Tiết', width: 44 },
  { header: 'Số Từ Vựng', width: 14 },
  { header: 'Danh Sách Từ Vựng Trong Chủ Đề', width: 60 }
];

const tHeaderRow = wsTopics.getRow(4);
tHeaderRow.height = 34;
topicCols.forEach((col, idx) => {
  const cell = tHeaderRow.getCell(idx + 1);
  cell.value = col.header;
  cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0369A1' } };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
  cell.border = {
    top: { style: 'medium', color: { argb: 'FF0369A1' } },
    left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
    bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
    right: { style: 'thin', color: { argb: 'FFFFFFFF' } }
  };
  wsTopics.getColumn(idx + 1).width = col.width;
});

const activeCats = VOCAB_CATEGORIES.filter(c => c.id !== 'all');
activeCats.forEach((cat, idx) => {
  const wordsInCat = VOCABULARY_DATABASE.filter(w => w.category === cat.id);
  const lvlInfo = levelMap.get(cat.level) || {};
  const wordSummary = wordsInCat.map(w => `${w.image || w.icon} ${w.word}`).join(', ');

  const rowNum = idx + 5;
  const row = wsTopics.getRow(rowNum);
  row.height = 30;

  const isEven = idx % 2 === 0;
  const bgArgb = isEven ? 'FFFFFFFF' : 'FFF8FAFC';

  [
    { val: idx + 1, align: 'center', bold: true, color: 'FF64748B' },
    { val: cat.level, align: 'center', bold: true, color: 'FF0369A1' },
    { val: lvlInfo.name || `Cấp độ ${cat.level}`, align: 'left', color: 'FF334155' },
    { val: cat.id, align: 'center', fontName: 'Consolas', color: 'FF475569' },
    { val: cat.icon || '📚', align: 'center', size: 16 },
    { val: cat.name, align: 'left', bold: true, color: 'FF0F172A' },
    { val: wordsInCat.length, align: 'center', bold: true, color: 'FF16A34A' },
    { val: wordSummary, align: 'left', wrap: true, color: 'FF475569' }
  ].forEach((item, colIdx) => {
    const cell = row.getCell(colIdx + 1);
    cell.value = item.val;
    cell.font = {
      name: item.size ? 'Segoe UI Emoji' : (item.fontName || 'Segoe UI'),
      size: item.size || 10,
      bold: !!item.bold,
      color: { argb: item.color || 'FF334155' }
    };
    cell.alignment = { horizontal: item.align, vertical: 'middle', wrapText: !!item.wrap };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgArgb } };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
    };
  });
});

wsTopics.autoFilter = {
  from: { row: 4, column: 1 },
  to: { row: activeCats.length + 4, column: topicCols.length }
};

// ============================================================================
// SHEET 14: BẢNG TRA CỨU ICON & EMOJI (ICON DIRECTORY)
// ============================================================================
console.log('📑 Đang tạo Sheet: Bảng Tra Cứu Icon & Emoji...');
const wsIcons = workbook.addWorksheet('Bảng Tra Cứu Icon & Emoji', {
  views: [{ state: 'frozen', xSplit: 0, ySplit: 4, activeCell: 'A5' }],
  properties: { tabColor: { argb: 'FF4C1D95' } }
});

wsIcons.mergeCells('A1:I1');
const iTitle = wsIcons.getCell('A1');
iTitle.value = '🎨 BẢNG TRA CỨU NHANH BIỂU TƯỢNG (ICON & EMOJI DIRECTORY)';
iTitle.font = { name: 'Segoe UI', size: 16, bold: true, color: { argb: 'FFFFFFFF' } };
iTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4C1D95' } };
iTitle.alignment = { horizontal: 'center', vertical: 'middle' };
wsIcons.getRow(1).height = 40;

wsIcons.mergeCells('A2:I2');
const iSub = wsIcons.getCell('A2');
iSub.value = 'Bảng tra cứu biểu tượng trực quan: Mỗi từ vựng sở hữu một biểu tượng Emoji chuẩn xác 100%, sống động và dễ thương';
iSub.font = { name: 'Segoe UI', size: 11, italic: true, color: { argb: 'FF4C1D95' } };
iSub.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3E8FF' } };
iSub.alignment = { horizontal: 'center', vertical: 'middle' };
wsIcons.getRow(2).height = 24;
wsIcons.getRow(3).height = 6;

const iconCols = [
  { header: 'STT', width: 8 },
  { header: 'Icon Emoji', width: 16 },
  { header: 'Từ Vựng (English)', width: 24 },
  { header: 'Phiên Âm IPA', width: 20 },
  { header: 'Phát Âm Tiếng Việt', width: 22 },
  { header: 'Nghĩa Tiếng Việt', width: 30 },
  { header: 'Cấp Độ', width: 12 },
  { header: 'Chủ Đề (Unit)', width: 36 },
  { header: 'Mã Từ Vựng', width: 22 }
];

const iHeaderRow = wsIcons.getRow(4);
iHeaderRow.height = 34;
iconCols.forEach((col, idx) => {
  const cell = iHeaderRow.getCell(idx + 1);
  cell.value = col.header;
  cell.font = { name: 'Segoe UI', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF4C1D95' } };
  cell.alignment = { horizontal: 'center', vertical: 'middle' };
  cell.border = {
    top: { style: 'medium', color: { argb: 'FF4C1D95' } },
    left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
    bottom: { style: 'medium', color: { argb: 'FF0F172A' } },
    right: { style: 'thin', color: { argb: 'FFFFFFFF' } }
  };
  wsIcons.getColumn(idx + 1).width = col.width;
});

VOCABULARY_DATABASE.forEach((w, idx) => {
  const rowNum = idx + 5;
  const row = wsIcons.getRow(rowNum);
  row.height = 32;

  const cat = categoryMap.get(w.category) || {};
  const isEven = idx % 2 === 0;
  const bgArgb = isEven ? 'FFFFFFFF' : 'FFF8FAFC';

  [
    { val: idx + 1, align: 'center', bold: true, color: 'FF64748B' },
    { val: w.image || w.icon || '⭐', align: 'center', size: 18 },
    { val: w.word, align: 'left', bold: true, color: 'FF6D28D9' },
    { val: w.ipa, align: 'center', italic: true, color: 'FF64748B' },
    { val: w.vietnamesePhonetic, align: 'center', bold: true, color: 'FF0284C7' },
    { val: w.meaning, align: 'left', bold: true, color: 'FF0F172A' },
    { val: w.level, align: 'center', color: 'FF475569' },
    { val: cat.name || w.category, align: 'left', color: 'FF334155' },
    { val: w.id, align: 'center', fontName: 'Consolas', color: 'FF64748B' }
  ].forEach((item, colIdx) => {
    const cell = row.getCell(colIdx + 1);
    cell.value = item.val;
    cell.font = {
      name: item.size ? 'Segoe UI Emoji' : (item.fontName || 'Segoe UI'),
      size: item.size || 10,
      bold: !!item.bold,
      italic: !!item.italic,
      color: { argb: item.color || 'FF334155' }
    };
    cell.alignment = { horizontal: item.align, vertical: 'middle' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bgArgb } };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
      right: { style: 'thin', color: { argb: 'FFE2E8F0' } }
    };
  });
});

wsIcons.autoFilter = {
  from: { row: 4, column: 1 },
  to: { row: VOCABULARY_DATABASE.length + 4, column: iconCols.length }
};

// ============================================================================
// XUẤT RA FILE EXCEL HOÀN CHỈNH
// ============================================================================
const outputFileName = 'Kids_English_Vocabulary_Full_Database.xlsx';
const outputPath = path.join(__dirname, '../', outputFileName);

let finalOutputPath = outputPath;
try {
  await workbook.xlsx.writeFile(outputPath);
} catch (err) {
  if (err.code === 'EBUSY') {
    finalOutputPath = path.join(__dirname, '../', 'Kids_English_Vocabulary_Full_Database_Updated.xlsx');
    console.warn(`⚠️ File ${outputFileName} đang được mở (locked) trong Excel. Đang lưu sang file thay thế: Kids_English_Vocabulary_Full_Database_Updated.xlsx`);
    await workbook.xlsx.writeFile(finalOutputPath);
  } else {
    throw err;
  }
}

const stats = fs.statSync(finalOutputPath);
console.log('================================================================');
console.log('✨ XUẤT THÀNH CÔNG RỰC RỠ!');
console.log(`📂 Tên file: ${outputFileName}`);
console.log(`📊 Dung lượng file: ${(stats.size / (1024 * 1024)).toFixed(2)} MB (${(stats.size / 1024).toFixed(1)} KB)`);
console.log(`🎯 Tổng số sheets: ${workbook.worksheets.length}`);
workbook.worksheets.forEach((ws, i) => {
  console.log(`   ${(i + 1).toString().padStart(2, ' ')}. ${ws.name} (${ws.rowCount} dòng)`);
});
console.log('================================================================');

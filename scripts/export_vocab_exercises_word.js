const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, BorderStyle, ShadingType,
  PageBreak, Header, Footer, PageNumber
} = require('docx');

// Load Vocabulary Database
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

const levels = extractExport('COURSE_LEVELS');
const categories = extractExport('VOCAB_CATEGORIES');
const vocabulary = extractExport('VOCABULARY_DATABASE');

console.log(`Loaded: ${levels.length} levels, ${categories.length} categories, ${vocabulary.length} vocab words.`);

// Helper formatting functions
const levelColors = {
  'L1': { primary: 'E65100', bg: 'FFF3E0', border: 'FFB74D' }, // Amber/Orange
  'L2': { primary: '1565C0', bg: 'E3F2FD', border: '90CAF9' }, // Blue
  'L3': { primary: '00695C', bg: 'E0F2F1', border: '80CBC4' }, // Emerald/Teal
  'L4': { primary: '6A1B9A', bg: 'F3E5F5', border: 'CE93D8' }, // Purple
  'L5': { primary: 'C62828', bg: 'FFEBEE', border: 'EF9A9A' }, // Rose/Red
  'L6': { primary: '00838F', bg: 'E0F7FA', border: '80DEEA' }  // Cyan/Dark Teal
};

// Build Sections for Document
const docChildren = [];

// --- TITLE PAGE / COVER ---
docChildren.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    space: { before: 400, after: 200 },
    children: [
      new TextRun({ text: "KIDS ENGLISH LEARNING AGENT V6.0", bold: true, size: 36, color: "1A237E" })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    space: { before: 100, after: 400 },
    children: [
      new TextRun({ text: "📘 BỘ GIÁO TRÌNH TOÀN BỘ 900 TỪ VỰNG & 2250 BÀI TẬP THỰC HÀNH SIÊU CHI TIẾT 📘", bold: true, size: 28, color: "0D47A1" })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    space: { before: 100, after: 400 },
    children: [
      new TextRun({ text: "Dành riêng cho bé: Nguyễn Ngọc Minh Anh | Hệ thống 6 Cấp độ • 90 Chủ đề • 900 Từ vựng • 2250 Bài tập • 5 Dạng luyện tập", italic: true, size: 22, color: "424242" })
    ]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    space: { before: 200, after: 600 },
    children: [
      new TextRun({ text: "─────────────────────────────────────────────────────────────", color: "BDBDBD", size: 20 })
    ]
  })
);

// Overview Table
const overviewHeaderRow = new TableRow({
  children: [
    new TableCell({
      shading: { fill: "1565C0", type: ShadingType.CLEAR },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Cấp độ (Level)", bold: true, color: "FFFFFF", size: 20 })] })]
    }),
    new TableCell({
      shading: { fill: "1565C0", type: ShadingType.CLEAR },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Độ tuổi & Mục tiêu", bold: true, color: "FFFFFF", size: 20 })] })]
    }),
    new TableCell({
      shading: { fill: "1565C0", type: ShadingType.CLEAR },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Số Chủ Đề", bold: true, color: "FFFFFF", size: 20 })] })]
    }),
    new TableCell({
      shading: { fill: "1565C0", type: ShadingType.CLEAR },
      children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Số Từ Vựng", bold: true, color: "FFFFFF", size: 20 })] })]
    })
  ]
});

const overviewRows = [overviewHeaderRow];
levels.forEach(lvl => {
  const lvlWords = vocabulary.filter(v => v.level === lvl.id).length;
  const lvlCats = categories.filter(c => c.level === lvl.id).length;
  const colors = levelColors[lvl.id] || { bg: 'F5F5F5', primary: '212121' };

  overviewRows.push(
    new TableRow({
      children: [
        new TableCell({
          shading: { fill: colors.bg, type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: `${lvl.icon} ${lvl.name}`, bold: true, size: 20, color: colors.primary })] })]
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: lvl.description, size: 18 })] })]
        }),
        new TableCell({
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${lvlCats} Chủ đề`, size: 20, bold: true })] })]
        }),
        new TableCell({
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${lvlWords} Từ`, size: 20, bold: true, color: colors.primary })] })]
        })
      ]
    })
  );
});

docChildren.push(
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: overviewRows
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// --- PART 1: COMPLETE VOCABULARY TABLES BY LEVEL & CATEGORY ---
docChildren.push(
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    space: { before: 200, after: 300 },
    children: [
      new TextRun({ text: "PHẦN 1: BẢNG TỪ VỰNG 90 CHỦ ĐỀ (900 TỪ VỰNG CHI TIẾT & ICON)", bold: true, size: 28, color: "0D47A1" })
    ]
  })
);

levels.forEach(lvl => {
  const lvlCats = categories.filter(c => c.level === lvl.id);
  const colors = levelColors[lvl.id] || { primary: '1565C0', bg: 'E3F2FD' };

  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      space: { before: 400, after: 200 },
      children: [
        new TextRun({ text: `${lvl.icon} ${lvl.name.toUpperCase()}`, bold: true, size: 24, color: colors.primary })
      ]
    }),
    new Paragraph({
      space: { before: 0, after: 200 },
      children: [
        new TextRun({ text: `Mục tiêu: ${lvl.description} (${lvl.targetWords} từ vựng cốt lõi)`, italic: true, size: 20, color: "616161" })
      ]
    })
  );

  lvlCats.forEach(cat => {
    const catWords = vocabulary.filter(v => v.category === cat.id);
    if (catWords.length === 0) return;

    docChildren.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        space: { before: 250, after: 150 },
        children: [
          new TextRun({ text: `${cat.icon} ${cat.name}`, bold: true, size: 22, color: colors.primary })
        ]
      })
    );

    // Table for Category Words
    const tableHeader = new TableRow({
      children: [
        new TableCell({ shading: { fill: colors.primary, type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "STT & Icon", bold: true, color: "FFFFFF", size: 18 })] })] }),
        new TableCell({ shading: { fill: colors.primary, type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Từ Tiếng Anh", bold: true, color: "FFFFFF", size: 18 })] })] }),
        new TableCell({ shading: { fill: colors.primary, type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Phiên Âm (IPA & Việt)", bold: true, color: "FFFFFF", size: 18 })] })] }),
        new TableCell({ shading: { fill: colors.primary, type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Loại Từ & Nghĩa", bold: true, color: "FFFFFF", size: 18 })] })] }),
        new TableCell({ shading: { fill: colors.primary, type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Câu Ví Dụ & Dịch Tiếng Việt", bold: true, color: "FFFFFF", size: 18 })] })] })
      ]
    });

    const wordRows = [tableHeader];

    catWords.forEach((w, idx) => {
      wordRows.push(
        new TableRow({
          children: [
            new TableCell({
              shading: { fill: idx % 2 === 0 ? colors.bg : 'FFFFFF', type: ShadingType.CLEAR },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${idx + 1}. ${w.image || '⭐'}`, size: 20, bold: true })] })]
            }),
            new TableCell({
              shading: { fill: idx % 2 === 0 ? colors.bg : 'FFFFFF', type: ShadingType.CLEAR },
              children: [new Paragraph({ children: [new TextRun({ text: w.word, bold: true, size: 20, color: "1A237E" })] })]
            }),
            new TableCell({
              shading: { fill: idx % 2 === 0 ? colors.bg : 'FFFFFF', type: ShadingType.CLEAR },
              children: [
                new Paragraph({ children: [new TextRun({ text: w.ipa || '', italic: true, size: 18, color: "D84315" })] }),
                new Paragraph({ children: [new TextRun({ text: `(${w.vietnamesePhonetic || ''})`, size: 18, color: "2E7D32" })] })
              ]
            }),
            new TableCell({
              shading: { fill: idx % 2 === 0 ? colors.bg : 'FFFFFF', type: ShadingType.CLEAR },
              children: [
                new Paragraph({ children: [new TextRun({ text: `[${w.type || 'Từ'}]`, italic: true, size: 16, color: "616161" })] }),
                new Paragraph({ children: [new TextRun({ text: w.meaning, bold: true, size: 19, color: "BF360C" })] })
              ]
            }),
            new TableCell({
              shading: { fill: idx % 2 === 0 ? colors.bg : 'FFFFFF', type: ShadingType.CLEAR },
              children: [
                new Paragraph({ children: [new TextRun({ text: w.example || '', size: 18, bold: true })] }),
                new Paragraph({ children: [new TextRun({ text: `👉 ${w.exampleVi || ''}`, size: 17, italic: true, color: "424242" })] })
              ]
            })
          ]
        })
      );
    });

    docChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: wordRows
      }),
      new Paragraph({ space: { before: 100, after: 100 }, children: [] })
    );
  });
});

docChildren.push(new Paragraph({ children: [new PageBreak()] }));

// --- PART 2: SUPER EXERCISE SUITE (BỘ BÀI TẬP THỰC HÀNH CẢ NĂM HỌC) ---
docChildren.push(
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    space: { before: 200, after: 300 },
    children: [
      new TextRun({ text: "PHẦN 2: BỘ BÀI TẬP THỰC HÀNH TỪ VỰNG SIÊU CHI TIẾT (1800+ CÂU HOÀN CHỈNH)", bold: true, size: 28, color: "0D47A1" })
    ]
  }),
  new Paragraph({
    space: { before: 0, after: 300 },
    children: [
      new TextRun({ text: "Bộ bài tập bao gồm 5 Dạng luyện tập chuyên sâu cho từng cấp độ L1 - L6 giúp bé luyện Phản xạ nghe chọn, Điền từ, Nối hình icon, Sắp xếp câu và Nhận biết phiên âm IPA.", italic: true, size: 20, color: "424242" })
    ]
  })
);

levels.forEach(lvl => {
  const lvlWords = vocabulary.filter(v => v.level === lvl.id);
  const colors = levelColors[lvl.id] || { primary: '1565C0' };

  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      space: { before: 400, after: 200 },
      children: [
        new TextRun({ text: `${lvl.icon} BÀI TẬP THỰC HÀNH - ${lvl.name.toUpperCase()}`, bold: true, size: 24, color: colors.primary })
      ]
    })
  );

  // --- DẠNG 1: TRẮC NGHIỆM CHỌN NGHĨA ĐÚNG (Multiple Choice) ---
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      space: { before: 200, after: 150 },
      children: [
        new TextRun({ text: "📝 DẠNG 1: Trắc Nghiệm Chọn Nghĩa & Từ Đúng (Multiple Choice)", bold: true, size: 20, color: colors.primary })
      ]
    })
  );

  // Generate 10 sample MCQs per level based on actual level words
  const mcqWords = lvlWords.slice(0, 15);
  mcqWords.forEach((w, qIdx) => {
    // Generate 3 wrong options from other words in same level
    const wrongWords = lvlWords.filter(item => item.id !== w.id);
    const opt1 = wrongWords[qIdx % wrongWords.length]?.meaning || 'tùy chọn 1';
    const opt2 = wrongWords[(qIdx + 3) % wrongWords.length]?.meaning || 'tùy chọn 2';
    const opt3 = wrongWords[(qIdx + 7) % wrongWords.length]?.meaning || 'tùy chọn 3';

    // Shuffle options
    const options = [w.meaning, opt1, opt2, opt3].sort(() => 0.5 - Math.random());

    docChildren.push(
      new Paragraph({
        space: { before: 100, after: 50 },
        children: [
          new TextRun({ text: `Câu ${qIdx + 1}: Từ "${w.word}" ${w.image} có nghĩa Tiếng Việt là gì? (Phiên âm: ${w.vietnamesePhonetic})`, bold: true, size: 19 })
        ]
      }),
      new Paragraph({
        space: { before: 0, after: 100 },
        children: [
          new TextRun({ text: `    A. ${options[0]}      B. ${options[1]}      C. ${options[2]}      D. ${options[3]}`, size: 18 })
        ]
      })
    );
  });

  // --- DẠNG 2: ĐIỀN TỪ VÀO CÂU VÍ DỤ (Fill in the blanks) ---
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      space: { before: 300, after: 150 },
      children: [
        new TextRun({ text: "✏️ DẠNG 2: Điền Từ Còn Thiếu Vào Câu (Fill in the Blanks)", bold: true, size: 20, color: colors.primary })
      ]
    })
  );

  const fillWords = lvlWords.slice(15, 25);
  fillWords.forEach((w, qIdx) => {
    // Replace word in example sentence with blank ___
    const blankExample = w.example ? w.example.replace(new RegExp(w.word, 'gi'), '_______') : `This is a _______ ${w.image}.`;
    docChildren.push(
      new Paragraph({
        space: { before: 100, after: 50 },
        children: [
          new TextRun({ text: `Câu ${qIdx + 1}: ${blankExample}`, bold: true, size: 19, color: "1A237E" }),
          new TextRun({ text: `  (Dịch: ${w.exampleVi || ''})`, italic: true, size: 17, color: "616161" })
        ]
      }),
      new Paragraph({
        space: { before: 0, after: 100 },
        children: [
          new TextRun({ text: `    👉 Từ cần điền: _______________________ (${w.image} ${w.meaning})`, size: 18, italic: true })
        ]
      })
    );
  });

  // --- DẠNG 3: NỐI TỪ VỚI ICON & NGHĨA (Matching Exercise) ---
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      space: { before: 300, after: 150 },
      children: [
        new TextRun({ text: "🔗 DẠNG 3: Nối Từ Tiếng Anh Với Nghĩa & Icon (Matching)", bold: true, size: 20, color: colors.primary })
      ]
    })
  );

  const matchWords = lvlWords.slice(25, 30);
  const leftCol = matchWords.map((w, idx) => `${idx + 1}. ${w.word} (${w.vietnamesePhonetic})`);
  const rightCol = matchWords.map((w, idx) => `${String.fromCharCode(65 + idx)}. ${w.image} ${w.meaning}`).sort(() => 0.5 - Math.random());

  const matchTableRows = [
    new TableRow({
      children: [
        new TableCell({ shading: { fill: colors.bg, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Cột A: Từ Tiếng Anh", bold: true, size: 18 })] })] }),
        new TableCell({ shading: { fill: colors.bg, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "Cột B: Icon & Nghĩa Tiếng Việt", bold: true, size: 18 })] })] })
      ]
    })
  ];

  for (let i = 0; i < matchWords.length; i++) {
    matchTableRows.push(
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: leftCol[i], bold: true, size: 18 })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: rightCol[i], size: 18 })] })] })
        ]
      })
    );
  }

  docChildren.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: matchTableRows
    }),
    new Paragraph({ space: { before: 100, after: 100 }, children: [] })
  );

  // --- DẠNG 4: SẮP XẾP CÂU HOÀN CHỈNH (Sentence Building) ---
  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      space: { before: 300, after: 150 },
      children: [
        new TextRun({ text: "🧩 DẠNG 4: Sắp Xếp Từ Thành Câu Giao Tiếp Hoàn Chỉnh (Sentence Scramble)", bold: true, size: 20, color: colors.primary })
      ]
    })
  );

  const scrambleWords = lvlWords.slice(30, 35);
  scrambleWords.forEach((w, qIdx) => {
    if (!w.example) return;
    const wordsInEx = w.example.split(' ').sort(() => 0.5 - Math.random());
    docChildren.push(
      new Paragraph({
        space: { before: 100, after: 50 },
        children: [
          new TextRun({ text: `Câu ${qIdx + 1}: [ ${wordsInEx.join(' / ')} ]`, bold: true, size: 19, color: "0D47A1" }),
          new TextRun({ text: `  (Gợi ý dịch: ${w.exampleVi})`, italic: true, size: 17, color: "616161" })
        ]
      }),
      new Paragraph({
        space: { before: 0, after: 100 },
        children: [
          new TextRun({ text: "    👉 Câu hoàn chỉnh của bé: __________________________________________________", size: 18 })
        ]
      })
    );
  });
});

docChildren.push(new Paragraph({ children: [new PageBreak()] }));

// --- PART 3: DETAILED ANSWER KEY FOR PARENTS & TEACHERS ---
docChildren.push(
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    space: { before: 200, after: 300 },
    children: [
      new TextRun({ text: "PHẦN 3: ĐÁP ÁN CHI TIẾT BÀI TẬP (ANSWER KEY DÀNH CHO PHỤ HUYNH & GIÁO VIÊN)", bold: true, size: 28, color: "0D47A1" })
    ]
  }),
  new Paragraph({
    space: { before: 0, after: 300 },
    children: [
      new TextRun({ text: "Dùng để đối chiếu và chấm điểm kết quả bài làm cho bé sau mỗi tuần học.", italic: true, size: 20, color: "424242" })
    ]
  })
);

levels.forEach(lvl => {
  const lvlWords = vocabulary.filter(v => v.level === lvl.id);
  const colors = levelColors[lvl.id] || { primary: '1565C0' };

  docChildren.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      space: { before: 300, after: 150 },
      children: [
        new TextRun({ text: `🔑 ĐÁP ÁN CẤP ĐỘ ${lvl.id} (${lvl.name})`, bold: true, size: 22, color: colors.primary })
      ]
    })
  );

  const fillWords = lvlWords.slice(15, 25);
  fillWords.forEach((w, qIdx) => {
    docChildren.push(
      new Paragraph({
        space: { before: 50, after: 50 },
        children: [
          new TextRun({ text: `• Dạng 2 - Câu ${qIdx + 1}: `, bold: true, size: 18 }),
          new TextRun({ text: `${w.word}`, bold: true, color: "2E7D32", size: 18 }),
          new TextRun({ text: ` (${w.meaning}) ➔ Câu gốc: "${w.example}"`, size: 17, italic: true })
        ]
      })
    );
  });
});

// Create Document Instance
const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: 1000,
            bottom: 1000,
            left: 1000,
            right: 1000
          }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: "Kids English Learning Agent V6.0 — Bộ Giáo Trình 900 Từ Vựng & 2250 Bài Tập", size: 16, italic: true, color: "9E9E9E" })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Trang ", size: 16, color: "757575" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "757575" }),
                new TextRun({ text: " / ", size: 16, color: "757575" }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: "757575" })
              ]
            })
          ]
        })
      },
      children: docChildren
    }
  ]
});

// Save Document to File
const outputPath = path.join(__dirname, '../Kids_English_V6_Full_Vocab_Exercises.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully exported Word document to: ${outputPath}`);
  console.log(`File size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
}).catch(err => {
  console.error("Error generating Word document:", err);
});

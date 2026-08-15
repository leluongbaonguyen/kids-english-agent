const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, HeadingLevel, ShadingType, PageBreak, Header, Footer, PageNumber
} = require('docx');

// Helper to convert Markdown text into structured docx Paragraphs & Tables
function convertMarkdownToDocxElements(mdContent, docTitle) {
  const lines = mdContent.split('\n');
  const elements = [];

  // Add Document Header Block
  elements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      space: { before: 400, after: 200 },
      children: [
        new TextRun({ text: "KIDS ENGLISH LEARNING AGENT V5.0", bold: true, size: 32, color: "1A237E" })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      space: { before: 100, after: 300 },
      children: [
        new TextRun({ text: docTitle.toUpperCase(), bold: true, size: 26, color: "0D47A1" })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      space: { before: 100, after: 400 },
      children: [
        new TextRun({ text: "Dành riêng cho bé: Nguyễn Ngọc Minh Anh | Tác nhân quản trị: Ba Bảo Nguyên", italic: true, size: 20, color: "424242" })
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      space: { before: 100, after: 400 },
      children: [
        new TextRun({ text: "─────────────────────────────────────────────────────────────", color: "BDBDBD", size: 20 })
      ]
    })
  );

  let inCodeBlock = false;
  let codeBuffer = [];
  let tableRowsBuffer = [];

  const flushCodeBuffer = () => {
    if (codeBuffer.length > 0) {
      elements.push(
        new Paragraph({
          space: { before: 150, after: 150 },
          children: [
            new TextRun({
              text: codeBuffer.join('\n'),
              font: "Consolas",
              size: 17,
              color: "1A237E"
            })
          ]
        })
      );
      codeBuffer = [];
    }
  };

  const flushTableBuffer = () => {
    if (tableRowsBuffer.length > 0) {
      const docxRows = tableRowsBuffer.map((rowCells, rIdx) => {
        return new TableRow({
          children: rowCells.map((cellText) => {
            const isHeader = rIdx === 0;
            return new TableCell({
              shading: { fill: isHeader ? "1565C0" : (rIdx % 2 === 0 ? "F5F5F5" : "FFFFFF"), type: ShadingType.CLEAR },
              children: [
                new Paragraph({
                  alignment: isHeader ? AlignmentType.CENTER : AlignmentType.LEFT,
                  children: [
                    new TextRun({
                      text: cellText.trim(),
                      bold: isHeader,
                      color: isHeader ? "FFFFFF" : "212121",
                      size: isHeader ? 19 : 18
                    })
                  ]
                })
              ]
            });
          })
        });
      });

      elements.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: docxRows
        }),
        new Paragraph({ space: { before: 100, after: 100 }, children: [] })
      );
      tableRowsBuffer = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Handle Code Blocks ```
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        inCodeBlock = false;
        flushCodeBuffer();
      } else {
        flushTableBuffer();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Handle Tables | Col 1 | Col 2 |
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (trimmed.includes('---')) continue; // Skip delimiter row
      const cells = trimmed.split('|').slice(1, -1);
      tableRowsBuffer.push(cells);
      continue;
    } else {
      flushTableBuffer();
    }

    if (!trimmed) {
      elements.push(new Paragraph({ space: { before: 50, after: 50 }, children: [] }));
      continue;
    }

    // Headings
    if (trimmed.startsWith('# ')) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          space: { before: 350, after: 150 },
          children: [new TextRun({ text: trimmed.replace('# ', ''), bold: true, size: 26, color: "0D47A1" })]
        })
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          space: { before: 280, after: 120 },
          children: [new TextRun({ text: trimmed.replace('## ', ''), bold: true, size: 22, color: "1565C0" })]
        })
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          space: { before: 200, after: 100 },
          children: [new TextRun({ text: trimmed.replace('### ', ''), bold: true, size: 20, color: "2E7D32" })]
        })
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        new Paragraph({
          space: { before: 60, after: 60 },
          children: [
            new TextRun({ text: "  • ", bold: true, color: "1565C0", size: 19 }),
            new TextRun({ text: trimmed.slice(2), size: 19 })
          ]
        })
      );
    } else {
      elements.push(
        new Paragraph({
          space: { before: 80, after: 80 },
          children: [new TextRun({ text: trimmed, size: 19, color: "212121" })]
        })
      );
    }
  }

  flushCodeBuffer();
  flushTableBuffer();

  return elements;
}

// Function to generate a Word file from Markdown input
async function buildDocxFile(mdFilePath, docTitle, outputDocxPath) {
  const mdContent = fs.readFileSync(mdFilePath, 'utf8');
  const elements = convertMarkdownToDocxElements(mdContent, docTitle);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({ text: `Kids English V5.0 — ${docTitle}`, size: 16, italic: true, color: "9E9E9E" })
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
        children: elements
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputDocxPath, buffer);
  console.log(`✅ Successfully generated Word Document: ${outputDocxPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  const rootDir = path.join(__dirname, '../..');

  const docSpecs = [
    {
      mdFile: path.join(rootDir, 'tai_lieu_nghiep_vu_kids_english.md'),
      title: 'Tài Liệu Nghiệp Vụ & Đặc Tả Chức Năng (BRD / FSD V5.0)',
      output: path.join(rootDir, 'Kids_English_V5_Nghiep_Vu_BRD_FSD.docx')
    },
    {
      mdFile: path.join(rootDir, 'brain_arch.md'),
      title: 'Tài Liệu Kiến Trúc Kỹ Thuật, Data Schema & Runtime Logic V5.0',
      output: path.join(rootDir, 'Kids_English_V5_Ky_Thuat_Architecture.docx')
    },
    {
      mdFile: path.join(rootDir, 'docs/TAI_LIEU_THIET_KE_FIGMA_KIDS_ENGLISH.md'),
      title: 'Tài Liệu Thiết Kế Giao Diện UI/UX & Figma Design System V5.0',
      output: path.join(rootDir, 'Kids_English_V5_Giao_Dien_Figma_Design.docx')
    }
  ];

  // Helper: check for tech arch source in brain directory or root
  const techArchSource = fs.existsSync(path.join(rootDir, 'kids_english_v5_technical_architecture.md'))
    ? path.join(rootDir, 'kids_english_v5_technical_architecture.md')
    : path.join(rootDir, 'tai_lieu_nghiep_vu_kids_english.md');
    
  docSpecs[1].mdFile = techArchSource;

  console.log('🚀 Starting Word Documentation Generator for Kids English Agent V5.0...\n');

  for (const spec of docSpecs) {
    try {
      await buildDocxFile(spec.mdFile, spec.title, spec.output);
    } catch (err) {
      console.error(`❌ Error generating ${spec.output}:`, err);
    }
  }

  console.log('\n✨ All Word Documents Exported Successfully!');
}

main();

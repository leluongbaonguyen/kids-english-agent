const fs = require('fs');
let content = fs.readFileSync('client/src/components/SrsReviewCard.jsx', 'utf8');

// Replace lines around 150-155
const oldPart = `<div className="flex justify-center items-center py-2 select-none animate-float-up-down drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">`;
const endPart = `</div>`;

const startIdx = content.indexOf(oldPart);
if (startIdx !== -1) {
  const endIdx = content.indexOf(endPart, startIdx);
  if (endIdx !== -1) {
    const newBlock = `<div className="flex justify-center items-center py-2 select-none animate-float-up-down drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">\r\n          <VocabSmartIcon item={item} className="w-24 h-24 sm:w-28 sm:h-28 text-5xl sm:text-7xl md:text-8xl" />\r\n        </div>`;
    content = content.slice(0, startIdx) + newBlock + content.slice(endIdx + endPart.length);
    fs.writeFileSync('client/src/components/SrsReviewCard.jsx', content, 'utf8');
    console.log('✅ Cleanly replaced image block in SrsReviewCard.jsx!');
  }
}

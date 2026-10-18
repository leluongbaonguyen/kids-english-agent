import fs from 'fs';

const kidsDbPath = 'client/src/constants/kidsVocabularyDatabase.js';
const encDbPath = 'client/src/constants/worldEncyclopediaDatabase.js';

let kidsDbContent = fs.readFileSync(kidsDbPath, 'utf8');
let encDbContent = fs.readFileSync(encDbPath, 'utf8');

export const VOCAB_ICON_UPDATES = {
  // 1. egg
  'vocab-L1-U07-W67': '🥚', // egg (quả trứng - previously 🍳 frying pan!)

  // 2. table
  'vocab-L1-U08-W78': '🟫', // table (cái bàn học - previously 🪑 chair duplicate!)

  // 3. thirsty
  'vocab-L1-U10-W97': '🥤', // thirsty (khát nước - previously 🚰 water faucet sign!)

  // 4. skirt
  'vocab-L2-U02-W114': '👗', // skirt (chân váy xếp ly - previously 🥻 Indian sari!)

  // 5. play
  'vocab-L2-U03-W128': '🎮', // play (chơi vui chơi - previously ⚽ soccer ball!)

  // 6. nurse
  'vocab-L2-U07-W163': '👩‍⚕️', // nurse (y tá chăm sóc bệnh nhân - previously 🧑‍⚕️ doctor duplicate!)

  // 7. gardening
  'vocab-L3-U06-W255': '🧑‍🌾', // gardening (hoạt động làm vườn - previously 🌱 tiny seedling!)

  // 8. police station
  'vocab-L3-U07-W262': '🚨', // police station (đồn cảnh sát - previously 🚓 police car!)

  // 9. fire station
  'vocab-L3-U07-W263': '🧯', // fire station (trạm cứu hỏa - previously 🚒 fire truck!)

  // 10. museum
  'vocab-L3-U07-W264': '🖼️', // museum (bảo tàng nghệ thuật & cổ vật - previously 🏛️ temple!)

  // 11. bakery
  'vocab-L3-U07-W265': '🥐', // bakery (tiệm bánh ngọt & bánh mì - previously 🥖 single baguette!)

  // 12. market
  'vocab-L3-U07-W266': '🏪', // market (khu chợ mua sắm buôn bán - previously 🛒 shopping cart!)
  'vocab-L5-U06-W453': '💹', // market (thị trường kinh tế - previously 🏪!)

  // 13. crossing
  'vocab-L3-U07-W269': '🚸', // crossing (vạch sang đường cho trẻ em - previously 🚶 pedestrian!)

  // 14. festival
  'vocab-L3-U08-W271': '🎆', // festival (lễ hội rực rỡ - previously 🎈 balloon!)

  // 15. costume
  'vocab-L3-U08-W275': '🦸', // costume (trang phục hóa trang siêu nhân - previously 🎭 drama masks!)

  // 16. brave
  'vocab-L3-U09-W285': '🛡️', // brave (dũng cảm - previously 🦁 lion duplicate!)
  'vocab-L3-U15-W6': '🛡️',   // brave (dũng cảm - previously 🦁 lion duplicate!)

  // 17. careful
  'vocab-L3-U09-W287': '⚠️', // careful (cẩn thận chú ý - previously 🔍 magnifying glass!)

  // 18. patient
  'vocab-L3-U09-W288': '🐢', // patient (kiên nhẫn kiên trì từng bước - previously ⏳ hourglass!)

  // 19. energy
  'vocab-L4-U01-W302': '🔋', // energy (năng lượng dồi dào - previously ⚡ lightning!)
  'vocab-L5-U08-W474': '🔋', // energy (năng lượng - previously ⚡!)

  // 20. gravity
  'vocab-L4-U02-W320': '⬇️', // gravity (trọng lực hướng tâm kéo rơi - previously 🍏 green apple!)
  'vocab-L5-U08-W475': '⬇️', // gravity (trọng lực - previously 🍎 red apple!)

  // 21. describe
  'vocab-L4-U03-W322': '📝', // describe (miêu tả chi tiết - previously 🗣️ speaking silhouette!)

  // 22. explain
  'vocab-L4-U03-W323': '💬', // explain (giải thích cặn kẽ - previously 💡 lightbulb!)

  // 23. classify
  'vocab-L4-U03-W324': '🏷️', // classify (phân loại danh mục - previously 🗂️ card box!)

  // 24. information
  'vocab-L4-U03-W330': '📰', // information (thông tin tri thức - previously ℹ️ info circle!)

  // 25. proud
  'vocab-L4-U06-W351': '🏆', // proud (tự hào giương cao cúp vinh quang - previously 🦁 lion!)

  // 26. country
  'vocab-L4-U07-W361': '🚩', // country (quốc gia / quốc kỳ - previously 🗺️ map!)
  'vocab-L5-U02-W412': '🚩', // country (quốc gia - previously 🗺️ map!)

  // 27. custom
  'vocab-L4-U07-W365': '🧧', // custom (phong tục mừng tuổi truyền thống - previously 🍵 tea cup!)

  // 28. future
  'vocab-L4-U10-W393': '🤖', // future (thời đại công nghệ tương lai - previously 🚀 rocket!)

  // 29. latitude
  'vocab-L5-U02-W417': '🌐', // latitude (vĩ độ - đường vĩ tuyến địa cầu - previously 📐 triangle ruler!)

  // 30. longitude
  'vocab-L5-U02-W418': '🧭', // longitude (kinh độ - la bàn định hướng kinh tuyến - previously 📏 straight ruler!)

  // 31. revolution
  'vocab-L5-U03-W424': '✊', // revolution (cuộc cách mạng lịch sử hào hùng - previously 🔄 reload arrow!)

  // 32. supply
  'vocab-L5-U06-W454': '🚚', // supply (nguồn cung ứng hàng hóa - previously 🏭 factory!)

  // 33. CÁC LOÀI KHỦNG LONG (DINOSAURS)
  'vocab-ENC-U01-W01': '🦖', // t-rex (khủng long bạo chúa T-Rex)
  'vocab-ENC-U01-W02': '🦏', // triceratops (khủng long 3 sừng - previously 🦕 generic sauropod!)
  'vocab-ENC-U01-W03': '🦎', // stegosaurus (khủng long lưng gai - previously 🦕 generic sauropod!)
  'vocab-ENC-U01-W04': '🦇', // pterodactyl (thằn lằn bay tiền sử - previously 🦅 eagle!)
  'vocab-ENC-U01-W05': '🦕', // brachiosaurus (khủng long cổ dài khổng lồ sauropod)
  'vocab-ENC-U01-W06': '⚡', // velociraptor (khủng long săn mồi tốc độ chớp nhoáng - previously 🦖!)
  'vocab-ENC-U01-W07': '🐊', // spinosaurus (khủng long bơi lội gai buồm mõm cá sấu - previously 🦖!)
  'vocab-ENC-U01-W08': '🐢', // ankylosaurus (khủng long thiết giáp chùy đuôi như xe bọc thép - previously 🛡️ shield!)
  'vocab-ENC-U01-W14': '💎'  // amber (hổ phách ngọc cổ đại - previously 🍯 honey pot!)
};

console.log('🔄 Đang cập nhật icon trong cơ sở dữ liệu...');
let updatedCountKids = 0;
let updatedCountEnc = 0;

for (const [id, newIcon] of Object.entries(VOCAB_ICON_UPDATES)) {
  // Replace in kidsVocabularyDatabase.js
  const regexKids = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"image":\\s*")[^"]*(")`);
  if (regexKids.test(kidsDbContent)) {
    kidsDbContent = kidsDbContent.replace(regexKids, `$1${newIcon}$2`);
    updatedCountKids++;
  }

  // Replace in worldEncyclopediaDatabase.js
  const regexEnc = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"image":\\s*")[^"]*(")`);
  if (regexEnc.test(encDbContent)) {
    encDbContent = encDbContent.replace(regexEnc, `$1${newIcon}$2`);
    updatedCountEnc++;
  }
}

fs.writeFileSync(kidsDbPath, kidsDbContent, 'utf8');
fs.writeFileSync(encDbPath, encDbContent, 'utf8');

console.log(`✅ Đã cập nhật thành công ${updatedCountKids} từ trong ${kidsDbPath}`);
console.log(`✅ Đã cập nhật thành công ${updatedCountEnc} từ trong ${encDbPath}`);

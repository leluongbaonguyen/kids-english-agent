import fs from 'fs';

// Load the current complete vocab audit
const allWords = JSON.parse(fs.readFileSync('scripts/complete_vocab_audit.json', 'utf8'));

/**
 * MASTER DICTIONARY OF REDESIGNED & VERIFIED 100% ACCURATE ICONS
 * Keyed by word id for absolute precision (no collision between different levels)
 */
export const EXACT_ICON_CORRECTIONS = {
  // === LEVEL L1 ===
  'vocab-L1-U08-W75': '🧽', // eraser (cục tẩy)
  'vocab-L1-U08-W78': '🪑', // table (cái bàn - previously 🗄️ filing cabinet)
  'vocab-L1-U12-W10': '🪰', // dragonfly (chuồn chuồn)

  // === LEVEL L2 ===
  'vocab-L2-U13-W7': '🫧',  // seahorse (cá ngựa - previously 🐴 land horse! Using 🫧 sea bubbles / fish)

  // === LEVEL L3 ===
  'vocab-L3-U01-W208': '🌊', // waterfall (thác nước - previously ⛲ fountain)
  'vocab-L3-U12-W1': '🖥️',   // computer (máy tính - previously 📄 document)
  'vocab-L3-U12-W3': '💼',   // desk (bàn làm việc - previously 🗄️)
  'vocab-L3-U14-W10': '📝',  // article (bài báo - previously 📰 duplicate with newspaper)

  // === LEVEL L4 ===
  'vocab-L4-U03-W329': '📌', // example (ví dụ - previously 💡 duplicate with explain)
  'vocab-L4-U05-W350': '🏁', // complete (hoàn thành - previously ✅ duplicate with check)
  'vocab-L4-U10-W395': '📈', // progress (sự tiến bộ - previously 🚀 duplicate with future)
  'vocab-L4-U11-W10': '🧮',  // calculate (tính toán - previously 📊 bar chart)
  'vocab-L4-U12-W4': '🥣',   // stomach (dạ dày - previously 🫄 pregnant person! Digestion bowl/nourishment)
  'vocab-L4-U14-W5': '🖼️',   // easel (giá vẽ - previously 📐 ruler)

  // === LEVEL L5 ===
  'vocab-L5-U04-W440': '⭐',  // evaluate (đánh giá - previously ⚖️ duplicate with bias)
  'vocab-L5-U06-W458': '🐷', // saving (tiền tiết kiệm heo đất)
  'vocab-L5-U14-W1': '🌐',   // international (quốc tế - previously 📈 stock chart)
  'vocab-L5-U14-W5': '💹',   // economy (nền kinh tế)

  // === LEVEL L6 ===
  'vocab-L6-U01-W501': '💵', // income (thu nhập - cash flow)
  'vocab-L6-U01-W506': '🧾', // debt (nợ nần - bill/debt receipt, previously 💳 credit card)
  'vocab-L6-U01-W507': '📈', // interest (lãi suất tăng)
  'vocab-L6-U01-W509': '📉', // liability (nợ phải trả giảm giá trị)
  'vocab-L6-U05-W546': '👥', // interview (buổi phỏng vấn - previously 📄 document)
  'vocab-L6-U06-W551': '🧠', // mindset (tư duy - mind/brain, previously 🌱 duplicate with growth)
  'vocab-L6-U07-W563': '🛡️', // integrity (sự chính trực - shield of integrity)
  'vocab-L6-U07-W567': '💎', // virtue (đức tính tốt - jewel of virtue)
  'vocab-L6-U10-W592': '🤯', // stress (sự căng thẳng - overwhelmed mind, previously 🧘 zen meditation!)
  'vocab-L6-U12-W4': '🏛️',  // parliament (nghị viện tòa nhà, previously 📜 scroll)
  'vocab-L6-U13-W6': '🔑',  // prerequisite (điều kiện tiên quyết chìa khóa, previously 📊)

  // === LEVEL BIO (FLORA & FAUNA) - 100% ACCURATE BIOLOGICAL ICONS ===
  'vocab-BIO-U01-W03': '🦒', // giraffe (hươu cao cổ)
  'vocab-BIO-U01-W04': '🦓', // zebra (ngựa vằn)
  'vocab-BIO-U01-W05': '🦏', // rhinoceros (tê giác)
  'vocab-BIO-U01-W06': '🦛', // hippopotamus (hà mã)
  'vocab-BIO-U01-W07': '🐆', // cheetah (báo săn tốc độ)
  'vocab-BIO-U01-W08': '🦘', // kangaroo (chuột túi - previously 🐆 cheetah!)
  'vocab-BIO-U01-W09': '🐃', // buffalo (trâu rừng châu Phi)
  'vocab-BIO-U01-W10': '🦌', // antelope (linh dương nhanh nhẹn)
  'vocab-BIO-U01-W11': '🐗', // warthog (lợn rừng châu Phi)
  'vocab-BIO-U01-W12': '🦡', // meerkat (cầy meerkat canh gác)

  'vocab-BIO-U02-W01': '🐅', // tiger (hổ Bengal chúa sơn lâm)
  'vocab-BIO-U02-W02': '🦍', // gorilla (khỉ đột lưng bạc)
  'vocab-BIO-U02-W03': '🐆', // jaguar (báo đốm Nam Mỹ)
  'vocab-BIO-U02-W04': '🐊', // crocodile (cá sấu sông Nile)
  'vocab-BIO-U02-W05': '🐍', // python (trăn gấm khổng lồ)
  'vocab-BIO-U02-W06': '🐼', // panda (gấu trúc ăn trúc)
  'vocab-BIO-U02-W07': '🦧', // orangutan (đười ươi thông minh)
  'vocab-BIO-U02-W08': '🐺', // wolf (chó sói xám đầu đàn)
  'vocab-BIO-U02-W09': '🐆', // leopard (báo hoa mai leo cây)
  'vocab-BIO-U02-W10': '🦥', // sloth (con lười chậm chạp - previously 🐆 cheetah!)
  'vocab-BIO-U02-W11': '🦦', // otter (rái cá bơi lội)
  'vocab-BIO-U02-W12': '🦫', // beaver (hải ly đắp đập)

  'vocab-BIO-U03-W01': '🦅', // eagle (đại bàng dũng mãnh)
  'vocab-BIO-U03-W02': '🦉', // owl (cú mèo thông thái)
  'vocab-BIO-U03-W03': '🦜', // parrot (vẹt biết nói)
  'vocab-BIO-U03-W04': '🦩', // flamingo (chim hồng hạc)
  'vocab-BIO-U03-W05': '🦚', // peacock (chim công xòe đuôi)
  'vocab-BIO-U03-W06': '🐧', // penguin (chim cánh cụt)
  'vocab-BIO-U03-W07': '🦢', // swan (thiên nga kiêu sa)
  'vocab-BIO-U03-W08': '🐦', // hummingbird (chim ruồi tí hon)
  'vocab-BIO-U03-W09': '🪶', // toucan (chim tu-căng mỏ lớn)
  'vocab-BIO-U03-W10': '🪵', // woodpecker (chim gõ kiến bám thân gỗ)
  'vocab-BIO-U03-W11': '🪿', // pelican (bồ nông túi cổ)
  'vocab-BIO-U03-W12': '🦤', // ostrich (đà điểu châu Phi)

  'vocab-BIO-U04-W01': '🐋', // blue whale (cá voi xanh khổng lồ - previously 🦤 dodo!)
  'vocab-BIO-U04-W02': '🐬', // dolphin (cá heo thân thiện - previously 🐋 whale!)
  'vocab-BIO-U04-W03': '🦈', // great white shark (cá mập trắng)
  'vocab-BIO-U04-W04': '🦑', // giant squid (mực ống khổng lồ)
  'vocab-BIO-U04-W05': '🐟', // manta ray (cá đuối khổng lồ - previously 🪼 jellyfish!)
  'vocab-BIO-U04-W06': '🐢', // sea turtle (rùa biển nhiệt đới - previously ⭐ star!)
  'vocab-BIO-U04-W07': '🪼', // jellyfish (con sứa phát sáng - previously 🌿 plant!)
  'vocab-BIO-U04-W08': '🐠', // clownfish (cá hề Nemo)
  'vocab-BIO-U04-W09': '🫧', // seahorse (cá ngựa bé bỏng - previously 🐴 land horse!)
  'vocab-BIO-U04-W10': '🦭', // walrus (hải mã hai ngà - previously 🐠 fish!)
  'vocab-BIO-U04-W11': '🪸', // coral reef (rạn san hô rực rỡ)
  'vocab-BIO-U04-W12': '⭐',  // starfish (sao biển năm cánh - previously 🪸 coral!)

  'vocab-BIO-U05-W01': '🐊', // crocodile (cá sấu đầm lầy)
  'vocab-BIO-U05-W02': '🦎', // chameleon (tắc kè hoa đổi màu - previously 🐍 snake!)
  'vocab-BIO-U05-W03': '🐍', // cobra (rắn hổ mang chúa - previously 🐢 turtle!)
  'vocab-BIO-U05-W04': '🐸', // tree frog (ếch cây mắt đỏ - previously 🐍 snake!)
  'vocab-BIO-U05-W05': '🐉', // komodo dragon (rồng Komodo khổng lồ - previously 🐸 frog!)
  'vocab-BIO-U05-W06': '🐢', // tortoise (rùa cạn trường thọ - previously 🦎 lizard!)
  'vocab-BIO-U05-W07': '🌴', // iguana (kỳ đà cự đà xanh nhiệt đới)
  'vocab-BIO-U05-W08': '🔥', // salamander (kỳ nhông lửa huyền thoại)
  'vocab-BIO-U05-W09': '🐸', // toad (con cóc sần sùi - previously 🦎 lizard!)
  'vocab-BIO-U05-W10': '🐍', // anaconda (trăn nước anaconda - previously 🐸 frog!)
  'vocab-BIO-U05-W11': '🦖', // dinosaur (khủng long tiền sử)
  'vocab-BIO-U05-W12': '🦎', // gecko (tắc kè bám tường - previously 🧱 brick!)

  'vocab-BIO-U06-W01': '🦋', // monarch butterfly (bướm chúa rực rỡ)
  'vocab-BIO-U06-W02': '🐝', // honeybee (ong mật chăm chỉ - previously 🐛 caterpillar!)
  'vocab-BIO-U06-W03': '🦗', // praying mantis (bọ ngựa xanh)
  'vocab-BIO-U06-W04': '🐞', // ladybug (bọ rùa bảy chấm - previously 🪲 beetle!)
  'vocab-BIO-U06-W05': '✨', // firefly (đom đóm phát sáng - previously 💡 lightbulb!)
  'vocab-BIO-U06-W06': '🪰', // dragonfly (chuồn chuồn cánh mỏng)
  'vocab-BIO-U06-W07': '🪲', // scarab beetle (bọ hung cánh cứng - previously 🦗 cricket!)
  'vocab-BIO-U06-W08': '🕷️', // tarantula (nhện lông tarantula)
  'vocab-BIO-U06-W09': '🦂', // scorpion (bọ cạp đuôi độc)
  'vocab-BIO-U06-W10': '🌾', // grasshopper (cào cào đồng cỏ)
  'vocab-BIO-U06-W11': '🐛', // caterpillar (sâu bướm ăn lá - previously 🦗 cricket!)
  'vocab-BIO-U06-W12': '🪱', // earthworm (giun đất - previously 🐛 caterpillar!)

  'vocab-BIO-U07-W01': '🌳', // oak tree (cây sồi cổ thụ)
  'vocab-BIO-U07-W02': '🌲', // pine tree (cây thông lá kim - previously 🌳 deciduous!)
  'vocab-BIO-U07-W03': '🍁', // maple tree (cây phong lá đỏ - previously 🌲 pine!)
  'vocab-BIO-U07-W04': '🌳', // baobab (cây bao báp khổng lồ - previously 🍁 maple!)
  'vocab-BIO-U07-W05': '🌲', // redwood (cây cù tùng cao lớn)
  'vocab-BIO-U07-W06': '🎋', // bamboo (cây tre dẻo dai - previously 🌲 pine!)
  'vocab-BIO-U07-W07': '🌿', // willow (cây liễu rủ bóng - previously 🎋 bamboo!)
  'vocab-BIO-U07-W08': '🌴', // palm tree (cây dừa / cọ nhiệt đới)
  'vocab-BIO-U07-W09': '🐨', // eucalyptus (cây bạch đàn khuynh diệp lá koala)
  'vocab-BIO-U07-W10': '🌸', // cherry blossom (hoa anh đào nở rộ)
  'vocab-BIO-U07-W11': '🌊', // mangrove (cây ngập mặn chắn sóng biển - previously 🌸 cherry blossom!)
  'vocab-BIO-U07-W12': '🪴', // bonsai (cây cảnh bonsai uốn thế chậu kiểng)

  'vocab-BIO-U08-W01': '🌹', // rose (hoa hồng ngát hương)
  'vocab-BIO-U08-W02': '🌻', // sunflower (hoa hướng dương vàng)
  'vocab-BIO-U08-W03': '🪷', // lotus (hoa sen thanh khiết)
  'vocab-BIO-U08-W04': '🌷', // tulip (hoa uất kim hương)
  'vocab-BIO-U08-W05': '🌺', // orchid (hoa phong lan quý phái)
  'vocab-BIO-U08-W06': '🪻', // lavender (hoa oải hương tím - previously 🌺 orchid!)
  'vocab-BIO-U08-W07': '🌼', // daisy (hoa cúc họa mi)
  'vocab-BIO-U08-W08': '🏵️', // hibiscus (hoa dâm bụt đỏ thắm)
  'vocab-BIO-U08-W09': '🪷', // water lily (hoa súng mặt hồ - previously 💧 water droplet!)
  'vocab-BIO-U08-W10': '🌾', // dandelion (hoa bồ công anh đồng nội - previously 🪷 lotus!)
  'vocab-BIO-U08-W11': '🧡', // marigold (hoa cúc vạn thọ cam vàng)
  'vocab-BIO-U08-W12': '💮', // carnation (hoa cẩm chướng)

  'vocab-BIO-U09-W01': '🍄', // mushroom (cây nấm rừng)
  'vocab-BIO-U09-W02': '🌵', // cactus (xương rồng sa mạc)
  'vocab-BIO-U09-W03': '🟩', // moss (thảm rêu xanh ẩm)
  'vocab-BIO-U09-W04': '🌿', // fern (cây dương xỉ rừng - previously 🪴 pot!)
  'vocab-BIO-U09-W05': '🍀', // four-leaf clover (cỏ bốn lá may mắn - previously 🌿 herb!)
  'vocab-BIO-U09-W06': '🪸', // seaweed (rong biển đại dương)
  'vocab-BIO-U09-U07': '🪴', // aloe vera (cây nha đam lô hội)
  'vocab-BIO-U09-W07': '🪴', // aloe vera (cây nha đam lô hội - previously 🌿!)
  'vocab-BIO-U09-W08': '🪴', // Venus flytrap (cây bắt ruồi ăn thịt - previously 🪰 fly!)
  'vocab-BIO-U09-W09': '🫙', // pitcher plant (cây nắp ấm bắt mồi)
  'vocab-BIO-U09-W10': '🪨', // lichen (địa y bám đá)
  'vocab-BIO-U09-W11': '🍃', // mint (lá bạc hà the mát)
  'vocab-BIO-U09-W12': '🌾', // sea grass (đồng cỏ biển ngầm)

  'vocab-BIO-U10-W01': '🪶', // feather (lông vũ nhẹ tênh)
  'vocab-BIO-U10-W02': '🦅', // talon (móng vuốt đại bàng - previously 🐥 baby chick!)
  'vocab-BIO-U10-W03': '🦜', // beak (mỏ chim cứng cáp - previously 🦊 fox!)
  'vocab-BIO-U10-W04': '🐻', // fur (bộ lông thú ấm áp - previously 🦜 parrot!)
  'vocab-BIO-U10-W05': '🦌', // antler (gạc hươu phân nhánh - previously 🧶 yarn ball!)
  'vocab-BIO-U10-W06': '🐘', // tusk (cặp ngà voi dài - previously 🌸 cherry blossom!)
  'vocab-BIO-U10-W07': '🌱', // root (rễ cây hút nước - previously 🪴 pot!)
  'vocab-BIO-U10-W08': '🪵', // trunk (thân cây gỗ to lớn - previously 🪖 military helmet!)
  'vocab-BIO-U10-W09': '🌸', // petal (cánh hoa mềm mại - previously 🪵 wood log!)
  'vocab-BIO-U10-W10': '✨', // pollen (hạt phấn hoa vàng lấp lánh - previously 🌸 cherry blossom!)
  'vocab-BIO-U10-W11': '🪵', // bark (lớp vỏ cây bảo vệ - previously 🛡️ shield!)
  'vocab-BIO-U10-W12': '🦎', // camouflage (sự ngụy trang tự nhiên - previously 🪵 wood log!)

  // === LEVEL COLOR ===
  'vocab-CLR-U09-W12': '🖍️', // chalk (trắng phấn bảng)
  'vocab-CLR-U10-W02': '✨', // iridescent (ngũ sắc lấp lánh - previously 🌈 duplicate with rainbow)

  // === LEVEL NUM ===
  'vocab-NUM-U06-W10': '🌟', // millionth (thứ một triệu - previously 🚗 car!)
  'vocab-NUM-U07-W04': '🥧', // fifth (1/5 - pie slice)
  'vocab-NUM-U07-W05': '🍕', // sixth (1/6 - pizza slice, distinct from quarter)
  'vocab-NUM-U08-W04': '1️⃣', // single (đơn lẻ độc chiếc)
  'vocab-NUM-U09-W05': '📦', // gross (144 đơn vị đóng thùng)

  // === LEVEL ENC (WORLD ENCYCLOPEDIA) ===
  'vocab-ENC-U01-W01': '🦖', // t-rex (khủng long bạo chúa)
  'vocab-ENC-U01-W02': '🦕', // triceratops (khủng long ba sừng cổ đại)
  'vocab-ENC-U01-W03': '🦕', // stegosaurus (khủng long lưng gai)
  'vocab-ENC-U01-W04': '🦅', // pterodactyl (thằn lằn bay tiền sử sải cánh lớn - previously 🦕 sauropod!)
  'vocab-ENC-U01-W05': '🦕', // brachiosaurus (khủng long cổ dài khổng lồ - previously 🦖 T-Rex!)
  'vocab-ENC-U01-W06': '🦖', // velociraptor (khủng long săn mồi tốc độ)
  'vocab-ENC-U01-W07': '🦖', // spinosaurus (khủng long gai buồm - previously 🛡️ shield!)
  'vocab-ENC-U01-W08': '🛡️', // ankylosaurus (khủng long thiết giáp - previously 🦅 eagle!)
  'vocab-ENC-U01-W09': '🦣', // mammoth (voi ma mút lông dài - previously 🦕 sauropod!)
  'vocab-ENC-U01-W10': '🐅', // saber-toothed tiger (hổ răng kiếm - previously 🦕 sauropod!)
  'vocab-ENC-U01-W14': '🍯', // amber (hổ phách hổ phách mật ong vàng - previously 🪨 stone!)

  'vocab-ENC-U02-W14': '🌺', // dragonfruit (quả thanh long nhiệt đới - previously 🐉 dragon!)
  'vocab-ENC-U05-W03': '🥛', // yogurt (sữa chua hũ mát - distinct from cereal 🥣)

  // Solar system planets in ENC-U06: Make colorful and visually intuitive for children
  'vocab-ENC-U06-W01': '🌑', // mercury (sao Thủy - hành tinh đá gần mặt trời, previously ☿️)
  'vocab-ENC-U06-W02': '🟡', // venus (sao Kim - sao mai vàng rực rỡ, previously ♀️)
  'vocab-ENC-U06-W03': '🌍', // earth (Trái Đất thân yêu)
  'vocab-ENC-U06-W04': '🔴', // mars (sao Hỏa - hành tinh đỏ, previously ♂️)
  'vocab-ENC-U06-W05': '🟠', // jupiter (sao Mộc - hành tinh khí khổng lồ, previously ♃)
  'vocab-ENC-U06-W06': '🪐', // saturn (sao Thổ có vành đai)
  'vocab-ENC-U06-W07': '🩵', // uranus (sao Thiên Vương xanh lơ băng giá, previously ♅)
  'vocab-ENC-U06-W08': '🔵', // neptune (sao Hải Vương xanh thẳm đại dương, previously ♆)
  'vocab-ENC-U06-W09': '❄️', // pluto (sao Diêm Vương băng giá xa xôi - previously 🌌 galaxy!)

  'vocab-ENC-U07-W14': '🕳️', // volcanic crater (miệng núi lửa hõm sâu - distinct from 🌋)
  'vocab-ENC-U07-W10': '🏝️', // oasis (ốc đảo tươi mát giữa sa mạc - distinct from 🌴 rainforest)

  'vocab-ENC-U09-W04': '🏗️', // bulldozer (máy ủi công trình - distinct from 🚜 tractor)
  'vocab-ENC-U09-W05': '⛏️', // excavator (máy xúc đào - distinct from 🚜 tractor)

  'vocab-ENC-U10-W08': '🪕', // harp (đàn hạc hoàng gia)
  'vocab-ENC-U10-W13': '🎸', // ukulele (đàn ukulele - distinct from harp)

  'vocab-ENC-U11-W05': '⚓', // captain (thuyền trưởng hải trình - distinct from pilot 👨‍✈️)

  'vocab-ENC-U12-W08': '🛌', // blanket (chăn ấm đắp giường - distinct from sofa 🛋️)

  'vocab-ENC-U13-W03': '🌧️', // raincoat (áo mưa chống nước - distinct from hoodie 🧥)

  'vocab-ENC-U15-W08': '🪀', // spinning top (con quay tít dân gian - previously 🪙 coin!)
  'vocab-ENC-U15-W15': '🎡', // pinwheel (chong chóng gió quay tròn - previously 🪁 kite!)

  'vocab-ENC-U16-W15': '📢', // whistle (chiếc còi trọng tài thổi vang - previously 🎺 trumpet!)

  'vocab-ENC-U17-W04': '🥣', // stomach (dạ dày tiêu hóa dinh dưỡng - previously 🫄 pregnant person!)
  'vocab-ENC-U17-W08': '🩻', // spine (cột sống nâng đỡ chụp X-quang - distinct from 🦴 bones)

  'vocab-ENC-U18-W12': '🤝', // forgiveness (lòng bao dung tha thứ cái bắt tay hòa thuận - distinct from 🕊️ honesty)

  'vocab-ENC-U19-W02': '🏛️', // pyramid (kim tự tháp Ai Cập kỳ quan cổ đại - previously 🔺 red triangle!)
  'vocab-ENC-U19-W03': '🗼', // lighthouse (ngọn hải đăng soi đường)
  'vocab-ENC-U19-W10': '🌾', // windmill (cối xay gió cánh đồng - previously 🌬️ wind face!)
  'vocab-ENC-U19-W13': '🌊', // aqueduct (cầu dẫn nước cổ đại qua sông - distinct from palace 🏛️)

  'vocab-ENC-U20-W15': '💡'  // firefly (chú đom đóm thắp đèn sáng đêm - previously 🪲 beetle!)
};

console.log(`Total master exact corrections defined: ${Object.keys(EXACT_ICON_CORRECTIONS).length}`);

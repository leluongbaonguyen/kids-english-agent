import XLSX from 'xlsx';

/**
 * Generates the official KIDS_ENGLISH_IMPORT_V1 Excel Template Workbook
 * with all 9 sheets matching V6.0 specification.
 */
export function generateV6ExcelTemplate(fullData = null) {
  const wb = XLSX.utils.book_new();

  // Sheet 0: 00_HUONG_DAN
  const huongDanData = [
    ['HƯỚNG DẪN SỬ DỤNG TEMPLATE IMPORT V6.0 - KIDS ENGLISH LEARNING AGENT'],
    [''],
    ['1. QUY MÔ GIÁO TRÌNH V6.0 FULL COURSE:'],
    ['   - 6 Level (L1 -> L6)'],
    ['   - 90 Topic (L1-T01 -> L6-T15, 15 topic/level)'],
    ['   - 900 Vocabulary (10 từ/topic)'],
    ['   - 2250 Exercise (25 bài tập/topic, 5 loại x 5 câu)'],
    [''],
    ['2. NGUYÊN TẮC AN TOÀN DUPLICATE ENGINE:'],
    ['   - Check-First (CHECK_ONLY): Upload file không tự động ghi dữ liệu vào CSDL chính.'],
    ['   - Skip Exact: Khóa trùng và nội dung giống 100% sẽ được SKIP (không tạo trùng).'],
    ['   - Hold Conflict: Cùng khóa nhưng khác nội dung sẽ bị tạm giữ HOLD_FOR_REVIEW.'],
    ['   - Manual Commit: Admin kiểm tra báo cáo và bấm Xác nhận Commit.'],
    ['   - Rollback: Có thể khôi phục theo import_job_id.'],
    [''],
    ['3. DANH SÁCH 9 SHEET TRONG FILE:'],
    ['   - 00_HUONG_DAN: Trang hướng dẫn này'],
    ['   - 01_IMPORT_CONFIG: Cấu hình tham số import'],
    ['   - 02_LEVELS: Danh sách Cấp độ (6 dòng)'],
    ['   - 03_TOPICS: Danh sách Chủ đề (90 dòng)'],
    ['   - 04_VOCABULARY: Danh sách Từ vựng (900 dòng)'],
    ['   - 05_EXERCISES: Danh sách Bài tập (2250 dòng)'],
    ['   - 06_SYSTEM_RESULT: Mẫu kết quả đối soát hệ thống'],
    ['   - 07_DUPLICATE_RULES: Giải thích quy tắc chống trùng'],
    ['   - 99_LISTS: Danh mục Validation hợp lệ']
  ];
  const wsHuongDan = XLSX.utils.aoa_to_sheet(huongDanData);
  XLSX.utils.book_append_sheet(wb, wsHuongDan, '00_HUONG_DAN');

  // Sheet 1: 01_IMPORT_CONFIG
  const configData = [
    ['config_key', 'value', 'description'],
    ['template_version', 'KIDS_ENGLISH_IMPORT_V1', 'Phiên bản template bắt buộc'],
    ['source_version', 'V6.0', 'Phiên bản nguồn dữ liệu'],
    ['import_mode', 'CHECK_ONLY', 'Mặc định chỉ kiểm tra dry-run'],
    ['duplicate_policy', 'SKIP_EXACT', 'Tự động bỏ qua bản ghi trùng hoàn toàn'],
    ['conflict_policy', 'HOLD_FOR_REVIEW', 'Giữ lại xem xét nếu cùng khóa khác nội dung'],
    ['allow_update', 'FALSE', 'Tắt chế độ ghi đè'],
    ['package_mode', 'FULL_COURSE', 'FULL_COURSE hoặc INCREMENTAL'],
    ['strict_count_check', 'TRUE', 'Bắt buộc kiểm tra đúng 6/90/900/2250 với FULL_COURSE'],
    ['allow_partial_commit', 'FALSE', 'Chặn commit nếu có lỗi blocking'],
    ['batch_size', '200', 'Số lượng bản ghi mỗi batch transaction']
  ];
  const wsConfig = XLSX.utils.aoa_to_sheet(configData);
  XLSX.utils.book_append_sheet(wb, wsConfig, '01_IMPORT_CONFIG');

  // Sheet 2: 02_LEVELS
  const levelsHeader = ['level_code', 'level_name_vi', 'target_age_text', 'age_min', 'age_max', 'objective', 'display_order', 'status', 'source_version'];
  const sampleLevels = fullData?.levels || [
    ['L1', 'Khởi Động', '4 - 5 tuổi', 4, 5, 'Phát âm cơ bản, nhận biết chữ cái & 150 từ cơ bản', 1, 'PUBLISHED', 'V6.0'],
    ['L2', 'Cơ Bản', '5 - 7 tuổi', 5, 7, 'Giao tiếp chủ đề quen thuộc gia đình, màu sắc, động vật', 2, 'PUBLISHED', 'V6.0'],
    ['L3', 'Mở Rộng', '7 - 9 tuổi', 7, 9, 'Mở rộng vốn từ trường học, sở thích, thức ăn', 3, 'PUBLISHED', 'V6.0'],
    ['L4', 'Nâng Cao', '8 - 10 tuổi', 8, 10, 'Cấu trúc câu ngắn, mô tả hoạt động & thế giới xung quanh', 4, 'PUBLISHED', 'V6.0'],
    ['L5', 'Tiên Phong', '10 - 12 tuổi', 10, 12, 'Đọc hiểu đoạn văn ngắn & phản xạ tự nhiên', 5, 'PUBLISHED', 'V6.0'],
    ['L6', 'Hội Nhập Quốc Tế', '12+ tuổi', 12, 18, 'Thành thạo 900 từ vựng cốt lõi & giao tiếp tự tin', 6, 'PUBLISHED', 'V6.0']
  ];
  const wsLevels = XLSX.utils.aoa_to_sheet([levelsHeader, ...sampleLevels]);
  XLSX.utils.book_append_sheet(wb, wsLevels, '02_LEVELS');

  // Sheet 3: 03_TOPICS
  const topicsHeader = ['topic_code', 'level_code', 'topic_order', 'topic_icon', 'topic_name_vi', 'topic_name_en', 'objective', 'status', 'source_version'];
  const sampleTopics = fullData?.topics || [
    ['L1-T01', 'L1', 1, '🎨', 'Màu sắc', 'Colors', 'Nhận biết 10 màu sắc cơ bản', 'PUBLISHED', 'V6.0'],
    ['L1-T02', 'L1', 2, '🔢', 'Chữ số', 'Numbers', 'Đếm số từ 1 đến 10', 'PUBLISHED', 'V6.0'],
    ['L1-T03', 'L1', 3, '🐶', 'Động vật nuôi', 'Pets', 'Gọi tên các con vật cưng trong nhà', 'PUBLISHED', 'V6.0'],
    ['L1-T04', 'L1', 4, '🍎', 'Hoa quả', 'Fruits', 'Nhận biết các loại trái cây quen thuộc', 'PUBLISHED', 'V6.0'],
    ['L1-T05', 'L1', 5, '👨‍👩‍👧', 'Gia đình', 'Family', 'Xưng hô các thành viên trong gia đình', 'PUBLISHED', 'V6.0']
  ];
  const wsTopics = XLSX.utils.aoa_to_sheet([topicsHeader, ...sampleTopics]);
  XLSX.utils.book_append_sheet(wb, wsTopics, '03_TOPICS');

  // Sheet 4: 04_VOCABULARY
  const vocabHeader = ['vocab_code', 'level_code', 'topic_code', 'vocab_order', 'icon', 'english', 'ipa_us', 'part_of_speech', 'meaning_vi', 'example_en', 'example_vi', 'audio_url', 'image_url', 'content_status', 'source_version', 'import_note'];
  const sampleVocab = fullData?.vocab || [
    ['L1-T01-V01', 'L1', 'L1-T01', 1, '🔴', 'red', '/rɛd/', 'Noun/Adj', 'Màu đỏ', 'The balloon is red.', 'Quả bóng có màu đỏ.', '', '', 'PUBLISHED', 'V6.0', ''],
    ['L1-T01-V02', 'L1', 'L1-T01', 2, '🔵', 'blue', '/bluː/', 'Noun/Adj', 'Màu xanh dương', 'The sky is blue.', 'Bầu trời màu xanh dương.', '', '', 'PUBLISHED', 'V6.0', ''],
    ['L1-T01-V03', 'L1', 'L1-T01', 3, '🟡', 'yellow', '/ˈjɛloʊ/', 'Noun/Adj', 'Màu vàng', 'Sunflowers are yellow.', 'Hoa hướng dương có màu vàng.', '', '', 'PUBLISHED', 'V6.0', ''],
    ['L1-T01-V04', 'L1', 'L1-T01', 4, '🟢', 'green', '/ɡriːn/', 'Noun/Adj', 'Màu xanh lá', 'Grass is green.', 'Cỏ có màu xanh lá.', '', '', 'PUBLISHED', 'V6.0', ''],
    ['L1-T01-V05', 'L1', 'L1-T01', 5, '🟠', 'orange', '/ˈɔːrɪndʒ/', 'Noun/Adj', 'Màu cam', 'I like orange juice.', 'Tôi thích nước cam.', '', '', 'PUBLISHED', 'V6.0', '']
  ];
  const wsVocab = XLSX.utils.aoa_to_sheet([vocabHeader, ...sampleVocab]);
  XLSX.utils.book_append_sheet(wb, wsVocab, '04_VOCABULARY');

  // Sheet 5: 05_EXERCISES
  const exerciseHeader = ['exercise_code', 'level_code', 'topic_code', 'exercise_type', 'type_order', 'question_order', 'icon', 'related_vocab_code', 'prompt', 'hint', 'option_a', 'option_b', 'option_c', 'option_d', 'option_e', 'correct_answer_key', 'correct_answer_text', 'explanation', 'difficulty', 'content_status', 'source_version'];
  const sampleExercises = fullData?.exercises || [
    ['L1-T01-E001', 'L1', 'L1-T01', 'MCQ_MEANING', 1, 1, '🔴', 'L1-T01-V01', 'Từ "red" có nghĩa tiếng Việt là gì?', 'Màu rực rỡ của quả dâu tây', 'Màu đỏ', 'Màu xanh', 'Màu vàng', 'Màu tím', '', 'A', 'Màu đỏ', 'Red mang nghĩa màu đỏ.', 'L1', 'PUBLISHED', 'V6.0'],
    ['L1-T01-E002', 'L1', 'L1-T01', 'WRITE_ENGLISH', 2, 1, '🔴', 'L1-T01-V01', 'Điền từ Tiếng Anh thích hợp cho "Màu đỏ":', 'Bắt đầu bằng chữ r', '', '', '', '', '', 'TEXT', 'red', 'Màu đỏ viết bằng Tiếng Anh là red.', 'L1', 'PUBLISHED', 'V6.0'],
    ['L1-T01-E003', 'L1', 'L1-T01', 'MATCHING', 3, 1, '🔴', 'L1-T01-V01', 'Nối từ "red" với đáp án Tiếng Việt tương ứng:', '', 'Màu đỏ', 'Màu lam', 'Màu lục', 'Màu chàm', 'Màu tím', 'A', 'Màu đỏ', 'Red ghép với màu đỏ.', 'L1', 'PUBLISHED', 'V6.0'],
    ['L1-T01-E004', 'L1', 'L1-T01', 'FILL_BLANK', 4, 1, '🔴', 'L1-T01-V01', 'The apple is ______.', 'Màu đỏ', '', '', '', '', '', 'TEXT', 'red', 'Quả táo màu đỏ -> red.', 'L1', 'PUBLISHED', 'V6.0'],
    ['L1-T01-E005', 'L1', 'L1-T01', 'IPA_CHOICE', 5, 1, '🔴', 'L1-T01-V01', 'Phiên âm /rɛd/ là của từ nào?', '', 'red', 'blue', 'green', 'yellow', '', 'A', 'red', '/rɛd/ đọc là red.', 'L1', 'PUBLISHED', 'V6.0']
  ];
  const wsExercises = XLSX.utils.aoa_to_sheet([exerciseHeader, ...sampleExercises]);
  XLSX.utils.book_append_sheet(wb, wsExercises, '05_EXERCISES');

  // Sheet 6: 06_SYSTEM_RESULT
  const resultHeader = ['import_job_id', 'check_revision', 'sheet_name', 'excel_row', 'entity_type', 'source_code', 'normalized_key', 'payload_hash', 'row_status', 'duplicate_scope', 'existing_record_id', 'action', 'error_code', 'message', 'diff_fields', 'checked_at', 'committed_at'];
  const wsResult = XLSX.utils.aoa_to_sheet([resultHeader]);
  XLSX.utils.book_append_sheet(wb, wsResult, '06_SYSTEM_RESULT');

  // Sheet 7: 07_DUPLICATE_RULES
  const rulesData = [
    ['RULE_ID', 'ENTITY', 'MATCH_TYPE', 'ACTION', 'DESCRIPTION'],
    ['DUP-001', 'FILE', 'FILE_HASH', 'SKIP', 'File trùng SHA-256 đã từng commit trước đó'],
    ['DUP-002', 'LEVEL', 'PRIMARY_KEY (level_code)', 'SKIP / HOLD', 'L1-L6 trùng key: giống hệt payload => SKIP, khác => HOLD_FOR_REVIEW'],
    ['DUP-003', 'TOPIC', 'PRIMARY_KEY (topic_code)', 'SKIP / HOLD', 'L1-T01 trùng key: giống hệt => SKIP, khác => HOLD_FOR_REVIEW'],
    ['DUP-004', 'VOCABULARY', 'FALLBACK (topic_code + normalized english)', 'SKIP / HOLD', 'red ở Colors và red ở Food được phép; trùng cùng topic => CHECK PAYLOAD'],
    ['DUP-005', 'EXERCISE', 'PRIMARY_KEY (exercise_code)', 'SKIP / HOLD', 'Trùng mã bài tập E001-E025']
  ];
  const wsRules = XLSX.utils.aoa_to_sheet(rulesData);
  XLSX.utils.book_append_sheet(wb, wsRules, '07_DUPLICATE_RULES');

  // Sheet 8: 99_LISTS
  const listsData = [
    ['LEVEL_CODES', 'PART_OF_SPEECH', 'EXERCISE_TYPES', 'STATUS_ENUM'],
    ['L1', 'Noun', 'MCQ_MEANING', 'PUBLISHED'],
    ['L2', 'Verb', 'WRITE_ENGLISH', 'DRAFT'],
    ['L3', 'Adjective', 'MATCHING', 'IN_REVIEW'],
    ['L4', 'Adverb', 'FILL_BLANK', 'ARCHIVED'],
    ['L5', 'Noun/Adj', 'IPA_CHOICE', ''],
    ['L6', 'Preposition', '', '']
  ];
  const wsLists = XLSX.utils.aoa_to_sheet(listsData);
  XLSX.utils.book_append_sheet(wb, wsLists, '99_LISTS');

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

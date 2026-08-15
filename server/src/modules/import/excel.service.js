import XLSX from 'xlsx';
import crypto from 'crypto';
import { readKidsProgress, writeKidsProgress } from '../../store.js';

// In-Memory Staging Job Store for ultra-fast response & offline fallback
const importJobsStore = new Map();

/**
 * NORM-001 to NORM-010: Normalization Engine
 */
export function normalizeString(str) {
  if (str === null || str === undefined) return '';
  let val = String(str).trim();
  // NORM-001: Unicode NFKC
  val = val.normalize('NFKC');
  // NORM-004: Smart Quotes -> ASCII
  val = val.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
  // NORM-005: Dash normalization (Unicode dash to hyphen)
  val = val.replace(/[\u2013\u2014\u2015]/g, '-');
  // NORM-002: Collapse whitespace
  val = val.replace(/\s+/g, ' ');
  return val;
}

export function buildNormalizedKey(str) {
  const norm = normalizeString(str);
  // NORM-003: Case insensitive for matching
  return norm.toLowerCase();
}

/**
 * Generates canonical payload hash (SHA-256) ignoring system metadata
 */
export function computePayloadHash(payloadObj) {
  const sortedKeys = Object.keys(payloadObj).sort();
  const canonicalObj = {};
  for (const k of sortedKeys) {
    if (['id', 'created_at', 'checked_at', 'committed_at', 'import_job_id'].includes(k)) continue;
    canonicalObj[k] = normalizeString(payloadObj[k]);
  }
  const jsonStr = JSON.stringify(canonicalObj);
  return crypto.createHash('sha256').update(jsonStr).digest('hex');
}

/**
 * Formula Injection Escaping (SEC-IMP-04 / FILE-009)
 */
export function escapeFormulaInjection(val) {
  if (typeof val === 'string' && /^[=+\-@\t\r]/.test(val)) {
    return `'${val}`;
  }
  return val;
}

/**
 * Step 1 & 2: Parse Uploaded XLSX Workbook into Staging Rows
 */
export async function parseAndCreateImportJob(fileBuffer, originalName, user = { id: 'admin' }) {
  const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
  const jobId = `imp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

  // Check if identical file SHA-256 has been imported before
  let isFileAlreadyImported = false;
  for (const [id, job] of importJobsStore.entries()) {
    if (job.fileHash === fileHash && job.state === 'COMPLETED') {
      isFileAlreadyImported = true;
    }
  }

  let wb;
  try {
    wb = XLSX.read(fileBuffer, { type: 'buffer' });
  } catch (err) {
    throw new Error(`FILE_001: File không phải định dạng Excel hợp lệ! (${err.message})`);
  }

  // Validate required sheets
  const requiredSheets = ['01_IMPORT_CONFIG', '02_LEVELS', '03_TOPICS', '04_VOCABULARY', '05_EXERCISES'];
  for (const reqSheet of requiredSheets) {
    if (!wb.SheetNames.includes(reqSheet)) {
      throw new Error(`E_SHEET_MISSING: Thiếu sheet bắt buộc "${reqSheet}" trong tệp Excel!`);
    }
  }

  // Parse Config Sheet
  const configSheet = wb.Sheets['01_IMPORT_CONFIG'];
  const rawConfigRows = XLSX.utils.sheet_to_json(configSheet);
  const config = {
    template_version: 'KIDS_ENGLISH_IMPORT_V1',
    source_version: 'V6.0',
    import_mode: 'CHECK_ONLY',
    duplicate_policy: 'SKIP_EXACT',
    conflict_policy: 'HOLD_FOR_REVIEW',
    package_mode: 'FULL_COURSE',
    strict_count_check: 'TRUE',
    batch_size: '200'
  };
  for (const row of rawConfigRows) {
    if (row.config_key && row.value !== undefined) {
      config[String(row.config_key).trim()] = String(row.value).trim();
    }
  }

  if (config.template_version !== 'KIDS_ENGLISH_IMPORT_V1') {
    throw new Error(`E_TEMPLATE_VERSION: Template version "${config.template_version}" không được hệ thống hỗ trợ (Yêu cầu KIDS_ENGLISH_IMPORT_V1)!`);
  }

  // Parse Data Sheets
  const parsedData = {
    levels: XLSX.utils.sheet_to_json(wb.Sheets['02_LEVELS']),
    topics: XLSX.utils.sheet_to_json(wb.Sheets['03_TOPICS']),
    vocab: XLSX.utils.sheet_to_json(wb.Sheets['04_VOCABULARY']),
    exercises: XLSX.utils.sheet_to_json(wb.Sheets['05_EXERCISES'])
  };

  const job = {
    id: jobId,
    tenant_id: 'default',
    file_name: originalName,
    fileHash,
    config,
    state: isFileAlreadyImported ? 'AWAITING_REVIEW' : 'PARSED',
    isFileAlreadyImported,
    created_by: user.id || 'admin',
    created_at: new Date().toISOString(),
    latest_check_revision: 0,
    parsedData,
    checkRevisions: []
  };

  importJobsStore.set(jobId, job);
  return job;
}

/**
 * Step 3 & 5 & 6: Execute Pre-check / Re-check Dry Run Engine
 */
export async function executeImportCheck(jobId) {
  const job = importJobsStore.get(jobId);
  if (!job) throw new Error(`Import job "${jobId}" không tồn tại!`);

  job.state = 'CHECKING';
  const revisionNum = job.latest_check_revision + 1;
  job.latest_check_revision = revisionNum;

  const currentData = await readKidsProgress();
  const existingLevelsMap = new Map();
  const existingTopicsMap = new Map();
  const existingVocabMap = new Map();
  const existingExerciseMap = new Map();

  // Populate existing DB records for matching
  if (currentData.levels) {
    for (const lvl of currentData.levels) {
      existingLevelsMap.set(buildNormalizedKey(lvl.id || lvl.level_code), lvl);
    }
  }
  if (currentData.topics) {
    for (const top of currentData.topics) {
      existingTopicsMap.set(buildNormalizedKey(top.id || top.topic_code), top);
    }
  }
  if (currentData.vocabDatabase) {
    for (const v of currentData.vocabDatabase) {
      const primaryKey = buildNormalizedKey(v.id || v.vocab_code);
      const fallbackKey = `${buildNormalizedKey(v.topic_code || v.category)}|${buildNormalizedKey(v.word || v.english)}`;
      existingVocabMap.set(primaryKey, v);
      existingVocabMap.set(fallbackKey, v);
    }
  }

  const rowResults = [];
  const inMemoryFileKeys = new Set();
  const inMemoryFileHashes = new Map();

  // Metrics Counters
  let rowsTotal = 0;
  let readyInsert = 0;
  let duplicateExactSkip = 0;
  let conflictReview = 0;
  let invalidRows = 0;

  // Helper evaluator
  function processEntityRow(sheetName, excelRowIdx, entityType, sourceCode, payload, primaryKey, fallbackKey) {
    rowsTotal++;
    const rowId = `${entityType}_${excelRowIdx}`;
    const payloadHash = computePayloadHash(payload);
    let rowStatus = 'READY_INSERT';
    let action = 'INSERT';
    let errorCode = null;
    let message = 'Hợp lệ, sẵn sàng ghi mới vào CSDL.';
    let diffFields = [];
    let existingId = null;

    // Validation checks
    if (!sourceCode) {
      rowStatus = 'INVALID_REQUIRED';
      errorCode = 'E_REQUIRED';
      message = `Bắt buộc phải có mã ${entityType} (${entityType.toLowerCase()}_code)!`;
      invalidRows++;
    } else if (inMemoryFileKeys.has(primaryKey)) {
      // In-file duplicate check
      const prevHash = inMemoryFileHashes.get(primaryKey);
      if (prevHash === payloadHash) {
        rowStatus = 'DUPLICATE_EXACT_SKIP';
        action = 'SKIP';
        message = 'Trùng khớp 100% với một bản ghi khác trong cùng tệp Excel (In-file Exact Duplicate).';
        duplicateExactSkip++;
      } else {
        rowStatus = 'CONFLICT_REVIEW';
        action = 'HOLD';
        errorCode = 'E_DUP_IN_FILE';
        message = 'Xung đột: Cùng mã trong tệp Excel nhưng nội dung khác nhau!';
        conflictReview++;
      }
    } else {
      inMemoryFileKeys.add(primaryKey);
      inMemoryFileHashes.set(primaryKey, payloadHash);

      // Database duplicate check
      const dbMatch = existingVocabMap.get(primaryKey) || existingVocabMap.get(fallbackKey) || existingTopicsMap.get(primaryKey) || existingLevelsMap.get(primaryKey);
      if (dbMatch) {
        existingId = dbMatch.id || dbMatch.vocab_code || dbMatch.topic_code || dbMatch.level_code;
        const dbPayloadHash = computePayloadHash(dbMatch);
        if (dbPayloadHash === payloadHash) {
          rowStatus = 'DUPLICATE_EXACT_SKIP';
          action = 'SKIP';
          message = 'Bản ghi đã tồn tại 100% chính xác trong CSDL (Skip Duplicate).';
          duplicateExactSkip++;
        } else {
          rowStatus = 'CONFLICT_REVIEW';
          action = 'HOLD';
          errorCode = 'E_CONTENT_CONFLICT';
          message = 'Xung đột CSDL: Cùng khóa bản ghi nhưng nội dung chi tiết khác với CSDL đang có!';
          conflictReview++;

          // Highlight diff fields
          for (const [k, v] of Object.entries(payload)) {
            if (dbMatch[k] !== undefined && normalizeString(dbMatch[k]) !== normalizeString(v)) {
              diffFields.push(k);
            }
          }
        }
      } else {
        readyInsert++;
      }
    }

    const rowRes = {
      row_id: rowId,
      sheet_name: sheetName,
      excel_row: excelRowIdx + 2, // 1-indexed header offset
      entity_type: entityType,
      source_code: sourceCode,
      normalized_key: primaryKey,
      payload_hash: payloadHash,
      row_status: rowStatus,
      duplicate_scope: existingId ? 'DATABASE' : inMemoryFileKeys.has(primaryKey) ? 'IN_FILE' : 'NONE',
      existing_record_id: existingId,
      action,
      error_code: errorCode,
      message,
      diff_fields: diffFields,
      payload
    };

    rowResults.push(rowRes);
  }

  // 1. Process Levels (02_LEVELS)
  const levels = job.parsedData.levels || [];
  levels.forEach((lvl, idx) => {
    const code = normalizeString(lvl.level_code);
    processEntityRow('02_LEVELS', idx, 'LEVEL', code, lvl, buildNormalizedKey(code), null);
  });

  // 2. Process Topics (03_TOPICS)
  const topics = job.parsedData.topics || [];
  topics.forEach((top, idx) => {
    const code = normalizeString(top.topic_code);
    processEntityRow('03_TOPICS', idx, 'TOPIC', code, top, buildNormalizedKey(code), null);
  });

  // 3. Process Vocabulary (04_VOCABULARY)
  const vocab = job.parsedData.vocab || [];
  vocab.forEach((v, idx) => {
    const code = normalizeString(v.vocab_code);
    const primaryKey = buildNormalizedKey(code);
    const fallbackKey = `${buildNormalizedKey(v.topic_code)}|${buildNormalizedKey(v.english)}`;
    processEntityRow('04_VOCABULARY', idx, 'VOCABULARY', code, v, primaryKey, fallbackKey);
  });

  // 4. Process Exercises (05_EXERCISES)
  const exercises = job.parsedData.exercises || [];
  exercises.forEach((ex, idx) => {
    const code = normalizeString(ex.exercise_code);
    processEntityRow('05_EXERCISES', idx, 'EXERCISE', code, ex, buildNormalizedKey(code), null);
  });

  // Package Mode Validation (FULL_COURSE strict check)
  const isFullCourse = job.config.package_mode === 'FULL_COURSE';
  const countMismatch = isFullCourse && (levels.length !== 6 || topics.length !== 90 || vocab.length !== 900 || exercises.length !== 2250);

  const canCommit = invalidRows === 0 && conflictReview === 0 && !countMismatch;

  const revisionData = {
    check_revision: revisionNum,
    checked_at: new Date().toISOString(),
    summary: {
      rows_total: rowsTotal,
      ready_insert: readyInsert,
      duplicate_exact_skip: duplicateExactSkip,
      conflict_review: conflictReview,
      invalid_rows: invalidRows,
      count_mismatch: countMismatch,
      expected_counts: { levels: 6, topics: 90, vocab: 900, exercises: 2250 },
      actual_counts: { levels: levels.length, topics: topics.length, vocab: vocab.length, exercises: exercises.length }
    },
    can_commit: canCommit,
    rowResults
  };

  job.checkRevisions.push(revisionData);
  job.state = 'AWAITING_REVIEW';
  importJobsStore.set(jobId, job);

  return revisionData;
}

/**
 * Step 7 & 8: Execute Transactional Commit
 */
export async function commitImportJob(jobId, user = { id: 'admin' }) {
  const job = importJobsStore.get(jobId);
  if (!job) throw new Error(`Job "${jobId}" không tồn tại!`);

  if (job.checkRevisions.length === 0) {
    throw new Error('Bạn cần chạy Pre-Check trước khi xác nhận Commit!');
  }

  const latestRev = job.checkRevisions[job.checkRevisions.length - 1];
  if (!latestRev.can_commit && job.config.allow_partial_commit !== 'TRUE') {
    throw new Error('Job chưa đạt điều kiện Commit (Còn bản ghi bị xung đột CONFLICT_REVIEW hoặc lỗi INVALID)!');
  }

  job.state = 'COMMITTING';
  const readyRows = latestRev.rowResults.filter((r) => r.row_status === 'READY_INSERT');

  const currentData = await readKidsProgress();
  let insertedCount = 0;

  // Insert in dependency order: LEVEL -> TOPIC -> VOCAB -> EXERCISE
  const readyLevels = readyRows.filter((r) => r.entity_type === 'LEVEL');
  const readyTopics = readyRows.filter((r) => r.entity_type === 'TOPIC');
  const readyVocab = readyRows.filter((r) => r.entity_type === 'VOCABULARY');
  const readyExercises = readyRows.filter((r) => r.entity_type === 'EXERCISE');

  if (!currentData.customLevels) currentData.customLevels = [];
  if (!currentData.customTopics) currentData.customTopics = [];
  if (!currentData.vocabDatabase) currentData.vocabDatabase = [];
  if (!currentData.exercises) currentData.exercises = [];

  for (const r of readyLevels) {
    currentData.customLevels.push({ ...r.payload, import_job_id: jobId });
    r.row_status = 'IMPORTED';
    insertedCount++;
  }

  for (const r of readyTopics) {
    currentData.customTopics.push({ ...r.payload, import_job_id: jobId });
    r.row_status = 'IMPORTED';
    insertedCount++;
  }

  for (const r of readyVocab) {
    const v = r.payload;
    currentData.vocabDatabase.push({
      id: v.vocab_code,
      word: v.english,
      ipa: v.ipa_us,
      meaning: v.meaning_vi,
      icon: v.icon,
      category: v.topic_code,
      level: v.level_code,
      partOfSpeech: v.part_of_speech,
      example: v.example_en,
      exampleVi: v.example_vi,
      import_job_id: jobId
    });
    r.row_status = 'IMPORTED';
    insertedCount++;
  }

  for (const r of readyExercises) {
    const ex = r.payload;
    currentData.exercises.push({
      id: ex.exercise_code,
      vocabCode: ex.related_vocab_code,
      type: ex.exercise_type,
      prompt: ex.prompt,
      answer: ex.correct_answer_text,
      options: [ex.option_a, ex.option_b, ex.option_c, ex.option_d, ex.option_e].filter(Boolean),
      import_job_id: jobId
    });
    r.row_status = 'IMPORTED';
    insertedCount++;
  }

  await writeKidsProgress(currentData);

  job.state = 'COMPLETED';
  job.committed_at = new Date().toISOString();
  job.inserted_count = insertedCount;
  importJobsStore.set(jobId, job);

  return {
    jobId,
    state: 'COMPLETED',
    insertedCount,
    committedAt: job.committed_at
  };
}

/**
 * Step 10 & Section 25: Rollback Imported Job
 */
export async function rollbackImportJob(jobId, reason = 'Admin Yêu Cầu Rollback') {
  const job = importJobsStore.get(jobId);
  if (!job) throw new Error(`Job "${jobId}" không tồn tại!`);

  if (job.state !== 'COMPLETED') {
    throw new Error('Chỉ có thể Rollback các Job đã được Commit thành công (COMPLETED)!');
  }

  job.state = 'ROLLING_BACK';
  const currentData = await readKidsProgress();

  if (currentData.vocabDatabase) {
    currentData.vocabDatabase = currentData.vocabDatabase.filter((v) => v.import_job_id !== jobId);
  }
  if (currentData.exercises) {
    currentData.exercises = currentData.exercises.filter((ex) => ex.import_job_id !== jobId);
  }
  if (currentData.customTopics) {
    currentData.customTopics = currentData.customTopics.filter((t) => t.import_job_id !== jobId);
  }
  if (currentData.customLevels) {
    currentData.customLevels = currentData.customLevels.filter((l) => l.import_job_id !== jobId);
  }

  await writeKidsProgress(currentData);

  job.state = 'ROLLED_BACK';
  job.rolled_back_at = new Date().toISOString();
  job.rollback_reason = reason;
  importJobsStore.set(jobId, job);

  return {
    jobId,
    state: 'ROLLED_BACK',
    reason,
    rolledBackAt: job.rolled_back_at
  };
}

/**
 * Section 14 & Step 10: Generate Annotated System Result Excel Report
 */
export function generateImportReportExcel(jobId) {
  const job = importJobsStore.get(jobId);
  if (!job) throw new Error(`Job "${jobId}" không tồn tại!`);

  const wb = XLSX.utils.book_new();
  const latestRev = job.checkRevisions[job.checkRevisions.length - 1];
  const rowResults = latestRev ? latestRev.rowResults : [];

  const reportData = [
    ['import_job_id', 'check_revision', 'sheet_name', 'excel_row', 'entity_type', 'source_code', 'normalized_key', 'payload_hash', 'row_status', 'duplicate_scope', 'existing_record_id', 'action', 'error_code', 'message', 'diff_fields', 'checked_at', 'committed_at']
  ];

  for (const r of rowResults) {
    reportData.push([
      escapeFormulaInjection(job.id),
      latestRev.check_revision,
      escapeFormulaInjection(r.sheet_name),
      r.excel_row,
      escapeFormulaInjection(r.entity_type),
      escapeFormulaInjection(r.source_code),
      escapeFormulaInjection(r.normalized_key),
      escapeFormulaInjection(r.payload_hash),
      escapeFormulaInjection(r.row_status),
      escapeFormulaInjection(r.duplicate_scope),
      escapeFormulaInjection(r.existing_record_id || ''),
      escapeFormulaInjection(r.action),
      escapeFormulaInjection(r.error_code || ''),
      escapeFormulaInjection(r.message),
      escapeFormulaInjection((r.diff_fields || []).join(', ')),
      latestRev.checked_at,
      job.committed_at || ''
    ]);
  }

  const ws = XLSX.utils.aoa_to_sheet(reportData);
  XLSX.utils.book_append_sheet(wb, ws, '06_SYSTEM_RESULT');

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

export function getImportJob(jobId) {
  return importJobsStore.get(jobId);
}

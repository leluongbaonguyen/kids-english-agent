/**
 * Idempotent Batch Sync Module (V5.0)
 * Processes offline mutation queues using deduplication idempotency keys.
 */

import { recordQuizAttemptTx } from '../assessment/assessment.service.js';
import { computeSrsUpdate } from '../srs/srs.service.js';

export async function processSyncBatchItem(pool, actorId, batchItem, writeProgressFn) {
  const idempotencyKey = batchItem.idempotencyKey || `batch_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

  if (pool) {
    try {
      const existing = await pool.query('SELECT result_data FROM idempotency_keys WHERE key = $1', [idempotencyKey]);
      if (existing.rows.length > 0) {
        return { idempotencyKey, status: 'DUPLICATE', cached: true, result: existing.rows[0].result_data };
      }
    } catch (e) {}
  }

  let resultData = { status: 'APPLIED', processedAt: new Date().toISOString() };

  try {
    if (batchItem.type === 'progress_sync' && writeProgressFn) {
      resultData.progress = await writeProgressFn(batchItem.payload);
    } else if (batchItem.type === 'quiz_attempt') {
      resultData.quiz = await recordQuizAttemptTx(pool, { ...batchItem.payload, learnerId: actorId });
    } else if (batchItem.type === 'srs_evidence') {
      const { vocabId, accuracy, interactionType } = batchItem.payload || {};
      resultData.srs = await computeSrsUpdate(pool, actorId || 'minh_anh', vocabId, accuracy, interactionType);
    }
  } catch (e) {
    resultData.status = 'REJECTED';
    resultData.error = e.message;
  }

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO idempotency_keys (key, scope, result_data) VALUES ($1, $2, $3)
         ON CONFLICT (key) DO NOTHING`,
        [idempotencyKey, actorId || 'system', JSON.stringify(resultData)]
      );
    } catch (e) {}
  }

  return { idempotencyKey, status: resultData.status, result: resultData };
}

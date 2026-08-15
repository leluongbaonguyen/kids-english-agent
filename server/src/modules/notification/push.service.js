/**
 * Web Push Notification & Daily Reminder Module (V5.0)
 * Stores subscriptions and schedules daily study reminders for learners and parents.
 */

export async function savePushSubscription(pool, learnerId, subscription) {
  if (!subscription || !subscription.endpoint) {
    throw new Error('Invalid Push Subscription Object!');
  }

  if (pool) {
    await pool.query(
      `INSERT INTO push_subscriptions (learner_id, endpoint, p256dh, auth)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (endpoint)
       DO UPDATE SET learner_id = EXCLUDED.learner_id, p256dh = EXCLUDED.p256dh, auth = EXCLUDED.auth`,
      [
        learnerId || 'minh_anh',
        subscription.endpoint,
        subscription.keys?.p256dh || '',
        subscription.keys?.auth || ''
      ]
    );
  }

  return { registered: true, endpoint: subscription.endpoint };
}

export async function getLearnerPushSubscriptions(pool, learnerId) {
  if (!pool) return [];
  try {
    const res = await pool.query('SELECT * FROM push_subscriptions WHERE learner_id = $1', [learnerId]);
    return res.rows;
  } catch (err) {
    return [];
  }
}
